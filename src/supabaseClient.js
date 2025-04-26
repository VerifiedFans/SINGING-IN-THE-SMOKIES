import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rkcupzdknbfhpizariud.supabase.co";         
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrY3VwemRrbmJmaHBpemFyaXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NDA3NTMsImV4cCI6MjA2MTExNjc1M30.aQa0ja_OQ9IDXjJ1k2szxgRpxcuteO6bbhI78ADheAwexport const supabase = createClient(supabaseUrl, supabaseKey)";
