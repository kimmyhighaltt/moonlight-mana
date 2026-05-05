import React, { useState, useMemo } from 'react';
import { auth, googleProvider } from '../firebase'; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup 
} from 'firebase/auth';
import { Sparkles, Moon, Mail, Lock } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 🌌 CELESTIAL BACKGROUND LOGIC
  const stars = useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.6 ? 2 : 1, 
      opacity: Math.random() * 0.8 + 0.2, 
      animationDuration: `${Math.random() * 4 + 2}s`, 
      animationDelay: `${Math.random() * 2}s`
    }));
  }, []);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLoginSuccess(result.user);
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onLoginSuccess(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess(userCredential.user);
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#020617] text-[#FEF3C7] p-6 overflow-hidden">
      
      {/* 🌌 ATMOSPHERIC LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#020617]" />
        {/* Soft golden nebula glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] md:w-[700px] md:h-[700px] bg-amber-900/20 rounded-full blur-[100px] mix-blend-screen" />
        
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md bg-slate-950/60 border border-amber-200/10 p-8 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative z-10 ring-1 ring-white/5">
        
        {/* Celestial Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none rounded-t-[2.5rem]" />

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200/20 shadow-[0_0_25px_rgba(251,191,36,0.2)]">
            <Sparkles className="text-amber-200" size={30} />
          </div>
          <h2 className="text-4xl font-serif text-white tracking-wide">
            {isSignUp ? 'Join the Sanctuary' : 'The Sanctuary'}
          </h2>
          <p className="text-amber-100/50 text-xs mt-3 font-light tracking-[0.2em] uppercase">
            {isSignUp ? 'Begin your cosmic journey' : 'Unlock your private space'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-950/40 border border-red-500/50 text-red-200 p-3 rounded-2xl mb-6 text-xs text-center backdrop-blur-md animate-in fade-in zoom-in duration-300">
            {error}
          </div>
        )}

        {/* Google Access */}
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 p-4 mb-6 bg-white text-slate-900 font-bold rounded-2xl hover:bg-amber-50 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center mb-8 opacity-30">
          <div className="flex-grow border-t border-amber-100"></div>
          <span className="px-4 text-[10px] uppercase tracking-[0.4em] font-bold">OR</span>
          <div className="flex-grow border-t border-amber-100"></div>
        </div>

        {/* Email Entry */}
        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          <div className="relative group">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/30 group-focus-within:text-amber-200 transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pl-12 bg-black/40 border border-amber-200/10 rounded-2xl text-white focus:outline-none focus:border-amber-200/40 transition-all placeholder:text-amber-100/20"
              required
            />
          </div>
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-100/30 group-focus-within:text-amber-200 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-12 bg-black/40 border border-amber-200/10 rounded-2xl text-white focus:outline-none focus:border-amber-200/40 transition-all placeholder:text-amber-100/20"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 p-4 bg-gradient-to-r from-amber-300 to-amber-100 text-slate-900 font-bold rounded-2xl hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Aligning...' : (isSignUp ? 'Create Profile' : 'Enter Sanctuary')}
          </button>
        </form>

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-8 w-full text-center text-[10px] uppercase tracking-[0.3em] text-amber-100/30 hover:text-amber-200 transition-colors"
        >
          {isSignUp ? 'Return to Login' : 'First Visit? Create an Account'}
        </button>
      </div>
    </div>
  );
}