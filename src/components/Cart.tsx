import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, Package, CreditCard, Clock, MapPin, Trash2 } from 'lucide-react';

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

      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        const items = JSON.parse(storedCart);

        // Merge duplicate items by fish.id and cleaningMethod
        const mergedItems: any[] = [];
        items.forEach((newItem: any) => {
          const existingIndex = mergedItems.findIndex(
            (i) =>
              i.fish.id === newItem.fish.id &&
              i.cleaningMethod === newItem.cleaningMethod
          );
          if (existingIndex > -1) {
            mergedItems[existingIndex].quantity += newItem.quantity;
          } else {
            mergedItems.push({ ...newItem });
          }
        });

        setCartItems(mergedItems);
        localStorage.setItem('cartItems', JSON.stringify(mergedItems));
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cartItems');
    window.location.href = '/login';
  };

  const removeItem = (id: number) => {
    if (!user) return;
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) =>
      total + (item.fish.pricePerKg * item.fish.minWeight * item.quantity), 0);

  const deliveryCharge = 3;
  const subtotal = calculateSubtotal();
  const totalAmount = subtotal + deliveryCharge;

  const handleConfirmOrder = () => {
    if (!user || cartItems.length === 0) return;

    const orderSummary = `
      Order Summary:
      ----------------------------
      Items: ${cartItems.length}
      Total: ${totalAmount.toFixed(2)} QAR
      Delivery: ${deliveryAddress}
      ----------------------------
      Thank you for your order!
    `;
    alert(orderSummary);

    localStorage.removeItem('cartItems');
    setCartItems([]);
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div className="bg-white rounded-xl shadow-lg p-4 text-center max-w-md">
        <h2 className="text-xl mb-4"> Log In to view Cart</h2>
        <button
          onClick={() => window.location.href = '/login'}
          className="bg-teal-900 text-white font-semibold py-3 px-6 rounded-full"
        >
          Login to Continue
        </button>
      </div>
    </div>
  );

  if (cartItems.length === 0) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
        <h2 className="text-2xl mb-4">Your cart is empty!</h2>
        <p>Add some items</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white">
              {user?.fullName?.charAt(0)}
            </div>
            <span className="">{user?.fullName}</span>
          </div>
          <button onClick={handleLogout} className="text-red-500 flex items-center gap-1">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h2 className="text-lg mb-4 flex items-center gap-2">
            <ShoppingCart size={20} /> Your Cart ({cartItems.length} items)
          </h2>

          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between">
                  <div>
                    <h3 className="">{item.fish.name}</h3>
                    <p className='text-sm'>Cleaning: {item.cleaningMethod || 'Not specified'}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.fish.minWeight} kg {/* x {item.fish.pricePerKg} QR/kg */}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="">
                      {(item.fish.pricePerKg * item.fish.minWeight * item.quantity).toFixed(2)} QR
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="mb-3 flex items-center gap-2">
            <CreditCard size={18} /> Order Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} QAR</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{deliveryCharge.toFixed(2)} QAR</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between">
              <span>Total:</span>
              <span>{totalAmount.toFixed(2)} QAR</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h3 className="mb-3 flex items-center gap-2">
            <Package size={18} /> Delivery Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="DCard">Debit Card</option>
                <option value="CCard">Credit Card</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Delivery Time</label>
              <select
                value={deliveryTime}
                onChange={e => setDeliveryTime(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="ASAP">As soon as possible</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded-lg"
                placeholder='Address with landmark'
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-teal-900 hover:bg-teal-800 text-white py-3 px-4 rounded-full shadow"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

export const addToCart = (newItem: any) => {
  const storedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  const existingIndex = storedCart.findIndex(
    (item: any) =>
      item.fish.id === newItem.fish.id &&
      item.cleaningMethod === newItem.cleaningMethod
  );

  if (existingIndex > -1) {
    storedCart[existingIndex].quantity += newItem.quantity;
  } else {
    storedCart.push(newItem);
  }

  localStorage.setItem('cartItems', JSON.stringify(storedCart));
};
