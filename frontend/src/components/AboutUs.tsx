import '../App.css'


const AboutUs = () => {
  return (
    <div className="w-[90%]">
        <section className="backdrop-blur-sm mt-20 border border-gray-400 rounded-3xl p-8 shadow-2xs px-[4vw] py-[11vh]"        >
            

             <a 
  href="/download/all_chaperones"
  download
  className="btn btn-primary"
>
  Download All Chaperone Forms
</a>


<button
  onClick={() => window.open("/download_all_audios", "_blank")}
  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
>
  Download All Audios
</button>

        </section>
    </div>
  )
}

export default AboutUs;
