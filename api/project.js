
export default axios => ({
  projects() {
    return axios.get('/project/')
  }
})
