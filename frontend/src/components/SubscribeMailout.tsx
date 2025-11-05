import { useState, useEffect } from "react";
import Q from "../assets/MailoutQ.svg";


const SubscribeMailout = () => {

  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage('');
      }, 5000);

      return () => clearTimeout(timer); // Clean up on unmount or message change
    }
  }, [responseMessage]);

  const addToMailout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
          const res = await fetch('http://127.0.0.1:5000/addToMailout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),
          });

          const result = await res.json();
          setResponseMessage(result.message || 'Success!');

          setEmail('');
        } catch (err) {
            setResponseMessage(`Submission failed: ${err}`);
        }

  }
  
  return (
    <div className="w-full text-white pb-4 md:py-12 flex flex-col"
      >
      <img src={Q} alt="Email" className="w-[50%] ml-[12.5%] mt-10" />

      <h2 className="text-sm tracking-widest text-center mb-4 mt-10">
        JOIN OUR MAILING LIST:
      </h2>

      <form className="w-[75%] mx-auto" onSubmit={addToMailout}>
        <input 
          className="w-full mb-2 md:mb-4 pb-1 text-xs md:text-lg bg-transparent border-b border-white text-white focus:outline-none focus:border-gray-400" 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email"
          required 
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-white text-black py-1 tracking-widest hover:bg-gray-200 transition"
          style={{
                    fontFamily: "unbounded",
                    fontSize: "clamp(8px, 2vw, 14px)",
                    cursor: "pointer",
                }}>
          JOIN NOW
        </button>
  
         <p className="mt-2 text-sm text-center text-green-500">{responseMessage}</p>
     </form>
    </div>
  )
}

export default SubscribeMailout;
