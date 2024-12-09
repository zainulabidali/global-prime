const mongoose = require('mongoose');


const jobList = new mongoose.Schema({

    imageInput :{
        type : String,
    },
    jobTitle :{
        type : String,
    },
    jobLocation :{
        type : String
    },
    jobTime: {
        type : String
    },
    salary : {
        type : String
    },
    DateLine :{
        type : String
    },
    Job_description : {
        type : String
    },
    Responsibility : {
        type : String
    },
    Qualifications : {
        type : String
    }

});

 let add= mongoose.model("jobList", jobList);
 module.exports = add