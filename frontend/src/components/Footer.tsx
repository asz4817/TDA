import TDALogo from "../assets/TDA_Logo.svg";
import Socials from "./Socials";
import SubscribeMailout from "./SubscribeMailout";


const Footer = () => {
  return (
    <div className="relative flex flex-col justify-end pt-10 pb-5"
    style={{
      marginBottom: "4%"
    }}>
        <div className="absolute left-[12%] flex gap-3">
          <img src={TDALogo} alt="Texas Diabolo" className="w-20" />

        </div>
        <div className="absolute right-[12.5%]"> <Socials /></div>

    </div>
  )
}

export default Footer
