import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);

// export const apiUrl = "https://bhfind.vercel.app";
export const apiUrl = "http://localhost:3000";

export default supabase;
