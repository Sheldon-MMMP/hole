import baseURL from "@/services/url"
import { MessageBox } from 'element-ui';
const userInfo = {
  state: () => ({
    name: "",
    balance: 0,
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
    SET_MONEY(state, data) {
      state.money = data
    }
  },
  actions: {
    setUserInfo(store, data) {
      store.commit("SET_USER_INFO", data)
    },
    setMoney(store, data) {
      store.commit("SET_MONEY", data)
    }
  },
  getters: {
    getUserNameX: (state) => state.name,
    getMoneyX: (state) => state.balance,
    getAvatarX: (state) => state.headUrl,
    getOpenIdX: (state) => {
      const openId = state.openId;
      window.Loginlock = true;
      if (!openId && Loginlock) {
        window.Loginlock = false;
        MessageBox.confirm('如果你想体验更多功能，请先登陆', '请登陆', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          roundButton: true,
          center: true,
        }).then(async () => {
          // 跳转登陆页面
          const url = window.location.href;
          location.replace(`${baseURL}/wechat/authorize?returnUrl=${url}`);
        }).catch(() => {
        })
        window.Loginlock = true
        return null;
      }
      return openId
    },
    getWechatX: (state) => state.wxNumber
  },
  namespaced: true,
}


export default userInfo
