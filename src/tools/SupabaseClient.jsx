import { createClient } from "@supabase/supabase-js";


class SupabaseService {
    client;

    constructor() {
        const supabaseUrl = "https://amgvwodollakutpfnedz.supabase.co";

        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtZ3Z3b2RvbGxha3V0cGZuZWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1ODM5MDAsImV4cCI6MjAwNTE1OTkwMH0.uF1HUpJdbf4oWnTI_oFKiR51bj_Y4D1CcrWGHdaLmCM";

        this.client = createClient(supabaseUrl, supabaseKey);
    }
    
    async getTest() {
        return this.client.from("class")
        .select('*')
    }
    
    async createProject(projectData) {
      return this.client.from("projets")
        .insert(projectData)
        .select();
    }

    async getAllUsers() {
        return this.client.from("users")
        .select('*');
    }
    async getAllProjects() {
        return this.client.from("projets")
        .select('*');
    }
    // async getTestBySlug(slug) {
    //     return this.client.from("class")
    //       .select('*')
    //       .eq("slug", slug);
    //   }
    
    //   async createTest(pageData) {
    //     return this.client.from("class")
    //       .insert(pageData)
    //       .select();
    //   }
    
    
    //   async modifytest(pageId, pageData) {
    //     return this.client.from("class")
    //       .update(pageData)
    //       .eq("id", pageId)
    //       .select();
    //   }

}

export default SupabaseService;
