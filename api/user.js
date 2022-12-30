
export default axios => ({
  login(form) {
    return axios.post('/user/login', form)
  },
  signup(form) {
    return axios.post('/user/add', form)
  },
  get_user(token) {
    return axios.get(`/user/${token.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWT')}`
      }
    }
    )
  }
})
