export const state = () => ({
  teams: [],
  selectedTeams: [],
  projects: []
})

export const getters = {
  getTeams(state) {
    return state.teams
  },
  getSelectedTeams(state) {
    return state.selectedTeams
  }
}

export const mutations = {
  setTeams(state, teams) {
    state.teams = teams
  },
  setSelectedTeams(state, teams) {
    state.selectedTeams = teams
  },
  setProjects(state, projects) {
    state.projects = projects
  }
}

export const actions = {
  async getTeams({ commit }) {
    const response = await this.$apis.team.teams()
    // console.log(response)
    commit('setTeams', response.data.data)
    return response
  },
  setSelectedTeams({ commit }, teams) {
    commit('setSelectedTeams', teams)
  },
  async projects({ commit, state }) {
    const requestProjects = await this.$apis.project.projects()
    console.log(requestProjects.data.data)
    const dataProjects = requestProjects.data.data
    let projects = []
    if (state.selectedTeams.length) {
      // eslint-disable-next-line array-callback-return
      dataProjects.map((project) => {
        if (state.selectedTeams.includes(project.team)) {
          projects.push(project)
        }
      })
    } else {
      projects = dataProjects
    }

    commit('setProjects', projects)
  },
  async deleteProject({ commit, state, dispatch }, id) {
    const request = await this.$apis.project.deleteProject(id)
    if (request.data.code === 200 || request.data.code === 201) {
      // eslint-disable-next-line no-undef
      await dispatch('snackbar/success', {
        message: 'This project has been deleted',
        timer: 4000
      }, { root: true })
      // eslint-disable-next-line no-undef
      dispatch('projects')
    } else {
      await dispatch('snackbar/error', {
        message: request.data.message,
        timer: 4000
      }, { root: true })
    }
  },
  async newProject({ commit, state, dispatch }, form) {
    const request = await this.$apis.project.addProject(form)
    if (request.data.code === 200 || request.data.code === 201) {
      // eslint-disable-next-line no-undef
      await dispatch('snackbar/success', {
        message: 'This project has been created',
        timer: 4000
      }, { root: true })
      // eslint-disable-next-line no-undef
      dispatch('projects')
    } else {
      await dispatch('snackbar/error', {
        message: request.data.message,
        timer: 4000
      }, { root: true })
    }
    return true
  },
  async updateProject({ commit, state, dispatch }, form) {
    const request = await this.$apis.project.updateProject(form)
    console.log(request)
    if (request.data.code === 200 || request.data.code === 201) {
      // eslint-disable-next-line no-undef
      await dispatch('snackbar/success', {
        message: 'This project has been updated',
        timer: 4000
      }, { root: true })
      // eslint-disable-next-line no-undef
      dispatch('projects')
    } else {
      await dispatch('snackbar/error', {
        message: request.data.message,
        timer: 4000
      }, { root: true })
    }
    return true
  }
}
