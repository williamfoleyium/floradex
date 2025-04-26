import styles from './Card.module.css';

const Card = ({ 
  children, 
  title, 
  onClick,
  className = '' 
}) => {
  return (
    <div 
      className={`${styles.card} ${className}`}
      onClick={onClick}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};
