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
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
/*     onAddToCart({ fish, quantity, cleaningMethod: selectedCleaning });
 */    alert(`  ${fish.minWeight} kg of   ${fish.name} added to cart`)
  };

  const styles = {
    card: {
      justifyContent: 'center',
      borderRadius: '6px',
      padding: '15px',
      margin: '10px auto',
      width: '90%',
       maxWidth: '300px',
       background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 16px rgba(0,0,0,0.08)',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
     overflow: 'hidden' as const,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.2)',
      '@media (max-Width: 768px)': {
        padding: '12px',
        borderRadius: '12px',
        margin: '8px auto'
      }
    },
    cardHover: {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.12)',
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
      width: '50%',
      display: 'block',
      margin: '0 auto 0px auto',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      filter: 'brightness(1.02) contrast(1.05)',
      position: 'relative' as const,
      zIndex: 2,
      '@media (max-Width: 480px)': {
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
      fontSize: 'clamp(16px, 4vw, 20px)',
      fontWeight: '700',
      color: '#2c3e50',
      margin: 0,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      flex: '1',
      minWidth: '120px'
    },
    price: {
      fontSize: 'clamp(14px, 3.5vw, 18px)',
      fontWeight: '600',
      color: '#27ae60',
      margin: 0,
      padding: '4px 8px',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      borderRadius: '16px',
      boxShadow: '0 2px 8px rgba(39,174,96,0.2)',
      whiteSpace: 'nowrap' as const
    },
    minWeight: {
      color: '#7f8c8d',
      fontSize: '14px',
      marginBottom: '16px',
      fontWeight: '500',
      position: 'relative' as const,
      zIndex: 2
    },
    select: {
      marginBottom: '20px',
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e8ecef',
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
    selectFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102,126,234,0.1)',
      transform: 'translateY(-2px)'
    },
    controlsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px',
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
      minWidth: '120px'
    },
    quantityButton: {
      width: 'clamp(32px, 8vw, 36px)',
      height: 'clamp(32px, 8vw, 36px)',
      border: 'none',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
      color: '#fff',
      fontSize: 'clamp(14px, 4vw, 18px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    quantityButtonHover: {
      transform: 'scale(1.1)',
      boxShadow: '0 4px 12px rgba(102,126,234,0.3)'
    },
    quantityDisplay: {
      margin: '0 12px',
      fontSize: 'clamp(14px, 4vw, 16px)',
      fontWeight: '600',
      color: '#2c3e50',
      minWidth: '20px',
      textAlign: 'center' as const
    },
    addToCartButton: {
      flex: 1,
      minWidth: '100px',
      padding: 'clamp(10px, 3vw, 12px) clamp(16px, 4vw, 20px)',
      background: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '12px',
      fontSize: 'clamp(12px, 3.5vw, 14px)',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      boxShadow: '0 4px 15px rgba(86,171,47,0.3)',
      whiteSpace: 'nowrap' as const
    },
    addToCartButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(86,171,47,0.4)',
      background: 'linear-gradient(135deg, #4a9e2a 0%, #96d9b7 100%)'
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
    }
  };

  return (
    <>
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
              width: 95% !important;
              margin: 8px auto !important;
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
          }
        `}
      </style>
      
      <div 
        className="fish-card"
        style={styles.card}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, styles.cardHover);
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, styles.card);
        }}
      >
        <img 
          src={fish.image} 
          alt={fish.name} 
          style={styles.image}
          onClick={() => setShowModal(true)}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, {...styles.image, ...styles.imageHover});
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, styles.image);
          }}
        />
        
        <div style={styles.header}>
          <h6 style={styles.fishName}>{fish.name}</h6>                
          <p style={styles.price}>{fish.pricePerKg} QAR/kg</p>                
        </div>
        
        <p style={styles.minWeight}>min weight: {fish.minWeight} kg</p>           

        <select
          value={selectedCleaning}
          onChange={(e) => setSelectedCleaning(e.target.value as CleaningMethod)}
          style={styles.select}
          onFocus={(e) => {
            Object.assign(e.currentTarget.style, {...styles.select, ...styles.selectFocus});
          }}
          onBlur={(e) => {
            Object.assign(e.currentTarget.style, styles.select);
          }}
        >
          <option value="" disabled>Select cleaning</option>
          {fish.cleaningOptions.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>

        <div 
          style={styles.controlsContainer} 
          className="controls-container"
        >
          <div 
            style={styles.quantityContainer}
            className="quantity-container"
          >
            <button 
              style={styles.quantityButton}
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, {...styles.quantityButton, ...styles.quantityButtonHover});
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.quantityButton);
              }}
            >
              -
            </button>
            <span style={styles.quantityDisplay}>{quantity}</span>
            <button 
              style={styles.quantityButton}
              onClick={() => setQuantity(q => q + 1)}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, {...styles.quantityButton, ...styles.quantityButtonHover});
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.quantityButton);
              }}
            >
              +
            </button>
          </div>
          
          <button 
            style={styles.addToCartButton}
            className="add-to-cart-button"
            onClick={handleAddToCart}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {...styles.addToCartButton, ...styles.addToCartButtonHover});
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, styles.addToCartButton);
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> Add to cart
          </button>
        </div>

        
      </div>
      {showModal && (
          <div 
            style={styles.modal}
            onClick={() => setShowModal(false)}
          >
            <div
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={fish.image} 
                alt={fish.name} 
                style={styles.modalImage}
              />
              <h3 style={styles.modalTitle}>{fish.name}</h3>
              <p style={styles.modalDescription}>{fish.description}</p>
              <p style={styles.modalPrice}>{fish.pricePerKg} QAR/kg</p>               
              <button 
                style={styles.closeButton}
                onClick={() => setShowModal(false)}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {...styles.closeButton, ...styles.closeButtonHover});
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.closeButton);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default FishCard;