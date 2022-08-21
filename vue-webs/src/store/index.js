import Vue from 'vue'
import Vuex from 'vuex'
// 数据状态持久化 vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  user: '',
  token: '',
}
const getters = {
  getUser(state) {
    return state.user
  },
}
const getTokens = {
  getUser(state) {
    return state.token
  },
}
const mutations = {
  updateUser(state, user) {
    state.user = user
  },
  updateToken(state, token) {
    state.token = token
  },
}

const actions = {
  asyncUpdateUser(context, user) {
    context.commit('updateUser', user)
  },
  asyncUpdateToken(context, token) {
    context.commit('updateToken', token)
  },
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  //解决了刷新 用户名消失的问题
  plugins: [createPersistedState()],
})
