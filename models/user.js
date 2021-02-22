const mongoose = require('mongoose');
const schema = mongoose.Schema;

const paySafeUserSchema = new schema({   
    customerId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }

});

const User = mongoose.model('paySafeUserSchema', paySafeUserSchema);

module.exports = User;