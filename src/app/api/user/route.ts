import {
  CreateUser,
  DeleteUser,
  ExistingUserEmail,
  FindUserByID,
  UpdatePassword,
} from "@/data-access/user";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { ok: false, message: "ID is blank" },
      { status: 400 }
    );
  }

  const findByID = await FindUserByID(id);
  if (!findByID) {
    return NextResponse.json(
      { ok: false, message: "ID not found" },
      { status: 400 }
    );
  }

  const data = await DeleteUser(id);

  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error deleting" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, messsage: "User deleted Sucessfully" },
    { status: 200 }
  );
}

export async function PUT(request: Request) {
  const { id, password } = await request.json();

  if (!id || !password) {
    return NextResponse.json(
      { ok: false, message: "Fill all the blanks" },
      { status: 400 }
    );
  }

  const findByID = await FindUserByID(id);
  if (!findByID) {
    return NextResponse.json(
      { ok: false, message: "ID not found" },
      { status: 400 }
    );
  }

  const data = await UpdatePassword(id, password);
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Error updating" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, message: "Changed password" },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, messsage: "Fill all the blanks" },
      { status: 400 }
    );
  }

  const existingEmail = await ExistingUserEmail(email);

  if (existingEmail) {
    return NextResponse.json(
      { ok: false, message: "This email is already registered" },
      { status: 409 }
    );
  }

  const data = await CreateUser({ email, password });

  if (!data) {
    return NextResponse.json(
      { ok: false, messsage: "Post Error" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      data,
    },
    { status: 200 }
  );
}
