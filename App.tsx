
import React from 'react';
import ChatInterface from './ChatInterface';
import WorkflowVisualizer from './WorkflowVisualizer';

const App: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              {/* Changed icon from hamburger to a court/scales icon to serve as a proper logo */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 18a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5zm-3-10.5a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">Judicial Process Explainer Bot</h1>
              <p className="text-xs text-slate-500 font-medium mt-1">Empowering Public Legal Awareness through AI</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#workflow" 
              onClick={(e) => scrollToSection(e, 'workflow')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Case Lifecycle
            </a>
            <a 
              href="#chat" 
              onClick={(e) => scrollToSection(e, 'chat')}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#254bdb] via-[#2d52e5] to-[#1e3ab7] rounded-[2rem] p-2 md:p-4 shadow-xl overflow-hidden">
          <div className="border-2 border-white/20 rounded-[1.5rem] p-8 md:p-14 relative z-10 min-h-[340px] flex flex-col justify-center">
            <div className="max-w-5xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1] text-white">
                Demystifying the Courtroom, One Step at a Time.
              </h2>
              <p className="text-blue-50 text-lg md:text-xl mb-10 leading-relaxed max-w-4xl">
                Navigating legal procedures can be overwhelming. Our AI-driven system clarifies filing stages, hearing processes, and workflows with simple, neutral explanations—no legal advice, just clear information.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#chat" 
                  onClick={(e) => scrollToSection(e, 'chat')}
                  className="bg-[#e2e8f0] text-[#1e293b] px-8 py-3.5 rounded-full font-bold hover:bg-white transition-all shadow-lg flex items-center gap-2 text-sm"
                >
                  Start Exploring
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <a 
                  href="#workflow" 
                  onClick={(e) => scrollToSection(e, 'workflow')}
                  className="bg-transparent text-white border-2 border-white/30 px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-all text-sm"
                >
                  View Process Flow
                </a>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[60px]"></div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16">
          {/* Visual Workflow - Left Side */}
          <div id="workflow" className="lg:col-span-7 space-y-10 scroll-mt-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Understanding the Journey of a Case</h2>
              <p className="text-slate-500 mt-4 leading-relaxed text-lg">
                Most legal systems follow a structured lifecycle to ensure fairness and due process. From the moment a dispute is formalized through filing until a final resolution or appeal, each stage serves a specific procedural purpose. Use the visualizer below to explore these standard milestones.
              </p>
            </div>
            
            <WorkflowVisualizer />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">Neutral Explanations</h4>
                <p className="text-slate-500 leading-relaxed">Our information is based on objective procedural standards and does not favor any party.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-3">No Legal Advice</h4>
                <p className="text-slate-500 leading-relaxed">We describe the "how" of the system, not what you "should" do. Always consult a lawyer for specific cases.</p>
              </div>
            </div>
          </div>

          {/* AI Chat Bot - Right Side */}
          <div id="chat" className="lg:col-span-5 relative scroll-mt-24">
            <div className="sticky top-24">
              <ChatInterface />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-32 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-slate-800 pb-16 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight">Judicial Process AI</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                An educational initiative to bridge the gap between citizens and the complex judicial system using Generative AI.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-slate-500">Legal Disclaimer</h5>
              <p className="text-slate-500 text-xs leading-relaxed">
                This system is for educational purposes only. Content generated by the AI does not constitute legal advice, nor does it create an attorney-client relationship. Rules of procedure vary by jurisdiction and specific court.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-slate-500">Resources</h5>
              <ul className="text-slate-400 text-sm space-y-4 font-medium">
                <li>
                  <a href="https://www.americanbar.org/groups/legal_services/flh-home/flh-bar-directories-and-lawyer-referral/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Bar Association Directory
                  </a>
                </li>
                <li>
                  <a href="https://www.uscourts.gov/rules-policies/current-rules-practice-procedure" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Federal Rules of Procedure
                  </a>
                </li>
                <li>
                  <a href="https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    Legal Aid Services
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
            <p>&copy; {new Date().getFullYear()} Judicial Court Process Explainer Bot. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
