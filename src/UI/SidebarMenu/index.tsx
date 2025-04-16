import React, { JSX } from 'react';
import './SidebarMenu.css';
import { FiMessageSquare, FiClock, FiSettings, FiX } from 'react-icons/fi';
import ThemeToggle from '../Theme/ThemeToggle';

type MenuItem = {
  id: number;
  label: string;
  icon: JSX.Element;
};

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { id: 1, label: 'Menu Item 1', icon: <FiMessageSquare /> },
  { id: 2, label: 'Menu Item 2', icon: <FiClock /> },
  { id: 3, label: 'Settings', icon: <FiSettings /> },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="icon-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <ul className="sidebar-list">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebar-item">
              <span className="icon">{item.icon}</span>
              <span className="label">{item.label}</span>
            </li>
          ))}
        </ul>
        <span className="theme-toggle">
          <ThemeToggle />
        </span>
      </div>
    </>
  );
};

export default SidebarMenu;