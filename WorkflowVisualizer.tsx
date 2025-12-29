
import React, { useState } from 'react';
#import { CASE_FLOW_STEPS } from '../constants';

const WorkflowVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 p-8 md:p-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-blue-50 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">The Standard Judicial Lifecycle</h2>
      </div>

      <div className="relative mb-12 px-2">
        {/* Horizontal Line connecting steps */}
        <div className="absolute top-5 left-10 right-10 h-[1px] bg-slate-100 -z-0"></div>
        
        <div className="flex justify-between relative z-10 overflow-x-auto pb-6 scrollbar-hide">
          {CASE_FLOW_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className="flex flex-col items-center min-w-[120px] transition-all"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                activeStep === step.id 
                ? 'bg-[#254bdb] border-[#254bdb] text-white shadow-lg shadow-blue-500/30 scale-110' 
                : 'bg-white border-slate-100 text-slate-300 hover:border-slate-300'
              }`}>
                {step.id}
              </div>
              <span className={`text-[10px] mt-4 font-bold uppercase tracking-[0.15em] text-center transition-colors duration-300 ${
                activeStep === step.id ? 'text-[#254bdb]' : 'text-slate-400'
              }`}>
                {step.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-50 transition-all">
        {CASE_FLOW_STEPS.filter(s => s.id === activeStep).map(step => (
          <div key={step.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">{step.title}</h3>
            <p className="text-slate-500 mb-8 font-medium">{step.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {step.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-blue-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowVisualizer;
