# User Routes (userRoutes.js)

## Overview
The `userRoutes.js` module handles user-specific plant collection management, providing endpoints to add, retrieve, and remove plants from a user's personal collection.

## Dependencies
- `express`: Router creation
- `User`: Mongoose User model
- `Plant`: Mongoose Plant model

## Route Endpoints

### Add Plant to My Plants
- **Path**: `/my-plants`
- **Method**: `POST`
- **Functionality**: Add a plant to user's collection
- **Request Body**:
  ```json
  {
    "userId": "string",
    "plantId": "string"
  }
  ```
- **Validation**:
  - Checks for valid User ID
  - Checks for valid Plant ID
  - Prevents duplicate plant additions
- **Responses**:
  - `200`: Plant successfully added
  - `400`: Missing or invalid IDs
  - `404`: User or Plant not found
  - `500`: Server error

### Get User's Plant Collection
- **Path**: `/my-plants/:userId`
- **Method**: `GET`
- **Functionality**: Retrieve all plants in user's collection
- **Request Parameters**:
  - `userId`: Unique user identifier
- **Features**:
  - Populates full plant details
  - Formats image URLs
  - Provides default image if none exists
- **Responses**:
  - `200`: List of plants returned
  - `404`: User not found
  - `500`: Server error

### Remove Plant from My Plants
- **Path**: `/my-plants`
- **Method**: `DELETE`
- **Functionality**: Remove a plant from user's collection
- **Request Body**:
  ```json
  {
    "userId": "string",
    "plantId": "string"
  }
  ```
- **Validation**:
  - Checks for valid User ID
  - Checks for valid Plant ID
  - Verifies plant exists in collection
- **Responses**:
  - `200`: Plant successfully removed
  - `400`: Missing or invalid IDs
  - `404`: User not found
  - `500`: Server error

## Image Handling
- Dynamic image URL generation
- Supports both external and local image paths
- Provides default image fallback
- Handles different image path formats

## Error Handling
- Comprehensive error responses
- Detailed error logging
- Specific error messages
- Appropriate HTTP status codes

## Best Practices
- Validate all input parameters
- Use population to retrieve full plant details
- Implement consistent error handling
- Provide meaningful response messages
- Prevent duplicate plant additions

## Potential Improvements
- Add pagination for large plant collections
- Implement more advanced filtering
- Create batch add/remove plant methods
- Add plant collection size limits

## Usage Examples

### Add Plant to Collection
```javascript
fetch('/api/users/my-plants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123',
    plantId: 'plant456'
  })
});
```

### Retrieve User's Plants
```javascript
fetch('/api/users/my-plants/user123')
  .then(response => response.json())
  .then(plants => console.log(plants));
```

### Remove Plant from Collection
```javascript
fetch('/api/users/my-plants', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123',
    plantId: 'plant456'
  })
});
```

## Debugging
- Detailed console logging
- Track user and plant operations
- Log errors with context

## Security Considerations
- Input validation
- Prevent unauthorized plant modifications
- Protect against injection attacks
- Validate user authentication (potential enhancement)