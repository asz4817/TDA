import HomeBg from "../assets/Home.png";
import WeAreLogo from "../assets/WE ARE TEXAS DIABOLO.svg";
import BasedIn from "../assets/BasedIn.svg"
import Socials from "./Socials";
import AboutUs from "./AboutUs";
// import { Parallax } from 'react-scroll-parallax';
import {useEffect, useState } from 'react';
import '../App.css';
import PerformanceCards from "./PerformanceCards";
import Divider from "./Divider";
import Footer from "./Footer";


const Hero = () => {
  const [scrolling, setScrolling] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [diaboloTop, setDiaboloTop] = useState(70);
  const [aboutTop, setAboutTop] = useState(140);

  const [scrollMax, setScrollMax] = useState(1000);

  useEffect(() => {
    function onResize() {
      setScrollMax(document.body.scrollHeight - window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    onResize();
    return () => {window.removeEventListener("resize", onResize)
      window.removeEventListener("load", onResize)
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;

      currentPosition > 0 ? setScrolling(false) : setScrolling(true);
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
      if (currentPosition > scrollMax * 0.4) {
        setDiaboloTop(-40);
        setAboutTop(-200)
      } else if (currentPosition > 0) {
        setDiaboloTop(40);
        setAboutTop(0)
      } else {
        setDiaboloTop(70);
        setAboutTop(140);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  
  return (
    <div>

      <div className="hidden md:block">

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
            <div className="absolute right-[14%] bottom-[7%] fixed"
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
                // className="w-[70%]"
                style={{
                  width: "fit-content",
                  maxWidth: "12vw",
                }}
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
              top: diaboloTop + "%",
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
                top: aboutTop + "%",
                bottom: "0",
                right: "0",
                left: "47%",
                transition: "top 1s ease-in-out",
                width: "36%",
                height: "fit-content",
                margin: "auto",
        }}>
          <AboutUs />
        </div>
        </section>
        <div 
          style={{
            height: "200vh", 
            backgroundColor: "transparent",
          }}>
        </div>

      </section>
      <div
      style={{
        position: "fixed",
        top: scrollTop >= scrollMax * 0.4 ? "0%" : "100%",
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
        height: "fit-content",
        minWidth: "100%",
        bottom: scrollTop >= (scrollMax * 0.8 )? "0%" : "-100%",
        transition: "bottom 1s ease-in-out",
        backgroundColor: "black",
        zIndex: 100
      }}>
        <Footer />

      </div>

      

      </div>
      <div className="block md:hidden">

      <section className=""
          style={{ 
          position: "relative",
          backgroundImage: `url(${HomeBg})`,
          // backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
  
            <div className="absolute right-[14%] bottom-[7%] fixed"
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
                style={{
                  width: "fit-content",
                  maxWidth: "20vw",
                  minWidth: "100px",
                }}
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
            <div
            style={{
              height: "70vh"
            }}>

            </div>
          <div
            style={{
              marginLeft: "5vw",
              backgroundColor: "transparent",
            }}>
            <img
              src={WeAreLogo}
              alt="We Are Texas Diabolo"
                style={{
                  width: "60vw",
                }}
            />
            <div 
            style={{
              height: "30vh"
            }}>

            </div>
            <AboutUs />
            <div
            style={{
              backgroundColor: "transparent",
              height: "20vh"
            }}></div>
        </div>
            <div
            style={{
              backgroundColor: "black"
            }}>

              <Divider />
              <PerformanceCards />

              <Footer />
            </div>

      </section>


      

      </div>
    </div>
  );
}

export default Hero;
