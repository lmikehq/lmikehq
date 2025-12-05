import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Check } from 'lucide-react';

const NewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // useEffect(() => {
  //   // Show popup after 5 seconds
  //   const timer = setTimeout(() => {
  //     // Check if already dismissed in session storage (omitted for simplicity of demo)
  //     setIsOpen(true);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Decorative Top */}
            <div className="h-32 bg-gradient-to-br from-primary-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 h-20 w-20 rounded-full bg-black/10 blur-xl"></div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute right-4 top-4 rounded-full bg-white/20 p-1 hover:bg-white/30"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="relative z-10 flex items-center gap-3">
                   <div className="rounded-lg bg-white/20 p-2 backdrop-blur-md">
                      <Sparkles className="h-6 w-6" />
                   </div>
                   <h3 className="text-xl font-bold">MikeHQ Insider</h3>
                </div>
            </div>

            <div className="p-8">
               {!subscribed ? (
                 <>
                   <h4 className="text-2xl font-bold text-slate-900">Join the AI Revolution</h4>
                   <p className="mt-2 text-slate-600">
                     Get weekly insights on Machine Learning, System Architecture, and the future of Tech directly from MikeHQ.
                   </p>
                   
                   <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                      <div>
                        <label htmlFor="newsletter-email" className="sr-only">Email</label>
                        <input 
                          type="email" 
                          id="newsletter-email" 
                          required
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 font-bold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30"
                      >
                        Subscribe Free
                        <ArrowRight className="h-4 w-4" />
                      </button>
                   </form>
                   <p className="mt-4 text-center text-xs text-slate-400">No spam, unsubscribe anytime.</p>
                 </>
               ) : (
                 <div className="flex flex-col items-center py-8 text-center">
                    <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
                       <Check className="h-8 w-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">You're in!</h4>
                    <p className="mt-2 text-slate-600">Thanks for subscribing to MikeHQ.</p>
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;