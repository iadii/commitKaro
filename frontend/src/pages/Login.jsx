import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, ArrowRight } from '@phosphor-icons/react';
import { BACKEND_URL } from '../config/config';
import Footer from '../components/Footer';

const Login = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, loading, navigate, from]);

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative">
        
       {/* Background Image & Overlay */}
       <div className="absolute inset-0 z-0">
          <img 
            src="/editorial_hero_image_1768204267018.png" 
            alt="Editorial Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity blur-sm"
          />
          <div className="absolute inset-0 bg-zinc-950/60"></div>
       </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        {/* Glassmorphic Login Card */}
        <div className="w-full max-w-sm bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-black/50">
          
          <div className="mb-10 text-center">
             <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 border border-white/10 mb-6 text-white text-opacity-80">
               <User weight="light" size={28} />
             </div>
             
             <h1 className="text-3xl font-display font-medium text-white mb-3">Welcome Back</h1>
             <p className="text-zinc-400 text-sm leading-relaxed">
               Enter your sanctuary. <br/> Continue your writing journey.
             </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="group w-full bg-white hover:bg-zinc-200 text-zinc-900 font-medium py-3.5 px-4 rounded-full transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="relative z-10">Continue with Google</span>
          </button>

          <div className="mt-8 text-center">
             <Link to="/" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-1 group">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Home
             </Link>
          </div>

        </div>
      </div>
      
      <div className="relative z-10">
         <Footer />
      </div>
    </div>
  );
};

export default Login;