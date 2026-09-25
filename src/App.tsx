import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OffersDealsSection } from './components/OffersDealsSection';
import { ProductVisualShowcase } from './components/ProductVisualShowcase';
import { NewsSection } from './components/NewsSection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { RatingsTrustSection } from './components/RatingsTrustSection';
import { LeadershipSection } from './components/LeadershipSection';
import { FAQSection } from './components/FAQSection';
import { EnquirySection } from './components/EnquirySection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
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
    <div className="min-h-screen bg-white text-[#1C2028] flex flex-col justify-between selection:bg-[#F15A24] selection:text-white">
      {/* Premium Minimal Navigation */}
      <Navbar onOpenEnquiry={() => handleOpenEnquiry()} />

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

        {/* 2. 3D Product Visual Showcase: Inside The Technology (Studio Showcase) */}
        <ProductVisualShowcase
          onOpenAvailability={(name) => handleOpenEnquiry(name)}
        />
        
        {/* Editorial Technology Newsroom & Latest Updates */}
        <NewsSection
          onOpenEnquiry={(name) => handleOpenEnquiry(name)}
        />

        {/* Customer Experiences & Editorial Testimonials */}
        <CustomerReviewsSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Customer Feedback Inquiry')}
        />

        {/* Connect with Us on Social Media (4 QR Codes) */}
        <RatingsTrustSection
          onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Social Channels Inquiry')}
        />

        {/* Founder, Leadership & Showroom Team Section */}
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
      />

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
