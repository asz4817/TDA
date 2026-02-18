import tower from "../assets/tower.jpg";

const EventSchedule = () => {
	return (
		<div className="bg-black text-white py-20">
			<div className="w-full">
				<div className="md:grid grid-cols-9 gap-12">
					{/* Left Column - Schedule */}
					<div className="md:col-span-5">
						{/* Title */}
						<h1
							style={{
								fontFamily:
									"roc-grotesk-compressed, sans-serif",
								fontWeight: 600,
								fontStyle: "normal",
								fontSize: "clamp(60px, 10vw, 80px)",
								lineHeight: "1",
								marginBottom: "12px",
							}}
						>
							EVENT SCHEDULE
						</h1>

						{/* Introduction Text */}
						<p
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: "300",
								lineHeight: "1.2",
								fontSize: "clamp(12px, 2vw, 16px)",
								marginBottom: "12px",
							}}
						>
							This year's competition will be held at the
							University of Texas at Austin campus.
						</p>
						{/* Day 0 */}
						<div className="pt-8 mb-5">
							<div className="flex flex-cols-2 gap-12">
								<div>
									<h2
										className="whitespace-nowrap"
										style={{
											fontFamily:
												"roc-grotesk-compressed, sans-serif",
											fontWeight: 700,
											fontStyle: "normal",
											fontSize: "50px",
											lineHeight: "0.95",
										}}
									>
										DAY 0
									</h2>
									<p
										style={{
											fontFamily:
												"roc-grotesk, sans-serif",
											fontWeight: 200,
											fontSize: "16px",
											textAlign: "center",
										}}
									>
										FRI
									</p>
								</div>
								<div
									style={{
										fontFamily: "unbounded, sans-serif",
										fontWeight: "300",
										fontSize: "12px",
										lineHeight: "1.2",
									}}
								>
									<p className="text-gray-400 mb-1 mt-1">
										Location: Gregory Plaza
									</p>
									<p className="text-gray-400 mb-3">
										Address: 2101 Speedway, Austin, TX 78712
									</p>
									<p> 1:00 - 4:00PM: Workshops</p>
									<p>   • 1D, 2D, 3D, Team Tricks, & K-Pop Dance!</p>
									<p>4:00 - 6:00 PM: Minigames</p>
									<p>6:00 - 8:00 PM: Night Flow Session </p>
									<p>  • Bring your own lights or borrow some that we’ll have!</p>
									<b>8:00 PM: TDA Team Showcase</b>
								</div>
							</div>
						</div>

						{/* Day 1 */}
						<div className="border-t border-white pt-5 mb-5">
							<div className="flex flex-cols-2 gap-12">
								<div>
									<h2
										className="whitespace-nowrap"
										style={{
											fontFamily:
												"roc-grotesk-compressed, sans-serif",
											fontWeight: 700,
											fontStyle: "normal",
											fontSize: "50px",
											lineHeight: "0.95",
										}}
									>
										DAY 1
									</h2>
									<p
										style={{
											fontFamily:
												"roc-grotesk, sans-serif",
											fontWeight: 200,
											fontSize: "16px",
											textAlign: "center",
										}}
									>
										SAT
									</p>
								</div>
								<div
									style={{
										fontFamily: "unbounded, sans-serif",
										fontWeight: "300",
										fontSize: "12px",
										lineHeight: "1.2",
									}}
								>
									<p className="text-gray-400 mb-1">
										Location: 12:00 - 6:00 Greg Plaza | 6:00 - 9:00 W.C.P. Ballroom
									</p>
									<p className="text-gray-400 mb-3">
										Address: 2101 Speedway, Austin, TX 78712 [Greg Plaza], 2201 Speedway, Austin, TX 78712 [W.C.P. Ballroom]
									</p>
									<p>12:00 - 2:00 PM: Check In & Mini-Games</p>
									<p>2:00 - 4:00 PM: Battle</p>
									<p>4:00 - 6:00 PM: Break and Move to W.C.P Ballroom</p>
									<p>6:00 - 9:00 PM: Competition  </p>
									<p>• Under 18 Regional Division</p>
									<p>• Team Open Stage Division</p>
								</div>
							</div>
						</div>

						{/* Day 2 */}
						<div className="border-t border-white pt-5 mb-5">
							<div className="flex flex-cols-2 gap-12">
								<div>
									<h2
										className="whitespace-nowrap"
										style={{
											fontFamily:
												"roc-grotesk-compressed, sans-serif",
											fontWeight: 700,
											fontStyle: "normal",
											fontSize: "50px",
											lineHeight: "0.95",
										}}
									>
										DAY 2
									</h2>
									<p
										style={{
											fontFamily:
												"roc-grotesk, sans-serif",
											fontWeight: 200,
											fontSize: "16px",
											textAlign: "center",
										}}
									>
										SUN
									</p>
								</div>
								<div
									style={{
										fontFamily: "unbounded, sans-serif",
										fontWeight: "300",
										fontSize: "12px",
										lineHeight: "1.2",
									}}
								>
									<p className="text-gray-400 mb-1">
										Location: WCP Ballroom
									</p>
									<p className="text-gray-400 mb-3">
										Address: 2201 Speedway, Austin, TX 78712
									</p>
									<p>12:30 - 4:30 PM: Competition</p>
									<p> • Regional Open Division</p>
									<p> • National Open Stage Division</p>
									<p>4:30 - 5:00 PM: Award Ceremony</p>
									<p>6:00 - 7:00 PM: Judge Showcase  </p>
								</div>
							</div>
						</div>

						<div className="border-t border-white"></div>
					</div>

					{/* Right Column - Image */}
					<div className="my-auto col-span-4 pt-10 md:pt-0">
						<div className="h-[80vh] overflow-hidden">
							<img
								src={tower}
								alt="University of Texas at Austin Tower"
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventSchedule;
