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
            productId: item.id,
            title: item.title,
            price: parseFloat(item.price),
            quantity: parseInt(item.quantity),
          })),
        },
      },
      include: { items: true },
    });

    // 2. Mark ordered products as BOOKED / OUT OF STOCK in database
    const productIds = items.map((item) => item.id);
    await prisma.product.updateMany({
      where: { id: { in: productIds } },
      data: { inStock: false },
    });

    return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Failed to place order" }, { status: 500 });
  }
}