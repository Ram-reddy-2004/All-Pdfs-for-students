
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
      <Link to="/" className="flex items-center hover:text-indigo-600">
        <Home className="w-4 h-4 mr-1" />
        <span>Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        // Map IDs to pretty names if possible (e.g., 'cse' -> 'CSE')
        const name = value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-300 flex-shrink-0" />
            {last ? (
              <span className="font-semibold text-slate-800">{decodeURIComponent(name)}</span>
            ) : (
              <Link to={to} className="hover:text-indigo-600 transition-colors">
                {decodeURIComponent(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
