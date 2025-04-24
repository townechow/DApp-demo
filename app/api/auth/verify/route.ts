import { NextResponse } from "next/server";
import { isAddress, recoverMessageAddress } from "viem";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/lib/prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export async function POST(req: Request) {
  const { address, signature, chainType } = await req.json();

  if (!address || !signature || !chainType || !isAddress(address)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const record = await prisma.walletNonce.findUnique({
    where: { address_chainType: { address, chainType } },
  });

  if (!record) {
    return NextResponse.json({ error: "Nonce not found" }, { status: 404 });
  }

  const expectedMessage = record.nonce;

  try {
    const recovered = await recoverMessageAddress({
      message: expectedMessage,
      signature,
    });

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json(
        { isSuccess: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    // ✅ 查找或创建用户
    const user = await prisma.user.upsert({
      where: { address_chainType: { address, chainType } },
      update: {},
      create: { address, chainType, uid: await getNextUID(prisma) },
    });

    // ✅ 生成 token
    const token = jwt.sign(
      { userId: user.id, address, chainType },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      data: {
        isSuccess: true,
        token,
        userInfo: {
          id: user.id,
          address: user.address,
          chainType: user.chainType,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl,
          email: user.email,
          createdAt: user.createdAt.getTime(),
        },
      },
    });
  } catch (err) {
    console.error("Signature verification error:", err);
    return NextResponse.json(
      { isSuccess: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
async function getNextUID(prisma: PrismaClient): Promise<number> {
  const lastUser = await prisma.user.findFirst({
    orderBy: { uid: "desc" },
    select: { uid: true },
  });

  return lastUser ? lastUser.uid + 1 : 10000000;
}
