import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Bot, Sparkles, X, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

interface AIChatbotProps {
  onClose?: () => void;
  isFloating?: boolean;
}

export default function AIChatbot({ onClose, isFloating = false }: AIChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi there! I'm the P&N Solutions Digital Assistant. Ask me anything about our custom web design, AI chatbots, WhatsApp business automation, or voice agents! How can I help grow your business today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What are your services?",
    "How much is a website + chatbot?",
    "Are you online-only?",
    "How do I get a custom quote?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    setError(null);
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for context (excluding the very first welcome message)
      const chatHistory = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          text: m.text,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive response from AI server.");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: "bot",
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      setError("Unable to connect to the assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div
      id="ai-chatbot"
      className={`flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl ${
        isFloating ? "h-[500px] w-full sm:w-[380px]" : "h-[600px] w-full"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="bg-gradient-to-tr from-cyan-500 to-indigo-500 p-2 rounded-xl text-white shadow-lg">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wide">P&N AI Assistant</h4>
            <p className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span>●</span> Online & Ready
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            id="chatbot-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              id={`chat-msg-${msg.id}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.sender === "bot" && (
                  <div className="bg-slate-800 text-cyan-400 p-1.5 rounded-lg mt-1 shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                      : "bg-slate-800/80 border border-slate-700/50 text-slate-100 rounded-tl-none shadow-sm"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[10px] text-slate-400/80 mt-1 text-right font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start items-center space-x-2"
            id="chat-loading-indicator"
          >
            <div className="bg-slate-800 text-cyan-400 p-1.5 rounded-lg">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-slate-800 text-slate-400 text-xs px-3 py-1.5 rounded-full border border-slate-700/50 flex items-center space-x-1 animate-pulse">
              <span>AI is thinking</span>
              <span className="dot-1">.</span>
              <span className="dot-2">.</span>
              <span className="dot-3">.</span>
            </div>
          </motion.div>
        )}

        {error && (
          <div className="flex justify-center p-2" id="chat-error-container">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <p>{error}</p>
                <button
                  onClick={() => {
                    if (messages.length > 0) {
                      const lastUserMsg = [...messages].reverse().find((m) => m.sender === "user");
                      if (lastUserMsg) {
                        handleSend(lastUserMsg.text);
                      }
                    }
                  }}
                  className="mt-1.5 text-cyan-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Tags */}
      {messages.length === 1 && (
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800/60 overflow-x-auto whitespace-nowrap no-scrollbar flex gap-2">
          {quickPrompts.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(tag)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-full border border-slate-700/40 transition-all font-sans cursor-pointer shrink-0"
              id={`quick-tag-${idx}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950 border-t border-slate-800/80 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="Ask about pricing, packages, custom tools..."
          className="flex-1 bg-slate-900 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
          id="chat-input-field"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white p-2.5 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:shadow-none hover:shadow-cyan-500/10 transition-all cursor-pointer flex items-center justify-center shrink-0"
          id="chat-submit-btn"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
