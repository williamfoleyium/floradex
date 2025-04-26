import express from 'express';
import { getAllPlants, createPlant, updatePlant, deletePlant } from '../controllers/plantController.js';
import Plant from '../models/Plant.js';

const router = express.Router();

router.get('/', getAllPlants);
router.get('/:id', async (req, res) => {
    try {
        console.log('Fetching plant with ID:', req.params.id);
        const plant = await Plant.findById(req.params.id);
      if (!plant) {
        return res.status(404).json({ message: 'Plant not found' });
      }
      res.json(plant);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: error.message });
    }
  });
router.post('/', createPlant);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);


export default router; // Use 'export default' instead of 'module.exports'
