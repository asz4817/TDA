import ContactBg from "../assets/testtxdcbanner.png";
import RegistrationSystem from "../components/RegistrationSystem";
import EmailIcon from "../assets/mail.svg";
import { useEffect, useState } from "react";

const Registration = () => {
	const [scrolling, setScrolling] = useState(true);
	const [scrollTop, setScrollTop] = useState(0);

	const [scrollMax, setScrollMax] = useState(1000);

	useEffect(() => {
		function onResize() {
			setScrollMax(document.body.scrollHeight - window.innerHeight);
		}
		window.addEventListener("resize", onResize);
		onResize();
		return () => {
			window.removeEventListener("resize", onResize);
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
			<div className="hidden md:block">
				<section
					className="relative w-full bg-cover bg-center pb-10 pt-30"
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
						<div className="w-[80%] grid md:grid-cols-2 mx-auto">
							<div className="space-y-4 z-50 md:py-[10vh] pb-[2vh]">
								<h1
									className="leading-1"
									style={{
										fontFamily:
											"roc-grotesk-compressed, sans-serif",
										fontWeight: 700,
										fontStyle: "normal",
										lineHeight: "0.9",
										fontSize: "clamp(50px, 8vw, 108px)",
										marginBottom: "5%",
									}}
								>
									TXDC 2026 REGISTRATION
								</h1>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize:
											"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
										fontWeight: "300",
									}}
								>
									When: March 7-8<sup>TH</sup>, 2026
								</p>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize:
											"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
										fontWeight: "300",
									}}
								>
									Divisions:
									<br />• Individual Open Stage Division
									<br />• Individual Regional Open Division
									<br />• Individual Regional Junior Division
									<br />• Team Open Stage Division
								</p>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize:
											"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
										fontWeight: "300",
									}}
								>
									For any inquiries or assistance please
									contact us through our email.
								</p>

								<a
									href="mailto:texasdiabolo@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={EmailIcon}
										alt="Email"
										className="w-5 h-5 hover:opacity-75"
									/>
								</a>
							</div>

							<div className="my-[8vh]">
								<RegistrationSystem />
							</div>
						</div>
					</div>
				</section>
			</div>
			<div className="block md:hidden">
				<section
					className="relative w-full bg-cover bg-center pb-10"
					// style={{ backgroundImage: `url(${ContactBg})`,backgroundColor: "transparent",
					//   backgroundAttachment: "fixed",
					//   backgroundPosition: "center",
					//   backgroundRepeat: "no-repeat",
					//   backgroundSize: "cover",}}
				>
					<div
						className="absolute fixed z-[0] w-screen h-screen"
						style={{
							backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.3) 1%, rgba(0, 0, 0, 0.5) 100%), url(${ContactBg})`,
							backgroundColor: "transparent",
							backgroundPosition: "5% center",
							backgroundSize: "cover",
							// opacity: scrollTop >= scrollMax * 0.8 ? 0 : 1,
						}}
					></div>

					{/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

					<div className="pt-30">
						<div className="w-[80%] grid md:grid-cols-2 mx-auto">
							<div className="space-y-4 z-50 md:py-[10vh] pb-[2vh]">
								<h1
									className="leading-1"
									style={{
										fontFamily:
											"roc-grotesk-compressed, sans-serif",
										fontWeight: 700,
										fontStyle: "normal",
										lineHeight: "0.9",
										fontSize: "clamp(50px, 8vw, 108px)",
										marginBottom: "5%",
									}}
								>
									TXDC 2026 REGISTRATION
								</h1>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize:
											"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
										fontWeight: "300",
									}}
								>
									When: March 7-8<sup>TH</sup>, 2026
								</p>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize:
											"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
										fontWeight: "300",
									}}
								>
									Divisions:
									<br />• Individual Open Stage Division
									<br />• Individual Regional Open Division
									<br />• Individual Regional Junior Division
									<br />• Team Open Stage Division
								</p>
								<p
									className=""
									style={{
										fontFamily: "unbounded",
										fontSize: "clamp(8px, 2vw, 12px)",
										fontWeight: "300",
									}}
								>
									For any inquiries or assistance please
									contact us through our email.
								</p>

								<a
									href="mailto:texasdiabolo@gmail.com"
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={EmailIcon}
										alt="Email"
										className="w-5 h-5 hover:opacity-75"
									/>
								</a>
							</div>

							<div className="my-[8vh]">
								<RegistrationSystem />
							</div>
						</div>
					</div>
				</section>
				<div
					className="bg-black h-[50%] w-screen absolute z-50"
					style={{
						opacity: scrollTop >= scrollMax * 0.8 ? 1 : 0,
					}}
				></div>
			</div>
		</div>
	);
};

export default Registration;
