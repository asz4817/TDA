const Competitors = () => {
	return (
		<div className="bg-black text-white py-20">
			<div className="max-w-7xl mx-auto px-6">

				{/* Page Title */}
				<h1
					style={{
						fontFamily: "roc-grotesk-compressed, sans-serif",
						fontWeight: 600,
						fontStyle: "normal",
						fontSize: "clamp(60px, 10vw, 80px)",
					}}
				>
					COMPETITORS
				</h1>

				{/* TOP ROW */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-15">

					{/* Under 18 Regional */}
					<div className="grid grid-cols-2">
						<h2
								className="text-8xl"
								style={{
									fontFamily:
										"roc-grotesk-compressed, sans-serif",
									fontWeight: 700,
									fontStyle: "normal",
									fontSize: "clamp(40px, 8vw, 50px)",
								}}
							>
							UNDER 18
							<br />
							REGIONAL
						</h2>

						<ul
							className="space-y-1 text-sm"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
							}}
						>
							<li>• Evelyn Chen</li>
							<li>• Jocelyn Yu</li>
							<li>• Christian Nguyen</li>
							<li>• Justin Lai</li>
							<li>• Calvin B</li>
							<li>• Eric Chen</li>
							<li>• Charles Tang</li>
							<li>• Elston Su</li>
						</ul>
					</div>

					{/* Regional Open */}
					<div className="grid grid-cols-2">
						<h2
								className="text-8xl"
								style={{
									fontFamily:
										"roc-grotesk-compressed, sans-serif",
									fontWeight: 700,
									fontStyle: "normal",
									fontSize: "clamp(40px, 8vw, 50px)",
								}}
							>
							REGIONAL OPEN
						</h2>

						<ul
							className="space-y-1 text-sm"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
							}}
						>
							<li>• Luke Chandler</li>
							<li>• Kate Sur</li>
							<li>• Jeremy Sheng</li>
							<li>• Maximus Chen</li>
							<li>• Samuel Deng</li>
							<li>• Sam Yarbrough</li>
							<li>• Evan Chang</li>
							<li>• Kevin Yu</li>
							<li>• Amber Jackson</li>
							<li>• Jackie Shim</li>
							<li>• Kody Keo</li>
							<li>• Grace Meng</li>
							<li>• Amanda Zhang</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-white/40 my-6"></div>

				{/* BOTTOM ROW */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-15">

					{/* Individual Open Stage */}
					<div className="grid grid-cols-2">
						<h2
								className="text-8xl"
								style={{
									fontFamily:
										"roc-grotesk-compressed, sans-serif",
									fontWeight: 700,
									fontStyle: "normal",
									fontSize: "clamp(40px, 8vw, 50px)",
								}}
							>
							INDIVIDUAL
							<br />
							OPEN STAGE
						</h2>

						<ul
							className="space-y-1 text-sm"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
							}}
						>
							<li>• Kevin Xiang</li>
							<li>• Kevin Lam</li>
							<li>• Argenis Ramlogan</li>
							<li>• Jason Pao</li>
							<li>• Chris Wang</li>
							<li>• Jackson Shouba</li>
							<li>• Ryan Lin</li>
							<li>• Ryan Leung</li>
							<li>• Justin Du</li>
							<li>• Nicolas Jan</li>
							<li>• Alexander Tai</li>
							<li>• Truman Wang</li>
						</ul>
					</div>

					{/* Team Open Stage */}
					<div className="grid grid-cols-2">
						<h2
								className="text-8xl"
								style={{
									fontFamily:
										"roc-grotesk-compressed, sans-serif",
									fontWeight: 700,
									fontStyle: "normal",
									fontSize: "clamp(40px, 8vw, 50px)",
								}}
							>
							TEAM
							<br />
							OPEN STAGE
						</h2>

						<ul
							className="space-y-1 text-sm"
							style={{
								fontFamily: "unbounded, sans-serif",
								fontWeight: 300,
							}}
						>
							<li>• GT_Dragonflyers</li>
							<li>• GBCCA Diabolo</li>
							<li>• Strawberry Matcha</li>
							<li>• Who Won TXDC Last Year?</li>
							<li>• Rice Spice</li>
							<li>• Golden Girls</li>
							<li>• 2 Brain Cells</li>
							<li>• Apex Nova</li>
						</ul>
					</div>
				</div>

				{/* Bottom Divider */}
				<div className="border-t border-white/40 mt-6"></div>

			</div>
		</div>
	);
};

export default Competitors;