# Component Documentation: PlantList.jsx

## Overview
A reusable React component for displaying and managing lists of plants with advanced sorting and filtering capabilities. Supports both encyclopedia and user plant collections.

## Type
- **Component Type**: React Functional Component
- **File Location**: `src/components/PlantList/PlantList.jsx`

## Dependencies
### External Libraries
- `react`
- `prop-types`

### Internal Dependencies
- `PlantCard` component
- `PlantList.module.css` for styling

## Props Interface
### Input Props
| Prop Name | Type | Required | Description | Default |
|-----------|------|----------|-------------|---------|
| `plants` | `Array<Plant>` | No | List of plants to display | `[]` |
| `isUserPlants` | `boolean` | No | Indicates if list is user's plants | `false` |
| `onAddToMyPlants` | `function` | No | Callback for adding a plant | `undefined` |
| `onRemoveFromMyPlants` | `function` | No | Callback for removing a plant | `undefined` |

### Plant Object Shape
```javascript
{
  _id: string,
  name: string,
  careLevel: string,
  lastWatered?: string,
  image: string,
  difficulty: string,
  type: string
}
```

## State Management
### Local State
- `sortBy`: Controls plant sorting criteria
  - Options: 'name', 'careLevel', 'lastWatered'
- `filterCareLevel`: Filters plants by care difficulty
  - Options: 'all', 'easy', 'moderate', 'expert'

## Key Functions
### `sortPlants(plantsToSort)`
- **Purpose**: Sort plants based on selected criteria
- **Sorting Options**:
  - By name (alphabetical)
  - By care level
  - By last watered date (user plants only)
- **Returns**: Sorted array of plants

### `filterPlants(plantsToFilter)`
- **Purpose**: Filter plants by care level
- **Filtering Options**:
  - Show all plants
  - Filter by specific care difficulty
- **Returns**: Filtered array of plants

## Rendering Logic
### Plant Display
- Renders `PlantCard` components for each plant
- Supports empty state with custom messages
- Dynamically adjusts based on `isUserPlants` prop

## User Interaction
### Sorting Controls
- Dropdown to select sorting method
- Adapts sorting options based on plant collection type
- Real-time sorting without page reload

### Filtering Controls
- Dropdown to filter by care level
- Immediate visual feedback
- Supports "All Care Levels" option

## Accessibility Considerations
- Semantic HTML structure
- Descriptive `select` elements
- Meaningful empty state messages

## Performance Considerations
- Memoized sorting and filtering
- Minimal re-renders
- Efficient array manipulation

## Error Handling
- Graceful handling of empty plant lists
- Provides contextual messages
- Prevents rendering errors with default props

## Example Usage
```jsx
// In a parent component
function PlantsPage() {
  return (
    <PlantList 
      plants={encyclopediaPlants}
      isUserPlants={false}
      onAddToMyPlants={handleAddPlant}
    />
  );
}
```

## Styling
- Modular CSS using CSS Modules
- Responsive grid layout
- Consistent component styling
- Dynamic class application

## Potential Improvements
- Add search functionality
- Implement more advanced filtering
- Create pagination for large plant lists
- Add transition animations
- Enhance accessibility features

## Integration Patterns
- Reusable across different plant list contexts
- Flexible prop-based configuration
- Seamless integration with Redux state

## Version Information
- **Created**: [Initial Project Date]
- **Last Updated**: [Current Date]
- **Version**: 1.0.0

## Changelog
- **1.0.0**: Initial implementation
  - Basic plant list rendering
  - Sorting and filtering capabilities
  - Supports encyclopedia and user plant views