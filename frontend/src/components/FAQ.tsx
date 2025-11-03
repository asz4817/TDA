import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = {
    prospective: [
      {
        id: "p1",
        number: "01",
        question: "How do I join the team, and do I need diabolo experience to perform?",
        answer: "Join our discord! We are super beginner friendly and we love teaching beginners! Almost everyone who joins starts off as a beginner- having never touched a diabolo before. Some of our members even learned how to yo-yo 2 weeks before a performance! We would love to see you at our regular Tuesday meet ups from 5-7pm on Speedway, and keep an eye out on our discord for our performance sign up forms."
      },
      {
        id: "p2",
        number: "02",
        question: "Do we need our own diabolo to join and where can we buy equipment?",
        answer: "Nope! Most of the team has spare yo-yo's you can borrow during practice. However, if you would like a yo-yo to practice on your own time please contact an officer on discord or our instagram @texasdiabolo for yo-yo's to borrow. This year we'll be charging a $50 security deposit for a high quality diabolo borrow and take home (don't worry we'll give you the $50 back when the yo-yo is returned)."
      }
    ],
    organizers: [
      {
        id: "o1",
        number: "01",
        question: "What kind of performances can TDA provide for our event?",
        answer: "We often perform sets ranging from 10-15 minutes depending on what an event is looking for. We often get asked to perform for cultural events and organizations, and we adjust our performances to accomodate for space constraints such as the ceiling height, and indoor/outdoor nature of the stage area. "
      },
      {
        id: "o2",
        number: "02",
        question: "How can community members get involved with TDA?",
        answer: "Come to our workshops and competitions! Keep an eye out on our Instagram for our open diabolo workshops where we teach players of all skill levels new tricks. We also host a competition in the Spring semester that is open to diabolo players of all levels of experience."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* FAQ Title */}
        <h1 
          style={{
            fontFamily: 'roc-grotesk-compressed, sans-serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '80px'
          }}
        >
          FAQ
        </h1>

        {/* Prospective Team Members Section */}
        <div className="mb-10 pt-6">
          <h2 
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontSize: '18px'
            }}
          >
            For prospective team members:
          </h2>
          
          <div className="space-y-0">
            {faqData.prospective.map((item) => (
              <div key={item.id} className="border-b border-white">
                <div className="py-6">
                  {/* Question Row */}
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-8 flex-1">
                      <span 
                        style={{
                          fontFamily: 'roc-grotesk-compressed, sans-serif',
                          fontWeight: 700,
                          fontSize: '50px'
                        }}
                      >
                        {item.number}
                      </span>
                      <h3 
                        style={{
                          fontFamily: 'unbounded, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          alignSelf: "center",
                        }}
                        className="flex-1 justify-center"
                      >
                        {item.question}
                      </h3>
                    </div>
                    
                    <button 
                      className="text-5xl font-light ml-8 transition-transform duration-300"
                      style={{ transform: openItems[item.id] ? 'rotate(0deg)' : 'rotate(0deg)' }}
                    >
                      {openItems[item.id] ? '—' : '+'}
                    </button>
                  </div>

                  {/* Answer Section */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItems[item.id] ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-32">
                      <p 
                        style={{
                          fontFamily: 'unbounded, sans-serif',
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}
                        className="text-gray-300"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Organizers Section */}
        <div>
          <h2 
            style={{
              fontFamily: 'unbounded, sans-serif',
              fontSize: '20px'
            }}
            className="pt-10"
          >
            For event organizers and diabolo community members:
          </h2>
          
          <div className="space-y-0">
            {faqData.organizers.map((item) => (
              <div key={item.id} className="border-b border-white">
                <div className="py-6">
                  {/* Question Row */}
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-8 flex-1">
                      <span 
                        style={{
                          fontFamily: 'roc-grotesk-compressed, sans-serif',
                          fontWeight: 700,
                          fontSize: '50px'
                        }}
                      >
                        {item.number}
                      </span>
                      <h3 
                         style={{
                          fontFamily: 'unbounded, sans-serif',
                          fontSize: '16px',
                          fontWeight: 400,
                          alignSelf: "center",
                        }}
                        className="flex-1"
                      >
                        {item.question}
                      </h3>
                    </div>
                    
                    <button 
                      className="text-5xl font-light ml-8 transition-transform duration-300"
                      style={{ transform: openItems[item.id] ? 'rotate(0deg)' : 'rotate(0deg)' }}
                    >
                      {openItems[item.id] ? '—' : '+'}
                    </button>
                  </div>

                  {/* Answer Section */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openItems[item.id] ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-32">
                      <p 
                        style={{
                          fontFamily: 'unbounded, sans-serif',
                          fontSize: '14px',
                          lineHeight: '1.6'
                        }}
                        className="text-gray-300"
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;