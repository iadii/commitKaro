import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createBlog } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }
    setIsSubmitting(true);
    const blog = await createBlog({
      title: title.trim(),
      content: content.trim(),
    });
    if (blog) {
      toast.success('Blog created successfully!');
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-background">
      {/* Editor Section */}
      <div className="flex-1 flex flex-col border-r border-zinc-800">
        {/* Toolbar */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/50">
           <button
             onClick={() => navigate('/dashboard')}
             className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
           >
             <ArrowLeft className="w-4 h-4" />
             <span className="text-sm font-medium">Dashboard</span>
           </button>
           
           <div className="flex items-center gap-2">
             <span className="text-xs text-zinc-500 mr-2">
                {title ? 'Unsaved changes' : 'New Draft'}
             </span>
             <button
               onClick={handleSubmit}
               disabled={isSubmitting || !title.trim() || !content.trim()}
               className="btn-primary py-1.5 px-3 text-sm flex items-center gap-2"
             >
               {isSubmitting ? <LoadingSpinner size="small" /> : <Save className="w-3 h-3" />}
               Publish
             </button>
           </div>
        </div>

        {/* Edit Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
           <div className="max-w-3xl mx-auto space-y-8">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post Title"
                className="w-full bg-transparent border-none text-4xl md:text-5xl font-display font-bold text-white placeholder-zinc-700 focus:outline-none focus:ring-0 p-0"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full h-full min-h-[500px] bg-transparent border-none text-lg text-zinc-300 placeholder-zinc-700 focus:outline-none focus:ring-0 p-0 resize-none leading-relaxed font-mono"
              />
           </div>
        </div>
      </div>

      {/* Preview Section - Hidden on mobile */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 flex-col">
          <div className="h-14 border-b border-zinc-900 flex items-center px-6 bg-zinc-950">
             <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
               <Eye className="w-3 h-3" /> Preview
             </span>
          </div>
          <div className="flex-1 overflow-y-auto p-12 bg-zinc-950">
             <div className="max-w-2xl mx-auto prose prose-invert prose-zinc">
                {title ? (
                   <h1>{title}</h1>
                ) : (
                   <h1 className="opacity-20">Post Title</h1>
                )}
                {content ? (
                   <div className="whitespace-pre-wrap">{content}</div>
                ) : (
                   <p className="opacity-20 whitespace-pre-wrap">
                      Nothing to preview yet. Start writing on the left to see it appear here.
                   </p>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default CreateBlog;