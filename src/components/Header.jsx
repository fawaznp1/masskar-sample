import { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-toggle')) {
        setMenuOpen(false);
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const checkUserData = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUserData();

    window.addEventListener('storage', checkUserData);
    window.addEventListener('focus', checkUserData);
    window.addEventListener('userUpdated', checkUserData);

    return () => {
      window.removeEventListener('storage', checkUserData);
      window.removeEventListener('focus', checkUserData);
      window.removeEventListener('userUpdated', checkUserData);
    };
  }, []);

  useEffect(() => {
    const checkCartData = () => {
      const cartData = localStorage.getItem('cartItems');
      if (cartData) {
        try {
          const parsedCart = JSON.parse(cartData);
          setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          localStorage.removeItem('cartItems');
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };

    checkCartData();

    window.addEventListener('storage', checkCartData);
    window.addEventListener('focus', checkCartData);
    window.addEventListener('cartUpdated', checkCartData);

    return () => {
      window.removeEventListener('storage', checkCartData);
      window.removeEventListener('focus', checkCartData);
      window.removeEventListener('cartUpdated', checkCartData);
    };
  }, []);

  const loginOnClick = () => {
    window.location.href = '/login';
  };

  const logoutOnClick = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const categories = [
    { path: "/", emoji: "", name: "Fresh Fish" },
    { path: "/categories/vegetables", emoji: "", name: "Vegetables" },
    { path: "/categories/fruits", emoji: "", name: "Fresh Fruits" },
    { path: "/meatcard", emoji: "", name: "Premium Meat" }
  ];

  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div 
              onClick={() => handleNavigation('/')} 
              className="flex items-center space-x-2 flex-shrink-0 group cursor-pointer"
            >
              <div className="w-8 h-8 lg:w-12 lg:h-10 overflow-hidden transform group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="https://masskaronline.com/qfreshstyles/images/formbg.png" 
                  alt="Masskar Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <span className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200">
                Masskar
              </span>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              <button 
                onClick={() => handleNavigation('/')}
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/locations')}
                className="px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 font-medium"
              >
                Locations
              </button>

              <div className="relative" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200 font-medium"
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                >
                  <span>Categories</span>
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${
                    categoriesOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                <div 
                  className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                    categoriesOpen 
                      ? 'opacity-100 translate-y-0 visible' 
                      : 'opacity-0 -translate-y-2 invisible'
                  }`}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  {categories.map((category) => (
                    <button
                      key={category.path}
                      onClick={() => {
                        handleNavigation(category.path);
                        setCategoriesOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-gray-50 last:border-b-0 w-full text-left"
                    >
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {cartItemCount > 0 && (
                <button 
                  onClick={() => handleNavigation('/cart')}
                  className="relative p-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
                >
                  <FaShoppingCart className="text-lg" />
                  <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium px-1">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                </button>
              )}
              
              {user ? (
                <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                      {user.fullName || user.name || user.username}
                    </span>
                  </div>
                  <button 
                    onClick={logoutOnClick}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={loginOnClick}
                  className="hidden lg:inline-flex px-4 py-2 bg-teal-800 text-white font-medium rounded-xl hover:bg-teal-700 transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </button>
              )}

              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 mobile-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                aria-label="Toggle Menu"
              >
                {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
{menuOpen && (
  <div className="mobile-menu lg:hidden bg-white shadow-md border-t border-gray-100 px-4 py-4 space-y-3 z-40 relative">
    <button
      onClick={() => handleNavigation('/')}
      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
    >
      Home
    </button>
    <button
      onClick={() => handleNavigation('/about')}
      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
    >
      About
    </button>
    <button
      onClick={() => handleNavigation('/locations')}
      className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
    >
      Locations
    </button>
    <div>
      <button
        onClick={() => setCategoriesOpen(!categoriesOpen)}
        className="w-full text-left flex items-center justify-between px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
      >
        <span>Categories</span>
        <FaChevronDown
          className={`text-xs transition-transform duration-200 ${
            categoriesOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {categoriesOpen && (
        <div className="mt-2 space-y-2 pl-4">
          {categories.map((category) => (
            <button
              key={category.path}
              onClick={() => {
                handleNavigation(category.path);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
    {user ? (
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center space-x-2 px-4">
          <FaUser className="text-gray-400" />
          <span className="text-sm font-medium text-gray-700">
            {user.fullName || user.name || user.username}
          </span>
        </div>
        <button
          onClick={logoutOnClick}
          className="mt-2 block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg"
        >
          Logout
        </button>
      </div>
    ) : (
      <button
        onClick={loginOnClick}
        className="mt-2 block w-full text-left px-4 py-2 bg-teal-800 text-white rounded-lg hover:bg-teal-700"
      >
        Login
      </button>
    )}
  </div>
)}

      
      </header>

      <div className="py-1 mt-16 lg:mt-20">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium text-black">
            <marquee behavior="" direction="">📞 +91 9874563210 • ✉️ masskar@gmail.com • 🚚 Free delivery on orders above QR 20</marquee>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;