import Divider from "../components/Divider";
import '../App.css';

const TXDC = () => {
  return (
    <div>
    <section
      className="relative w-full h-screen bg-cover bg-center mb-10">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="pt-45 pb-30">
            <div className="grid grid-cols-2 mx-auto absolute right-[15%]">      
                <div className="space-y-4 z-50 mt-10">
                    <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
                    TXDC 2026
                    </h1>
                    
                    <p className="">MARCH 14-15th</p>
                    <div className="flex gap-4 items-center">
                        <button className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
                                style={{fontFamily: "unbounded",
                                    fontSize: "11px"
                        }}>
                        REGISTRATION
                        </button>
                        <h1>
                        Registration deadline: January 1st 2026 11:59pm CST
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
