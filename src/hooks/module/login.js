import store from "@/store";
import router from "@/router";
import {clerkApplicationPath} from '@/router/path.js'
import { HOLE_USER_INFO,CLERK_INFO_SELF } from "@/services/api";

export const userLogin = async (openId) => {
  openId = openId ?? store.getters["userInfo/getOpenIdX"];
  if(!openId) return;
  store.dispatch("userInfo/setUserInfo", { openId });
  const [val, err] = await HOLE_USER_INFO({ openId });
  if (err || val.code != 2000) {
    console.error("获取用户信息失败");
  } else {
    store.dispatch("userInfo/setUserInfo", val.data)
  }
}


export const clerkLogin = async (clerkId)=>{
  clerkId = clerkId??store.getters["clerkInfo/getClerkIdX"];
  if(!clerkId) return
  store.dispatch("clerkInfo/setClerkInfo",{clerkId});
  const [val,err] = await CLERK_INFO_SELF({clerkId});
  if (err || val.code != 2000) {
    console.error("获取店员信息失败");
  } else {
    store.dispatch("clerkInfo/setClerkInfo", val.data)
  }
}
