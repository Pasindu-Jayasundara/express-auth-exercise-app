require('dotenv').config()

const express = require('express')
const session = require('express-session')
const loggin = require('morgan')
const cookieParser = require('cookie-parser')

const sqliteStore = require('connect-sqlite3')(session)

const app = express()
app.locals.pluralize = require('pluralize')

module.exports=app