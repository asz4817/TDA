import ContactForm from "../components/ContactForm"
import ContactBg from "../assets/ContactUsimg.png";
import Socials from "../components/Socials";
import Divider from "../components/Divider";
import FAQ from "../components/FAQ";


const ContactUs = () => {
  return (
    <div>
    <section
      className="relative w-full h-screen bg-cover bg-center mt-20"
        style={{ backgroundImage: `url(${ContactBg})`,backgroundColor: "transparent",}}
    >
          <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="pt-35">
        <div className="w-[70%] grid grid-cols-2 mx-auto">      
            <div className="z-50 mt-5">
                <h1
                style={{
                  fontFamily: 'roc-grotesk-compressed, sans-serif',
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '100px',
                }}>
                CONTACT US
                </h1>
                
                <p
                style={{
                  fontFamily: 'unbounded, sans-serif',
                  fontSize: '12px',
                }}>
                For any inquiries, or if you're an event organizer looking for an awesome performance for your event, we'd love to hear from you! Reach out and let's connect.
                </p>
                <div className="justify-self-start mt-6"><Socials/></div>
            </div>

            <div className="">
                <ContactForm />
            </div>
        </div>
        </div>
    </section>




    <Divider />

    <div className="w-[80%] mx-auto">
        <FAQ />
    </div>
    
    </div>
  )
}

export default ContactUs
