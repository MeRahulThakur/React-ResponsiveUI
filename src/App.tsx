import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Footer from './UI/Footer'
import Header from './UI/Header'
import SidebarMenu from './UI/SidebarMenu';
import DesignSystemPage from './pages/DesignSystemPage';
import FormPage from './pages/FormPage';
import SettingsPage from './pages/SettingsPage';
import Home from './pages/HomePage';

const PageLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        style={{
          flex: 1,
          marginLeft: isSidebarOpen ? '260px' : '0',
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header isSticky onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main style={{ flex: 1, padding: '1rem', marginBottom: '3.5rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer isSticky />
      </div>
    </div>
  );
};

function App() {

  return (
    <Router>
      <PageLayout />
    </Router>
  )
}

export default App
