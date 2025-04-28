import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Navigation.module.css';

const Navigation = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={`${styles.link} ${isActive('/')}`}>
        Encyclopedia
      </Link>

      <Link to={user ? "/my-plants" : "/login"} className={`${styles.link} ${isActive('/my-plants')}`}>
        My Plants
      </Link>

      {!user && (
        <Link to="/register" className={`${styles.link} ${isActive('/register')}`}>
          Sign Up
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
