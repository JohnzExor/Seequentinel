import { ExistingUserEmail } from "@/data-access/user";

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
