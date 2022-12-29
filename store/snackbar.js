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
  async success({ commit }, data) {
    await commit('setSnackbar', {
      show: true,
      mode: 'success',
      message: data.message,
      timer: data.timer
    })
  },
  async error({ commit }, data) {
    await commit('setSnackbar', {
      show: true,
      mode: 'error',
      message: data.message,
      timer: data.timer
    })
  }
}
