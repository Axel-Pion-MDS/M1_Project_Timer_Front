
export default axios => ({
  organizations() {
    return axios.get('/organization/')
  }
})
