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
  async login({ commit, dispatch }, form) {
    const response = await this.$apis.user.login(form)
    if (response.data.token) {
      localStorage.setItem('JWT', response.data.token)
      commit('setUser', response.data.user)
      commit('setToken', response.data.token)
      this.$router.push('/')
      await dispatch('snackbar/success', {
        message: 'You are logged in!',
        timer: 4000
      }, { root: true })
      return true
    }
    await dispatch('snackbar/error', {
      message: 'Email or password incorrect!',
      timer: 4000
    }, { root: true })
    return false
  },

  async signUp({ commit, dispatch }, form) {
    const response = await this.$apis.user.signup(form)
    if (response.data.token) {
      localStorage.setItem('JWT', response.data.token)
      commit('setUser', response.data.user)
      commit('setToken', response.data.token)
      this.$router.push('/')
      await dispatch('snackbar/success', {
        message: 'Your account has been created!',
        timer: 4000
      }, { root: true })
      return true
    }
    await dispatch('snackbar/error', {
      message: 'Error while creating the account',
      timer: 4000
    }, { root: true })
    return false
  },

  async getUserInfo({ commit, state }) {
    const response = await this.$apis.user.get_user(state.token)
    commit('setUser', response.data.data)
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
