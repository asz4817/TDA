import { useState } from "react";


const MusicSubmissionSystem = () => {
	// Navigation state
	const [currentView, setCurrentView] = useState("music"); // 'home', 'individual', 'team'

	// Individual registration states (from previous code)
	const [step, setStep] = useState(1);
	const [musicFile, setMusicFile] = useState<File | null>(null);
	const [responseMessage, setResponseMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	


	const submitMusicFile = async () => {
		if (!musicFile) {
			setResponseMessage("Please upload a music file");
			return;
		}

		// Create FormData object
		const formData = new FormData();
		formData.append("file", musicFile); // This matches request.files["file"] in your backend

		try {
			const res = await fetch("/upload_audio", {
				// Note: underscore, not hyphen
				method: "POST",
				body: formData, // Send as FormData, not JSON
			});

			const text = await res.text();
			let result = JSON.parse(text);

			if (res.ok) {
				setIsSubmitted(true);
				setStep(2);
				setResponseMessage("");
			} else {
				setResponseMessage(
					result.error || "Error submitting music file"
				);
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				setResponseMessage(`Error: ${err.message}`);
			} else {
				setResponseMessage("An unknown error occurred.");
			}
		}
	};

	

	
	const renderStepIndicator = (currentStep: number, totalSteps: number) => {
		return (
			<div className="flex justify-center gap-2 mb-8">
				{Array.from({ length: totalSteps }, (_, i) => (
					<div
						key={i}
						className={`w-2 h-2 rounded-full ${
							i + 1 === currentStep ? "bg-white" : "bg-gray-600"
						}`}
					/>
				))}
			</div>
		);
	};

	// HOME PAGE
	if (currentView === "home") {
		return (
			<div className="flex items-center justify-center">
				<div className="w-full max-w-md backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl bg-black/50">
					<h1
						className="mb-10 tracking-wide text-center"
						style={{
							fontFamily: "unbounded",
							fontWeight: "400",
							fontSize:
								"clamp(1.25rem, 0.5rem + 1.3333vw, 1.5rem)",
						}}
					>
						SUBMIT MUSIC NOW
					</h1>
					<div className="mt-12">
						
						<button
							onClick={() => setCurrentView("music")}
							className="w-full bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-400 font-normal tracking-widest text-sm cursor-pointer"
							style={{
								fontFamily: "unbounded",
								fontWeight: "300",
								fontSize:
									"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
								cursor: "pointer",
							}}
						>
							MUSIC SUBMISSION
						</button>
					</div>
				</div>
			</div>
		);
	}
     if (currentView === "music") {
		if (isSubmitted && step === 2) {
			return (
				<div className="flex items-center justify-center">
					<div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-12 shadow-2xl min-h-[600px] flex flex-col justify-between">
						{renderStepIndicator(2, 2)}
						<div className="text-left flex-1 flex flex-col justify-center">
							<h2
								className="text-white mb-8 tracking-wide"
								style={{
									fontFamily: "unbounded",
									fontWeight: "400",
									fontSize:
										"clamp(1.25rem, 0.5rem + 1.3333vw, 1.5rem)",
								}}
							>
								See you in March!
							</h2>
							<p
								className="text-white text-base leading-relaxed mb-6 font-light"
								style={{
									fontFamily: "unbounded",
									fontWeight: "300",
									fontSize:
										"clamp(0.625rem, -0.125rem + 1.3333vw, 0.875rem)",
								}}
							>
								Thank you for submitting your music for the 2026
								Texas Diabolo Competition! We will review your
								music submission and send you a confirmation
								email once it has been approved.
							</p>
							<p
								className="text-white text-base leading-relaxed font-light"
								style={{
									fontFamily: "unbounded",
									fontWeight: "300",
									fontSize:
										"clamp(0.625rem, -0.125rem + 1.3333vw, 0.875rem)",
								}}
							>
								We can't wait to see you in March!
							</p>
						</div>
						<div className="flex justify-center mt-12">
							<div className="w-32 h-32 rounded-full border-4 border-white flex items-center justify-center">
								<svg
									className="w-16 h-16 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="flex items-center justify-center">
				<div className="w-full max-w-lg backdrop-blur-xs border border-gray-500 rounded-3xl p-8 shadow-2xl  flex flex-col bg-black/50">
					{renderStepIndicator(step, 2)}
					<div className="flex-1 flex flex-col justify-between">
						<div>
							<h2
								className="text-white mb-[4vh] tracking-wide"
								style={{
									fontFamily: "unbounded",
									fontWeight: "400",
									fontSize:
										"clamp(1.25rem, 0.5rem + 1.3333vw, 1.5rem)",
								}}
							>
								MUSIC FILE
								<br />
								SUBMISSION
							</h2>
							<p
								className="text-gray-400 text-sm leading-relaxed mb-2 font-bold"
								style={{
									fontFamily: "unbounded",
									fontWeight: "300",
									fontSize:
										"clamp(0.5625rem, 0rem + 1vw, 0.75rem)",
								}}
							>
								Please name your file
								"lastName_firstName_division."
							</p>
							<p
								className="text-gray-400 text-sm leading-relaxed mb-8 font-light"
								style={{
									fontFamily: "unbounded",
									fontWeight: "300",
									fontSize:
										"clamp(0.5625rem, 0rem + 1vw, 0.75rem)",
								}}
							>
								The maximum performance time is 4 minutes for
								individual divisions and 5 minutes for teams.
								The minimum performance time is 2 minutes. Music
								chosen must be suitable for an audience of all
								ages.
							</p>
							<div className="mb-8 border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-gray-500 transition-colors">
								<input
									type="file"
									id="music-upload"
									className="hidden"
									accept="audio/*"
									onChange={(e) =>
										setMusicFile(
											e.target.files?.[0] ?? null
										)
									}
								/>
								<label
									htmlFor="music-upload"
									className="cursor-pointer"
								>
									<p
										className="text-white text-base font-light"
										style={{
											fontFamily: "unbounded",
											fontWeight: "300",
											fontSize:
												"clamp(0.625rem, -0.125rem + 1.3333vw, 0.875rem)",
										}}
									>
										Upload file here
									</p>
									{musicFile && (
										<div className="mt-4 space-y-2 text-left">
											<div className="flex items-center justify-between text-blue-400 text-xs bg-gray-800 px-3 py-1 rounded-md">
												<span className="truncate">
													{musicFile.name}
												</span>
												<button
													type="button"
													className="text-red-400 hover:text-red-300 ml-3"
													onClick={() =>
														setMusicFile(null)
													}
												>
													✕
												</button>
											</div>
										</div>
									)}{" "}
								</label>
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<button
									className="w-8 h-8 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-400 flex items-center justify-center cursor-pointer"
									onClick={() => setCurrentView("home")}
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 19l-7-7 7-7"
										/>
									</svg>
								</button>
								<button
									className="flex-1 ml-6 mx-4 bg-transparent border-2 border-white text-white py-4 hover:bg-white hover:text-black transition-all duration-400 font-normal tracking-widest text-sm cursor-pointer"
									onClick={submitMusicFile}
									style={{
										fontFamily: "unbounded",
										fontWeight: "300",
										fontSize:
											"clamp(0.5625rem, 0rem + 1vw, 0.75rem)",
									}}
								>
									SUBMIT
								</button>
							</div>
							{responseMessage && (
								<p className="mt-4 text-red-400 text-center text-sm">
									{responseMessage}
								</p>
							)}
							{/* <div className="w-16"></div> */}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return null;
};

export default MusicSubmissionSystem;
