import user from './user'
import team from './team'
import project from './project'

export default axios => ({
  user: user(axios),
  team: team(axios),
  project: project(axios)
})
