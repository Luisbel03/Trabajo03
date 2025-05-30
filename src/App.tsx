import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import NotificationList from './components/Notifications/NotificationList';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Forum from './components/Forum/Forum';
import Contact from './components/Contact/Contact';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <NotificationProvider>
        <div className="app">
          <nav className="navbar">
            <div className="nav-brand">Creative Web</div>
            <div className="nav-links">
              <Link to="/">Inicio</Link>
              <Link to="/servicios">Servicios</Link>
              <Link to="/proyectos">Proyectos</Link>
              <Link to="/foro">Foro</Link>
              <Link to="/contacto">Contacto</Link>
            </div>
          </nav>

          <NotificationList />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/foro" element={<Forum />} />
              <Route path="/contacto" element={<Contact />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; 2024 Creative Web. Todos los derechos reservados.</p>
          </footer>
        </div>
      </NotificationProvider>
    </Router>
  );
};

export default App;
