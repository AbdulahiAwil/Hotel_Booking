import React, { useEffect, useState } from 'react'
import RoomCard from './RoomCard';
import { IoMdRocket } from 'react-icons/io';
import supabase from '../Lib/supabase';

function Rooms() {

    const [featuredRooms, setFeaturedRooms] = useState([])
    
    const [loading, setLoading] = useState(false)
  
  
    useEffect(() => {
      fetchRooms();
    }, [])

    const fetchRooms = async () => {
      try {
        setLoading(true)
  
        // Fetch featured articles (articles with most likes)
        const { data: featured, error: featuredError } = await supabase
          .from('rooms')
          .select('*')
          .eq('published', true)
          .limit(8)
  
        if (featuredError) throw featuredError
  
        setFeaturedRooms(featured || [])
       
      } catch (error) {
        console.error('Error fetching articles:', error)
        toast.error('Failed to load articles')
      } finally {
        setLoading(false)
      }
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )
    }


  return (
   <section className="py-16 sm:py-20 md:py-24">
  <div className="text-center mb-12 px-4 sm:px-6 md:px-0">
    <p className="text-xs sm:text-sm tracking-widest text-gray-500 uppercase">
      Hotel & Spa Adina
    </p>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-900 mt-2">
      Rooms & Suites
    </h2>
  </div>

  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
      {featuredRooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  </div>
</section>

  );
}

export default Rooms