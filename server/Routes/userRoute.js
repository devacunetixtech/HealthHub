const express = require("express");
const { registerUser, loginUser, findUser, saveProfile, sendMessage } = require("../Controllers/userController");
const medicUserModel = require("../Models/medicUserModel")


const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.post("/",findUser);
router.post("/save-profile", saveProfile);

router.post('/send-message', sendMessage);

router.get("/doctors", async (req, res) => {
    try {
      const users = await medicUserModel.find({}, "name"); // Retrieve only the 'name' field
      
    if (users.length === 0) {
        res.status(404).json({ error: "No users found" });
        return;
      }
  
      const randomUser = users[Math.floor(Math.random() * users.length)]; // Select a random user
  
      res.json(randomUser);
    //   res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to retrieve user names" });
    }
  });
  

module.exports = router;