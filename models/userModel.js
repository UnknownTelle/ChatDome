const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: String,
        username: String,
        room: String
    }, 
    { 
        timeseries: true,  
    }
);

const Users = mongoose.model('User', userSchema);
module.exports = Users;