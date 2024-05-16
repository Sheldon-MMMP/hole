<template>
  <div class="pt-15 w-full flex flex-col">
    <!-- 头像名字 -->
    <user-avatar></user-avatar>
    <!-- 钱包 -->
    <wallet-money></wallet-money>
    <!-- 背景变色区 -->
    <div style="background-color: #f9fafb;" class="ribbon flex-1">
      <!-- 订单 -->
      <div class="flex w-full justify-between">
        <div v-for="(item, index) in orderState" :key="index"
          class="orderState flex flex-col justify-center items-center h-18 w-18 shadow-amber-100 rounded-2xl"
          @click="toOrderPage(index)">
          <img :src="item.iconPath" width="24" height="24" />
          <span class="text-primary mt-1 text-xs">{{ item.name }}</span>
        </div>
      </div>
      <!-- 用户功能 -->
      <div class="">
        <div v-for="item in functionList" 
            :key="item.name" 
            @click="$router.push(item.to)" 
            class="flexBC px-5 h-18 bg-white mt-5 rounded-2xl">
          <div class="flex">
            <img :src="item.iconPath" width="24" height="24">
            <span class="ml-5">{{ item.name }}</span>
          </div>
          <img src="../../../assets/icon/common/arrow/right-arrow.svg" alt="">
        </div>
      </div>
    </div>
    <div class="fixed bottom-0 h-25 z-99 w-full ribbon" style="background-color: #f9fafb;"></div>
  </div>
</template>

<script>
import { moneyRecharge, orderListPath, userPath } from '@/router/path'
import walletMoney from '@/components/wallet-money.vue'
import userAvatar from '@/components/user-avatar.vue'

export default {
  name: "user",
  components: {
    walletMoney,
    userAvatar
  },

  data() {
    return {

      //订单状态
      orderState: [
        { name: "全部", iconPath: require('@/assets/icon/user/order/dingdan_dingdanliebiao.svg') },
        { name: "未完成", iconPath: require('@/assets/icon/user/order/jinhangzhong.svg') },
        { name: '进行中', iconPath: require('@/assets/icon/user/order/wj-zd.svg') },
        { name: '已完成', iconPath: require('@/assets/icon/user/order/yiwancheng.svg') }
      ],
      // 功能列表
      functionList: [
        { name: "充值银币", iconPath: require("@/assets/icon/tabBar/gift_line.svg"), isShow: true,to:moneyRecharge },
      ]
    }
  },
  methods: {

    toOrderPage(name) {
      this.$router.push({
        path: orderListPath,
        query: {
          type: name
        }
      })
    }
  },
}

</script>

<style lang='scss' scoped>
.orderState {
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.1);
}
.ribbon {
  margin-right: -$pageMargins ;
  margin-left: -$pageMargins ;
  padding: $pageMargins;
  margin-top: $pageMargins;
}

</style>
