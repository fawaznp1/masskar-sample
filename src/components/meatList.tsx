import React, { useState } from 'react';
import meatData from './meatData';
import MeatCard from './meatCard';
import Cart from './Cart';
import { Button } from '@mui/material';

const MeatList: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState('All');

  const handleAddToCart = (item: { meat: any; quantity: number; cleaningMethod: string }) => {
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

  const sortedMeatData = [...meatData].sort((a, b) => a.pricePerKg - b.pricePerKg);

  const displayData = activeTab === 'Low Price' ? sortedMeatData : meatData;

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        flex: isMobile ? '1 1 auto' : 4,
        padding: '1px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
        alignContent: 'center',
        overflowY: 'auto',
        width: isMobile ? '100%' : '100%',
        height: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '16px',
          gap: '8px',
        }}>
          <Button 
            style={{
              backgroundColor: activeTab === 'All' ? 'teal' : 'white',
              color: activeTab === 'All' ? 'white' : 'teal',
              border: '1px solid teal',
              borderRadius: "25px"
            }}
            onClick={() => setActiveTab('All')}
            className="px-6 py-2 font-medium  rounded-full transition-all duration-200 hover:shadow-md"
          >
            All
          </Button>
          <Button 
            style={{
              backgroundColor: activeTab === 'Offers' ? 'teal' : 'white',
              color: activeTab === 'Offers' ? 'white' : 'teal',
              border: '1px solid teal',
              borderRadius: "25px"
            }}
            onClick={() => setActiveTab('Offers')}
            className="px-6 py-2 font-medium rounded-full transition-all duration-200 hover:shadow-md"
          >
            Offers
          </Button>
          <Button 
            style={{
              backgroundColor: activeTab === 'Low Price' ? 'teal' : 'white',
              color: activeTab === 'Low Price' ? 'white' : 'teal',
              border: '1px solid teal',
              borderRadius: "25px"
            }}
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
          justifyContent: 'center',
          minHeight: '0' 
        }}>
          {activeTab === 'Offers' ? (
            <div className="w-full text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-gray-400 text-lg font-medium">Currently we have no offers</div>
            </div>
          ) : (
            displayData.map((meat) => (
              <MeatCard key={meat.id} meat={meat} onAddToCart={handleAddToCart} />
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
        height: isMobile ? '100vh' : '100%',
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

export default MeatList;