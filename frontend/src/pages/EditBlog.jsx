import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { FloppyDisk, ArrowLeft, Eye } from '@phosphor-icons/react';
import toast from 'react-hot-toast';

const EditBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { updateBlog, fetchBlog } = useBlog();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadBlog = async () => {
      setIsLoading(true);
      const blog = await fetchBlog(id);
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
      } else {
        toast.error('Blog not found');
        navigate('/dashboard');
      }
      setIsLoading(false);
    };

    if (id) {
      loadBlog();
    }
  }, [id, fetchBlog, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }
    setIsSubmitting(true);
    const blog = await updateBlog(id, {
      title: title.trim(),
      content: content.trim(),
    });
    if (blog) {
      toast.success('Blog updated successfully!');
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="large" />
      </div>
    );
  }

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
                {title ? 'Unsaved changes' : 'Draft'}
             </span>
             <button
               onClick={handleSubmit}
               disabled={isSubmitting || !title.trim() || !content.trim()}
               className="btn-primary py-1.5 px-3 text-sm flex items-center gap-2"
             >
               {isSubmitting ? <LoadingSpinner size="small" /> : <FloppyDisk weight="bold" size={12} />}
               Update
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

export default EditBlog; 