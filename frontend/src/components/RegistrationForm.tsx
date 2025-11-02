import { useState, useEffect } from "react";




const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        if (responseMessage) {
          const timer = setTimeout(() => {
            setResponseMessage('');
          }, 5000);
    
          return () => clearTimeout(timer); // Clean up on unmount or message change
        }
      }, [responseMessage]);

    const submitRegistrationForm = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        const contactData = {
            firstname: firstName, 
            lastname: lastName,
            email: email, 
            phonenumber: phoneNumber
        }


        try {
            const res = await fetch('http://127.0.0.1:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
            });

            const result = await res.json();
            setResponseMessage(result.message || 'Success!');

            setPhoneNumber('');
            setFirstName('');
            setLastName('');
            setEmail('');

        } catch (err) {
            setResponseMessage(`Error Submitting form: ${err}`);
        }
    }

  return (
    <div className="lg:ml-auto w-[90%] justify-self-end max-w-md">
        <section className="backdrop-blur-xs  border border-gray-700 rounded-3xl p-8 shadow-2xl">
            <form id="contact-form" onSubmit={submitRegistrationForm}>
                <div className="space-y-6">
                    <input 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                        type="text" 
                        id="firstname"
                        name="firstname" 
                        placeholder="FIRST NAME" 
                        required 
                        value = {firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                        type="text" 
                        id="lastname"
                        name="lastname" 
                        placeholder="LAST NAME" 
                        required 
                        value = {lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
        
                    <input 
                      className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="EMAIL" 
                        required 
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider resize-none" 
                        type="tel"
                        id="phonenumber" 
                        name="phonenumber" 
                        placeholder="PHONE NUMBER"
                        required 
                        value = {phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <input 
                        className="w-full bg-transparent border-b border-gray-500 py-3 px-1 text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-sm tracking-wider" 
                        type="number" 
                        id="age"
                        name="age" 
                        placeholder="AGE" 
                        required 
                        value = {age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button  
                  className="w-full mt-8 bg-transparent border border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-medium tracking-wider text-sm" 
                  type="submit">
                    Submit
                </button>
            </form>
            <p className="mt-3 text-green-500 text-center mt-4">{responseMessage}</p>
            <div id="response"></div>
        </section>
    </div>
  )
}

export default RegistrationForm;
