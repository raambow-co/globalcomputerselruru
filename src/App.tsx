import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewsSection } from './components/NewsSection';
import { AvailabilityModal } from './components/AvailabilityModal';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleOpenEnquiry = (productName = '') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setModalOpen(false);
    setSelectedProduct('');
  };

  return (
    <div className="min-h-screen bg-white text-[#1C2028] flex flex-col justify-between selection:bg-[#E51E2B] selection:text-white">
      {/* Premium Minimal Navigation */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* Main Single Unified Hero & Newsroom Sections */}
      <main className="flex-grow flex flex-col">
        <HeroSection
          onOpenAvailability={() => handleOpenEnquiry()}
          onSelectProduct={(name) => handleOpenEnquiry(name)}
        />
        
        {/* Editorial Technology Newsroom & Latest Updates */}
        <NewsSection
          onOpenEnquiry={(name) => handleOpenEnquiry(name)}
        />
      </main>

      {/* Interactive Product Availability Modal */}
      <AvailabilityModal
        isOpen={modalOpen}
        onClose={handleCloseEnquiry}
        initialProduct={selectedProduct}
      />
    </div>
  );
};

export default App;
