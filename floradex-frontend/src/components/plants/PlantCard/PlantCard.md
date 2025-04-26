# Component Documentation: PlantCard.jsx

## Overview
A reusable React component for displaying individual plant information with interactive features for adding or removing plants from a user's collection.

## Type
- **Component Type**: React Functional Component
- **File Location**: `src/components/PlantCard/PlantCard.jsx`

## Dependencies
### External Libraries
- `react-router-dom`
- `prop-types`

### Internal Dependencies
- `PlantCard.module.css` for styling

## Props Interface
### Input Props
| Prop Name | Type | Required | Description | Default |
|-----------|------|----------|-------------|---------|
| `id` | `string` | Yes | Unique plant identifier | - |
| `name` | `string` | Yes | Common plant name | - |
| `scientificName` | `string` | No | Scientific plant name | `undefined` |
| `image` | `string` | No | Plant image URL | Placeholder image |
| `careLevel` | `string` | No | Plant care difficulty | - |
| `lightNeeds` | `string` | No | Light requirement description | - |
| `waterNeeds` | `string` | No | Watering requirement description | - |
| `isUserPlant` | `boolean` | No | Indicates if plant is in user's collection | `false` |
| `lastWatered` | `string` | No | Date plant was last watered | `undefined` |
| `onAddToMyPlants` | `function` | No | Callback to add plant to collection | `undefined` |
| `onRemoveFromMyPlants` | `function` | No | Callback to remove plant from collection | `undefined` |

## Key Functions
### `handleAddRemove(e)`
- **Purpose**: Toggle plant in user's collection
- **Workflow**:
  1. Prevent default link navigation
  2. Call appropriate add/remove function based on current state
- **Conditions**:
  - Adds plant if not in user's collection
  - Removes plant if already in user's collection

### `getCareLabel(level)`
- **Purpose**: Convert care level to human-readable label
- **Mapping**:
  - `easy` → 'Easy Care'
  - `moderate` → 'Moderate Care'
  - `expert` → 'Expert Care'
- **Fallback**: Returns original level if no match

## Rendering Logic
### Card Structure
- Clickable link to plant details page
- Image with care level overlay
- Plant name and scientific name
- Care information (light and water needs)
- Conditional last watered date for user plants
- Action button to add/remove plant

## Visual Elements
### Styling Variations
- Dynamic care level styling
- Different button states for add/remove
- Responsive image container
- Consistent typography

## User Interaction
### Navigation
- Clicking card navigates to plant details page
- Prevents navigation when interacting with action button

### Collection Management
- Single-click add/remove functionality
- Clear visual feedback on plant collection status

## Accessibility Considerations
- Semantic HTML structure
- Descriptive button text
- Alt text for images
- Keyboard navigable

## Performance Considerations
- Minimal component complexity
- Efficient prop handling
- No unnecessary re-renders

## Error Handling
- Fallback for missing image
- Graceful handling of undefined props
- Prevents errors with default prop values

## Example Usage
```jsx
// In a parent component
function PlantList() {
  return (
    <PlantCard 
      id="unique-plant-id"
      name="Snake Plant"
      scientificName="Sansevieria trifasciata"
      careLevel="easy"
      onAddToMyPlants={handleAddPlant}
    />
  );
}
```

## Styling
- Modular CSS using CSS Modules
- Responsive design
- Dynamic class application
- Care level-based color coding

## Potential Improvements
- Add hover effects
- Implement lazy loading for images
- Create more detailed care level indicators
- Add tooltips for care information
- Enhance accessibility features

## Integration Patterns
- Reusable across different plant list contexts
- Flexible prop-based configuration
- Seamless integration with plant management systems

## Version Information
- **Created**: [Initial Project Date]
- **Last Updated**: [Current Date]
- **Version**: 1.0.0

## Changelog
- **1.0.0**: Initial implementation
  - Basic plant card rendering
  - Add/remove plant functionality
  - Responsive design
  - Care level styling