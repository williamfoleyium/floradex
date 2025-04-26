// src/pages/Register/Register.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import styles from './Register.module.css';

function Register() {
  const location = useLocation();
  console.log("Current path:", location.pathname);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  
  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    
    // Redirect when registered
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
    
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    const userData = {
      username,
      email,
      password
    };
    
    dispatch(register(userData));
  };
  
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }


  
  return (
    <div className={styles.registerContainer}>
      <section className={styles.heading}>
        <h1>Register</h1>
        <p>Create an account to manage your plant collection</p>
      </section>
      
      <section className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={styles.formControl}
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          
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
            <input
              type="password"
              className={styles.formControl}
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          
          <div className={styles.formGroup}>
            <button type="submit" className={styles.btn}>
              Register
            </button>
          </div>
        </form>
        
        <div className={styles.oauthContainer}>
          <p>Or sign up with:</p>
          <a href="/api/auth/google" className={styles.googleBtn}>
            Sign up with Google
          </a>
        </div>
      </section>
    </div>
  );
}

export default Register;