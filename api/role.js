
export default axios => ({
  get_roles() {
    return axios.get('/role')
  }
})
