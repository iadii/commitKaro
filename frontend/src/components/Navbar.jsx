import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  House, 
  MagnifyingGlass, 
  PencilSimple, 
  User,
  SignOut
} from '@phosphor-icons/react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="fixed top-6 left-8 z-50">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-all duration-300 hover:bg-zinc-900 hover:ring-white/20 hover:scale-105"
        >
          <span className="font-serif italic font-bold text-white tracking-tight text-lg">Vital Logs</span>
        </Link>
      </div>

      <div className="fixed top-6 right-8 z-50">
        <div className="flex items-center gap-6 px-2 py-2 rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          
          <div className="flex items-center gap-1">
            <Link 
              to="/" 
              className={`relative px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full ${isActive('/') ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Home
            </Link>
            <Link 
              to={isAuthenticated ? "/dashboard" : "/login"}
              className={`relative px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full ${isActive('/dashboard') ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
            >
              Explore
            </Link>
            {isAuthenticated && (
              <Link 
                to="/create" 
                className={`relative px-6 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full ${isActive('/create') ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
              >
                Write
              </Link>
            )}
          </div>

          <div className="w-px h-5 bg-white/10"></div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className={`p-2.5 rounded-full transition-all duration-300 ${isActive('/profile') ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'text-zinc-400 hover:text-white hover:bg-white/10'}`}
                  aria-label="Profile"
                >
                  <User weight={isActive('/profile') ? 'fill' : 'regular'} size={18} />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="p-2.5 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  aria-label="Sign Out"
                >
                  <SignOut weight="regular" size={18} />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 text-xs font-bold tracking-widest uppercase bg-white text-black rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;