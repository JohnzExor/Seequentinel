import { getAllReportsUseCase } from "@/use-cases/report";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const data = await getAllReportsUseCase();
  return NextResponse.json({ data, message: "ok" }, { status: 200 });
};
