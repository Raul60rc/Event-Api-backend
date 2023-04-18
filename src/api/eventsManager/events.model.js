const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        event:{type:String, required:true},
        date:{type:Date, required:true},
        location:{type:String, required:true},
    }
)

const Events = mongoose.model("Events",eventSchema);
module.exports = Events;