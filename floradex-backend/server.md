# Server Configuration Module (server.js)

## Overview
The `server.js` file is the core configuration file for the Floradex application, setting up the Express server, middleware, database connection, and routing.

## Dependencies
- Core Node.js Modules:
  - `path`: Path manipulation utilities
  - `fs`: File system operations
  - `url`: URL resolution

- External Packages:
  - `express`: Web application framework
  - `cors`: Cross-Origin Resource Sharing middleware
  - `dotenv`: Environment variable management
  - `express-session`: Session management
  - `connect-mongo`: MongoDB session store
  - `passport`: Authentication middleware
  - `cookie-parser`: Cookie handling

## Environment Configuration
- Loads environment variables using `dotenv`
- Supports both development and production environments
- Configures fallback values for critical settings

## Server Initialization

### Middleware Configuration
#### CORS Setup
- Configured for localhost:5173 (development frontend)
- Supports multiple HTTP methods
- Enables credentials sharing

#### Request Parsing
- JSON parsing
- URL-encoded data parsing
- Cookie parsing

## Database Connection
- Uses `connectDB()` to establish MongoDB connection
- Configures session storage using MongoDB

## Session Management
- Uses `express-session` with MongoDB store
- Configures session parameters:
  - Secret key (with fallback)
  - Session expiration
  - Secure cookie settings

## Authentication
- Initializes Passport.js for authentication
- Configures session-based authentication

## Static File Serving
- Serves static image files from `/public/assets/images`
- Accessible via `/images` endpoint

## API Routes
Defined routes:
- `/api/plants`: Plant-related operations
- `/api/auth`: Authentication endpoints
- `/api/users`: User management endpoints

## Error Handling and Logging
- Comprehensive console logging
- Image path and file existence debugging
- Environment-specific configurations

## Server Startup
- Dynamically assigns port (default: 5000)
- Logs server startup information

## Best Practices
- Separate configuration concerns
- Use environment variables
- Implement secure session management
- Provide fallback configurations

## Potential Improvements
- Add global error handling middleware
- Implement more robust logging
- Create environment-specific configurations

## Usage Example
```bash
# Start the server
npm run start:server

# Development mode
npm run dev:server
```

## Debugging
Extensive logging is implemented to track:
- MongoDB URI
- Image file paths
- Server configuration
- Session management

## Security Considerations
- Secure cookie settings in production
- CORS restrictions
- Session secret management