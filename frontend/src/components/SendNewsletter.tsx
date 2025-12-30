import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";


const SendNewsletter = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [responseMessage, setResponseMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);


    const navigate = useNavigate();

  // 1) Auth check – always runs
  useEffect(() => {

    const checkAuth = async () => {
      try {
        const res = await fetch("/protected_data", {
  method: "GET",
  credentials: "include",  
});

        console.log("protected_data status:", res.status);

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
        console.error("protected_data error", err);
        setIsAuthed(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);


     useEffect(() => {
            if (responseMessage) {
              const timer = setTimeout(() => {
                setResponseMessage('');
              }, 5000);
        
              return () => clearTimeout(timer); // Clean up on unmount or message change
            }
          }, [responseMessage]);

    const sendNewsletter = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('subject', subject)
        formData.append('body', body)
        if (files) {
            for (let i=0;i<files.length;i++){
                formData.append('file', files[i]);
            }
        }

        try {
            const res = await fetch('/upload_newsletter', {
            method: 'POST',
            credentials: "include",
            body: formData,
            });

            const result = await res.json();
            setResponseMessage(result.message || 'Success!');

            setSubject('');
            setBody('');
            setFiles(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (err) {
            setResponseMessage(`Error Submitting form: ${err}`);
        }
    }
          if (isAuthed === null) {
    return <div className="text-center mt-8">Checking authorization...</div>;
  }

  if (!isAuthed) {
    // navigate() already ran; you can also show a message here
    return null;
  }


  return (
    <>
      <div id="send_newsletter" className="text-center">
        <h1 className="font-bold text-2xl my-3">Send Newsletter</h1>
        <form className="grid gap-2 w-150 mx-auto" encType="multipart/form-data" onSubmit={sendNewsletter}>
            <input 
                className="border rounded pl-2 h-10"
                type="text" 
                id="subject" 
                name="subject" 
                placeholder="Subject Line" 
                required 
                value = {subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea 
                className="border rounded pl-2 pt-2 h-20"
                id="body" 
                name="body" 
                required 
                placeholder="Body" 
                value = {body}
                onChange={(e) => setBody(e.target.value)}
            />

            <input 
                className="text-sm border file:cursor-pointer my-auto file:px-4 file:mr-4  file:bg-gray-100 hover:file:bg-gray-200 file:text-slate-500 rounded" 
                type="file" 
                name="file" 
                multiple
                ref={fileInputRef}
                onChange={(e) => setFiles(e.target.files)}
            />
      
            <button  
                className="bg-violet-800 text-white text-center h-10 w-150 rounded hover:bg-violet-500 mx-auto mt-2" 
                type="submit"
                >Send Newsletter
            </button>
            <p className="mt-3 text-green-500">{responseMessage}</p>
        </form>
    </div>
    <div id="response"></div>
  </>
  )
}

export default SendNewsletter