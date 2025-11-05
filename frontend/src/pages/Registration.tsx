import ContactBg from "../assets/ContactUsimg.png";
import RegistrationSystem from "../components/RegistrationSystem";
import EmailIcon from "../assets/mail.svg";

const Registration = () => {
  return (
    <div>
      <section
      className="relative w-full h-screen bg-cover bg-center mb-10 mt-30"
        style={{ backgroundImage: `url(${ContactBg})`,backgroundColor: "transparent",}}
    >
          <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="">
        <div className="w-[70%] grid grid-cols-2 mx-auto">      
            <div className="space-y-4 z-50 mt-10 pt-35 pb-30">
                <h1 
                style={{
                  fontFamily: 'roc-grotesk-compressed, sans-serif',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '80px',
                }}>
                  REGISTRATION
                  </h1>
                <p className="leading-1" style={{
                  fontFamily: "unbounded"
                }}>Divisions and Registration Fees:</p>
                <p className="leading-1" style={{
                  fontFamily: "unbounded"
                }}>Regional Junior Individual: $35</p>
                <p className="leading-1" style={{
                  fontFamily: "unbounded"
                }}>Regional Open Individual: $35</p>
                <p className="leading-1" style={{
                  fontFamily: "unbounded"
                }}>Open Stage Individual: $35</p>
                <p className="leading-1" style={{
                  fontFamily: "unbounded",
                  marginBottom: "10%",
                }}>Open Stage Teams: $50</p>
                <p className="leading-none" style={{
                  fontFamily: "unbounded"
                }}>For any inquiries or assistance please contact us through our email.</p>

                
                <a href="mailto:texasdiabolo@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={EmailIcon} alt="Email" className="w-5 h-5 hover:opacity-75" />
          </a>
            </div>

            <div
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "center",
            //   height: "60vh",
            //   width: "100%",
            // }}
            >
               <RegistrationSystem />
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Registration
