// WeeklyCalendar.jsx
import React, { useState, useEffect } from 'react';
import {
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameWeek,
  addWeeks,
  subWeeks,
  format,
} from 'date-fns';

const WeeklyCalendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday sebagai awal minggu
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate 7 hari dari currentWeekStart
  const daysInWeek = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const today = new Date();

  // Update selectedDate jika minggu berubah dan selectedDate tidak lagi di minggu ini
  useEffect(() => {
    if (!isSameWeek(selectedDate, currentWeekStart, { weekStartsOn: 1 })) {
      setSelectedDate(today);
    }
  }, [currentWeekStart, selectedDate, today]);

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const isToday = (date) => isSameDay(date, today);
  const isSelected = (date) => isSameDay(date, selectedDate);

  return (
    <div className="weekly-calendar">
      <button className="nav-button prev" onClick={handlePrevWeek}>
        ‹
      </button>

      <div className="days-container">
        {daysInWeek.map((date, index) => (
          <div
            key={index}
            className={`day-item ${isSelected(date) ? 'selected' : ''
              } ${isToday(date) ? 'today' : ''}`}
            onClick={() => setSelectedDate(date)}
          >
            <div className="day-name">{format(date, 'EEE')}</div>
            <div className="day-number">{format(date, 'd')}</div>
          </div>
        ))}
      </div>

      <button className="nav-button next" onClick={handleNextWeek}>
        ›
      </button>
    </div>
  );
};

export default WeeklyCalendar;