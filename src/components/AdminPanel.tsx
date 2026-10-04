import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  Check,
  AlertCircle,
  Sparkles,
  Image as ImageIcon,
  Layers,
  Tag,
  RefreshCw,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Phone,
  MessageSquare,
  Calendar,
  Search,
  Upload,
  Eye,
  Sliders,
  CheckCircle2,
  Database,
  KeyRound,
  ShieldCheck,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot, 
  serverTimestamp 
} from '../firebase';
import { GallerySlide, DEFAULT_GALLERY_SLIDES } from './ShowroomGallerySection';
import { OfferSlide, DEFAULT_OFFERS } from './OffersDealsSection';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerEnquiry {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  requirement?: string;
  product?: string;
  timestamp?: any;
  status?: 'new' | 'contacted' | 'resolved';
}

const PRESET_IMAGES = [
  { label: 'Custom Gaming Rig / Workstation', url: '/assets/special_offer_1.png' },
  { label: 'Showroom Setup / Pro Accessories', url: '/assets/special_offer_2.png' },
  { label: 'Curved 4K Ultra-Wide Monitor', url: '/assets/pro_monitor.webp' },
  { label: 'RTX 4080 Super Triple-Fan GPU', url: '/assets/gpu_card.webp' },
  { label: 'Z790 Extreme Motherboard', url: '/assets/motherboard.webp' },
  { label: 'AeroCNC Aluminum Keyboard', url: '/assets/mech_keyboard.webp' },
  { label: 'Epson EcoTank Heavy-Duty Printer', url: '/assets/epson_printer.webp' },
  { label: 'High-Speed RGB RAM Modules', url: '/assets/ram_modules.webp' },
  { label: 'Curved Gaming Monitor Hero', url: '/assets/monitorherocurved.webp' },
  { label: 'Flagship Motherboard Hero', url: '/assets/motherboardhero.webp' },
  { label: 'EcoTank Printer Hero', url: '/assets/epsonprinterhero.webp' }
];

const PRESET_CATEGORIES = [
  'CUSTOM WORKSTATIONS',
  'CREATOR DISPLAYS',
  'STUDIO GEAR',
  'GRAPHICS & AI',
  'MOTHERBOARDS',
  'PERIPHERALS',
  'PRINTERS & EPSON',
  'ENTERPRISE HARDWARE'
];

const COLOR_ACCENTS = [
  { label: 'Vibrant Orange', value: '#F15A24' },
  { label: 'Electric Amber', value: '#F59E0B' },
  { label: 'Studio Cyan', value: '#0284C7' },
  { label: 'Emerald Tech', value: '#059669' },
  { label: 'Hyper Violet', value: '#7C3AED' },
  { label: 'Neon Pink', value: '#DB2777' },
  { label: 'Deep Crimson', value: '#DC2626' }
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('gce_admin_auth_v1') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'gallery' | 'offers' | 'enquiries'>('gallery');

  // Gallery Slides State
  const [gallerySlides, setGallerySlides] = useState<GallerySlide[]>(() => {
    try {
      const saved = localStorage.getItem('gc_gallery_slides_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_GALLERY_SLIDES;
  });

  // Offers Slides State
  const [offers, setOffers] = useState<OfferSlide[]>(() => {
    try {
      const saved = localStorage.getItem('gc_offers_slides_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_OFFERS;
  });

  // Customer Enquiries State
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [enquirySearch, setEnquirySearch] = useState('');

  // UI / Action states
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingSlide, setEditingSlide] = useState<GallerySlide | null>(null);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);

  const [editingOffer, setEditingOffer] = useState<OfferSlide | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto show toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Real-time Firestore Listeners
  useEffect(() => {
    if (!isOpen) return;

    // 1. Gallery Slides Listener
    const unsubGallery = onSnapshot(
      collection(db, 'gallery_slides'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: GallerySlide[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              tag: data.tag || 'HARDWARE SPEC',
              title: data.title || '',
              subtitle: data.subtitle || '',
              image: data.image || '/assets/special_offer_1.png',
              specs: Array.isArray(data.specs) ? data.specs : [],
              accentColor: data.accentColor || '#F15A24',
              category: data.category || 'CUSTOM WORKSTATIONS',
              order: typeof data.order === 'number' ? data.order : 0
            });
          });
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setGallerySlides(list);
          localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(list));
        }
      },
      (err) => console.warn('Gallery snapshot notice:', err)
    );

    // 2. Offers Listener
    const unsubOffers = onSnapshot(
      collection(db, 'offers'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list: OfferSlide[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            list.push({
              id: docSnap.id,
              image: data.image || '/assets/special_offer_1.png',
              badge: data.badge || 'SPECIAL OFFER',
              offerTitle: data.offerTitle || '',
              description: data.description || '',
              order: typeof data.order === 'number' ? data.order : 0
            });
          });
          list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setOffers(list);
          localStorage.setItem('gc_offers_slides_v3', JSON.stringify(list));
        }
      },
      (err) => console.warn('Offers snapshot notice:', err)
    );

    // 3. Enquiries Listener
    const unsubEnquiries = onSnapshot(
      collection(db, 'enquiries'),
      (snapshot) => {
        const list: CustomerEnquiry[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          list.push({
            id: docSnap.id,
            name: d.name || d.customerName || 'Customer',
            phone: d.phone || d.mobile || d.contact || '',
            email: d.email || '',
            requirement: d.requirement || d.message || d.notes || '',
            product: d.product || d.subject || 'General Consultation',
            timestamp: d.timestamp || d.createdAt || null,
            status: d.status || 'new'
          });
        });
        setEnquiries(list);
      },
      (err) => console.warn('Enquiries snapshot notice:', err)
    );

    return () => {
      unsubGallery();
      unsubOffers();
      unsubEnquiries();
    };
  }, [isOpen]);

  // Handle Login Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim();
    // Default PIN: gce2026 or admin123 or global
    if (cleanPin === 'gce2026' || cleanPin === 'admin123' || cleanPin === 'global' || cleanPin === '70938') {
      setIsAuthenticated(true);
      localStorage.setItem('gce_admin_auth_v1', 'true');
      setPinError('');
      showToast('Admin Session Authenticated');
    } else {
      setPinError('Invalid Passcode. Enter "gce2026" or "admin123"');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gce_admin_auth_v1');
    setPinInput('');
  };

  // Helper to handle local file uploads with resizing to avoid Firestore document limits
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.88);
          onSuccess(compressedDataUrl);
          showToast('Image uploaded and optimized successfully!');
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // ==========================================
  // GALLERY SLIDESHOW HANDLERS
  // ==========================================
  const handleOpenAddSlide = () => {
    setEditingSlide({
      id: `slide_${Date.now()}`,
      category: 'CUSTOM WORKSTATIONS',
      tag: 'FLAGSHIP HARDWARE',
      title: '',
      subtitle: '',
      image: '/assets/special_offer_1.png',
      specs: ['High Performance Cooling', 'Official Brand Warranty', 'Ready Showroom Unit'],
      accentColor: '#F15A24',
      order: gallerySlides.length
    });
    setIsSlideModalOpen(true);
  };

  const handleOpenEditSlide = (slide: GallerySlide) => {
    setEditingSlide({ ...slide });
    setIsSlideModalOpen(true);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    if (!editingSlide.title.trim()) {
      showToast('Please enter a title for the slide');
      return;
    }

    setLoading(true);
    try {
      const slideData = {
        tag: editingSlide.tag.trim() || 'SHOWROOM HARDWARE',
        category: editingSlide.category.trim() || 'CUSTOM WORKSTATIONS',
        title: editingSlide.title.trim(),
        subtitle: editingSlide.subtitle.trim(),
        image: editingSlide.image.trim() || '/assets/special_offer_1.png',
        specs: editingSlide.specs.filter(s => s.trim().length > 0),
        accentColor: editingSlide.accentColor || '#F15A24',
        order: editingSlide.order ?? 0,
        updatedAt: serverTimestamp()
      };

      // 1. Save to Firestore
      await setDoc(doc(db, 'gallery_slides', editingSlide.id), slideData);

      // 2. Update local state
      const updatedList = [...gallerySlides];
      const existingIdx = updatedList.findIndex(s => s.id === editingSlide.id);
      if (existingIdx >= 0) {
        updatedList[existingIdx] = { ...editingSlide, ...slideData };
      } else {
        updatedList.push({ ...editingSlide, ...slideData });
      }
      updatedList.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setGallerySlides(updatedList);
      localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(updatedList));

      setIsSlideModalOpen(false);
      setEditingSlide(null);
      showToast('Hardware Gallery Slide Saved & Synced to Cloud!');
    } catch (err: any) {
      console.error('Error saving slide:', err);
      // Even if offline, update local storage
      const updatedList = [...gallerySlides];
      const existingIdx = updatedList.findIndex(s => s.id === editingSlide.id);
      if (existingIdx >= 0) {
        updatedList[existingIdx] = editingSlide;
      } else {
        updatedList.push(editingSlide);
      }
      setGallerySlides(updatedList);
      localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(updatedList));
      setIsSlideModalOpen(false);
      showToast('Saved to local storage (Firebase sync will retry)');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlide = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'gallery_slides', id));
      const filtered = gallerySlides.filter(s => s.id !== id);
      setGallerySlides(filtered);
      localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(filtered));
      showToast('Slide deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      const filtered = gallerySlides.filter(s => s.id !== id);
      setGallerySlides(filtered);
      localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(filtered));
      showToast('Removed locally');
    } finally {
      setLoading(false);
    }
  };

  const handleReorderSlide = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallerySlides.length) return;

    const updated = [...gallerySlides];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Update order values
    const reordered = updated.map((slide, idx) => ({
      ...slide,
      order: idx
    }));

    setGallerySlides(reordered);
    localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(reordered));

    try {
      for (const slide of reordered) {
        await setDoc(doc(db, 'gallery_slides', slide.id), { order: slide.order }, { merge: true });
      }
      showToast('Slide order updated & saved');
    } catch (e) {}
  };

  const handleSeedDefaultGallery = async () => {
    if (!window.confirm('Populate/Reset Hardware Gallery with 6 default flagship showroom items?')) return;
    setLoading(true);
    try {
      for (let i = 0; i < DEFAULT_GALLERY_SLIDES.length; i++) {
        const item = DEFAULT_GALLERY_SLIDES[i];
        await setDoc(doc(db, 'gallery_slides', item.id), {
          tag: item.tag,
          category: item.category,
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          specs: item.specs,
          accentColor: item.accentColor,
          order: i,
          updatedAt: serverTimestamp()
        });
      }
      setGallerySlides(DEFAULT_GALLERY_SLIDES);
      localStorage.setItem('gc_gallery_slides_v1', JSON.stringify(DEFAULT_GALLERY_SLIDES));
      showToast('Default Hardware Slides Seeded to Firebase!');
    } catch (err) {
      console.error('Seed error:', err);
      showToast('Failed to seed to Firestore, updated local data.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // OFFERS & DEALS SLIDESHOW HANDLERS
  // ==========================================
  const handleOpenAddOffer = () => {
    setEditingOffer({
      id: `offer_${Date.now()}`,
      badge: 'EXCLUSIVE SHOWROOM DEAL',
      offerTitle: '',
      image: '/assets/special_offer_1.png',
      description: '',
      order: offers.length
    });
    setIsOfferModalOpen(true);
  };

  const handleOpenEditOffer = (offer: OfferSlide) => {
    setEditingOffer({ ...offer });
    setIsOfferModalOpen(true);
  };

  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;
    if (!editingOffer.description.trim() && !editingOffer.offerTitle?.trim()) {
      showToast('Please provide an offer title or description');
      return;
    }

    setLoading(true);
    try {
      const offerData = {
        badge: editingOffer.badge?.trim() || 'SPECIAL OFFER',
        offerTitle: editingOffer.offerTitle?.trim() || '',
        description: editingOffer.description.trim(),
        image: editingOffer.image.trim() || '/assets/special_offer_1.png',
        order: editingOffer.order ?? 0,
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'offers', editingOffer.id), offerData);

      const updated = [...offers];
      const idx = updated.findIndex(o => o.id === editingOffer.id);
      if (idx >= 0) {
        updated[idx] = { ...editingOffer, ...offerData };
      } else {
        updated.push({ ...editingOffer, ...offerData });
      }
      updated.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setOffers(updated);
      localStorage.setItem('gc_offers_slides_v3', JSON.stringify(updated));

      setIsOfferModalOpen(false);
      setEditingOffer(null);
      showToast('Special Offer Slide Saved & Synced to Cloud!');
    } catch (err) {
      console.error('Offer save error:', err);
      const updated = [...offers];
      const idx = updated.findIndex(o => o.id === editingOffer.id);
      if (idx >= 0) updated[idx] = editingOffer;
      else updated.push(editingOffer);
      setOffers(updated);
      localStorage.setItem('gc_offers_slides_v3', JSON.stringify(updated));
      setIsOfferModalOpen(false);
      showToast('Saved to local storage');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm('Delete this Special Offer Slide?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'offers', id));
      const filtered = offers.filter(o => o.id !== id);
      setOffers(filtered);
      localStorage.setItem('gc_offers_slides_v3', JSON.stringify(filtered));
      showToast('Offer deleted from cloud!');
    } catch (e) {
      const filtered = offers.filter(o => o.id !== id);
      setOffers(filtered);
      localStorage.setItem('gc_offers_slides_v3', JSON.stringify(filtered));
      showToast('Removed locally');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDefaultOffers = async () => {
    if (!window.confirm('Populate/Reset Special Offers with default showroom promotions?')) return;
    setLoading(true);
    try {
      for (let i = 0; i < DEFAULT_OFFERS.length; i++) {
        const item = DEFAULT_OFFERS[i];
        await setDoc(doc(db, 'offers', item.id), {
          badge: item.badge,
          offerTitle: item.offerTitle || '',
          description: item.description,
          image: item.image,
          order: i,
          updatedAt: serverTimestamp()
        });
      }
      setOffers(DEFAULT_OFFERS);
      localStorage.setItem('gc_offers_slides_v3', JSON.stringify(DEFAULT_OFFERS));
      showToast('Default Offers Seeded to Firebase!');
    } catch (err) {
      console.error('Seed offers error:', err);
      showToast('Updated local offers');
    } finally {
      setLoading(false);
    }
  };

  // Status toggle for enquiries
  const handleUpdateEnquiryStatus = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      await setDoc(doc(db, 'enquiries', id), { status: newStatus }, { merge: true });
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
      showToast(`Status updated to ${newStatus}`);
    } catch (e) {
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[60] bg-gradient-to-r from-[#0E1117] to-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={18} className="text-amber-400 animate-bounce" />
          <span className="text-[0.88rem] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Admin Modal Container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#FAFBFD] text-[#0E1117] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-black/10 flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0E1117] text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F15A24] to-amber-400 flex items-center justify-center shadow-orange-cta">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-extrabold text-[1.1rem] tracking-tight text-white">
                  GLOBAL COMPUTERS ADMIN DESK
                </h2>
                <span className="font-mono text-[0.62rem] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                  Connected Cloud
                </span>
              </div>
              <p className="text-[0.74rem] text-slate-400 font-mono">
                Hardware Slideshows &amp; Real-Time Inventory Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[0.74rem] font-mono text-slate-300 hover:text-white transition-colors"
                title="Lock admin session"
              >
                <Lock size={13} />
                <span>Lock Panel</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Auth Barrier Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F15A24] shadow-sm mb-4">
              <KeyRound size={32} />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#0E1117] mb-2">
              Showroom Management Access
            </h3>
            <p className="text-[0.88rem] text-[#64748B] max-w-md mb-6 leading-relaxed">
              Enter your authorized staff PIN to manage hardware gallery slides, promotional banners, and customer leads.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-3">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Passcode (e.g. gce2026)"
                  autoFocus
                  className="w-full px-4 py-3 bg-white border border-black/15 focus:border-[#F15A24] focus:ring-2 focus:ring-[#F15A24]/20 rounded-2xl text-center text-lg tracking-widest font-mono text-[#0E1117] outline-none shadow-sm transition-all"
                />
                {pinError && (
                  <p className="text-red-600 text-[0.78rem] font-mono mt-2 flex items-center justify-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-[#0E1117] font-heading font-extrabold text-[0.92rem] rounded-2xl shadow-yellow-cta transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock size={17} />
                <span>Unlock Control Desk</span>
              </button>

              <div className="text-[0.72rem] text-slate-400 font-mono text-center pt-2">
                Default Store PIN: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">gce2026</code>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Nav Tabs Navigation Bar */}
            <div className="flex items-center justify-between px-6 bg-white border-b border-black/[0.08] overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 py-2">
                
                {/* Hardware Gallery Slideshow Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2.5 rounded-xl font-heading font-bold text-[0.84rem] transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'gallery'
                      ? 'bg-gradient-to-r from-[#F15A24] to-[#EA580C] text-white shadow-orange-cta'
                      : 'text-[#4A5364] hover:bg-slate-100'
                  }`}
                >
                  <Layers size={16} />
                  <span>Hardware Gallery Slideshow</span>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[0.66rem] font-extrabold ${
                    activeTab === 'gallery' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {gallerySlides.length}
                  </span>
                </button>

                {/* Special Offers & Deals Slideshow Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('offers')}
                  className={`px-4 py-2.5 rounded-xl font-heading font-bold text-[0.84rem] transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'offers'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-[#0E1117] shadow-yellow-cta'
                      : 'text-[#4A5364] hover:bg-slate-100'
                  }`}
                >
                  <Flame size={16} className={activeTab === 'offers' ? 'text-[#0E1117]' : 'text-[#F15A24]'} />
                  <span>Offers &amp; Deals Slideshow</span>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[0.66rem] font-extrabold ${
                    activeTab === 'offers' ? 'bg-black/15 text-[#0E1117]' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {offers.length}
                  </span>
                </button>

                {/* Customer Enquiries Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('enquiries')}
                  className={`px-4 py-2.5 rounded-xl font-heading font-bold text-[0.84rem] transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'enquiries'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-[#4A5364] hover:bg-slate-100'
                  }`}
                >
                  <MessageSquare size={16} />
                  <span>Customer Inquiries</span>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[0.66rem] font-extrabold ${
                    activeTab === 'enquiries' ? 'bg-white/20 text-white' : 'bg-orange-100 text-[#F15A24]'
                  }`}>
                    {enquiries.length}
                  </span>
                </button>

              </div>

              {/* Quick Actions / Reset Tools */}
              <div className="flex items-center gap-2 py-2">
                {activeTab === 'gallery' && (
                  <>
                    <button
                      type="button"
                      onClick={handleSeedDefaultGallery}
                      className="px-3 py-1.5 rounded-lg border border-black/15 text-[#4A5364] hover:text-[#0E1117] hover:bg-slate-100 text-[0.74rem] font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Reset / Seed default showroom slides"
                    >
                      <RefreshCw size={13} />
                      <span className="hidden sm:inline">Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenAddSlide}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0E1117] hover:bg-slate-800 text-white font-heading font-bold text-[0.80rem] flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Gallery Slide</span>
                    </button>
                  </>
                )}

                {activeTab === 'offers' && (
                  <>
                    <button
                      type="button"
                      onClick={handleSeedDefaultOffers}
                      className="px-3 py-1.5 rounded-lg border border-black/15 text-[#4A5364] hover:text-[#0E1117] hover:bg-slate-100 text-[0.74rem] font-mono font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Reset default promotional offers"
                    >
                      <RefreshCw size={13} />
                      <span className="hidden sm:inline">Reset Offers</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenAddOffer}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-[#0E1117] font-heading font-bold text-[0.80rem] flex items-center gap-1.5 transition-all shadow-yellow-cta cursor-pointer"
                    >
                      <Plus size={15} />
                      <span>Add Offer Slide</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Tab Body Contents */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-140px)]">
              
              {/* ==================================================== */}
              {/* TAB 1: HARDWARE GALLERY SLIDESHOW MANAGER             */}
              {/* ==================================================== */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-[1.1rem] text-[#0E1117]">
                        Active Hardware Showcase Slides
                      </h3>
                      <p className="text-[0.78rem] text-slate-500">
                        Changes sync in real-time to the main website showroom gallery section.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[0.74rem] font-mono text-slate-400">
                        {gallerySlides.length} Items Live
                      </span>
                    </div>
                  </div>

                  {/* Slide Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallerySlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="bg-white rounded-2xl border border-black/10 hover:border-black/20 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                      >
                        {/* Accent Top Border */}
                        <div 
                          className="absolute top-0 left-0 right-0 h-1.5"
                          style={{ backgroundColor: slide.accentColor || '#F15A24' }}
                        />

                        <div>
                          {/* Image Thumbnail with Overlay Badges */}
                          <div className="relative w-full h-40 bg-slate-50 rounded-xl overflow-hidden mb-3 border border-black/5 flex items-center justify-center p-2">
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="max-h-full max-w-full object-contain drop-shadow-sm"
                            />
                            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white font-mono text-[0.60rem] px-2 py-0.5 rounded-md uppercase font-bold">
                              {slide.category}
                            </div>
                            <div className="absolute top-2 right-2 bg-white/90 text-[#0E1117] font-mono text-[0.62rem] px-2 py-0.5 rounded-md border border-black/10 font-bold shadow-2xs">
                              #{index + 1}
                            </div>
                          </div>

                          {/* Slide Meta */}
                          <div className="mb-2">
                            <div 
                              className="font-mono text-[0.62rem] font-extrabold tracking-wider uppercase mb-1"
                              style={{ color: slide.accentColor || '#F15A24' }}
                            >
                              {slide.tag}
                            </div>
                            <h4 className="font-heading font-bold text-[0.95rem] text-[#0E1117] leading-snug line-clamp-2">
                              {slide.title}
                            </h4>
                            <p className="text-[0.76rem] text-slate-500 line-clamp-2 mt-1">
                              {slide.subtitle}
                            </p>
                          </div>

                          {/* Specs Tags Preview */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {slide.specs.slice(0, 3).map((spec, i) => (
                              <span
                                key={i}
                                className="bg-slate-100 text-slate-700 text-[0.66rem] font-mono px-2 py-0.5 rounded-md"
                              >
                                {spec}
                              </span>
                            ))}
                            {slide.specs.length > 3 && (
                              <span className="bg-slate-100 text-slate-500 text-[0.66rem] font-mono px-1.5 py-0.5 rounded-md">
                                +{slide.specs.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions Bottom Bar */}
                        <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                          {/* Reorder Arrows */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleReorderSlide(index, 'up')}
                              disabled={index === 0}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Up"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReorderSlide(index, 'down')}
                              disabled={index === gallerySlides.length - 1}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Down"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>

                          {/* Edit / Delete Buttons */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditSlide(slide)}
                              className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#F15A24] font-heading font-bold text-[0.76rem] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteSlide(slide.id, slide.title)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Slide"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {gallerySlides.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-black/15 p-8">
                      <Layers size={36} className="mx-auto text-slate-400 mb-3" />
                      <h4 className="font-heading font-bold text-lg text-[#0E1117] mb-1">
                        No Hardware Slides Found
                      </h4>
                      <p className="text-[0.82rem] text-slate-500 max-w-sm mx-auto mb-4">
                        Add a new slide or click below to populate with default showroom items.
                      </p>
                      <button
                        type="button"
                        onClick={handleSeedDefaultGallery}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-[0.84rem] rounded-xl shadow-sm cursor-pointer"
                      >
                        Seed Default Slides
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: SPECIAL OFFERS & DEALS SLIDESHOW MANAGER       */}
              {/* ==================================================== */}
              {activeTab === 'offers' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-[1.1rem] text-[#0E1117]">
                        Active Promotional Offer Slides
                      </h3>
                      <p className="text-[0.78rem] text-slate-500">
                        Banner promotions shown in the Latest Offers &amp; Special Deals section.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[0.74rem] font-mono text-slate-400">
                        {offers.length} Offers Live
                      </span>
                    </div>
                  </div>

                  {/* Offers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {offers.map((offer, index) => (
                      <div
                        key={offer.id}
                        className="bg-white rounded-2xl border border-black/10 hover:border-black/20 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                      >
                        <div>
                          {/* Image with Badge */}
                          <div className="relative w-full h-44 bg-slate-50 rounded-xl overflow-hidden mb-3 border border-black/5 flex items-center justify-center p-2">
                            <img
                              src={offer.image}
                              alt={offer.offerTitle || 'Offer'}
                              className="max-h-full max-w-full object-contain"
                            />
                            {offer.badge && (
                              <div className="absolute top-2 left-2 bg-gradient-to-r from-[#F15A24] to-amber-500 text-white font-mono text-[0.60rem] px-2 py-0.5 rounded-full font-extrabold shadow-sm">
                                {offer.badge}
                              </div>
                            )}
                            <div className="absolute top-2 right-2 bg-white/90 text-[#0E1117] font-mono text-[0.62rem] px-2 py-0.5 rounded-md border border-black/10 font-bold">
                              #{index + 1}
                            </div>
                          </div>

                          {/* Titles */}
                          {offer.offerTitle && (
                            <h4 className="font-heading font-bold text-[0.95rem] text-[#0E1117] leading-snug mb-1">
                              {offer.offerTitle}
                            </h4>
                          )}
                          <p className="text-[0.78rem] text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                            {offer.description}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-black/10 flex items-center justify-between">
                          <span className="text-[0.66rem] font-mono text-slate-400">
                            Synced to Firebase
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditOffer(offer)}
                              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#0E1117] font-heading font-bold text-[0.76rem] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteOffer(offer.id)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Offer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {offers.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-black/15 p-8">
                      <Flame size={36} className="mx-auto text-amber-500 mb-3" />
                      <h4 className="font-heading font-bold text-lg text-[#0E1117] mb-1">
                        No Offer Slides Available
                      </h4>
                      <p className="text-[0.82rem] text-slate-500 max-w-sm mx-auto mb-4">
                        Add promotional banners or reset with default showroom deals.
                      </p>
                      <button
                        type="button"
                        onClick={handleSeedDefaultOffers}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-bold text-[0.84rem] rounded-xl shadow-sm cursor-pointer"
                      >
                        Seed Default Offers
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 3: CUSTOMER ENQUIRIES DESK                       */}
              {/* ==================================================== */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-heading font-extrabold text-[1.1rem] text-[#0E1117]">
                        Direct Customer Consultation Leads
                      </h3>
                      <p className="text-[0.78rem] text-slate-500">
                        Inquiries submitted through the website consultation form &amp; product availability modals.
                      </p>
                    </div>

                    {/* Search filter */}
                    <div className="relative w-full sm:w-64">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={enquirySearch}
                        onChange={(e) => setEnquirySearch(e.target.value)}
                        placeholder="Search by name, phone, product..."
                        className="w-full pl-9 pr-3 py-2 bg-white border border-black/15 rounded-xl text-[0.80rem] outline-none focus:border-[#F15A24]"
                      />
                    </div>
                  </div>

                  {/* Enquiry Cards */}
                  <div className="space-y-3">
                    {enquiries
                      .filter(enq => {
                        const term = enquirySearch.toLowerCase();
                        return (
                          (enq.name || '').toLowerCase().includes(term) ||
                          (enq.phone || '').toLowerCase().includes(term) ||
                          (enq.product || '').toLowerCase().includes(term) ||
                          (enq.requirement || '').toLowerCase().includes(term)
                        );
                      })
                      .map((enq) => {
                        const cleanPhone = (enq.phone || '').replace(/\D/g, '');
                        const waLink = cleanPhone 
                          ? `https://wa.me/91${cleanPhone.length === 10 ? cleanPhone : cleanPhone.slice(-10)}?text=${encodeURIComponent(`Hello ${enq.name || 'Customer'}, thank you for contacting Global Computers Eluru regarding "${enq.product || 'Hardware Consultation'}". How can we assist you today?`)}`
                          : '#';

                        return (
                          <div
                            key={enq.id}
                            className="bg-white rounded-2xl border border-black/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex-grow space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-heading font-bold text-[0.96rem] text-[#0E1117]">
                                  {enq.name || 'Unnamed Client'}
                                </span>
                                {enq.product && (
                                  <span className="bg-orange-50 text-[#F15A24] border border-orange-200 text-[0.66rem] font-mono font-bold px-2 py-0.5 rounded-md">
                                    {enq.product}
                                  </span>
                                )}
                                <span className={`text-[0.64rem] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  enq.status === 'resolved' 
                                    ? 'bg-emerald-100 text-emerald-800' 
                                    : enq.status === 'contacted'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-900'
                                }`}>
                                  {enq.status || 'New Lead'}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-[0.78rem] text-slate-600 font-mono flex-wrap">
                                {enq.phone && (
                                  <span className="flex items-center gap-1 font-bold text-slate-800">
                                    <Phone size={13} className="text-[#F15A24]" />
                                    {enq.phone}
                                  </span>
                                )}
                                {enq.email && (
                                  <span>{enq.email}</span>
                                )}
                              </div>

                              {enq.requirement && (
                                <p className="text-[0.82rem] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-black/5 mt-2">
                                  {enq.requirement}
                                </p>
                              )}
                            </div>

                            {/* Direct Connect Buttons */}
                            <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/5">
                              {cleanPhone && (
                                <>
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-[0.78rem] flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                                  >
                                    <MessageSquare size={14} />
                                    <span>WhatsApp Chat</span>
                                  </a>
                                  <a
                                    href={`tel:${cleanPhone}`}
                                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                                    title="Call Customer"
                                  >
                                    <Phone size={16} />
                                  </a>
                                </>
                              )}

                              {/* Status dropdown */}
                              <select
                                value={enq.status || 'new'}
                                onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as any)}
                                className="px-2.5 py-1.5 bg-white border border-black/15 rounded-xl text-[0.74rem] font-mono text-slate-700 cursor-pointer outline-none"
                              >
                                <option value="new">Status: New</option>
                                <option value="contacted">Status: Contacted</option>
                                <option value="resolved">Status: Resolved</option>
                              </select>
                            </div>
                          </div>
                        );
                      })}

                    {enquiries.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-black/15 p-8">
                        <MessageSquare size={36} className="mx-auto text-slate-400 mb-3" />
                        <h4 className="font-heading font-bold text-lg text-[#0E1117] mb-1">
                          No Enquiries Received Yet
                        </h4>
                        <p className="text-[0.82rem] text-slate-500 max-w-sm mx-auto">
                          When visitors fill out the consultation form or click "Inquire Availability", leads will appear here in real-time.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </>
        )}

      </div>

      {/* ========================================================== */}
      {/* MODAL: ADD / EDIT GALLERY SLIDE                            */}
      {/* ========================================================== */}
      {isSlideModalOpen && editingSlide && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-black/15 flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0E1117] text-white">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-[#F15A24]" />
                <h3 className="font-heading font-extrabold text-[1rem]">
                  {editingSlide.id.startsWith('slide_') ? 'Add New Hardware Gallery Slide' : 'Edit Hardware Slide'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSlideModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveSlide} className="p-6 overflow-y-auto space-y-4">
              
              {/* Category & Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                    Category Filter Pill
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      list="category-presets"
                      value={editingSlide.category}
                      onChange={(e) => setEditingSlide({ ...editingSlide, category: e.target.value.toUpperCase() })}
                      placeholder="e.g. CUSTOM WORKSTATIONS"
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-black/15 rounded-xl text-[0.84rem] font-mono text-[#0E1117] outline-none focus:border-[#F15A24]"
                    />
                    <datalist id="category-presets">
                      {PRESET_CATEGORIES.map(c => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                    Tag / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={editingSlide.tag}
                    onChange={(e) => setEditingSlide({ ...editingSlide, tag: e.target.value.toUpperCase() })}
                    placeholder="e.g. FLAGSHIP RIG ARCHITECTURE"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-black/15 rounded-xl text-[0.84rem] font-mono text-[#0E1117] outline-none focus:border-[#F15A24]"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                  Product Headline / Title
                </label>
                <input
                  type="text"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                  placeholder="e.g. Custom High-End Rigs & Creator Workstations"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 rounded-xl text-[0.90rem] font-semibold text-[#0E1117] outline-none focus:border-[#F15A24]"
                />
              </div>

              {/* Description / Subtitle */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                  Detailed Description / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                  placeholder="Hand-crafted precision assemblies built with Intel Core i9 / AMD Ryzen 9..."
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 rounded-xl text-[0.84rem] text-[#0E1117] outline-none focus:border-[#F15A24]"
                />
              </div>

              {/* Image Selection & Upload */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-black/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[0.72rem] font-mono font-bold text-slate-700 uppercase">
                    Slide Image Source
                  </label>
                  <span className="text-[0.66rem] font-mono text-slate-500">
                    Supports URL, Presets &amp; Direct Device Upload
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingSlide.image}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    placeholder="/assets/special_offer_1.png or https://..."
                    required
                    className="w-full px-3.5 py-2 bg-white border border-black/15 rounded-xl text-[0.80rem] font-mono outline-none focus:border-[#F15A24]"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleImageFileUpload(e, (dataUrl) => {
                      setEditingSlide({ ...editingSlide, image: dataUrl });
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-[0.74rem] font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-sm"
                  >
                    <Upload size={13} />
                    <span>Upload Image</span>
                  </button>
                </div>

                {/* Quick Presets Picker */}
                <div>
                  <div className="text-[0.66rem] font-mono text-slate-500 mb-1">
                    Or select from Showroom Asset Presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-white rounded-xl border border-black/5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditingSlide({ ...editingSlide, image: preset.url })}
                        className={`text-[0.68rem] px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                          editingSlide.image === preset.url
                            ? 'bg-[#F15A24] text-white border-[#F15A24]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-black/10'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview Box */}
                {editingSlide.image && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-black/10">
                    <img
                      src={editingSlide.image}
                      alt="Preview"
                      className="w-16 h-12 object-contain bg-slate-100 rounded-lg p-1"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="text-[0.72rem] text-slate-600 truncate font-mono">
                      Image Preview Active
                    </div>
                  </div>
                )}
              </div>

              {/* Hardware Specifications Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase">
                    Hardware Highlights &amp; Specifications
                  </label>
                  <button
                    type="button"
                    onClick={() => setEditingSlide({
                      ...editingSlide,
                      specs: [...editingSlide.specs, 'New Hardware Feature']
                    })}
                    className="text-[0.70rem] font-mono text-[#F15A24] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>Add Spec Tag</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingSlide.specs.map((spec, specIdx) => (
                    <div key={specIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={spec}
                        onChange={(e) => {
                          const updated = [...editingSlide.specs];
                          updated[specIdx] = e.target.value;
                          setEditingSlide({ ...editingSlide, specs: updated });
                        }}
                        placeholder={`Specification #${specIdx + 1}`}
                        className="flex-grow px-3 py-2 bg-slate-50 border border-black/15 rounded-xl text-[0.80rem] outline-none focus:border-[#F15A24]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingSlide.specs.filter((_, i) => i !== specIdx);
                          setEditingSlide({ ...editingSlide, specs: updated });
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accent Color Picker */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1.5">
                  Visual Glow &amp; Theme Color Accent
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {COLOR_ACCENTS.map((col) => (
                    <button
                      key={col.value}
                      type="button"
                      onClick={() => setEditingSlide({ ...editingSlide, accentColor: col.value })}
                      className={`px-3 py-1.5 rounded-xl font-mono text-[0.70rem] font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                        editingSlide.accentColor === col.value
                          ? 'border-black ring-2 ring-black/20 text-[#0E1117] bg-white shadow-sm'
                          : 'border-black/10 text-slate-600 bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: col.value }}
                      />
                      <span>{col.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-black/15 text-[#4A5364] font-heading font-bold text-[0.84rem] hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F15A24] to-[#EA580C] text-white font-heading font-bold text-[0.86rem] shadow-orange-cta hover:shadow-orange-cta-hover transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check size={16} />
                  <span>{loading ? 'Saving to Cloud...' : 'Save & Publish Slide'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: ADD / EDIT PROMOTIONAL OFFER SLIDE                  */}
      {/* ========================================================== */}
      {isOfferModalOpen && editingOffer && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-black/15 flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#0E1117] text-white">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-amber-400" />
                <h3 className="font-heading font-extrabold text-[1rem]">
                  {editingOffer.id.startsWith('offer_') ? 'Add Special Offer Promotion' : 'Edit Special Offer'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveOffer} className="p-6 overflow-y-auto space-y-4">
              
              {/* Badge */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                  Promotional Badge Pill
                </label>
                <input
                  type="text"
                  value={editingOffer.badge}
                  onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value.toUpperCase() })}
                  placeholder="e.g. EXCLUSIVE SHOWROOM DEAL / MEGA COMBO DEAL"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-black/15 rounded-xl text-[0.84rem] font-mono text-[#0E1117] outline-none focus:border-amber-500"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                  Offer Title Headline
                </label>
                <input
                  type="text"
                  value={editingOffer.offerTitle || ''}
                  onChange={(e) => setEditingOffer({ ...editingOffer, offerTitle: e.target.value })}
                  placeholder="e.g. Creator Studio 4K Workstation Bundle"
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 rounded-xl text-[0.90rem] font-semibold text-[#0E1117] outline-none focus:border-amber-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[0.72rem] font-mono font-bold text-slate-600 uppercase mb-1">
                  Offer Details &amp; Discount Description
                </label>
                <textarea
                  rows={3}
                  value={editingOffer.description}
                  onChange={(e) => setEditingOffer({ ...editingOffer, description: e.target.value })}
                  placeholder="Special Festive Discount: Intel Core i9 14th Gen + RTX 4080 Super with ₹45,000 Instant Savings."
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-black/15 rounded-xl text-[0.84rem] text-[#0E1117] outline-none focus:border-amber-500"
                />
              </div>

              {/* Image */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-black/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[0.72rem] font-mono font-bold text-slate-700 uppercase">
                    Banner / Product Image
                  </label>
                  <span className="text-[0.66rem] font-mono text-slate-500">
                    File Upload or URL
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingOffer.image}
                    onChange={(e) => setEditingOffer({ ...editingOffer, image: e.target.value })}
                    placeholder="/assets/special_offer_1.png or URL"
                    required
                    className="w-full px-3.5 py-2 bg-white border border-black/15 rounded-xl text-[0.80rem] font-mono outline-none focus:border-amber-500"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="offer-image-upload"
                    onChange={(e) => handleImageFileUpload(e, (dataUrl) => {
                      setEditingOffer({ ...editingOffer, image: dataUrl });
                    })}
                  />
                  <label
                    htmlFor="offer-image-upload"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-[0.74rem] font-bold flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-sm"
                  >
                    <Upload size={13} />
                    <span>Upload</span>
                  </label>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto p-1 bg-white rounded-xl border border-black/5">
                  {PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditingOffer({ ...editingOffer, image: preset.url })}
                      className={`text-[0.68rem] px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                        editingOffer.image === preset.url
                          ? 'bg-amber-400 text-slate-950 font-bold border-amber-500'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-black/10'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Preview */}
                {editingOffer.image && (
                  <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-black/10">
                    <img
                      src={editingOffer.image}
                      alt="Preview"
                      className="w-16 h-12 object-contain bg-slate-100 rounded-lg p-1"
                    />
                    <div className="text-[0.72rem] text-slate-600 truncate font-mono">
                      Image Ready
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-black/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOfferModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-black/15 text-[#4A5364] font-heading font-bold text-[0.84rem] hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-[#0E1117] font-heading font-extrabold text-[0.86rem] shadow-yellow-cta hover:shadow-yellow-hover transition-all cursor-pointer flex items-center gap-2"
                >
                  <Check size={16} />
                  <span>{loading ? 'Saving...' : 'Save & Publish Offer'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
