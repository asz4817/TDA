import EmailIcon from "../assets/mail.svg";
import InstagramIcon from "../assets/instagram.svg";
import YoutubeIcon from "../assets/youtube.svg";
import TDALogo from "../assets/TDA_Logo.svg";


const Footer = () => {
  return (
    <div className="relative flex flex-col justify-end pt-10 pb-5">
        <div className="absolute left-[12%] flex gap-3">
          <img src={TDALogo} alt="Texas Diabolo" className="w-20" />

        </div>
        <div className="absolute right-[15%] flex gap-3">
          <a href="mailto:texasdiabolo@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={EmailIcon} alt="Email" className="w-5 h-5 hover:opacity-75" />
          </a>
          <a href="https://instagram.com/texasdiabolo" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 hover:opacity-75" />
          </a>
          <a href="https://youtube.com/@texasdiabolo" target="_blank" rel="noopener noreferrer">
            <img src={YoutubeIcon} alt="YouTube" className="w-5 h-5 hover:opacity-75" />
          </a>
        </div>
    </div>
  )
}

export default Footer
