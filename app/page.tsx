"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

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
    copy: "Corporate pieces built around identity — plaques, trophies, boxes, pens, tags and custom branded gifts.",
    leadImage: "/images/corporate-feature.jpg",
    images: [
      ["/images/corporate-feature.jpg", "Corporate collection", "Awards · gifts · branded objects"],
      ["/images/work/corporate/corporate-box-plaque.jpg", "Plaque box", "Wood + acrylic"],
      ["/images/work/corporate/corporate-frame.jpg", "Custom frames", "Wedding / appreciation"],
      ["/images/work/corporate/corporate-trophy.jpg", "Wood trophy", "Solid wood"],
      ["/images/work/corporate/corporate-pen.jpg", "Engraved pen", "Wood + metal"],
      ["/images/work/corporate/corporate-gift-box.jpg", "Corporate gift box", "Custom-size box"],
      ["/images/work/corporate/corporate-bod-gift.jpg", "BOD / gift", "Branded keepsake"],
      ["/images/work/corporate/corporate-info-board.jpg", "Information board", "Interchangeable plate"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Wedding: {
    number: "02",
    category: "Wedding collections · details · keepsakes",
    copy: "A visual collection of welcome boards, guestbooks, cake toppers, jewellery boxes, mahr pieces, Quran products and invitations.",
    leadImage: "/images/wedding-feature.jpg",
    images: [
      ["/images/wedding-feature.jpg", "Wedding collection", "Welcome · ring box · hanger"],
      ["/images/work/wedding/wedding-guestbook.jpg", "Guestbook", "Custom cover"],
      ["/images/work/wedding/wedding-cake-topper.jpg", "Cake topper", "Layered wood"],
      ["/images/work/wedding/wedding-jewellery-box.jpg", "Jewellery box", "Personalised"],
      ["/images/work/wedding/wedding-hanger-mahr.jpg", "Wedding hanger", "Engraved wood"],
      ["/images/work/wedding/wedding-mahr-frame.jpg", "Framed Mahr", "Presentation piece"],
      ["/images/work/wedding/wedding-quran-rehal.jpg", "Quran / Rehal", "Islamic wedding"],
      ["/images/work/wedding/wedding-invitation-card.jpg", "Invitation cards", "Acrylic details"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Lifestyle: {
    number: "03",
    category: "Personalised objects · signage · everyday pieces",
    copy: "Small and meaningful objects made from wood and acrylic — keychains, boxes, signs, coasters, map frames and more.",
    leadImage: "/images/lifestyle-feature.jpg",
    images: [
      ["/images/lifestyle-feature.jpg", "Lifestyle collection", "Personalised everyday objects"],
      ["/images/work/lifestyle/lifestyle-keychain.jpg", "Keychains", "Name engraving"],
      ["/images/work/lifestyle/lifestyle-mdf-box.jpg", "MDF box", "Custom engraving"],
      ["/images/work/lifestyle/lifestyle-signage.jpg", "Mini signage", "Custom size"],
      ["/images/work/lifestyle/lifestyle-coaster.jpg", "Coaster set", "Wood / bamboo"],
      ["/images/work/lifestyle/lifestyle-map-frame.jpg", "Map frame", "Multilayer"],
      ["/images/work/lifestyle/lifestyle-trophy-plaque.jpg", "Trophy & plaque", "Recognition"],
      ["/images/work/lifestyle/lifestyle-pen-lapel-pin.jpg", "Pens & lapel pins", "Branded details"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
  Projects: {
    number: "04",
    category: "Large-format commissions · spaces · installations",
    copy: "From exhibition stands and wall panels to signboards, planters and brand collaborations — larger projects with a physical presence.",
    leadImage: "/images/projects-feature.jpg",
    images: [
      ["/images/projects-feature.jpg", "Large-scale project", "Installation · signage"],
      ["/images/work/projects/project-pr1ma-wall-panel.jpg", "PR1MA wall panel", "Interior panel"],
      ["/images/work/projects/project-maha-signboard.jpg", "MAHA signboard", "Event signage"],
      ["/images/work/projects/project-planter-box.jpg", "Planter box", "Cut + assemble"],
      ["/images/work/projects/project-cartier-ramadhan.jpg", "Cartier collaboration", "Ramadhan accessory"],
      ["/images/work/projects/project-ducati-keychain.jpg", "Ducati keychain set", "Brand collaboration"],
      ["/images/work/projects/project-mee-hiris-welcome.jpg", "Mee Hiris welcome board", "Multi-location"],
      ["/images/work/projects/project-sime-darby-model.jpg", "Sime Darby site model", "Scale model"],
    ].map(([src, label, meta]) => ({ src, label, meta })),
  },
};

const workOrder: WorkKey[] = ["Corporate", "Wedding", "Lifestyle", "Projects"];

const services = [
  ["01", "Custom design", "From a blank idea to a finished object."],
  ["02", "Wood engraving", "Precision engraving with a handcrafted finish."],
  ["03", "Acrylic engraving", "Clean, modern pieces for brands and events."],
  ["04", "Corporate & events", "Bulk orders, awards, gifts and special occasions."],
];

const reveal = {
  hidden: { opacity: 0, y: 45 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const wordReveal = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
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

  useEffect(() => {
    const saved = window.localStorage.getItem("senitukang-theme");
    const preferred = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
    document.documentElement.dataset.theme = preferred ? "dark" : "light";
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
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
          <a href="#top" className="brand-mark display text-2xl tracking-[-0.055em] md:text-3xl" data-cursor> SENITUKANG<span className="ml-1 align-top text-[9px] tracking-normal">®</span></a>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} className="theme-toggle icon-control" data-cursor>
              <ThemeIcon dark={dark} />
              <span className="sr-only">{dark ? "Light" : "Dark"} mode</span>
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open navigation" className="menu-trigger icon-control" data-cursor>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <section className="hero relative min-h-screen">
        <div className="absolute inset-0">
          <Image src="/images/hero-workshop.jpg" alt="Laser engraving a wooden keepsake box" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-end px-6 pb-8 pt-32 md:px-10 md:pb-10">
          <div className="hero-topline flex items-center justify-between text-[9px] uppercase tracking-[0.22em]"><span>Malaysia based · est. 2017</span><span className="hidden md:block">Custom wood & acrylic craftsmanship</span></div>
          <div className="mt-auto max-w-7xl pt-24">
            <div className="eyebrow mb-5 text-white/60">Crafting objects with character</div>
            <h1 className="display text-[17vw] leading-[0.77] tracking-[-0.08em] md:text-[11vw]">
              <span className="reveal-line"><motion.span variants={wordReveal} initial="hidden" animate="show">WE CRAFT</motion.span></span>
              <span className="reveal-line"><motion.span variants={wordReveal} initial="hidden" animate="show" transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>STORIES.</motion.span></span>
            </h1>
          </div>
          <div className="mt-9 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-sm leading-6 text-white/70 md:text-[15px]">From personalised gifts to wedding details and corporate pieces, we turn ideas into objects people keep.</p>
            <a href="#work" className="circle-link group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.22em]" data-cursor>Explore our work <span className="grid h-11 w-11 place-items-center rounded-full border border-white/40 transition duration-500 group-hover:-rotate-45">↘</span></a>
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-white/20 pt-4 text-[9px] uppercase tracking-[0.22em] text-white/50"><span>Scroll to explore</span><span className="hidden md:block">Ideas · Materials · People · Beautiful things</span></div>
        </div>
      </section>

      <section id="work" className="work-section px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <div className="eyebrow opacity-50">01 / Selected work</div>
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_28rem] md:items-end">
              <h2 className="display max-w-5xl text-[16vw] leading-[0.78] md:text-[9.5vw]">Work that<br />feels personal.</h2>
              <p className="max-w-sm text-sm leading-7 opacity-60 md:pb-3">Hover a category to preview it. Click one to open a full visual collection from Senitukang&apos;s catalogues.</p>
            </div>
          </motion.div>

          <div className="project-showcase mt-20 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="project-list border-t">
              {workOrder.map((key) => {
                const group = workGroups[key];
                return (
                  <Link key={key} href={`/work/${key.toLowerCase()}`} onMouseEnter={() => setHoveredWork(key)} onFocus={() => setHoveredWork(key)} className={`project-row group ${hoveredWork === key ? "is-active" : ""}`} data-cursor>
                    <div className="project-number">{group.number}</div>
                    <div className="min-w-0">
                      <div className="display project-title">{key}</div>
                      <div className="project-meta mt-3">{group.category}</div>
                      <p className="project-copy mt-4 max-w-md text-sm leading-6">{group.copy}</p>
                    </div>
                    <div className="project-arrow">↗</div>
                  </Link>
                );
              })}
            </div>

            <div className="project-preview sticky top-24 hidden min-h-[44rem] overflow-hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div key={hoveredWork} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }} className="absolute inset-0">
                  <Image src={workGroups[hoveredWork].leadImage} alt={hoveredWork} fill className="object-cover" sizes="45vw" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-7 pt-28 text-white">
                    <div><div className="eyebrow text-white/65">{workGroups[hoveredWork].category}</div><div className="display mt-2 text-5xl">{hoveredWork}</div></div>
                    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/40">↗</div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <Link href={`/work/${hoveredWork.toLowerCase()}`} className="absolute inset-0 z-10" aria-label={`Open ${hoveredWork} collection`} data-cursor />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="dark-section px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}><div className="eyebrow text-white/40">02 / Services</div><h2 className="display mt-6 max-w-5xl text-[17vw] leading-[0.78] text-white md:text-[9.5vw]">Made from<br />your idea.</h2></motion.div>
          <div className="mt-16 border-t border-white/15">
            {services.map(([num, title, copy]) => (
              <motion.div key={num} className="service-row" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.7, delay: Number(num) * 0.04 }}>
                <span className="eyebrow text-white/35">{num}</span><h3 className="display text-4xl md:text-6xl">{title}</h3><p className="max-w-sm text-sm leading-6 text-white/50 md:ml-auto">{copy}</p><span className="text-xl text-white/50">↗</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]"><div className="eyebrow opacity-50">03 / About</div><div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-8"><motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="display col-span-8 text-[15vw] leading-[0.8] md:text-[9.5vw]">Made to be<br />remembered.</motion.h2><motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} transition={{ delay: 0.1 }} className="col-span-4 md:pt-20"><p className="max-w-md text-sm leading-7 opacity-65">Senitukang turns wood, acrylic and ideas into objects people keep — from one personalised gift to a full event collection.</p><div className="mt-10 flex gap-10 text-[10px] uppercase tracking-[0.2em] opacity-50"><span>Malaysia</span><span>Est. 2017</span></div></motion.div></div></div>
      </section>

      <section id="contact" className="contact-section px-6 py-24 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1600px]"><div className="eyebrow opacity-55">04 / Start a project</div><motion.h2 variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="display mt-7 max-w-6xl text-[16vw] leading-[0.78] md:text-[9.5vw]">Have a<br />project?</motion.h2><div className="mt-12 flex flex-col gap-8 border-t pt-8 md:flex-row md:items-end md:justify-between"><p className="max-w-md text-sm leading-7 opacity-60">Tell us what you are imagining. We will help turn it into something tangible.</p><a href="https://wa.me/60000000000" className="inline-flex items-center gap-5 text-[10px] uppercase tracking-[0.22em]" data-cursor>Get a quote<span className="grid h-14 w-14 place-items-center rounded-full border border-current/40 text-lg transition duration-500 hover:-rotate-45">↗</span></a></div></div>
      </section>

      <footer className="footer px-6 py-8 md:px-10"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-4 text-[9px] uppercase tracking-[0.18em] opacity-50 md:flex-row"><span>© {new Date().getFullYear()} Senitukang</span><span>Wood · Acrylic · Design · Craft</span></div></footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.div className="menu-panel absolute inset-0" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
              <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6 md:px-10">
                <div className="flex items-center justify-between"><span className="display text-2xl tracking-[-0.055em] md:text-3xl">SENITUKANG<span className="ml-1 align-top text-[9px]">®</span></span><div className="flex items-center gap-3"><button onClick={toggleTheme} className="theme-toggle icon-control" data-cursor><ThemeIcon dark={dark} /><span className="sr-only">Toggle theme</span></button><button onClick={() => setMenuOpen(false)} aria-label="Close navigation" className="close-trigger icon-control" data-cursor>×</button></div></div>
                <div className="menu-content flex-1 py-16 md:py-20">
                  <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      {(Object.keys(menuGroups) as MenuKey[]).map((key, index) => (
                        <button key={key} type="button" onMouseEnter={() => setActiveMenu(key)} onFocus={() => setActiveMenu(key)} onClick={() => {
                          if (key === "Shop") { window.open("https://shopee.com.my/senitukang", "_blank", "noopener,noreferrer"); setMenuOpen(false); return; }
                          setActiveMenu(key);
                        }} className={`menu-major group ${activeMenu === key ? "is-active" : ""}`} data-cursor>
                          <span className="menu-index">0{index + 1}</span><span>{key}</span>{key !== "Shop" && <span className="menu-plus">+</span>}
                        </button>
                      ))}
                    </div>
                    <div className="menu-detail"><div className="eyebrow mb-8 opacity-45">Explore {activeMenu}</div><div className="grid gap-4 sm:grid-cols-2">{menuGroups[activeMenu].map(([label, href], index) => <motion.a key={label} href={href} onClick={(event) => { if (href.startsWith("#")) { event.preventDefault(); scrollTo(href); } else { setMenuOpen(false); } }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.05 }} className="submenu-link group" data-cursor><span>{label}</span><span className="transition-transform duration-300 group-hover:translate-x-1">↗</span></motion.a>)}</div></div>
                  </div>
                  <div className="mt-20 flex flex-col justify-between gap-8 border-t pt-6 text-[10px] uppercase tracking-[0.18em] opacity-55 md:flex-row"><span>Malaysia · 2017 — {new Date().getFullYear()}</span><span>Instagram · Shopee · WhatsApp</span></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}
