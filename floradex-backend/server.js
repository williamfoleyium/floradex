import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import connectDB from './src/db.js';
import plantRoutes from './src/routes/plantRoutes.js';
import session from 'express-session'; 
import MongoStore from 'connect-mongo';
import passport from './src/config/passport.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/userRoutes.js'; 


console.log("Loaded MONGO_URI:", process.env.MONGODB_URI);



// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define image path
const imagePath = path.join(__dirname, 'public/assets/images/plants');

// Debug image paths
const snakePlantPath = path.join(imagePath, 'SnakePlant.jpg');
const chineseEvergreenPath = path.join(imagePath, 'ChineseEvergreen.jpg');

console.log('Snake Plant exists:', fs.existsSync(snakePlantPath));
console.log('Chinese Evergreen exists:', fs.existsSync(chineseEvergreenPath));

try {
  console.log('Images directory:', imagePath);
  console.log('Available images:', fs.readdirSync(imagePath));
  
  const snakePlantPath = path.join(imagePath, 'SnakePlant.jpg');
  const chineseEvergreenPath = path.join(imagePath, 'ChineseEvergreen.jpg');
  
  console.log('Snake Plant exists:', fs.existsSync(snakePlantPath));
  console.log('Chinese Evergreen exists:', fs.existsSync(chineseEvergreenPath));
} catch (error) {
  console.error('Error checking files:', error);
}

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Adjust to your frontend's URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to Database first
await connectDB();

console.log("MONGO_URI:", process.env.MONGO_URI);
// Set up the session store with the existing connection
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_for_dev',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,  
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serve static files - make sure this path matches where your images actually are
app.use('/images', express.static(path.join(__dirname, 'public/assets/images')));

// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

