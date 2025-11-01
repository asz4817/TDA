import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Fixed navbar */}
      <Navbar />      
      <Outlet />

      <Footer/>
    </div>
  )
}

export default MainLayout
