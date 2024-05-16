<template>
  <!-- 用户头像 -->
  <div class="flex flex-col flex items-center relative">
    <div class="h-30 w-30 rounded-full overflow-hidden p-1 borderStyle border-5px border-solid border-primary"
      @click="login">
      <el-avatar :size="size" :src="getAvatarX"></el-avatar>
    </div>
    <div class="text-3xl mt-4">{{ getUserNameX || '点击头像进行的登陆' }}</div>
    <div class="text-1xl mt-2" style="color:rgba(107, 114, 128) ;">WELCOME HOLE</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  components: {},
  props: {},
  data() {
    return {
      size: 120,
    };
  },
  watch: {},
  computed: {
    ...mapGetters('userInfo', ['getUserNameX', "getAvatarX"])
  },
  methods: {
    login() {
      this.$store.getters['userInfo/getOpenIdX']
    },
  },
  created() { },
  mounted() { }
};
</script>
<style lang="scss" scoped>
// 头像半圈
.borderStyle {
  width: 139px;
  height: 139px;
  border-radius: 50%;
  /*以下五个属性为水平垂直居中的方法*/
  box-sizing: border-box;
  border-left-color: transparent;
  border-top-color: transparent;
}
</style>

