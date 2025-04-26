import PropTypes from 'prop-types';
import styles from './FilterSection.module.css';

const FilterSection = ({ filters, onFilterChange }) => {
    const filterOptions = {
      light: ['Low Light', 'Medium Light', 'Indirect Sun', 'Full Sun'],
      water: ['Low', 'Moderate', 'Frequent'],
      difficulty: ['Easy', 'Moderate', 'Expert'],
      type: ['Indoor', 'Outdoor', 'Succulent', 'Tropical', 'Herb']
    };

    const handleFilterClick = (type, value) => {
      const currentFilters = filters[type] || [];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(item => item !== value)
        : [...currentFilters, value];
      
      onFilterChange(type, newFilters);
    };
    
  return (
    <div className={styles.filterSection}>
      <h2>Filters</h2>
      
      {Object.entries(filterOptions).map(([category, options], index) => (
        <div key={`${category}-${index}`} className={styles.filterGroup}>
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className={styles.filterOptions}>
            {options.map(option => (
              <button
                key={option}
                aria-pressed={(filters[category] || []).includes(option)}
                role="switch"
                className={`${styles.filterButton} ${
                  (filters[category] || []).includes(option) ? styles.active : ''
                }`}
                onClick={() => handleFilterClick(category.toLowerCase(), option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.shape({
    light: PropTypes.arrayOf(PropTypes.string),
    water: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

  export default FilterSection;