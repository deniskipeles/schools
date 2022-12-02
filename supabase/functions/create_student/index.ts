
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, x-client-info, apikey',
}

// console.log(`Function "select-from-table-with-auth-rls" up and running!`)

serve(async (req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    
    // Create a Supabase client with the Auth context of the logged in user.
    const getServiceSupabase = () => createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      // Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      // { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    ) 
    const supabaseClient = getServiceSupabase()
    // Now we can get the session or user object
    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    // And we can run queries in the context of our authenticated user
    const body = await req.json()
    // console.log(body);
    const { data, error } = await supabaseClient.auth.admin.createUser({
      email: body.email,
      email_confirm: true,
      password: body.password,
      user_metadata: body.more
    })
    if (error) throw error

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})

