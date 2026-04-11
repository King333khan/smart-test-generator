import { createClient } from '@supabase/supabase-js';

// IMPORTANT: These should ideally be in a .env file for security.
// For now, I'm using placeholders. Replace these with your actual Supabase project details.
// Supabase project details from your dashboard screenshot
const supabaseUrl = 'https://swyqclqtlbywcflltwrt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3eXFjbHF0bGJ5d2NmbGx0d3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0MDcyODMsImV4cCI6MjA5MDk4MzI4M30.6uOE9EpFLVo0XpZ_B6mLT19T3s37M3HMwbYbg1d0oCI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
