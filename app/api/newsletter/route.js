import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);

// POST: Subscribe to newsletter
export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const subscription = new Newsletter({ email });
    await subscription.save();
    return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}