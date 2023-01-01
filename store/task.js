import axios from 'axios'

export const state = () => ({
  tasks: []
})

export const mutations = {
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  ADD_TASK (state, task) {
    state.tasks.unshift(task)
  },
  UPDATE_TASK (state, task) {
    const index = state.tasks.findIndex(item => item.id === task.id)
    state.tasks.splice(index, 1, task)
  },
  DELETE_TASK (state, taskId) {
    const index = state.tasks.findIndex(item => item.id === taskId)
    state.tasks.splice(index, 1)
  }
}

export const actions = {
  async getTasks ({ commit }) {
    try {
      const { data } = await axios.get('/task/project/1')
      commit('SET_TASKS', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  async addTask ({ commit }, task) {
    try {
      const { data } = await axios.post('/tasks', task)
      commit('ADD_TASK', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  async updateTask ({ commit }, task) {
    try {
      const { data } = await axios.put(`/tasks/${task.id}`, task)
      commit('UPDATE_TASK', data)
    } catch (error) {
      console.err(error)
      throw error
    }
  },
  async deleteTask ({ commit }, taskId) {
    try {
      await axios.delete(`/tasks/${taskId}`)
      commit('DELETE_TASK', taskId)
    } catch (error) {
      console.err(error)
      throw error
    }
  }
}
