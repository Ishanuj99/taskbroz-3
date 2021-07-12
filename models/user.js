const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    First_Name: {type: String},
    Last_Name: {type:String},
    email: {type:String, 
            unique:true, 
            match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    
    City: {type: String},
},
    {timestamps: true}
)

module.exports = mongoose.model('User', userSchema)