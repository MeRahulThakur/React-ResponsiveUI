import { useState } from 'react';
import './App.css'
import Footer from './UI/Footer'
import Header from './UI/Header'
import SidebarMenu from './UI/SidebarMenu';
import Accordion from './UI/Accordion/Accordion';
import Button from './UI/Button';

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
        <Header isSticky onMenuToggle={toggleSidebar} />
        <main style={{ flex: 1, padding: '1rem', paddingTop: '80px', paddingBottom: '80px' }}>
          <h1>Main Content Area</h1>
          <h2>Accordion</h2>
          <Accordion />
          <h2>Buttons</h2>
          <Button variant="contained" color="danger" onClick={() => {}}>Delete</Button>
          <Button variant="outlined" color="success" onClick={() => {}}>Success</Button>
          <Button variant="text" color="default" onClick={() => {}}>Cancel</Button>
          <Button variant="contained" color="default" onClick={() => {}} loading>Cancel</Button>

        </main>
        <Footer isSticky />
      </div>
    </div>
  );
};

function App() {

  return (
    <>
      <PageLayout />
    </>
  )
}

export default App
