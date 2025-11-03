import { useState, useEffect } from "react";

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [tshirtSize, setTshirtSize] = useState('');
    
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [chaperoneFile, setChaperoneFile] = useState(null);
    
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calculate if user is a minor (under 18 by March 2026)
    const isMinor = () => {
        if (!dateOfBirth) return false;
        const march2026 = new Date('2026-03-01');
        const birthDate = new Date(dateOfBirth);
        const age = march2026.getFullYear() - birthDate.getFullYear();
        const monthDiff = march2026.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && march2026.getDate() < birthDate.getDate())) {
            return (age - 1) < 18;
        }
        return age < 18;
    };

    useEffect(() => {
        if (responseMessage && !isSubmitted) {
          const timer = setTimeout(() => {
            setResponseMessage('');
          }, 5000);
    
          return () => clearTimeout(timer);
        }
    }, [responseMessage, isSubmitted]);

    const handleNext = (e) => {
        e.preventDefault();
        
        // Validation for step 1
        if (step === 1) {
            if (!firstName || !lastName || !email || !phoneNumber || !dateOfBirth || !tshirtSize) {
                setResponseMessage('Please fill in all fields');
                return;
            }
        }
        
        // Validation for step 2
        if (step === 2) {
            if (!emergencyContactName || !emergencyContactPhone || !numberOfGuests) {
                setResponseMessage('Please fill in all fields');
                return;
            }
        }
        
        if (step < 3) {
            setStep(step + 1);
            setResponseMessage(''); // Clear any error messages
        }
    };

    const submitRegistrationForm = async (e) => {
        e.preventDefault();
        
        if (!agreedToTerms) {
            setResponseMessage('Please agree to the terms and conditions');
            return;
        }

        if (isMinor() && !chaperoneFile) {
            setResponseMessage('Please upload the chaperone form');
            return;
        }
        
        // Convert file to base64 if it exists
        let chaperoneFileData = null;
        let chaperoneFileName = null;
        if (chaperoneFile) {
            try {
                const reader = new FileReader();
                chaperoneFileData = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(chaperoneFile);
                });
                chaperoneFileName = chaperoneFile.name;
            } catch (err) {
                setResponseMessage('Error reading file. Please try again.');
                return;
            }
        }
        
        const registrationData = {
            firstname: firstName, 
            lastname: lastName,
            email: email, 
            phonenumber: phoneNumber,
            dateofbirth: dateOfBirth,
            tshirtsize: tshirtSize,
            emergencycontactname: emergencyContactName,
            emergencycontactphone: emergencyContactPhone,
            numberofguests: numberOfGuests,
            isminor: isMinor(),
            chaperonefile: chaperoneFileData,
            chaperonefilename: chaperoneFileName
        };

        try {
            const res = await fetch('http://127.0.0.1:5000/register_indiv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            const text = await res.text();
            console.log('Response text:', text);
            
            let result;
            try {
                result = JSON.parse(text);
            } catch (parseError) {
                console.error('Failed to parse response:', text);
                setResponseMessage(`Server returned invalid response: ${text.substring(0, 100)}`);
                return;
            }
            
            if (res.ok) {
                setResponseMessage(result.message || 'Success!');
                setIsSubmitted(true);
                setStep(4);
                
                // Open payment link in new tab
                window.open('https://buy.stripe.com/test_dRm3cnbtZ9I55ob7oRaZi00', '_blank');
            } else {
                setResponseMessage(result.error || 'Error submitting form');
            }

        } catch (err) {
            console.error('Fetch error:', err);
            setResponseMessage(`Error Submitting form: ${err.message}`);
        }
    };

    const renderStepIndicator = () => {
        return (
            <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div 
                        key={s}
                        className={`w-2 h-2 rounded-full ${
                            s === step ? 'bg-white' : 'bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        );
    };

    if (isSubmitted && step === 4) {
        return (
            <div className="lg:ml-auto w-[90%] justify-self-end max-w-lg">
                <section className="backdrop-blur-xs border border-gray-700 rounded-3xl p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
                    {renderStepIndicator()}
                    <div className="text-left flex-1 flex flex-col justify-center">
                        <h2 className="text-4xl font-light text-white mb-8 tracking-wide">You're all set!</h2>
                        <p className="text-white text-base leading-relaxed mb-6 font-light">
                            Thank you for registering for the 2026 Texas Diabolo Competition! Once we've received your payment, you will receive an email confirmation for your registration.
                        </p>
                        <p className="text-white text-base leading-relaxed font-light">
                            Please do not forget to send us your music for your routine by February 14th, 2026 to texasdiabolo@gmail.com. We can't wait to see you in March!
                        </p>
                    </div>
                    <div className="flex justify-center mt-12">
                        <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="lg:ml-auto w-[90%] justify-self-end max-w-lg">
            <section className="backdrop-blur-xs border border-gray-700 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
                {renderStepIndicator()}
                
                {step === 1 && (
                    <div>
                        <h2 className="text-3xl font-light text-white mb-12 tracking-wide">PERSONAL<br/>INFORMATION</h2>
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="text" 
                                    placeholder="FIRST NAME" 
                                    required 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="text" 
                                    placeholder="LAST NAME" 
                                    required 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <input 
                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                type="email" 
                                placeholder="EMAIL" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input 
                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                type="tel"
                                placeholder="PHONE NUMBER"
                                required 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">DATE OF BIRTH</label>
                                    <input 
                                        className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                        type="date" 
                                        required 
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    />
                                </div>
                                
                                <div className="relative mt-8">                                  
                                    <select
                                    className="w-full bg-transparent border-b border-gray-600 py-[10px] px-1 text-white focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase appearance-none leading-none align-bottom"
                                    required
                                    value={tshirtSize}
                                    onChange={(e) => setTshirtSize(e.target.value)}
                                    >
                                    <option value="" disabled>
                                        Select Size
                                    </option>
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="2XL">2XL</option>
                                    <option value="3XL">3XL</option>
                                    </select>

                                    {/* Dropdown Arrow */}
                                    <svg
                                    className="absolute right-2 bottom-3 pointer-events-none text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                    </div>

                            </div>
                        </div>
                        <button  
                            className="w-16 h-16 mt-12 mx-auto block bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center" 
                            onClick={handleNext}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {responseMessage && (
                            <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-3xl font-light text-white mb-12 tracking-wide">EMERGENCY CONTACT<br/>INFORMATION</h2>
                        <div className="space-y-12 flex-1">
                            <input 
                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                type="text" 
                                placeholder="EMERGENCY CONTACT FULL NAME" 
                                required 
                                value={emergencyContactName}
                                onChange={(e) => setEmergencyContactName(e.target.value)}
                            />
                            <input 
                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                type="tel"
                                placeholder="EMERGENCY CONTACT PHONE NUMBER"
                                required 
                                value={emergencyContactPhone}
                                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                            />
                            <input 
                                className="w-1/2 bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                type="number" 
                                placeholder="NUMBER OF GUESTS" 
                                required 
                                min="0"
                                value={numberOfGuests}
                                onChange={(e) => setNumberOfGuests(e.target.value)}
                            />
                        </div>
                        <button  
                            className="w-16 h-16 mt-12 mx-auto block bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center" 
                            onClick={handleNext}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        {responseMessage && (
                            <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>
                        )}
                    </div>
                )}

                {step === 3 && !isMinor() && (
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-light text-white mb-12 tracking-wide">WAIVERS<br/>& FORMS</h2>
                            <label className="flex items-start gap-4 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    className="mt-1 w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    required
                                />
                                <span className="text-white text-base leading-relaxed font-light">
                                    I consent and acknowledge that me and my guests have read and agree to these{' '}
                                    <a href="#" className="text-blue-400 underline">photo release</a> and{' '}
                                    <a href="#" className="text-blue-400 underline">injury and liability forms</a>.
                                </span>
                            </label>
                        </div>
                        <div>
                            <button  
                                className="w-full bg-transparent border-2 border-white text-white py-5 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm" 
                                onClick={submitRegistrationForm}>
                                SUBMIT & PAY
                            </button>
                            {responseMessage && !isSubmitted && (
                                <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && isMinor() && (
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-light text-white mb-8 tracking-wide">WAIVERS<br/>& FORMS</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                                For competitors under the age of 18, all competitors must have a parent/guardian sign and upload to the following{' '}
                                <a href="#" className="text-blue-400 underline">chaperone form</a>. In accordance to University policy, the Texas Diabolo Association will not take custodial responsibility of minors while participating in TXDC. Custodial responsibility will remain with chaperones.
                            </p>
                            
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 mb-8 text-center cursor-pointer hover:border-gray-500 transition-colors">
                                <input 
                                    type="file"
                                    id="chaperone-upload"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setChaperoneFile(e.target.files[0])}
                                />
                                <label htmlFor="chaperone-upload" className="cursor-pointer">
                                    <p className="text-white text-base font-light">Upload file here</p>
                                    {chaperoneFile && (
                                        <p className="text-blue-400 text-sm mt-2">{chaperoneFile.name}</p>
                                    )}
                                </label>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    className="mt-1 w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                    checked={agreedToTerms}
                                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    required
                                />
                                <span className="text-white text-base leading-relaxed font-light">
                                    I consent and acknowledge that a parents/guardian along with my guests have read and agreed to these{' '}
                                    <a href="#" className="text-blue-400 underline">photo release</a> and{' '}
                                    <a href="#" className="text-blue-400 underline">injury and liability forms</a>.
                                </span>
                            </label>
                        </div>
                        <div>
                            <button  
                                className="w-full bg-transparent border-2 border-white text-white py-5 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm" 
                                onClick={submitRegistrationForm}>
                                SUBMIT & PAY
                            </button>
                            {responseMessage && !isSubmitted && (
                                <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default RegistrationForm;