import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hi! I'm MikeHQ's AI Assistant. Ask me anything about Mike's skills or availability!" }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    
    setTimeout(() => {
      let response = "That's a great question! Mike specializes in building scalable ML pipelines and AI architectures. You should definitely reach out to him directly via the contact form!";
      
      if (inputValue.toLowerCase().includes('python') || inputValue.toLowerCase().includes('code')) {
        response = "Mike is a Python expert! He's been using it for over 5 years for everything from backend APIs to complex Deep Learning models.";
      } else if (inputValue.toLowerCase().includes('hire') || inputValue.toLowerCase().includes('job')) {
        response = "Mike is currently open to new opportunities! He is looking for Machine Learning Engineer or AI Architect roles.";
      }

      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 1000);

    setInputValue('');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 sm:w-96"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-primary-600 p-4 text-white">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-semibold">MikeHQ Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/20">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto bg-slate-50 p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-700 shadow-sm rounded-bl-none ring-1 ring-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="border-t border-slate-100 bg-white p-3">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full rounded-full border-slate-200 bg-slate-50 py-2 pl-4 pr-10 text-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button type="submit" className="absolute right-2 top-1.5 rounded-full p-1 text-primary-600 hover:bg-primary-50">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-600/30"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.button>
      </div>
    </>
  );
};

export default ChatWidget;