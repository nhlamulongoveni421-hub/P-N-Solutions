import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Info, Calculator, MessageSquare, Send, Sparkles } from "lucide-react";
import { PricingOption } from "../types";

interface InteractiveCalculatorProps {
  onQuoteGenerated: (message: string) => void;
}

export default function InteractiveCalculator({ onQuoteGenerated }: InteractiveCalculatorProps) {
  const pricingOptions: PricingOption[] = [
    { id: "web_only", name: "Modern Custom Website Only", price: 2000, description: "Fast, responsive, and beautifully designed landing page or multi-page site.", category: "core" },
    { id: "chatbot", name: "AI Chatbot Integration", price: 1500, description: "Intelligent customer service assistant integrated into your website.", category: "addon" },
    { id: "whatsapp_integration", name: "WhatsApp Chat Bridge", price: 500, description: "Let website visitors chat directly with you on your WhatsApp with a single click.", category: "addon" },
    { id: "whatsapp_ai", name: "WhatsApp Business AI Automation", price: 2000, description: "A self-contained AI agent answering client questions 24/7 inside WhatsApp.", category: "core" },
    { id: "voice_agent", name: "AI Voice Agent (Telephone)", price: 5000, description: "Automated phone assistant answering calls, booking appointments, and capturing leads.", category: "core" },
    { id: "custom_agent", name: "AI Agent Custom Automation", price: 8000, description: "Bespoke database or workflow integrations to completely automate your back-office tasks.", category: "core" },
  ];

  const [selectedIds, setSelectedIds] = useState<string[]>(["web_only", "chatbot"]);
  const [businessName, setBusinessName] = useState("");

  const toggleOption = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedOptions = pricingOptions.filter((opt) => selectedIds.includes(opt.id));
  const total = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);

  const getWhatsAppMessage = () => {
    const header = `Hello P&N Solutions! 🚀\nI've custom-built a package on your website calculator and would love to get a quote:\n\n`;
    const biz = businessName ? `🏢 *Business*: ${businessName}\n` : "";
    const items = selectedOptions.map((opt) => `• *${opt.name}* (R${opt.price.toLocaleString()})`).join("\n");
    const totalStr = `\n\n💰 *Estimated Investment*: R${total.toLocaleString()}`;
    const footer = `\n\nPlease let me know when we can discuss this project!`;
    return encodeURIComponent(header + biz + items + totalStr + footer);
  };

  const handleApplyToForm = () => {
    const textMsg = `Hello Ngoveni and Nkuna! I configured a package on your pricing calculator:
${businessName ? `Business Name: ${businessName}\n` : ""}Selected services:
${selectedOptions.map((opt) => `- ${opt.name} (R${opt.price})`).join("\n")}
Total Estimated: R${total}

I'd love to discuss my project with you!`;
    onQuoteGenerated(textMsg);

    // Scroll to contact form smoothly
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="price-calculator" className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-2xl border border-cyan-500/20">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display font-bold text-2xl text-white">Interactive Quote Builder</h3>
          <p className="text-slate-400 text-sm">Select services to construct your perfect growth package in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Service Checklist */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950/40 rounded-2xl p-4 border border-slate-800/60 mb-4">
            <label className="block text-slate-300 font-medium text-xs uppercase tracking-wider mb-2 font-mono">
              Your Business Name (Optional)
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="e.g., Rise Coffee Shop"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 hover:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-all"
              id="calculator-biz-input"
            />
          </div>

          <div className="space-y-3">
            {pricingOptions.map((opt) => {
              const isSelected = selectedIds.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 ${
                    isSelected
                      ? "bg-slate-800/40 border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                      : "bg-slate-950/20 border-slate-800/60 hover:bg-slate-800/20 hover:border-slate-700"
                  }`}
                  id={`calc-option-${opt.id}`}
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isSelected
                          ? "bg-cyan-500 border-cyan-400 text-white"
                          : "border-slate-700 group-hover:border-slate-500 bg-slate-900"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h4 className={`font-semibold text-sm transition-colors ${isSelected ? "text-cyan-300" : "text-white"}`}>
                        {opt.name}
                      </h4>
                      <span className="font-mono text-xs font-bold text-slate-200 bg-slate-950/60 border border-slate-800 px-2 py-0.5 rounded-lg shrink-0">
                        R{opt.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{opt.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Total Box */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 rounded-3xl border border-slate-800/80 p-6 lg:p-8">
          <div>
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
              Live Estimate
            </span>
            <h4 className="font-display font-bold text-white text-lg mb-6">Your Customized Bundle</h4>

            <div className="space-y-4 mb-6">
              {selectedOptions.length === 0 ? (
                <p className="text-slate-500 text-sm italic">No services selected. Choose options on the left to begin.</p>
              ) : (
                <div className="max-h-[180px] overflow-y-auto space-y-2 pr-1">
                  {selectedOptions.map((opt) => (
                    <div key={opt.id} className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 truncate max-w-[70%]">{opt.name}</span>
                      <span className="text-slate-400 font-mono">R{opt.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <hr className="border-slate-800 my-4" />

            <div className="flex justify-between items-baseline mb-2">
              <span className="text-slate-400 text-sm font-medium">Estimated Investment:</span>
              <span className="text-3xl font-display font-extrabold text-white bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                R{total.toLocaleString()}
              </span>
            </div>
            
            <div className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-xl p-3.5 text-xs flex gap-2.5 items-start">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <p className="leading-relaxed text-slate-300">
                Prices may vary depending on project complexity. All core systems are highly scalable and tailored to your operations.
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            <button
              onClick={handleApplyToForm}
              disabled={selectedOptions.length === 0}
              className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-sm py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
              id="calc-apply-form-btn"
            >
              <Send className="w-4 h-4" /> Apply to Contact Form
            </button>

            <a
              href={selectedOptions.length > 0 ? `https://wa.me/27731030264?text=${getWhatsAppMessage()}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 ${
                selectedOptions.length === 0 ? "opacity-40 pointer-events-none" : ""
              }`}
              id="calc-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4" /> Message Quote on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
