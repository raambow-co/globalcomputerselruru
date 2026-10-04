import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OffersDealsSection } from './components/OffersDealsSection';
import { ProductVisualShowcase } from './components/ProductVisualShowcase';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { ShowroomGallerySection } from './components/ShowroomGallerySection';
import { RatingsTrustSection } from './components/RatingsTrustSection';
import { LeadershipSection } from './components/LeadershipSection';
import { FAQSection } from './components/FAQSection';
import { EnquirySection } from './components/EnquirySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { AvailabilityModal } from './components/AvailabilityModal';
import { FloatingContactWidget } from './components/FloatingContactWidget';
import { AdminPanel } from './components/AdminPanel';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  // Handle URL hash trigger (e.g. website.com/#admin) and hotkey (Alt + A or Ctrl + Shift + A)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOpenEnquiry = (productName = '') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setModalOpen(false);
    setSelectedProduct('');
  };

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C2028] flex flex-col justify-between selection:bg-[#F15A24] selection:text-white">
      {/* Premium Minimal Navigation */}
      <Navbar 
        onOpenEnquiry={() => handleOpenEnquiry()} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Single Unified Sections */}
      <main className="flex-grow flex flex-col">
        <HeroSection
          onOpenAvailability={() => handleOpenEnquiry()}
          onSelectProduct={(name) => handleOpenEnquiry(name)}
        />

        {/* 1. Special Offers & Showroom Deals Section */}
        <OffersDealsSection
          onOpenEnquiry={(dealName) => handleOpenEnquiry(dealName || 'Special Offer Inquiry')}
        />

        {/* 2. Spatial Floating Brand Constellation & Hardware Services Showcase */}
        <ProductVisualShowcase
          onOpenAvailability={(brandOrService) => handleOpenEnquiry(brandOrService || 'Brand Hardware Servicing')}
        />

        {/* 3. Real Customer Stories & Video Reviews Section */}
        <CustomerReviewsSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Customer Feedback Inquiry')}
        />

        {/* 3. Showroom & Hardware Experience Showcase Gallery Slideshow */}
        <ShowroomGallerySection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Showroom Hardware Inquiry')}
        />

        {/* 4. Connect with Us on Social Media (4 QR Codes) */}
        <RatingsTrustSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Social Channels Inquiry')}
        />

        {/* 4. Founder, Leadership & Showroom Team Section */}
        <LeadershipSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Leadership & Team Inquiry')}
        />

        {/* Primary Consultation & Product Availability Enquiry Section */}
        <EnquirySection
          initialProduct={selectedProduct}
        />

        {/* Physical Showroom Map & Directions Section (Below Enquiry Form) */}
        <LocationSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Showroom Visit Inquiry')}
        />

        {/* Knowledge Desk & Frequently Asked Questions (Just Above Footer) */}
        <FAQSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'FAQ Direct Inquiry')}
        />
      </main>

      {/* Final Chapter: Editorial Footer & Pre-Footer Finale */}
      <Footer
        onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Footer Consultation')}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Interactive Product Availability Modal */}
      <AvailabilityModal
        isOpen={modalOpen}
        onClose={handleCloseEnquiry}
        initialProduct={selectedProduct}
      />

      {/* Interactive Admin Management Desk */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={handleCloseAdmin}
      />

      {/* Persistent Floating 3D WhatsApp & Phone Call Action Buttons */}
      <FloatingContactWidget />
    </div>
  );
};

export default App;
