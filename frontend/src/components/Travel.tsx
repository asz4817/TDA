import TravelImage from "../assets/Austin.png"; // replace with your actual image file

const Travel = () => {
	return (
		<div className="bg-black text-white py-20">
			<div className="max-w-7xl mx-auto px-6">

				{/* Top Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

					{/* LEFT COLUMN */}
					<div>

						{/* Title Row */}
						<div className="flex items-center gap-6">
							<h1
					style={{
						fontFamily: "roc-grotesk-compressed, sans-serif",
						fontWeight: 600,
						fontStyle: "normal",
						fontSize: "clamp(60px, 10vw, 80px)",
					}}
				>
								TRAVEL & TXDC 2026
							</h1>

							
						</div>

						{/* Travel Info */}
						<div
							className="space-y-6 mb-6"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
								lineHeight: "1.4",
							}}
						>
							<p>
								Where:{" "}
								<a className="underline" target="_blank" href="https://maps.app.goo.gl/TDwbxQBvHzcFVrfv8">
									Greg Plaza 
								</a> and &nbsp;

                                <a className="underline" target="_blank" href="https://maps.app.goo.gl/zh3GhkdNwxnGAZGY7">WCP Ballroom</a>
							</p>

							<p>
								Transportation: The cheapest way to get to campus
								from the airport is by bus. CapMetro route 20
								runs directly from the airport to downtown and
								UT campus, more info{" "}
								<a className="underline cursor-pointer" target="_blank" href="https://global.utexas.edu/isss/life-at-ut/austin/austin-airport-transportation">
									here
								</a>.
							</p>
						</div>

						{/* Packing List */}
						<h1
					style={{
						fontFamily: "roc-grotesk-compressed, sans-serif",
						fontWeight: 600,
						fontStyle: "normal",
						fontSize: "clamp(60px, 10vw, 80px)",
					}}
				>
							PACKING LIST
						</h1>

						<ul
							className="space-y-2"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
								lineHeight: "1.4",
							}}
						>
							<li>
								• Equipment: Yoyos, lights (if you’re coming to
								our Night Flow Session on Day 0), sticks, etc.
							</li>
							<li>
								• Light jacket or hoodie (Austin can sometimes be
								chilly at night or the buildings have AC blasting)
							</li>
							<li>
								• Personal belongings: Clothes, Hygiene
								Essentials, etc.
							</li>
							<li>• Sunscreen</li>
							<li>• Water bottle</li>
						</ul>

					</div>

					{/* RIGHT COLUMN IMAGE */}
					<div className="w-full h-full">
						<img
							src={TravelImage}
							alt="Travel"
							className="w-full h-full object-cover"
						/>
					</div>

				</div>

			</div>
		</div>
	);
};

export default Travel;