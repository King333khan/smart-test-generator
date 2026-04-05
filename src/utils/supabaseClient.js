import { createClient } from '@supabase/supabase-js';

// IMPORTANT: These should ideally be in a .env file for security.
// For now, I'm using placeholders. Replace these with your actual Supabase project details.
const supabaseUrl = 'https://swyqclqtlbywcflltwrt.supabase.co';
const supabaseAnonKey = 'sb_publishable_02CZ_EW7jnopAIQlNX0dww_KKGSumam';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
