import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MatrioshkaLogo from "@/components/MatrioshkaLogo";
import ProgressRing from "@/components/ProgressRing";
import WaterGlass from "@/components/WaterGlass";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [glassStates, setGlassStates] = useState<boolean[]>(Array(8).fill(true));
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch today's water log
  const { data: waterLog, isLoading } = useQuery({
    queryKey: ['/api/water-log/today'],
    queryFn: async () => {
      const response = await fetch('/api/water-log/today');
      return response.json();
    }
  });

  // Update water log mutation
  const updateWaterLogMutation = useMutation({
    mutationFn: async (glassesConsumed: number) => {
      const response = await fetch('/api/water-log/today', {
        method: 'POST',
        body: JSON.stringify({ glassesConsumed }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to update water log');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/water-log/today'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save your progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Initialize glass states from server data
  useEffect(() => {
    if (waterLog && !isLoading) {
      const consumedCount = waterLog.glassesConsumed || 0;
      const newStates = Array(8).fill(true);
      // Mark consumed glasses as empty (false)
      for (let i = 0; i < consumedCount; i++) {
        newStates[i] = false;
      }
      setGlassStates(newStates);
    }
  }, [waterLog, isLoading]);

  const consumedCount = glassStates.filter(state => !state).length;
  const percentage = Math.round((consumedCount / 8) * 100);

  useEffect(() => {
    if (consumedCount === 8 && !celebrationShown) {
      setShowCelebration(true);
      setCelebrationShown(true);
      toast({
        title: "🎉 Congratulations!",
        description: "You've reached your daily hydration goal!",
        duration: 5000,
      });
    }
    
    // Reset celebration flag when glasses are reset
    if (consumedCount < 8) {
      setCelebrationShown(false);
    }
  }, [consumedCount, celebrationShown, toast]);

  const toggleGlass = (index: number) => {
    setGlassStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      const newConsumedCount = newStates.filter(state => !state).length;
      
      // Update server
      updateWaterLogMutation.mutate(newConsumedCount);
      
      return newStates;
    });
  };

  const resetAllGlasses = () => {
    // Reset to all full
    setGlassStates(Array(8).fill(true));
    // Reset celebration states
    setShowCelebration(false);
    setCelebrationShown(false);
    // Update server
    updateWaterLogMutation.mutate(0);
    
    // Staggered animation for visual appeal
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        setGlassStates(prev => {
          const newStates = [...prev];
          newStates[i] = true;
          return newStates;
        });
      }, i * 100);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <MatrioshkaLogo size={60} />
        <p className="mt-4 text-slate-600">Loading your daily progress...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <MatrioshkaLogo size={40} />
            <div>
              <h1 className="text-xl font-bold text-slate-800">Kaplita</h1>
              <p className="text-xs text-slate-500">Water Tracker</p>
            </div>
          </div>
          
          {/* Progress Ring */}
          <ProgressRing progress={consumedCount} total={8} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        {/* Daily Goal Section */}
        <div className="bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(217,91%,60%)] rounded-2xl p-6 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">Daily Goal</h2>
              <p className="text-blue-100 text-sm">Stay hydrated, stay healthy!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{consumedCount}</div>
              <div className="text-blue-200 text-sm">of 8 glasses</div>
            </div>
          </div>
        </div>

        {/* Water Glass Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {glassStates.map((isFull, index) => (
            <WaterGlass
              key={index}
              index={index}
              isFull={isFull}
              onClick={() => toggleGlass(index)}
            />
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2 flex items-center">
            <span className="w-5 h-5 bg-[hsl(199,89%,48%)] rounded-full mr-2 flex items-center justify-center">
              <span className="text-white text-xs">💡</span>
            </span>
            Hydration Tip
          </h3>
          <p className="text-sm text-slate-600">
            Drink a glass of water when you wake up to kickstart your metabolism and rehydrate your body.
          </p>
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setShowCelebration(false)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-8 text-center mx-4 max-w-sm relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowCelebration(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Congratulations!
                </h2>
                <p className="text-slate-600 mb-6">
                  You've reached your daily hydration goal!
                </p>
                
                {/* Close button */}
                <Button
                  onClick={() => setShowCelebration(false)}
                  className="bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(217,91%,60%)] hover:from-[hsl(217,91%,60%)] hover:to-[hsl(224,76%,48%)] text-white"
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Actions */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 sticky bottom-0">
        <div className="max-w-md mx-auto space-y-4">
          {/* Quick Stats */}
          <div className="flex justify-between text-sm text-slate-600">
            <span>Today's Progress</span>
            <span>{percentage}%</span>
          </div>
          
          {/* Reset Button */}
          <Button
            onClick={resetAllGlasses}
            className="w-full bg-gradient-to-r from-[hsl(199,89%,48%)] to-[hsl(217,91%,60%)] hover:from-[hsl(217,91%,60%)] hover:to-[hsl(224,76%,48%)] text-white font-semibold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200"
            size="lg"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">🔄</span>
              <span>Reset Daily Goal</span>
            </div>
          </Button>
        </div>
      </footer>
    </div>
  );
}
