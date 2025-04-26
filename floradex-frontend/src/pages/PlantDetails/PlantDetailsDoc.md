# Component Documentation: PlantDetails

## Purpose
Displays detailed information about a specific plant and allows users to add/remove plants from their personal collection.

## Props
- None (uses URL parameters and Redux state)

## URL Parameters
- `id`: Plant ID from the URL path

## Redux State Dependencies
- `state.auth.user`: Current authenticated user
- `state.auth.isAuthenticated`: Authentication status
- `state.plants.encyclopediaPlants`: Database of all plants
- `state.plants.userPlants`: Plants in user's collection
- `state.plants.loading`: Loading status for plant operations
- `state.plants.error`: Error state for plant operations

## Internal State
- `isInUserCollection`: Local state tracking if the current plant is in user's collection

## Key Functions
- `checkIsUserPlant()`: Determines if the current plant is in the user's collection
- `handleAddRemovePlant()`: Handles adding/removing plants with optimistic UI updates

## Side Effects
- Fetches user plants when component mounts if user is authenticated
- Fetches plant details if not available in Redux store
- Updates local state when userPlants changes in Redux

## User Interactions
- "Add to My Plants" button adds plant to user collection with immediate UI feedback
- "Remove from My Plants" button removes plant from collection with immediate UI feedback
- Redirects to login page if user is not authenticated

## Error Handling
- Displays loading state while fetching plant details
- Shows error message if plant fetch fails
- Reverts optimistic UI updates if add/remove operations fail