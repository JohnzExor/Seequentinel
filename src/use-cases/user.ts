import { ExistingUserEmail } from "@/data-access/user";

import { CreateUser, FindAllUser } from "@/data-access/user";
import { createUserSchema } from "@/lib/zod";
import { z } from "zod";

export const getAllUserUseCase = async () => {
  const data = await FindAllUser("user");
  return data;
};

export const getAllAdminUseCase = async () => {
  const data = await FindAllUser("admin");
  return data;
};

export const createUserUseCase = async (
  newUser: z.infer<typeof createUserSchema>
) => {
  const existing = await ExistingUserEmail(newUser.email);
  if (existing) {
    throw new Error("This email is already registered.");
  }
  const data = await CreateUser(newUser);
  return data;
};

export const checkExistingEmailUseCase = async (email: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }), // Ensure the email is sent as an object
    });
    const data = await response.json();
    return data; // Assuming the response contains JSON data
  } catch (error: any) {
    console.error("Error checking email:", error.message);
    throw new Error("Failed to check email existence");
  }

  // const data = await ExistingUserEmail(email);
  // return data;
};
