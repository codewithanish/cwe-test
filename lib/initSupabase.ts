import { createClient } from "@supabase/supabase-js";

// setup our keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// create a new client instance. passing in the api keys
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
