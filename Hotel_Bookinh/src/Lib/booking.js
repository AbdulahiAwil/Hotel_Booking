import supabase from "./supabase"

export const createBooking = async (newBooking)=>{
    
const { data, error } = await supabase
.from('booking')
.insert([
    newBooking
])
.select()
.single()

if(error){
    throw error
}

console.log("successfull booking", data)

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
  