import union from "../assets/union.svg"

const EventSchedule = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="w-full">
    

        <div className="grid grid-cols-9 gap-12">
          {/* Left Column - Schedule */}
          <div className="col-span-5">
            {/* Title */}
                <h1
                style={{
                    fontFamily: 'roc-grotesk-compressed, sans-serif',
                    fontWeight: 600,
                    fontStyle: 'normal',
                    fontSize: '80px',
                    lineHeight: '1',
                    marginBottom: '12px'
                }}>
                EVENT SCHEDULE
                </h1>
                
                {/* Introduction Text */}
                <p 
                style={{
                    fontFamily: 'unbounded, sans-serif',
                    fontWeight: '300',
                    lineHeight: '1.2',
                    fontSize: '16px',
                    marginBottom: '12px'
                }}>
                This year's competition will be held at the Texas Union's Shirley Ballroom on the University of Texas at Austin campus.
                </p>
            {/* Day 0 */}
            <div className="pt-8 mb-5">
              <div className="flex flex-cols-2 gap-12">
                <div>
                  <h2
                    style={{
                      fontFamily: 'roc-grotesk-compressed, sans-serif',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '50px',
                      lineHeight: '0.9',
                      marginBottom: '8px'
                    }}>
                    DAY 0
                  </h2>
                  <p
                    style={{
                      fontFamily: 'roc-grotesk, sans-serif',
                      fontWeight: 200,
                      fontSize: '15px',
                      textAlign: "center"
                    }}>
                    FRI
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: 'unbounded, sans-serif',
                    fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '1'
                  }}>
                  <p className="text-gray-400 mb-1 mt-1">Location: Gregory Plaza</p>
                  <p className="text-gray-400 mb-3">Address: 2101 Speedway, Austin, TX 78712</p>
                  <p>• Workshop</p>
                  <p>• Minigames</p>
                </div>
              </div>
            </div>

            {/* Day 1 */}
            <div className="border-t border-white pt-5 mb-5">
              <div className="flex flex-cols-2 gap-12">
                <div>
                  <h2
                    style={{
                      fontFamily: 'roc-grotesk-compressed, sans-serif',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '50px',
                      lineHeight: '0.9',
                      marginBottom: '8px'
                    }}>
                    DAY 1
                  </h2>
                  <p
                    style={{
                      fontFamily: 'roc-grotesk, sans-serif',
                      fontWeight: 200,
                      fontSize: '15px',
                      textAlign: "center"
                    }}>
                    SAT
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: 'unbounded, sans-serif',
                    fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '1'
                  }}>
                  <p className="text-gray-400 mb-1">Location: Texas Union Shirley Ballroom</p>
                  <p className="text-gray-400 mb-3">Address: 2308 Whitis Ave, Austin, TX 78712</p>
                  <p>• Individual Regional Junior Division</p>
                  <p>• Team Open Stage Division</p>
                  <p>• Showcase</p>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="border-t border-white pt-5 mb-5">
              <div className="flex flex-cols-2 gap-12">
                <div>
                  <h2
                    style={{
                      fontFamily: 'roc-grotesk-compressed, sans-serif',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '50px',
                      lineHeight: '0.9',
                      marginBottom: '8px'
                    }}>
                    DAY 2
                  </h2>
                  <p
                    style={{
                      fontFamily: 'roc-grotesk, sans-serif',
                      fontWeight: 200,
                      fontSize: '15px',
                      textAlign: "center"
                    }}>
                    SUN
                  </p>
                </div>
                <div
                  style={{
                    fontFamily: 'unbounded, sans-serif',
                    fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '1'
                  }}>
                  <p className="text-gray-400 mb-1">Location: Texas Union Shirley Ballroom</p>
                  <p className="text-gray-400 mb-3">Address: 2308 Whitis Ave, Austin, TX 78712</p>
                  <p>• Individual Regional Open Division</p>
                  <p>• Individual Open Stage Division</p>
                  <p>• Award Ceremony & Showcase</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white"></div>
          </div>

          {/* Right Column - Image */}
          <div className=" my-auto col-span-4">
            <div className="w-full">
              <img 
                src={union}
                alt="Texas Union Shirley Ballroom interior showing elegant ballroom with chandeliers and wooden floor"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSchedule;