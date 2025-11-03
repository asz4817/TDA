import Divider from "../components/Divider";
import '../App.css';

const TXDC = () => {
  return (
    <div>
    <section
      className="relative w-full h-screen bg-cover bg-center mb-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="pt-45 pb-30">
            <div className="grid grid-cols-2 mx-auto absolute right-[11%] bottom-[12%]">      
                <div className="space-y-2">
                    <h1 className=""
                    style={{
                        fontFamily: "grotesk",
                        fontSize: "168px",
                        marginBottom: "-12%",
                    }}>
                    TXDC 2026
                    </h1>
                    <p style={{
                        fontFamily: "unbounded",
                        fontSize: "16px",
                        marginBottom: "6%",
                    }}>MARCH 14-15TH</p>
                    <div className="flex gap-4 items-center">
                        <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                                style={{fontFamily: "unbounded",
                                    fontSize: "11px"
                        }}>
                        REGISTER NOW 
                        </button>
                        <h1 style={{
                            fontFamily: "unbounded",
                            fontSize: "11px",
                        }}>
                        Registration deadline: December 31st 2025 11:59pm CST
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <Divider />
    </div>
  )
}

export default TXDC
