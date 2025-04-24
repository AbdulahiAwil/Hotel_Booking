import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar';
import Dashboard from '../Pages/Dashboard';
import HeaderDash from '../Components/HeaderDash';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 mx-auto">
      <HeaderDash />
      <main className="flex-grow p-6 ">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
