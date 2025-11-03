import { NavLink } from "react-router-dom";
import TDALogo from "../assets/TDA_Logo.svg";
import Line from "../assets/Line 1.svg";
import profile from "../assets/profile.svg";
import '../App.css'
import React, { useEffect, useState } from "react";

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
      <div className="relative mx-auto w-[75%] pt-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-15">
            <NavLink 
                        to="/"
                        className="items-center" >
                        <img
                            className="w-25"
                            src={TDALogo}
                            alt="USADA Logo"
                        />
                    </NavLink>
          
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
          </NavLink>

          <NavLink
            to="/txdc2026"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "text-gray-300" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "11px"
            }}
          >
            TXDC 2026
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "text-gray-300" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "11px"
            }}
          >
            CONTACT US
          </NavLink>
        </div>

        {/* Center: Nav links (absolutely centered) */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 flex gap-12 text-sm font-semibold">
          
        </div> */}

        {/* Right: Button + User icon */}
        <div className="flex items-center gap-4 ">
          <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                  style={{fontFamily: "unbounded",
                    fontSize: "11px"
                  }}>
            JOIN THE TEAM
          </button>
            <img src={Line} alt="Line" />
            <img src={profile} alt="profile" width={"11%"}/>

          {/* <User size={20} className="cursor-pointer hover:text-gray-300" /> */}
        </div>
      </div>
    </nav>
  );
}


// import TDALogo from '../assets/TDA_Logo.svg';
// import profile from '../assets/profile.svg';
// import { NavLink } from 'react-router-dom';
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from 'react';
// import type { ReactNode, ComponentType } from "react";

// type DropDownProps = {
//   children: ReactNode;
//   href: string;
//   DropDownContent: ComponentType;
// };


// const DropDown = ({children, href, DropDownContent}: DropDownProps) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <div 
//             onMouseEnter={() => setOpen(true)}
//             onMouseLeave={() => setOpen(false)}            className='relative h-fit w-fit'
//         >
//             <NavLink 
//                 to={href}
//                 className="relative z-50"
//             >
//                 {children}
//                 <span
//                     style = {{
//                         transform: open ? "scaleX(1)" : "scaleX(0)",
//                     }}
//                     className='absolute -bottom-2 -left-1 -right-1 bg-indigo-300 h-1 rounded-full transition-transform duration-300 ease-out'
//                 >
//                 </span>
//             </NavLink>
//             <AnimatePresence>
//             {open && (
//                 <motion.div
//                     initial = {{ opacity:0, y:15}}
//                     animate = {{ opacity: 1, y:0}}
//                     exit={{ opacity: 0, y:15}}
//                     transition = {{duration: 0.3, ease:'easeOut'}}
//                     className="absolute left-1/2 top-10 -translate-x-1/2 z-50"
//                 >
//                     <div className="absolute -top-6 left-0 right-0 h-6" />
//                     {/* <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-blue-100" /> */}
//                     <DropDownContent />
//                 </motion.div>
//             )}
//             </AnimatePresence>
//         </div>
//     )
// }

// const Navbar = () => {
//     return (
//     <>
//         <nav className="border-b border-dotted border-gray-200 mx-auto z-50 flex-1 w-[85%] h-22">
//             <div className="flex h-full items-center">

//                 <div className="flex justify-center md:items-stretch md:justify-start"> 
//                     <NavLink 
//                         to="/"
//                         className="items-center mr-4" >
//                         <img
//                             className="h-30 w-40"
//                             src={TDALogo}
//                             alt="TDA Logo"
//                         />
//                     </NavLink>
//                 </div>

//                 <div className='w-full flex justify-end'>
//                     <div className="flex items-center w-full space-x-[4%] text-l justify-end">
//                         <DropDown href="/about" DropDownContent={AboutContent}> About Us</DropDown>

                        
//                         <DropDown href="/competitions" DropDownContent={CompetitionsContent}> Competitions </DropDown>


//                         <NavLink 
//                             to="/members"
//                             className="relative group inline-block"
//                         >
//                             Past TXDC
//                             <span
//                                 className='absolute -bottom-2 -left-1 -right-1 bg-indigo-300 h-1 transform scale-x-0 group-hover:scale-x-100 rounded-full transition-transform duration-300 ease-out'
//                             ></span>
//                         </NavLink> 



//                         <DropDown href="/contact" DropDownContent={ContactContent}> Contact Us </DropDown>


//                         <NavLink
//                             to="/admin"
//                             className= " "
//                         > <img
//                             className="h-6"
//                             src={profile}
//                             alt="profile"
//                         /></NavLink>
//                             </div>
//                 </div>
                
                

//             </div>
//         </nav>
//     </>
//     )
// }




// const AboutContent = () => {
//     return <div className='p-5 min-w-max shadow-xl bg-white'>
//         <NavLink
//             to="/about/board-of-directors"
//             className="block text-m hover:underline whitespace-nowrap"
//         >
//             Board of Directors
//         </NavLink>
//     </div>
// }
// const CompetitionsContent = () => {
//     return <div className='p-6 min-w-max shadow-xl bg-white'>
//         <div className='space-y-3 flex gap-4'>
//         <div className='flex flex-col gap-1'>
//             <h3 className="mb-2 font-semibold">TXDC 2026</h3>
//             <NavLink
//                 to="/competitions/registration"
//                 className="block text-sm hover:underline whitespace-nowrap"
//             >
//                 Registration
//             </NavLink>
//             <NavLink
//                 to="/competitions/structure-and-logistics"
//                 className="block text-sm hover:underline whitespace-nowrap"
//             >
//                 Structure & Logistics
//             </NavLink>
//             <NavLink
//                 to="/competitions/1v1battle"
//                 className="block text-sm hover:underline whitespace-nowrap"
//             >
//                 1v1 Battle
//             </NavLink>
//             <NavLink
//                 to="/competitions/scoring-and-awards"
//                 className="block text-sm hover:underline whitespace-nowrap"
//             >
//                 Scorindg & Awards
//             </NavLink>
//             <NavLink
//                 to="/competitions/travel-and-lodging"
//                 className="block text-sm hover:underline whitespace-nowrap"
//             >
//                 Travel & Lodging
//             </NavLink>
//         </div>
        
//         </div>
//     </div>
// }
// const ContactContent = () => {
//     return <div className='p-5 min-w-40 flex justify-center shadow-xl bg-white'>
//         <NavLink
//             to="contact/donate"
//             className="block text-m hover:underline whitespace-nowrap"
//         >
//             Donate
//         </NavLink>
//     </div>
// }



// export default Navbar
