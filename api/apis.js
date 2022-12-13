import user from './user'

export default axios => ({
  user: user(axios)
})
