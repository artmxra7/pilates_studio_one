// ClassCard.jsx
import React from 'react';
import { ProfileIcon} from '@/assets/icons/svg';

const ClassCard = ({
  imageSrc = "https://booking.apluspilates.id/images/class-default.jpg",
  title = "Sculpt Burn",
  studio = "Studio Canggu",
  instructor = "Reformer Z",
  date = "05 Dec 2025",
  time = "07:00 AM",
  priceOriginal = 200000,
  priceDiscounted = 100000,
  availableSlots = 5,
  description = "Tighten and burn. Focus on repetitions, activating the glutes, core, and upper body dynamically.",
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <div className="class-card bg-lux-black rounded-xl overflow-hidden shadow-2xl border border-lux-gold/10">
      {/* Image */}
      <img
        src={imageSrc.trim()}
        alt={title}
        className="class-image w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="class-content p-5 text-lux-cream">
        <h3 className="class-title text-xl font-serif font-bold mb-3 text-lux-gold">{title}</h3>

        <div className="class-meta space-y-1.5 text-sm">
          <div className="meta-item flex items-center gap-2">
            {/* <ProfileIcon className="w-4 h-4" /> */}
            <span>{instructor}</span> {/* ✅ instructor, bukan studio */}
          </div>
          <div className="meta-item flex items-center gap-2">
         
            <span>{studio}</span>
          </div>
          <div className="meta-item flex items-center gap-2">
            <span>{date} - {time}</span>
          </div>
          <div className="meta-item flex items-center gap-2">
            <svg className="w-4 h-4 text-lux-gold" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.433 7.418c.157-.157.395-.157.552 0 .157.158.157.395 0 .552L7.268 9.687l1.717 1.717c.157.157.157.395 0 .552-.157.157-.395.157-.552 0L6.717 10.24l-1.717 1.717c-.157.157-.395.157-.552 0-.157-.157-.157-.395 0-.552L6.165 9.687 4.448 7.97c-.157-.157-.157-.395 0-.552.157-.157.395-.157.552 0L6.717 9.134l1.716-1.716z" />
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 2v10h12V6H4z" clipRule="evenodd" />
            </svg>
            <span>{formatCurrency(priceDiscounted)}</span>
          </div>
        </div>

        <p className="class-description mt-3 text-lux-cream/80 text-sm leading-relaxed">
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </p>

        <div className="class-price mt-3 flex items-baseline gap-2">
          <span className="original-price line-through text-lux-cream/60 text-sm">
            {formatCurrency(priceOriginal)}
          </span>
          <span className="discounted-price text-lux-gold font-bold text-lg">
            {formatCurrency(priceDiscounted)}
          </span>
        </div>

        <div className="class-actions mt-4">
          <button className="hero-button w-full py-2 bg-lux-gold text-lux-black font-sans font-medium rounded tracking-wide hover:bg-opacity-90 transition">
            Book Now
          </button>
        </div>

        <div className="available-slots mt-3 text-xs text-lux-cream/70">
          Available Slots: {availableSlots}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;