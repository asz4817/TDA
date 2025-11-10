import HomeBg from "../assets/Home.png";
import WeAreLogo from "../assets/WE ARE TEXAS DIABOLO.svg";
import BasedIn from "../assets/BasedIn.svg"
import Socials from "./Socials";
import AboutUs from "./AboutUs";
import { Parallax } from 'react-scroll-parallax';
import {useEffect, useState } from 'react';
import '../App.css';
import PerformanceCards from "./PerformanceCards";
import Divider from "./Divider";
import Footer from "./Footer";


const Hero = () => {
  const [scrolling, setScrolling] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [diaboloTop, setDiaboloTop] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);

  let scrollMax = document.body.scrollHeight - window.innerHeight;

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;

      currentPosition > 0 ? setScrolling(false) : setScrolling(true);
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      if (currentPosition > scrollMax * 0.5) {
        setDiaboloTop(-40);
        setAboutTop(-100)
      } else if (currentPosition > 0) {
        setDiaboloTop(40);
        setAboutTop(20)
      } else {
        setDiaboloTop(70);
        setAboutTop(100);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  
  return (
    <section>

    <section className="relative w-screen mb-10"
        style={{ backgroundImage: `url(${HomeBg})`,
        backgroundColor: "transparent",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
      <section
        className="relative w-full h-screen bg-cover mb-10 scrollbar-hide">
        {/* Main content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-[12%] pb-[4%]">
          {/* Bottom Left */}
          <div className="absolute right-[14%] fixed"
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
          <div className="absolute bottom-[11%] right-[14%] fixed"
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
        <div 
          style={{
            position: "fixed",
            top: diaboloTop + "vh",
            left: "10%",
            transition: "top 1s ease-in-out",
          }}>
          <img
            src={WeAreLogo}
            alt="We Are Texas Diabolo"
            className="w-[35vw]"
          />
        </div>
      <div 
            style={{
            position: "fixed",
            top: aboutTop + "vh",
            left: "55%",
            right: "9%",
            transition: "top 1s ease-in-out",
      }}>
        <AboutUs />
      </div>
      </section>
      <div 
        style={{
           height: "250vh", 
           backgroundColor: "transparent",
        }}>
      </div>

    </section>
    <div
    style={{
      position: "fixed",
      top: scrollTop >= scrollMax * 0.5 ? "0%" : "100%",
      transition: "top 1s ease-in-out",
      backgroundColor: "black",
      height: "100%",
    }}>
      <Divider />
      <PerformanceCards />

    </div>
        <div
    style={{
      position: "fixed",
      height: "100%",
      width: "100%",
      top: scrollTop >= scrollMax * 0.8 ? "25%" : "100%",
      transition: "top 1s ease-in-out",
      backgroundColor: "black",
      zIndex: 100
    }}>
      <Footer />

    </div>

    

    </section>
  );
}

export default Hero;
