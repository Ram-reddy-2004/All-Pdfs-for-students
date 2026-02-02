
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { LogIn, Github, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (u: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent, role: 'student' | 'admin' = 'student') => {
    e.preventDefault();
    const mockUser: User = {
      id: role === 'admin' ? 'admin-1' : 'user-1',
      name: role === 'admin' ? 'Admin Controller' : 'Scholar Student',
      email: email || 'student@university.edu',
      role: role,
    };
    onLogin(mockUser);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-black">S</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-slate-500">Log in to your scholar account</p>
        </div>

        <form onSubmit={(e) => handleLogin(e)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">University Email</label>
            <input 
              required
              type="email" 
              placeholder="name@university.edu"
              className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
              <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</button>
            </div>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-slate-50 border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold"><span className="bg-white px-2 text-slate-300">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all font-bold text-slate-600">
              <Mail className="w-5 h-5 mr-2 text-red-500" />
              Google
            </button>
            <button type="button" className="flex items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all font-bold text-slate-600">
              <Github className="w-5 h-5 mr-2 text-slate-900" />
              Github
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400 font-medium">
          Don't have an account? <button className="text-indigo-600 font-bold hover:underline">Join the Hub</button>
        </div>
        
        <div className="mt-10 pt-6 border-t border-slate-50 text-center">
          <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold mb-4">Quick Testing Access</p>
          <div className="flex justify-center space-x-2">
            <button 
              onClick={(e) => handleLogin(e, 'student')}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100"
            >
              Log in as Student
            </button>
            <button 
              onClick={(e) => handleLogin(e, 'admin')}
              className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800"
            >
              Log in as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
