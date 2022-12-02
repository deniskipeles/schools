import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1cWxxZ3hobGV6d2tqdWxqb2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkxOTk0NTIsImV4cCI6MTk4NDc3NTQ1Mn0.ddJlQeTJ3lKMNoumyePKSBKLDlgb6iqStyDcRZwG1ko"
const PUBLIC_SUPABASE_URL = "https://yuqlqgxhlezwkjuljofo.supabase.co"
export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)

