const http = require('http')
const fs = require('fs')
const PORT = 4001
const DB_NAME = './db.json'

let db = JSON.parse(fs.readFileSync(DB_NAME))

const requestHandler = (request, response) => {
  const [ path, query ] = request.url.split('?')
  if (path !== '/suggestion') return response.end('Wrong path :(')
  if (query === undefined) return response.end('No query :(')
  const params = query.split('&').reduce((acc, c) => {
    const [ key, value ] = c.split('=')
    return {
      ...acc,
      [key]: value,
    }
  }, {})
  db.push(params)
  fs.writeFileSync(DB_NAME, JSON.stringify(db, undefined, 4), 'utf8'}
  response.end('Grazie!')
}

const server = http.createServer(requestHandler)

server.listen(PORT, (err) => {
  console.log(`server is listening on ${PORT}`)
})
