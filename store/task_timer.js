// This is the state object that stores the taskTimers data
export const state = () => ({
  taskTimers: []
})

// These are the mutations that modify the state object
export const mutations = {
  // This mutation sets the array of tasktimerss
  SET_TASK_TIMERS(state, taskTimers) {
    state.taskTimers = taskTimers
  },
  // This mutation adds a new tasktimer to the beginning of the tasktimers array
  ADD_TASK_TIMER(state, taskTimer) {
    state.taskTimers.unshift(taskTimer)
  },
  // This mutation updates a tasktimer by replacing it with the updated version in the tasktimers array
  STOP_TASK_TIMER(state, updatedTaskTimer) {
    const index = state.taskTimers.findIndex(taskTimer => taskTimer.id === updatedTaskTimer.id)
    if (index !== -1) {
      state.taskTimers.splice(index, 1, updatedTaskTimer)
    }
  },
  // This mutation removes a tasktimer from the tasktimers array
  DELETE_TASK_TIMER(state, taskTimerId) {
    state.taskTimers = state.taskTimers.filter(taskTimer => taskTimer.id === taskTimerId)
  }
}

// These are the actions that make API calls and commit mutations
export const actions = {
  // This action gets all tasktimers for a specific task
  async getTaskTimers({ commit }, taskId) {
    try {
      const { data } = await this.$axios.get(`/task_timer/${taskId}`)
      commit('SET_TASK_TIMERS', data.data)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  // Make a POST request to the API to add the new tasktimer for the task
  async addTaskTimer({ commit }, taskId) {
    try {
      await this.$axios.post(`/task_timer/${taskId}/start/`)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  // This action stop an existing taskimer
  async stopTaskTimer({ commit }, taskTimerId) {
    try {
      await this.$axios.post(`/task_timer/${taskTimerId}/stop/`)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // This action delete an existing tasktimer
  async deleteTaskTimer({ commit }, taskTimerId) {
    try {
      await this.$axios.delete(`/task_timer/${taskTimerId}/delete/`)
      commit('DELETE_TASK_TIMER', taskTimerId)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
