
export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('JWT')}`,
    }
  })
}
