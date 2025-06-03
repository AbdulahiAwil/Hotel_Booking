import React from 'react'
import { GiArchiveRegister } from "react-icons/gi";

function CustomerRegister() {
  return (
     <div className="max-w-screen flex flex-col bg-gray-100">
       <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">Customer</div>
 
       <div class="bg-white m-5 rounded-lg shadow-md">
         <div class="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
           <h2 class="text-xl font-semibold flex items-center gap-2 text-white">
             <GiArchiveRegister /> Booking Customer
           </h2>
           <button class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
             Customer
           </button>
         </div>
         <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label class="block text-gray-700">Full name:</label>
             <input type="text" name="" id="" class="w-full mt-1 p-2 border rounded-md"
             placeholder='Enter Full name'/>
           </div>
           <div>
             <label class="block text-gray-700">Email:</label>
             <input type="Email" name="" id="" class="w-full mt-1 p-2 border rounded-md"
             placeholder='Enter Email'/>
           </div>
           <div>
             <label class="block text-gray-700">Customer Phone:</label>
             <input
               type="text"
               class="w-full mt-1 p-2 border rounded-md"
               placeholder="Enter Customer Number" 
             />
           </div>
           <div>
             <label class="block text-gray-700">Check In Date:</label>
             <input
               type="date"
               class="w-full mt-1 p-2 border rounded-md"
               placeholder="Check In Date"
             />
           </div>
           <div>
             <label class="block text-gray-700">Check Out Date:</label>
             <input
               type="date"
               class="w-full mt-1 p-2 border rounded-md"
               placeholder="Check Out Date"
             />
           </div>
           <div>
             <label class="block text-gray-700">Number of Guest:</label>
             <input
               type="number"
               class="w-full mt-1 p-2 border rounded-md"
               placeholder="Number of Guest"
             />
           </div>
           <div>
             <label class="block text-gray-700">Room Type:</label>
             <select class="w-full mt-1 p-2 border rounded-md">
               <option>Room Type</option>
             </select>
           </div>
         </div>
         <div class="flex items-center gap-4 p-4">
           <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
             Register
           </button>
           <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
             Reset
           </button>
         </div>
        
       </div>
     </div>
   );
}

export default CustomerRegister