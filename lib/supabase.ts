import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if we have valid Supabase configuration
const isConfigured =
    supabaseUrl &&
    supabaseUrl !== 'YOUR_SUPABASE_URL' &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any; // Cast to any to avoid complex type checking in components that handle null

