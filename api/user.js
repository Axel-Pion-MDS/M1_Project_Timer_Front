
export default axios => ({
  login(form) {
    axios.post('/api/user/login', form)
      .then((response) => {
        return response
      })
  }
})
