import { CreateReport, FindAllReports } from "@/data-access/behaviors";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await FindAllReports();
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Fetching" },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true, data }, { status: 200 });
}

export async function POST(request: Request) {
  const { evidence, violation, location, userId, status } =
    await request.json();

  if (!evidence || !violation || !location || !userId || !status) {
    return NextResponse.json(
      { ok: false, message: "Fill all the required field" },
      { status: 400 }
    );
  }

  const input = {
    userId,
    evidence,
    violation,
    location,
    status,
  };

  const data = await CreateReport(input);
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Posting" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, data }, { status: 200 });
}
