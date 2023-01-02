// This is the state object that stores the tasks data
export const state = () => ({
  tasks: [],
  task: null
})

// These are the mutations that modify the state object
export const mutations = {
  // This mutation sets the array of tasks
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  // This mutation sets a single task
  SET_TASK (state, task) {
    state.task = task
  },
  // This mutation adds a new task to the beginning of the tasks array
  ADD_TASK (state, task) {
    state.tasks.unshift(task)
  },
  // This mutation updates a task by replacing it with the updated version in the tasks array
  UPDATE_TASK (state, task) {
    const index = state.tasks.findIndex(item => item.id === task.id)
    state.tasks.splice(index, 1, task)
  },
  // This mutation removes a task from the tasks array
  DELETE_TASK (state, taskId) {
    const index = state.tasks.findIndex(item => item.id === taskId)
    state.tasks.splice(index, 1)
  }
}

// These are the actions that make API calls and commit mutations
export const actions = {
  // This action gets all tasks for a specific project
  async getTasks ({ commit }, projectId) {
    try {
      const { data } = await this.$axios.get(`/task/project/${projectId}`)
      commit('SET_TASKS', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  // This action gets a single task by its id
  async getTask ({ commit }, taskId) {
    try {
      const { data } = await this.$axios.get(`/task/${taskId}`)
      commit('SET_TASK', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  // Make a POST request to the API to add the new task
  async addTask ({ commit }, task) {
    try {
      const { data } = await this.$axios.post('/task/add', task)
      commit('ADD_TASK', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  // This action update an existing task
  async updateTask ({ commit }, task) {
    try {
      const { data } = await this.$axios.put('/tasks/update', task)
      commit('UPDATE_TASK', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  // This action delete an existing task
  async deleteTask ({ commit }, taskId) {
    try {
      await this.$axios.delete(`/tasks/delete/${taskId}`)
      commit('DELETE_TASK', taskId)
    } catch (error) {
      console.err(error)
      throw error
    }
  }
}
