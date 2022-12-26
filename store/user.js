import { decode } from 'jsonwebtoken'
export const state = () => ({
  user: {},
  token: null
})

export const getters = {
  getUserInfo(state) {
    return state.user
  },
  userIsConnected(state) {
    return state.token
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setToken(state, token) {
    state.token = decode(token)
  },
}

export const actions = {
  async login({ commit }, form) {
    const response = await this.$apis.user.login(form)
    if (response.data.token) {
      localStorage.setItem('JWT', response.data.token)
      commit('setUser', response.data.user)
      commit('setToken', response.data.token)
      return true
    }
    return false
  },

  getToken({ commit }) {
    if (localStorage.getItem('JWT')) {
      const token = localStorage.getItem('JWT')
      commit('setToken', token)
      return true
    }
    return false
  }

}
