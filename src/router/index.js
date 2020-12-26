import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
const GoIndex = () => import('../views/goIndex');  //前往订单界面
const QiShiIndex = () => import('../views/index/QiShiIndex');  //骑士主界面
const SearchShopping = () => import('../views/shopping/searchShopping');    //搜索商品界面
//订单界面
const UndevelopedOrder = () => import('../views/order/undevelopedOrder');  //未开发界面
const DevelopingOrder = () => import('../views/order/developingOrder');  //开发中订单
const DevelopedOrder = () => import('../views/order/developedOrder');  //已完成订单
const OneOrderView = () => import('../views/order/oneOrderView');   //单个商品界面
//蘑菇丁界面
const NoPunchClock = () => import('../views/moGuOrder/noPunchClock');  //未打卡界面
const PunchClockIng = () => import('../views/moGuOrder/punchClockIng');  //打卡中界面
const MessageChange = () => import('../views/moGuOrder/messageChange');   //信息发生变化界面
const OneMoGuOrderView = () => import('../views/moGuOrder/oneMoGuOrderViews'); //单个蘑菇详细界面
const routes = [
  {
    name: "GoIndex",
    path: '',
    component:GoIndex,
  },
  {
    name: "QiShiIndex",
    path: '/qiShiIndex',
    component: QiShiIndex,
  },
  {
    name: "SearchShopping",
    path: '/searchShopping',
    component: SearchShopping,
  },
  {
    name: "UndevelopedOrder",
    path: '/undevelopedOrder',
    component: UndevelopedOrder,
  },
  {
    name: "DevelopingOrder",
    path: '/developingOrder',
    component: DevelopingOrder,
  },
  {
    name: "DevelopedOrder",
    path: '/developedOrder',
    component: DevelopedOrder,
  },
  {
    name: "OneOrderView",
    path: '/oneOrderView',
    component: OneOrderView,
  },

    //蘑菇丁
  {
    name: "NoPunchClock",
    path: '/noPunchClock',
    component: NoPunchClock,
  },
  {
    name: "PunchClockIng",
    path: '/punchClockIng',
    component: PunchClockIng,
  },
  {
    name: "MessageChange",
    path: '/messageChange',
    component: MessageChange,
  },
  {
    name: "OneMoGuOrderView",
    path: '/oneMoGuOrderView',
    component: OneMoGuOrderView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
