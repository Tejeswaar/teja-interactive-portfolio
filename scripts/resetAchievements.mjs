import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Resetting all achievements...");
  
  // Update all rows: clear achievements array, and set achievement_score to 0
  const { data, error } = await supabase
    .from("visitors")
    .update({ 
      achievements: [],
      achievement_score: 0 
    })
    .neq("id", "00000000-0000-0000-0000-000000000000"); // A dummy condition to match all rows

  if (error) {
    console.error("Error resetting achievements:", error);
  } else {
    console.log("Achievements reset successfully.");
  }
}

run();
