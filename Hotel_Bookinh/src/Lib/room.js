import supabase from '../Lib/supabase'

export const createRoom = async (room) => {

    console.log("Creating room with data: ")

    const roomData = {
        title: room.title,
        content: room.content,
        type: room.room_type,
        author_id: room.authorId,
        published: room.published || false,
        featured_image: room.featuredImageUrl || null
    }


     // insert to supabase

     const { data, error } = await supabase
       .from("rooms")
       .insert(roomData)
       .select()
       .single();

     if (error) {
       console.error("Error creating article", error);
       throw error;
     }
     console.log("Article created successfully.", data);

     return data;


}