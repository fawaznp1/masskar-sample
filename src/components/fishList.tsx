import React, { useState } from 'react';
import fishData from './fishData';
import FishCard from './fishCard';
import Cart from './Cart';
import { Button } from '@mui/material';

const FishList: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState('All');

  const handleAddToCart = (item: { fish: any; quantity: number; cleaningMethod: string }) => {
    console.log('Added to cart:', item);
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setShowCart(true);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sort fishData by price in ascending order 
  const sortedFishData = [...fishData].sort((a, b) => a.pricePerKg - b.pricePerKg);

  // Determine which data to display
  const displayData = activeTab === 'Low Price' ? sortedFishData : fishData;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        flex: isMobile ? 'none' : 3,
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignContent: 'center',
        overflowY: 'auto',
        width: isMobile ? '100%' : undefined
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
          gap: '8px'
        }}>
          <Button 
            variant={activeTab === 'All' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('All')}
            className="px-6 py-2 font-medium rounded-full transition-all duration-200 hover:shadow-md"
          >
            All
          </Button>
          <Button 
            variant={activeTab === 'Offers' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('Offers')}
            className="px-6 py-2 font-medium rounded-lg transition-all duration-200 hover:shadow-md"
          >
            Offers
          </Button>
          <Button 
            variant={activeTab === 'Low Price' ? 'contained' : 'outlined'}
            onClick={() => setActiveTab('Low Price')}
            className="px-6 py-2 font-medium rounded-full transition-all duration-200 hover:shadow-md"
          >
            Low Price
          </Button>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center'
        }}>
          {activeTab === 'Offers' ? (
       <div className="w-full text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
  <div className="text-gray-400 text-lg font-medium">No offers right now</div>
</div>
          ) : (
            displayData.map((fish) => (
              <FishCard key={fish.id} fish={fish} onAddToCart={handleAddToCart} />
            ))
          )}
        </div>
      </div>
      
      <div style={{
        flex: isMobile ? 'none' : 1,
        padding: '16px',
        borderLeft: isMobile ? 'none' : '1px solid #eee',
        overflowY: 'auto',
        width: isMobile ? '100%' : undefined,
        display: isMobile ? (showCart ? 'block' : 'none') : 'block',
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 0 : undefined,
        right: isMobile ? 0 : undefined,
        height: isMobile ? '100vh' : undefined,
        backgroundColor: isMobile ? 'white' : undefined,
        zIndex: isMobile ? 999 : undefined,
        boxShadow: isMobile ? '0 0 10px rgba(0,0,0,0.2)' : undefined
      }}>
        {isMobile && (
          <Button 
            onClick={() => setShowCart(false)}
            style={{ position: 'absolute', right: '10px', top: '10px' }}
            className="min-w-0 w-8 h-8 p-0 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xl"
          >
            ×
          </Button>
        )}
        <Cart />
      </div>
    </div>
  );
};

export default FishList;