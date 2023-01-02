export default function ({ $axios }) {
  const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6eyJpZCI6MSwibGFiZWwiOiJST0xFX1VTRVIifX0.ST73VLg-C4jTZ-8xIjcsxKY5kh5yJvcoRrcAN6sHKEQ'
  $axios.onRequest((config) => {
    config.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${jwt}`,
    }
  })
}
