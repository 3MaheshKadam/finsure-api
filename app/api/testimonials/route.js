import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Testimonial from '@/app/models/Testimonial';

// GET: Fetch all testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    console.log('Fetched Testimonials:', testimonials);
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials', details: error.message }, { status: 500 });
  }
}

// POST: Create a new testimonial
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log('Received POST data:', data);

    // Convert rating to number if it's a string
    if (data.rating && typeof data.rating === 'string') {
      data.rating = parseInt(data.rating, 10);
    }

    // Generate a unique id
    const lastTestimonial = await Testimonial.findOne().sort({ id: -1 });
    data.id = lastTestimonial ? lastTestimonial.id + 1 : 1;

    const newTestimonial = new Testimonial(data);
    console.log('New Testimonial:', newTestimonial);

    await newTestimonial.save();
    console.log('Testimonial saved successfully:', newTestimonial);

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to create testimonial', details: error.message }, { status: 500 });
  }
}