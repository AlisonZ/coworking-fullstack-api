const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    // TODO: validate that kind is one of the valid kinds of units
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
    //Q: should this be a model itself?
    company: [
        {
            name: String,
            // name: {
            //     type: String, 
            //     required: true
            // }, 
            // contact_email: {
            //     type: String, 
            //     required: true
            // },
            //Q: should this be a model in itself?
            // employees: [
            //     {
            //         first_name: {
            //             type: String, 
            //             required: true
            //         }, 
            //         last_name: {
            //             type: String, 
            //             required: true
            //         }, 
            //         preferred_name: String, 
            //         position: String, 
            //         date_of_birth: String, 
            //         //TODO: validate email 
            //         email: {
            //             type: String, 
            //             required: true
            //         }
            //     }
            // ]
        }
    ],
}, 
// {createdAt: 'created_at', updatedAt: 'updated_at'}
);

module.exports = mongoose.model('Units', schema);