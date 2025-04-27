import React from 'react'
import { IoList } from "react-icons/io5";

function Customer() {
  return (
    <div className="max-w-screen flex flex-col bg-gray-100">
      <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">Customer</div>

      <div class="bg-white m-5 rounded-lg shadow-md">
        <div class="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
          <h2 class="text-xl font-semibold flex items-center gap-2 text-white">
            <IoList /> Customer List
          </h2>
          <button class="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
            + Create
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
            Search
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Reset
          </button>
        </div>
        <div class="overflow-x-auto p-4">
      <table class="min-w-full bg-white text-sm border">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="py-2 px-4 border">Full Name</th>
            <th class="py-2 px-4 border">Email</th>
            <th class="py-2 px-4 border">Customer Phone</th>
            <th class="py-2 px-4 border">Check In Date</th>
            <th class="py-2 px-4 border">Check Out Date</th>
            <th class="py-2 px-4 border">Number of Guest</th>
            <th class="py-2 px-4 border">Room Type</th>
            <th class="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Example Row --> */}
          <tr class="hover:bg-gray-100">
            <td class="py-2 px-4 border text-center">A</td>
            <td class="py-2 px-4 border text-center">1</td>
            <td class="py-2 px-4 border text-blue-600 hover:underline cursor-pointer">A-1-M-155-G_659969</td>
            <td class="py-2 px-4 border">Safiyo Maxamuud Gaalajabiye A1-155</td>
            <td class="py-2 px-4 border text-green-600 font-semibold">Connected</td>
            <td class="py-2 px-4 border text-center">3 seconds ago</td>
            <td class="py-2 px-4 border flex justify-center gap-2">
              <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-eye"></i></button>
              <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
}

export default Customer