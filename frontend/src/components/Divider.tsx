import divider from '../assets/Divider.svg'

const Divider = () => {
  return (
    <div className='w-full'
    style={{
      backgroundImage: `url(${divider})`,
      // backgroundRepeat: "repeat-x",
      backgroundSize: 'contain',
      // animation: `slide 10s linear infinite`,
      height: '60px',
      animation: `scroll 10s linear infinite`,
    }}
    >
      {/* <img
            src={divider}
            alt="Divider"
            className="w-full"
            style={{
              animation: `scroll 120s linear infinite`,
              WebkitAnimation: `120s scroll infinite linear`
            }}
          /> */}
    </div>
  )
}

export default Divider
