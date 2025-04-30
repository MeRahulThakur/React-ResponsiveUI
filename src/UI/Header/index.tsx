//import { useTheme } from "../../context/useTheme";
import ThemeToggle from "../Theme/ThemeToggle";
import styles from "./header.module.css"
import { FiSidebar } from 'react-icons/fi';
import { Link } from 'react-router-dom';


interface HeaderProps {
  isSticky?: boolean;
  onMenuToggle?: () => void;
}

const Header = ({isSticky, onMenuToggle}: HeaderProps) => {
  //const { theme } = useTheme();
  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.left}>
        {/* Hamburger */}
        {onMenuToggle && (
          <button className={styles.hamburger} onClick={onMenuToggle}>
            <FiSidebar />
          </button>
        )}
        <Link to="/"><img src="vite.svg" alt="Logo" width="50" /></Link>
        <div className={styles.logo}>
          <div className={styles.logo_text}><span className={styles.grad}>APP</span>TITLE</div>
        </div>
      </div>
      <div className={styles.center}>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header