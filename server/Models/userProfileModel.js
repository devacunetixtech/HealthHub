const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema(
    
    {   
        userName: String,
        userID: {type: String, required: true},
        userDoctor: {type: String, required: true}, 
        userAge: Number,
        userBlood: {type: String, required: true, minlength: 2, maxlength: 6},
        userGenotype: {type: String, required: true, minlength: 1, maxlength: 6},
        userWeight: {type: String, required: true, minlength: 2, maxlength: 6},
        userAllergies: {type: String, required: true, minlength: 3, maxlength: 1000},
        timestamp: { type: Date, default: Date.now },
    }
);

const userProfileModel = mongoose.model("Profile", UserProfileSchema);
module.exports = userProfileModel;