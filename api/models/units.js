const mongoose = require('mongoose');
var Units = mongoose.Schema;

const schema = new Units({
    // TODO: validate that kind is one of the valid kinds of units
    kind: {
        type: String,
        required: true
    },
    floor: {
      //TODO: change this to Number and deal with num/string conversion in route
        type: String,
        required: true
    },
    special_monthly_offer: {
        type: Number,
        required: false
    },

    //this might not need to be an array because there is only one company in each unit at this time
    companies: [{
      name: String, 
      // name: {type: String, required: true}, 
      contact_email: String,
      // contact_email: {type: String, required: true},
      employees: [{
        first_name: String,
        // first_name: {type: String,required: true},
        last_name: String,
        // last_name: {type: String,required: true}, 
        preferred_name: String, 
        position: String, 
        date_of_birth: String, 
        //TODO: validate email 
        email: String, 
        // email: {type: String, required: true}
      }]
    }]
  }, {createdAt: 'created_at', updatedAt: 'updated_at'}
);

module.exports = mongoose.model('Units', schema);