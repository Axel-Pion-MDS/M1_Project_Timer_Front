
export default axios => ({
  projects() {
    return axios.get('/project/')
  },
  deleteProject(id = 0) {
    return axios.delete(`/project/delete/${id}`)
  },
  addProject(form) {
    return axios.post('/project/add', form)
  },
  updateProject(form) {
    return axios.patch('/project/update', form)
  }
})
