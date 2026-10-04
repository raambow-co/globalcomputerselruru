import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

// Below-the-fold components loaded asynchronously for ultra-fast mobile FCP & LCP
const OffersDealsSection = lazy(() => import('./components/OffersDealsSection').then(m => ({ default: m.OffersDealsSection })));
const ProductVisualShowcase = lazy(() => import('./components/ProductVisualShowcase').then(m => ({ default: m.ProductVisualShowcase })));
const CustomerReviewsSection = lazy(() => import('./components/CustomerReviewsSection').then(m => ({ default: m.CustomerReviewsSection })));
const ShowroomGallerySection = lazy(() => import('./components/ShowroomGallerySection').then(m => ({ default: m.ShowroomGallerySection })));
const RatingsTrustSection = lazy(() => import('./components/RatingsTrustSection').then(m => ({ default: m.RatingsTrustSection })));
const LeadershipSection = lazy(() => import('./components/LeadershipSection').then(m => ({ default: m.LeadershipSection })));
const EnquirySection = lazy(() => import('./components/EnquirySection').then(m => ({ default: m.EnquirySection })));
const LocationSection = lazy(() => import('./components/LocationSection').then(m => ({ default: m.LocationSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const AvailabilityModal = lazy(() => import('./components/AvailabilityModal').then(m => ({ default: m.AvailabilityModal })));
const FloatingContactWidget = lazy(() => import('./components/FloatingContactWidget').then(m => ({ default: m.FloatingContactWidget })));

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
      <Navbar 
        onOpenEnquiry={() => handleOpenEnquiry()} 
      />

      {/* Main Single Unified Sections */}
      <main className="flex-grow flex flex-col">
        <HeroSection
          onOpenAvailability={() => handleOpenEnquiry()}
          onSelectProduct={(name) => handleOpenEnquiry(name)}
        />

        <Suspense fallback={null}>
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

          {/* 4. Showroom & Hardware Experience Showcase Gallery Slideshow */}
          <ShowroomGallerySection
            onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Showroom Hardware Inquiry')}
          />

          {/* 5. Connect with Us on Social Media (4 QR Codes) */}
          <RatingsTrustSection
            onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Social Channels Inquiry')}
          />

          {/* 6. Founder, Leadership & Showroom Team Section */}
          <LeadershipSection
            onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Leadership & Team Inquiry')}
          />

          {/* 7. Primary Consultation & Product Availability Enquiry Section */}
          <EnquirySection
            initialProduct={selectedProduct}
          />

          {/* 8. Physical Showroom Map & Directions Section */}
          <LocationSection
            onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'Showroom Visit Inquiry')}
          />

          {/* 9. Knowledge Desk & Frequently Asked Questions */}
          <FAQSection
            onOpenEnquiry={(topic) => handleOpenEnquiry(topic || 'FAQ Direct Inquiry')}
          />
        </Suspense>
      </main>

      <Suspense fallback={null}>
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

        {/* Persistent Floating 3D WhatsApp & Phone Call Action Buttons */}
        <FloatingContactWidget />
      </Suspense>
    </div>
  );
};

export default App;
