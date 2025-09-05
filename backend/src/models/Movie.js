import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  review: { type: String, default: '' },
  posterUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Movie', MovieSchema);
