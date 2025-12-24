import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/mongodb';
import Testimonial from '@/app/models/Testimonial';

// GET: Fetch a single testimonial by id
export async function GET(request, { params }) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findOne({ id: params.id });
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

// PUT: Update a testimonial by id
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      { id: params.id },
      data,
      { new: true, runValidators: true }
    );
    if (!updatedTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTestimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE: Delete a testimonial by id
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const deletedTestimonial = await Testimonial.findOneAndDelete({ id: params.id });
    if (!deletedTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}