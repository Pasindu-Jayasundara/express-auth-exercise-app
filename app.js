require('dotenv').config()

const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const passport = require('passport')
const path = require('path')

const sqliteStore = require('connect-sqlite3')(session)

const app = express()
app.locals.pluralize = require('pluralize')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser)
app.use(express.static(path.join(__dirname,'public')))
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store:new sqliteStore({
        db:'sessionStorage.db',
        dir:'./var/dir'
    })
}))

app.use(passport.authenticate('session'))
app.use((req,res,next)=>{

    let msgs = req.session.messages || []
    res.locals.messages = msgs
    res.locals.hashMessages = !! msgs.length
    req.session.messages = []
    next()
})

// catch 404 and forward to error handler
app.use((req,res,next)=>{
    next(createError(404))
})

// error handler
app.use((err,req,res)=>{
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development'?err:{}

    // render error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports=app