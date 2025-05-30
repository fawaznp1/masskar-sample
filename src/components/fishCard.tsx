import React, { useState } from 'react';



type CleaningMethod = 'Headless' | 'Gutted' | 'Fillet' | 'Steaks' | 'Whole';

type FishData = {
  id: number;
  name: string;
  image: string;
  pricePerKg: number; 
  minWeight: number; // in kg
  description: string;
  cleaningOptions: CleaningMethod[];
};

type FishCardProps = {
  fish: FishData;
  onAddToCart: (item: {
    fish: FishData;
    quantity: number;
    cleaningMethod: CleaningMethod;
  }) => void;
};


const FishCard: React.FC<FishCardProps> = ({ fish, onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCleaning, setSelectedCleaning] = useState<CleaningMethod>(fish.cleaningOptions[0]);

  const handleAddToCart = () => {
    onAddToCart({ fish, quantity, cleaningMethod: selectedCleaning });
    
  };
const [showModal, setShowModal] = useState(false);

  return (
    <>
    
    <div style={{
      border: '1px solid #ddd',
      maxWidth:'80%',
      
      justifyContent:'center',
      borderRadius: '12px',
      padding: '16px',
      margin: '10px auto',
      width: '300px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      ,cursor:"pointer"
    }}>
      <img src={fish.image} alt={fish.name} style={{ width: '50%',display:'block',margin:'0 auto',borderRadius: '8px' }}  onClick={() => setShowModal(true)}   />
      <div className='d-flex justify-content-between'>
        <h6>{fish.name}</h6>       <p>{fish.pricePerKg} QAR/kg</p>
        
      </div>
        <p>min weight: {fish.minWeight} kg</p>

         <select
        value={selectedCleaning}
        onChange={(e) => setSelectedCleaning(e.target.value as CleaningMethod)}
        style={{ marginBottom: '8px', width: '100%', padding: '4px' }}
      >
        <p>select </p>
        {fish.cleaningOptions.map((method) => (
            
          <option key={method} value={method}> {method}</option>
        ))}
      </select>

      <div className='' style={{ display: 'flex',justifyContent:"space-between", marginBottom: '8px' }}>
        <div className='p-2 ms-1' style={{  marginBottom: '8px' }}>
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <span style={{ margin: '0 1px' }}> {quantity} </span>
        <button onClick={() => setQuantity(q => q + 1)}>+</button>

</div>
<div>
         <button className='mt-2' onClick={handleAddToCart} style={{ width: '100%', padding: '4px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '2px' }}>
<i className="fa-solid fa-cart-shopping"></i> Add to cart</button>

      </div>
      
      </div>




     {showModal && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  }} 
  >
    <div
      style={{
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        maxWidth: '400px',
        textAlign: 'center',
        cursor:'pointer'
      }}
      onClick={(e) => e.stopPropagation()}  
    >
 <img src={fish.image} alt={fish.name} style={{ width: '50%',display:'block',margin:'0 auto',borderRadius: '8px' }}   />      <h3>{fish.name}</h3>
      <p>{fish.description}</p>
       <p>{fish.pricePerKg} QAR/kg</p>
       
      <button onClick={() => setShowModal(false)} style={{ marginTop: '12px', padding: '6px 12px' }}>
        Close
      </button>
    </div>
  </div>
)}

     
    </div>

    </>
  );
};

export default FishCard;
