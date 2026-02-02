
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import AcademicView from './pages/AcademicView';
import SubjectDetail from './pages/SubjectDetail';
import Upload from './pages/Upload';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import { User, Resource } from './types';
import { MOCK_RESOURCES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);

  // Persistent Auth Mock (Simple)
  useEffect(() => {
    const savedUser = localStorage.getItem('bt_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('bt_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bt_user');
  };

  const handleAddResource = (newRes: Resource) => {
    setResources(prev => [newRes, ...prev]);
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/year/:yearId" element={<AcademicView resources={resources} />} />
              <Route path="/year/:yearId/dept/:deptId" element={<AcademicView resources={resources} />} />
              <Route path="/year/:yearId/dept/:deptId/sem/:semId" element={<AcademicView resources={resources} />} />
              <Route path="/subject/:subjectId" element={<SubjectDetail resources={resources} />} />
              
              <Route 
                path="/upload" 
                element={user ? <Upload onUpload={handleAddResource} user={user} /> : <Navigate to="/login" />} 
              />
              
              <Route 
                path="/admin" 
                element={user?.role === 'admin' ? <AdminPanel resources={resources} onUpdateStatus={handleUpdateStatus} /> : <Navigate to="/" />} 
              />
              
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </Routes>
          </div>
        </main>

        <footer className="bg-white border-t border-slate-200 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-indigo-600 mb-2">B.Tech Scholars Hub</h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Empowering Indian engineering students with high-quality, structured academic resources.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-400">
              <Link to="/" className="hover:text-indigo-600">Privacy Policy</Link>
              <Link to="/" className="hover:text-indigo-600">Terms of Service</Link>
              <Link to="/" className="hover:text-indigo-600">Contact Us</Link>
            </div>
            <p className="mt-8 text-xs text-slate-300">© 2024 Scholars Hub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
