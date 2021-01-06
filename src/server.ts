import http from 'http'

import app from './app'

const server = http.createServer(app)
const { PORT } = process.env

try {
  server.listen(PORT, () => {
    console.log(`server start on port: ${PORT}`)
  })

} catch (error) {
  console.error('Problem during launch server')
}

export default server