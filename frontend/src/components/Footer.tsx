import TDALogo from "../assets/Tda_Logo.svg";
import Socials from "./Socials";
import SubscribeMailout from "./SubscribeMailout";


const Footer = () => {
  return (
    <div className="relative z-100 bg-black">
    <SubscribeMailout />
    <div className="relative flex flex-col justify-end pt-10 pb-5"
    style={{
      marginBottom: "4%"
    }}>
        <div className="absolute left-[12%] flex gap-3">
          <img src={TDALogo} alt="Texas Diabolo" className="w-[20vw] md:w-[7vw]" />

        </div>
        <div className="absolute right-[12.5%] justify-self-end"> <Socials /></div>

    </div>
    </div>
  )
}

export default Footer
