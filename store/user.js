export const state = () => ({
  user: {}
})

export const getters = {
  getUser(state) {
    return state.user
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  async login({ commit }, form) {
    const response = await this.$apis.user.login(form)
    console.log(response.data.user)
    commit('setUser', response.data.user)
    return response.data
  },

}
