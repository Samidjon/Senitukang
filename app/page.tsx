"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { LanguageSwitcher, useLanguage } from "../components/language-provider";
import { SocialLinks } from "../components/social-links";
import { uiText } from "../lib/i18n";

type MenuKey = "Pages" | "Products" | "Services" | "Shop";
type WorkKey = "Corporate" | "Wedding" | "Lifestyle" | "Projects";

const menuGroups: Record<MenuKey, readonly [string, string][]> = {
  Pages: [
    ["Home", "#top"],
    ["Products", "/products"],
    ["About Senitukang", "#about"],
    ["Our Services", "#services"],
    ["Contact", "#contact"],
  ],
  Products: [
    ["All Products", "/products"],
    ["Corporate Collection", "/products?category=Corporate"],
    ["Wedding Collection", "/products?category=Wedding"],
    ["Lifestyle Collection", "/products?category=Lifestyle"],
  ],
  Services: [
    ["Custom Design", "#services"],
    ["Wood Engraving", "#services"],
    ["Acrylic Engraving", "#services"],
    ["Corporate & Events", "#services"],
  ],
  Shop: [["Shop on Shopee", "https://shopee.com.my/senitukang"]],
};

const workGroups: Record<WorkKey, {
  number: string;
  category: string;
  copy: string;
  leadImage: string;
  images: { src: string; label: string; meta: string }[];
}> = {
  Corporate: {
    number: "01",
    category: "Awards · gifts · branded objects",
    copy: "Recognition pieces and branded objects made for teams, companies and special corporate moments.",
    leadImage: "/images/source/products/trophy-collection.jpeg",
    images: [
      ["/images/source/products/trophy-collection.jpeg", "Trophy collection", "Awards · recognition"],
      ["/images/source/products/petra-plaque.jpeg", "Plaque", "Wood + acrylic"],
      ["/images/source/products/plaque-award-box.jpeg", "Plaque box", "Custom presentation"],
      ["/images/source/products/engraved-trophy.jpeg", "Engraved trophy", "Custom award"],
      ["/images/source/products/engraved-pens.jpeg", "Engraved pens", "Corporate gifting"],
      ["/images/source/products/family-day-pins-01.jpeg", "Family Day pins", "Event merchandise"],
      ["/images/source/products/floral-recognition-award.jpeg", "Recognition award", "Layered detail"],
      ["/images/source/products/mdf-gift-box.jpeg", "Gift box", "Custom corporate gift"],
      ["/images/source/products/conference-plaque.jpeg", "Conference plaque", "Event recognition"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Wedding: {
    number: "02",
    category: "Wedding collections · details · keepsakes",
    copy: "A complete visual story built from the Wedding Catalogue — welcome boards, guestbooks, cake toppers, jewellery pieces, Quran products and invitations.",
    leadImage: "/images/source/wedding/wedding-catalogue-01.png",
    images: [
      ["/images/source/wedding/wedding-catalogue-01.png", "Welcome boards", "Wedding signage"],
      ["/images/source/wedding/wedding-catalogue-02.png", "Premium & basic boards", "Typography · floral"],
      ["/images/source/wedding/wedding-catalogue-03.png", "Modern welcome boards", "Wooden signage"],
      ["/images/source/wedding/wedding-catalogue-04.png", "Guestbook", "Custom cover"],
      ["/images/source/wedding/wedding-catalogue-05.png", "Cake topper", "Personalised"],
      ["/images/source/wedding/wedding-catalogue-06.png", "Mockup cheque", "Wedding gift"],
      ["/images/source/wedding/wedding-catalogue-07.png", "Jewellery box", "Personalised"],
      ["/images/source/wedding/wedding-catalogue-08.png", "Jewellery detail", "Presentation"],
      ["/images/source/wedding/wedding-catalogue-09.png", "Wedding hanger", "Engraved wood"],
      ["/images/source/wedding/wedding-catalogue-10.png", "Framed Mahr", "Mas Kahwin"],
      ["/images/source/wedding/wedding-catalogue-11.png", "Dowry Al-Quran", "Islamic wedding"],
      ["/images/source/wedding/wedding-catalogue-12.png", "Quran box / Rehal", "Islamic pieces"],
      ["/images/source/wedding/wedding-catalogue-13.png", "Invitation cards", "Acrylic details"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Lifestyle: {
    number: "03",
    category: "Personalised objects · signage · everyday pieces",
    copy: "Small, useful and personal objects taken directly from the Product Photo catalogue — boxes, signs, keychains, coasters, pins and pens.",
    leadImage: "/images/source/products/personalised-keychains.jpeg",
    images: [
      ["/images/source/products/personalised-keychains.jpeg", "Personalised keychains", "Name engraving"],
      ["/images/source/products/custom-box-kash.jpeg", "Custom wood box", "Personalised"],
      ["/images/source/products/custom-pattern-box.jpeg", "Pattern box", "Laser-cut detail"],
      ["/images/source/products/menu-sign.jpeg", "Menu sign", "Small signage"],
      ["/images/source/products/qr-table-sign.jpeg", "QR table sign", "Custom signage"],
      ["/images/source/products/coaster-set.jpeg", "Coaster set", "Wooden set"],
      ["/images/source/products/round-mini-sign.jpeg", "Mini round sign", "Custom size"],
      ["/images/source/products/family-day-pins-02.jpeg", "Lapel pins", "Event merchandise"],
      ["/images/source/products/engraved-pens.jpeg", "Engraved pens", "Everyday gift"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Projects: {
    number: "04",
    category: "Custom commissions · signage · larger-format work",
    copy: "Custom commissions that move beyond a single product — framed maps, conference pieces, signage and made-to-fit display objects.",
    leadImage: "/images/source/products/map-frame-04.jpeg",
    images: [
      ["/images/source/products/map-frame-04.jpeg", "Framed map", "Multilayer"],
      ["/images/source/products/map-frame-01.jpeg", "Map frame detail", "Laser-cut map"],
      ["/images/source/products/map-frame-02.jpeg", "Map presentation", "Custom frame"],
      ["/images/source/products/map-frame-03.jpeg", "Map close-up", "Layered detail"],
      ["/images/source/products/standing-signage.jpeg", "Standing signage", "Custom display"],
      ["/images/source/products/welcome-board-signage.jpeg", "Welcome board", "Large-format signage"],
      ["/images/source/products/conference-plaque.jpeg", "Conference piece", "Event commission"],
      ["/images/source/products/multilayer-frame-03.jpeg", "Multilayer frame", "Custom artwork"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
};

const workOrder: WorkKey[] = ["Corporate", "Wedding", "Lifestyle", "Projects"];



const reveal: Variants = {
  hidden: { opacity: 0, y: 45 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon"><path d="M20.3 15.1A8.6 8.6 0 0 1 8.9 3.7a8.6 8.6 0 1 0 11.4 11.4Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>("Pages");
  const [dark, setDark] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<WorkKey>("Corporate");
  const [openWork, setOpenWork] = useState<WorkKey | null>(null);
  const { language } = useLanguage();
  const t = uiText[language];
  const localizedMenuGroups: Record<MenuKey, readonly [string, string][]> = language === "ms" ? {
    Pages: [[t.nav.home, "#top"], [t.nav.allProducts, "/products"], [t.nav.about, "#about"], [t.nav.servicesLink, "#services"], [t.nav.contact, "#contact"]] as const,
    Products: [[t.nav.allProducts, "/products"], [t.nav.corporateCollection, "/products?category=Corporate"], [t.nav.weddingCollection, "/products?category=Wedding"], [t.nav.lifestyleCollection, "/products?category=Lifestyle"]] as const,
    Services: [[t.nav.customDesign, "#services"], [t.nav.woodEngraving, "#services"], [t.nav.acrylicEngraving, "#services"], [t.nav.corporateEvents, "#services"]] as const,
    Shop: [[t.nav.shopShopee, "https://shopee.com.my/senitukang"]] as const,
  } : menuGroups;

  useEffect(() => {
    const saved = window.localStorage.getItem("senitukang-theme");
    const preferred = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
    document.documentElement.dataset.theme = preferred ? "dark" : "light";
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || Boolean(openWork) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, openWork]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setOpenWork(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("senitukang-theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  };

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  return (
    <main id="top" className="site-shell min-h-screen overflow-x-hidden">
      <header className="site-header fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-10">
          <a href="#top" className="brand-mark flex items-center gap-2" data-cursor aria-label="Senitukang home">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white p-1.5 md:h-10 md:w-10"><Image src="/senitukang-symbol.jpg" alt="" width={44} height={44} className="h-full w-full object-contain" /></span>
            <span className="display text-2xl tracking-[-0.055em] md:text-3xl">SENITUKANG<span className="ml-1 align-top text-[9px] tracking-normal">®</span></span>
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button onClick={toggleTheme} aria-label={dark ? t.nav.themeLight : t.nav.themeDark} className="theme-toggle icon-control" data-cursor>
              <ThemeIcon dark={dark} />
              <span className="sr-only">{dark ? t.nav.themeLight : t.nav.themeDark}</span>
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label={t.nav.open} className="menu-trigger icon-control" data-cursor>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero relative min-h-screen">
        <div className="absolute inset-0">
          <Image src="/media/photo_2026-10-20_08-36-32.jpg" alt={language === "ms" ? "Proses ukiran laser Senitukang" : "Senitukang laser engraving process"} fill priority className="object-cover object-center" sizes="100vw" />
          <video className="hero-background-video absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/media/photo_2026-10-20_08-36-32.jpg" aria-label="Senitukang workshop process">
            <source src="/media/workshop-1.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-end px-6 pb-8 pt-32 md:px-10 md:pb-10">
          <div className="hero-topline flex items-center justify-between text-[9px] uppercase tracking-[0.22em]"><span>{t.home.based}</span><span className="hidden md:block">{t.home.craft}</span></div>
          <div className="mt-auto max-w-7xl pt-24">
            <div className="eyebrow mb-5 text-white/60">{t.home.eyebrow}</div>
            <h1 className="display text-[17vw] leading-[0.77] tracking-[-0.08em] md:text-[11vw]">
              <span className="reveal-line"><motion.span variants={wordReveal} initial="hidden" animate="show">{t.home.titleFirst}</motion.span></span>
              <span className="reveal-line"><motion.span variants={wordReveal} initial="hidden" animate="show" transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>{t.home.titleSecond}</motion.span></span>
            </h1>
          </div>
          <div className="mt-9 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-sm leading-6 text-white/70 md:text-[15px]">{t.home.intro}</p>
            <a href="#work" className="circle-link group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.22em]" data-cursor>{t.home.exploreWork} <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition duration-500 group-hover:-rotate-45">↘</span></a>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.22em] text-white/50"><span>{t.home.scroll}</span><span className="hidden md:block">{t.home.ideas}</span></div>
        </div>
      </section>

      <section className="craft-film dark-section px-6 py-20 md:px-10 md:py-28" aria-label="Inside the Senitukang workshop">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="eyebrow text-white/50">MADE WITH INTENTION</div>
              <h2 className="display mt-4 max-w-4xl text-5xl leading-[0.9] tracking-[-0.06em] md:text-8xl">A closer look<br/>at the craft.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-white/60">From the first cut to the finishing details, see how ideas become keepsakes, signage and custom-made objects.</p>
          </motion.div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {src:"/media/workshop-1.mp4", poster:"/media/photo_2026-10-20_08-36-32.jpg", title:"Precision in every cut", no:"01"},
              {src:"/media/workshop-2.mp4", poster:"/media/photo_2026-10-20_08-36-19.jpg", title:"Details make the difference", no:"02"},
              {src:"/media/workshop-3.mp4", poster:"/media/photo_2026-10-20_08-36-24.jpg", title:"Made by skilled hands", no:"03"}
            ].map((film) => <motion.article key={film.no} className="film-card group" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <div className="relative aspect-[4/5] overflow-hidden bg-white/10">
                <video className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" autoPlay muted loop playsInline preload="metadata" poster={film.poster}>
                  <source src={film.src} type="video/mp4" />
                </video>
                <span className="absolute left-4 top-4 text-[10px] tracking-[0.2em] text-white/75">{film.no} / 03</span>
                <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/60 text-white transition group-hover:rotate-45">↗</span>
              </div>
              <h3 className="display mt-4 text-2xl md:text-3xl">{film.title}</h3>
            </motion.article>)}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              ["photo_2026-10-20_08-36-09.jpg","Carefully made craftsmanship"],
              ["photo_2026-10-20_08-36-19.jpg","Attention to small details"],
              ["photo_2026-10-20_08-36-24.jpg","Every piece has a story"],
              ["photo_2026-10-20_08-36-28.jpg","Precision and patience"]
            ].map(([src,alt]) => <div key={src} className="overflow-hidden"><Image src={`/media/${src}`} alt={alt} width={720} height={960} className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105" /></div>)}
          </div>
        </div>
      </section>

      <section id="work" className="work-section px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <div className="eyebrow opacity-50">{t.home.selected}</div>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_28rem] md:items-end">
              <h2 className="display max-w-5xl text-[16vw] leading-[0.78] md:text-[9.5vw]" dangerouslySetInnerHTML={{ __html: t.home.workTitle }} />
              <p className="max-w-sm text-sm leading-7 opacity-60 md:pb-3">{t.home.workHelp}</p>
            </div>
          </motion.div>

          <div className="project-showcase mt-20 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="project-list border-t">
              {workOrder.map((key) => {
                const group = workGroups[key];
                return (
                  <motion.button key={key} type="button" onMouseEnter={() => setHoveredWork(key)} onFocus={() => setHoveredWork(key)} onClick={() => setOpenWork(key)} className={`project-row group w-full text-left ${hoveredWork === key ? "is-active" : ""}`} whileHover={{ x: 6 }} transition={{ duration: 0.3 }} data-cursor>
                    <div className="project-number">{group.number}</div>
                    <div className="min-w-0">
                      <div className="display project-title">{t.home.categories[key]}</div>
                      <div className="project-meta mt-3">{t.home.work[key].category}</div>
                      <p className="project-copy mt-4 max-w-md text-sm leading-6">{t.home.work[key].copy}</p>
                    </div>
                    <div className="project-arrow">↗</div>
                  </motion.button>
                );
              })}
            </div>

            <div className="project-preview sticky top-24 hidden min-h-[44rem] overflow-hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div key={hoveredWork} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
                  <Image src={workGroups[hoveredWork].leadImage} alt={t.home.categories[hoveredWork]} fill className="object-cover" sizes="45vw" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-7 pt-28 text-white">
                    <div><div className="eyebrow text-white/65">{t.home.work[hoveredWork].category}</div><div className="display mt-2 text-5xl">{t.home.categories[hoveredWork]}</div></div>
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/40">↗</div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => setOpenWork(hoveredWork)} className="absolute inset-0 z-10" aria-label={`${t.home.categories[hoveredWork]} ${t.home.gallery}`} data-cursor />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="dark-section px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}><div className="eyebrow text-white/40">{t.home.servicesEyebrow}</div><h2 className="display mt-6 max-w-5xl text-[17vw] leading-[0.78] text-white md:text-[9.5vw]" dangerouslySetInnerHTML={{ __html: t.home.servicesTitle }} /></motion.div>
          <div className="mt-16 border-t border-white/15">
            {t.home.services.map(([num, title, copy]) => (
              <motion.div key={num} className="service-row" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: Number(num) * 0.04 }}>
                <span className="eyebrow text-white/35">{num}</span><h3 className="display text-4xl md:text-6xl">{title}</h3><p className="max-w-sm text-sm leading-6 text-white/50 md:ml-auto">{copy}</p><span className="text-xl text-white/50">↗</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]"><div className="eyebrow opacity-50">{t.home.aboutEyebrow}</div><div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-8"><motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="display col-span-8 text-[15vw] leading-[0.8] md:text-[9.5vw]" dangerouslySetInnerHTML={{ __html: t.home.aboutTitle }} /><motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} transition={{ delay: 0.1 }} className="col-span-4 md:pt-20"><p className="max-w-md text-sm leading-7 opacity-65">{t.home.aboutCopy}</p><div className="mt-10 flex gap-10 text-[10px] uppercase tracking-[0.2em] opacity-50"><span>Malaysia</span><span>{language === "ms" ? "Sejak 2017" : "Est. 2017"}</span></div></motion.div></div></div>
      </section>

      <section id="contact" className="contact-section px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="eyebrow opacity-55">{t.home.startProject}</div>
          <motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="display mt-7 max-w-6xl text-[16vw] leading-[0.78] md:text-[9.5vw]" dangerouslySetInnerHTML={{ __html: t.home.contactTitle }} />
          <div className="mt-12 flex flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 opacity-60">{t.home.contactCopy}</p>
            <a href="https://wa.me/601156567811" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-5 text-[10px] uppercase tracking-[0.22em]" data-cursor>
              {t.home.quote}<span className="grid h-14 w-14 place-items-center rounded-full border border-current/40 text-lg transition duration-500 hover:-rotate-45">↗</span>
            </a>
          </div>

          <div className="mt-16 grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-2 xl:grid-cols-4 md:gap-10">
            <div>
              <div className="eyebrow mb-4 opacity-45">{language === "ms" ? "Telefon / WhatsApp" : "Phone / WhatsApp"}</div>
              <a href="tel:+601156567811" className="display text-2xl transition-opacity hover:opacity-60 md:text-3xl">011 5656 7811</a>
              <div className="mt-3"><a href="https://wa.me/601156567811" target="_blank" rel="noopener noreferrer" className="text-xs underline underline-offset-4 opacity-60 hover:opacity-100">WhatsApp ↗</a></div>
            </div>
            <div>
              <div className="eyebrow mb-4 opacity-45">{language === "ms" ? "E-mel" : "Email"}</div>
              <a href="mailto:senitukang.product@gmail.com" className="break-words text-sm transition-opacity hover:opacity-60">senitukang.product@gmail.com</a>
            </div>
            <div>
              <div className="eyebrow mb-4 opacity-45">{language === "ms" ? "Alamat" : "Address"}</div>
              <a href="https://www.google.com/maps/search/?api=1&query=140%20%26%20140A%20JALAN%20JASA%205%2C%20TAMAN%20JASA%2C%2068100%20BATU%20CAVES%2C%20SELANGOR" target="_blank" rel="noopener noreferrer" className="block max-w-sm text-sm leading-6 transition-opacity hover:opacity-60">140 & 140A JALAN JASA 5, TAMAN JASA, 68100 BATU CAVES, SELANGOR</a>
              <a href="https://www.google.com/maps/search/?api=1&query=140%20%26%20140A%20JALAN%20JASA%205%2C%20TAMAN%20JASA%2C%2068100%20BATU%20CAVES%2C%20SELANGOR" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-xs underline underline-offset-4 opacity-60 hover:opacity-100">{language === "ms" ? "Lihat di Google Maps ↗" : "View on Google Maps ↗"}</a>
            </div>
            <div>
              <div className="eyebrow mb-4 opacity-45">{language === "ms" ? "Ikuti kami" : "Follow us"}</div>
              <SocialLinks className="flex-col items-start gap-4" />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer px-6 py-8 md:px-10"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-5 text-[9px] uppercase tracking-[0.18em] opacity-60 md:flex-row md:items-center"><span>© {new Date().getFullYear()} Senitukang</span><span>{t.home.footerCraft}</span><SocialLinks className="!gap-3" /><div className="flex flex-col gap-2 md:items-end"><a href="tel:+601156567811" className="hover:opacity-100">011 5656 7811</a><a href="mailto:senitukang.product@gmail.com" className="normal-case tracking-normal hover:opacity-100">senitukang.product@gmail.com</a></div></div></footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.div className="menu-panel absolute inset-0" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6 md:px-10">
                <div className="flex items-center justify-between"><span className="display text-2xl tracking-[-0.055em] md:text-3xl">SENITUKANG<span className="ml-1 align-top text-[9px]">®</span></span><div className="flex items-center gap-3"><LanguageSwitcher /><button onClick={toggleTheme} className="theme-toggle icon-control" data-cursor><ThemeIcon dark={dark} /><span className="sr-only">{dark ? t.nav.themeLight : t.nav.themeDark}</span></button><button onClick={() => setMenuOpen(false)} aria-label={t.nav.close} className="close-trigger icon-control" data-cursor>×</button></div></div>
                <div className="menu-content flex-1 py-16 md:py-20">
                  <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      {(Object.keys(localizedMenuGroups) as MenuKey[]).map((key, index) => (
                        <button key={key} type="button" onMouseEnter={() => setActiveMenu(key)} onFocus={() => setActiveMenu(key)} onClick={() => {
                          if (key === "Shop") { window.open("https://shopee.com.my/senitukang", "_blank", "noopener,noreferrer"); setMenuOpen(false); return; }
                          setActiveMenu(key);
                        }} className={`menu-major group ${activeMenu === key ? "is-active" : ""}`} data-cursor>
                          <span className="menu-index">0{index + 1}</span><span>{t.nav[key]}</span>{key !== "Shop" && <span className="menu-plus">+</span>}
                        </button>
                      ))}
                    </div>
                    <div className="menu-detail"><div className="eyebrow mb-8 opacity-45">{t.nav.explore} {t.nav[activeMenu]}</div><div className="grid gap-4 sm:grid-cols-2">{localizedMenuGroups[activeMenu].map(([label, href], index) => <motion.a key={label} href={href} onClick={(event) => { if (href.startsWith("#")) { event.preventDefault(); scrollTo(href); } else { setMenuOpen(false); } }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.05 }} className="submenu-link group" data-cursor><span>{label}</span><span className="transition-transform duration-300 group-hover:translate-x-1">↗</span></motion.a>)}</div></div>
                  </div>
                  <div className="mt-20 flex flex-col justify-between gap-8 border-t pt-6 text-[10px] uppercase tracking-[0.18em] md:flex-row md:items-center"><span className="opacity-55">{language === "ms" ? "Malaysia · sejak 2017" : "Malaysia · 2017"} — {new Date().getFullYear()}</span><div className="flex flex-col gap-3"><span className="opacity-55">{language === "ms" ? "Ikuti kami" : "Follow us"}</span><SocialLinks /></div></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {openWork && (
          <motion.div className="work-modal-overlay fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="work-modal-panel absolute inset-0 overflow-y-auto" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <div className="mx-auto max-w-[1600px] px-6 py-6 md:px-10 md:py-8">
                <div className="flex items-center justify-between"><div><div className="eyebrow opacity-45">{t.home.gallery} / {workGroups[openWork].number}</div><h3 className="display mt-3 text-5xl leading-none md:text-8xl">{t.home.categories[openWork]}</h3></div><button onClick={() => setOpenWork(null)} aria-label={t.home.closeGallery} className="close-trigger icon-control" data-cursor>×</button></div>
                <div className="mt-10 grid gap-8 border-t pt-8 lg:grid-cols-[0.7fr_1.3fr]">
                  <div className="lg:sticky lg:top-8 lg:self-start"><p className="max-w-md text-sm leading-7 opacity-65">{t.home.work[openWork].copy}</p><div className="mt-8 text-[10px] uppercase tracking-[0.18em] opacity-45">{t.home.work[openWork].category}</div><Link href="/products" onClick={() => setOpenWork(null)} className="mt-10 inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]" data-cursor>{t.home.viewProducts} <span className="grid h-12 w-12 place-items-center rounded-full border border-current/30">↗</span></Link></div>
                  <div className="grid gap-5 sm:grid-cols-2">{workGroups[openWork].images.map((item, index) => <motion.button key={item.src} type="button" onClick={() => setOpenWork(openWork)} className={`work-gallery-card group text-left ${index === 0 ? "sm:col-span-2" : ""}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05 }} data-cursor><div className="relative aspect-[1.5] overflow-hidden bg-[var(--soft)] sm:aspect-[1.25]"><Image src={item.src} alt={t.home.work[openWork].items[index]?.[0] ?? item.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 40vw, 90vw" /></div><div className="mt-3 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-4"><div><div className="display text-2xl">{t.home.work[openWork].items[index]?.[0] ?? item.label}</div><div className="mt-1 text-[9px] uppercase tracking-[0.18em] opacity-45">{t.home.work[openWork].items[index]?.[1] ?? item.meta}</div></div><span className="opacity-45">↗</span></div></motion.button>)}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
