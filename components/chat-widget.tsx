"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useLanguage, type Language } from "./language-provider";

type ChatAction = {
  label: string;
  href: string;
};

type ChatMessage = {
  id: number;
  from: "user" | "bot";
  text: string;
  actions?: ChatAction[];
};

type QuickPrompt = {
  label: string;
  question: string;
};

type ChatCopy = {
  title: string;
  subtitle: string;
  greeting: string;
  greetingHint: string;
  placeholder: string;
  send: string;
  open: string;
  close: string;
  suggestions: string;
  quickPrompts: QuickPrompt[];
  products: string;
  address: string;
  contact: string;
  order: string;
  fallback: string;
  viewProducts: string;
  corporate: string;
  wedding: string;
  openMaps: string;
  whatsapp: string;
  email: string;
};

const copy: Record<Language, ChatCopy> = {
  ms: {
    title: "Senitukang",
    subtitle: "Pembantu produk & tempahan",
    greeting: "Hai! 👋 Selamat datang ke Senitukang.",
    greetingHint: "Apa yang anda ingin tahu? Pilih topik di bawah atau taip soalan anda.",
    placeholder: "Taip soalan anda...",
    send: "Hantar mesej",
    open: "Buka chat Senitukang",
    close: "Tutup chat",
    suggestions: "SOALAN LAZIM",
    quickPrompts: [
      { label: "Lihat produk", question: "Apakah produk yang tersedia?" },
      { label: "Alamat kedai", question: "Di mana alamat Senitukang?" },
      { label: "Telefon / WhatsApp", question: "Bagaimana cara menghubungi Senitukang?" },
      { label: "Cara tempahan", question: "Bagaimana cara membuat tempahan?" },
    ],
    products: "Senitukang menghasilkan produk kayu dan akrilik tersuai — termasuk trofi dan anugerah, plak korporat, hadiah peribadi, kotak, papan tanda, serta koleksi perkahwinan seperti papan alu-aluan dan buku tetamu. Kami juga mempunyai pilihan produk Islamik dan projek tersuai.",
    address: "Anda boleh menemui Senitukang di:
140 & 140A, Jalan Jasa 5, Taman Jasa, 68100 Batu Caves, Selangor, Malaysia.",
    contact: "Anda boleh menghubungi Senitukang melalui telefon / WhatsApp di 011 5656 7811 atau e-mel senitukang.product@gmail.com.",
    order: "Untuk meminta sebut harga, hantarkan mesej WhatsApp dengan jenis produk, kuantiti, tarikh diperlukan dan gambar rujukan jika ada. Pasukan Senitukang boleh membantu mengesahkan pilihan reka bentuk dan sebut harga.",
    fallback: "Saya boleh bantu dengan maklumat produk, alamat, nombor telefon dan cara membuat tempahan. Pilih salah satu topik di bawah atau hubungi kami terus melalui WhatsApp.",
    viewProducts: "Lihat semua produk",
    corporate: "Koleksi korporat",
    wedding: "Koleksi perkahwinan",
    openMaps: "Buka Google Maps",
    whatsapp: "Chat di WhatsApp",
    email: "Hantar e-mel",
  },
  en: {
    title: "Senitukang",
    subtitle: "Product & order assistant",
    greeting: "Hi! 👋 Welcome to Senitukang.",
    greetingHint: "What would you like to know? Choose a topic below or type your question.",
    placeholder: "Type your question...",
    send: "Send message",
    open: "Open Senitukang chat",
    close: "Close chat",
    suggestions: "QUICK QUESTIONS",
    quickPrompts: [
      { label: "Explore products", question: "What products do you make?" },
      { label: "Our address", question: "Where is Senitukang located?" },
      { label: "Phone / WhatsApp", question: "How can I contact Senitukang?" },
      { label: "How to order", question: "How do I place an order?" },
    ],
    products: "Senitukang creates custom wood and acrylic pieces — including trophies and awards, corporate plaques, personalised gifts, boxes, signage, and wedding items such as welcome boards and guestbooks. Islamic pieces and other custom projects are available too.",
    address: "You can find Senitukang at:
140 & 140A, Jalan Jasa 5, Taman Jasa, 68100 Batu Caves, Selangor, Malaysia.",
    contact: "You can contact Senitukang by phone / WhatsApp at 011 5656 7811 or email senitukang.product@gmail.com.",
    order: "To request a quote, message us on WhatsApp with the product type, quantity, required date, and a reference image if you have one. The Senitukang team can help confirm the design options and quotation.",
    fallback: "I can help with product information, the address, contact details, and how to order. Choose one of the topics below or message us directly on WhatsApp.",
    viewProducts: "Browse all products",
    corporate: "Corporate collection",
    wedding: "Wedding collection",
    openMaps: "Open Google Maps",
    whatsapp: "Chat on WhatsApp",
    email: "Send an email",
  },
};

function answerFor(question: string, language: Language): Omit<ChatMessage, "id" | "from"> {
  const t = copy[language];
  const value = question.toLocaleLowerCase();

  if (/address|alamat|where|location|located|lokasi|di mana|map|maps|kedai|shop/.test(value)) {
    return {
      text: t.address,
      actions: [
        { label: t.openMaps, href: "https://www.google.com/maps/search/?api=1&query=140%20%26%20140A%20JALAN%20JASA%205%2C%20TAMAN%20JASA%2C%2068100%20BATU%20CAVES%2C%20SELANGOR" },
      ],
    };
  }

  if (/phone|telephone|contact|call|whatsapp|email|e-mail|telefon|nombor|hubungi|hubung|hubung|e-mel/.test(value)) {
    return {
      text: t.contact,
      actions: [
        { label: t.whatsapp, href: "https://wa.me/601156567811" },
        { label: t.email, href: "mailto:senitukang.product@gmail.com" },
      ],
    };
  }

  if (/order|ordering|quote|quotation|price|pricing|tempah|tempahan|sebut harga|harga|pesanan|buy|purchase|custom/.test(value)) {
    return {
      text: t.order,
      actions: [{ label: t.whatsapp, href: "https://wa.me/601156567811" }],
    };
  }

  if (/product|produk|catalog|catalogue|katalog|category|kategori|corporate|korporat|wedding|perkahwinan|lifestyle|gaya hidup|islamic|islamik|trophy|trofi|plaque|plak|wood|kayu|acrylic|akrilik|gift|hadiah|signage|signboard|papan tanda|project|projek/.test(value)) {
    return {
      text: t.products,
      actions: [
        { label: t.viewProducts, href: "/products" },
        { label: t.corporate, href: "/products?category=Corporate" },
        { label: t.wedding, href: "/products?category=Wedding" },
      ],
    };
  }

  return {
    text: t.fallback,
    actions: [
      { label: t.viewProducts, href: "/products" },
      { label: t.whatsapp, href: "https://wa.me/601156567811" },
    ],
  };
}

export function ChatWidget() {
  const { language } = useLanguage();
  const t = copy[language];
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextId, setNextId] = useState(1);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
    inputRef.current?.focus();
  }, [isOpen, messages]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const ask = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const reply = answerFor(cleanQuestion, language);
    setMessages((current) => [
      ...current,
      { id: nextId, from: "user", text: cleanQuestion },
      { id: nextId + 1, from: "bot", ...reply },
    ]);
    setNextId((id) => id + 2);
    setDraft("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(draft);
  };

  return (
    <div className="chat-widget-root">
      {isOpen && (
        <section className="chat-window" role="dialog" aria-label={t.title} aria-modal="false">
          <header className="chat-header">
            <div className="chat-avatar" aria-hidden="true">S</div>
            <div className="chat-header-copy">
              <div className="chat-title">{t.title}</div>
              <div className="chat-subtitle">{t.subtitle}</div>
            </div>
            <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label={t.close}>×</button>
          </header>

          <div className="chat-feed" ref={feedRef} role="log" aria-live="polite" aria-relevant="additions text">
            <div className="chat-row chat-row-bot">
              <div className="chat-bubble chat-bubble-bot">
                <p>{t.greeting}</p>
                <p className="chat-hint">{t.greetingHint}</p>
              </div>
            </div>
            {messages.map((message) => (
              <div key={message.id} className={`chat-row ${message.from === "user" ? "chat-row-user" : "chat-row-bot"}`}>
                <div className={`chat-bubble ${message.from === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`}>
                  <p>{message.text}</p>
                  {message.actions && message.actions.length > 0 && (
                    <div className="chat-actions">
                      {message.actions.map((action) => action.href.startsWith("/") ? (
                        <Link key={action.href} href={action.href} className="chat-action-link" onClick={() => setIsOpen(false)}>{action.label}<span aria-hidden="true">↗</span></Link>
                      ) : (
                        <a key={action.href} href={action.href} className="chat-action-link" target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}>{action.label}<span aria-hidden="true">↗</span></a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-suggestions">
            <div className="chat-section-label">{t.suggestions}</div>
            <div className="chat-prompt-list">
              {t.quickPrompts.map((prompt) => (
                <button key={prompt.label} type="button" className="chat-prompt" onClick={() => ask(prompt.question)}>{prompt.label}</button>
              ))}
            </div>
          </div>

          <form className="chat-composer" onSubmit={submit}>
            <input ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={t.placeholder} aria-label={t.placeholder} maxLength={300} />
            <button type="submit" disabled={!draft.trim()} aria-label={t.send} title={t.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12 20 4l-4 16-4-6-8-2Z" /><path d="m12 14 8-10" /></svg>
            </button>
          </form>
          <div className="chat-footer-note">SENITUKANG · {language === "ms" ? "MAKLUMAT PANTAS" : "QUICK HELP"}</div>
        </section>
      )}

      <button
        type="button"
        className={`chat-launcher ${isOpen ? "is-open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? t.close : t.open}
        aria-expanded={isOpen}
        title={isOpen ? t.close : t.open}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.3a7.6 7.6 0 0 1-8 7.4 8.6 8.6 0 0 1-3.6-.8L4 19l1.1-3.4A7.1 7.1 0 0 1 4 11.3 7.6 7.6 0 0 1 12 4a7.6 7.6 0 0 1 8 7.3Z" /><path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" /></svg>
        )}
      </button>
    </div>
  );
}
