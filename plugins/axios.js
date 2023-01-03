export default function ({ $axios }) {
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('JWT')}`
    }
  })
}
