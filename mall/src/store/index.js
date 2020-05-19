import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, info) {

      const oldInfo = state.cartList.find(item => item.iid === info.iid)
      if (oldInfo) {
        oldInfo.count += 1
      } else {
        info.count = 1
        info.checked = true
        state.cartList.push(info)
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters:{
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    }
  }
})
