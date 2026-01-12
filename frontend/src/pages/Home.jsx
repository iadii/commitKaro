import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Feather, Coffee, BookOpen, Sun, Wind } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
  {
    icon: <Feather className="w-5 h-5" />,
    title: 'Pure Expression',
    description: 'A canvas designed for your thoughts, free from the noise of likes and algorithms.',
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: 'Morning Routine',
    description: 'Start your day with clarity. Nano is built for the daily ritual of writing.',
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Daylight Mode',
    description: 'Optimized for reading and writing in natural light. Easy on the eyes, always.',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Chapter & Verse',
    description: 'Organize your thoughts into collections that tell a larger story.',
  },
  {
    icon: <Wind className="w-5 h-5" />,
    title: 'Fast as Thought',
    description: 'Instant loading times so nothing gets between you and your flow.',
  }
];

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col pt-24"> {/* Added pt-24 for fixed top navbar, removed pb-20 */}
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
              src="/editorial_hero_image_1768204267018.png" 
              alt="Editorial Background" 
              className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale-[20%]"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 via-transparent to-zinc-950/50"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-20">
          <div className="mb-6 animate-fade">
             <img src="/nano_writing_logo_1768216125397.png" alt="Nano" className="h-32 mx-auto invert opacity-90" />
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-medium mb-8 tracking-tighter text-white leading-[0.9]">
            Write with <br />
            <span className="italic font-serif text-zinc-400">intention.</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Nano is a sanctuary for your words. <br/>
            Minimalist, focused, and beautifully simple.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="btn-primary rounded-full px-8 py-4 text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn-primary rounded-full px-8 py-4 text-lg"
                >
                  Start Writing
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Minimalism Quote */}
      <section className="py-32 px-4 bg-zinc-950 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
           <p className="text-2xl md:text-4xl font-serif italic text-zinc-500 leading-relaxed">
             "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
           </p>
           <p className="mt-6 text-sm text-zinc-600 uppercase tracking-widest font-mono">Antoine de Saint-Exupéry</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="col-span-1 md:col-span-2 lg:col-span-1 lg:pr-12">
               <h2 className="text-4xl font-display font-medium text-white mb-6">
                 Designed for <br/> the modern stoic.
               </h2>
               <p className="text-zinc-500 leading-relaxed mb-8">
                 In a world of noise, Nano offers quiet. We've removed the clutter so you can hear yourself think.
               </p>
               <Link to="/login" className="inline-flex items-center text-white border-b border-white pb-1 hover:text-zinc-300 hover:border-zinc-300 transition-colors">
                  Begin your journey <ArrowRight className="w-4 h-4 ml-2" />
               </Link>
            </div>

            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-400 mb-6 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
                <p className="text-base text-zinc-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;