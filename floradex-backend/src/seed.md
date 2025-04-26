# Database Seeding Module (seed.js)

## Overview
The `seed.js` module is responsible for populating the Floradex database with initial plant data from both hardcoded seed data and a CSV file. It provides a robust method for initializing the database with comprehensive plant information.

## Dependencies
- `Plant`: Mongoose model for plant entries
- `connectDB`: Database connection utility
- `fs`: Node.js file system module
- `csv-parse`: CSV parsing library

## Key Components

### Seed Plants
A predefined array of initial plant entries with core information, including:
- Name
- Scientific Name
- Image Path
- Light Needs
- Water Needs
- Difficulty Level
- Plant Type
- Description

### `importCSVData()` Function
#### Purpose
Reads and processes plant data from a CSV file, transforming raw data into a format compatible with the Plant model.

#### Features
- Reads plant data from `./src/data/plants.csv`
- Handles CSV parsing with robust configuration
- Transforms image paths to a consistent format
- Supports multiple plant attributes:
  - Basic information (name, scientific name)
  - Care requirements (light, water, humidity)
  - Descriptive details (difficulty, type, description)
  - Advanced attributes (temperature range, mature size, toxicity)

#### Data Transformation
- Trims whitespace from all string fields
- Provides a default image if no image is specified
- Logs detailed information for debugging

### `seedDB()` Function
#### Workflow
1. Establish database connection
2. Clear existing plant records
3. Insert predefined seed plants
4. Load and insert plants from CSV
5. Handle any errors during the process
6. Exit the process after completion

## Error Handling
- Comprehensive error logging
- Graceful process termination
- Console output for tracking seeding progress

## Usage
Run the script directly to seed the database:
```bash
node seed.js
```

## Debugging Features
- Detailed console logging
- Sample data logging
- Error tracking for CSV parsing

## Best Practices
- Separate seed data from application logic
- Use environment-specific seeding
- Implement comprehensive error handling
- Maintain a consistent data format

## Potential Improvements
- Add support for more complex data transformations
- Implement validation for imported data
- Create separate seeding scripts for different environments