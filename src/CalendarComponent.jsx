// CalendarComponent.jsx
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import WeeklyCalendar from './WeeklyCalendar';

const CalendarComponent = ({ onOpenFilter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format nama hari (Mon, Tue, Wed...)
  const formatWeekdayName = (date) => {
    return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
  };

  // Custom styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '16px',
      backgroundColor: '#fff',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    monthNav: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    monthLabel: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    navButton: {
      background: '#f0f0f0',
      border: 'none',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    filtersButton: {
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '20px',
      padding: '8px 16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    cartButton: {
      background: '#fff',
      border: '1px solid #ddd',
      borderRadius: '50%',
      width: '32px',
      height: '32px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    day: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    selectedDay: {
      background: '#9C6A42',
      color: 'white',
    },
    weekRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    dayLabel: {
      fontSize: '12px',
      textAlign: 'center',
      marginBottom: '4px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.monthNav}>
          <button style={styles.navButton} onClick={() => { /* handle prev month */ }}>
            {'<'}
          </button>
          <span style={styles.monthLabel}>December 2025</span>
          <button style={styles.navButton} onClick={() => { /* handle next month */ }}>
            {'>'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onOpenFilter} style={styles.filtersButton}>
            <span>🪄</span> Filters
          </button>
          <button style={styles.cartButton}>🛒</button>
        </div>
      </div>

      <WeeklyCalendar />
    </div>
  );
};

export default CalendarComponent;