import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { InteractiveShowcase } from './components/InteractiveShowcase';
import { FinancialCalculator } from './components/FinancialCalculator';
import { QuickInputDemo } from './components/QuickInputDemo';
import { HowItWorks } from './components/HowItWorks';
import { SecuritySection } from './components/SecuritySection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { AppSimulator } from './components/AppSimulator';

export function App() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  const handleOpenDemo = () => {
    setIsSimulatorOpen(true);
  };

  const handleCloseDemo = () => {
    setIsSimulatorOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-background)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenDemo={handleOpenDemo} />

      <main style={{ flex: 1 }}>
        <Hero onOpenDemo={handleOpenDemo} />
        <ValuePillars />
        <InteractiveShowcase />
        <FinancialCalculator onOpenDemo={handleOpenDemo} />
        <QuickInputDemo />
        <HowItWorks />
        <SecuritySection />
        <Testimonials />
        <FaqSection />
        <CtaBanner onOpenDemo={handleOpenDemo} />
      </main>

      <Footer />

      <AppSimulator isOpen={isSimulatorOpen} onClose={handleCloseDemo} />
    </div>
  );
}

export default App;
