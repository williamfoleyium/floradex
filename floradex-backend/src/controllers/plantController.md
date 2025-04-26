# Plant Controller Documentation

## Overview
The `plantController.js` file contains essential CRUD (Create, Read, Update, Delete) operations for managing plant entries in the Floradex application. These controller functions interact with the Plant model to handle database operations.

## Dependencies
- `Plant` model imported from `'../models/Plant.js'`
- Requires `express` for request and response handling
- Uses Mongoose for database interactions

## Controller Functions

### `getAllPlants(req, res)`
Retrieves all plants from the database.

#### Parameters
- `req`: Express request object
- `res`: Express response object

#### Functionality
- Uses `Plant.find()` to fetch all plant entries
- Returns a JSON array of all plants

#### Possible Responses
- `200 OK`: Returns an array of plant objects
- `500 Internal Server Error`: If database query fails

#### Example Usage
```javascript
// GET request to fetch all plants
router.get('/plants', getAllPlants);
```

### `createPlant(req, res)`
Creates a new plant entry in the database.

#### Parameters
- `req`: Express request object (contains plant data in body)
- `res`: Express response object

#### Functionality
- Creates a new Plant instance from request body
- Saves the plant to the database
- Returns the newly created plant

#### Possible Responses
- `201 Created`: Returns the new plant object
- `400 Bad Request`: If plant creation fails due to validation errors

#### Example Usage
```javascript
// POST request to create a new plant
router.post('/plants', createPlant);
```

### `updatePlant(req, res)`
Updates an existing plant entry.

#### Parameters
- `req`: Express request object
  - `params.id`: Plant ID to update
  - `body`: Updated plant data
- `res`: Express response object

#### Functionality
- Finds plant by ID and updates with new data
- Uses `{ new: true }` to return updated document
- Handles cases where plant is not found

#### Possible Responses
- `200 OK`: Returns updated plant object
- `404 Not Found`: If no plant matches the given ID
- `400 Bad Request`: If update operation fails

#### Example Usage
```javascript
// PUT request to update a specific plant
router.put('/plants/:id', updatePlant);
```

### `deletePlant(req, res)`
Removes a plant entry from the database.

#### Parameters
- `req`: Express request object
  - `params.id`: Plant ID to delete
- `res`: Express response object

#### Functionality
- Finds plant by ID and deletes it
- Handles cases where plant is not found
- Sends confirmation message on successful deletion

#### Possible Responses
- `200 OK`: Confirms plant deletion
- `404 Not Found`: If no plant matches the given ID
- `500 Internal Server Error`: If deletion fails

#### Example Usage
```javascript
// DELETE request to remove a specific plant
router.delete('/plants/:id', deletePlant);
```

## Error Handling
- All functions include try-catch blocks
- Specific error messages are returned for different scenarios
- Appropriate HTTP status codes are used to indicate the result of the operation

## Best Practices
- Use middleware for input validation
- Implement authentication and authorization
- Add logging for tracking database operations
- Consider adding pagination for `getAllPlants`

## Potential Improvements
- Add input validation using middleware or Mongoose schema validation
- Implement more detailed error logging
- Add support for partial updates
- Create middleware for common error handling