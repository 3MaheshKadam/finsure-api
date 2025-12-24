import { NextResponse } from 'next/server';
import connectDB from "@/app/lib/mongodb";
import Company from "@/app/models/Company";


// GET: Fetch company details (assuming a single company record for simplicity)
export async function GET() {
  try {
    await connectDB();
    const company = await Company.findOne({});
    if (!company) {
      return NextResponse.json({ error: 'Company details not found' }, { status: 404 });
    }
    return NextResponse.json(company, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch company details' }, { status: 500 });
  }
}

// POST: Create or update company details (upsert to ensure single record)
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const company = await Company.findOneAndUpdate(
      {}, // Match any document (single record assumption)
      data,
      { upsert: true, new: true, runValidators: true }
    );
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create/update company details' }, { status: 500 });
  }
}