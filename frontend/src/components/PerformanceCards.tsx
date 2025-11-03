import { useState } from "react";
import Perf1 from "../assets/Perf1.png";
import Perf2 from "../assets/Perf2.png";
import Perf3 from "../assets/Perf3.png";
import Arrow from "../assets/arrow-right-circle.svg";
import '../App.css';


const PerformanceCards = () => {
  const [activeCard, setActiveCard] = useState(0);

  const performances = [
    {
      id: 0,
      title: "CSA Mid Autumn Festival",
      year: "2025",
      image: Perf1,
      youtubeUrl: "https://youtu.be/XXEd64ypnDE?si=zhdt1ICa3p4AHDiV"
    },
    {
      id: 1,
      title: "USA National Championship",
      year: "2024",
      image: Perf2,
      youtubeUrl: "https://youtu.be/9XuFZSVlaGQ?si=9JRrGOVMGZCtv3J2"
    },
    {
      id: 2,
      title: "Spring Performance",
      year: "2024",
      image: Perf3,
      youtubeUrl: "https://youtu.be/WD8c3Q0bTpU?si=kDRT98RcWwbJ2M8s"
    }
  ];

  return (
    <div className="min-h-screen text-white py-20 px-8">
      <div className="w-[81%] mx-auto grid grid-cols-7">
            {/* Header */}
            <div className="col-span-2 my-auto mx-auto">
                <h2 style={{
                  fontFamily: `roc-grotesk-compressed, sans-serif`,
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "64px",
                  marginBottom: "-13%",
                }}>OUR</h2>
                <h2 style={{
                  fontFamily: `roc-grotesk-compressed, sans-serif`,
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: "64px",
                  marginBottom: "4%",
                }}>PERFORMANCES</h2>
                <a href="https://youtube.com/@texasdiabolo" target="_blank" rel="noopener noreferrer">
            <img src={Arrow} alt="YouTube" className="w-15 h-15 hover:opacity-75" />
          </a>
            </div>



        {/* Cards Container */}
        <div className="flex gap-6 items-center col-span-5"
        style={{
          marginLeft: "5%",
          marginRight: "2%"
        }}>
          {performances.map((performance) => (
            <div
              key={performance.id}
              onMouseEnter={() => setActiveCard(performance.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ease-out ${
                activeCard === performance.id
                  ? "w-[700px] h-[600px]"
                  : "w-[180px] h-[600px]"
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(178deg,rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.8) 90%, rgba(0, 0, 0, 1) 100%), url(${performance.image})`,
                }}
              >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-opacity-40"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-8">
                <div
                  className={`transition-opacity duration-300 ${
                    activeCard === performance.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className=""
                      style={{
                        opacity: activeCard === performance.id ? 1 : 0,
                        transition: "opacity 300ms ease-in-out",
                        transitionDelay: "200ms",
                        fontFamily: "unbounded",
                        fontSize: "24px",
                      }}>{performance.title}</h3>
                  <p className=""
                      style={{
                        marginTop: "-1%",
                        fontFamily: "unbounded",
                        fontSize: "20px",
                        marginBottom: "4%",
                      }}
                  >{performance.year}</p>
                  
                  {/* Watch Now Button */}
                  <a
                    href={performance.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className=""
                    style={{
                      fontFamily: "unbounded",
                      fontSize: "12px"
                    }}>WATCH NOW</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                </div>

                {/* Small indicator when not active */}
                <div
                  className={`transition-opacity duration-300 ${
                    activeCard === performance.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {/* <div className="text-sm font-medium">{performance.title}</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCards;