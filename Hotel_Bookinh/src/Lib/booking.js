import supabase from "./supabase"

// export const createBooking = async (newBooking)=>{
    
// const { data, error } = await supabase
// .from('booking')
// .insert([
//     newBooking
// ])
// .select()
// .single()

// if(error){
//     throw error
// }

// console.log("successfull booking", data)

// }

export const createBooking = async (newBooking) => {
  const { data, error } = await supabase
    .from('booking')
    .insert([newBooking])
    .select()
    .single()

  if (error) throw error

  await fetch('https://.supabase.co/functions/v1/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      name: data.name,
      date: data.date,
    }),
  })

  return data
}

export const getBookingByRoom = async ({ includeUnPublished = false, limit = 5, offset = 0 }) => {


    let query = supabase
        .from('booking')
        .select('*')
        // .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)
  
  
    if (!includeUnPublished) {
        query = query.eq('published', true)
    }
  
  
    const { data, error, count } = await query

    console.log(data)
  
    if (error) throw error
  
    return {
        booking: data,
        count
        
    }

    
    
  }
  
  export const deleteBook = async (id) => {

    console.log(`Attempting to delete article with ID: ${id}`)
  
  
  
    // Finally delete the article
  
    const { data, error } = await supabase.from('booking').delete().eq('id', id).select();
  
  
  
    if (error) {
        console.error('Error deleting book:', error)
        console.error('Room error details:', JSON.stringify(error, null, 2))
        throw error
  
    } else {
        console.log(`Successfully deleted book with ID: ${id}`)
    }
  
    return data
  }

  export const getBookingById = async (id) => {


  
 

    const { data, error } = await supabase
        .from('booking')
        .select('*')
        .eq('id', id)
        .single()
  
    if (error) throw error
    return data
  }

 export const getBookingCount = async () => {
  try {
    const { data, error } = await supabase
      .from('booking')
      .select("count: id", { count: "exact" })
      .select(`
        month: created_at
      `);

    if (error) throw error;

    // Tani weli ma shaqeynayo sidaan. Waxa sax ah waa:
    const { data: monthlyCounts, error: aggError } = await supabase
      .rpc('get_monthly_booking_counts');

    if (aggError) throw aggError;

    return monthlyCounts; // [{ month: 'January', count: 5 }, ...]
  } catch (err) {
    console.error("Error getting booking count:", err.message);
    return [];
  }
};

  export const updateBook = async (id, updates) => {
  const { data, error } = await supabase
  .from('booking')
  .update({
      name: updates.name,
      email: updates.email,
      phone: updates.phone,
      check_in: updates.checkIn,
      check_out: updates.checkOut,
      
      updated_at: new Date()
  })
  .eq('id', id)
  .select()
  .single()

  


if (error) {
  console.error('Error updating book:', error)
  console.error('Update error details:', JSON.stringify(error, null, 2))
  throw error
}

console.log('Room updated successfully:', data)
return data
  }