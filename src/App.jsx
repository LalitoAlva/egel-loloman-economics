import React, { useState } from 'react';
import './index.css';

import HomePage from './components/HomePage';
import SocraticMode from './components/SocraticMode';
import ClassMode from './components/ClassMode';
import Navbar from './components/Navbar';

function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [currentMode, setCurrentMode] = useState('class'); // 'class' | 'test'

  // Handler to clear module when switching modes globally (optional, but cleaner)
  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setActiveModule(null); // Reset selection to let user choose module for that specific mode
  };

  return (
    <div className="app-shell">
      <Navbar currentMode={currentMode} onSetMode={handleModeChange} />

      {/* Container for content */}
      <div style={{ paddingTop: '20px' }}>
        {!activeModule ? (
          <HomePage onSelectModule={setActiveModule} />
        ) : (
          <>
            {currentMode === 'class' ? (
              <ClassMode module={activeModule} onBack={() => setActiveModule(null)} />
            ) : (
              <SocraticMode module={activeModule} onBack={() => setActiveModule(null)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
