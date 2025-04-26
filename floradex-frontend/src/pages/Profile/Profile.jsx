// src/pages/Profile/Profile.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import styles from './Profile.module.css';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const onLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  if (!user) {
    return null;
  }
  
  return (
    <div className={styles.profileContainer}>
      <section className={styles.heading}>
        <h1>Profile</h1>
        <p>Your account information</p>
      </section>
      
      <section className={styles.content}>
        <div className={styles.userInfo}>
          <h2>Username: {user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
        
        <button className={styles.btn} onClick={onLogout}>
          Logout
        </button>
      </section>
    </div>
  );
}

export default Profile;