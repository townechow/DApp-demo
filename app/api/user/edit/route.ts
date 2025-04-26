import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { nickname, uid, email } = await req.json();

  if (!uid || (!email && !nickname)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const record = await prisma.user.findUnique({
    where: { uid: +uid },
  });

  if (!record) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    // ✅ update user
    const user = await prisma.user.update({
      where: { uid: +uid },
      data: { email, nickname },
    });

    return NextResponse.json({
      data: {
        ...user,
      },
    });
  } catch (err) {
    console.error("Handle  error:", err);
    return NextResponse.json({ error: "Handle failed" }, { status: 500 });
  }
}
