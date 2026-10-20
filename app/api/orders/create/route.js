import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const { userId, items, totalAmount, fullName, phone, street, pincode, city } = await req.json();

    if (!userId || !items || items.length === 0) {
      return NextResponse.json({ message: "Invalid order data" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        fullName,
        phone,
        street,
        pincode,
        city,
        items: {
          create: items.map((item) => ({
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ message: "Failed to create order" }, { status: 500 });
  }
}