import styles from "./header.module.css"

interface HeaderProps {
  isSticky?: boolean;
}

const Header = ({isSticky}: HeaderProps) => {
  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.left}>
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