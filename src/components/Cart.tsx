import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Package, CreditCard, Clock, MapPin, Trash2, Plus, Minus } from 'lucide-react';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('ASAP');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setDeliveryAddress(userData.address || '');
      
      // Only load cart items if user is logged in
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } else {
      // Clear cart items if no user is logged in
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
    
    setIsLoading(false);
  }, []);

  //  user logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    
    setUser(null);
    setCartItems([]);
    setDeliveryAddress('');
    setPaymentMethod('COD');
    setDeliveryTime('ASAP');
    
    window.location.href = '/login';
  };

  const removeItem = (id: number) => {
    if (!user) return;
    
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleUpdateDeliveryDetails = () => {
    if (!user) return;
    
    const updatedUser = { ...user, address: deliveryAddress };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert('Delivery details updated!');
  };

  // Calculate total bill
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.fish.pricePerKg || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const deliveryCharge = 3;
  const subtotal = calculateSubtotal();
  const totalAmount = subtotal + deliveryCharge;

  const handleConfirmOrder = () => {
    if (!user || cartItems.length === 0) return;
    
    const orderSummary = `
      📦 Order Summary:
      ----------------------------
      Name: ${user?.fullName}
      Email: ${user?.email}
      Payment Method: ${paymentMethod}
      Delivery Address: ${deliveryAddress}
      Delivery Time: ${deliveryTime}
      
      Ordered Items:
      ${cartItems.map(item => `- ${item.fish.name} x${item.quantity} (${item.weight} kg, ${item.cleaningMethod}) - ${(item.fish.pricePerKg * item.quantity).toFixed(2)} QAR`).join('\n')}
      
      Subtotal: ${subtotal.toFixed(2)} QAR
      Delivery Charge: ${deliveryCharge.toFixed(2)} QAR
      Total Amount: ${totalAmount.toFixed(2)} QAR
      ----------------------------
      Thank you for your order! 🎉
    `;
    alert(orderSummary);
    
    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  const orderTime = new Date().toLocaleString();

  
  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
        </div>
        <p className="text-xl text-slate-600 font-medium mt-6">Loading your cart...</p>
      </div>
    </div>
  );

  const LoginPrompt = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 text-center max-w-md w-full border border-white/20">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <User className="w-10 h-10 text-dark" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Please Log In
          </h2>
          <p className="text-slate-600 text-lg">You need to be logged in to view your cart.</p>
        </div>
        <button 
          onClick={() => window.location.href = '/login'} 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-blue font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Login to Continue
        </button>
      </div>
    </div>
  );

  // User Header 
  const UserHeader = () => (
    <div className="bg-white backdrop-blur-sm rounded-3xl shadow-lg p-6 mb-8 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-dark font-bold text-xl">{user?.fullName?.charAt(0)}</span>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-slate-500 text-sm block">Welcome back,</span>
            <p className="font-bold text-slate-800 text-xl">{user?.fullName}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-dark font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  // Empty Cart 
  const EmptyCart = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <UserHeader />
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-12 text-center border border-white/20">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
              <ShoppingCart className="w-16 h-16 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Your cart is empty!
            </h2>
            <p className="text-slate-600 text-lg">Looks like you haven't added any items to your cart yet.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-dark font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) return <LoadingSpinner />;

  // Show login prompt if user is not logged in
  if (!user) return <LoginPrompt />;

  // Show empty cart message if no items
  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <UserHeader />

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden">
          {/* Cart Header */}
          <div className="bg-gradient-to-r from-green-900 via-emerald-700 to-teal-700  p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12  rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-dark" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Cart</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-xl font-bold text-slate-800">{item.fish.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium text-sm flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            Qty: {item.quantity}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium text-sm">
                            {item.weight} kg
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-600">Cleaning:</span>
                          <span className="text-sm text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">
                            {item.cleaningMethod}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-600">Price per kg:</span>
                          <span className="text-sm font-semibold text-slate-800">
                            {item.fish.pricePerKg ? `${item.fish.pricePerKg.toFixed(2)} QAR` : 'Price not available'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center lg:text-right">
                      <p className="text-2xl font-bold text-emerald-600 mb-4">
                        {item.fish.pricePerKg ? `${(item.fish.pricePerKg * item.quantity).toFixed(2)} QAR` : 'N/A'}
                      </p>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-dark font-medium py-2 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Summary */}
            <div className="mt-8 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-6 border-2 border-emerald-200/50 shadow-inner">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800">Bill Summary</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-emerald-200">
                  <span className="text-slate-700 font-medium">Subtotal:</span>
                  <span className="font-bold text-slate-800 text-lg">{subtotal.toFixed(2)} QAR</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-emerald-200">
                  <span className="text-slate-700 font-medium">Delivery Charge:</span>
                  <span className="font-bold text-slate-800 text-lg">{deliveryCharge.toFixed(2)} QAR</span>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800">Total Amount:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-dark">
                      {totalAmount.toFixed(2)} QAR
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="mt-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-dark" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Delivery Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Customer Name</p>
                  <p className="text-lg font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg">
                    {user?.fullName}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Email Address</p>
                  <p className="text-lg font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg">
                    {user?.email}
                  </p>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Order Time</p>
                  <p className="text-lg font-semibold text-slate-800 bg-slate-50 p-3 rounded-lg flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {orderTime}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Method
                  </label>
                  <select 
                    value={paymentMethod} 
                    onChange={e => setPaymentMethod(e.target.value)} 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="Card">Card</option>
                    <option value="UPI">UPI</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Delivery Time
                  </label>
                  <select 
                    value={deliveryTime} 
                    onChange={e => setDeliveryTime(e.target.value)} 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
                  >
                    <option value="ASAP">As soon as possible</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </label>
                  <textarea 
                    value={deliveryAddress} 
                    onChange={e => setDeliveryAddress(e.target.value)} 
                    rows={4} 
                    className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white shadow-sm"
                    placeholder="Enter your complete delivery address..."
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleUpdateDeliveryDetails} 
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-dark font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Update Delivery Details
              </button>

              <button 
                onClick={handleConfirmOrder} 
                className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-dark font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Confirm Order
              </button>

              <button 
                onClick={() => window.location.href = '/'} 
                className="flex-1 bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-dark font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;