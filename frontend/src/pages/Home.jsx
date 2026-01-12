import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight } from '@phosphor-icons/react';
import Footer from '../components/Footer';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      
      {/* Hero Section - Split Layout */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        
        {/* Left Side - Typography */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-32">
          <div className="max-w-xl">
            <p className="text-zinc-500 text-sm uppercase tracking-[0.3em] mb-8">
              A writing sanctuary
            </p>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium text-white leading-[1.1] mb-8">
              Your words,<br />
              <span className="text-zinc-500">beautifully simple.</span>
            </h1>
            
            <p className="text-zinc-500 text-lg leading-relaxed mb-12 max-w-md">
              Nano strips away distractions so you can focus on what matters — the craft of writing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
                >
                  Go to Dashboard
                  <ArrowRight weight="bold" size={18} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
                  >
                    Start Writing
                    <ArrowRight weight="bold" size={18} />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-zinc-400 hover:text-white transition-colors"
                  >
                    Explore Stories
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Side - Visual */}
        <div className="flex-1 relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950">
            <img 
              src="/editorial_hero_image_1768204267018.png" 
              alt="" 
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Quote */}
          <div className="absolute bottom-16 left-16 right-16">
            <blockquote className="text-2xl font-serif italic text-zinc-400 leading-relaxed">
              "The first draft is just you telling yourself the story."
            </blockquote>
            <p className="mt-4 text-xs text-zinc-600 uppercase tracking-widest">— Terry Pratchett</p>
          </div>
        </div>
        
      </section>

      {/* Stats Section */}
      <section className="py-24 px-8 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-medium text-white mb-2">∞</p>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Stories Written</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-medium text-white mb-2">0</p>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Distractions</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-medium text-white mb-2">1</p>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Focus</p>
          </div>
          <div className="text-center">
            <p className="text-4xl lg:text-5xl font-display font-medium text-white mb-2">∞</p>
            <p className="text-xs text-zinc-600 uppercase tracking-widest">Possibilities</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-display font-medium text-white mb-8">
            Ready to write?
          </h2>
          <p className="text-zinc-500 text-lg mb-12 max-w-md mx-auto">
            Join writers who've chosen simplicity over complexity.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors"
          >
            Get Started — It's Free
            <ArrowRight weight="bold" size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;