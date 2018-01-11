const http = require('http')
const port = 4001

const requestHandler = (request, response) => {
  const [ path, query ] = request.url.split('?')
  if (path !== '/suggestion') return response.end('Wrong path :(')
  const params = query.split('&').reduce((acc, c) => {
    const [ key, value ] = c.split('=')
    return {
      ...acc,
      [key]: value,
    }
  }, {})
  response.end('Grazie!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  console.log(`server is listening on ${port}`)
})
