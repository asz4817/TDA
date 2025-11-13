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
          const res = await fetch('/addToMailout', {
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
    <div className="w-full text-white pb-4 md:py-12 flex flex-col">
      <img src={Q} alt="Want to be notified about diabolo events in Austin?" className="w-[60%] md:w-[50%] ml-[12.5vw] my-[3vh] md:my-[7vh]" />
      <h2 
        className="text-sm tracking-widest text-center mb-[1vh]"
        style={{
          fontFamily: "unbounded",
          fontWeight: '300',
          fontSize: "clamp(8px, 2vw, 12px)"
        }}>
        JOIN OUR MAILING LIST:
      </h2>

      <form className="w-[75%] mx-auto" onSubmit={addToMailout}>
        <input 
          className="w-full mb-4 p-2 bg-transparent border-b border-white text-white text-sm focus:outline-none focus:border-gray-400" 
          style={{
            fontFamily: "unbounded",
            fontWeight: '200',
            fontSize: "clamp(8px, 2vw, 12px)"
          }}
          type="email" 
          id="email" 
          name="email" 
          placeholder="EMAIL"
          required 
          value = {email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        {/* Submit button */}
        <button
          type="submit"
          className="w-full border text-white py-2 text-sm tracking-widest hover:bg-white hover:text-black transition"
          style={{
            fontFamily: "unbounded",
            fontWeight: '300',
            fontSize: "clamp(8px, 2vw, 12px)",
            cursor: "pointer"
          }}>
          JOIN NOW
        </button>
  
         <p className="mt-2 text-sm text-center text-green-500">{responseMessage}</p>
     </form>
    </div>
  )
}

export default SubscribeMailout;
