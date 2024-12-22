import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers/userSlice';
import { selectProfile, fetchProfile } from '../../redux/reducers/profileSlice';
import logo from '../../Assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector(state => state.user.userInfo);
  const userRole = user?.role;
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const profile = useSelector(selectProfile);
  const menuRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const getDisplayName = () => {
    if (profile?.firstName) {
      return ` ${profile.firstName}`;
    }
    if (user?.username) {
      return ` ${user.username}`;
    }
    return '';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleLoginRedirect = (e) => {
    e.preventDefault();
    navigate('/login');
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const getMenuItems = () => {
    if (userRole === 'ROLE_ADMIN') {
      return [
        { path: '/admin', label: 'Dashboard' },
        { path: '/profile', label: 'Profile' }
      ];
    }
    return [
      { path: '/', label: 'Home' },
      { path: '/profile', label: 'Profile' },
      { path: '/templates', label: 'Templates' }
    ];
  };

  return (
    <nav className="navbar" ref={menuRef}>
      <a href={userRole === 'ROLE_ADMIN' ? '/admin' : '/'} className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </a>

      <button 
        className="hamburger" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`auth-section ${isMobileMenuOpen ? 'active' : ''}`}>
        {isAuthenticated && user ? (
          <>
            <div className="user-menu">
              <div 
                className="welcome-text" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Welcome{getDisplayName()}!
                {userRole === 'ROLE_ADMIN' && <span> (Admin)</span>}
              </div>
            </div>
            <div className={`menu-items ${isDropdownOpen ? 'show' : ''}`}>
              {getMenuItems().map((item, index) => (
                <a 
                  key={index}
                  href={item.path}
                  className="menu-item"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                    setIsDropdownOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/"
                className="menu-item" 
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          </>
        ) : (
          <a 
            href="/login" 
            className="menu-item" 
            onClick={handleLoginRedirect}
          >
            Log in / Sign up
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;