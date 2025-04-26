import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p>Loading plants...</p>
      </div>
    );
  };

  export default LoadingSpinner;