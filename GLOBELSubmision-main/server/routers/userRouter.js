
// routers/userRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
// const { adminAuth } = require('../db/models/auth');
const accessControl =require('../util/access-control').accessControl


function  setAccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next);
    }

}


// User routes
router.post('/access',userController.accessController)
router.post('/user',setAccessControl('*'), userController.create1);
router.get('/user',setAccessControl('1'), userController.fetchalluserData);
router.delete('/purgeUser/:id',setAccessControl('1'), userController.deleteuserData);

// Admin routes
router.post('/jobList',setAccessControl('1'), userController.jobList); // Admins only
router.get('/joblist',setAccessControl('*'), userController.fetchalljoblist);
router.get('/joblist/:id',setAccessControl('*'), userController.fetchsingledata);
router.delete('/purgejoblist/:id',setAccessControl('1'), userController.deletejoblist); // Admins only

module.exports = router;
