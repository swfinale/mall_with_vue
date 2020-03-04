/**
 * 商城Vuex-mutations
 */
export default {
  //在mutations里面进行赋值
  saveUserName(state, username) {
    state.username = username;  
  },
  saveCartCount(state, count) {
    state.cartCount = count;
  }
}