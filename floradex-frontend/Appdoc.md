Floradex Application Documentation
Project Overview
Floradex is a comprehensive plant care and encyclopedia web application designed to help users explore, track, and manage their plant collections.
Tech Stack

Frontend: React, Vite, Redux, Node.js
Backend: Mongoose, Express, dotenv
Authentication: Passport.js

Frontend Components
1. PlantDetails.jsx
Purpose: Displays detailed information for a specific plant
Key Responsibilities:

Render comprehensive plant information
Handle individual plant view
Display botanical details, care instructions, and images

Props Expected:

plantId: Unique identifier for the selected plant
plantDetails: Object containing detailed plant information

Redux Interaction:

Dispatches action to fetch plant details
Retrieves plant information from global state

2. MyPlants.jsx
Purpose: Manage user's personal plant collection
Key Responsibilities:

Display user's owned plants
Allow addition/removal of plants from personal collection
Track plant care status and details

Props Expected:

userPlants: Array of plants in user's collection
userId: Current user's unique identifier

Redux Interaction:

Dispatches actions for:

Fetching user's plant collection
Adding/removing plants
Updating plant care status



3. PlantList.jsx
Purpose: Reusable component for displaying collections of plants
Key Responsibilities:

Render list of plant cards
Support filtering and sorting
Handle pagination if needed

Props Expected:

plants: Array of plant objects
listType: Determines rendering context (encyclopedia, my plants, etc.)
onPlantSelect: Optional callback for plant selection

4. PlantCard.jsx
Purpose: Display compact plant information in list views
Key Responsibilities:

Show plant thumbnail
Display basic plant information
Provide link to detailed view

Props Expected:

plant: Plant object with basic information
onClick: Optional click handler for card interaction

5. plantsSlice.js (Redux State Management)
Purpose: Centralize plant-related state management
Key Slices:

encyclopediaPlants: Stores encyclopedia plant entries
userPlants: Manages user's personal plant collection
selectedPlant: Currently viewed/selected plant details

Actions:

fetchEncyclopediaPlants
addPlantToCollection
removePlantFromCollection
updatePlantStatus

Backend Components
1. server.js
Purpose: Main server configuration and initialization
Key Responsibilities:

Set up Express server
Configure middleware
Initialize database connection
Start server listening

2. auth.js
Purpose: Authentication middleware and logic
Key Features:

User authentication strategies
Password hashing
Token generation
Authorization checks

3. userRoutes.js
Purpose: Define user-related API endpoints
Endpoints:

/register: User registration
/login: User authentication
/profile: User profile management

4. passport.js
Purpose: Authentication configuration
Strategies:

Local authentication
JWT token strategy
Google/OAuth integration (if implemented)

5. User.js (Mongoose Model)
Purpose: Define user data schema
Schema Fields:

username
email
password (hashed)
plantCollection
preferences

6. Plant.js (Mongoose Model)
Purpose: Define plant data schema
Schema Fields:

name
scientificName
description
careInstructions
wateringFrequency
sunlightRequirements
imageUrls

7. plantRouter.js
Purpose: Define plant-related API endpoints
Endpoints:

/encyclopedia: Retrieve plant encyclopedia
/plants: CRUD operations for plant entries
/my-plants: User's plant collection management

Environment Configuration

Use .env for storing sensitive information
Configure database connection strings
Set up authentication secret keys

Recommended Improvements

Implement comprehensive error handling
Add robust input validation
Create more granular Redux actions
Develop thorough testing suite
Implement caching mechanisms for performance

Future Roadmap

Mobile application
Advanced plant care tracking
Community features
Machine learning plant identification