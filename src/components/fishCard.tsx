import React, { useState, useEffect } from 'react';
import './fishCard.css'

type CleaningMethod = 'Headless' | 'Gutted' | 'Fillet' | 'Steaks' | 'Whole';

type FishData = {
  id: number;
  name: string;
  image: string;
  pricePerKg: number;
  minWeight: number;
  description: string;
  cleaningOptions: CleaningMethod[];
};

type CartItem = {
  id: string;
  fish: FishData;
  quantity: number;
  weight: number;
  cleaningMethod: CleaningMethod;
  totalPrice: number;
  createdAt: string;
};

type FishCardProps = {
  fish: FishData;
  onAddToCart: (item: {
    fish: FishData;
    quantity: number;
    weight: number;
    cleaningMethod: CleaningMethod;
  }) => void;
  onNavigateToLogin?: () => void;
};

type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning';
};

const FishCard: React.FC<FishCardProps> = ({ fish, onAddToCart, onNavigateToLogin }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCleaning, setSelectedCleaning] = useState<CleaningMethod | ''>('');
  const [showModal, setShowModal] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        sessionStorage.setItem('cartItemsBackup', cartItems);
      }
    };

    const handleLoad = () => {
      if (!localStorage.getItem('cartItems') && sessionStorage.getItem('cartItemsBackup')) {
        localStorage.setItem('cartItems', sessionStorage.getItem('cartItemsBackup')!);
        sessionStorage.removeItem('cartItemsBackup');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

   
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    const isItemInCart = existingCartItems.some(item => item.fish.id === fish.id);
    setIsInCart(isItemInCart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, [fish.id]);

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleAddToCart = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      if (onNavigateToLogin) {
        onNavigateToLogin();
      } else {
        showToast('Please login first', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
      return;
    }

    if (!selectedCleaning) {
      showToast('Please select a cleaning method before adding to cart', 'warning');
      return;
    }

    const totalWeight = fish.minWeight * quantity;
    const totalPrice = fish.pricePerKg * totalWeight;

    const cartItem: CartItem = {
      id: `${fish.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fish,
      quantity,
      weight: totalWeight,
      cleaningMethod: selectedCleaning as CleaningMethod,
      totalPrice,
      createdAt: new Date().toISOString()
    };

    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[];
    const updatedCartItems = [...existingCartItems, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    onAddToCart({
      fish,
      quantity,
      weight: totalWeight,
      cleaningMethod: selectedCleaning as CleaningMethod
    });

    setIsInCart(true);

    const toastMessage = `Added to cart:
Fish: ${fish.name}
Quantity: ${quantity}
Weight: ${totalWeight} kg
Cleaning Method: ${selectedCleaning}
Price per kg: ${fish.pricePerKg} QAR
Total Price: ${totalPrice.toFixed(2)} QAR
`;
    showToast(toastMessage, 'success');
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    const storedCart = localStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const fishIndex = cart.findIndex(
      (item: any) => item.id === fish.id && item.cleaningMethod === selectedCleaning
    );

    if (fishIndex !== -1) {
      cart[fishIndex].quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    handleAddToCart();
  };

   const styles = {
    card: {
      justifyContent: 'center',
      borderRadius: '6px',
      padding: '10px',
      margin: '10px  ', 
      width: '100%',
      maxWidth: '230px',
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 16px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden' as const,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      '@media (maxWidth: 768px)': {
        padding: '6 px',
        borderRadius: '12px',
/*         margin: ' auto', 
 */      }
    },
    
    cardBefore: {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      transition: 'left 0.6s ease-in-out',
      zIndex: 1
    },
    image: {
      width: '40%',
      display: 'block',
      margin: '0 auto 0px auto',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      filter: 'brightness(1.02) contrast(1.05)',
      position: 'relative' as const,
      zIndex: 2,
      '@media (maxWidth: 480px)': {
        width: '80%',
        margin: '0 auto 12px auto'
      }
    },
    imageHover: {
      transform: 'scale(1.05)',
      filter: 'brightness(1.1) contrast(1.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      position: 'relative' as const,
      zIndex: 2,
      flexWrap: 'wrap' as const,
      gap: '8px'
    },
    fishName: {
       fontSize: 'clamp(16px, 4vw, 10px)',
   
      margin: '0 2px 5px 9px',
      display: 'flex',
      justifyContent: 'center', 
      minWidth: '80px'
    },
    fishNameArabic:{
      fontSize: 'clamp(16px, 4vw, 10px)',
      fontfamily: 'Rubik, sans-serif',
            fontWeight: '400',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center', 
      minWidth: '80px'
    },
    price: {
      fontSize: 'clamp(10px, 3.5vw, 15px)',
      fontFamily: 'Saira, sans-serif',
      fontWeight: '200',
      margin: 0,
      padding: '4px 2px',
      borderRadius: '16px',
      whiteSpace: 'nowrap' as const,zIndex:'2'
    },
    minWeight: {
      color: '#7f8c8d',
      fontSize: '12px',
      fontWeight: '400',
      position: 'relative' as const,
      zIndex: 2,
    },
    select: {
      marginBottom: '20px',
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #15803d',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      color: '#2c3e50',
      transition: 'all 0.3s ease',
      outline: 'none',
      cursor: 'pointer',
      position: 'relative' as const,
      zIndex: 2
    },
    selectRequired: {
      borderColor: '#15803d',
      boxShadow: '0 0 0 3px rgba(102,126,234,0.1)',
    },
    selectFocus: {
      borderColor: '#15803d',
      boxShadow: '0 0 0 3px rgba(231,76,60,0.1)',
      transform: 'translateY(-2px)'
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',
      gap: '6px',
      position: 'relative' as const,
      zIndex: 2,
      flexWrap: 'wrap' as const
    },
    quantityContainer: {
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(145deg, #f8f9fa, #ffffff)',
      borderRadius: '12px',
      padding: '6px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #e8ecef',
      minWidth: '70px'
    },
    quantityButton: {
      width: 'clamp(26px, 8vw, 20px)',
      height: 'clamp(26px, 8vw, 20px)',
      margin:'2px',
    
       border: '1px solid #e8ecef',
      borderColor: '#15803d',
      color: '#000',
      fontSize: 'clamp(14px, 4vw, 10px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
   
    quantityDisplay: {
      margin: '0 12px',
      fontSize: 'clamp(14px, 4vw, 12px)',
    
      color: '#2c3e50', 
      minWidth: '5px',
      textAlign: 'center' as const
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      backdropFilter: 'blur(5px)',
      animation: 'modalFadeIn 0.3s ease-out',
      padding: '20px'
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 'clamp(20px, 5vw, 32px)',
      borderRadius: '20px',
      width: '100%',
      maxWidth: '450px',
      maxHeight: '90vh',
      overflowY: 'auto' as const,
      textAlign: 'center' as const,
      cursor: 'default',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      animation: 'modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)'
    },
    modalImage: {
      width: 'clamp(50%, 15vw, 60%)',
      display: 'block',
      margin: '0 auto 16px auto',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    },
    modalTitle: {
      fontSize: 'clamp(20px, 5vw, 24px)',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    modalDescription: {
      color: '#5a6c7d',
      fontSize: 'clamp(14px, 4vw, 16px)',
      lineHeight: '1.6',
      marginBottom: '16px'
    },
    modalPrice: {
      fontSize: 'clamp(18px, 4.5vw, 20px)',
      fontWeight: '600',
      color: '#27ae60',
      marginBottom: '20px'
    },
    closeButton: {
      padding: 'clamp(10px, 3vw, 12px) clamp(20px, 5vw, 24px)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: 'clamp(12px, 3.5vw, 14px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102,126,234,0.3)'
    },
    closeButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102,126,234,0.4)'
    },
    toastContainer: {
      position: 'fixed' as const,
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '10px',
      maxWidth: '400px'
    },
    toast: {
      padding: '16px 20px',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      animation: 'toastSlideIn 0.3s ease-out',
      position: 'relative' as const,
      cursor: 'pointer',
      maxWidth: '100%',
      wordWrap: 'break-word' as const,
      whiteSpace: 'pre-line' as const
    },
    toastSuccess: {
      background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'
    },
    toastError: {
      background: 'linear-gradient(135deg, #e74c3c 0%, #ffb3ba 100%)'
    },
    toastWarning: {
      background: 'linear-gradient(135deg, #f39c12 0%, #ffd93d 100%)'
    },
    toastCloseButton: {
      position: 'absolute' as const,
      top: '8px',
      right: '12px',
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      opacity: 0.8,
      transition: 'opacity 0.2s ease'
    }
  };

  return (
    <>
      <div>
        <div style={styles.toastContainer}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              style={{
                ...styles.toast,
                ...(toast.type === 'success'
                  ? styles.toastSuccess
                  : toast.type === 'error'
                  ? styles.toastError
                  : styles.toastWarning)
              }}
              onClick={() => removeToast(toast.id)}
            >
              <button
                style={styles.toastCloseButton}
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
              >
                ×
              </button>
              {toast.message}
            </div>
          ))}
        </div>

        <div
          className="fish-card"
          style={{ ...styles.card, position: 'relative' }}
          
        >
          {isInCart && (
            <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '1.5rem',color:'teal' }}>
              <i className="fa-solid fa-cart-plus"></i>
            </div>
          )}
          <img
            src={fish.image}
            alt={fish.name}
            style={styles.image}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                ...styles.image,
                ...styles.imageHover
              });
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.image);
            }}
          />
          <h6 style={styles.fishName} className='fishName'>{fish.name}</h6>
          <h6 style={styles.fishNameArabic} className='fishName'>لا يعرض أحد </h6>
          <div style={styles.header}>
            <p style={styles.minWeight}>Min weight: {fish.minWeight} kg</p>
            <p style={styles.price}>{fish.pricePerKg} QR/kg</p>
          </div>

          <select
            value={selectedCleaning}
            onChange={(e) => setSelectedCleaning(e.target.value as CleaningMethod | '')}
            style={{
              ...styles.select,
              ...(selectedCleaning === '' ? styles.selectRequired : {})
            }}
            onFocus={(e) => {
              Object.assign(e.currentTarget.style, {
                ...styles.select,
                ...styles.selectFocus
              });
            }}
            onBlur={(e) => {
              Object.assign(e.currentTarget.style, {
                ...styles.select,
                ...(selectedCleaning === '' ? styles.selectRequired : {})
              });
            }}
          >
            <option value="" disabled >
              Select cleaning method *
            </option>
            {fish.cleaningOptions.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>

          <div style={styles.controlsContainer}>
            <div style={styles.quantityContainer}>
              <span style={styles.quantityDisplay} className='Quantity'>Quantity : {quantity}</span>
              <button
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <button
                style={styles.quantityButton}
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div style={styles.modal} onClick={() => setShowModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <img src={fish.image} alt={fish.name} style={styles.modalImage} />
              <h3 style={styles.modalTitle}>{fish.name}</h3>
              <p style={styles.modalDescription}>{fish.description}</p>
              <p style={styles.modalPrice}>{fish.pricePerKg} QAR/kg</p>
              <button
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <style>
          {`
            @keyframes modalFadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
              from { 
                opacity: 0; 
                transform: translateY(-30px) scale(0.9); 
              }
              to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
              }
            }

            @keyframes toastSlideIn {
              from { 
                opacity: 0; 
                transform: translateX(100%); 
              }
              to { 
                opacity: 1; 
                transform: translateX(0); 
              }
            }
            
            .fish-card {
              position: relative;
            }
            
            .fish-card::before {
              content: "";
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
              transition: left 0.6s ease-in-out;
              z-index: 1;
            }
            
            .fish-card:hover::before {
              left: 100%;
            }

            @media (max-width: 768px) {
              .fish-card {
                width: 85% !important;
                margin: 8px 25px !important;
              }
            }

            @media (max-width: 480px) {
              .controls-container {
                flex-direction: column !important;
                gap: 12px !important;
              }
              
              .quantity-container {
                align-self: center !important;
              }
              
              .add-to-cart-button {
                width: 50% !important;
                min-width: unset !important;
              }

              .toast-container {
                top: 10px !important;
                right: 10px !important;
                left: 10px !important;
                max-width: none !important;
              }
            }
          `}
        </style>
        
      </div>
    </>
  );
};

export default FishCard;