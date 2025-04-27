import { Link } from "react-router";


const Sidebar = () => (
  <aside className="bg-yellow-700">
    <div className="p-6 text-xl font-bold">My Dashboard</div>
    <nav className="flex flex-col p-4 space-y-2">
      <Link
        to="/dashboard"
        className="text-gray-100 hover:bg-gray-200 rounded px- py-2 "
      >
        Dashboard
      </Link>
      <Link
        to="/customer"
        className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2"
      >
        Customer
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
