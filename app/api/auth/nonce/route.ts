import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@/lib/prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const address = searchParams.get("address");
  const chainType = searchParams.get("chainType");

  if (!address || !chainType ) {
    return NextResponse.json(
      { error: "Invalid address or chainType" },
      { status: 400 }
    );
  }

  const nonce = `${randomBytes(16).toString("hex")}`;

  try {
    const existing = await prisma.walletNonce.upsert({
      where: { address_chainType: { address, chainType } },
      update: { nonce },
      create: { address, chainType, nonce },
    });

    return NextResponse.json({ data: { messageToSign: existing.nonce } });
  } catch (error) {
    console.error("Error saving nonce:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
