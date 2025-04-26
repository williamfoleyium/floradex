# Authentication Routes (auth.js)

## Overview
The `auth.js` routes module handles user authentication processes, including registration, login, OAuth, logout, and user session management.

## Dependencies
- `express`: Router creation
- `passport`: Authentication middleware
- `User`: Mongoose User model

## Route Endpoints

### User Registration
- **Path**: `/register`
- **Method**: `POST`
- **Functionality**: Create a new user account
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `201`: User created successfully
  - `400`: User already exists
  - `500`: Server error

### User Login
- **Path**: `/login`
- **Method**: `POST`
- **Functionality**: Authenticate user credentials
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200`: Login successful
  - `401`: Invalid credentials
  - `500`: Server error

### Google OAuth
- **Paths**:
  - `/google`: Initiate Google OAuth login
  - `/google/callback`: OAuth callback handling
- **Functionality**: 
  - Redirect to Google authentication
  - Handle successful/failed authentication

### Logout
- **Path**: `/logout`
- **Method**: `GET`
- **Functionality**: Terminate user session
- **Responses**:
  - `200`: Logout successful
  - `500`: Logout error

### Current User
- **Path**: `/current-user`
- **Method**: `GET`
- **Functionality**: Retrieve authenticated user information
- **Responses**:
  - `200`: User details returned
  - `401`: Not authenticated

## Authentication Flow

### Registration Process
1. Check if user email already exists
2. Create new user (password hashing automatic)
3. Automatically log in after registration
4. Return user profile information

### Login Process
1. Validate credentials using Passport local strategy
2. Create user session
3. Return user profile information

### Logout Process
1. Destroy user session
2. Clear authentication cookies

## Security Considerations
- Password hashing
- Session management
- OAuth integration
- Authentication checks for protected routes

## Error Handling
- Comprehensive error responses
- Specific error messages
- Proper HTTP status codes

## Best Practices
- Separate authentication logic
- Use secure session management
- Implement multiple authentication strategies
- Protect sensitive user information

## Potential Improvements
- Add password reset functionality
- Implement email verification
- Add more robust error handling
- Create more granular permission levels

## Usage Examples

### Registration
```javascript
fetch('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify({
    username: 'johndoe',
    email: 'john@example.com',
    password: 'securepassword'
  })
})
```

### Login
```javascript
fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'securepassword'
  })
})
```

## Debugging
- Comprehensive logging
- Detailed error messages
- Session tracking