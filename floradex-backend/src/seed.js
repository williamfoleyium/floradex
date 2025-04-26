import Plant from './models/Plant.js';
import connectDB from './db.js';
import fs from 'fs';
import { parse } from 'csv-parse';

const seedPlants = [
  {
    name: "Gardenia",
    scientificName: "Gardenia jasminoides",
    image: "/images/plants/Gardenia.jpg",
    lightNeeds: "Full sun, partial sun",
    waterNeeds: "Low / semi dry",
    difficulty: "Intermediate",
    type: "Indoor",
    description: "Fragrant with beautiful flowers"
  },
  {
    name: "Plumeria",
    scientificName: "Frangipani",
    image: "/images/plants/Plumeria.jpg",
    lightNeeds: "Full sun",
    waterNeeds: "Low",
    difficulty: "Intermediate",
    type: "Indoor, outdoor US zones 10-12",
    description: "Fragrant tropical tree from the Pacific islands"
  }
];

// const importCSVData = async () => {
//   const plants = [];
//   const parser = fs
//     .createReadStream('./src/data/plants.csv')
//     .pipe(parse({
//       columns: true,
//       delimiter: ',',
//     }));

//   for await (const record of parser) {
//     console.log('Original image path:', record.image);
//     if (record.name.includes('Snake') || record.name.includes('Chinese')) {
//       console.log('CSV record for problematic plant:', {
//         name: record.name,
//         originalImage: record.image
//       });
//   }
//     const formattedPlant = {
//       ...record,
//       image: record.image ? `/images/plants/${record.image}` : '/images/plants/default.jpg'
//     };
//     console.log('Formatted image path:', formattedPlant.image);
//     plants.push(formattedPlant);
//   }
//   return plants;
// };

const importCSVData = async () => {
  const plants = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream('./src/data/plants.csv')
      .pipe(parse({
        columns: true,
        delimiter: ',',
        skip_empty_lines: true
      }))
      .on('data', (record) => {
        // Debug logging for each record
        console.log('Processing CSV record:', record.name);
        
        // Create formatted plant with ALL fields from CSV
        const formattedPlant = {
          name: record.name?.trim(),
          scientificName: record.scientificName?.trim(),
          image: record.image ? `/images/plants/${record.image.trim()}` : '/images/plants/default.jpg',
          lightNeeds: record.lightNeeds?.trim(),
          waterNeeds: record.waterNeeds?.trim(),
          humidity: record.humidity?.trim(),
          difficulty: record.difficulty?.trim(),
          type: record.type?.trim(),
          temperatureRange: record.temperatureRange?.trim(),
          matureSize: record.matureSize?.trim(),
          description: record.description?.trim(),
          careInstructions: record.careInstructions?.trim(),
          toxicity: record.toxicity?.trim()
        };

        // Debug logging to verify all fields
        console.log('Formatted plant details:', {
          name: formattedPlant.name,
          humidity: formattedPlant.humidity,
          temperatureRange: formattedPlant.temperatureRange,
          matureSize: formattedPlant.matureSize,
          toxicity: formattedPlant.toxicity,
          careInstructions: Boolean(formattedPlant.careInstructions)
        });

        plants.push(formattedPlant);
      })
      .on('error', (error) => {
        console.error('CSV parsing error:', error);
        reject(error);
      })
      .on('end', () => {
        console.log(`Finished processing ${plants.length} plants from CSV`);
        // Log the first plant as a sample
        if (plants.length > 0) {
          console.log('Sample plant data:', JSON.stringify(plants[0], null, 2));
        }
        resolve(plants);
      });
  });
};

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to database');
    
    await Plant.deleteMany({});
    console.log('Cleared existing plants');
    
    await Plant.insertMany(seedPlants);
    console.log('Inserted seed plants');
    
    const csvPlants = await importCSVData();
    console.log('CSV plants loaded:', csvPlants.length);
    
    await Plant.insertMany(csvPlants);
    console.log('Inserted CSV plants');
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedDB();