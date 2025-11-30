import { useState } from 'react';
import './App.css';

function App() {
  return (
    // Container utama: full width, full height, background abu-abu
    <div className="min-h-screen bg-stone-200">
      {/* Konten utama: lebar maks 375px (ukuran iPhone), terpusat, tanpa latar luar */}
      <div className="max-w-[535px] mx-auto min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-amber-100 py-3 text-center">
          <h1 className="font-bold text-amber-800">A PLUS PILATES BALI</h1>
        </div>

        {/* Promo */}
        <div className="p-4 text-center">
          <p className="text-sm mb-2">"Ready to feel stronger..."</p>
          <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm">
            Book Private Class
          </button>
        </div>

        {/* DatePicker & Class Cards akan di sini */}
      </div>
    </div>
  );
}

export default App;