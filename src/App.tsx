import HomeSection from './components/sections/HomeSection';
import SobreSection from './components/sections/SobreSection';
import PortfolioSection from './components/sections/PortfolioSection';
import ServicosSection from './components/sections/ServicosSection';
import ContatoSection from './components/sections/ContatoSection';
import ProgressBar from './components/ui/ProgressBar.tsx';
import Navbar from './components/ui/Navbar.tsx';
import WhatsAppButton from './components/ui/WhatsAppButton.tsx';

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
      <WhatsAppButton />
    </div>
  );
}

export default App;
