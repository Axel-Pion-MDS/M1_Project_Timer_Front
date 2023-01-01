import user from './user'
import task from './task'

export default axios => ({
  user: user(axios),
  task: task(axios),
})
