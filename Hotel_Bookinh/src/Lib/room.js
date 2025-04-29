import supabase from '../Lib/supabase'

export const createRoom = async (room) => {

    console.log("Creating room with data: ")

    const roomData = {
        title: room.title,
        content: room.content,
        room_type: room.selectedTypes,
        price: room.price,
        author_id: room.authorId,
        published: room.published || false,
        featured_image: room.featuredImageUrl || null

    }
    // featured_image
// published

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


export const getRoomsByAuthor = async (authorId, { includeUnPublished = false, limit = 10, offset = 0 }) => {


  let query = supabase
      .from('rooms')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)


  if (!includeUnPublished) {
      query = query.eq('published', true)
  }


  const { data, error, count } = await query

  if (error) throw error

  return {
      rooms: data,
      count
  }
}