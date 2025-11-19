import { useState, useEffect, useRef} from "react";


const SendNewsletter = () => {

    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [responseMessage, setResponseMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);


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