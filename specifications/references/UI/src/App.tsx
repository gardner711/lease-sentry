import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { Homepage } from './components/Homepage';
import { Homepage2 } from './components/Homepage2';
import { AnalysisTool } from './components/AnalysisTool';

export default function App() {
  const [currentView, setCurrentView] = useState<'homepage' | 'homepage2' | 'tool'>('homepage2');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const handleGetStarted = (tier?: string) => {
    if (tier) {
      setSelectedTier(tier);
    }
    setCurrentView('tool');
  };

  const handleBackToHome = () => {
    setCurrentView('homepage2');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {currentView === 'homepage' && (
        <Homepage onGetStarted={handleGetStarted} />
      )}
      {currentView === 'homepage2' && (
        <Homepage2 onGetStarted={handleGetStarted} />
      )}
      {currentView === 'tool' && (
        <AnalysisTool onBackToHome={handleBackToHome} selectedTier={selectedTier} />
      )}
    </ThemeProvider>
  );
}