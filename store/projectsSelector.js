export const state = () => ({
  projects: [],
  selectedProjects: []
})

export const getters = {
  getProjects(state) {
    return state.projects
  },
  getSelectedProjects(state) {
    return state.selectedProjects
  }
}

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  },
  setSelectedProjects(state, projects) {
    state.selectedProjects = projects
  }
}

export const actions = {
  async getProjects({ commit }) {
    const response = await this.$apis.project.projects()
    // console.log(response)
    commit('setProjects', response.data.data)
    return response
  },
  setSelectedProjects({ commit }, projects) {
    commit('setSelectedProjects', projects)
  }
}
