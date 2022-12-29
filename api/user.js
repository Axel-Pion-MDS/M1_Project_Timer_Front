
export default axios => ({
  login(form) {
    return axios.post('/user/login', form)
  },
  signup(form) {
    return axios.post('/user/add', form)
  }
})
