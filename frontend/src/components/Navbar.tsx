import { NavLink } from "react-router-dom";
import TDALogo from "../assets/Tda_Logo.svg";
import Line from "../assets/Line 1.svg";
import profile from "../assets/profile.svg";
import '../App.css'
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolling, setScrolling] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);
  
    useEffect(() => {
      function onScroll() {
        let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
        if (currentPosition > scrollTop) {
          // downscroll code
          setScrolling(false);
        } else {
          // upscroll code
          setScrolling(true);
        }
        setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      }
  
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);
  
  
  
  
    return (
    <nav className="w-full fixed top-0 left-0 bg-transparent text-white z-50"
    style={{opacity: scrolling ? 1 : 0,
              transition: "opacity 0.5s ease-out",
    }}>
      <div className="relative mx-auto w-[75%] md:mt-20 mt-10 flex justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-[10%] w-[75%]">
            <NavLink 
                        to="/"
                        className="items-center" >
                        <img
                            className="w-[8vw]"
                            src={TDALogo}
                            alt="TDA Logo"
                        />
                    </NavLink>
{/*           
          <NavLink
            to="/our-story"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "text-gray-300" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "11px"
            }}
          >
            OUR STORY
          </NavLink> */}

          {/* <NavLink
            to="/txdc2026"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "font-semibold" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "clamp(4px, 1vw, 12px)",             
            }}
          >
            TXDC 2026
          </NavLink> */}


          <NavLink
            to="/contactUs"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "font-semibold" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "clamp(4px, 1vw, 12px)",
            }}
          >
            CONTACT US
          </NavLink>
        </div>


        {/* Right: Button + User icon */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
              href="https://linktr.ee/texasdiabolo"
              target="_blank"
              className="border border-white rounded-full hover:bg-white hover:text-black transition whitespace-nowrap"
              style={{
                fontFamily: "unbounded",
                fontSize: "clamp(4px, 1vw, 11px)",
                padding: "clamp(4px, 0.8vw, 10px) clamp(8px, 2.5vw, 34px)",
                minWidth: "max-content",
              }}
            >
              CONNECT WITH US
            </a>

            <img src={Line} alt="Line" className="h-[50%] md:h-[3vw]" />
            <img src={profile} alt="profile" width={"11%"}/>

          {/* <User size={20} className="cursor-pointer hover:text-gray-300" /> */}
        </div>
      </div>
    </nav>
  );
}
