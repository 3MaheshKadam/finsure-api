// // // app/api/services/route.js
// // import { NextResponse } from 'next/server';
// // import connectDB from '@/app/lib/mongodb';
// // import Service from '@/app/models/Service';

// // // GET: Fetch all services
// // export async function GET() {
// //   try {
// //     await connectDB();
// //     const services = await Service.find({});
// //     return NextResponse.json(services, { status: 200 });
// //   } catch (error) {
// //     console.error('GET Error:', error);
// //     return NextResponse.json({ error: 'Failed to fetch services', details: error.message }, { status: 500 });
// //   }
// // }

// // // POST: Create a new service
// // export async function POST(request) {
// //   try {
// //     await connectDB();
// //     const data = await request.json();
// //     console.log('Received POST data:', data);
// //     const newService = new Service(data);
// //     console.log('New Service:', newService);
// //     await newService.save();
// //     return NextResponse.json(newService, { status: 201 });
// //   } catch (error) {
// //     console.error('POST Error:', error);
// //     return NextResponse.json(
// //       { error: 'Failed to create service', details: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }
// // app/api/services/route.js
// import { NextResponse } from 'next/server';
// import connectDB from '@/app/lib/mongodb';
// import Service from '@/app/models/Service';
// import slugify from 'slugify'; // Install: npm install slugify

// // GET: Fetch all services
// export async function GET() {
//   try {
//     await connectDB();
//     const services = await Service.find({}).sort({ createdAt: -1 });
//     return NextResponse.json(services, { status: 200 });
//   } catch (error) {
//     console.error('GET Error:', error.message, error.stack);
//     return NextResponse.json({ error: 'Failed to fetch services', details: error.message }, { status: 500 });
//   }
// }

// // POST: Create a new service
// export async function POST(request) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     console.log('Received POST data:', data);

//     // Auto-generate slug from title
//     if (!data.slug) {
//       data.slug = slugify(data.title, { lower: true, strict: true });
//       // Ensure uniqueness (append number if duplicate)
//       let existing = await Service.findOne({ slug: data.slug });
//       let counter = 1;
//       while (existing) {
//         data.slug = `${slugify(data.title, { lower: true, strict: true })}-${counter}`;
//         existing = await Service.findOne({ slug: data.slug });
//         counter++;
//       }
//     }

//     const newService = new Service(data);
//     await newService.save();
//     return NextResponse.json(newService, { status: 201 });
//   } catch (error) {
//     console.error('POST Error:', error.message, error.stack);
//     return NextResponse.json({ error: 'Failed to create service', details: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Service from "@/app/models/Service";

/**
 * Simple slug generator (NO external deps)
 */
function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → hyphen
    .replace(/-+/g, "-");         // collapse multiple -
}

/**
 * GET /api/services
 */
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("GET /services error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/services
 */
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = makeSlug(data.title);
    let slug = baseSlug;
    let counter = 1;

    while (await Service.exists({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const service = await Service.create({
      ...data,
      slug,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("POST /services error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
