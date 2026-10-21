import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ message: "Order ID and status are required" }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json({ message: "Order status updated", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json({ message: "Failed to update status" }, { status: 500 });
  }
}