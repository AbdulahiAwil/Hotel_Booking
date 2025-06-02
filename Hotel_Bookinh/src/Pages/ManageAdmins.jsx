import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../Lib/auth';
import { IoList } from 'react-icons/io5';

export default function ManageAdmins() {

    const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const [deleting, setDeleting] = useState(null);
    
      useEffect(() => {
        fetchUsers();
      }, []);
    
      async function fetchUsers() {
        setLoading(true);
        try {
          const data = await getAllUsers();
          setUsers(data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        } finally {
          setLoading(false);
        }
      }
    
      async function handleDelete(userId) {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
    
        setDeleting(userId);
        try {
          await deleteUser(userId);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
          console.error('Delete failed:', error);
        } finally {
          setDeleting(null);
        }
      }
    
      if (loading) return <div className="text-center py-4">Loading users...</div>;
    


  return (
    <div className="max-w-screen flex flex-col bg-gray-100">
        <div className="w-full mt-18 p-4 bg-gray-100 shadow-sm">Customer</div>
        <div className="bg-white m-5 rounded-lg shadow-md">
            <div className="flex items-center justify-between rounded-t-lg bg-yellow-700 p-4 border-b">
                    <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                      <IoList /> Customer List
                    </h2>
                    <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md">
                      + Create
                    </button>
                  </div>
                   <div className='mt-4'>
     <div className="w-full overflow-x-auto rounded-lg shadow">
  <table className="min-w-[600px] divide-y divide-gray-200">
    <thead className="bg-yellow-600">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">ID</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Username</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Avatar</th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-100">
      {users.map((user) => (
        <tr key={user.id}>
          <td className="px-6 py-4 text-sm">{user.id}</td>
          <td className="px-6 py-4 text-sm">{user.username}</td>
          <td className="px-6 py-4 text-sm">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full" />
            ) : (
              <span className="italic text-gray-400">No avatar</span>
            )}
          </td>
          <td className="px-6 py-4">
            <button
              onClick={() => handleDelete(user.id)}
              disabled={deleting === user.id}
              className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
            >
              {deleting === user.id ? "Deleting..." : "Delete"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
        </div>
    </div>
    
  );
}
{/* <div className="max-w-full py-10 px-10  bg-amber-400">
      <h1 className="text-3xl text-black font-bold mb-6 text-center">All Users</h1>
      <UsersTable />
    </div> */}