import api from './http'


export const LOGIN = ({url}) => api(`/wechat/authorize?returnUrl=${url}`)

// 获取新的店员列表
export const NEW_CLERK_LIST = () => api('/clerk/new');
// 获取轮播图图片
export const SWIPER_HOME = () => api('/carousel/information');
// 获取店员列表 
export const CLERK_INFO = (data) => api(`/clerk/info/${data.pageNum}/${data.pageSize}`, "get", { sex: data?.sex, Level: data?.Level });
// 店员详细信息
export const CLERK_INFO_MES = (data) => api(`/clerk/info/message/${data.id}`, "get");

// 获取订单列表
export const ORDER_STATUS = (data) => api(`/order/status/${data}`)
// 获取价格表
export const PRICE_TABLE = (data) => api(`/priceTable/table/${data.Level}`)
// 订单详情
export const ORDER_DETAIL = (orderId) => api(`/order/details/${orderId}`)
// 提交订单
export const RECEIVE_ORDER = (data) => api('/order/receive/order', "post", data);
// 确认订单
export const ASSIGN_ACCEPT = ({ orderId }) => api(`/order/orderTaking/success/time/${orderId}`, "get");
// 随机单抢下订单
export const CLERK_ORDERTAKING = ({ openId, orderId }) => api(`/order/clerk/orderTaking/${openId}/${orderId}`, "get");

//上传店员轮播图
export const UPLOAD_CLERK_SWIPER = (data) => api(`/clerk/upload`, 'post', data)


//创建店员
export const CREATE_CLERK = (data) => api(`/clerk/addNewClerk`, 'post', data)

//获取店员信息
export const GET_CLERK_INFO = (data) => api(`/clerk/info/search/${data}`)
//获取等级列表
export const CLERK_LEVEL_LIST = () => api(`/holeLevel/level-list`)


