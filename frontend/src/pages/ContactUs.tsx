import ContactForm from "../components/ContactForm"
import ContactBg from "../assets/ContactUsimg.png";
import Socials from "../components/Socials";
import Divider from "../components/Divider";
import FAQ from "../components/FAQ";


const ContactUs = () => {
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
                <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
                CONTACT US
                </h1>
                
                <p className="text-gray-300 max-w-lg leading-relaxed">
                For any inquiries, or if you're an event organizer looking for an awesome performance for your event, we'd love to hear from you! Reach out and let's connect.
                </p>
                <div className="justify-self-start"><Socials/></div>
            </div>

            <div>
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
