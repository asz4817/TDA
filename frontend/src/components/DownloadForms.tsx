import "../App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DownloadForms = () => {

	const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/protected_data", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          setIsAuthed(false);
          navigate("/login");
        } else if (res.ok) {
          setIsAuthed(true);
        } else {
          setIsAuthed(false);
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check error", err);
        setIsAuthed(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthed) {
    return null; // or a loading spinner while checking
  }

	return (
		<div className="w-[50%] mx-auto">
			<div className="flex  backdrop-blur-sm mt-50">
				{/* <a
					href="/download/all_chaperones"
					download
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
				>
					Download All Chaperone Forms
				</a> */}
				<button 
						onClick={() =>
							window.open("/download_all_chaperones", "_blank")
						}
						className="mx-auto bg-indigo-500 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded inline-flex items-center">
						<svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
						<span>Download All Chaperone Forms</span>
					</button>

				<br />
				<br />

				{/* <button
					onClick={() =>
						window.open("/download_all_audios", "_blank")
					}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
				>
					Download All Audios
				</button> */}
				<div>
					<button 
						onClick={() =>
							window.open("/download_all_audios", "_blank")
						}
						className="mx-auto bg-indigo-500 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded inline-flex items-center">
						<svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
						<span>Download All Audios</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DownloadForms;
