import { Route, Routes } from "react-router"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import HomePage from "./Pages/HomePage"
import RoomDetail from "./Pages/RoomDetail"
import Restaurant from "./Pages/Restaurant"
import SignUp from "./Pages/signUp"
import SignIn from "./Pages/SignIn"



function App() {
  
  return (
    <div>
      <Header />

      <main>
        {/* Routes */}

        <Routes>
          {/* Public Routes */}

          <Route path="/" element={<HomePage />} />
          <Route path="/room/:id" element={<RoomDetail />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="Signin" element={<SignIn />} />
        </Routes>
      </main>


      <Footer />
    </div>
  )
}

export default App
