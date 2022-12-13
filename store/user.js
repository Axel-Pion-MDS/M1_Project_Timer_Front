export const state = () => ({
  user: {}
})

export const getters = {
  getUser(state) {
    return state.user
  }
}

// export const mutations = {
//   setUser(state, user) {
//     state.user = user
//   },
// }

export const actions = {
  async login({ state }, user) {
    const response = await this.$apis.user.login(user)
    state.user = response.data.user
    return response.data
  },

}
