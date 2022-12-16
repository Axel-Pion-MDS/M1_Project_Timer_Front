export default ({ app }) => {
  if (process.client) {
    app.store.dispatch('user/getToken')
  }
}
