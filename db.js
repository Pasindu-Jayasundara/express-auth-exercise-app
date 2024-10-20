const sqlite3 = require('sqlite3')
const mkdirp = require('mkdirp')
const crypto = require('crypto')

mkdirp.sync('../var/db')

const db = new sqlite3.Database('./var/db/exer.db')
db.serialize(() => {

    db.run("CREATE TABLE IF NOT EXISTS `users` (\
        id INTEGER PRIMARY KEY, \
        username TEXT UNIQUE, \
        hashed_password BLOB, \
        salt BLOB, \
        name TEXT, \
        email TEXT UNIQUE, \
        email_verified INTEGER\
    )")

    db.run("CREATE TABLE IF NOT EXISTS `federated_credentials` (\
        id INTEGER PRIMARY KEY, \
        user_id INTEGER NOT NULL, \
        provider TEXT NOT NULL, \
        subject TEXT NOT NULL, \
        UNIQUE (provider, subject)\
    )")

    db.run("CREATE TABLE IF NOT EXISTS `exer` (\
        id INTEGER PRIMARY KEY, \
        owner_id INTEGER NOT NULL, \
        title TEXT NOT NULL, \
        completed INTEGER, \
    )")

    let salt = crypto.randomBytes(16)
    db.run('INSERT INTO `users`(username,hashed_password,salt) VALUES(?,?,?)',
        ['alice', crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'), salt]
    )
})

module.exports = db