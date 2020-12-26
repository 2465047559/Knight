import state from './state'

export default {
  //设置用户的access_token
  getAccess_token(state,str){
    state.access_token = str;
  },
  //设置单个商品详情
  getOneOrder(state,json){
    state.oneOrder = json;
  },
  //设置搜索到的商品
  getSearchShopping(state,arr){
    state.searchShopping = arr;
  },
  //设置当个蘑菇订单
  getOneMoGuOrder(state,json){
    state.oneMoGuOrder = json;
  },
}
