export const state = () => ({
  tasks: [],
  selectedTasks: []
})

export const getters = {
  getTasks(state) {
    return state.tasks
  },
  getSelectedTasks(state) {
    return state.selectedTasks
  }
}

export const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks
  },
  setSelectedTasks(state, tasks) {
    state.selectedTasks = tasks
  }
}

export const actions = {
  async getTasks({ commit }) {
    const response = await this.$apis.task.tasks()
    console.log(response.data.data)
    // console.log(response)
    commit('setTasks', response.data.data)
    return response
  },
  setSelectedTasks({ commit }, tasks) {
    commit('setSelectedTasks', tasks)
  }
}
