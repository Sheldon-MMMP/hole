<template>
  <div class="pageContent grid">
    <div class="content">
      <go-back color="black">选择服务类型</go-back>
      <div v-if="!level">
        <h3>请选择等级</h3>
        <el-radio-group v-model="selectLevel">
          <el-radio-button v-for="(item, index) in clerkLevelList" :key="index"
            :label="item"></el-radio-button>
        </el-radio-group>
      </div>
      <h3 class="mt-5">服务类型</h3>
      <el-radio-group v-model="serverType">
        <el-radio-button class="" v-for="item in price" :key="item.id" :label="item.name"></el-radio-button>
      </el-radio-group>
      <h3 class="mt-5">服务时长</h3>
      <el-radio-group v-model="serverTime">
        <el-radio-button v-for="item in childrenList" :key="item.id" :label="item.name"></el-radio-button>
      </el-radio-group>
      <div class="mt-5">
        <el-input-number v-model="num" :min="1" :max="10" label="选择数量"></el-input-number>
      </div>
      <el-form class="mt-5">
        <input-form v-model="weChatInput" title="填写要进行聊天的微信号" placeholder="请输入微信号"></input-form>
      </el-form>
      <el-form class="mt-5">
        <input-form v-model="remarkInput" title="备注" placeholder="填写其他需求"></input-form>
      </el-form>
    </div>
    <div class="page-footer mb-5 flex items-center justify-between">
      <el-popover placement="top" trigger="manual" :content="`银币不足，请先充值。余额:${getMoneyX}`" :value="!moneyIsEnough">
        <div slot="reference" class="text-[#f00] text-xl  flex-1">{{ totalAmount }}<span class="ml-1 text-sm">银币</span>
        </div>
      </el-popover>
      <el-button type="primary" class="h-10 !rounded-full w-[40%]" :round="true" @click="submitOrder">{{
        moneyIsEnough ? "下单" : "充值" }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { RECEIVE_ORDER, PRICE_TABLE } from "@/services/api"
import goBack from '@/components/go-back.vue';
import inputForm from "@/components/input-form.vue";
import { mapGetters, mapState } from "vuex";
import { moneyRecharge } from "@/router/path";
import router from "@/router";
import {orderTakePath} from "@/router/path"
export default {
  components: {
    goBack,
    inputForm,
    router
  },
  data() {
    return {
      // 选择的货物数量
      num: 0,
      // 选择服务类型
      serverType: "",
      // 选择服务需要的时间
      serverTime: "",
      price: [],
      childrenList: [],
      amount: 0,
      //微信号
      weChatInput: '',
      // 备注
      remarkInput: '',
      clerkId: "",
      level: "",
      levelList: [],
      selectLevel: ""
    }
  },
  methods: {
    toMoneyRecharge() {
      this.router.push({
        path: moneyRecharge
      })
    },
    //提交支付订单
    async submitOrder() {
      if (!this.moneyIsEnough) return this.$router.push(moneyRecharge)
      const orderObject = {
        time: this.serverTime,
        type: this.serverType,
        totalMoney: this.totalAmount,
        wxNumber: this.weChatInput,
        count: this.num,
        remark: this.remarkInput,
        orderType: this.level?1:0,
        clerkId: this.clerkId,
        orderLevel: this.level||this.selectLevel,
        userOpenId: this.getOpenIdX,
        userName: this.getUserNameX,
        price:this.amount,
        url:window.location.origin+"/#"+orderTakePath
      }
      // if (!orderObject.getOpenIdX) {
      //   return this.$message({
      //     type:"error",
      //     message:"请先登陆"
      //   })
      // }
      const remark = this.$store.state.params?.remark;
      if(remark){
        orderObject.remark+=remark
      }
      if (!this.moneyIsEnough) {
        return this.$message({
          type: "error",
          dangerouslyUseHTMLString: true,
          message: `余额不足请充值`
        })
      }
      //临时车测试数据
      orderObject.clerkId = 1114;
      //结束
      const [val, err] = await RECEIVE_ORDER(orderObject);
      if (err || val.code !== 2000) {
        return this.$message({
          type: "error",
          message: val?.data || "订单信息有误"
        })
      }

    }
  },
  computed: {
    ...mapState('clerkLevel', ['clerkLevelList']),
    ...mapGetters('userInfo',['getOpenIdX', 'getUserNameX', "getMoneyX", 'getWechatX']),
    totalAmount() {
      return this.amount * this.num<0?0:this.amount * this.num;
    },
    moneyIsEnough() {
      return this.getMoneyX - this.totalAmount >= 0
    }
  },
  watch: {
    serverType: {
      deep:true,
      handler: function (newValue) {
        for (let item in this.price) {
          if (this.price[item].name === newValue) {
            this.childrenList = this.price[item].childrenList;
            this.serverTime = this.childrenList[0]?.name
          }
        }
      }
    },
    serverTime: {
      handler: function (newValue) {
        for (let item in this.childrenList) {
          if (this.childrenList[item].name === newValue) {
            this.amount = this.childrenList[item].price;
          }
        }
      }
    },
    selectLevel: {
      handler: async function (newValue) {
        const [val, err] = await PRICE_TABLE({Level:newValue});
        if(err||val.code!==2000) this.$message({type:error,message:"订单列表获取失败，请刷新网页"});
        this.price = val.data;
      }
    },
    price: {
      deep: true,
      handler: function (newValue) {
        // 清洗数据
        this.serverType='';
        this.serverTime="";
        this.serverType = newValue[0].name;
        this.serverTime = newValue[0].childrenList[0]?.name;
      }
    }
  },
  mounted() {
    let params = this.$route.params;
    if (Object.keys(params).length === 0) params = this.$store.state.params;
    for (let item in params) {
      this[item] = params[item];
    }
    if (!this.level) {
      this.selectLevel = this.clerkLevelList[0]
    }
  }
}

</script>

<style lang='scss' scoped>
.pageContent {
  grid-template-rows: 1fr auto;
  min-height: 100vh;

  .page-footer {
    grid-row-start: 2;
    grid-row-end: 3;
  }
}
</style>
