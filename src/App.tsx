import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import NotificationList from './components/Notifications/NotificationList';
import PrivateRoute from './components/Auth/PrivateRoute';
import Header from './components/Navigation/Header';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Forum from './components/Forum/Forum';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import EditProfile from './components/Profile/EditProfile';
import ChangePassword from './components/Profile/ChangePassword';
import ExploraContenidos from './components/ExploraContenidos/ExploraContenidos';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <div className="app">
            <NotificationList />
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/servicios" 
                  element={
                    <PrivateRoute>
                      <Services />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/proyectos" 
                  element={
                    <PrivateRoute>
                      <Projects />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/foro" 
                  element={
                    <PrivateRoute>
                      <Forum />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/contacto" 
                  element={
                    <PrivateRoute>
                      <Contact />
                    </PrivateRoute>
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/explorar" element={<ExploraContenidos />} />
                <Route
                  path="/perfil"
                  element={
                    <PrivateRoute>
                      <EditProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/cambiar-password"
                  element={
                    <PrivateRoute>
                      <ChangePassword />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
