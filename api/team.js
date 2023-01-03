
export default axios => ({
  teams() {
    return axios.get('/team/')
  },
  deleteTeam(id = 0) {
    return axios.delete(`/team/delete/${id}`)
  },
  addTeam(form) {
    return axios.post('/team/add', form)
  },
  updateTeam(form) {
    return axios.patch('/team/update', form)
  }
})
