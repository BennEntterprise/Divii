const mongoose = require('mongoose')



const uri = `mongodb+srv://kyle123:kyle123@cluster0-u2f52.mongodb.net/divii?retryWrites=true&w=majority`

const connectToDb = async () => {
    try {
        console.log(`Attempting Connection to: ${uri}`)
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectToDb;