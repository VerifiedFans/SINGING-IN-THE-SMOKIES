import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";         // ⬅️ paste from step 1
const supabaseKey = "YOUR_ANON_PUBLIC_KEY";      // ⬅️ paste from step 1

export const supabase = createClient(supabaseUrl, supabaseKey);
