import React, { useEffect } from 'react';
import { X, ArrowRight, Calendar, Tag, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface NewsStory {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  fullContent: string[];
  image: string;
  imageAlt: string;
  tag: string;
  highlights: string[];
  productInquiryName?: string;
}

interface NewsModalProps {
  story: NewsStory | null;
  onClose: () => void;
  onInquire: (productName: string) => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({
  story,
  onClose,
  onInquire,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && story) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/10 shadow-[0_30px_70px_-15px_rgba(15,23,42,0.3)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="p-6 pb-4 border-b border-black/[0.06] flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.68rem] font-extrabold tracking-wider bg-[#FFF0F1] text-[#E51E2B] px-2.5 py-1 rounded-full uppercase">
              {story.category}
            </span>
            <div className="flex items-center gap-1.5 text-[#828E9E] font-mono text-[0.72rem]">
              <Calendar size={13} />
              <span>{story.date}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#828E9E] hover:text-[#0E1117] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close story modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Headline */}
          <div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0E1117] leading-tight mb-3">
              {story.title}
            </h2>
            <p className="text-[1rem] text-[#4A5364] leading-relaxed">
              {story.description}
            </p>
          </div>

          {/* Visual Showcase Box */}
          <div className="relative bg-gradient-to-b from-slate-50 to-slate-100/80 rounded-2xl p-6 border border-black/[0.06] overflow-hidden flex items-center justify-center">
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,30,43,0.06),transparent_70%)]" />
            <img
              src={story.image}
              alt={story.imageAlt}
              className="relative z-10 max-h-[220px] w-auto object-contain drop-shadow-[0_20px_35px_rgba(15,23,42,0.18)]"
            />
          </div>

          {/* Key Article Content */}
          <div className="space-y-3.5 text-[#333D4B] text-[0.94rem] leading-relaxed">
            {story.fullContent.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Highlights Bullet Cards */}
          {story.highlights && story.highlights.length > 0 && (
            <div className="bg-[#FFF0F1]/50 border border-[#E51E2B]/15 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-[#E51E2B] font-heading font-bold text-[0.84rem] uppercase tracking-wider">
                <ShieldCheck size={16} />
                <span>Showroom Highlights &amp; Assurance</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {story.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[0.84rem] text-[#0E1117]">
                    <CheckCircle2 size={15} className="text-[#E51E2B] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-6 bg-white border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[0.82rem] text-[#828E9E]">
            <Tag size={14} className="text-[#E51E2B]" />
            <span>Available at Global Computers Eluru Showroom</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire(story.productInquiryName || story.title);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-[#E51E2B] hover:bg-[#D11724] active:bg-[#BA121E] text-white font-semibold text-[0.92rem] rounded-xl flex items-center justify-center gap-2 shadow-red-cta transition-all hover:shadow-red-hover hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Inquire About This Hardware</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
