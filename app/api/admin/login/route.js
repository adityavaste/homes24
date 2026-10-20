import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }

    // 1. Find user in MySQL
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 2. Check if user is an ADMIN
    if (user.role !== "ADMIN") {
      return NextResponse.json({ message: "Access denied. Not an admin." }, { status: 403 });
    }

    // 3. Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 4. Generate JWT with ADMIN role
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || "homes24_super_secret_jwt_key_2026",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json(
      {
        message: "Admin login successful",
        admin: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie for admin token
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}