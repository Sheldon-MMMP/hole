<template>
  <div class="pageContent">
    <!-- 店员在线状态控制 -->
    <div class="flex justify-between my-5">
      <span>开始接单</span>
      <el-switch v-model="isOnine" active-color="#DD88CF" inactive-color="#EAECF0">
      </el-switch>
    </div>
    <div class="h-full noMargin" style="background-color: #f9fafb;">
      <!-- 店员功能 -->
      <div class="grid grid-cols-3 noMargin gap-1">
        <div v-for="utitlity in clerkUtitlity" :key="utitlity.id" class="flexCC flex-col pb-{100%} h-30 bg-white">
          <img :src="utitlity.iconPath" v-if="utitlity.iconPath" class="w-13" alt="">
          <i v-else :class="[utitlity.iconName, 'text-5xl text-primary']"></i>
          <span class="mt-2">{{ utitlity.utitlityName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  components: {
  },
  props: {
  },
  data() {
    return {
      clerkUtitlity: [
        {id:3,utitlityName:"店员手册",iconName:'el-icon-collection',to:""},
        { id: 1, utitlityName: "我的资料", iconName: 'el-icon-document', iconPath: "" },
        { id: 2, utitlityName: "订单", iconPath: require('@/assets/icon/user/order/dingdan_dingdanliebiao.svg'), iconName: "" }
      ],

      isOnine: true,
    };
  },
  watch: {
    isOnine() {

    }
  },
  computed: {
    ...mapGetters('userInfo', [])
  },
  methods: {},
  created() { },
  mounted() { },
};
</script>
<style lang="scss" scoped></style>
