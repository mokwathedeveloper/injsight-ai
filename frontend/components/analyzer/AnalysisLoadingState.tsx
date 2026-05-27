"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

const STAGES = [
  "Connecting to Injective network...",
  "Fetching wallet balance data...",
  "Normalizing token valuations...",
  "Running AI risk engine...",
  "Generating intelligence report...",
];

export function AnalysisLoadingState() {
  const [currentStage, setCurrentStage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
        {/* Inner pulsing icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="text-accent animate-pulse" size={32} />
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-sm mx-auto">
        <h3 className="text-2xl font-bold text-text-primary">Analyzing Intelligence</h3>
        <div className="h-6 overflow-hidden">
           <p className="text-accent font-medium animate-in slide-in-from-bottom-2 duration-500">
             {STAGES[currentStage]}
           </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-out" 
            style={{ width: `${((currentStage + 1) / STAGES.length) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
}
