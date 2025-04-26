import Plant from '../models/Plant.js'; // Ensure you import the Plant model

// Get all plants
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new plant
export const createPlant = async (req, res) => {
  const plant = new Plant(req.body);
  try {
    const newPlant = await plant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a plant
export const updatePlant = async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns the updated document
    );
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(updatedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a plant
export const deletePlant = async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json({ message: 'Plant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
