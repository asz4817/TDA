const Registration = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-10 md:pt-20">
      <div className="max-w-8xl mx-auto">
        {/* Registration Title */}
        <h1
        style={{
          fontFamily: 'roc-grotesk-compressed, sans-serif',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: 'clamp(60px, 10vw, 80px)',
        }}>REGISTRATION</h1>
        
        {/* Introduction Text */}
        <p className=""
        style={{
          fontFamily: 'unbounded, sans-serif',
          fontWeight: '300',
          lineHeight: '1.3'
        }}>
          For more information on competition rules, scoring criteria, and additional information, please read our{' '}
          <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            competition handbook
          </a>.
        </p>

        {/* Deadlines Section */}
        <div className="mb-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-8xl"
              style={{
                fontFamily: 'roc-grotesk-compressed, sans-serif',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: 'clamp(50px, 8vw, 65px)'
              }}>DEADLINES</h2>
            </div>
            <div className="pt-4"
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontWeight: '300',
            }}>
              <p className="text-sm">• Registration Due: 11:59 PM CST on December 31, 2025</p>
              <p className="text-sm">• Music Due: 11:59 PM CST on February 14th, 2026</p>
            </div>
          </div>
        </div>

        {/* Fees Section */}
        <div className="border-t border-white mb-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <h2 className="text-8xl"
              style={{
                fontFamily: 'roc-grotesk-compressed, sans-serif',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '65px',
              }}>FEES</h2>
            </div>
            <div className="pt-4"
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontWeight: '300',
            }}>
              <p className="text-sm">All Individual Divisions: $35 per competitor</p>
              <p className="text-sm">Team Open: $50 per team</p>
              <p className="text-gray-400 text-xs">Only one competitor per team will need to pay the registration fee</p>
            </div>
          </div>
        </div>

        {/* Divisions & Eligibility Section */}
        <div className="border-t border-white pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <h2 className="text-7xl mt-2"
                style={{
                  fontFamily: 'roc-grotesk-compressed, sans-serif',
                  fontWeight: 700,
                  fontStyle: 'normal',
                  fontSize: '65px',
                  lineHeight: '0.9'
                }}>DIVISIONS<br/>& ELIGIBILITY</h2>
              </div>
            </div>
            
            <div className="pt-4"
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontWeight: '300',
              fontSize: '12px',
              lineHeight: "1.3px"
            }}>
              <p className="text-sm">
                • Individual Open Stage Division: Open to participants of all ages and skill levels.
              </p>
              
              <p className="text-sm">
                • Individual Regional Open Division: Open to participants of all ages and skill levels.{' '}
                <span className="text-gray-400">Competitors must have a valid Texas mailing address.</span>
              </p>
              
              <p className="text-sm">
                • Individual Regional Junior Division: Optional division for competitors under the age of 18.{' '}
                <span className="text-gray-400">Competitors must be under the age of 18 on March 14th, 2026 and have a valid Texas mailing address.</span>
              </p>
              
              <p className="text-sm">
                • Team Open Stage Division: Open to participants of all ages and skill levels.
              </p>

              <p className="text-gray-400 text-xs leading-tight pt-4">
                Competitors can only compete in one individual event. Only Texas residents with a valid Texas mailing address may compete in the Regional Divisions. Only competitors under the age of 18 and are Texas residents have the option to compete in the Regional Junior Division.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-t border-white mt-6"></div>
      </div>
    </div>
  );
};

export default Registration;