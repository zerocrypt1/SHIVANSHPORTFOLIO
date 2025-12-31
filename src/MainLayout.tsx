import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SecurityGate from './components/SecurityGate';
import RoutesConfig from './routes/RoutesConfig';

const MainLayout: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavRequest = (path: string) => {
    if (path === location.pathname) return;
    setPendingPath(path);
    setIsLocked(true);
  };

  const handleUnlock = () => {
    setIsLocked(false);
    if (pendingPath) {
      navigate(pendingPath);
      setPendingPath(null);
    }
  };

  return (
    <>
      <Navbar onNavigate={handleNavRequest} currentPath={location.pathname} />

      {isLocked && <SecurityGate onUnlock={handleUnlock} />}

      <div
        className={`transition-all duration-700 ${
          isLocked
            ? 'blur-xl scale-95 opacity-50'
            : 'blur-0 scale-100 opacity-100'
        }`}
      >
        <RoutesConfig />
      </div>

      <Footer onNavigate={handleNavRequest} color={''} />
    </>
  );
};

export default MainLayout;
