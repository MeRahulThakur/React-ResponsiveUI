import styles from "./header.module.css"
import { FiSidebar } from "react-icons/fi";

interface HeaderProps {
  isSticky?: boolean;
  onMenuToggle?: () => void;
}

const Header = ({isSticky, onMenuToggle}: HeaderProps) => {
  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.left}>
        {/* Hamburger */}
        {onMenuToggle && (
          <button className={styles.hamburger} onClick={onMenuToggle}>
            <FiSidebar />
          </button>
        )}
        <img src="vite.svg" alt="Logo" width="50" />
        <div className={styles.logo}>
          <div className={styles.logo_text}><span className={styles.grad}>APP</span>TITLE</div>
        </div>
      </div>
      <div className={styles.center}></div>
    </header>
  )
}

export default Header