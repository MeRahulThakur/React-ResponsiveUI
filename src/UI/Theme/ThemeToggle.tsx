import { useTheme } from '../../context/useTheme';
import styles from './ThemeToggle.module.css';
import { FiSun, FiMoon, FiSettings } from 'react-icons/fi'; // Optional: using lucide icons

const ThemeToggle = () => {
  const { theme, isSystem, toggleTheme, toggleSystem } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      {isSystem ? <FiSettings size={18} /> : theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}

      <label className={styles.switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === 'dark'}
          disabled={isSystem}
        />
        <span className={styles.slider} />
      </label>

      <label className={styles.systemLabel}>
        <input
          type="checkbox"
          checked={isSystem}
          onChange={toggleSystem}
        />
        Follow system
      </label>
    </div>
  );
};

export default ThemeToggle;
