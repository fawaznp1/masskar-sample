import React from 'react';
import fishData from './fishData';
import FishCard from './fishCard';

const FishList: React.FC = () => {
  const handleAddToCart = (item: { fish: any; quantity: number; cleaningMethod: string }) => {
    console.log('Added to cart:', item);
    alert('Added to cart')
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
      {fishData.map((fish) => (
        <FishCard key={fish.id} fish={fish} onAddToCart={handleAddToCart} />
      ))}
    </div>
  ); 
};

export default FishList;
