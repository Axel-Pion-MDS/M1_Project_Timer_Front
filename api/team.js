
export default axios => ({
  teams() {
    return axios.get('/team/')
  },
  deleteTeam(id = 0) {
    return axios.delete(`/team/delete/${id}`)
  }
})
