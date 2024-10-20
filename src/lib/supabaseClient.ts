import { createClient } from '@supabase/supabase-js';

// Initializes the Supabase client using the environment variables.
// Allows you to interact with the Supabase database from the client.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
