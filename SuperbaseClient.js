import { createClient } from "@supabase/supabase-js";

const supabase = import.meta.env.VITE_SUPERBASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPERBASE_ANON_KEY

export const supbase = createClient(supabase, supabaseAnonKey)