// src/components/FilterDrawer.jsx
import React, { Fragment, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const FilterDrawer = ({ isOpen, onClose }) => {
  // ✅ SEMUA HOOKS DI LEVEL ATAS — TANPA KONDISI
  const drawerRef = useRef(null);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  // ✅ Reset offset saat drawer dibuka
  useEffect(() => {
    if (isOpen) {
      setDragOffset(0);
    }
  }, [isOpen]);

  const handleClose = () => {
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
      setDragOffset(deltaY);
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    const threshold = 80;
    if (dragOffset > threshold) {
      handleClose();
    } else {
      setDragOffset(0);
    }
    isDragging.current = false;
  };

  // === Touch Events ===
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

  // === Mouse Events ===
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientY);

    const onMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientY);
    };

    const onMouseUp = () => {
      handleEnd();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Jangan render jika tertutup
  if (!isOpen) return null;

  return createPortal(
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
        onClick={handleClose}
        style={{ opacity: 1, pointerEvents: 'auto' }}
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
          userSelect: 'none', // mencegah seleksi teks saat drag
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
                <input type="checkbox" defaultChecked className="sr-only peer" />
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
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C6A42] focus:border-[#9C6A42] outline-none">
              <option value="">Select a location</option>
              <option value="canggu">Studio Canggu</option>
              <option value="seminyak">Studio Seminyak</option>
              <option value="ubud">Studio Ubud</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9C6A42] focus:border-[#9C6A42] outline-none">
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