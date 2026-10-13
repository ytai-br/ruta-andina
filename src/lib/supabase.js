const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey = import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

export const supabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)

let clientPromise
export function getSupabaseClient() {
  if (!supabaseConfigured) return Promise.resolve(null)
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(supabaseUrl, supabasePublishableKey))
  return clientPromise
}
