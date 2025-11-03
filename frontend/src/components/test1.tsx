// import { useState } from "react";
// import axios from "axios";

// export default function AudioUpload() {
//   const [audioFile, setAudioFile] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setAudioFile(file);
//     setError("");
//     setSuccess("");
//   };

//   const handleSubmit = async () => {
//     if (!audioFile) {
//       setError("You must upload an audio file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", audioFile);

//     try {
//       const res = await axios.post("http://127.0.0.1:5000/upload-audio", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setSuccess("File uploaded successfully!");
//       console.log("Response:", res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to upload file. Try again.");
//     }
//   };

//   return (
//     <div className="space-y-6 text-center">
//       <div className={`border-2 border-dashed rounded-lg p-12 mb-4 cursor-pointer transition-colors 
//         ${error ? "border-red-500" : "border-gray-600 hover:border-gray-500"}`}>
//         <input
//           type="file"
//           id="audio-upload"
//           className="hidden"
//           accept="audio/*"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="audio-upload" className="cursor-pointer">
//           <p className="text-white text-base font-light">
//             Upload an audio file (MP3, WAV, M4A, etc.)
//           </p>
//           {audioFile && (
//             <p className="text-blue-400 text-sm mt-2">{audioFile.name}</p>
//           )}
//         </label>
//       </div>

//       {error && <p className="text-red-400 text-sm">{error}</p>}
//       {success && <p className="text-green-400 text-sm">{success}</p>}

//       <button
//         onClick={handleSubmit}
//         className="bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 transition"
//       >
//         Submit
//       </button>
//     </div>
//   );
// }
