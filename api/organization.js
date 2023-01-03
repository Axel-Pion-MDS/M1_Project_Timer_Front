
export default axios => ({
  organizations() {
    return axios.get('/organization/')
  },
  get_organization(id) {
    return axios.get(`/organization/${id}`)
  },
  get_users_organization(id) {
    return axios.get(`/user-organization/users/${id}`)
  },
  add_user_organization(users, organizationId) {
    const data = {
      users: [
        {
          email: users.email,
          role: users.role
        }
      ],
      organization: organizationId
    }
    return axios.post('/user-organization/add', data)
  }

})
