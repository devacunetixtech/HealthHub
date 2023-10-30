const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    
    {   
        saveAcctType: {type: String, required: true, minlength: 3, maxlength: 9},
        name: {type: String, required: true, minlength: 3, maxlength: 30},
        username: {type: String, required: true, minlength: 3, maxlength: 15},
        email: {type: String, required: true, minlength: 3, maxlength: 30, unique: true},
        password: {type: String, required: true, minlength: 3, maxlength: 1024},
        phoneNo: Number,
    },{
        timestamps:true ,
    }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;