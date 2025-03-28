
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ghfvtjrupmcsqasrsdao.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnZ0anJ1cG1jc3Fhc3JzZGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDM0MjksImV4cCI6MjA1ODQxOTQyOX0.fKb075_8BHeuHn_ZEiyAKAgyJBOgk5k1H-8lSeV9wzs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
