
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, PlusCircle, UserCircle, LogOut, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Scholars<span className="text-indigo-600">Hub</span></span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search subjects, topics, or years..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full text-sm transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/upload" className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Upload</span>
          </Link>

          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full border-2 border-slate-200"
                />
                <span className="text-sm font-medium text-slate-700 hidden lg:inline">{user.name}</span>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
