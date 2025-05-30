import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();


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
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

   const loginOnClick = () => {
    navigate('/login');
  };

  return (
    <>
    <header className={`header ${scrolled ? 'scrolled' : '' }` }>
      <div className="header-container ">
        <Link to="/" className="logo">
          <div className="logo-icon"><img src="https://masskaronline.com/qfreshstyles/images/formbg.png" alt="logo" /></div>|
          <span className="logo-text">Masskar</span>
        </Link>

        <nav className="desktop-nav">
          <Link to="/" className="nav-link">
            <span>Home</span>
          </Link>
          <Link to="/about" className="nav-link">
            <span>About</span>
          </Link>
          <Link to="/locations" className="nav-link">
            <span>Delivery Locations</span>
          </Link>

          <div className="dropdown">
            <button 
              className="dropdown-trigger"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span>Categories</span>
              <FaChevronDown className={`dropdown-icon ${categoriesOpen ? 'rotated' : ''}`} />
            </button>
            
            <div 
              className={`dropdown-menu ${categoriesOpen ? 'open' : ''}`}
            >
              <Link to="/categories/fish" className="dropdown-item">
                <span className="item-emoji">🐟</span>
                Fresh Fish
              </Link>
              <Link to="/categories/vegetables" className="dropdown-item">
                <span className="item-emoji">🥬</span>
                Vegetables
              </Link>
              <Link to="/categories/fruits" className="dropdown-item">
                <span className="item-emoji">🍎</span>
                Fresh Fruits
              </Link>
              <Link to="/categories/meat" className="dropdown-item">
                <span className="item-emoji">🥩</span>
                Premium Meat
              </Link>
            </div>
          </div>
        </nav>

        <div className="search-container">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              width={'100px'}
            />
          </div>
        </div>

        <div className="header-actions">
          <button className="action-btn cart-btn" aria-label="Shopping Cart">
            <FaShoppingCart />
            <span className="cart-badge">3</span>
          </button>
          
          <button className="login-btn" onClick={loginOnClick}>
            <span>Login</span>
          </button>
        </div>

        <button 
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <Link 
            to="/" 
            className="mobile-nav-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>🏠</span>
            Home
          </Link>
          
          <Link 
            to="/about" 
            className="mobile-nav-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>ℹ️</span>
            About
          </Link>
          
          <Link 
            to="/delivery" 
            className="mobile-nav-link" 
            onClick={() => setMenuOpen(false)}
          >
            <span>🚚</span>
            Delivery
          </Link>

          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-trigger"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
            >
              <span>📂</span>
              Categories
              <FaChevronDown className={`dropdown-icon ${categoriesOpen ? 'rotated' : ''}`} />
            </button>
            
            <div className={`mobile-dropdown-menu ${categoriesOpen ? 'open' : ''}`}>
              <Link 
                to="/categories/fish" 
                className="mobile-dropdown-item" 
                onClick={() => setMenuOpen(false)}
              >
                🐟 Fresh Fish
              </Link>
              <Link 
                to="/categories/vegetables" 
                className="mobile-dropdown-item" 
                onClick={() => setMenuOpen(false)}
              >
                🥬 Vegetables
              </Link>
              <Link 
                to="/categories/fruits" 
                className="mobile-dropdown-item" 
                onClick={() => setMenuOpen(false)}
              >
                🍎 Fresh Fruits
              </Link>
              <Link 
                to="/categories/meat" 
                className="mobile-dropdown-item" 
                onClick={() => setMenuOpen(false)}
              >
                🥩 Premium Meat
              </Link>
            </div>
          </div>
        </nav>

        <div className="mobile-actions">
          <div className="mobile-search">
            <FaSearch className="mobile-search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="mobile-search-input"
            />
          </div>
          
          <button className="mobile-action-btn">
            <FaShoppingCart />
            <span>Cart (3)</span>
          </button>
          
          <button className="mobile-login-btn" onClick={loginOnClick}>
            Login
          </button>
        </div>
      </div>

      <div 
        className={`overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </header>
    <marquee behavior="" direction="left">+91 9874563210 sample@gmail.com</marquee>
    </>
  );
};

export default Header;