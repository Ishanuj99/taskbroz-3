const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require ('mongoose')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

const userRoutes = require('./routes/user')


mongoose.connect('mongodb+srv://dbmongo19:arisha1234@covidhealthdatabase.6ds4n.mongodb.net/test',
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
})
.catch(err => console.log(err))

//mongoose.Promise= global.Promise


app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())



//Routes which should handle requests
app.use("/user",userRoutes)

//Handling error requests
app.use((req, res, next)=>{
    const error = new Error("Not Found");
    error.status=400;
    next(error);
})
app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app