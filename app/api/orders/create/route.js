import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, items, totalAmount, fullName, phone, street, pincode, city } = await req.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json({ message: "Invalid order data" }, { status: 400 });
    }

    // Validate that every item actually has a product ID
    for (const item of items) {
      const pId = item.id || item.productId;
      if (!pId) {
        console.error("Cart item missing product ID:", item);
        return NextResponse.json(
          { message: `Product ID is missing for item: ${item.title}` },
          { status: 400 }
        );
      }
    }

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
            image: item.image || "",
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ message: "Failed to create order", error: error.message }, { status: 500 });
  }
}