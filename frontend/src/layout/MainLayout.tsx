import { useEffect } from "react";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet, useLocation } from "react-router-dom"


const MainLayout = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <div className="max-w-screen bg-black text-white">
        <Navbar />
        <Outlet />
      </div>
    )
  }
  else {
    return (
      <div className="max-w-screen bg-black text-white">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    )
  }


}

export default MainLayout
