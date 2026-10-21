import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { fullName, phone, street, city, pincode, totalAmount, items, userId } = await req.json();

    if (!fullName || !phone || !street || !city || !pincode || !items || items.length === 0) {
      return NextResponse.json({ message: "All order fields are required" }, { status: 400 });
    }

    // 1. Create Order in Database
    const order = await prisma.order.create({
      data: {
        fullName,
        phone,
        street,
        city,
        pincode,
        totalAmount: parseFloat(totalAmount),
        userId: userId || null,
        items: {
          create: items.map((item) => ({
            productId: item.id || item.productId, // Fallback safety
            title: item.title,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
            image: item.image || "", // Included in case your OrderItem schema requires it
          })),
        },
      },
      include: { items: true },
    });

    // 2. Mark ordered products as OUT OF STOCK in database
    const productIds = items.map((item) => item.id || item.productId).filter(Boolean);
    if (productIds.length > 0) {
      await prisma.product.updateMany({
        where: { id: { in: productIds } },
        data: { inStock: false },
      });
    }

    return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Failed to place order", error: error.message }, { status: 500 });
  }
}