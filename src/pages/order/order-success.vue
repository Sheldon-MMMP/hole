<template>
  <div class="pageContent bg-image">
    <go-back color="black"></go-back>
    <div class="text-xl text-primary-black text-center">你已经下单成功，等待店员联系你吧</div>
      <div class="flex justify-around items-center w-full">
        <div class="right_love">
          <el-image :src="getAvatarX" class="h-full" fit="cover"></el-image>
        </div>
        <div class="left_love">
          <el-image :src="clerkImage" class="h-full"></el-image>
        </div>
        <div class="bg-primary-black rounded-1 w-15 h-15 flexCC fixed">
          <el-image :src="loveIcon"></el-image>
        </div>
      </div>
    <div>
      <el-button type="primary" @click.native="goHome" size="medium" class="w-full h-55px text-base gap-5 bg-primary-black" round>返回主页</el-button>
    </div>
  </div>
</template>

<script>
import goBack from '@/components/go-back.vue';
import { homePath } from '@/router/path';
import { mapGetters } from 'vuex';
export default {
  components: {
    goBack
  },
  props: {},
  data() {
    return {
      loveIcon:require("@/assets/icon/clerkDetail/like.svg"),
      clerkImage:"https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  },
  computed: {
    ...mapGetters('userInfo', ['getAvatarX'])
  },
  mounted(){
    this.$route.params?.clerkImage&&(this.clerkImage=this.$route.params.clerkImage);
  },
  methods:{
    goHome(){
      this.$router.replace(homePath)
    }
  }
};
</script>
<style lang="scss" scoped>
.bg-image {
  background-image: url(@/assets/illustrations/Vector.svg);
  display: grid;
  grid-template-rows: 100px 50px auto 120px;
  background-color: #F6DFF2;

  .right_love {
    width: 176px;
    height: 196px;
    border-radius: 100px 100px 0px 100px;
    border: 10px solid $primary-color;
    overflow: hidden;
  }

  .left_love {
    width: 176px;
    height: 196px;
    border-radius: 100px 100px 100px 0px;
    border: 10px solid $white-color;
    overflow: hidden;
  }
}
</style>
