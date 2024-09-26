import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);

export const fileUrl =
  "https://mefpvvgnqqvpbqcxloyx.supabase.co/storage/v1/object/public/evidences/";

export default supabase;
