import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Chat.module.css';
import Message from '../components/Message';

const Chat = () => {
  const { user, sendMessage } = useContext(AuthContext); // Rename the context sendMessage to avoid conflicts
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef(null);
  const senderID = user._id;
  const recipientID = localStorage.getItem('randomDoctorName');

  useEffect(() => {
    // Establish a WebSocket connection when the component mounts
    ws.current = new WebSocket('ws://localhost:5000/websocket');
    // Handle incoming messages from the WebSocket server
    ws.current.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessages([...messages, { text: receivedMessage, sender: 'other' }]);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.current.close();
    };
  }, [messages]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage) {
      // Send the message to the WebSocket server
      // const message = {
      //   // senderID: senderID,
      //   recipientID: recipientID,
      //   content: newMessage,
      // };
      
      // // Send the message as JSON
      // ws.current.send(JSON.stringify(message));
      
      ws.current.send(newMessage, senderID, recipientID);

      // Display the user's message immediately
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');

      // Send the message to the backend to save in MongoDB
      sendMessage(senderID, newMessage);
    }
  };

  return (
    <div className="flex items-center justify-center mb-2">
      <div className={styles.chatcontainer}>
        <div className={styles.chatmessages}>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </div>
        <div className={styles.chatinput}>
          <input 
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

