import { useState } from 'react';
import './App.css';
import CalendarComponent from './CalendarComponent';
import ClassCard from './ClassCard';
import FilterDrawer from './FilterDrawer';

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const openFilter = () => setIsFilterOpen(true);
  const closeFilter = () => setIsFilterOpen(false);
  return (
    // Container utama: full width, full height, background abu-abu
    <div className="min-h-screen bg-stone-200">
      {/* Konten utama: lebar maks 375px (ukuran iPhone), terpusat, tanpa latar luar */}
      <div className="max-w-[535px] h-full mx-auto min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-amber-100 flex flex-col items-center space-y-2 justify-center mx-auto py-12">
          <img className='max-w-[300px] h-full' src='https://booking.apluspilates.id/images/logo.png'></img>
          <p>A Plus Pilates Booking</p>
        </div>

        {/* Promo */}
        <div className="p-4 text-center">
          <div className='flex flex-col items-center bg-white mx-6 rounded-lg shadow-md p-4'>
          <p className="text-sm mb-2">"Ready to feel stronger and more balanced? Book your Pilates class now!"</p>
          <button className="bg-amber-600 text-white px-3 py-1 rounded text-sm">
            Book Private Class
          </button>
          </div>
        </div>
        <div>
          <div className='sticky top-0 z-20 bg-white/50 shadow-md backdrop-blur-md'>
            <CalendarComponent onOpenFilter={openFilter} />

          </div>
          <div className="flex justify-between mt-8 mx-4 items-baseline">
            <h1 className="text-xl font-semibold">Available Class</h1>
            <p className="text-gray-500 text-sm">24 Class Found</p>
          </div>
          <div className='flex flex-col gap-4 mt-4 mx-4'>
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </div>
        </div>
      </div>
      <FilterDrawer isOpen={isFilterOpen} onClose={closeFilter} />
    </div>
  );
}


export default App;
