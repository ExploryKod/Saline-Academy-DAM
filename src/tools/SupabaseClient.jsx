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
    async insertDataPlannification(room, teacher, crew) {
      return this.client
        .from("projets")
        .upsert([{ id: 111, room_id: room, teacher_id: teacher, crew_id: crew, state: 'Captation' }], { onConflict: 'id' });
    }

    async getAllUsers() {
        return this.client.from("users")
        .select('*');
    }
    async getAllProjects() {
        return this.client.from("projets")
        .select('*');
    }
    async getAllTeachers() {
        return this.client.from("teacher")
        .select('*');
    }
    async getAllRooms() {
        return this.client.from("room")
        .select('*');
    }
    async getAllCrews() {
        return this.client.from("crew")
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
  
    async getProducterUsers() {
        return this.client.from("users")
        .select('*')
        .eq("role", "PRODUCTEUR");
    }

    
    async getVideoEditing() {
        return this.client.from("videoEditing")
            .select('*')
    }

    async getAllVideoInformation() {
        return this.client.from("chapter")
            .select('*, projets!inner(*), videoEditing!inner(*)')
    }

    async getAllProjetUser(id) {
        return this.client.from("participants")
            .select("*")
            .eq('user_id', id)
    }

    async saveTokenUser(token, id) {
        return this.client.from("users")
            .update({ token: token})
            .eq('id', id)
    }

    async getCurrentUser(tokenId) {
        return this.client.from("users")
            .select('*')
            .eq('token', tokenId)
    }
}

export default SupabaseService;
