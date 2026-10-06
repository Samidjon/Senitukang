"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const categories = ["All", "Corporate", "Wedding", "Lifestyle", "Islamic"];

const products = [
  { id: "corp-plaque", title: "Appreciation Plaque", category: "Corporate", meta: "Wood + acrylic · Branded", price: "From RM 75", image: "/images/work/corporate/corporate-plaque.jpg" },
  { id: "corp-box", title: "Plaque Box", category: "Corporate", meta: "Multi-layer · Custom", price: "From RM 250", image: "/images/work/corporate/corporate-box-plaque.jpg" },
  { id: "corp-frame", title: "Bingkai", category: "Corporate", meta: "Layered wood · Engraved", price: "From RM 90", image: "/images/work/corporate/corporate-frame.jpg" },
  { id: "corp-trophy", title: "Trofi", category: "Corporate", meta: "Solid wood · Engraved", price: "From RM 250", image: "/images/work/corporate/corporate-trophy.jpg" },
  { id: "corp-coaster", title: "Alas Cawan", category: "Corporate", meta: "Wood · Custom cut", price: "From RM 25", image: "/images/work/lifestyle/lifestyle-coaster.jpg" },
  { id: "corp-tag", title: "Tag / Pingat", category: "Corporate", meta: "Multi-layer · Brand detail", price: "From RM 25", image: "/images/work/corporate/corporate-tag-pin.jpg" },
  { id: "corp-pen", title: "Engraved Pen", category: "Corporate", meta: "Solid wood · Metal trim", price: "From RM 20", image: "/images/work/corporate/corporate-pen.jpg" },
  { id: "corp-gift", title: "Corporate Gift Box", category: "Corporate", meta: "Custom-size box · Wood", price: "From RM 250", image: "/images/work/corporate/corporate-gift-box.jpg" },
  { id: "corp-kelalang", title: "Kelalang", category: "Corporate", meta: "Stainless steel + bamboo", price: "From RM 70", image: "/images/work/lifestyle/lifestyle-plaque-box.jpg" },
  { id: "corp-notebook", title: "Notebook / Nota Box", category: "Corporate", meta: "Wood + engraved cover", price: "From RM 70", image: "/images/work/lifestyle/lifestyle-custom-box.jpg" },
  { id: "corp-pin", title: "Pin / Keronsang", category: "Corporate", meta: "Wood + enamel / metal", price: "From RM 15", image: "/images/work/corporate/corporate-tag-pin.jpg" },
  { id: "corp-bod", title: "BOD / Gift", category: "Corporate", meta: "Acrylic + wood", price: "From RM 80", image: "/images/work/corporate/corporate-bod-gift.jpg" },
  { id: "wedding-welcome", title: "Wedding Welcome Board", category: "Wedding", meta: "Wood / acrylic · Event", price: "Custom quote", image: "/images/work/wedding/wedding-welcome-board.jpg" },
  { id: "wedding-guestbook", title: "Wooden Guest Book", category: "Wedding", meta: "Wood · Custom cover", price: "Custom quote", image: "/images/work/wedding/wedding-guestbook.jpg" },
  { id: "wedding-ring", title: "Jewellery / Ring Box", category: "Wedding", meta: "Wood · Personalised", price: "Custom quote", image: "/images/work/wedding/wedding-jewellery-box.jpg" },
  { id: "wedding-hanger", title: "Wedding Hanger", category: "Wedding", meta: "Engraved wood", price: "Custom quote", image: "/images/work/wedding/wedding-hanger-mahr.jpg" },
  { id: "wedding-cake", title: "Cake Topper", category: "Wedding", meta: "Layered wood", price: "Custom quote", image: "/images/work/wedding/wedding-cake-topper.jpg" },
  { id: "wedding-mahr", title: "Framed Mahr", category: "Wedding", meta: "Presentation piece", price: "Custom quote", image: "/images/work/wedding/wedding-mahr-frame.jpg" },
  { id: "islamic-quran", title: "Quran / Rehal", category: "Islamic", meta: "Laser-cut wood", price: "Custom quote", image: "/images/work/wedding/wedding-quran-rehal.jpg" },
  { id: "wedding-invite", title: "Invitation Cards", category: "Wedding", meta: "Acrylic details", price: "Custom quote", image: "/images/work/wedding/wedding-invitation-card.jpg" },
  { id: "life-keychain", title: "Personalised Keychain", category: "Lifestyle", meta: "Wood · Name engraving", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-keychain.jpg" },
  { id: "life-box", title: "Custom Wooden Box", category: "Lifestyle", meta: "Custom-size · Engraved", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-custom-box.jpg" },
  { id: "life-mdf", title: "MDF Box", category: "Lifestyle", meta: "Dark finish · Engraved", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-mdf-box.jpg" },
  { id: "life-sign", title: "Mini Signage", category: "Lifestyle", meta: "Custom size", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-mini-signage.jpg" },
  { id: "life-map", title: "Map Frame", category: "Lifestyle", meta: "Multilayer", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-map-frame.jpg" },
  { id: "life-signage", title: "Wood Signage", category: "Lifestyle", meta: "Arabic / decorative engraving", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-wood-signage.jpg" },
  { id: "life-pens", title: "Pens & Lapel Pins", category: "Lifestyle", meta: "Branded details", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-pen-lapel-pin.jpg" },
  { id: "life-frame", title: "Multilayer Frame", category: "Lifestyle", meta: "Layered art", price: "Custom quote", image: "/images/work/lifestyle/lifestyle-multilayer-frame.jpg" },
];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const queryCategory = new URLSearchParams(window.location.search).get("category");
    if (queryCategory && categories.includes(queryCategory)) setActive(queryCategory);
    const saved = window.localStorage.getItem("senitukang-theme");
    const preferred = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
    document.documentElement.dataset.theme = preferred ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("senitukang-theme", next ? "dark" : "light");
    document.documentElement.dataset.theme = next ? "dark" : "light";
  };
  const filtered = useMemo(
    () => (active === "All" ? products : products.filter((product) => product.category === active)),
    [active],
  );

  return (
    <main className="site-shell min-h-screen overflow-x-hidden">
      <header className="products-header sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="brand-mark display text-2xl tracking-[-0.055em] md:text-3xl">
            SENITUKANG<span className="ml-1 align-top text-[9px] tracking-normal">®</span>
          </Link>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
            <Link href="/" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">Home</Link>
            <Link href="/#work" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">Work</Link>
            <Link href="/#contact" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">Get a quote</Link>
            <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
              {dark ? "Light" : "Dark"}
            </button>
            <Link href="/" aria-label="Back to home" className="menu-trigger !text-[18px] no-underline">↗</Link>
          </div>
        </div>
      </header>

      <section className="px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
            <motion.div variants={reveal} initial="hidden" animate="show" className="flex flex-col justify-end border-t border-[var(--line)] pt-8 lg:pb-10">
              <div className="eyebrow opacity-50">Products / Collection</div>
              <h1 className="display mt-7 max-w-6xl text-[18vw] leading-[0.77] tracking-[-0.08em] md:text-[11vw]">
                Objects<br />with character.
              </h1>
              <p className="mt-8 max-w-md text-sm leading-7 opacity-65">
                A curated collection of personalised wood and acrylic pieces, from corporate gifts and wedding details to everyday objects. Ready-made pieces live here; custom commissions start with a quote.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-[58vh] overflow-hidden bg-[var(--soft)]">
              <Image src="/images/lifestyle-feature.jpg" alt="Personalised wood and acrylic collection" fill priority className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent p-7 pt-28 text-white"><div className="eyebrow text-white/65">Wood · acrylic · personalised</div><div className="display mt-2 text-5xl md:text-7xl">Made to keep.</div></div>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-wrap gap-x-7 gap-y-3 border-y border-[var(--line)] py-5 text-[10px] uppercase tracking-[0.18em]">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`product-filter transition-opacity ${active === category ? "opacity-100" : "opacity-40 hover:opacity-80"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: Math.min(index, 7) * 0.05 }}
                className="group"
              >
                <div className="product-image relative aspect-[0.95] overflow-hidden bg-[var(--soft)]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/60 bg-black/10 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {product.category}
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-6 border-b border-[var(--line)] pb-5">
                  <div>
                    <h2 className="display text-3xl leading-[0.92] md:text-4xl">{product.title}</h2>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.16em] opacity-45">{product.meta}</p>
                  </div>
                  <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.14em] opacity-55">{product.price}</span>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-28 grid gap-10 border-t border-[var(--line)] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="eyebrow opacity-50">Custom orders</div>
              <h2 className="display mt-5 max-w-4xl text-[12vw] leading-[0.8] md:text-[8vw]">Need something made for you?</h2>
            </div>
            <Link href="/#contact" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
              Start a project
              <span className="grid h-14 w-14 place-items-center rounded-full border border-current/35 text-lg transition duration-500 group-hover:-rotate-45">↗</span>
            </Link>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
