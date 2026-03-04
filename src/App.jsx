import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import StoryOnboarding from './components/StoryOnboarding';
import Community from './components/Community';
import Achievements from './components/Achievements';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('gen_onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('gen_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-bg-dark text-text-primary">
        <AnimatePresence>
          {showOnboarding && <StoryOnboarding onComplete={handleOnboardingComplete} />}
        </AnimatePresence>

        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Global Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-primary-emerald/10 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-secondary-azure/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
    </Router>
  );
}

export default App;
