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
    //TODO: rework the routing logic so that this field is not necessary
    //instead of having an explicit field of 'occupied' can base this logic off of
    //the presence or absence of a company name in the company section
    //maybe? but why is there an array of companies per one unit?
    occupied: {
      type: String, 
      required: false
    },
    // //Q: should this be a model itself?
    company: 
        {
            name: {
                type: String, 
                required: true
            }, 
            contact_email: {
                type: String, 
                required: true
            },
            // Q: should this be a model in itself?
            employees: [
                {
                    first_name: {
                        type: String, 
                        required: true
                    },
                    last_name: {
                        type: String, 
                        required: true
                    }, 
                    preferred_name: String, 
                    position: String, 
                    date_of_birth: String, 
                    //TODO: validate email 
                    email: {
                        type: String, 
                        required: true
                    }
                }
            ]
        }
    ,
  }
// }, {createdAt: 'created_at', updatedAt: 'updated_at'}
);

module.exports = mongoose.model('Units', schema);