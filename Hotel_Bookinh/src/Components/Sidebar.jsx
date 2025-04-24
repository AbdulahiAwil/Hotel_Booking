import { Link } from "react-router";


const Sidebar = () => (
  <aside>
    <div className="p-6 text-xl font-bold">
      My Dashboard
    </div>
    <nav className="flex flex-col p-4 space-y-2">
      <Link to="/" className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2">Dashboard</Link>
      <Link to="/users" className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2">Users</Link>
      <Link to="/settings" className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2">Settings</Link>
    </nav>
  </aside>
);

export default Sidebar;
