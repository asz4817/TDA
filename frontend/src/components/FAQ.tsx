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
        question: "Do I need prior diabolo experience to join the team?",
        answer: "No! We are super beginner friendly and we love teaching beginners! Almost everyone who joins starts off as a beginner- having never touched a diabolo before. Some of our members even learned how to yo-yo 2 weeks before a performance!"
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
        answer: "No! We are super beginner friendly and we love teaching beginners! Almost everyone who joins starts off as a beginner- having never touched a diabolo before. Some of our members even learned how to yo-yo 2 weeks before a performance!"
      },
      {
        id: "o2",
        number: "02",
        question: "How can non-UT students get involved with TDA?",
        answer: "Join our discord! All of our communications happen there and we will send out google forms for every performance that we will have this semester, so keep an eye out! We would love to see you at our regular Tuesday meet ups from 5-7pm on Speedway."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* FAQ Title */}
        <h1 className="text-8xl font-black mb-10">FAQ</h1>

        {/* Prospective Team Members Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-normal mb-8">For prospective team members:</h2>
          
          <div className="space-y-0">
            {faqData.prospective.map((item) => (
              <div key={item.id} className="border-t border-white">
                <div className="py-8">
                  {/* Question Row */}
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-8 flex-1">
                      <span className="text-6xl font-black">{item.number}</span>
                      <h3 className="text-3xl font-normal pt-3 flex-1">{item.question}</h3>
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
                      <p className="text-lg leading-relaxed text-gray-300">
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
          <h2 className="text-2xl font-normal mb-8">For event organizers and diabolo community members:</h2>
          
          <div className="space-y-0">
            {faqData.organizers.map((item) => (
              <div key={item.id} className="border-t border-white">
                <div className="py-8">
                  {/* Question Row */}
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-8 flex-1">
                      <span className="text-6xl font-black">{item.number}</span>
                      <h3 className="text-3xl font-normal pt-3 flex-1">{item.question}</h3>
                    </div>
                    
                    <button 
                      className="text-5xl font-light ml-8 transition-transform duration-300"
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
                      <p className="text-lg leading-relaxed text-gray-300">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-t border-white mt-0"></div>
      </div>
    </div>
  );
};

export default FAQ;