const userModel = require("../Models/userModel")
const userProfileModel = require("../Models/userProfileModel")
const medicUserModel = require("../Models/medicUserModel")
const chatModel = require("../Models/chatModel");
//NPM I BCRYPT VALIDATOR JSONWEBTOKEN
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn:"3d" });
};

const registerUser = async  (req, res) => {
    try{
        const {acctType, name, username, email, password, phoneNo} = req.body
        if (acctType === "USER") {
            const saveAcctType = acctType;
            let user  = await userModel.findOne({ email});
            if(user) 
                return res.status(400).json("This User Joined already ....");
            if(!name || !email || !password) 
                return res.status(400).json("All fields are required....")
            if(!validator.isEmail(email)) 
                return res.status(400).json("Email must be a valid email")
            if(!validator.isStrongPassword(password)) 
                return res.status(400).json("Password must be a strong one")
            //SAVING THE USER
            user = new userModel({ saveAcctType, name, username, email, password, phoneNo})
    
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            const token = createToken(user._id)
            res.status(200).json({_id:user._id, name, email, token })
        } else if (acctType === "MEDIC") {
            const saveAcctType = acctType;
            let user  = await medicUserModel.findOne({ email});
            if(user) 
                return res.status(400).json("This User Joined already ....");
            if(!name || !email || !password) 
                return res.status(400).json("All fields are required....")
            if(!validator.isEmail(email)) 
                return res.status(400).json("Email must be a valid email")
            if(!validator.isStrongPassword(password)) 
                return res.status(400).json("Password must be a strong one")
            //SAVING THE USER
            user = new medicUserModel({saveAcctType, name, username, email, password, phoneNo})
    
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();
            const token = createToken(user._id)
            res.status(200).json({_id:user._id, name, email, token })
        };

    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const loginUser = async  (req, res) => {
    const { acctType, email, password} = req.body;
    try{
        if (acctType === "USER") {
            let user  = await userModel.findOne({ email });
            if(!user) 
                return res.status(400).json("Invalid email or password..");
    
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) 
                return res.status(400).json("Invalid email or password..");
    
            const token = createToken(user._id)
            res.status(200).json({_id:user._id, name:user.name, email, token, acctType})
        } else if (acctType === "MEDIC"){
            let user  = await medicUserModel.findOne({ email });
            if(!user) 
                return res.status(400).json("Invalid email or password..");
    
            const isValidPassword = await bcrypt.compare(password, user.password);
            if(!isValidPassword) 
                return res.status(400).json("Invalid email or password..");
    
            const token = createToken(user._id)
            res.status(200).json({_id:user._id, name:user.name, email, token, acctType})
        };
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId)
        res.status(200).json(user);
    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
};

const saveProfile = async  (req, res) => {
    try{
        const { userID, userName, userDoctor, userAge, userBlood, userGenotype, userWeight, userAllergies } = req.body;

        const existingUserProfile = await userProfileModel.findOne({ userID });

        if (existingUserProfile) {
          // Delete the existing user
          await userProfileModel.findOneAndDelete({ userID });
        }

        const newUserProfile = new userProfileModel({ userID, userName, userDoctor, userAge, userBlood, userGenotype, userWeight, userAllergies })

        await newUserProfile.save();
        res.status(200).json({ message: 'User profile saved successfully' });

    }catch(error){
        console.log(error)
        res.status(500).json(error);
    }
    
};

const sendMessage = async (req, res) => {
    try {
      const { senderID, recipientID, newMessage } = req.body;
  
      const chatMessage = new chatModel({
        senderID: senderID, // The sender's user or doctor ID
        recipientID: recipientID, // The recipient's user or doctor ID
        newMessage: newMessage,
      });
  
      const savedMessage = await chatMessage.save();
  
      res.json({ message: 'Message sent successfully', savedMessage });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  };
  

module.exports = { registerUser, loginUser, findUser, saveProfile, sendMessage };