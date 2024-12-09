const mongoose = require('mongoose');


const users = new mongoose.Schema({
    name:{
        type : String,
    },
    email:{
        type : String,

    },
    portfolio:{
        type : String,
   
    },
    imageInput :{
        type : String,
    },
    coverLetter :{
        type : String
    },
    jobTitle:{
        type : String

    }

});

 let add= mongoose.model("users", users);
 module.exports = add