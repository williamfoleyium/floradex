# Plant Routes (plantRoutes.js)

## Overview
The `plantRoutes.js` module defines the API endpoints for plant-related operations, providing CRUD (Create, Read, Update, Delete) functionality for plant resources.

## Dependencies
- `express`: Router creation
- `Plant`: Mongoose Plant model
- `plantController`: Controller functions for plant operations

## Route Endpoints

### Get All Plants
- **Path**: `/`
- **Method**: `GET`
- **Controller**: `getAllPlants`
- **Functionality**: Retrieve all plants from the database
- **Responses**:
  - `200`: List of plants returned
  - `500`: Server error

### Get Single Plant by ID
- **Path**: `/:id`
- **Method**: `GET`
- **Functionality**: Retrieve a specific plant by its unique identifier
- **Request Parameters**:
  - `id`: Unique MongoDB document ID
- **Responses**:
  - `200`: Plant details returned
  - `404`: Plant not found
  - `500`: Server error

### Create New Plant
- **Path**: `/`
- **Method**: `POST`
- **Controller**: `createPlant`
- **Functionality**: Add a new plant to the database
- **Request Body**:
  ```json
  {
    "name": "string",
    "scientificName": "string",
    "image": "string",
    "lightNeeds": "string",
    "waterNeeds": "string",
    "difficulty": "string",
    "type": "string",
    "description": "string"
  }
  ```
- **Responses**:
  - `201`: Plant created successfully
  - `400`: Invalid plant data
  - `500`: Server error

### Update Existing Plant
- **Path**: `/:id`
- **Method**: `PUT`
- **Controller**: `updatePlant`
- **Functionality**: Modify an existing plant's information
- **Request Parameters**:
  - `id`: Unique MongoDB document ID
- **Request Body**: Partial or full plant object
- **Responses**:
  - `200`: Plant updated successfully
  - `404`: Plant not found
  - `500`: Server error

### Delete Plant
- **Path**: `/:id`
- **Method**: `DELETE`
- **Controller**: `deletePlant`
- **Functionality**: Remove a plant from the database
- **Request Parameters**:
  - `id`: Unique MongoDB document ID
- **Responses**:
  - `200`: Plant deleted successfully
  - `404`: Plant not found
  - `500`: Server error

## Route Details

### Single Plant Retrieval
- Uses `findById()` method
- Logs plant ID for debugging
- Handles not found scenarios
- Provides detailed error logging

## Error Handling
- Comprehensive error responses
- Specific error messages
- Appropriate HTTP status codes
- Console logging for debugging

## Best Practices
- Separate route definition from logic
- Use controller functions for business logic
- Implement consistent error handling
- Provide meaningful response messages

## Potential Improvements
- Add input validation
- Implement pagination for plant lists
- Add filtering and sorting options
- Create more granular error handling

## Usage Examples

### Retrieve All Plants
```javascript
fetch('/api/plants')
  .then(response => response.json())
  .then(plants => console.log(plants));
```

### Create a New Plant
```javascript
fetch('/api/plants', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Monstera',
    scientificName: 'Monstera deliciosa',
    lightNeeds: 'Indirect light',
    waterNeeds: 'Weekly'
  })
});
```

## Debugging
- Console logging for route operations
- Detailed error message logging
- ID-based tracking for specific plant retrieval

## Security Considerations
- Use of controller functions for logic separation
- Potential for adding authentication middleware
- Error message sanitization