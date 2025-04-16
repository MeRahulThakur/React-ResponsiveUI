import styles from "./foooter.module.css"

interface FooterProps {
  isSticky?: boolean;
}

const Footer = ({isSticky}: FooterProps) => {
  return (
    <footer className={`${styles.footer} ${isSticky ? styles.sticky : ''}`}>
      <p>&copy; RKT {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer