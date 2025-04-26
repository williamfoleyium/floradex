import Navigation from '../Navigation/Navigation';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };


  return (
<header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.title}>FloraDex</h1>
          <span className={styles.subtitle}>Your Plant Care Assistant</span>
        </div>
        <Navigation />
        <div className={styles.userSection}>
          {user ? (
            <div className={styles.userControls}>
              <button 
                className={styles.profileButton} 
                onClick={handleProfile}
              >
                {user.username}
              </button>
              <button 
                className={styles.logoutButton} 
                onClick={onLogout}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              className={styles.loginButton} 
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;