import { Route, Router, Routes } from "react-router"

import HomePage from "./Pages/HomePage"
import RoomDetail from "./Pages/RoomDetail"
import Restaurant from "./Pages/Restaurant"
import SignUp from "./Pages/signUp"
import SignIn from "./Pages/SignIn"
import { AuthProvider } from "./contex/AuthContex"
import Dashboard from "./Pages/Dashboard"
import MainLayout from "./Layout/MainLayout"
import ProtectedRoute from "./Components/ProtectedRoute"
import Customer from "./Pages/Customer"
import DashboardLayout from "./Layout/DashboardLayout"
import CustomerRegister from "./Pages/CustomerRegister"
import RoomDetails from "./Pages/RoomDetail"
import ProfilePage from "./Pages/ProfilePage"
import CreateRooms from "./Pages/CreateRooms"
import { Toaster } from 'react-hot-toast';
import RoomManagePage from "./Pages/RoomManagePage"
import Room from "./Pages/Room"



function App() {
  
  return (
    <AuthProvider>
      <Routes>
        {/* Routes with header & footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/room" element={<Room />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/room/:id" element={<RoomDetail />} />
        </Route>

        {/* Routes without header & footer */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
       


        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute> <Customer /> </ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute> <CustomerRegister /> </ProtectedRoute>} />
          
          <Route path="/create" element={<ProtectedRoute> <CreateRooms /> </ProtectedRoute>} />
          <Route path="/create/:id" element={<ProtectedRoute> <CreateRooms /> </ProtectedRoute>} />
          <Route path="/manage" element={<ProtectedRoute> <RoomManagePage /> </ProtectedRoute>} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

export default App
