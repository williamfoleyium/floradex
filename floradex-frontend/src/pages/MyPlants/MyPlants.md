# Component Documentation: MyPlants

## Purpose
Displays and manages the user's personal plant collection. Serves as a container component that shows all plants added by the user.

## Props
- None (uses Redux state)

## Redux State Dependencies
- `state.auth.user`: Current authenticated user information
- `state.plants.userPlants`: Array of plants in the user's collection

## Internal State
- None (relies entirely on Redux state)

## Key Functions
- `handleAddToMyPlants(plantId)`: Adds a plant to the user's collection
- `handleRemoveFromMyPlants(plantId)`: Removes a plant from the user's collection

## Side Effects
- Fetches user plants when component mounts if user is authenticated

## Child Components
- `PlantList`: Renders the list of plants in the user's collection

## Props Passed to Children
- `plants`: Array of plant objects from userPlants state
- `isUserPlants`: Boolean flag indicating these are user's plants
- `onAddToMyPlants`: Function to add plant to collection
- `onRemoveFromMyPlants`: Function to remove plant from collection

## User Interactions
- Shows empty state message when no plants are in collection
- Enables adding/removing plants through the PlantList component

## Error Handling
- Basic check for user authentication before dispatching actions