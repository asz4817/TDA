import HomeBg from "../assets/Home.png";
import WeAreLogo from "../assets/WE ARE TEXAS DIABOLO.svg";
import BasedIn from "../assets/BasedIn.svg"
import Socials from "./Socials";
import { Parallax } from 'react-scroll-parallax';
import React, { useRef, useEffect, useState } from 'react';
import '../App.css';


const Hero = () => {
  const [scrolling, setScrolling] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
      // if (currentPosition > scrollTop) {
      //   // downscroll code
      //   setScrolling(false);
      // } else {
      //   // upscroll code
      //   setScrolling(true);
      // }
      currentPosition > 0 ? setScrolling(false) : setScrolling(true);
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  
  return (
    <section>

      <section
        className="relative w-full h-screen bg-cover bg-center mb-10 overflow-y-scroll scrollbar-hide"
          style={{ backgroundImage: `url(${HomeBg})`,
          backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflow: scrolling ? "scroll" : "hidden",
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-opacity-40 bg-scroll" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-[12%] pb-[4%] text-white scrollbar-hide">
          {/* Bottom Left */}
          <div className="absolute left-[15%] bottom-[-45%] " id="weAre">
            <img
              src={WeAreLogo}
              alt="We Are Texas Diabolo"
              className="w-[40vw]"
            />
            <div className="h-[50vh]"></div>
          </div>
          <div className="absolute bottom-[11%] right-[15%] fixed"
            style={{
              // transform: scrolling ? "translateX(0)" : "translateX(500%)",
              // transition: "transform 0.5s ease-out",
              opacity: scrolling ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          >
              <img
              src={BasedIn}
              alt="Based in Austin Texas"
              className="w-[10vw]"
            />
          </div>
          <div className="absolute right-[15%] fixed"
            style={{
              // transform: scrolling ? "translateX(0)" : "translateX(500%)",
              // transition: "transform 0.5s ease-out",
              opacity: scrolling ? 1 : 0,
              transition: "opacity 0.5s ease-out",
            }}
          >
              <Socials />
          </div>


        </div>
      </section>
    </section>
  );
};

export default Hero;
