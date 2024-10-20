const http = require('http')
const debug = require('debug')('exer:server')
const app = require('../app')

const port = normalizePort(process.env.PORT || '3000')
app.set('port',port)

const server = http.createServer(app)
server.listen(port)

server.on('error',onError)
server.on('listening',onListening)

function normalizePort(val){

    let port = parseInt(val,10)
    if(isNaN(port)){
        return val
    }

    if(port >=0){
        return port
    }

    return false
}

function onError(error){

    if(error.syscall !== 'listen'){
        throw error
    }

    let bind = typeof port ==='string'
    ?'Pipe'+port:'Port'+port

    switch (error.code) {
        case 'EACCES':
            console.log(bind+' requres elevated priviladges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.log(bind+' is already in use')
            process.exit(1)
            break;
    
        default:
            throw error
    }
}

function onListening(){
    let addr = server.address()

    let bind = typeof port ==='string'
    ?'Pipe'+addr:'Port'+addr

    debug('Listening on '+bind)
}
