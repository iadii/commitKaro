import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { XCircle, CheckCircle } from '@phosphor-icons/react';
import axios from 'axios';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [error, setError] = useState(searchParams.get('error'));
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    // If there's an error in URL params, handle it
    if (error) {
      const timer = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
      return () => clearTimeout(timer);
    }

    // If no token, redirect to login
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Save token to localStorage and axios headers immediately
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
      return;
    }

    // Attempt login if we have a token and haven't tried yet
    if (token && !loginAttempted && !loading) {
      setLoginAttempted(true);
      login(token)
        .then(() => {
          // Login successful, redirect will happen via isAuthenticated effect
        })
        .catch((err) => {
          console.error('Login failed:', err);
          setError('Authentication failed. Please try again.');
        });
    }
  }, [token, login, loginAttempted, error, navigate, isAuthenticated, loading]);

  // Redirect to dashboard when authentication is complete
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard', { replace: true });
      
    }
  }, [isAuthenticated, loading, navigate]);

  if (error) {
    return (
      <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/30">
            <XCircle className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Authentication Failed</h1>
          <p className="text-zinc-500 text-sm mb-6">{error}</p>
          <div className="text-xs text-zinc-600 bg-zinc-950 py-2 px-4 rounded-md inline-block border border-zinc-800">
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center max-w-sm w-full">
         <div className="mb-6 flex justify-center">
            <LoadingSpinner size="large" />
         </div>
         <h1 className="text-lg font-medium text-white mb-2">Signing you in</h1>
         <p className="text-zinc-500 text-sm">Please wait while we verify your credentials...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;