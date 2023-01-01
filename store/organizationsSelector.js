export const state = () => ({
  organizations: [],
  selectedOrganizations: []
})

export const getters = {
  getOrganizations(state) {
    return state.organizations
  },
  getSelectedOrganizations(state) {
    return state.selectedOrganizations
  }
}

export const mutations = {
  setOrganizations(state, organizations) {
    state.organizations = organizations
  },
  setSelectedOrganizations(state, organizations) {
    state.selectedOrganizations = organizations
  }
}

export const actions = {
  async getOrganizations({ commit }) {
    const response = await this.$apis.organization.organizations()
    console.log(response.data.data)
    // console.log(response)
    commit('setOrganizations', response.data.data)
    return response
  },
  setSelectedOrganizations({ commit }, organizations) {
    commit('setSelectedOrganizations', organizations)
  }
}
