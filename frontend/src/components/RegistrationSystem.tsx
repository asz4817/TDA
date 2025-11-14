import { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';

const RegistrationSystem = () => {
    // Navigation state
    const [currentView, setCurrentView] = useState('home'); // 'home', 'individual', 'team'
    
    // Individual registration states (from previous code)
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [tshirtSize, setTshirtSize] = useState('');
    const [division, setDivision] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [chaperoneFile, setChaperoneFile] = useState<File | null>(null);
    const [musicFile, setMusicFile] = useState<File | null>(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [teamSize, setTeamSize] = useState(1);

    // Team registration states
        type TeamMember = {
            firstName: string;
            lastName: string;
            email: string;
            phoneNumber: string;
            dateOfBirth: string;
            tshirtSize: string;
            emergencyContactName?: string;
            emergencyContactPhone?: string;
            numberOfGuests?: string;
        };
    
        const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
        const [currentTeamMemberIndex, setCurrentTeamMemberIndex] = useState(0);
        const [teamStep, setTeamStep] = useState(1); // 1: member info, 2: waivers, 3: emergency contact
        const [chaperoneFiles, setChaperoneFiles] = useState<File[]>([]);
        const [teamAgreedToTerms, setTeamAgreedToTerms] = useState(false);
        
        // Team-wide emergency contact (collected once at the end)
        const [teamEmergencyContactName, setTeamEmergencyContactName] = useState('');
        const [teamEmergencyContactPhone, setTeamEmergencyContactPhone] = useState('');
        const [teamNumberOfGuests, setTeamNumberOfGuests] = useState('');
    
        // Current team member being edited
        const [currentMember, setCurrentMember] = useState<TeamMember>({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            tshirtSize: ''
        });

    // const goBackMember = () => {
    //     if (currentTeamMemberIndex > 0) {
    //         const prevIndex = currentTeamMemberIndex - 1;
    //         setCurrentTeamMemberIndex(prevIndex);
    //         setCurrentMember(teamMembers[prevIndex]);
    //     }
    // };

    const isMinor = (dob: string) => {
        if (!dob) return false;
        const march2026 = new Date('2026-03-01');
        const birthDate = new Date(dob);
        const age = march2026.getFullYear() - birthDate.getFullYear();
        const monthDiff = march2026.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && march2026.getDate() < birthDate.getDate())) {
            return (age - 1) < 18;
        }
        return age < 18;
    };

    const countTeamMinors = () => {
        return teamMembers.filter(member => isMinor(member.dateOfBirth)).length;
    };

    useEffect(() => {
        if (responseMessage && !isSubmitted) {
          const timer = setTimeout(() => {
            setResponseMessage('');
          }, 5000);
          return () => clearTimeout(timer);
        }
    }, [responseMessage, isSubmitted]);
    
    useEffect(() => {
        if (teamMembers.length === 0) {
            setTeamMembers([{
            firstName: '', lastName: '', email: '',
            phoneNumber: '', dateOfBirth: '', tshirtSize: ''
            }]);
            setCurrentTeamMemberIndex(0);
            setTeamSize(1);
        }
        }, []);

    // Individual registration handlers
    const handleIndividualNext = () => {
        if (step === 1) {
            if (!firstName || !lastName || !email || !phoneNumber || !division || !dateOfBirth || !tshirtSize) {
                setResponseMessage('Please fill in all fields');
                return;
            }
        }
        if (step === 2) {
            if (!emergencyContactName || !emergencyContactPhone || !numberOfGuests) {
                setResponseMessage('Please fill in all fields');
                return;
            }
        }
        if (step < 3) {
            setStep(step + 1);
            setResponseMessage('');
        }
    };

    const submitMusicFile = async () => {
    if (!musicFile) {
        setResponseMessage('Please upload a music file');
        return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('file', musicFile);  // This matches request.files["file"] in your backend

    try {
        const res = await fetch('/upload_audio', {  // Note: underscore, not hyphen
            method: 'POST',
            body: formData,  // Send as FormData, not JSON
        });

        const text = await res.text();
        let result = JSON.parse(text);

        if (res.ok) {
            setIsSubmitted(true);
            setStep(2);
            setResponseMessage('');
        } else {
            setResponseMessage(result.error || 'Error submitting music file');
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            setResponseMessage(`Error: ${err.message}`);
        } else {
            setResponseMessage('An unknown error occurred.');
        }
        }

}

    const submitIndividualForm = async () => {
        if (!agreedToTerms) {
            setResponseMessage('Please agree to the terms and conditions');
            return;
        }

        if (isMinor(dateOfBirth) && !chaperoneFile) {
            setResponseMessage('Please upload the chaperone form');
            return;
        }

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
            type: 'individual',
            firstname: firstName,
            lastname: lastName,
            email: email,
            phonenumber: phoneNumber,
            dateofbirth: dateOfBirth,
            tshirtsize: tshirtSize,
            division: division,
            emergencycontactname: emergencyContactName,
            emergencycontactphone: emergencyContactPhone,
            numberofguests: numberOfGuests,
            isminor: isMinor(dateOfBirth),
            chaperonefile: chaperoneFileData,
            chaperonefilename: chaperoneFileName
        };

        try {
            const res = await fetch('/register_indiv', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            const text = await res.text();
            let result = JSON.parse(text);

            if (res.ok) {
                setIsSubmitted(true);
                setStep(4);
                window.open('https://buy.stripe.com/dRm3cnbtZ9I55ob7oRaZi00', '_blank');
            } else {
                setResponseMessage(result.error || 'Error submitting form');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setResponseMessage(`Error: ${err.message}`);
            } else {
                setResponseMessage('An unknown error occurred.');
            }
            }

    };    

    const addNewTeamMember = () => {
        // Only validate personal info fields
        if (!currentMember.firstName || !currentMember.lastName || !currentMember.email || 
            !currentMember.phoneNumber || !currentMember.dateOfBirth || !currentMember.tshirtSize) {
            setResponseMessage('Please complete all fields before adding a new member');
            return;
        }

        // Save current member
        const updatedMembers = [...teamMembers];
        if (currentTeamMemberIndex < teamMembers.length) {
            updatedMembers[currentTeamMemberIndex] = currentMember;
        } else {
            updatedMembers.push(currentMember);
        }
        setTeamMembers(updatedMembers);
        setTeamSize(updatedMembers.length + 1);

        // Reset for new member
        setCurrentMember({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            tshirtSize: ''
        });
        setCurrentTeamMemberIndex(updatedMembers.length);
        setResponseMessage('');
    };

    const deleteTeamMember = () => {
        // Only validate personal info fields
        if (!currentMember.firstName || !currentMember.lastName || !currentMember.email || 
            !currentMember.phoneNumber || !currentMember.dateOfBirth || !currentMember.tshirtSize) {
            setResponseMessage('Please complete all fields before adding a new member');
            return;
        }

        // Save current member
        const updatedMembers = [...teamMembers];
        if (currentTeamMemberIndex < teamMembers.length) {
            updatedMembers[currentTeamMemberIndex] = currentMember;
        } else {
            updatedMembers.push(currentMember);
        }
        setTeamMembers(updatedMembers);
        setTeamSize(updatedMembers.length + 1);

        // Reset for new member
        setCurrentMember({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dateOfBirth: '',
            tshirtSize: ''
        });
        setCurrentTeamMemberIndex(updatedMembers.length);
        setResponseMessage('');
    };

    const proceedWithTeam = () => {
        // Validate current member's fields first
        if (!currentMember.firstName || !currentMember.lastName || !currentMember.email || 
            !currentMember.phoneNumber || !currentMember.dateOfBirth || !currentMember.tshirtSize) {
            setResponseMessage('Please complete all fields for the current member');
            return;
        }

        // Save current member first
        const updatedMembers = [...teamMembers];
        if (currentTeamMemberIndex < teamMembers.length) {
            updatedMembers[currentTeamMemberIndex] = currentMember;
        } else {
            updatedMembers.push(currentMember);
        }
        setTeamMembers(updatedMembers);

        // Check if any minors
        setTeamStep(2); // Go to waiver/chaperone page
    };

    const submitTeamForm = async () => {
        if (!teamAgreedToTerms) {
            setResponseMessage('Please agree to the terms and conditions');
            return;
        }

        // Validate emergency contact fields
        if (!teamEmergencyContactName || !teamEmergencyContactPhone || !teamNumberOfGuests) {
            setResponseMessage('Please complete all emergency contact fields');
            return;
        }

        const minorCount = countTeamMinors();
        if (minorCount > 0 && chaperoneFiles.length !== minorCount) {
            setResponseMessage(`Please upload exactly ${minorCount} chaperone form(s)`);
            return;
        }

        // Convert files to base64
        const fileDataPromises = chaperoneFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({ data: reader.result, name: file.name });
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        let filesData = [];
        try {
            filesData = await Promise.all(fileDataPromises);
        } catch (err) {
            setResponseMessage('Error reading files');
            return;
        }

        const registrationData = {
            type: 'team',
            members: teamMembers,
            emergencycontactname: teamEmergencyContactName,
            emergencycontactphone: teamEmergencyContactPhone,
            numberofguests: teamNumberOfGuests,
            chaperonefiles: filesData
        };

        try {
            const res = await fetch('/register_team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData),
            });

            const text = await res.text();
            let result = JSON.parse(text);

            if (res.ok) {
                setIsSubmitted(true);
                setTeamStep(4);
                window.open('https://buy.stripe.com/00w4gr7dJbQdg2P4cFaZi01', '_blank');
            } else {
                setResponseMessage(result.error || 'Error submitting form');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setResponseMessage(`Error: ${err.message}`);
            } else {
                setResponseMessage('An unknown error occurred.');
            }
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []) as File[];
        setChaperoneFiles([...chaperoneFiles, ...files]);
    };

    const handleRemoveFile = (index: number) => {
  setChaperoneFiles((prev) => prev.filter((_, i) => i !== index));
};

    const renderStepIndicator = (currentStep: number, totalSteps: number) => {
        return (
            <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div 
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                            i + 1 === currentStep ? 'bg-white' : 'bg-gray-600'
                        }`}
                    />
                ))}
            </div>
        );
    };

    // HOME PAGE
    if (currentView === 'home') {
        return (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl">
                    <h1 className="mb-10 tracking-wide text-center"
                        style={{
                            fontFamily: "unbounded",
                            fontWeight: '300',
                            fontSize: "clamp(22px, 2vw, 24px)",
                        }}>REGISTER NOW</h1>
                    <div className="space-y-6">
                        <button
                            onClick={() => setCurrentView('individual')}
                            className="w-full bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer"
                            style={{
                                fontFamily: "unbounded",
                                fontWeight: '300',
                                fontSize: "clamp(8px, 2vw, 12px)",
                                cursor: "pointer",
                            }}
                        >
                            INDIVIDUAL REGISTRATION
                        </button>
                        <button
                            onClick={() => setCurrentView('team')}
                            className="w-full bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer"
                            style={{
                                fontFamily: "unbounded",
                                fontWeight: '300',
                                fontSize: "clamp(8px, 2vw, 12px)",
                                cursor: "pointer",
                            }}
                        >
                            TEAM REGISTRATION
                        </button>
                        <button
                            onClick={() => setCurrentView('music')}
                            className="w-full bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer"
                            style={{
                                fontFamily: "unbounded",
                                fontWeight: '300',
                                fontSize: "clamp(8px, 2vw, 12px)",
                                cursor: "pointer",
                            }}>
                        
                            MUSIC SUBMISSION
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // INDIVIDUAL REGISTRATION (existing code)
    if (currentView === 'individual') {
        if (isSubmitted && step === 4) {
            return (
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
                        {renderStepIndicator(4, 4)}
                        <div className="text-left flex-1 flex flex-col justify-center">
                            <h2 className="text-4xl font-light text-white mb-8 tracking-wide">See you in March!</h2>
                            <p className="text-white text-base leading-relaxed mb-6 font-light">
                                Thank you for registering for the 2026 Texas Diabolo Competition! Once we've received your payment, you will receive an email confirmation for your registration.
                            </p>
                            <p className="text-white text-base leading-relaxed font-light">
                                Please do not forget to submit your music for your routine to our website by February 14th, 2026!
                            </p>
                        </div>
                        <div className="flex justify-center mt-12">
                            <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl min-h-[40vh] flex flex-col">
                    {renderStepIndicator(step, 4)}
                    
                    {step === 1 && (
                        <div>
                            <h2 className="text-white mb-[4vh] tracking-wide"
                            style={{
                                fontFamily: "unbounded",
                                fontWeight: '300',
                                fontSize: "clamp(22px, 2vw, 24px)",
                            }}>PERSONAL<br/>INFORMATION</h2>
                            <div className="space-y-8">
                                <div className="grid grid-cols-2 gap-[2vh]">
                                    <input 
                                        className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest" 
                                        type="text" 
                                        placeholder="FIRST NAME" 
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <input 
                                        className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest" 
                                        type="text" 
                                        placeholder="LAST NAME" 
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest" 
                                    type="email" 
                                    placeholder="EMAIL" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                    <div>
                                        <input 
                                            className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                            type="tel"
                                            placeholder="PHONE NUMBER"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>

                                <div className="relative">    
                                        <select
                                                className={`w-full bg-transparent border-b border-gray-600 py-3 px-1 
                                                            text-xs tracking-widest uppercase appearance-none
                                                            focus:outline-none focus:border-white transition-colors
                                                            ${division === "" ? "text-gray-500" : "text-white"}`}
                                                value={division}
                                                onChange={(e) => setDivision(e.target.value)}
                                            >
                                                <option value="" disabled>Select Division <ChevronDown /></option>
                                                <option value="National Open">National Open</option>
                                                <option value="Regional Open">Regional Open</option>
                                                <option value="Regional Under 18">Regional Under 18</option>
                                            </select>
                                            <ChevronDown 
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                            />

                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-500 text-xs tracking-widest uppercase">DATE OF BIRTH</label>
                                        <input 
                                            className="w-full bg-transparent border-b border-gray-600 py-3 px-1 placeholder-gray-500 text-white focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                            type="date" 
                                            placeholder="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <label className="block text-gray-500 text-xs tracking-widest uppercase">T-Shirt Size</label>
                                            <select
                                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase appearance-none"
                                                value={tshirtSize}
                                                onChange={(e) => setTshirtSize(e.target.value)}
                                            >
                                                <option value="" disabled>Select Size</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="2XL">2XL</option>
                                                <option value="3XL">3XL</option>
                                            </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-8 md:w-[30%] mx-auto">
                                 <button
                                className="w-8 h-8 mx-auto bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                onClick={() => {
                                // const updated = [...teamMembers];
                                // updated[currentTeamMemberIndex] = currentMember;
                                // setTeamMembers(updated);
                                if (currentTeamMemberIndex > 0) {
                                    setCurrentTeamMemberIndex(currentTeamMemberIndex - 1);
                                    setCurrentMember(teamMembers[currentTeamMemberIndex - 1]);
                                    setResponseMessage('');
                                } else {
                                    setCurrentView('home');
                                }
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                className="w-8 h-8 mx-auto block bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer" 
                                onClick={handleIndividualNext}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </div>

                            {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex-1 flex flex-col">
                            <h2 className="text-3xl font-light text-white mb-6 tracking-wide">EMERGENCY CONTACT<br/>INFORMATION</h2>
                            <div className="space-y-[5vh] flex-1">
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="text" 
                                    placeholder="EMERGENCY CONTACT FULL NAME" 
                                    value={emergencyContactName}
                                    onChange={(e) => setEmergencyContactName(e.target.value)}
                                />
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="tel"
                                    placeholder="EMERGENCY CONTACT PHONE NUMBER"
                                    value={emergencyContactPhone}
                                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                                />
                                <input 
                                    className="w-1/2 bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="number" 
                                    placeholder="NUMBER OF GUESTS" 
                                    min="0"
                                    value={numberOfGuests}
                                    onChange={(e) => setNumberOfGuests(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex w-[30%] mx-auto">
                                 <button
                                className="w-8 h-8 mt-8 mx-auto bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                onClick={() => {
                                // const updated = [...teamMembers];
                                // updated[currentTeamMemberIndex] = currentMember;
                                // setTeamMembers(updated);
                                if (currentTeamMemberIndex > 0) {
                                    setCurrentTeamMemberIndex(currentTeamMemberIndex - 1);
                                    setCurrentMember(teamMembers[currentTeamMemberIndex - 1]);
                                    setResponseMessage('');
                                } else {
                                    setStep(step-1);
                                }
                                }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                className="w-8 h-8 mt-8 mx-auto block bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer" 
                                onClick={handleIndividualNext}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </div>
                            {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                        </div>
                    )}

                    {step === 3 && !isMinor(dateOfBirth) && (
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-light text-white mb-8 tracking-wide">WAIVERS<br/>& FORMS</h2>
                                <label className="flex items-start gap-4 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        className="w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
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
                                    className="w-full mt-8 mb-4 bg-transparent border-2 border-white text-white py-5 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                                    onClick={submitIndividualForm}>
                                    SUBMIT & PAY
                                </button>
                                {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                            </div>
                        </div>
                    )}

                    {step === 3 && isMinor(dateOfBirth) && (
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-light text-white mb-4 tracking-wide">WAIVERS<br/>& FORMS</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                                    For competitors under the age of 18, all competitors must have a parent/guardian sign and upload to the following{' '}
                                    <a href="#" className="text-blue-400 underline">chaperone form</a>. In accordance to University policy, the Texas Diabolo Association will not take custodial responsibility of minors while participating in TXDC. Custodial responsibility will remain with chaperones.
                                </p>
                                <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 mb-6 text-center cursor-pointer hover:border-gray-500 transition-colors">
                                    <input 
                                        type="file"
                                        id="chaperone-upload"
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setChaperoneFile(e.target.files?.[0] ?? null)}
                                    />
                                    <label htmlFor="chaperone-upload" className="cursor-pointer">
                                        <p className="text-white text-base font-light">Upload file here</p>
                                        {chaperoneFile && <p className="text-blue-400 text-sm mt-2">{chaperoneFile.name}</p>}
                                    </label>
                                </div>
                                <label className="flex items-start gap-4 cursor-pointer my-4">
                                    <input 
                                        type="checkbox"
                                        className="mt-1 w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
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
                                    className="w-full bg-transparent border-2 border-white text-white py-5 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                                    onClick={submitIndividualForm}>
                                    SUBMIT & PAY
                                </button>
                                {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // TEAM REGISTRATION
    if (currentView === 'team') {
        const memberNumber = currentTeamMemberIndex + 1;

        if (isSubmitted && teamStep === 4) {
            return (
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
                        {renderStepIndicator(4, 4)}
                        <div className="text-left flex-1 flex flex-col justify-center">
                            <h2 className="text-4xl font-light text-white mb-8 tracking-wide">See you in March!</h2>
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
                    </div>
                </div>
            );
        }

        // Step 1: Collect team member personal info
        if (teamStep === 1) {
            return (
                <div className="flex">
                    <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
                        {renderStepIndicator(1, 4)}
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-light text-white mb-4 tracking-wide">
                                    TEAM MEMBER {memberNumber}<br/>PERSONAL INFORMATION
                                </h2>
                                <div className="space-y-8 mt-12">
                                    <div className="grid grid-cols-2 gap-6">
                                        <input 
                                            className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                            type="text" 
                                            placeholder="FIRST NAME" 
                                            value={currentMember.firstName}
                                            onChange={(e) => setCurrentMember({...currentMember, firstName: e.target.value})}
                                        />
                                        <input 
                                            className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                            type="text" 
                                            placeholder="LAST NAME" 
                                            value={currentMember.lastName}
                                            onChange={(e) => setCurrentMember({...currentMember, lastName: e.target.value})}
                                        />
                                    </div>
                                    <input 
                                        className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                        type="email" 
                                        placeholder="EMAIL" 
                                        value={currentMember.email}
                                        onChange={(e) => setCurrentMember({...currentMember, email: e.target.value})}
                                    />
                                    <input 
                                        className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                        type="tel"
                                        placeholder="PHONE NUMBER"
                                        value={currentMember.phoneNumber}
                                        onChange={(e) => setCurrentMember({...currentMember, phoneNumber: e.target.value})}
                                    />
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-500 text-xs tracking-widest uppercase mb-2">DATE OF BIRTH</label>
                                            <input 
                                                className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white focus:outline-none focus:border-white transition-colors text-xs" 
                                                type="date" 
                                                value={currentMember.dateOfBirth}
                                                onChange={(e) => setCurrentMember({...currentMember, dateOfBirth: e.target.value})}
                                            />
                                        </div>
                                        <div className="relative mt-8">
                                            <select
                                                className="w-full bg-transparent border-b border-gray-600 py-[10px] px-1 text-white focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase appearance-none"
                                                value={currentMember.tshirtSize}
                                                onChange={(e) => setCurrentMember({...currentMember, tshirtSize: e.target.value})}
                                            >
                                                <option value="" disabled>TSHIRT SIZE</option>
                                                <option value="XS">XS</option>
                                                <option value="S">S</option>
                                                <option value="M">M</option>
                                                <option value="L">L</option>
                                                <option value="XL">XL</option>
                                                <option value="2XL">2XL</option>
                                                <option value="3XL">3XL</option>
                                            </select>
                                            <svg className="absolute right-2 bottom-3 pointer-events-none text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <div className="text-center mb-6">
                                    <div><button 
                                        className="text-blue-400 text-sm hover:underline cursor-pointer pt-2"
                                        onClick={addNewTeamMember}>
                                        + Add new team member
                                    </button>
                                    </div>
                                    <div><button 
                                        className="text-blue-400 text-sm hover:underline cursor-pointer pt-2"
                                        onClick={deleteTeamMember}>
                                        - Delete this team member
                                    </button></div>
                                </div>
                            <div className="flex items-center justify-center">
                                {/* Back button */}
                                <button
                                    className="w-8 h-8 md:w-8 md:h-8 bg-transparent border md:border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center disabled:opacity-50 cursor-pointer"
                                    onClick={() => {
                                    if (currentTeamMemberIndex > 0) {
                                        setCurrentTeamMemberIndex(currentTeamMemberIndex - 1);
                                        setCurrentMember(teamMembers[currentTeamMemberIndex - 1]);
                                        setResponseMessage('');
                                    } else {
                                        setCurrentView('home');
                                    }
                                    }}
                                >
                                    <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            
                            {/* Middle (Next / Proceed) */}
                            <div className="md:mx-8 flex">
                                {(() => {
                                const hasNext = currentTeamMemberIndex < teamSize - 1;
                                if (hasNext) {
                                    return (
                                    <button
                                        className="w-full mx-5 px-4 bg-transparent whitespace-nowrap justify-end border md:border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-xs md:text-sm cursor-pointer"
                                        onClick={() => {
                                        const updated = [...teamMembers];
                                        updated[currentTeamMemberIndex] = currentMember;
                                        setTeamMembers(updated);
                                        setCurrentTeamMemberIndex(currentTeamMemberIndex + 1);
                                        if (currentTeamMemberIndex + 1 < teamMembers.length) {
                                            setCurrentMember(teamMembers[currentTeamMemberIndex + 1]);
                                        } else {
                                            setCurrentMember({
                                            firstName: '',
                                            lastName: '',
                                            email: '',
                                            phoneNumber: '',
                                            dateOfBirth: '',
                                            tshirtSize: ''
                                            });
                                        }
                                        setResponseMessage('');
                                        }}
                                    >NEXT MEMBER →
                                    </button>
                                    );
                                }
                                if (teamSize > 1) {
                                    return (
                                    <button
                                    className="flex-1 bg-transparent border-2 border-white text-white px-4 py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer"
                                    onClick={proceedWithTeam}
                                    >
                                    PROCEED WITH {teamSize} TEAM MEMBERS
                                    </button>
                                );
                                }
                                // return (
                                //     <button
                                //     className="w-full bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm"
                                //     onClick={proceedWithTeam}
                                //     >
                                //     PROCEED WITH {teamSize - 1} TEAM MEMBERS
                                //     </button>
                                // );
                                })()}
                            </div>
                            </div>

                                {/* <div className="flex items-center justify-between">
                                    <button 
                                    className="w-16 h-16 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center disabled:opacity-50" 
                                    onClick={goBackMember}
                                    disabled={currentTeamMemberIndex === 0} // disable if first member
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                    <button  
                                        className="flex-1 mx-8 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm" 
                                        onClick={proceedWithTeam}>
                                        PROCEED WITH {teamSize} TEAM MEMBERS
                                    </button>
                                </div> */}
                                {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
// Step 2: Waivers with minor chaperone upload
if (teamStep === 2) {
    const minorCount = countTeamMinors();
    
    // If there are minors, show the full waiver page with file upload
    if (minorCount > 0) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
                    {renderStepIndicator(2, 4)}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl font-light text-white mb-8 tracking-wide">WAIVERS<br/>& FORMS</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                                For competitors under the age of 18, all competitors must have a parent/guardian sign and upload to the following{' '}
                                <a href="#" className="text-blue-400 underline">chaperone form</a>. In accordance to University policy, the Texas Diabolo Association will not take custodial responsibility of minors while participating in TXDC. Custodial responsibility will remain with chaperones.
                            </p>
                            
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 mb-8 text-center">
                                <input 
                                    type="file"
                                    id="team-chaperone-upload"
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    onChange={handleFileUpload}
                                />
                                <label htmlFor="team-chaperone-upload" className="cursor-pointer">
                                    <p className="text-white text-base font-light">Upload all files here</p>
                                    <p className="text-gray-400 text-xs mt-2">
                                        {minorCount} form(s) required | {chaperoneFiles.length} uploaded
                                    </p>
                                    {/* {chaperoneFiles.length > 0 && (
                                        <div className="mt-4 space-y-1">
                                            {chaperoneFiles.map((file, idx) => (
                                                <p key={idx} className="text-blue-400 text-xs">{file.name}</p>
                                            ))}
                                        </div>
                                    )} */}
                                    {chaperoneFiles.length > 0 && (
                                        <div className="mt-4 space-y-2 text-left">
                                        {chaperoneFiles.map((file, idx) => (
                                            <div
                                            key={idx}
                                            className="flex items-center justify-between text-blue-400 text-xs bg-gray-800 px-3 py-1 rounded-md"
                                            >
                                            <span className="truncate">{file.name}</span>
                                            <button
                                                type="button"
                                                className="text-red-400 hover:text-red-300 ml-3"
                                                onClick={() => handleRemoveFile(idx)}
                                            >
                                                ✕
                                            </button>
                                            </div>
                                        ))}
                                        </div>
                                    )}
                                </label>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer mb-4">
                                <input 
                                    type="checkbox"
                                    className="mt-1 w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                    checked={teamAgreedToTerms}
                                    onChange={(e) => setTeamAgreedToTerms(e.target.checked)}
                                />
                                <span className="text-white text-base leading-relaxed font-light">
                                    I consent and acknowledge that a parents/guardian along with my team and guests have read and agreed to these{' '}
                                    <a href="#" className="text-blue-400 underline">photo release</a> and{' '}
                                    <a href="#" className="text-blue-400 underline">injury and liability forms</a>.
                                </span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                className="w-8 h-8 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer" 
                                onClick={() => setTeamStep(1)}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button  
                            className="flex-1 ml-6 mx-4 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                                onClick={() => {
                                    if (!teamAgreedToTerms) {
                                        setResponseMessage('You must agree to the terms and waivers to proceed.');
                                    }
                                    else if (chaperoneFiles.length < minorCount) {
                                        setResponseMessage(`Please upload all required chaperone forms for your ${minorCount} minor team member(s).`);
                                    }
                                    else {
                                        setTeamStep(3);
                                        setResponseMessage('');
                                    }
                                }}>
                                CONTINUE
                            </button>
                            {/* <div className="w-16"></div> */}
                        </div>
                        {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                    </div>
                </div>
            </div>
        );
    }
    
    // If there are NO minors, show simplified waiver page (no file upload)
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
                {renderStepIndicator(2, 4)}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-light text-white mb-12 tracking-wide">WAIVERS<br/>& FORMS</h2>
                        <label className="flex items-start gap-4 cursor-pointer">
                            <input 
                                type="checkbox"
                                className="mt-1 w-6 h-6 bg-transparent border-2 border-gray-500 rounded checked:bg-white flex-shrink-0"
                                checked={teamAgreedToTerms}
                                onChange={(e) => setTeamAgreedToTerms(e.target.checked)}
                            />
                            <span className="text-white text-base leading-relaxed font-light">
                                I consent and acknowledge that my team and guests have read and agreed to these{' '}
                                <a href="#" className="text-blue-400 underline">photo release</a> and{' '}
                                <a href="#" className="text-blue-400 underline">injury and liability forms</a>.
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                            className="w-8 h-8 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer" 
                            onClick={() => setTeamStep(1)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button  
                            className="flex-1 ml-6 mx-4 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                            onClick={() => {
                                if (!teamAgreedToTerms) {
                                    setResponseMessage('You must agree to the terms and waivers to proceed.');
                                }
                                else {
                                    setTeamStep(3);
                                    setResponseMessage('');
                                }
                            }}>
                            CONTINUE
                        </button>
                        {/* <div className="w-16"></div> */}
                    </div>
                    {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                </div>
            </div>
        </div>
    );
}
        
        // Step 3: Emergency contact (once for whole team)
        if (teamStep === 3) {
            return (
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl min-h-[600px] flex flex-col">
                        {renderStepIndicator(3, 4)}
                        <div className="flex-1 flex flex-col">
                            <h2 className="text-3xl font-light text-white mb-12 tracking-wide">EMERGENCY CONTACT<br/>INFORMATION</h2>
                            <div className="space-y-12 flex-1">
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="text" 
                                    placeholder="EMERGENCY CONTACT FULL NAME" 
                                    value={teamEmergencyContactName}
                                    onChange={(e) => setTeamEmergencyContactName(e.target.value)}
                                />
                                <input 
                                    className="w-full bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="tel"
                                    placeholder="EMERGENCY CONTACT PHONE NUMBER"
                                    value={teamEmergencyContactPhone}
                                    onChange={(e) => setTeamEmergencyContactPhone(e.target.value)}
                                    />
                                <input 
                                    className="w-1/2 bg-transparent border-b border-gray-600 py-3 px-1 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-xs tracking-widest uppercase" 
                                    type="number" 
                                    placeholder="NUMBER OF GUESTS" 
                                    min="0"
                                    value={teamNumberOfGuests}
                                    onChange={(e) => setTeamNumberOfGuests(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    className="w-8 h-8 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer"
                                    // onClick={() => setTeamStep(countTeamMinors() > 0 ? 2 : 1)}>
                                    onClick={() => setTeamStep(2)}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button  
                            className="flex-1 mx-4 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                                    onClick={submitTeamForm}>
                                    SUBMIT & PAY
                                </button>
                                {/* <div className="w-16"></div> */}
                            </div>
                            {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                        </div>
                    </div>
                </div>
            );
        }
    }
    else if (currentView === 'music') {
        if (isSubmitted && step === 2) {
            return (
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
                        {renderStepIndicator(2, 2)}
                        <div className="text-left flex-1 flex flex-col justify-center">
                            <h2 className="text-4xl font-light text-white mb-8 tracking-wide">See you in March!</h2>
                            <p className="text-white text-base leading-relaxed mb-6 font-light">
                                Thank you for submitting your music for the 2026 Texas Diabolo Competition! We will review your music submission and send you a confirmation email once it has been approved.</p>
                            <p className="text-white text-base leading-relaxed font-light">
                                We can't wait to see you in March!
                            </p>
                        </div>
                        <div className="flex justify-center mt-12">
                            <div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="flex items-center justify-center">
                <div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl  flex flex-col">
                    {renderStepIndicator(step, 2)}
               <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-light text-white mb-8 tracking-wide">MUSIC FILE<br/>SUBMISSION</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
                                    The maximum performance time is 4 minutes for individual divisions and 5 minutes for teams. The minimum performance time is 2 minutes. Music chosen must be suitable for an audience of all ages. 
                                </p>
                                <div className="mb-8 border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-gray-500 transition-colors">
                                    <input 
                                        type="file"
                                        id="music-upload"
                                        className="hidden"
                                        accept="audio/*"
                                        onChange={(e) => setMusicFile(e.target.files?.[0] ?? null)}
                                    />
                                    <label htmlFor="music-upload" className="cursor-pointer">
                                        <p className="text-white text-base font-light">Upload file here</p>
                                        {musicFile && (
                                            <div className="mt-4 space-y-2 text-left">
                                            <div className="flex items-center justify-between text-blue-400 text-xs bg-gray-800 px-3 py-1 rounded-md">
                                                <span className="truncate">{musicFile.name}</span>
                                                <button
                                                type="button"
                                                className="text-red-400 hover:text-red-300 ml-3"
                                                onClick={() => setMusicFile(null)}
                                                >
                                                ✕
                                                </button>
                                            </div>
                                            </div>
  )}                                    </label>
                                     
                                </div>
 
                            </div>
                            <div>
                            <div className="flex items-center justify-between">
                            <button 
                                className="w-8 h-8 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center cursor-pointer" 
                                onClick={() => setCurrentView('home')}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                    className="flex-1 ml-6 mx-4 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-300 font-normal tracking-widest text-sm cursor-pointer" 
                                    onClick={submitMusicFile}>
                                    SUBMIT
                                </button>
                            </div>
                            {responseMessage && <p className="mt-4 text-red-400 text-center text-sm">{responseMessage}</p>}
                            {/* <div className="w-16"></div> */}
                        </div>
                        </div>
                        </div>
            </div>
            );
    }

    return null;
};

export default RegistrationSystem;
