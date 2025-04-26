# Database Connection Module (db.js)

## Overview
The `db.js` module is responsible for establishing a connection to the MongoDB database using Mongoose. It provides a robust connection method with error handling and environment configuration.

## Dependencies
- `mongoose`: ODM (Object Document Mapper) for MongoDB
- `dotenv`: Loads environment variables from a .env file

## Configuration
- Loads environment variables using `dotenv.config()`
- Retrieves MongoDB connection URI from `.env` file

## Main Function: `connectDB()`

### Purpose
Establishes a secure and reliable connection to the MongoDB database.

### Workflow
1. Checks if `MONGODB_URI` is defined in environment variables
2. Attempts to connect to the database using Mongoose
3. Logs successful connection or handles connection errors

### Error Handling
- Throws an error if `MONGODB_URI` is not found
- Logs detailed connection errors
- Exits the process if connection fails (preventing app startup)

### Usage Example
```javascript
import connectDB from './db.js';

// Call this function during app initialization
connectDB();
```

## Environment Variables
- `MONGODB_URI`: Required. Contains the complete MongoDB connection string
  - Should be stored in `.env` file
  - Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

## Debugging
- Logs the MongoDB URI (masked for security) during startup
- Provides clear error messages for connection issues

## Best Practices
- Keep `MONGODB_URI` secret and out of version control
- Use environment-specific connection strings
- Implement proper error logging and handling