//import { useTheme } from "../../context/useTheme";
import ThemeToggle from "../Theme/ThemeToggle";
import Tooltip from "../Tooltip";
import styles from "./header.module.css"
import { LuPanelLeftOpen, LuPanelLeftClose } from 'react-icons/lu';
import { Link } from 'react-router-dom';


interface HeaderProps {
  isSidebarOpen: boolean;
  isSticky?: boolean;
  onMenuToggle?: () => void;
}

const Header = ({isSidebarOpen, isSticky, onMenuToggle}: HeaderProps) => {
  //const { theme } = useTheme();
  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.left}>
        {/* Hamburger */}
        {onMenuToggle && (
          <Tooltip content={`${isSidebarOpen?'Close':'Open'} sidebar`} placement="right">
            <button className={styles.hamburger} onClick={onMenuToggle}>
              {isSidebarOpen?<LuPanelLeftClose />:<LuPanelLeftOpen />}
            </button>
          </Tooltip>
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