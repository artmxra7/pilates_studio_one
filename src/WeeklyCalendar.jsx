// WeeklyCalendar.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  startOfWeek,
  addDays,
  isSameDay,
  subWeeks,
  addWeeks,
  format,
} from 'date-fns';

const WeeklyCalendar = ({ selectedDate, onDateSelect, currentMonth }) => {
  // ✅ Validasi: pastikan selectedDate valid
  const validSelectedDate = selectedDate instanceof Date && !isNaN(selectedDate)
    ? selectedDate
    : new Date();

  const todayRef = useRef(new Date());
  const today = todayRef.current;

  // ✅ Gunakan validSelectedDate
  const initialWeekStart = useMemo(() => {
    return startOfWeek(validSelectedDate, { weekStartsOn: 1 });
  }, [validSelectedDate]);

  const [currentWeekStart, setCurrentWeekStart] = useState(initialWeekStart);

  useEffect(() => {
    const newWeekStart = startOfWeek(validSelectedDate, { weekStartsOn: 1 });
    setCurrentWeekStart(newWeekStart);
  }, [validSelectedDate]);

  const daysInWeek = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i)),
    [currentWeekStart]
  );

  const minWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const isPrevDisabled = currentWeekStart.getTime() <= minWeekStart.getTime();

  const handlePrevWeek = () => {
    if (!isPrevDisabled) {
      setCurrentWeekStart((prev) => subWeeks(prev, 1));
    }
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const isToday = (date) => isSameDay(date, today);
  const isSelected = (date) => isSameDay(date, validSelectedDate);

  return (
    <div className="weekly-calendar" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
      <button
        onClick={handlePrevWeek}
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
        aria-label="Previous week"
      >
        ‹
      </button>

      <div className="days-container" style={{ display: 'flex', gap: '8px' }}>
        {daysInWeek.map((date, index) => (
          <div
            key={date.toDateString()}
            onClick={() => onDateSelect(date)}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: isSelected(date)
                ? '#9C6A42'
                : isToday(date)
                  ? '#e0e0e0'
                  : 'transparent',
              color: isSelected(date) ? 'white' : '#333',
              minWidth: '40px',
            }}
          >
            <div className="day-name" style={{ fontSize: '12px', fontWeight: '500' }}>
              {format(date, 'EEE')}
            </div>
            <div className="day-number" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {format(date, 'd')}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNextWeek}
        style={{
          background: '#f0f0f0',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
        }}
        aria-label="Next week"
      >
        ›
      </button>
    </div>
  );
};

export default WeeklyCalendar;