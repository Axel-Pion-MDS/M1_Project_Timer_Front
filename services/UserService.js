import axios from '@nuxtjs/axios'
export const login = (form) => {
  axios.post('/user/login', form)
    .then((response) => {
      return response
    })
}
