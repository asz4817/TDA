import TDALogo from "../assets/TDA_Logo.svg";
import Socials from "./Socials";
import SubscribeMailout from "./SubscribeMailout";


const Footer = () => {
  return (
    <div className="relative flex flex-col justify-end pt-10 pb-5">
        <div className="absolute left-[12%] flex gap-3">
          <img src={TDALogo} alt="Texas Diabolo" className="w-20" />

        </div>
        <div className="absolute right-[15%]"> <Socials /></div>

        <SubscribeMailout />

    </div>
  )
}

export default Footer
