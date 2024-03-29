import express from "express"
import mongoose from "mongoose"
import profileRoute from "./routes/profileRoute.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connect = async ()=> {
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("db connected")
     } catch (error) {
       throw (error);
     } 
    };

// Test MongoDB connection
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected');
});


// Middleware
app.use(express.static('uploads'));
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Routes
app.use('/api', profileRoute);

// Start server
app.listen(PORT, () => {
    connect()
  console.log(`Server is running on port ${PORT}`);
});