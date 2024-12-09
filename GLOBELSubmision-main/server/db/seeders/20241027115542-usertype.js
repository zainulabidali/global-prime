const user_model = require('../models/usertype')

'use strict';

module.exports = {
  up: (models, mongoose) => {
    
      return models.usertypes.insertMany([
        {
          _id :"671e2a9709c9c13cee0f02b0",
          usertype: "admin"
        }
       
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
  
      return models.usertypes.deleteMany({
        _id : {
          $in : [
            "671e2a9709c9c13cee0f02b0"
          ]
        }
      }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
    
  }
};
