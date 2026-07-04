import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing in environment variables. Chatbot will run in simulator/demo mode.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are the friendly and highly professional AI Assistant for P&N Solutions, a modern digital agency specializing in AI-powered solutions and web development.

Your details:
- Founders/Partners: Ngoveni Nhlamulo and Nkuna Pfuxeto
- Mission: Dedicated to helping small businesses grow through innovative web design, custom AI chatbots, WhatsApp business automation, and digital automation systems that help businesses improve customer service and operate more efficiently.
- Location: ONLINE-ONLY. There are NO walk-ins and NO physical office. All services are delivered remotely.

Services offered:
1. Business Website + AI Chatbot (with WhatsApp integration): starting at R3,500
2. AI Voice Agent: R5,000 (automated telephone or voice-based customer service)
3. AI Agent (custom digital automation): R8,000 (workflows, integrations, background automation)
4. WhatsApp Business AI: R2,000 (smart auto-responders and customer flow on WhatsApp)

Detailed Pricing list:
- Website Only: R2,000
- AI Chatbot Integration: +R1,500
- WhatsApp Integration: +R500
- WhatsApp AI: R2,000
- AI Voice Agent: R5,000
- AI Agent: R8,000
Note: Prices may vary depending on project complexity. Customers should contact us for a custom quote.

Contact Information:
- WhatsApp Chat / Phone: 073 103 0264 (Clickable link: https://wa.me/27731030264)
- Email: Nhlamulongoveni421@gmail.com
- Social Media:
  * LinkedIn: Ashaanboy
  * Facebook, Twitter/X, Instagram: P&N Solutions

Guidelines:
- Be warm, encouraging, trustworthy, tech-forward, and extremely professional.
- Since we are online-only, clearly convey this if clients ask about our office location or physical meeting.
- Highlight the business value of our services: how AI automation saves hours of work, captures leads 24/7, and drives customer engagement.
- Prompt users to reach out on WhatsApp (073 103 0264) or fill out the contact form on the website to receive a free quote or get started.
- Keep your responses structured, clear, and easy to read. Use bullet points and paragraphs, but avoid being excessively wordy. Keep answers under 3-4 sentences when possible to maintain an interactive dialogue.`;

// Demo simulated replies when Gemini API key is missing
function getDemoReply(message: string): string {
  const msg = message.toLowerCase();
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "Hello! Welcome to P&N Solutions. I'm your digital AI Assistant. We build high-performing websites, AI chatbots, WhatsApp automations, and custom AI systems to help small businesses grow. How can I help you today?";
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("pricing") || msg.includes("how much")) {
    return "At P&N Solutions, our pricing is highly competitive and transparent:\n\n" +
      "• **Website Only**: R2,000\n" +
      "• **WhatsApp Business AI**: R2,000\n" +
      "• **Business Website + AI Chatbot**: starting R3,500\n" +
      "• **AI Voice Agent**: R5,000\n" +
      "• **AI Agent (custom workflow)**: R8,000\n\n" +
      "Prices can vary slightly depending on project complexity. Would you like a free quote? You can chat with us on WhatsApp at 073 103 0264!";
  }
  if (msg.includes("service") || msg.includes("what do you do") || msg.includes("offer")) {
    return "We offer four primary digital packages designed for growth:\n\n" +
      "1. **Business Website + AI Chatbot** (starting R3,500) - Clean, fast website integrated with a custom AI chatbot.\n" +
      "2. **AI Voice Agent** (R5,000) - Intelligent voice assistant to automate phone calls.\n" +
      "3. **AI Agent** (R8,000) - Bespoke automations that streamline your workflows.\n" +
      "4. **WhatsApp Business AI** (R2,000) - Automate your sales and customer service on WhatsApp.\n\n" +
      "Which of these fits your business needs?";
  }
  if (msg.includes("contact") || msg.includes("phone") || msg.includes("email") || msg.includes("whatsapp") || msg.includes("address") || msg.includes("office")) {
    return "P&N Solutions is an **online-only** agency (no physical walk-ins). You can reach us directly:\n\n" +
      "• **WhatsApp**: 073 103 0264 (Clickable wa.me link: https://wa.me/27731030264)\n" +
      "• **Email**: Nhlamulongoveni421@gmail.com\n" +
      "We'd love to chat and discuss how to take your business to the next level!";
  }
  if (msg.includes("about") || msg.includes("who are you") || msg.includes("team") || msg.includes("owner")) {
    return "We are Ngoveni Nhlamulo and Nkuna Pfuxeto, partners dedicated to helping small businesses grow through innovative web design and AI-powered solutions. We combine design excellence with cutting-edge artificial intelligence to transform your business. Ask us about any of our custom packages!";
  }
  return "That sounds like a great project! At P&N Solutions, we specialized in tailored AI and web services to automate customer service and boost sales. To give you the most accurate answer and a free quote, could you share a bit more about your business? Or you can message us on WhatsApp at 073 103 0264 for instant consultation!";
}

// API chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Graceful fallback to rich simulated response
      const reply = getDemoReply(message);
      return res.json({ reply, source: "demo" });
    }

    // Convert history format if present, otherwise format as basic contents
    // Let's use simple generateContent with a chat-like structure or just a chat object
    // Note: To support chat-like conversations simply, we can use ai.chats.create
    const chatInstance = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Reconstruct history
    if (history && Array.isArray(history)) {
      // In @google/genai SDK, chat.history can be populated or we can just send the whole conversation history as parts in contents.
      // To keep it clean, let's pass history directly to sendMessage or use simple contents generation.
      // Actually, a simpler and extremely robust approach is to pass the entire history + new message as the 'contents' array in generateContent
      // each with role 'user' or 'model'.
      const contents = history.map((h: any) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      }));
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      return res.json({ reply: response.text || "I am here to help you grow your business.", source: "gemini" });
    } else {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
      return res.json({ reply: response.text || "I am here to help you grow your business.", source: "gemini" });
    }
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    // Graceful fallback on API failure
    const fallbackMessage = req.body.message ? getDemoReply(req.body.message) : "I'm experiencing high traffic right now, but P&N Solutions is ready to assist you! Please connect with us directly on WhatsApp at 073 103 0264.";
    return res.json({
      reply: fallbackMessage,
      error: error?.message || "Internal Server Error",
      source: "fallback"
    });
  }
});

// Handle contact form submission (simple mock log on server)
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`[CONTACT FORM SUBMISSION] Name: ${name}, Email: ${email}, Message: ${message}`);
  return res.json({ success: true, message: "Thank you! We've received your inquiry and will contact you shortly." });
});

// Serve frontend assets
if (process.env.NODE_ENV !== "production") {
  const startVite = async () => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback all other routes to index.html for SPA router
    app.get("*", (req, res, next) => {
      vite.middlewares(req, res, next);
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Full-stack server running in DEVELOPMENT on port ${PORT}`);
    });
  };
  startVite();
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running in PRODUCTION on port ${PORT}`);
  });
}
