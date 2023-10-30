// Import necessary dependencies
const mongoose = require('mongoose');

// Define the message schema
const chatSchema = new mongoose.Schema({
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'userModel', // Reference to either 'User' or 'Doctor'
        required: true,
      },
    recipientID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'medicUserModel', // Reference to either 'User' or 'Doctor'
        required: true,
      },
      userModel: {
        type: String,
        enum: ['User'], // Define possible models for 'sender'
      },
      medicUserModel: {
        type: String,
        enum: ['MedicUser'], // Define possible models for 'recipient'
      },
      newMessage: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const chatModel = mongoose.model('Chat', chatSchema);

module.exports = chatModel;
