import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, [navigate]);

  const getAllUsers = () => {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error parsing users from localStorage:', error);
      return [];
    }
  };

  const saveUsers = (users) => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users to localStorage:', error);
      alert('Error saving user data. Please try again.');
    }
  };

  const saveCurrentUser = (user) => {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));

    window.dispatchEvent(new Event('userUpdated'));
    } catch (error) {
      console.error('Error saving current user to localStorage:', error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 3;
  };

  const handleLoginSubmit = () => {
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(loginData.email)) newErrors.email = 'Invalid email format';
    
    if (!loginData.password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const users = getAllUsers();
      const user = users.find( 
        u => u.email === loginData.email && u.password === loginData.password
      );

      if (user) {
        saveCurrentUser(user);
        setCurrentUser(user);
        setIsAuthenticated(true);
        console.log('Login successful:', user);
        
        setLoginData({ email: '', password: '' });
        navigate('/');
      } else {
        alert('Invalid email or password!');
      }
      setLoading(false);
    }, 1000);
  };

  

  const handleSignupSubmit = () => {
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!signupData.fullName.trim()) newErrors.fullName = 'Name is required';
    
    if (!signupData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(signupData.email)) newErrors.email = 'Invalid email format';
    
    if (!signupData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(signupData.password)) newErrors.password = 'Password must be at least 3 characters';
    
    if (!signupData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    
    const existingUsers = getAllUsers();
    if (existingUsers.find(u => u.email === signupData.email)) {
      newErrors.email = 'Email already exists,Please login';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }


    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        fullName: signupData.fullName.trim(),
        email: signupData.email.toLowerCase(),
        password: signupData.password,
        createdAt: new Date().toISOString()
      };

      
      const users = getAllUsers();
      users.push(newUser);
      
      
      saveUsers(users);
      saveCurrentUser(newUser);
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      console.log('Account created successfully:', newUser);
      
      
      setSignupData({ fullName: '', email: '', password: '', confirmPassword: '' });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLogout = () => {
   
    localStorage.removeItem('currentUser');

    
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginData({ email: '', password: '' });
    setSignupData({ fullName: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    
    console.log('User logged out successfully');
  };

  
  const handleClearAllData = () => {
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    console.log('All data cleared from localStorage');
  };

  if (isAuthenticated && currentUser) {
    const allUsers = getAllUsers();
  
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-main-container">
        
        <div className={`auth-form-wrapper login-form-wrapper ${
          showLogin ? "active" : "inactive"
        }`}>
          <div className="auth-login-form">
            <h1 className="auth-login-title">Login</h1>
            
            <div className="auth-input-group">
              <input 
                type="email" 
                name="email"
                className={`auth-input ${errors.email ? 'error' : ''}`}
                placeholder="Email" 
                value={loginData.email}
                onChange={handleLoginInputChange}
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="auth-input-group">
              <input 
                type="password" 
                name="password"
                className={`auth-input ${errors.password ? 'error' : ''}`}
                placeholder="Password" 
                value={loginData.password}
                onChange={handleLoginInputChange}
                disabled={loading}
                autoComplete="current-password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button 
              onClick={handleLoginSubmit}
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="auth-footer">
              <span className="auth-switch-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="auth-toggle-link"
                  disabled={loading}
                >
                  Sign Up
                </button>
              </span>
            </div>
          </div>
        </div>

        
        <div className={`auth-form-wrapper signup-form-wrapper ${
          !showLogin ? "active" : "inactive"
        }`}>
          <div className="auth-signup-form">
            <h1 className="auth-signup-title">Sign Up</h1>
            
            <div className="auth-input-group">
              <input 
                type="text" 
                name="fullName"
                className={`auth-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Full Name" 
                value={signupData.fullName}
                onChange={handleSignupInputChange}
                disabled={loading}
                autoComplete="name"
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
            
            <div className="auth-input-group">
              <input 
                type="email" 
                name="email"
                className={`auth-input ${errors.email ? 'error' : ''}`}
                placeholder="Email" 
                value={signupData.email}
                onChange={handleSignupInputChange}
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="auth-input-group">
              <input 
                type="password" 
                name="password"
                className={`auth-input ${errors.password ? 'error' : ''}`}
                placeholder="Password" 
                value={signupData.password}
                onChange={handleSignupInputChange}
                disabled={loading}
                autoComplete="new-password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="auth-input-group">
              <input 
                type="password" 
                name="confirmPassword"
                className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm Password" 
                value={signupData.confirmPassword}
                onChange={handleSignupInputChange}
                disabled={loading}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
            
            <button 
              onClick={handleSignupSubmit}
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            
            <div className="auth-footer">
              <span className="auth-switch-text">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowLogin(true)}
                  className="auth-toggle-link"
                  disabled={loading}
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;