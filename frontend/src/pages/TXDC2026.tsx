import Divider from "../components/Divider";
import '../App.css';
import { NavLink } from "react-router-dom";
import RegistrationInfo from "../components/RegistrationInfo";
import EventSchedule from "../components/EventSchedule";
import HomeBg from "../assets/testtxdcbanner3.png";
import arrow from "../assets/arrow-up-right.svg"

const TXDC = () => {
  return (
    <div>
    <section
      className="relative w-full h-screen bg-cover bg-center mb-10"
      style={{
        backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.13) 50%, rgba(0, 0, 0, 0.5) 100%), url(${HomeBg})`,
                  backgroundColor: "transparent",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
      }}>
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="pt-45 md: pb-30">
            <div className="grid mx-auto pr-10 absolute left-[11%] bottom-[12%]">      
                <div>
                    <h1 
                    style={{
                        fontFamily: `roc-grotesk-compressed, sans-serif`,
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: "clamp(100px, 20vw, 168px)",
                        marginBottom: "-12%",
                    }}>
                    TXDC 2026
                    </h1>
                    <p style={{
                        fontFamily: "unbounded",
                        fontSize: "16px",
                        marginBottom: "6%",
                    }}>MARCH 14-15TH</p>
                    <div className="flex gap-4 items-center">
                        <NavLink
                        to="/txdc2026/register"
                        className="px-5 py-2 border flex items-center gap-1 border-white rounded-full hover:bg-white hover:text-black transition"
                                style={{fontFamily: "unbounded",
                                    fontSize: "11px"
                        }}>
                        REGISTER NOW <img src={arrow} className="w-5 h-5"></img>
                        </NavLink>
                        <h1 style={{
                            fontFamily: "unbounded",
                            fontSize: "11px",
                        }}>
                        Registration deadline: December 31st 2025 11:59pm CST
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <Divider />
    <div className="mx-auto w-[75vw]">   
       <RegistrationInfo />
       <EventSchedule />
      

    </div>
    </div>
  )
}

export default TXDC
