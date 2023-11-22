<template>
  <!-- 钱包 -->
  <div class="flex justify-between items-center w-full h-16 bg-primary mt-5 px-4 box-border rounded-2xl">
    <div class="text-white flex flex-row">
      <div class="mr-2">
        <img src="@/assets/icon/user/wallet.svg" alt="">
      </div>
      我的钱包
    </div>
    <div class="money w-30 h-10 bg-primary-black rounded-full text-white flex justify-center items-center">
      {{ $store.getters['userInfo/getMoneyX'] }}银币</div>
  </div>
</template>

<script>
import userInfo from '@/store/userInfo';

export default {
  mounted() {
    console.log(this.$store.getters);
  }
};
</script>
<style lang="scss" scoped>
</style>
