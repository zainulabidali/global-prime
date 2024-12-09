let users = require('../db/models/users');
let joblist = require('../db/models/joblist');
let access = require('../db/models/access');
const useraccess = require('../db/models/usertype');
const { success_function, error_function } = require('../util/responseHandler')
const fileUpload = require('../util/upload').fileUpload;
const sendEmail = require('../util/sendEmail').sendEmail
const application = require('../util/Email_template/jobApply').application
const bcrypt = require('bcryptjs');

const dotevn = require('dotenv');
dotevn.config();

exports.accessController = async function (req, res) {

    try {
        let body = req.body;
        console.log('body',body);
        let password = req.body.password

        let usertypes = await useraccess.findOne({usertype : body.usertype});
        console.log("user type" , usertypes);

        let id = usertypes._id
        console.log("id",id)


        body.usertype=id

        let salt = bcrypt.genSaltSync(10);
          let hashedpassword = bcrypt.hashSync(password, salt);
          console.log("password :",hashedpassword)
          
          accessbody ={
            name : body.name,
            email : body.email,
            password: hashedpassword ,
            usertype : body.usertype

          }


          let userData = await access.create(accessbody);
          console.log('userData', userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            data:userData,
            message: "successfully created..",
            
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.create1 = async function (req, res) {

    try {
        let body = req.body;
        console.log('body',body);
        let name = req.body.name
        let emails = req.body.email
        let imageInput = req.body.imageInput;
            // console.log("image : ", imageInput);


        if (imageInput) {
            let image_path = await fileUpload(imageInput, "users");
            // console.log("image_path", image_path);
            body.imageInput = image_path;
                    }
        // let content = await application(name,emails)

        // await sendEmail(emails,"New application",content)

        let userData = await users.create(body);
        console.log('userData',userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            data:userData,
            message: "successfully added..",
            
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.fetchalluserData = async function (req,res){
    try {
        getuserData= await users.find();
        console.log("getuserData",getuserData);
        let response = success_function({
         success: true,
         statuscode: 200,
         message: "successfully get all data ..",
         data :getuserData
        })
        res.status(response.statuscode).send(response)
        return;
 
    } catch (error) {
 
        console.log("error : ", error);
        let response = error_function({
         success: false,
         statuscode: 400,
         message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}

exports.deleteuserData = async function (req,res){
    try {
        DeleteId = req.params.id 
        console.log("DeleteId",DeleteId);

        deleteData = await users.deleteOne ({_id : DeleteId});
        console.log("deleteData",deleteData);

    let response = success_function({
        success: true,
        statuscode: 200,
        message: "successfully deleted.."
    })
    res.status(response.statuscode).send(response)
    return;

    } catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}
}

exports.jobList = async function (req , res){

    try {
        
        let body = req.body
        let imageInput = req.body.imageInput;
            console.log("image : ", imageInput);


        if (imageInput) {
            let image_path = await fileUpload(imageInput, "users");
            console.log("image_path", image_path);
            body.imageInput = image_path;
            }

            let userData = await joblist.create(body);
            console.log('userData',userData);

        let response = success_function({
            success: true,
            statuscode: 200,
            data:userData,
            message: "successfully added..",
            
            
        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = error_function({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    }
}

exports.fetchalljoblist = async function (req,res){
    try {
        getuserData= await joblist.find();
        console.log("getuserData",getuserData);
        let response = success_function({
         success: true,
         statuscode: 200,
         message: "successfully get all data ..",
         data :getuserData
        })
        res.status(response.statuscode).send(response)
        return;
 
    } catch (error) {
 
        console.log("error : ", error);
        let response = error_function({
         success: false,
         statuscode: 400,
         message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}

exports.fetchsingledata = async function (req,res){
    try {

        let _id = req.params.id

        
        getuserData= await joblist.findOne({_id});
        console.log("getuserData",getuserData);
        let response = success_function({
         success: true,
         statuscode: 200,
         message: "successfully get all data ..",
         data :getuserData
        })
        res.status(response.statuscode).send(response)
        return;
 
    } catch (error) {
 
        console.log("error : ", error);
        let response = error_function({
         success: false,
         statuscode: 400,
         message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}


exports.deletejoblist = async function (req,res){
    try {
        DeleteId = req.params.id 
        console.log("DeleteId",DeleteId);

        deleteData = await joblist.deleteOne ({_id : DeleteId});
        console.log("deleteData",deleteData);

    let response = success_function({
        success: true,
        statuscode: 200,
        message: "successfully deleted.."
    })
    res.status(response.statuscode).send(response)
    return;

    } catch (error) {

    console.log("error : ", error);
    let response = error_function({
        success: false,
        statuscode: 400,
        message: "error"
    })
    res.status(response.statuscode).send(response)
    return;
}
}









