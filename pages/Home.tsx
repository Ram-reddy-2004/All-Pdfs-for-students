
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS, YEARS } from '../constants';
import * as Icons from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-[3rem] -mx-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Everything you need to <br />
          <span className="text-indigo-600">Ace Engineering.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium notes, previous year question papers, and lab manuals. Structured for all 4 years of your B.Tech journey.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => navigate('/year/1')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95"
          >
            Browse Resources
          </button>
          <button 
            onClick={() => navigate('/upload')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-600 border border-indigo-100 rounded-2xl font-bold shadow-md hover:bg-slate-50 transition-all active:scale-95"
          >
            Contribute Notes
          </button>
        </div>
      </section>

      {/* Year Selection */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Select Academic Year</h2>
            <p className="text-slate-500">Pick your current year to view relevant subjects</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {YEARS.map(year => (
            <button
              key={year}
              onClick={() => navigate(`/year/${year}`)}
              className="group p-8 bg-white border border-slate-100 rounded-[2rem] text-center transition-all hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-200 active:scale-95"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
                <span className="text-2xl font-bold text-indigo-600">{year}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Year {year}</h3>
              <p className="text-sm text-slate-400">Semester {year * 2 - 1} & {year * 2}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Department Cards */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore by Department</h2>
            <p className="text-slate-500">Access specialized material for your branch</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DEPARTMENTS.map(dept => {
            const IconComponent = (Icons as any)[dept.icon] || Icons.Book;
            return (
              <button
                key={dept.id}
                onClick={() => navigate(`/year/1/dept/${dept.id}`)}
                className="flex items-center p-6 bg-white border border-slate-100 rounded-2xl text-left transition-all hover:shadow-lg hover:border-indigo-100 group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{dept.name}</h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{dept.fullName.split(' ')[0]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-16">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icons.ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Verified Content</h3>
            <p className="text-slate-400 leading-relaxed">Every document goes through strict admin moderation to ensure accuracy and quality.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icons.Zap className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Fast Access</h3>
            <p className="text-slate-400 leading-relaxed">Reach any resource in under 3 clicks with our optimized hierarchy and search.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icons.Layers className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Community Led</h3>
            <p className="text-slate-400 leading-relaxed">Built by students, for students. Helping thousands of scholars every semester.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
