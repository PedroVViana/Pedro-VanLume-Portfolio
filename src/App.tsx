import React from 'react';
import HomeSection from './components/sections/HomeSection';
import SobreSection from './components/sections/SobreSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ServicosSection from './components/sections/ServicosSection';
import ContatoSection from './components/sections/ContatoSection';
import ProgressBar from './components/UI/ProgressBar';
import Navbar from './components/UI/Navbar';

function App() {
  return (
    <div>
      <ProgressBar />
      <Navbar />
      <HomeSection />
      <SobreSection />
      <PortfolioSection />
      <ServicosSection />
      <ContatoSection />
    </div>
  );
}

export default App;
