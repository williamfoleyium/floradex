// src/pages/Login/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    
    // Redirect when logged in
    if (isSuccess || user) {
      navigate('/');
    }
    
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const userData = {
      email,
      password
    };
    
    dispatch(login(userData));
  };
  
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  return (
    <div className={styles.loginContainer}>
      <section className={styles.heading}>
        <h1>Login</h1>
        <p>Login to manage your plant collection</p>
      </section>
      
      <section className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              type="email"
              className={styles.formControl}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <input
              type="password"
              className={styles.formControl}
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <button type="submit" className={styles.btn}>
              Login
            </button>
          </div>
        </form>
        
        <div className={styles.oauthContainer}>
          <p>Or sign in with:</p>
          <a href="/api/auth/google" className={styles.googleBtn}>
            Login with Google
          </a>
        </div>
      </section>
    </div>
  );
}

export default Login;