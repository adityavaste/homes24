import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, items, totalAmount, fullName, phone, street, pincode, city } = await req.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json({ message: "Invalid order data" }, { status: 400 });
    }

    // 1. Create Order in Database
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalAmount: parseFloat(totalAmount),
        fullName,
        phone,
        street,
        pincode,
        city,
        items: {
          create: items.map((item) => ({
            productId: item.id || item.productId,
            title: item.title,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
          })),
        },
      },
      include: { items: true },
    });

    // 2. Mark ordered products as out of stock / booked
    const productIds = items.map((item) => item.id || item.productId).filter(Boolean);
    if (productIds.length > 0) {
      await prisma.product.updateMany({
        where: { id: { in: productIds } },
        data: { inStock: false }, // <-- This updates the database flag!
      });
    }

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ message: "Failed to create order", error: error.message }, { status: 500 });
  }
}