# Passport Authentication Configuration

## Overview
The `passport.js` file configures authentication strategies for the Floradex application, supporting both local (email/password) and Google OAuth authentication methods.

## Dependencies
- `passport`: Authentication middleware
- `passport-google-oauth20`: Google OAuth 2.0 authentication strategy
- `passport-local`: Local authentication strategy
- `User` model from `../models/User.js`

## Authentication Strategies

### User Serialization and Deserialization
#### `serializeUser()`
- Reduces user object to user ID for session storage
- Stores only the user ID in the session
- Helps maintain a lightweight session

#### `deserializeUser()`
- Converts user ID back to full user object
- Retrieves user from database using stored ID
- Allows access to user details in request object

#### Error Handling
- Handles potential database lookup errors
- Passes errors to session management

### Local Strategy (Email/Password Authentication)
#### Configuration
- Uses email as the username field
- Supports password-based local login

#### Authentication Process
1. Find user by email in database
2. Verify user existence
3. Check password using `matchPassword` method
4. Return user object or false based on credentials

#### Security Considerations
- Generic "Invalid credentials" message prevents user enumeration
- Relies on custom `matchPassword` method for secure password comparison

### Google OAuth Strategy
#### Configuration
- Uses environment variables for client credentials
- Configures callback URL for OAuth flow

#### Authentication Process
1. Receive Google profile information
2. Check if user already exists with Google ID
3. If user exists, return existing user
4. If user doesn't exist, create new user with:
   - Google ID
   - Display name
   - Email address

#### Error Handling
- Catches and forwards any errors during OAuth process

## Environment Variables
Required environment variables:
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret

## Security Best Practices
- Use HTTPS for all authentication routes
- Implement additional validation for user creation
- Protect sensitive routes with authentication middleware
- Regularly rotate OAuth client secrets

## Potential Improvements
- Add email verification for local strategy
- Implement password complexity requirements
- Add rate limiting for login attempts
- Support additional OAuth providers
- Add logging for authentication events

## Usage Example
```javascript
// In your route configuration
app.get('/auth/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));
```

## Typical Middleware Integration
```javascript
// Protect routes that require authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Use in route definitions
app.get('/profile', ensureAuthenticated, (req, res) => {
  // Only accessible to authenticated users
});
```

## Troubleshooting
- Verify environment variables are correctly set
- Check Google Developer Console for callback URL configuration
- Ensure User model supports required authentication methods
- Verify password hashing implementation

## Additional Notes
- Passport strategies are extensible
- Can add more authentication methods as needed
- Consider implementing multi-factor authentication