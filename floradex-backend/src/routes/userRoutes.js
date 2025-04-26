import express from 'express';
import User from '../models/User.js';
import Plant from '../models/Plant.js';

const router = express.Router();

// Add plant to user's "My Plants" list
router.post('/my-plants', async (req, res) => {
    try {
        const { userId, plantId } = req.body;

        if (!userId || !plantId) {
            return res.status(400).json({ message: 'User ID and Plant ID are required' });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if plant exists
        const plant = await Plant.findById(plantId);
        if (!plant) return res.status(404).json({ message: 'Plant not found' });

        // Check if plant is already added
        if (!user.plants.includes(plantId)) {
            user.plants.push(plantId);
            await user.save();
        }

        // Populate the plants field with full plant objects
        const populatedUser = await User.findById(userId).populate('plants');

        res.json({ message: 'Plant added to My Plants', plants: populatedUser.plants });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user's "My Plants" list
router.get('/my-plants/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate('plants');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Format image URLs
        const plantsWithImages = user.plants.map(plant => ({
            ...plant.toObject(),
            image: plant.image ? 
                (plant.image.startsWith('http') ? plant.image : `http://localhost:5000${plant.image}`) :
                'http://localhost:5000/images/plants/default.jpg'
        }));

        res.json(plantsWithImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Remove a plant from "My Plants"
router.delete('/my-plants', async (req, res) => {
    try {
        const { userId, plantId } = req.body;

        console.log('Remove plant request:', { userId, plantId });

        // Validate input
        if (!userId || !plantId) {
            return res.status(400).json({ 
                message: 'User ID and Plant ID are required',
                status: 400 
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found',
                status: 404 
            });
        }

        // Check if the plant exists in the user's collection
        const plantIndex = user.plants.findIndex(plant => 
            plant.toString() === plantId || plant._id?.toString() === plantId
        );

        if (plantIndex === -1) {
            return res.status(400).json({ 
                message: 'Plant not in collection',
                status: 400 
            });
        }

        // Remove plant from user's collection
        user.plants.splice(plantIndex, 1);
        await user.save();

        // Populate the plants field with full plant objects
        const populatedUser = await User.findById(userId).populate('plants');

        res.status(200).json({ 
            message: 'Plant removed successfully',
            plants: populatedUser.plants 
        });
    } catch (error) {
        console.error('Error removing plant:', error);
        res.status(500).json({ 
            message: 'Server error removing plant', 
            error: error.message 
        });
    }
});


export default router;
