import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
Vue.use(Vuex);

const state = {   //定义了状态
  username:'',//登录用0
  cartCount:0//购物车商品数量
}
export default new Vuex.Store({ //const store = new Vuex.Store({...})
  state,
  mutations,  //在mutations里写方法
  actions
});