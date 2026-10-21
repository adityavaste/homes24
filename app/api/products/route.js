import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: Add new product
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, category, price, originalPrice, condition, image, warranty } = body;

    if (!title || !category || !price || !originalPrice || !image) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        category,
        price: parseFloat(price),
        originalPrice: parseFloat(originalPrice),
        condition: condition || "Mint Grade A+",
        warranty: warranty || "1-Year Warranty",
        image,
      },
    });

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
  }
}

// DELETE: Remove product by query param (?id=...)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}