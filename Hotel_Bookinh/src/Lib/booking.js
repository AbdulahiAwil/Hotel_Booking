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