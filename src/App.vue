<template>
  <div id="app" class="relative">
    <KeepAlive :include="include" :max="10">
      <router-view></router-view>
    </KeepAlive>
  </div>
</template>

<script>
import { CLERK_LEVEL_LIST } from '@/services/api'
import { errPath, clerkPage } from './router/path';
import { userLogin, clerkLogin } from '@/hooks/module/login'
const insertAnimate = { enter: 'animate__slideInRight', leave: 'animate__slideOutLeft', animate: "animate__animated" }
const pushAnimate = { enter: 'animate__slideInLeft', leave: 'animate__slideOutRight', animate: "animate__animated" }
export default {
  name: 'App',
  async created() {
    const store = this.$store
    const clerkLevelList = store.state.clerkLevel.clerkLevelList;
    if (clerkLevelList.length === 0) {
      const [val, err] = await CLERK_LEVEL_LIST();
      if (err) return console.error(err);
      store.dispatch('clerkLevel/setClerkLevel', val?.data)
    }
    // 验证是否登陆
    const hrefhttp = window.location.href;
    let isUserPage = true;
    // 验证是店员手机端还是用户手机端
    clerkPage.forEach((path) => {
      hrefhttp.includes(path) && (isUserPage = false)
    });
    const localUrl = new URL(hrefhttp);
    const searchParams = new URLSearchParams(localUrl.search);
    const id = searchParams.get("openId");
    console.log("isUserPage:",isUserPage);
    isUserPage ? userLogin(id) : clerkLogin(id);
  },
  data() {
    return {
      include: [],
      pageAnimate: insertAnimate,
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === errPath || from.name === errPath) this.pageAnimate.animate = "";
      else if (to.matched.length < from.matched.length)
        this.pageAnimate = insertAnimate
      else
        this.pageAnimate = pushAnimate
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

.noMargin {
  margin: 0 calc(-$pageMargins);
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

// message-box 样式设置
.el-message-box__wrapper {
  padding: 0 $pageMargins;

  .el-message-box {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
