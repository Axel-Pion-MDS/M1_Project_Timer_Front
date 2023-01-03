export const state = () => ({
  roles: []
})

export const getters = {
  getOrganizationRoles(state) {
    return state.roles.filter(role => role.label.includes('ORGANIZATION'))
  }
}

export const mutations = {
  setRoles(state, roles) {
    state.roles = roles
  },
}

export const actions = {
  async getRoles({ commit }) {
    const response = await this.$apis.role.get_roles()
    if (response.status === 200) {
      commit('setRoles', response.data.data)
      return true
    }
  },
}
