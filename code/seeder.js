const fs = require('fs');
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

//Load Env Vars. 
dotenv.config({ path: './config/config.env' })

// Load Models
const Comment = require('./models/Comment');
const Prophecy = require('./models/Prophecy');
const User = require('./models/User');


// build full connection string. 
const fullConnectionString = `${process.env.MONGO_BASE_PRE}${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_BASE_POST}`
//connect to DB
mongoose.connect(fullConnectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//Read JSON Files
const comments = JSON.parse(fs.readFileSync(`${__dirname}/_data/comments.json`, 'utf-8'))
const prophecies = JSON.parse(fs.readFileSync(`${__dirname}/_data/prophecies.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))


//Import into DB
const importData = async () => {
    try {
        await Comment.create(comments)
        console.log(`Comments Imported...`.green.inverse)
        await Prophecy.create(prophecies)
        console.log(`Prophecies Imported...`.green.inverse)
        await User.create(users)
        console.log(`Users Imported...`.green.inverse)

        console.log(`Data Import Complete.`.green.inverse)

        process.exit(0)

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

//Delete data (unseeder)
const deleteData = async () => {
    try {
        await Comment.deleteMany()
        console.log(`Comments Destoryed...`.red.inverse)

        await Prophecy.deleteMany()
        console.log(`Prophecies Destoryed...`.red.inverse)

        await User.deleteMany()
        console.log(`Users Destoryed...`.red.inverse)


        console.log(`Data wipe complete.`.red.inverse)
        process.exit(0)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}



let seedType = process.argv[2];
if (seedType === '-i') {
    importData()
} else if (seedType === '-d') {
    deleteData();
} else {
    console.log(`Syntax Error: Try 'node seeder [ -i | -d ] to import or delete seeed data'`)
    process.exit(0)
}
