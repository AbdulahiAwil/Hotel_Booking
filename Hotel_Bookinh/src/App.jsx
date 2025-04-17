import { Route, Routes } from "react-router"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import HomePage from "./Pages/HomePage"
import RoomDetail from "./Pages/RoomDetail"
import Restaurant from "./Pages/Restaurant"


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
        </Routes>
      </main>


      <Footer />
    </div>
  )
}

export default App
