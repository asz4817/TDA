import { useState, useEffect } from "react";




const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        if (responseMessage) {
          const timer = setTimeout(() => {
            setResponseMessage('');
          }, 5000);
    
          return () => clearTimeout(timer); // Clean up on unmount or message change
        }
      }, [responseMessage]);

    const submitContactForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const contactData = {
            name, 
            email, 
            message
        }


        try {
            const res = await fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
            });

            const result = await res.json();
            setResponseMessage(result.message || 'Success!');

            setMessage('');
            setName('');
            setEmail('');

        } catch (err) {
            setResponseMessage(`Error Submitting form: ${err}`);
        }
    }

  return (
    <div className="my-[4vh] w-full justify-self-end max-w-md ">
        <section className="backdrop-blur-xs border border-gray-400 rounded-3xl px-4 py-2 md:p-8 shadow-2xl">
            <form id="contact-form" onSubmit={submitContactForm}>
                <div className="soace-y-2 md:space-y-6">
                    <input 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                        style={{
                          fontFamily: "unbounded",
                          fontWeight: '200',
                          fontSize: "clamp(6px, 2vw, 11px)",
                      }}
                        type="text" 
                        id="name"
                        name="name" 
                        placeholder="NAME" 
                        required 
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
        
                    <input 
                      className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                      style={{
                        fontFamily: "unbounded",
                        fontWeight: '200',
                        fontSize: "clamp(6px, 2vw, 11px)",
                    }}  
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="EMAIL" 
                        required 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider resize-none" 
                        style={{
                          fontFamily: "unbounded",
                          fontWeight: '200',
                          fontSize: "clamp(8px, 2vw, 11px)",
                      }}
                        id="message" 
                        name="message" 
                        placeholder="MESSAGE"
                        rows={5} 
                        required 
                        value = {message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button  
                  className="w-full mt-4 md:mt-8 bg-transparent border border-white text-white py-3 hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wider text-sm" 
                  type="submit"
                  style={{
                    fontFamily: "unbounded",
                    fontWeight: '300',
                    fontSize: "clamp(8px, 2vw, 12px)",
                    cursor: "pointer",
                }}>
                    SUBMIT
                </button>
            </form>
            <p className="mt-3 text-green-500 text-center mt-4">{responseMessage}</p>
            <div id="response"></div>
            
        </section>
    </div>
  )
}

export default ContactForm;
