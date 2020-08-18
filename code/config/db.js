const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const MONGO_BASE_PRE = process.env.MONGO_BASE_PRE
const MONGO_BASE_POST = process.env.MONGO_BASE_POST
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

const fullConnectionString = `${MONGO_BASE_PRE}${MONGO_USER}:${MONGO_PASSWORD}${MONGO_BASE_POST}`

const connectToDb = async () => {
    try {
        console.log(`Attempting Connection to: ${MONGO_BASE_POST}`.yellow)
        await mongoose.connect(fullConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        console.log(`Connection Complete`.green)
    } catch (err) {
        console.error(`${err.message}`.red)
        process.exit(1)
    }
}

module.exports = connectToDb;