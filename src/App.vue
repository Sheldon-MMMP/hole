<template>
  <div id="app" class="relative">
    <KeepAlive :include="include" :max="10">
      <router-view></router-view>
    </KeepAlive>
  </div>
</template>

<script>
import { CLERK_LEVEL_LIST } from '@/services/api'
import { errPath } from './router/path';
export default {
  name: 'App',
  async created() {
    const clerkLevelList = this.$store.state.clerkLevel.clerkLevelList;
    if (clerkLevelList.length === 0) {
      const [val, err] = await CLERK_LEVEL_LIST();
      if (err) return console.error(err);
      this.$store.dispatch('clerkLevel/setClerkLevel', val?.data)
    }
    // 验证是否登陆
    const localUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(localUrl.search);
    let openId = searchParams.get("openId");
    if(openId){
      this.$store.dispatch("userInfo/setUserInfo",{openId});
      searchParams.delete("openId");
      window.location.href = `${localUrl.origin}${localUrl.pathname}?${searchParams.toString()}`;
    }else{
      openId = this.$store.getters['userInfo/getOpenIdX'];
    }
  },
  data() {
    return {
      include: ['/'],
      pageAnimate: { enter: 'animate__slideInRight', leave: 'animate__slideOutLeft', animate: "animate__animated" },
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === errPath || from.name === errPath) this.pageAnimate.animate = "";
      else if (to.matched.length < from.matched.length)
        this.pageAnimate = { enter: 'animate__slideInRight', leave: 'animate__slideOutLeft', animate: "animate__animated" }
      else
        this.pageAnimate = { enter: 'animate__slideInLeft', leave: 'animate__slideOutRight', animate: "animate__animated" }
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta?.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}

.pageContent {
  padding: 0 $pageMargins;
  min-height: 100vh;
}

input:focus {
  outline: none;
}

button {
  /* 清除默认边框 */
  border: 0;
  outline: none;
  /*清除默认背景 */
  background-color: transparent;
}
</style>
