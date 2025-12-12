// CalendarComponent.jsx
import React, { useState, useEffect } from 'react';
import WeeklyCalendar from './WeeklyCalendar';

const CalendarComponent = ({ onOpenFilter }) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [currentMonth, setCurrentMonth] = useState(startOfMonth);
  const [selectedDate, setSelectedDate] = useState(today);

  // 🔁 Sinkronkan selectedDate saat bulan berubah → hanya sekali
  useEffect(() => {
    const day = selectedDate.getDate();
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

    // Log hanya untuk debugging
    console.log('📅 Bulan berpindah →', currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' }));
    console.log('🔄 Tanggal disesuaikan →', newDate.toDateString());

    setSelectedDate(newDate);
  }, [currentMonth]); // ✅ Hanya currentMonth, BUKAN selectedDate

  const handlePrev = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    if (prev >= startOfMonth) {
      setCurrentMonth(prev);
    }
  };

  const handleNext = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const isPrevDisabled = currentMonth.getTime() <= startOfMonth.getTime();

  const monthLabel = currentMonth.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div style={{ padding: '16px', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handlePrev}
            disabled={isPrevDisabled}
            style={{
              background: isPrevDisabled ? '#e0e0e0' : '#f0f0f0',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: isPrevDisabled ? 'not-allowed' : 'pointer',
              opacity: isPrevDisabled ? 0.5 : 1,
            }}
          >
            {'<'}
          </button>

          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{monthLabel}</span>

          <button
            onClick={handleNext}
            style={{
              background: '#f0f0f0',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
            }}
          >
            {'>'}
          </button>
        </div>
      </div>

      {/* Kirim selectedDate & currentMonth ke WeeklyCalendar */}
      <WeeklyCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        currentMonth={currentMonth}
      />
    </div>
  );
};

export default CalendarComponent;