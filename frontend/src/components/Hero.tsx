import HomeBg from "../assets/Home.png";
import WeAreLogo from "../assets/WE ARE TEXAS DIABOLO.svg";
import BasedIn from "../assets/BasedIn.svg"
import Socials from "./Socials";
import AboutUs from "./AboutUs";
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

  if (scrollTop > 1600) { 
    return (
      <section className="relative w-full mb-10"
          style={{ backgroundImage: `url(${HomeBg})`,
          backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
  
        <section
          className="relative w-full h-screen bg-cover mb-10 scrollbar-hide"
        >
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
        </section>
      {/* <Parallax speed={-1} style={{
        top: scrollTop >= 680 ? "14%": "105%",
        marginLeft: "60%",
        position: scrollTop >= 680 || scrollTop <= 20 ? "fixed" : "static",
      }}>
        <div style={{
          opacity: scrollTop >= 1000 || scrollTop < 20 ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}>
          <AboutUs />
        </div>
      </Parallax> */}
      <div
        style={{
          marginLeft: "13%",
          // transform: scrolling ? "translateX(0)" : "translateX(500%)",
          // transition: "transform 0.5s ease-out",
          marginTop: "143.5vh",
          position: "absolute"
        }}>
        <img
          src={WeAreLogo}
          alt="We Are Texas Diabolo"
          className="w-[35vw]"
        />
      </div>
      <div style={{
        position: "static",
        marginTop: "131.7vh",
        marginLeft: "53%",
        marginRight: "8.9%",
        // opacity: scrollTop >= 500 ? 0 : 1,
  
      }}>
        <AboutUs />
      </div>
      <div style={{
        backgroundColor: "transparent",
        height: "24vh",
      }}></div>
      </section>
    );
  }
  else if (scrollTop >= 650 && scrollTop <= 1600) {
    return (
      <section className="relative w-full mb-10"
          style={{ backgroundImage: `url(${HomeBg})`,
          backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <section
          className="relative w-full h-screen bg-cover mb-10 scrollbar-hide"
        >
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
        </section>
      {/* <Parallax speed={-1} style={{
        top: scrollTop >= 680 ? "14%": "105%",
        marginLeft: "60%",
        position: scrollTop >= 680 || scrollTop <= 20 ? "fixed" : "static",
      }}>
        <div style={{
          opacity: scrollTop >= 1000 || scrollTop < 20 ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}>
          <AboutUs />
        </div>
      </Parallax> */}
        <div
          style={{
            // transform: scrolling ? "translateX(0)" : "translateX(500%)",
            // transition: "transform 0.5s ease-out",
            marginLeft: "13%",
            position: "fixed",
            marginTop: "-69vh",
          }}>
          <img
            src={WeAreLogo}
            alt="We Are Texas Diabolo"
            className="w-[35vw]"
          />
        </div>
      <div style={{
        position: "fixed",
        marginTop: "-86.1vh",
        marginLeft: "53%",
        marginRight: "8.9%",
        // opacity: scrollTop >= 500 ? 0 : 1,
  
      }}>
        <AboutUs />
      </div>
      <div style={{
        backgroundColor: "transparent",
        height: "250vh",
      }}></div>
      </section>
    );
  }
  else {
    return (
      <section className="relative w-full mb-10"
          style={{ backgroundImage: `url(${HomeBg})`,
          backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <section
          className="relative w-full h-screen bg-cover mb-10 scrollbar-hide"
        >
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
        </section>
      {/* <Parallax speed={-1} style={{
        top: scrollTop >= 680 ? "14%": "105%",
        marginLeft: "60%",
        position: scrollTop >= 680 || scrollTop <= 20 ? "fixed" : "static",
      }}>
        <div style={{
          opacity: scrollTop >= 1000 || scrollTop < 20 ? 0 : 1,
          transition: "opacity 0.5s ease-out",
        }}>
          <AboutUs />
        </div>
      </Parallax> */}
      <Parallax speed={-60}>
        <div
          style={{
            marginLeft: "13%",
            // transform: scrolling ? "translateX(0)" : "translateX(500%)",
            // transition: "transform 0.5s ease-out",
            marginTop: "-1%",
            position: "absolute"
          }}>
          <img
            src={WeAreLogo}
            alt="We Are Texas Diabolo"
            className="w-[35vw]"
          />
        </div>
      </Parallax>
      <div style={{
        position: "static",
        marginTop: "0%",
        marginLeft: "53%",
        marginRight: "8.9%",
        // opacity: scrollTop >= 500 ? 0 : 1,
  
      }}>
        <AboutUs />
      </div>
      <div style={{
        backgroundColor: "transparent",
        height: "250vh",
      }}></div>
      </section>
    );
  }
};

export default Hero;
