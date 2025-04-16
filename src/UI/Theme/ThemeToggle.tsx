import { useTheme } from '../../context/useTheme';
import styles from './ThemeToggle.module.css';
import { FiSun, FiMoon } from 'react-icons/fi'; // Optional: using lucide icons

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      {theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}
      <label className={styles.switch} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className={styles.slider} />
      </label>
    </div>
  );
};

export default ThemeToggle;
