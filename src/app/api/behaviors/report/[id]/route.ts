import { DeleteReport, SetStatus, UpdateReport } from "@/data-access/behaviors";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const data = await DeleteReport(id);
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Deleting" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { ok: true, message: "Report Deleted" },
    { status: 200 }
  );
}

export async function PATCH(request: Request) {
  const { id } = await request.json();

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
  const data = await UpdateReport(id, input);

  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Updating" },
      { status: 400 }
    );
  }
  return NextResponse.json({ ok: true, data }, { status: 200 });
}

export async function PUT(request: Request) {
  const { id } = await request.json();

  const { status } = await request.json();

  if (!status) {
    return NextResponse.json(
      { ok: false, message: "New Status is missing" },
      { status: 400 }
    );
  }

  const data = await SetStatus(id, status);

  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error Updating" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { ok: true, message: "Status Updated" },
    { status: 200 }
  );
}
