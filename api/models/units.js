const mongoose = require('mongoose');
var Units = mongoose.Schema;

const schema = new Units({
    kind: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    special_monthly_offer: {
        type: Number,
        required: false
    },
    //could not replicate behavior of not including company in request
    //when kept as an object, if the company was not in the req.body
    //continued to error because missing required fields
    //changing back to an array fixed this, but ideally would not be an array
    company: [{
      name: {type: String, required: true}, 
      contact_email: {type: String, required: true},
      employees: [{
        first_name: {type: String,required: true},
        last_name: {type: String,required: true}, 
        preferred_name: String, 
        position: String, 
        date_of_birth: String, 
        //TODO: validate email 
        email: {type: String, required: true}
      }]
    }]
  }, {createdAt: 'created_at', updatedAt: 'updated_at'}
);

module.exports = mongoose.model('Units', schema);