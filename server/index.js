// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const userRoute = require("./Routes/userRoute");

// const app = express();
// require("dotenv").config()

// app.use(express.json());    

// app.use(cors());
// app.use("/api/users", userRoute);

// app.get("/", (req, res)=>{
//     res.send("Welcome to MERN STACK")
// });

// const port = process.env.PORT || 5000;
// const uri = process.env.ATLAS_URI;
// app.listen(port, (req, res) => {
//     console.log(`Server running on port: ${port}`);
// })
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=> console.log("MongoDB Connection Established"))
// .catch((error)=>console.log("MongoDB Connection Failed: ", error.message))


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const http = require('http');
const WebSocket = require('ws');
const userModel = require("./Models/userModel")
const medicUserModel = require("./Models/medicUserModel")

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to MERN STACK");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Create an HTTP server using Express
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server, path: "/websocket" });

const clients = new Set(); // To store connected clients

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  clients.add(ws);

  // Handle WebSocket messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    for (const client of clients) {
      client.send(`User: ${message}`);
    }
  });
  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
    console.log('WebSocket client disconnected');
  });
});


// Start both HTTP and WebSocket servers
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connection Established"))
  .catch((error) => console.log("MongoDB Connection Failed: ", error.message));
