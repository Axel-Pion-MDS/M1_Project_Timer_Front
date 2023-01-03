export const state = () => ({
  organization: {},
  user_organization_role: {}
})

export const getters = {
  getOrganization(state) {
    return state.organization
  },
  getUserOrganizationRole(state) {
    return state.user_organization_role
  }
}

export const mutations = {
  setOrganization(state, organization) {
    state.organization = organization
  },
  setUserOrganizationRole(state, userOrganizationRole) {
    state.user_organization_role = userOrganizationRole
  }
}

export const actions = {
//   async getOrganization({ commit, dispatch }, organization) {
//     // console.log(state.organization)
//     const response = await this.$apis.organization.get_organization(organization.id)
//     console.log(response)
//   },
  async setOrganization({ commit, rootState }, organization) {
    const response = await this.$apis.organization.get_organization(organization.id)
    const res = response.data.data
    const userOrganization = await this.$apis.organization.get_users_organization(organization.id)
    res.users = userOrganization.data.data[1].users
    commit('setOrganization', res)
    res.users.forEach((user) => {
      if (user.id === rootState.user.user.id) {
        return commit('setUserOrganizationRole', user.role)
      }
    })
  },

  async addUserOrganization({ commit, state }, form) {
    const response = await this.$apis.organization.add_user_organization(form, state.organization.id)
    return response
  }
}
