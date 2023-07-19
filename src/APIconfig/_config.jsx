import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://amgvwodollakutpfnedz.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3Z3b2RvbGxha3V0cGZuZWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM5MDAsImV4cCI6MjAwNTE1OTkwMH0.uF1HUpJdbf4oWnTI_oFKiR51bj_Y4D1CcrWGHdaLmCM";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;