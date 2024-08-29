import { FindUserReports } from "@/data-access/behaviors";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { id } = await request.json();
  const data = await FindUserReports(id);
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Fetching" },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true, data }, { status: 200 });
}
