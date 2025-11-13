import ContactBg from "../assets/ContactUsimg.png";
import RegistrationSystem from "../components/RegistrationSystem";
import EmailIcon from "../assets/mail.svg";

const Registration = () => {
  return (
    <div>
      <section
      className="relative w-full bg-cover bg-center mb-10 mt-30"
        style={{ backgroundImage: `url(${ContactBg})`,backgroundColor: "transparent",}}
    >
          <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="">
        <div className="w-[80%] grid md:grid-cols-2 mx-auto">      
            <div className="space-y-4 z-50 md:py-30 pb-10">
                <h1 className="leading-1" 
                style={{
                  fontFamily: 'roc-grotesk-compressed, sans-serif',
                  fontWeight: 700,
                  fontStyle: 'normal',
                  lineHeight: "0.9",
                  fontSize: 'clamp(50px, 8vw, 108px)',
                  marginBottom: "5%"
                }}>
                  TXDC 2026 
                  REGISTRATION
                  </h1>
                <p className="" style={{
                  fontFamily: "unbounded",
                  fontWeight: '300'
                }}>When: March 14-15th, 2026</p>
                <p className="" style={{
                  fontFamily: "unbounded",
                  fontWeight: '300'
                }}>For any inquiries or assistance please contact us through our email.</p>

                
                <a href="mailto:texasdiabolo@gmail.com" target="_blank" rel="noopener noreferrer">
                  <img src={EmailIcon} alt="Email" className="w-5 h-5 hover:opacity-75" />
                </a>
            </div>

            <div className="my-auto">
               <RegistrationSystem />
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Registration
