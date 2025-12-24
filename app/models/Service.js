// app/models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: String, required: true }, // e.g., "₹1L - ₹50L"
  rate: { type: String, required: true }, // e.g., "10.5% p.a. onwards"
  tenure: { type: String, required: true }, // e.g., "12-60 months"
  processingTime: { type: String, required: true }, // e.g., "24 hours"
  icon: { type: String, required: true }, // e.g., "CreditCard"
  color: { type: String, required: true }, // e.g., "#4248f8"
  features: [{ type: String }], // Array of strings
  eligibility: [{ type: String }], // Array of strings
  documents: [{ type: String }], // Array of strings
  benefits: [{ type: String }], // Array of strings
  faqs: [{ question: String, answer: String }], // Array of objects
  useCases: [{ type: String }], // Array of strings
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  minRate: { type: Number, required: true },
  slug: { type: String, unique: true, required: true } // New: for friendly URLs
}, { timestamps: true }); // New: auto-add createdAt/updatedAt

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);