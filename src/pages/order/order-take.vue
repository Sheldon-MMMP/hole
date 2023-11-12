<template>
  <div class="pageContent">
    <!-- 导航栏 -->
    <go-back color="black" :isCenter="true">订单中心</go-back>
    <div class="px-16px py-15px border-2px border-solid border-[#EEEEEE] rounded-2xl box-border">

      <el-image :src="hintImage" fit="cover" class="h-155px w-full rounded-2xl"></el-image>
      <div class="mt-5">
        <div class="title text-24px">
          {{ getTitle }}
        </div>
        <div class="mt-24px">
          <div class="flex">
            <div class="flex-1">
              <div class="subhead text-[#898989] text-14px mb-10px">名称</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.userName }}</div>
            </div>
            <div class="flex-1" v-if="!openIdAuth">
              <div class="subhead text-[#898989] text-14px mb-10px">微信号</div>
              <div class="text-[#120D26] text-18px">{{ isShowWX?orderInfo.wxNumber:'****' }}</div>
            </div>
          </div>
          <div class="flex mt-5">
            <div class="flex-1">
              <div class="subhead text-[#898989] text-14px mb-10px">日期</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.date }}</div>
            </div>
            <div>
              <div class="subhead text-[#898989] text-14px mb-10px">时间</div>
              <div class="text-[#120D26] text-18px">{{ orderInfo.time }}</div>
            </div>
          </div>
          <div class="mt-5">
            <div class="subhead text-[#898989] text-14px mb-10px">备注</div>
            <div class="text-[#120D26] text-18px">{{ orderInfo.comment }}</div>
          </div>
        </div>
        <div class="py-10px flex justify-center items-center mx-[-35px]">
          <div class="circle circle-right"></div>
          <div class="border-1.5px border-[#DDDDDD] border-dashed flex-1 h-0 mx-3"></div>
          <div class="circle circle-left"></div>
        </div>
        <div class="text-[#9E9E9E] text-14px leading-relaxed text-justify">
          系统提醒：请将用户添加成功后在点击开始接单，在订单结束时，系统将发送信息提醒你订单结束，你结束聊天请用一种缓和的方式结束
        </div>
      </div>
    </div>
    <el-button @click="onBtn" type="primary" :disabled="getButtonStyle.disabled"
      :class="`rounded-2xl w-full mt-16px h-48px bg-${getButtonStyle.btnColor}`">{{
        getButtonStyle.text }}</el-button>
  </div>
</template>

<script>
import goBack from '@/components/go-back.vue';
import { errPath } from '@/router/path';
import { ORDER_DETAIL, ASSIGN_ACCEPT, CLERK_ORDERTAKING } from '@/services/api';
import dayjs from 'dayjs';
import { mapGetters } from 'vuex';

export default {
  components: {
    goBack
  },
  data() {
    return {
      hintImage: 'https://api.r10086.com/樱道随机图片api接口.php?自适应图片系列=原神',
      // 是否显示微信
      isShowWX:false,
      orderInfo: {
        orderType: 0,
        userName: "未知",
        clerkName: "未知",
        createTime: '无',
        comment: "无",
        wxNumber: "未知",
        openId: "",
        clerkId: "",
        date:"xxxx年xx月xx日",
        time:"HH:HH:HH"
      },
    }
  },
  async mounted() {
    const orderId = this.getOrderId();
    const [val, error] = await ORDER_DETAIL(orderId);
    if (error || val.code != 2000 || this.openIdAuth) {
      this.toError("订单被抢");
    }
    this.orderInfo = val.data;
    const orderInfo= this.orderInfo;
    const createTime =dayjs.unix(parseInt(orderInfo.createTime));
    const date = createTime.format('YYYY-MM-DD')
    const time = createTime.format('HH:mm:ss');
    this.$set(this.orderInfo,'date',date);
    this.$set(this.orderInfo,'time',time)
  },

  computed: {
    //获取当前店员的id
    ...mapGetters("userInfo", ['getOpenIdX']),
    getTitle() {
      return this.orderInfo.orderType ? "指定单" : "盲盒单";
    },
    openIdAuth() {
      const openId = this.getOpenIdX;
      const openIdReq = this.orderInfo.clerkOpenId;
      return (openIdReq && openIdReq !== openId)
    },
    getButtonStyle() {
      const buttonStyle = [
        { text: "抢下订单", btnColor: "primary-black" },
        { text: "开始接单", btnColor: "primary" },
        { text: "订单进行中", btnColor: "primary-black", disabled: true },
        { text: "订单已完成", btnColor: "primary-black", disabled: true },
        { text: "订单出现问题", btnColor: "primary-black", disabled: true }
      ];
      const status = this.orderInfo.status ?? 1
      return buttonStyle[status];
    }
  },

  methods: {
    getOrderId() {
      const orderId = this.$route.query?.orderId;
      if (!orderId) {
        const errMsg = "获取orderId失败"
        this.toError(errMsg);
        throw new Error("errMsg")
      }
      return orderId
    },

    // 接单失败
    toError(errMsg) {
      this.$router.push({
        name: errPath,
        params: { msg: errMsg ?? "订单已经被抢" }
      })
    },

    onBtn() {
      this.orderInfo.clerkOpenId ? this.startOrder() : this.orderTaking();
    },

    async startOrder() {
      const orderId = this.getOrderId();
      const clerkId = this.orderInfo.clerkOpenId;
      if (!clerkId && clerkId !== this.getOpenIdX) {
        return this.toError("该订单不属于你")
      }
      const [val, error] = await ASSIGN_ACCEPT({ orderId })
      if (error || val.code != 2000) {
        this.$message({
          message: "接单失败",
          type: "error"
        })
      } else {
        this.orderInfo.status = 2;
        this.$message({
          message: "接单成功，请开始联系客户",
          type: "success"
        })
      }
    },

    async orderTaking() {
      const orderId = this.getOrderId();
      const openId = this.getOpenIdX;
      const [val, err] = await CLERK_ORDERTAKING({ orderId, openId })
      if (err || val.code != 2000) {
        return this.toError();
      }
      this.$message({
        message: val.data || "接单成功",
        type: "success"
      })
      this.orderInfo.clerkOpenId = openId;
      this.orderInfo.status = 1;
    }
  }
}


</script>

<style lang='scss' scoped>
.circle {
  border: 2px solid #EEEEEE;
  border-radius: 999px;
  height: 34px;
  width: 34px;
  background-color: #fff;
}

.circle-left {
  clip-path: polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%);
}

.circle-right {
  clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
}
</style>
