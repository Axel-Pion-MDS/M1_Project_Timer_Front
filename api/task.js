export default axios => ({
  tasks() {
    return axios.get('/task/')
  }
})
