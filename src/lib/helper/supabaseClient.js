import { createClient } from "@supabase/supabase-js"
console.log(process.env.REACT_APP_API_URL)
const supabase = createClient(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_KEY);
export default supabase;