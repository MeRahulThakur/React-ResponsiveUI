import React, { JSX, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarMenu.css';
import { FiMessageSquare, FiClock, FiSettings, FiX } from 'react-icons/fi';
import ThemeToggle from '../Theme/ThemeToggle';

type MenuItem = {
  id: number;
  label: string;
  icon: JSX.Element;
  path: string;
};

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { id: 1, label: 'Design System', icon: <FiMessageSquare />, path: '/design-system' },
  { id: 2, label: 'Form page', icon: <FiClock />, path: '/form' },
  { id: 3, label: 'Settings', icon: <FiSettings />, path: '/settings' },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus the first item when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstItem = menuRef.current.querySelector(
        '.sidebar-item button, .sidebar-item a'
      ) as HTMLElement | null;
      firstItem?.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      role="navigation"
      aria-hidden={!isOpen}
      aria-label="Sidebar menu"
      ref={menuRef}
    >
      <div className="sidebar-header">
        <h2 className="sidebar-title">Menu</h2>
        <button className="icon-btn" onClick={onClose} aria-label="Close menu">
          <FiX />
        </button>
      </div>

      <ul className="sidebar-list">
        {menuItems.map((item) => (
          <li key={item.id} className="sidebar-item">
            {/* <button
              tabIndex={isOpen ? 0 : -1}
              className="sidebar-link"
              aria-label={item.label}
            > */}
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
              onClick={onClose}
            >
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </NavLink>
            {/* </button> */}
          </li>
        ))}
      </ul>

      <span className="theme-toggle" tabIndex={isOpen ? 0 : -1}>
        <ThemeToggle />
      </span>
    </div>
  );
};

export default SidebarMenu;
