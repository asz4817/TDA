import ContactBg from "../assets/ContactUsimg.png";
import EmailIcon from "../assets/mail.svg";

const Registration = () => {
  return (
    <div>
      <section
      className="relative w-full h-screen bg-cover bg-center mb-10"
        style={{ backgroundImage: `url(${ContactBg})`,backgroundColor: "transparent",}}
    >
          <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="pt-45 pb-30">
        <div className="w-[70%] grid grid-cols-2 mx-auto">      
            <div className="space-y-4 z-50 mt-10">
                <h1 
                style={{
                  fontFamily: 'roc-grotesk-compressed, sans-serif',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '80px',
                }}>
                REGISTRATION
                </h1>
                
                <p className="text-gray-300 max-w-lg leading-relaxed"
                >
                  <div 
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontSize: '12px',
              lineHeight: "1.3px"
            }}>
              <p className="leading-tight">
                Divisions and Registration Fees:
              </p>
              
              <p className="leading-tight">
                Regional Junior Individual: $35
              </p>
              
              <p className="leading-tight">
                Regional Open Individual: $35
              </p>
              
              <p className="leading-tight">
               Open Stage Individual: $35
              </p>

               <p className="leading-tight">
               Open Stage Teams: $50
              </p>

              <p className="leading-tight pt-4">
                For any inquiries or assistance please contact us through our email.
              </p>
            </div>
                  
                </p>

                  <a href="mailto:texasdiabolo@gmail.com" target="_blank" rel="noopener noreferrer">
            <img src={EmailIcon} alt="Email" className="w-5 h-5 hover:opacity-75" />
          </a>
            </div>

            <div>
               Registration form coming soon!
            </div>
        </div>
        </div>
    </section>
    </div>
  )
}

export default Registration
