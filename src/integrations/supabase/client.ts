import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lnuzvcwusafxoaehrbzu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudXp2Y3d1c2FmeG9hZWhyYnp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4MDkwNDksImV4cCI6MjA1MDM4NTA0OX0.S39bknNxBx6pDZX-J_S7ziuway_roLRVaAveb1SOLXM";

// Remove any trailing colons or slashes from the URL
const cleanUrl = supabaseUrl.replace(/[:\/]+$/, '');

export const supabase = createClient(cleanUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});