
export default axios => ({
  organizations() {
    return axios.get('/organization/')
  },
  get_organization(id) {
    return axios.get(`/organization/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWT')}`
      }
    })
  },
  get_users_organization(id) {
    return axios.get(`/user-organization/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('JWT')}`
      }
    })
  },
})
