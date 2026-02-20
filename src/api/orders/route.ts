import { NextRequest, NextResponse } from "next/server";
import { getAllOrders } from "@/api/allOrders.api";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await getAllOrders(token);
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
