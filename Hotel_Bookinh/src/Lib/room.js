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


export const deleteRoom = async (id) => {

  console.log(`Attempting to delete article with ID: ${id}`)



  // Finally delete the article

  const { data, error } = await supabase.from('rooms').delete().eq('id', id).select();



  if (error) {
      console.error('Error deleting room:', error)
      console.error('Room error details:', JSON.stringify(error, null, 2))
      throw error

  } else {
      console.log(`Successfully deleted room with ID: ${id}`)
  }

  return data
}

export const getRoomyById = async (id) => {


  
 

  const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single()

  if (error) throw error
  return data
}

export const updateRoom = async (id, updates) => {

  console.log(`Attempting to update room with ID: ${id}`, updates)

  const { data, error } = await supabase
      .from('rooms')
      .update({
          title: updates.title,
          content: updates.content,
          room_type: updates.selectedTypes,
          price: updates.price,
          published: updates.published,
          featured_image: updates.featuredImageUrl,
          update_at: new Date()
      })
      .eq('id', id)
      .select()
      .single()


  if (error) {
      console.error('Error updating room:', error)
      console.error('Update error details:', JSON.stringify(error, null, 2))
      throw error
  }

  console.log('Room updated successfully:', data)
  return data
}