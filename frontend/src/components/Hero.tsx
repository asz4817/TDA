import HomeBg from "../assets/Home.png";
import WeAreLogo from "../assets/WE ARE TEXAS DIABOLO.svg";
import BasedIn from "../assets/BasedIn.svg"
import Socials from "./Socials";

const Hero = () => {
  return (
    <section
      className="relative w-full h-screen bg-cover bg-center mb-10"
        style={{ backgroundImage: `url(${HomeBg})`, backgroundColor: "transparent",}}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-opacity-40" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-[12%] pb-[4%] text-white">
        {/* Bottom Left */}
        <div className="absolute  left-[15%]">
          <img
            src={WeAreLogo}
            alt="We Are Texas Diabolo"
            className="w-[40vw]"
          />
        </div>
        <div className="absolute bottom-[11%] right-[15%] ">
            <img
            src={BasedIn}
            alt="Based in Austin Texas"
            className="w-[10vw]"
          />
        </div>
         <div className="absolute right-[15%] ">
            <Socials />
        </div>


      </div>
    </section>
  );
};

export default Hero;
