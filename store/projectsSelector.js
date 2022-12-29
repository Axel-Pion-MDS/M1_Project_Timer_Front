export const state = () => ({
  projects: {},
  token: null
})

export const getters = {
  getProjects(state) {
    return state.projects
  }
}

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  }
}

export const actions = {
  setProjects({ commit }, projects) {
    commit('setProjects', projects)
  }
}
