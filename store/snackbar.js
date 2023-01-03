export const state = () => ({
  snackbar: {
    show: false,
    mode: '',
    message: '',
    timer: 4000
  }
})

export const mutations = {
  setSnackbar(state, snackbar) {
    state.snackbar = snackbar
  },
}

export const actions = {
  async success({ commit, dispatch }, data) {
    await dispatch('delete', {})
    await commit('setSnackbar', {
      show: true,
      mode: 'success',
      message: data.message,
      timer: data.timer
    })
  },
  async error({ commit, dispatch }, data) {
    await dispatch('delete', {})
    await commit('setSnackbar', {
      show: true,
      mode: 'error',
      message: data.message,
      timer: data.timer
    })
  },
  async delete({ commit }, data) {
    await commit('setSnackbar', {
      show: false,
      mode: 'error',
      message: '',
      timer: 0
    })
  }
}
