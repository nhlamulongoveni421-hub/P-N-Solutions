/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Mail,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle2,
  Cpu,
  Monitor,
  Volume2,
  Users,
  ChevronRight,
  Building,
  MapPin,
  Check,
  Send,
  ArrowRight,
  ShieldCheck,
  Phone,
  Zap,
  HelpCircle,
  Menu,
  X,
  Plus
} from "lucide-react";
import InteractiveCalculator from "./components/InteractiveCalculator";
import WhatsAppWidget from "./components/WhatsAppWidget";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Set message when calculated quote is applied to form
  const handleApplyQuoteToForm = (quoteMsg: string) => {
    setContactForm((prev) => ({
      ...prev,
      message: quoteMsg,
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      if (response.ok) {
        setSubmitSuccess("Thank you! We have received your inquiry. We'll get back to you shortly or contact you on WhatsApp.");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setSubmitSuccess("Something went wrong, but your inquiry can be sent straight to us on WhatsApp! Please click the chat button.");
      }
    } catch (err) {
      console.error(err);
      setSubmitSuccess("Your inquiry was processed locally. Feel free to follow up on WhatsApp at 073 103 0264!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      id: "website-chatbot",
      title: "Business Website + AI Chatbot",
      price: "R3,500",
      description: "Get a highly professional, fast, fully responsive website integrated with an intelligent AI chatbot that works 24/7. Captures custom leads and handles instant customer service.",
      features: ["Custom modern landing page/site", "Fully mobile-responsive", "Gemini AI-powered Web Chatbot", "Lead capture database integration", "SEO optimized structure"],
      icon: <Monitor className="w-6 h-6 text-cyan-400" />,
      tag: "Most Popular",
    },
    {
      id: "voice-agent",
      title: "AI Voice Agent",
      price: "R5,000",
      description: "Automate telephone calls and vocal customer support. Our voice agents are trained with your business files to handle inquiries, book calendar spots, and deliver real human-like dialogue.",
      features: ["Natural language voice processor", "Calendar booking integration", "Real-time query resolution", "Missed-call auto callback integration", "Usage analytics dashboard"],
      icon: <Volume2 className="w-6 h-6 text-indigo-400" />,
    },
    {
      id: "custom-agent",
      title: "AI Agent (Custom Automation)",
      price: "R8,000",
      description: "Complete database, API, and workflow automations tailored for your operations. Automatically sync leads, update CRM spreadsheets, trigger email campaigns, and connect background systems.",
      features: ["Complex workflow mapping", "CRM & Spreadsheet auto-sync", "AI background processing agents", "Tailored API integrations", "Advanced business automation"],
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      tag: "Enterprise Value",
    },
    {
      id: "whatsapp-ai",
      title: "WhatsApp Business AI",
      price: "R2,000",
      description: "Supercharge your business contact number. Build smart auto-responders, active menus, and Gemini-powered smart agents replying instantly to client leads right inside WhatsApp.",
      features: ["Official WhatsApp API linkage", "Custom intent-based flow guides", "24/7 automated agent answering", "Direct human handover trigger", "Client catalog setup assistance"],
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
    },
  ];

  const pricingTable = [
    { name: "Website Only", price: "R2,000", badge: "Core Service" },
    { name: "WhatsApp AI Automation", price: "R2,000", badge: "Highly Requested" },
    { name: "AI Chatbot Integration", price: "+R1,500", badge: "Add-on" },
    { name: "WhatsApp Chat Bridge", price: "+R500", badge: "Add-on" },
    { name: "AI Voice Agent", price: "R5,000", badge: "Premium Automated" },
    { name: "AI Agent (Custom)", price: "R8,000", badge: "Advanced Enterprise" },
  ];

  const faqs = [
    {
      q: "Where is your office located? Can I visit?",
      a: "P&N Solutions is a fully digital, online-only agency. We do not have a physical office and do not support walk-ins. We deliver all web design, consultations, chatbot setups, and automation services entirely remotely, allowing us to support small businesses nationwide with maximum efficiency and highly competitive rates!"
    },
    {
      q: "How does the AI Chatbot integration work?",
      a: "We train a custom AI model (using the powerful Gemini API) specifically on your business information, FAQs, services, and policies. We then integrate it as a sleek interactive chat widget on your website. It answers clients immediately in real-time, qualifies leads, and forwards their contact information to you!"
    },
    {
      q: "Can the AI Agent sync with my current spreadsheets or CRM?",
      a: "Yes! Our custom AI Agents (R8,000) are designed specifically to connect platforms. They can instantly transfer leads captured by your website or chatbot straight into Google Sheets, Notion, HubSpot, Salesforce, or your custom business database, ensuring zero manual entry."
    },
    {
      q: "What is the timeline for delivering a website + chatbot?",
      a: "A typical Business Website + AI Chatbot package is delivered and fully launched within 7 to 14 days. We ensure the custom design aligns perfectly with your brand identity and the AI chatbot is robustly tested before deployment."
    }
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsAppDirect = () => {
    const waText = encodeURIComponent("Hello P&N Solutions! 👋 I'm interested in getting a free quote for digital/AI services.");
    window.open(`https://wa.me/27731030264?text=${waText}`, "_blank");
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#060b18] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[110px] pointer-events-none -z-10"></div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#060b18]/80 backdrop-blur-md border-b border-slate-900 transition-all duration-300" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")} id="header-logo">
            <div className="bg-gradient-to-tr from-cyan-500 to-indigo-500 p-2.5 rounded-xl text-white shadow-lg shadow-cyan-500/15">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                P&N
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-cyan-400"> Solutions</span>
              <p className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase leading-none mt-0.5">Digital Growth Engine</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold" id="desktop-nav">
            <button onClick={() => scrollToSection("hero")} className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors" id="nav-link-home">Home</button>
            <button onClick={() => scrollToSection("services")} className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors" id="nav-link-services">Services</button>
            <button onClick={() => scrollToSection("pricing")} className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors" id="nav-link-pricing">Pricing</button>
            <button onClick={() => scrollToSection("about")} className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors" id="nav-link-about">About Us</button>
            <button onClick={() => scrollToSection("chatbot-demo")} className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-1.5" id="nav-link-chatbot-demo">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Chatbot Demo
            </button>
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection("contact")} 
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              id="header-quote-btn"
            >
              Get Free Quote
            </button>
            <button 
              onClick={openWhatsAppDirect}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              id="header-wa-btn"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-6 space-y-4 shadow-xl"
              id="mobile-nav-panel"
            >
              <div className="flex flex-col space-y-4 font-semibold text-slate-300">
                <button onClick={() => scrollToSection("hero")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-home">Home</button>
                <button onClick={() => scrollToSection("services")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-services">Services</button>
                <button onClick={() => scrollToSection("pricing")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-pricing">Pricing & Calculator</button>
                <button onClick={() => scrollToSection("about")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-about">About Us</button>
                <button onClick={() => scrollToSection("chatbot-demo")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-demo">Interactive AI Demo</button>
                <button onClick={() => scrollToSection("contact")} className="text-left py-2 hover:text-cyan-400 cursor-pointer" id="mob-link-contact">Contact Info</button>
              </div>
              <hr className="border-slate-900" />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full text-center bg-slate-900 border border-slate-800 text-slate-200 font-semibold py-3 rounded-xl cursor-pointer"
                  id="mob-quote-btn"
                >
                  Get a Free Quote
                </button>
                <button
                  onClick={openWhatsAppDirect}
                  className="w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2"
                  id="mob-wa-btn"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Online Only Badge */}
              <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-full" id="hero-badge">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-indigo-300 font-mono uppercase tracking-wider">
                  Fully Online Service • No Walk-Ins
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight" id="hero-headline">
                Smart AI Solutions for <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Growing Businesses
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed" id="hero-subheadline">
                Helping small businesses build modern websites and automate customer service with robust AI agents. We are 100% online — no walk-ins, fully remote delivery. Accelerate sales and support without physical boundaries.
              </p>

              {/* Bullet Highlights */}
              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-300 font-medium" id="hero-bullets">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Custom Web Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>AI Chatbots & WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  <span>Interactive Automation</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  id="hero-cta-quote"
                >
                  Get a Free Quote
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={openWhatsAppDirect}
                  className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-200 hover:text-white font-bold px-8 py-4 rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all"
                  id="hero-cta-whatsapp"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                  Chat on WhatsApp
                </button>
              </div>
            </div>

            {/* Right Interactive Mockup Visual */}
            <div className="lg:col-span-5 relative" id="hero-visual">
              
              {/* Outer decorative card */}
              <div className="relative z-10 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl shadow-cyan-500/5">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800/60 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] font-mono text-slate-400">pandnsolutions.co.za</span>
                  </div>
                </div>

                {/* Simulated Business Dashboard Component */}
                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                        P&N Active Services
                      </span>
                      <span className="bg-cyan-500/10 text-cyan-300 font-mono text-[9px] px-2 py-0.5 rounded border border-cyan-500/20">
                        24/7 ONLINE
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="bg-indigo-500/10 p-1.5 rounded-lg text-indigo-400">
                            <Monitor className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-semibold text-white">Custom Web Design</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300">R2,000+</span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400">
                            <MessageSquare className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-semibold text-white">WhatsApp Business AI</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300">R2,000</span>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="bg-cyan-500/10 p-1.5 rounded-lg text-cyan-400">
                            <Sparkles className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-semibold text-white">AI Chatbot Integrations</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-300">R1,500</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Client Statistics simulation */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/50 text-center">
                      <span className="block text-slate-400 text-[10px] font-mono uppercase">Avg Speed</span>
                      <span className="block text-xl font-bold font-display text-white mt-1">Instant</span>
                    </div>
                    <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/50 text-center">
                      <span className="block text-slate-400 text-[10px] font-mono uppercase">Delivery Mode</span>
                      <span className="block text-xl font-bold font-display text-cyan-400 mt-1">100% Remote</span>
                    </div>
                  </div>

                  <div className="bg-indigo-950/30 border border-indigo-900/40 p-3.5 rounded-2xl text-center">
                    <p className="text-xs text-indigo-300">
                      Need a precise package? Try our <span className="font-bold underline cursor-pointer hover:text-white" onClick={() => scrollToSection("pricing")}>Interactive Quote Calculator</span> below!
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative radial blur element */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-md -z-10 animate-pulse"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-950/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              What We Deliver
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Professional AI & Web Services
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We provide streamlined digital design, AI chatbot development, WhatsApp system management, and workflow automations tailored for small business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/60 rounded-3xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 relative group"
                id={`service-card-${svc.id}`}
              >
                {svc.tag && (
                  <span className="absolute top-4 right-4 bg-indigo-500/10 text-indigo-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-indigo-500/20">
                    {svc.tag}
                  </span>
                )}

                <div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl w-fit border border-slate-800/80 mb-6">
                    {svc.icon}
                  </div>

                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-display font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="font-mono text-xs text-cyan-400 font-bold mb-4">Investment: {svc.price}</p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  <hr className="border-slate-800/60 my-4" />

                  <ul className="space-y-2.5 mb-6">
                    {svc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      const text = `Hello P&N Solutions! I'm interested in your "${svc.title}" service (${svc.price}). Please share more details!`;
                      window.open(`https://wa.me/27731030264?text=${encodeURIComponent(text)}`, "_blank");
                    }}
                    className="w-full sm:w-1/2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    id={`svc-wa-btn-${svc.id}`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" /> Chat on WhatsApp
                  </button>

                  <button
                    onClick={() => {
                      setContactForm((prev) => ({
                        ...prev,
                        message: `Hello! I would like to get a quote and details for the "${svc.title}" package. Let's arrange a remote consultation.`,
                      }));
                      scrollToSection("contact");
                    }}
                    className="w-full sm:w-1/2 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-500/20 hover:border-cyan-500/30 text-cyan-300 font-semibold text-xs py-2.5 px-4 rounded-xl transition-all"
                    id={`svc-quote-btn-${svc.id}`}
                  >
                    Select This Package
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing List & Calculator */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              Transparent Estimates
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Simple, Honest Pricing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We list all our services upfront. Prices can vary slightly depending on your unique business parameters. Use our live quote calculator below to create a custom package.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Flat Price Sheet */}
            <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Service Pricing List</h3>
                <p className="text-slate-400 text-xs">Standard investment breakdown for single integrations or separate systems.</p>
              </div>

              <div className="space-y-3">
                {pricingTable.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-slate-950/50 border border-slate-800/50 p-3 rounded-xl">
                    <div>
                      <span className="text-xs font-semibold text-slate-200 block">{item.name}</span>
                      <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider">{item.badge}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-indigo-950/20 rounded-2xl border border-indigo-900/30 text-xs text-indigo-300 leading-relaxed">
                <span className="font-bold text-white block mb-1">Important Note:</span>
                Prices may vary depending on project complexity. If you require advanced features, complex user workflows, or multiple API linked agents, contact us directly for a custom quote.
              </div>
            </div>

            {/* Interactive Calculator (Custom Built Component) */}
            <div className="lg:col-span-7">
              <InteractiveCalculator onQuoteGenerated={handleApplyQuoteToForm} />
            </div>

          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-slate-950/40 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative" id="about-visual">
              <div className="relative bg-gradient-to-tr from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                  Our Team & Founders
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white mb-6">P&N Solutions Partners</h3>

                <div className="space-y-6">
                  {/* Founder 1 */}
                  <div className="flex items-center gap-4 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-md shadow-cyan-500/10">
                      NN
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">Ngoveni Nhlamulo</h4>
                      <p className="text-xs text-cyan-400 font-mono">Co-Founder & Web Architect</p>
                    </div>
                  </div>

                  {/* Founder 2 */}
                  <div className="flex items-center gap-4 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-md shadow-indigo-500/10">
                      NP
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-100">Nkuna Pfuxeto</h4>
                      <p className="text-xs text-indigo-400 font-mono">Co-Founder & AI Systems Engineer</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-slate-950/40 border border-slate-800/60 p-4 rounded-2xl text-xs text-slate-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-cyan-400" />
                    <span>Business Model: 100% Online Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span>No Physical Walk-ins or Office</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 space-y-6" id="about-text">
              <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
                Who We Are
              </span>
              <h2 className="font-display font-extrabold text-3xl text-white">
                Our Story & Passion for Tech
              </h2>
              
              <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-6 lg:p-8 text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-sans">
                  "Welcome! We are Ngoveni Nhlamulo and Nkuna Pfuxeto, partners dedicated to helping businesses grow through innovative web design and AI-powered solutions. Our passion is creating modern, high-performing websites that strengthen brands, attract customers, and deliver real business value."
                </p>
                <p className="font-sans">
                  "We combine creativity with technology to build solutions that are visually impressive, user-friendly, and designed to support business growth. In addition to custom websites, we develop AI chatbots, WhatsApp automation, voice AI agents, and digital automation systems that help businesses improve customer service and operate more efficiently."
                </p>
                <p className="font-sans">
                  "As partners, our goal is to provide every client with professional, reliable, and results-driven digital solutions. We believe every business deserves a strong online presence, and we're committed to making that happen. Together, we transform ideas into powerful digital experiences."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Chatbot Full-Screen Demo Sandbox */}
      <section id="chatbot-demo" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              Experience Our Technology
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Try Our Live AI Assistant Demo
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              This interactive widget is built using the Gemini API. Type anything to ask about our pricing, solutions, or how we operate online.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <AIChatbot isFloating={false} />
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs" className="py-20 bg-slate-950/40 border-y border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              Clear Answers
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFAQ === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden transition-colors"
                  id={`faq-${idx}`}
                >
                  <button
                    onClick={() => setActiveFAQ(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-slate-800/20"
                    id={`faq-btn-${idx}`}
                  >
                    <span className="font-semibold text-white text-sm sm:text-base pr-4">{faq.q}</span>
                    <span className="shrink-0 text-slate-500">
                      <Plus className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-45 text-cyan-400" : ""}`} />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-slate-800/50 bg-slate-950/20"
                      >
                        <p className="px-6 py-5 text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest block">
              Get Started
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Connect With Us Today
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              We deliver custom software and designs remotely. No physical meetings required. Submit the inquiry form or open a WhatsApp text.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Quick Contact info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-8">
                
                <h3 className="font-display font-bold text-xl text-white">Contact Information</h3>

                <div className="space-y-6">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/27731030264"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 hover:bg-slate-950 rounded-2xl transition-all group"
                  >
                    <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl border border-emerald-500/20 shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-xs font-mono uppercase">WhatsApp Chat (Founders)</span>
                      <span className="block text-slate-100 font-bold font-display mt-0.5 group-hover:text-emerald-400 transition-colors">
                        073 103 0264
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">Tap to chat instantly</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:Nhlamulongoveni421@gmail.com"
                    className="flex items-start gap-4 p-4 bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-950 rounded-2xl transition-all group"
                  >
                    <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-xl border border-indigo-500/20 shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-xs font-mono uppercase">Email Address</span>
                      <span className="block text-slate-100 font-bold font-sans mt-0.5 group-hover:text-indigo-400 transition-colors truncate max-w-[220px] sm:max-w-none">
                        Nhlamulongoveni421@gmail.com
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">Tap to send an email</span>
                    </div>
                  </a>

                  {/* Delivery Location badge */}
                  <div className="flex items-start gap-4 p-4 bg-slate-950/30 border border-slate-900 rounded-2xl">
                    <div className="bg-cyan-500/10 text-cyan-400 p-3 rounded-xl border border-cyan-500/20 shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-xs font-mono uppercase">Physical Office</span>
                      <span className="block text-slate-300 font-semibold mt-0.5">
                        Online-Only (Remote Delivery)
                      </span>
                      <span className="text-[10px] text-rose-400 block mt-1">No physical office / no walk-ins</span>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-800" />

                {/* Social media connections */}
                <div className="space-y-4">
                  <span className="block text-slate-400 text-xs font-mono uppercase">Connect with us on Socials</span>
                  <div className="flex flex-wrap gap-3">
                    
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/ashaanboy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs"
                      title="LinkedIn (Ashaanboy)"
                    >
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      <span>Ashaanboy</span>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com/P&N Solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs"
                      title="Facebook"
                    >
                      <Facebook className="w-4 h-4 text-blue-500" />
                      <span>P&N Solutions</span>
                    </a>

                    {/* Twitter */}
                    <a
                      href="https://twitter.com/P&N Solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs"
                      title="Twitter/X"
                    >
                      <Twitter className="w-4 h-4 text-indigo-400" />
                      <span>P&N Solutions</span>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com/P&N Solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white p-2.5 rounded-xl transition-colors flex items-center gap-2 text-xs"
                      title="Instagram"
                    >
                      <Instagram className="w-4 h-4 text-pink-500" />
                      <span>P&N Solutions</span>
                    </a>

                  </div>
                </div>

              </div>
            </div>

            {/* Interactive Form */}
            <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 lg:p-8">
              <h3 className="font-display font-bold text-xl text-white mb-2">Send an Inquiry</h3>
              <p className="text-slate-400 text-xs mb-6">Complete this short form to tell us about your brand and what services you are considering.</p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g., Jane Doe"
                      className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      id="form-input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g., jane@mycompany.com"
                      className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      id="form-input-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    required
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your company, specific requirements, or what custom items you need..."
                    className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                    id="form-input-message"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    id="form-submit-btn"
                  >
                    {isSubmitting ? (
                      <>
                        <Zap className="w-4 h-4 animate-spin text-white" /> Sending Inquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </div>

                {submitSuccess && (
                  <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-start gap-2 animate-pulse" id="form-success-banner">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitSuccess}</span>
                  </div>
                )}
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-400" id="main-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            
            {/* Brand column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
                <div className="bg-gradient-to-tr from-cyan-500 to-indigo-500 p-2 rounded-lg text-white">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-lg text-white">P&N <span className="text-cyan-400">Solutions</span></span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-slate-400">
                Building modern, high-performing websites and custom AI-powered digital systems to help small businesses succeed. We operate 100% online.
              </p>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">Our Core Offerings</h4>
              <ul className="text-xs space-y-2">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors cursor-pointer">Business Website + Chatbot</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors cursor-pointer">AI Voice Agents</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors cursor-pointer">Custom AI Agents</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors cursor-pointer">WhatsApp Business AI</button></li>
              </ul>
            </div>

            {/* Navigation links */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">Company</h4>
              <ul className="text-xs space-y-2">
                <li><button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => scrollToSection("about")} className="hover:text-white transition-colors cursor-pointer">About Us</button></li>
                <li><button onClick={() => scrollToSection("pricing")} className="hover:text-white transition-colors cursor-pointer">Pricing Calculator</button></li>
                <li><button onClick={() => scrollToSection("chatbot-demo")} className="hover:text-white transition-colors cursor-pointer">AI Demo Sandbox</button></li>
              </ul>
            </div>

            {/* Direct Quick contact details */}
            <div className="md:col-span-2 space-y-3 text-xs">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-300 font-mono">Quick Reach</h4>
              <p>Email: <a href="mailto:Nhlamulongoveni421@gmail.com" className="hover:text-white underline block">Nhlamulongoveni421@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/27731030264" target="_blank" rel="noopener noreferrer" className="hover:text-white underline block">073 103 0264</a></p>
              <p className="text-[10px] text-rose-400">Fully Online • No walk-ins</p>
            </div>

          </div>

          <hr className="border-slate-900 my-8" />

          {/* Copyright banner */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-4 text-slate-500">
            <p>© 2026 P&N Solutions. All rights reserved.</p>
            <p className="flex items-center gap-1.5 font-mono">
              Designed by <span className="text-cyan-400 font-semibold">Ngoveni Nhlamulo</span> & <span className="text-indigo-400 font-semibold">Nkuna Pfuxeto</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Widget Container (WhatsApp Chat & Bot inside) */}
      <WhatsAppWidget />

    </div>
  );
}
