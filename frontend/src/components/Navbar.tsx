import { NavLink } from "react-router-dom";
import TDALogo from "../assets/Tda_Logo.svg";
import Line from "../assets/Line 1.svg";
import profile from "../assets/profile.svg";
import "../App.css";
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import Menu from "../assets/Menu.json";
import { useLocation } from "react-router-dom";

export default function Navbar() {
	const [scrolling, setScrolling] = useState(true);
	const [scrollTop, setScrollTop] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	const menu = useRef<HTMLDivElement>(null);

	const location = useLocation();

	useEffect(() => {
		if (isOpen) {
			setIsOpen(false);
			lottieRef.current?.playSegments([70, 140], true);
		}
	}, [location]);

	useEffect(() => {
		function onScroll() {
			let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
			if (currentPosition > scrollTop) {
				// downscroll code
				setScrolling(false);
			} else {
				// upscroll code
				setScrolling(true);
			}
			setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
		}

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [scrollTop]);

	return (
		<nav
			className="w-full fixed top-0 left-0 bg-transparent text-white z-50"
			style={{
				opacity: scrolling ? 1 : 0,
				transition: "opacity 0.5s ease-out",
			}}
		>
			<div className="relative mx-auto w-[93%] md:w-[75%] md:mt-20 mt-10 flex justify-between">
				{/* Left: Logo */}
				<div className="flex items-center gap-[10%] w-[75%]">
					<NavLink to="/" className="items-center">
						<img
							className="md:w-[8vw] w-[25vw]"
							src={TDALogo}
							alt="TDA Logo"
						/>
					</NavLink>
					{/*           
          <NavLink
            to="/our-story"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "text-gray-300" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "11px"
            }}
          >
            OUR STORY
          </NavLink> */}

					{/* <NavLink
            to="/txdc2026"
            className={({ isActive }) =>
              `transition hover:text-gray-300 ${
                isActive ? "font-semibold" : "text-white"
              }`
            }
            style={{fontFamily: "unbounded",
              fontSize: "clamp(4px, 1vw, 12px)",             
            }}
          >
            TXDC 2026
          </NavLink> */}

					<NavLink
						to="/contactUs"
						className={({ isActive }) =>
							`transition hover:text-gray-400 duration-400 ${
								isActive ? "font-semibold" : "text-white"
							} hidden md:block`
						}
						style={{
							fontFamily: "unbounded",
							fontSize:
								"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
						}}
					>
						CONTACT US
					</NavLink>
				</div>

				{/* Right: Button + User icon */}
				<div className="flex items-center gap-2 md:gap-4">
					<a
						href="https://linktr.ee/texasdiabolo"
						target="_blank"
						className="border border-white rounded-full hover:bg-white hover:text-black transition-all duration-400 whitespace-nowrap pop-button px-[20px] py-[5px] md:px-[30px] md:py-[10px]"
						style={{
							fontFamily: "unbounded",
							fontSize:
								"clamp(0.5rem, -0.25rem + 1.3333vw, 0.75rem)",
							// padding: "clamp(4px, 0.8vw, 10px) clamp(8px, 2.5vw, 34px)",
							minWidth: "max-content",
						}}
					>
						CONNECT WITH US
					</a>

					<img
						src={Line}
						alt="Line"
						className="h-[50%] md:h-[3vw] mr-[-4px] md:mr-[0]"
					/>
					<img
						className="hidden md:block"
						src={profile}
						alt="profile"
						width={"11%"}
					/>
					<Lottie
						className="cursor-pointer w-[30px] md:hidden"
						animationData={Menu}
						// loop={true}
						autoplay={false}
						lottieRef={lottieRef}
						onLoopComplete={() =>
							lottieRef.current?.goToAndStop(70, true)
						}
						onClick={() => {
							lottieRef.current?.setSpeed(1.3);
							if (isOpen) {
								lottieRef.current?.playSegments(
									[70, 140],
									true
								);
							} else {
								lottieRef.current?.playSegments([0, 70], true);
							}
							setIsOpen(!isOpen);
						}}
					/>
					<div
						ref={menu}
						className="absolute top-[100%] right-[2%]"
						style={{
							visibility: isOpen ? "visible" : "hidden",
							opacity: isOpen ? 1 : 0,
							transform: isOpen
								? "translateY(50%)"
								: "translateY(20%)",
							transition:
								"visibility 0.5s ease-out, opacity 0.5s ease-in, transform 0.5s ease-in-out",
							transitionDelay: ".55s",
						}}
					>
						<ul className="text-right space-y-4">
							<li>
								<NavLink
									to="/contactUs"
									className={({ isActive }) =>
										`transition hover:text-gray-400 duration-400 ${
											isActive
												? "font-semibold"
												: "text-white"
										} `
									}
									style={{
										fontFamily: "unbounded",
										fontSize: "14px",
									}}
								>
									CONTACT US
								</NavLink>
							</li>
							<li>
								{" "}
								<NavLink
									to="/txdc2026"
									className={({ isActive }) =>
										`transition hover:text-gray-300 ${
											isActive
												? "font-semibold"
												: "text-white"
										}`
									}
									style={{
										fontFamily: "unbounded",
										fontSize: "14px",
									}}
								>
									TXDC 2026
								</NavLink>
							</li>
						</ul>
					</div>
					{/* <User size={20} className="cursor-pointer hover:text-gray-300" /> */}
				</div>
			</div>
		</nav>
	);
}
