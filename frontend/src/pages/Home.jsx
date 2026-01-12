import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from '@phosphor-icons/react';
import Footer from '../components/Footer';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 relative">
      
      {/* Full Screen Hero with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center lg:justify-start px-8 lg:px-24 overflow-hidden">
        
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/editorial_hero_image_1768204267018.png" 
            alt="Editorial Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-luminosity"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl pt-20">
          <p className="text-zinc-400 text-xs sm:text-sm uppercase tracking-[0.3em] mb-6 sm:mb-8 font-medium pl-1">
            A writing sanctuary
          </p>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-medium text-white leading-[0.9] mb-8 sm:mb-12 tracking-tighter">
            Your words,<br />
            <span className="text-zinc-500 font-serif italic">beautifully simple.</span>
          </h1>
          
          <p className="text-zinc-300 text-lg sm:text-xl leading-relaxed mb-12 max-w-md font-light border-l border-white/20 pl-6">
            This platform strips away distractions so you can focus on what matters — the craft of writing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5"
              >
                Go to Dashboard
                <ArrowRight weight="bold" size={18} />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors shadow-xl shadow-white/5"
                >
                  Start Writing
                  <ArrowRight weight="bold" size={18} />
                </Link>
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white hover:text-zinc-300 transition-colors backdrop-blur-sm bg-white/5 rounded-full border border-white/10"
                >
                  Explore Stories
                </Link>
              </>
            )}
          </div>
        </div>


        
      </section>


      <section className="border-t border-zinc-900 bg-zinc-950 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          
          {/* Stats Column */}
          <div className="flex-1 py-16 md:py-24 px-8 md:pr-12 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-12 sm:gap-16 max-w-lg mx-auto md:mx-0">
              <div className="text-center md:text-left group cursor-default">
                <p className="text-3xl lg:text-5xl font-display font-medium text-zinc-800 group-hover:text-white transition-colors duration-500 mb-2">∞</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Stories Written</p>
              </div>
              <div className="text-center md:text-left group cursor-default">
                <p className="text-3xl lg:text-5xl font-display font-medium text-zinc-800 group-hover:text-white transition-colors duration-500 mb-2">0</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Distractions</p>
              </div>
              <div className="text-center md:text-left group cursor-default">
                <p className="text-3xl lg:text-5xl font-display font-medium text-zinc-800 group-hover:text-white transition-colors duration-500 mb-2">1</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Focus</p>
              </div>
              <div className="text-center md:text-left group cursor-default">
                <p className="text-3xl lg:text-5xl font-display font-medium text-zinc-800 group-hover:text-white transition-colors duration-500 mb-2">∞</p>
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Possibilities</p>
              </div>
            </div>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px md:w-px md:h-auto bg-zinc-900"></div>

          {/* CTA Column */}
          <div className="flex-1 py-16 md:py-24 px-8 md:pl-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-6 tracking-tight">
              Ready to write?
            </h2>
            <p className="text-zinc-500 text-sm mb-10 uppercase tracking-widest font-medium">
              Simplicity over complexity.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 text-white border-b border-white pb-1 hover:text-zinc-300 hover:border-zinc-500 transition-all font-display text-lg"
            >
              Start Writing
              <ArrowRight weight="regular" size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;