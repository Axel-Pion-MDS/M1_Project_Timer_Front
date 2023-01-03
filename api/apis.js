import user from './user'
import team from './team'
import project from './project'
import organization from './organization'
import role from './role'

export default axios => ({
  user: user(axios),
  team: team(axios),
  project: project(axios),
  organization: organization(axios),
  role: role(axios)
})
