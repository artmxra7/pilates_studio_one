// ClassCard.jsx
import React from 'react';

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
    <div className="class-card">
      {/* Image */}
      <img src={imageSrc} alt={title} className="class-image" />

      {/* Content */}
      <div className="class-content">
        <h3 className="class-title">{title}</h3>

        <div className="class-meta">
          <div className="meta-item">
            <span role="img" aria-label="location">📍</span> {studio}
          </div>
          <div className="meta-item">
            <span role="img" aria-label="instructor">❤️</span> {instructor}
          </div>
          <div className="meta-item">
            <span role="img" aria-label="date">📅</span> {date} - {time}
          </div>
          <div className="meta-item">
            <span role="img" aria-label="price">💰</span> {studio} {/* Catatan: biasanya ini nama instruktur atau kategori, tapi di contoh Anda tertulis "Ruben". Saya ganti jadi studio dulu. Kalau ingin "Ruben", ganti saja */}
          </div>
        </div>

        <p className="class-description">
          {description.length > 100 ? description.substring(0, 100) + '...' : description}
        </p>

        <div className="class-price">
          <span className="original-price">{formatCurrency(priceOriginal)}</span>
          <span className="discounted-price">{formatCurrency(priceDiscounted)}</span>
        </div>

        <div className="class-actions">
          {/* <button className="btn btn-add-to-cart">Add to Cart</button> */}
          <button className="btn btn-book-now">Book Now</button>
        </div>

        <div className="available-slots">
          Available Slots: {availableSlots}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;