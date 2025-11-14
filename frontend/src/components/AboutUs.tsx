import '../App.css'


const AboutUs = () => {
  return (
    <div className="w-[90%]">
        <section className="backdrop-blur-xs border border-gray-600 rounded-3xl p-8 shadow-2xs px-[4vw] py-[11vh]"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.4)"

            }}
        >
            <h1 className="text-3xl font-semibold mb-4"
                style={{
                fontFamily: `roc-grotesk-compressed, sans-serif`,
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "clamp(3rem, -6rem + 16vw, 6rem)",
                textAlign: "center",
            }}>ABOUT US</h1>
            <p style={{
                fontFamily: "unbounded",
                fontSize: "clamp(0.625rem, -0.125rem + 1.3333vw, 0.875rem)",
                textAlign: "center",
                marginBottom: "4%",
            }}>
                The Texas Diabolo Association is a performing arts organization at the University of Texas at Austin. We bring the dynamic art of Chinese yo-yo, or diabolo, to life by blending traditional performance with modern music. 
            </p>
            <p style={{
                fontFamily: "unbounded",
                fontSize: "clamp(0.625rem, -0.125rem + 1.3333vw, 0.875rem)",
                textAlign: "center",
            }}>
                We are a nationally ranked diabolo team that celebrates Asian American culture through captivating performances.
            </p>
        </section>
    </div>
  )
}

export default AboutUs;
