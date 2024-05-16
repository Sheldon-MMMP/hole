import baseURL from "@/services/url"
const clerkInfo = {
  state: () => ({
    name: "",
    headUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    openId: "",
    wxNumber: "",
  }),
  mutations: {
    SET_USER_INFO(state, data) {
      for (let key in data) {
        state[key] = data[key]
      }
    },
  },
  actions: {
    setClerkInfo(store, data) {
      store.commit("SET_USER_INFO", data)
    },
  },
  getters: {
    getClerkNameX: (state) => state.name,
    getAvatarX: (state) => state.headUrl,
    getClerkIdX: (state) => {
      const openId = state.openId;
      window.Loginlock = true;
      if (!openId && Loginlock) {
        window.Loginlock = false;
        // 跳转登陆页面
        const url = window.location.href;
        location.replace(`${baseURL}/terminal/clerk/authorize?returnUrl=${url}`);
        window.Loginlock = true
        return null;
      }
      return openId
    },
    getWechatX: (state) => state.wxNumber
  },
  namespaced: true,
}


export default clerkInfo
