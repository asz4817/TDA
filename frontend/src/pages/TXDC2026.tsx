import Divider from "../components/Divider";
import "../App.css";
import { NavLink } from "react-router-dom";
import RegistrationInfo from "../components/RegistrationInfo";
import EventSchedule from "../components/EventSchedule";
import HomeBg from "../assets/testtxdcbanner3.png";
import arrow from "../assets/arrow-up-right.svg";
import "../App.css";
import { useEffect, useState } from "react";
import Competitors from "../components/Competitors";

const TXDC = () => {
    const [, setScrolling] = useState(true);
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
					className="relative w-full h-screen bg-cover bg-center mb-10"
					style={{
						backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.13) 50%, rgba(0, 0, 0, 0.5) 100%), url(${HomeBg})`,
						backgroundColor: "transparent",
						backgroundAttachment: "fixed",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
				>
					{/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
					<div className="pt-45 md: pb-30">
						<div className="grid mx-auto pr-10 absolute left-[11%] bottom-[12%]">
							<div>
								<h1
									style={{
										fontFamily: `roc-grotesk-compressed, sans-serif`,
										fontWeight: 700,
										fontStyle: "normal",
										fontSize: "clamp(100px, 20vw, 168px)",
										marginBottom: "-12%",
									}}
								>
									TXDC 2026
								</h1>
								<p
									style={{
										fontFamily: "unbounded",
										fontSize: "16px",
										marginBottom: "6%",
									}}
								>
									MARCH 6-8<sup>TH</sup>
								</p>
								<div className="flex gap-4 items-center">
									<NavLink
										to="/txdc2026/register"
										className="px-5 py-2 border flex items-center gap-1 border-white rounded-full hover:bg-white hover:text-black transition-all duration-400 boxx"
										style={{
											fontFamily: "unbounded",
											fontSize: "11px",
										}}
									>
										SUBMIT MUSIC HERE{" "}
										<img
											src={arrow}
											className="w-5 h-5"
											id="arrow"
										></img>
									</NavLink>
									<h1
										style={{
											fontFamily: "unbounded",
											fontSize: "11px",
										}}
									>
										Registration has closed.
									</h1>
								</div>
							</div>
						</div>
					</div>
				</section>

				<Divider />
				<div className="mx-auto w-[75vw]">
					<RegistrationInfo />
					<EventSchedule />
					<Competitors/> 
				</div>
			</div>
			<div className="block md:hidden">
				<section
					className="relative w-full h-screen bg-cover bg-center mb-10"
					style={
						{
							// backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.13) 50%, rgba(0, 0, 0, 0.5) 100%), url(${HomeBg})`,
							//         backgroundColor: "transparent",
							// backgroundAttachment: "fixed",
							// backgroundPosition: "center",
							// backgroundRepeat: "no-repeat",
							// backgroundSize: "cover",
						}
					}
				>
					<div
						className="absolute fixed z-[0] w-screen h-screen bg-black"
						style={{
							backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.3) 1%, rgba(0, 0, 0, 0.5) 100%), url(${HomeBg})`,
							backgroundColor: "transparent",
							backgroundPosition: "65% center",
							backgroundSize: "cover",
							opacity: scrollTop >= scrollMax * 0.8 ? 0 : 1,
						}}
					>
						{/* <div className="bg-blue-500 h-screen w-screen absolute">
                        </div> */}
						{/* <img src={HomeBg} style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: scrollTop >= scrollMax * 0.8 ? 0 : 1,
                        }} /> */}
						{/* <div
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "relative",
                            zIndex: 1000,
                            // backgroundImage: `linear-gradient(180deg,rgba(0, 0, 0, 0.13) 50%, rgba(0, 0, 0, 0.5) 100%)`,
                            backgroundColor: "blue",
                        }}
                        ></div> */}
					</div>
					{/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
					<div className="pt-45 md: pb-30">
						<div className="grid mx-auto pr-10 absolute left-[11%] bottom-[20%]">
							<div>
								<h1
									style={{
										fontFamily: `roc-grotesk-compressed, sans-serif`,
										fontWeight: 700,
										fontStyle: "normal",
										fontSize: "clamp(100px, 20vw, 168px)",
										marginBottom: "-12%",
									}}
								>
									TXDC 2026
								</h1>
								<p
									style={{
										fontFamily: "unbounded",
										fontSize: "16px",
										marginBottom: "6%",
									}}
								>
									MARCH 7-8<sup>TH</sup>
								</p>
								<div className="flex gap-4 items-center">
									<NavLink
										to="/txdc2026/register"
										className="px-5 py-2 border flex items-center gap-1 border-white rounded-full hover:bg-white hover:text-black transition-all duration-400 boxx"
										style={{
											fontFamily: "unbounded",
											fontSize: "11px",
										}}
									>
										SUBMIT MUSIC HERE{" "}
										<img
											src={arrow}
											className="w-5 h-5"
											id="arrow"
										></img>
									</NavLink>
									<h1
										style={{
											fontFamily: "unbounded",
											fontSize: "8px",
										}}
									>
										Registration has closed.
									</h1>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="z-7 relative bg-black">
					<Divider />
					<div className="mx-auto w-[75vw]">
						<RegistrationInfo />
						<EventSchedule />
						<Competitors/> 
					</div>
				</div>
			</div>
		</div>
	);
};

export default TXDC;
