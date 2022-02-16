const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        room: String,
        messages: [{
            username: String,
            message: String
        }]
    }, 
    { 
        timeseries: true, 
    }
);

const Rooms = mongoose.model('Rooms', roomSchema);
module.exports = Rooms;