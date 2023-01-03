
export default axios => ({
  get_roles() {
    return axios.get('/role', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWT')}`
      }
    }
    )
  }
})
