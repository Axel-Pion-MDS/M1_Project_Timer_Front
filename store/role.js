export const state = () => ({
  roles: []
})

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
}

export const actions = {
  async getRoles({ commit }) {
    const response = await this.$apis.role.get_roles()
    commit('setRoles', response.data.data)
    return true
  },
}
