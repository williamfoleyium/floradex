# User Model (User.js)

## Overview
The `User.js` model defines the schema for user accounts in the Floradex application, supporting both traditional email/password and Google OAuth authentication.

## Schema Definition

### Fields

#### Authentication Fields
- `username` (String, Required)
  - Unique identifier for user
  - Must be provided during registration
  - Ensures user-friendly identification

- `email` (String, Required)
  - User's email address
  - Unique across the platform
  - Validated using regex pattern
  - Used for communication and login

- `password` (String, Conditional)
  - Hashed password for email/password authentication
  - Optional if using Google OAuth
  - Securely stored using bcrypt

- `googleId` (String, Optional)
  - Unique identifier for Google OAuth users
  - Allows alternative authentication method
  - Sparse indexing for flexibility

#### User Collection
- `plants` (Array of Plant References)
  - References to user's saved plants
  - Uses MongoDB ObjectId
  - Populated with full Plant details
  - Enables personal plant collection management

#### Metadata
- `createdAt` (Date)
  - Automatically records user registration time
  - Defaults to current timestamp

## Authentication Methods

### Password Hashing
- Pre-save middleware hooks into Mongoose
- Automatically hashes password before saving
- Uses bcrypt for secure password encryption
- Generates salt and hashes password
- Skips hashing if password unchanged

### Password Verification
- `matchPassword` method compares entered password
- Uses bcrypt to securely compare passwords
- Handles cases with no password set

## Security Features
- Unique constraints on username and email
- Email format validation
- Conditional password requirement
- Secure password hashing
- Support for multiple authentication methods

## Usage Examples

### Creating a New User
```javascript
const newUser = new User({
  username: 'plantlover123',
  email: 'user@example.com',
  password: 'securePassword123'
});

await newUser.save();
```

### Adding Plants to User Collection
```javascript
const user = await User.findById(userId);
user.plants.push(plantId);
await user.save();
```

### Verifying Password
```javascript
const isMatch = await user.matchPassword('enteredPassword');
if (isMatch) {
  // Successful login
}
```

## Best Practices
- Use strong password hashing
- Implement flexible authentication
- Protect sensitive user information
- Maintain clean, consistent user data

## Potential Improvements
- Add password strength validation
- Implement account recovery mechanisms
- Create additional authentication methods
- Add user role/permission system

## Validation Considerations
- Email format validation
- Username uniqueness
- Password complexity requirements
- Secure storage of authentication credentials

## Performance Optimization
- Use sparse indexing for optional fields
- Optimize queries on user collections
- Implement efficient authentication methods

## Security Considerations
- Never store plain-text passwords
- Use strong hashing algorithms
- Implement additional authentication factors
- Protect against common security vulnerabilities

## Extensibility
- Easy to add new authentication methods
- Supports multiple user registration approaches
- Flexible schema design for future enhancements

## Integration Points
- Compatible with Passport.js
- Supports local and OAuth authentication
- Easily integratable with various authentication strategies