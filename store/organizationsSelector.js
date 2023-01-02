export const state = () => ({
  organizations: [],
  selectedOrganizations: [],
  teams: []
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
  },
  setTeams(state, teams) {
    state.teams = teams
  }
}

export const actions = {
  async getOrganizations({ commit }) {
    const response = await this.$apis.organization.organizations()
    // console.log(response)
    commit('setOrganizations', response.data.data)
    return response
  },
  setSelectedOrganizations({ commit }, organizations) {
    commit('setSelectedOrganizations', organizations)
  },
  async teams({ commit, state }) {
    const requestTeams = await this.$apis.team.teams()
    const dataTeams = requestTeams.data.data
    let teams = []
    if (state.selectedOrganizations.length) {
      // eslint-disable-next-line array-callback-return
      dataTeams.map((team) => {
        if (state.selectedOrganizations.includes(team.organization.id)) {
          teams.push(team)
        }
      })
    } else {
      teams = dataTeams
    }

    commit('setTeams', teams)
  },
  async deleteTeam({ commit, state, dispatch }, id) {
    const request = await this.$apis.team.deleteTeam(id)
    if (request.status === 200) {
      // eslint-disable-next-line no-undef
      await dispatch('snackbar/success', {
        message: 'This team has been deleted',
        timer: 4000
      }, { root: true })
      // eslint-disable-next-line no-undef
      dispatch('teams')
    }
  }
}
