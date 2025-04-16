import { useTheme } from '../../context/useTheme';
import CheckboxWithLabel from '../Inputs/CheckboxWithLabel';
import ToggleSwitch from '../Inputs/ToggleSwitch';
import styles from './ThemeToggle.module.css';
import { FiSun, FiMoon, FiSettings } from 'react-icons/fi'; // Optional: using lucide icons

const ThemeToggle = () => {
  const { theme, isSystem, toggleTheme, toggleSystem } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      {isSystem ? <FiSettings size={18} /> : theme === 'dark' ? <FiMoon size={18} /> : <FiSun size={18} />}

      <ToggleSwitch
        checked={theme === 'dark'}
        onChange={toggleTheme}
        disabled={isSystem}
        ariaLabel="Toggle dark mode"
      />

      <CheckboxWithLabel
        label="Follow system"
        checked={isSystem}
        onChange={toggleSystem}
      />
    </div>
  );
};

export default ThemeToggle;
