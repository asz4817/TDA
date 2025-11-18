import ContactForm from "../components/ContactForm"
import ContactBg from "../assets/ContactUsimg.png";
import Socials from "../components/Socials";
import Divider from "../components/Divider";
import FAQ from "../components/FAQ.jsx";
import { useEffect, useState } from "react";


const ContactUs = () => {

    const [scrolling, setScrolling] = useState(true);
    const [scrollTop, setScrollTop] = useState(0);

    const [scrollMax, setScrollMax] = useState(1000);

    useEffect(() => {
    function onResize() {
        setScrollMax(document.body.scrollHeight - window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    onResize();
    return () => {window.removeEventListener("resize", onResize)
    };
    }, []);

    useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset;

      currentPosition > 0 ? setScrolling(false) : setScrolling(true);
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);


  return (
    <div>

        <div className="block md:hidden">
        <section
        className="relative w-full bg-contain bg-no-repeat bg-cover bg-center bg-top md:pt-50 md:pb-30 h-full"
            style={{ 
                // backgroundImage: `url(${ContactBg})`,
                backgroundColor: "transparent",
            //   backgroundAttachment: "fixed",
            //   backgroundPosition: "center",
            //   backgroundRepeat: "no-repeat",
            //   backgroundSize: "cover",
            }}
        >
            <div className="absolute fixed z-[1] w-screen h-screen bg-black"
            >
                {/* <div className="bg-blue-500 h-screen w-screen absolute">
                </div> */}
                <img src={ContactBg} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: scrollTop >= scrollMax * 0.8 ? 0 : 1,
                }}></img>
            </div>
            <div className="absolute inset-0 bg-black opacity-50 z-[2]"></div>
        <div className="z-[3] relative">
            <div className="w-[75%] grid md:grid-cols-2 mx-auto">      
                <div className="space-y-2 md:space-y-4 z-50 mt-20 md:mt-5 pb-3 pr-2">
                    <h1 className=""
                        style={{
                            fontFamily: `roc-grotesk-compressed, sans-serif`,
                            fontWeight: 700,
                            fontStyle: "normal",
                            // fontSize: "128px",
                            fontSize: "clamp(20px, 10vw, 128px)",
                            marginBottom: "-2%",
                        }}>
                    CONTACT US
                    </h1>

                    <p style={{
                            fontFamily: "unbounded",
                            fontWeight: '300',
                            // fontSize: "14px",
                            fontSize: "clamp(2px, 2vw, 14px)",
                            
                        }}>
                    For any inquiries, or if you're an event organizer looking for an awesome performance for your event, we'd love to hear from you! Reach out and let's connect.
                    </p>
                    <div className="justify-self-start"><Socials/></div>
                </div>

                <div className="mx-auto my-2 md:mt-0 mb-5">
                    <ContactForm />
                </div>
            </div>
            </div>
        </section>



        <div className="z-7 relative bg-black">
            <Divider />

            <div className="w-[80%] mx-auto">
                <FAQ />
            </div>

        </div>
        
        </div>
        <div className="hidden md:block">
    <div>
    <section
      className="relative w-full bg-contain bg-no-repeat bg-cover bg-center bg-top md:pt-50 md:pb-30 h-full"
        style={{ 
                            backgroundImage: `url(${ContactBg})`,
                backgroundColor: "transparent",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
    }}
    >
          <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="">
        <div className="w-[75%] grid md:grid-cols-2 mx-auto">      
            <div className="space-y-2 md:space-y-4 z-50 mt-20 md:mt-5 pb-3 pr-2">
                <h1 className=""
                    style={{
                        fontFamily: `roc-grotesk-compressed, sans-serif`,
                        fontWeight: 700,
                        fontStyle: "normal",
                        // fontSize: "128px",
                        fontSize: "clamp(20px, 10vw, 128px)",
                        marginBottom: "-2%",
                    }}>
                CONTACT US
                </h1>

                <p style={{
                        fontFamily: "unbounded",
                        fontWeight: '300',
                        // fontSize: "14px",
                        fontSize: "clamp(2px, 2vw, 14px)",
                        
                    }}>
                For any inquiries, or if you're an event organizer looking for an awesome performance for your event, we'd love to hear from you! Reach out and let's connect.
                </p>
                <div className="justify-self-start"><Socials/></div>
            </div>

            <div className="mx-auto my-2 md:mt-0 mb-5">
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
        </div>
    </div>
  )
}

export default ContactUs
