import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SecurityGate from './components/SecurityGate';
import RoutesConfig from './routes/RoutesConfig';

const MainLayout: React.FC = () => {
  // 🔴 CHANGE HERE: Set initial state to TRUE
  // This ensures the gate is closed (visible) when the website first loads.
  const [isLocked, setIsLocked] = useState(true);
  
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavRequest = (path: string) => {
    if (path === location.pathname) return;
    setPendingPath(path);
    setIsLocked(true); // Locks the screen again for page transitions
  };

  const handleUnlock = () => {
    // This runs when the SecurityGate animation finishes
    setIsLocked(false);
    
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  return (
    <>
      <Navbar onNavigate={handleNavRequest} currentPath={location.pathname} />

      {/* The Gate appears if isLocked is true */}
      {isLocked && <SecurityGate onUnlock={handleUnlock} />}

      <div
        className={`transition-all duration-1000 ease-in-out ${
          isLocked
            ? 'blur-lg scale-95 opacity-0 pointer-events-none' // Hide content behind gate
            : 'blur-0 scale-100 opacity-100' // Reveal content
        }`}
      >
        <RoutesConfig />
      </div>

      {/* Optional: Hide footer when locked if preferred */}
      {!isLocked && <Footer onNavigate={handleNavRequest} color={''} />}
    </>
  );
};

export default MainLayout;