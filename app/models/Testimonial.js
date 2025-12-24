import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Removed required: true
  name: { type: String, required: true },
  location: { type: String, required: true },
  loanType: { type: String, required: true },
  amount: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  image: { type: String, required: true },
  review: { type: String, required: true },
  helpful: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  date: { type: String, required: true },
}, { timestamps: true });
delete mongoose.models.Testimonial; // Prevent Overwrite model issue in watch mode
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;