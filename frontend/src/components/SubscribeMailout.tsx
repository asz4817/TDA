import { useState, useEffect } from "react";

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
    <div className="w-full text-white py-12 flex flex-col">
      <h2 className="text-sm tracking-widest text-center mb-4">
        JOIN OUR MAILING LIST:
      </h2>

      <form className="w-[75%] mx-auto" onSubmit={addToMailout}>
        <input 
          className="w-full mb-4 bg-transparent border-b border-white text-white focus:outline-none focus:border-gray-400 pb-1" 
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
          className="w-full bg-white text-black py-1 text-sm tracking-widest hover:bg-gray-200 transition">
          JOIN NOW
        </button>
         <p className="mt-2 text-sm text-center text-green-500">{responseMessage}</p>
     </form>
    </div>
  )
}

export default SubscribeMailout;
