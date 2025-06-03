import { Outlet } from 'react-router';
import HeaderDash from '../Components/HeaderDash';

const DashboardLayout = () => {
  return (
    <div className="flex overflow-auto min-h-screen bg-gray-100">
      <HeaderDash />
      <main className="flex-1 transition-all duration-300">
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
