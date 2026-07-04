import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import AIChatbot from "./AIChatbot";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a subtle attention-grabbing notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const triggerWhatsApp = () => {
    const prefilledMessage = encodeURIComponent(
      "Hello P&N Solutions! 👋 I visited your website and would love to learn more about your AI-powered digital services."
    );
    window.open(`https://wa.me/27731030264?text=${prefilledMessage}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none" id="whatsapp-floating-widget">
      {/* Interactive Chat Popup Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 pointer-events-auto w-[92vw] sm:w-[380px]"
            id="whatsapp-widget-popup"
          >
            {/* Embedded AI Chatbot Custom Configured for Widget */}
            <div className="shadow-2xl border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-905">
              <AIChatbot onClose={() => setIsOpen(false)} isFloating={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle notification badge */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800/80 rounded-2xl p-4 shadow-xl mb-3 mr-1 pointer-events-auto max-w-[280px]"
            id="whatsapp-notification-bubble"
          >
            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded-xl border border-emerald-500/20 mt-0.5 shrink-0">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h5 className="font-display font-bold text-white text-xs">P&N AI Assistant</h5>
                <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                  Have any questions about custom websites, chatbots, or pricing? Chat with me!
                </p>
                <div className="flex gap-2 mt-2.5">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setShowNotification(false);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    id="notif-chat-ai-btn"
                  >
                    Chat with AI
                  </button>
                  <button
                    onClick={triggerWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[10px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    id="notif-chat-wa-btn"
                  >
                    WhatsApp Direct
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-slate-500 hover:text-slate-300 transition-colors shrink-0 p-0.5"
                id="notif-close-btn"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Bubble Trigger */}
      <div className="flex gap-3 items-center pointer-events-auto">
        {/* Direct WhatsApp Call to Action pill */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={triggerWhatsApp}
            className="hidden md:flex bg-emerald-600 hover:bg-emerald-500 text-white font-display font-semibold text-xs py-2 px-4 rounded-full shadow-lg border border-emerald-500/30 items-center gap-2 cursor-pointer transition-all hover:scale-105"
            id="floating-wa-pill-btn"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
          }}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all shadow-xl shadow-cyan-500/10 border ${
            isOpen
              ? "bg-slate-800 hover:bg-slate-700 border-slate-700"
              : "bg-gradient-to-tr from-cyan-500 to-indigo-500 hover:brightness-110 border-cyan-400/20"
          }`}
          id="floating-main-trigger-btn"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-500 rounded-full border border-slate-950"></span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
