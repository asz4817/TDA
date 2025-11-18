import divider from "../assets/Divider.svg";

const Divider = () => {
	return (
		<div
			className="w-full"
			style={{
				backgroundImage: `url(${divider})`,
				// backgroundRepeat: "repeat-x",
				backgroundSize: "cover",
				// animation: `slide 10s linear infinite`,
				animation: `scroll 20s linear infinite`,
			}}
		>
			<img
				src={divider}
				alt="Divider"
				className="w-full"
				style={{
					opacity: 0,
				}}
			/>
		</div>
	);
};

export default Divider;
