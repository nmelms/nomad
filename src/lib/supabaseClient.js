// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client with your local Supabase URL and anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default supabase;
