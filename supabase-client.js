import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const SUPABASE_URL = "https://uqtdkycytwrjsgiwjuya.supabase.co";
const SUPABASE_ANON_KEY =
  "sb_publishable_O51cSkuqzhZoAFutCEcMQA_HfVn8roU";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
``