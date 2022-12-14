
export default axios => ({
  login(form) {
    return axios.post('/user/login', form)
  }
})
