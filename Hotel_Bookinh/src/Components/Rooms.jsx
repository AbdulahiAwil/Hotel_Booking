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
    <section className="py-24">
      <div className="text-center mb-12">
        <p className="text-sm tracking-widest text-gray-500 uppercase">
          Hotel & Spa Adina
        </p>
        <h2 className="text-5xl font-serif font-light text-gray-900 mt-2">
          Rooms & Suites
        </h2>
      </div>
      <div className="container mx-auto lg:px-0">
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0 '>
          {featuredRooms.map((room) => (
            <RoomCard room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Rooms