import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rocqbojtzpdyamzjxycf.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

if(!window.location.hash) {
  window.location.hash = Math.random().toString(36).substr(2, 9)
}

export const  roomid  = window.location.hash.substr(1);
console.log('roomid', roomid)
