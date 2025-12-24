
// import { NextResponse } from 'next/server';
// import connectDB from '@/app/lib/mongodb';
// import Service from '@/app/models/Service';
// import slugify from 'slugify';

// // GET: Fetch a single service by slug
// export async function GET(request, { params }) {
//   try {
//     await connectDB();
//     const service = await Service.findOne({ slug: params.slug });
//     if (!service) {
//       return NextResponse.json({ error: 'Service not found' }, { status: 404 });
//     }
//     return NextResponse.json(service, { status: 200 });
//   } catch (error) {
//     console.error('GET Error:', error.message, error.stack);
//     return NextResponse.json({ error: 'Failed to fetch service', details: error.message }, { status: 500 });
//   }
// }

// // PUT: Update a service by slug
// export async function PUT(request, { params }) {
//   try {
//     await connectDB();
//     const data = await request.json();
//     console.log('Received PUT data:', data);

//     // If title changed, regenerate slug
//     if (data.title) {
//       data.slug = slugify(data.title, { lower: true, strict: true });
//       // Ensure uniqueness (append number if duplicate, skipping self)
//       let existing = await Service.findOne({ slug: data.slug, _id: { $ne: data._id } });
//       let counter = 1;
//       while (existing) {
//         data.slug = `${slugify(data.title, { lower: true, strict: true })}-${counter}`;
//         existing = await Service.findOne({ slug: data.slug, _id: { $ne: data._id } });
//         counter++;
//       }
//     }

//     // Clean up data (remove MongoDB internals)
//     const { _id, __v, createdAt, updatedAt, ...updateData } = data;

//     const updatedService = await Service.findOneAndUpdate(
//       { slug: params.slug },
//       updateData,
//       { new: true, runValidators: true }
//     );

//     if (!updatedService) {
//       return NextResponse.json({ error: 'Service not found' }, { status: 404 });
//     }

//     console.log('Successfully updated service:', updatedService);
//     return NextResponse.json(updatedService, { status: 200 });
//   } catch (error) {
//     console.error('PUT Error:', error.message, error.stack);
//     return NextResponse.json({ error: 'Failed to update service', details: error.message }, { status: 500 });
//   }
// }

// // DELETE: Delete a service by slug
// export async function DELETE(request, { params }) {
//   try {
//     await connectDB();
//     const deletedService = await Service.findOneAndDelete({ slug: params.slug });
//     if (!deletedService) {
//       return NextResponse.json({ error: 'Service not found' }, { status: 404 });
//     }
//     return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
//   } catch (error) {
//     console.error('DELETE Error:', error.message, error.stack);
//     return NextResponse.json({ error: 'Failed to delete service', details: error.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Service from "@/app/models/Service";

/**
 * Simple slug generator (no external libs)
 */
function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-")         // spaces → hyphen
    .replace(/-+/g, "-");         // collapse multiple hyphens
}

// GET: Fetch a single service by slug
export async function GET(request, { params }) {
  try {
    await connectDB();

    const service = await Service.findOne({ slug: params.slug });
    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

// PUT: Update a service by slug
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();

    // If title changed, regenerate slug
    if (data.title) {
      let baseSlug = makeSlug(data.title);
      let newSlug = baseSlug;
      let counter = 1;

      let existing = await Service.findOne({
        slug: newSlug,
        _id: { $ne: data._id },
      });

      while (existing) {
        newSlug = `${baseSlug}-${counter++}`;
        existing = await Service.findOne({
          slug: newSlug,
          _id: { $ne: data._id },
        });
      }

      data.slug = newSlug;
    }

    // Remove Mongo internals
    const { _id, __v, createdAt, updatedAt, ...updateData } = data;

    const updatedService = await Service.findOneAndUpdate(
      { slug: params.slug },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a service by slug
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const deletedService = await Service.findOneAndDelete({
      slug: params.slug,
    });

    if (!deletedService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
