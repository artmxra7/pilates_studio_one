// src/components/FilterDrawer.jsx
import React, { Fragment, useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const FilterDrawer = ({ isOpen, onClose }) => {
  const drawerRef = useRef(null);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const threshold = 300; // cukup 60px untuk swipe-to-close yang responsif
  const dragOffsetRef = useRef(0);
  // Di dalam FilterDrawer component
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    // Opsional: kirim ke parent via props jika perlu
    // onFilterChange({ location: e.target.value, category: selectedCategory });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Opsional: kirim ke parent
    // onFilterChange({ location: selectedLocation, category: e.target.value });
  };

  // Reset offset & cegah scroll saat drawer terbuka
  useEffect(() => {
    if (isOpen) {
      setDragOffset(0);
      document.body.style.overscrollBehavior = 'contain';
    } else {
      document.body.style.overscrollBehavior = '';
    }

    return () => {
      document.body.style.overscrollBehavior = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setDragOffset(0);
    setSelectedLocation('');
    setSelectedCategory('');
    onClose();
  };

  const handleStart = (clientY) => {
    startY.current = clientY;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleMove = (clientY) => {
    if (!isDragging.current) return;
    const deltaY = clientY - startY.current;
    if (deltaY > 0) {
      const newOffset = deltaY;
      setDragOffset(deltaY);
      dragOffsetRef.current = newOffset;
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    console.log(dragOffsetRef.current)
    if (dragOffsetRef.current > threshold) {
      handleClose();
    } else {
      setDragOffset(0);
      dragOffsetRef.current = 0;
    }

    isDragging.current = false;
  };

  // 🖱️ Mouse Events (dengan useCallback untuk kestabilan)
  const handleMouseMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.clientY);
  }, []);

  const handleMouseUp = useCallback(() => {
    handleEnd();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // hanya left-click
    e.preventDefault();
    handleStart(e.clientY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // 👆 Touch Events
  const handleTouchStart = (e) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Jangan render jika tertutup
  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-2xl shadow-2xl"
        style={{
          maxHeight: '85vh',
          transform: `translateY(${dragOffset}px)`,
          transition: isDragging.current
            ? 'none'
            : 'transform 0.3s cubic-bezier(0.33, 1, 0.68, 1)',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Handle indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Konten */}
        <div className="px-5 pb-5">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-bold text-gray-800">Filter Classes</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              aria-label="Close filter"
            >
              &times;
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Filter classes by location, category, class, and instructor
          </p>

          <hr className="border-gray-200 my-4" />

          {/* Toggle: Show Available Classes */}
          <div className="mb-5">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <div className="mt-1">
                <input onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()} type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 flex items-center rounded-full peer bg-gray-300 peer-checked:bg-[#9C6A42] transition-colors duration-200">
                  <div className="w-5 h-5 rounded-full bg-white mx-0.5 transition-transform duration-200 peer-checked:translate-x-5"></div>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">Show Available Classes</p>
                <p className="text-xs text-gray-500">See only classes with open slots.</p>
              </div>
            </label>
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Location */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Location</p>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C6A42] focus:border-[#9C6A42] outline-none"
              value={selectedLocation}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onChange={handleLocationChange}>
              <option value="">Select a location</option>
              <option value="canggu">Studio Canggu</option>
              <option value="seminyak">Studio Seminyak</option>
              <option value="ubud">Studio Ubud</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C6A42] focus:border-[#9C6A42] outline-none"
              value={selectedCategory}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              <option value="pilates">Pilates</option>
              <option value="yoga">Yoga</option>
              <option value="barre">Barre</option>
            </select>
          </div>

          {/* Spacer */}
          <div className="h-6"></div>
        </div>
      </div>
    </Fragment>,
    document.body
  );
};

export default FilterDrawer;