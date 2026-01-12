import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Search,
  User,
  PenTool,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950 border-b border-white/5 px-6 py-4 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto grid grid-cols-12 items-center">
          
          {/* LEFT: Primary Navigation */}
          <div className="col-span-4 flex items-center gap-8 hidden md:flex">
             <Link 
               to="/" 
               className={`text-xs font-medium tracking-widest uppercase transition-colors ${isActive('/') ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               Home
             </Link>
             <Link 
               to="/dashboard" 
               className={`text-xs font-medium tracking-widest uppercase transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               Explore
             </Link>
             <Link 
               to="/about" 
               className={`text-xs font-medium tracking-widest uppercase transition-colors ${location.pathname === '/about' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
             >
               Manifesto
             </Link>
          </div>

          {/* CENTER: Logo */}
          <div className="col-span-12 md:col-span-4 flex justify-between md:justify-center items-center">
             {/* Mobile Menu Button */}
             <button 
                className="md:hidden text-zinc-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
             </button>

             <Link to="/" className="flex items-center gap-2 group">
                {/* Logo Image */}
                <img 
                  src="/nano_writing_logo_1768216125397.png" 
                  alt="Nano" 
                  className="h-8 w-auto invert opacity-90 group-hover:opacity-100 transition-opacity" 
                />
                <span className="font-display text-2xl font-medium text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                  NANO
                </span>
             </Link>

             {/* Mobile Search/User Placeholder (to balance center logo on mobile) */}
             <div className="w-5 md:hidden"></div>
          </div>

          {/* RIGHT: Secondary Nav & Actions */}
          <div className="col-span-4 flex items-center justify-end gap-6 hidden md:flex">
             {isAuthenticated ? (
               <>
                 <Link 
                   to="/create" 
                   className={`text-xs font-medium tracking-widest uppercase transition-colors flex items-center gap-2 ${isActive('/create') ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                   Write
                 </Link>
                 
                 <div className="w-px h-3 bg-zinc-800 mx-2"></div>
                 
                 <Link to="/profile" className="text-zinc-400 hover:text-white transition-colors" aria-label="Profile">
                    <User className="w-4 h-4" />
                 </Link>
                 
                 <button onClick={handleLogout} className="text-zinc-400 hover:text-red-400 transition-colors" aria-label="Logout">
                    <LogOut className="w-4 h-4" />
                 </button>
               </>
             ) : (
               <>
                 <Link 
                   to="/login" 
                   className="text-xs font-medium tracking-widest uppercase text-white hover:text-zinc-300 transition-colors"
                 >
                   Log In
                 </Link>
               </>
             )}
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-8 md:hidden">
           <div className="flex flex-col gap-6 text-center">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display text-white">Home</Link>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display text-white">Explore</Link>
              <Link to="/create" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display text-white">Write</Link>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="text-xl font-display text-red-400 mt-4">Sign Out</button>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display text-white mt-4">Log In</Link>
              )}
           </div>
        </div>
      )}
    </>
  );
};

export default Navbar;