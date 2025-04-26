import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tutcofvvslgytyatijlu.supabase.co"; // 🔥 YOUR Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dGNvZnZ2c2xneXR5YXRpamx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNjgyNjksImV4cCI6MjA2MDk0NDI2OX0.7v9BwsO1oJpfSUCR4zmZTX4JeokgEIvSi5bnvckfzcc"; // 🔥 YOUR anon public API key

export const supabase = createClient(supabaseUrl, supabaseKey);
