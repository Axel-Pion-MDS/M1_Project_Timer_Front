
export default axios => ({
  teams() {
    return axios.get('/team/')
  }
})
