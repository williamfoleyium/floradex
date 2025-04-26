import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  image: { type: String, required: true },
  lightNeeds: { type: String, required: true },
  waterNeeds: { type: String, required: true },
  humidity: { type: String },
  difficulty: { type: String, required: true },
  type: { type: String, required: true },
  temperatureRange: { type: String },
  matureSize: { type: String },
  description: { type: String, required: true },
  careInstructions: { type: String },
  toxicity: { type: String }
}, {
  timestamps: true
});

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;