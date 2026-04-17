import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
        console.error('Error fetching profiles:', error);
    } else {
        if (data.length > 0) {
            console.log('Columns in profiles table:', Object.keys(data[0]));
        } else {
            console.log('No rows in profiles table, cannot infer schema this way.');
        }
    }
}

checkSchema();
