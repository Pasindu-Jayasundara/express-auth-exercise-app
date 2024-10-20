const http = require('http')
const debug = require('debug')
const app = require('../app')

const port = normalizePort(process.env.PORT || '3000')
app.set('port',port)

const server = http.createServer(app)
server.listen(port)

server.on('error',onError)
server.on('listening',onListening)

