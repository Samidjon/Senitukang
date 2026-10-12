"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher, useLanguage } from "../../components/language-provider";
import { productTranslations, uiText } from "../../lib/i18n";

const categories = ["All", "Corporate", "Wedding", "Lifestyle", "Islamic", "Projects"] as const;
type Category = typeof categories[number];

type Product = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  meta: string;
  price: string;
  image: string;
};

const products: Product[] = [
  ["multilayer-frame-01", "Multilayer Custom Frame", "Corporate", "Wood · Layered engraving", "Custom quote", "multilayer-frame-01.jpeg"],
  ["multilayer-frame-02", "Multilayer Frame Detail", "Corporate", "Wood · Custom relief", "Custom quote", "multilayer-frame-02.jpeg"],
  ["multilayer-frame-03", "Custom Engraved Frame", "Corporate", "Wood · Multilayer", "Custom quote", "multilayer-frame-03.jpeg"],
  ["standing-signage", "Standing Signage", "Projects", "Wood · Display piece", "Custom quote", "standing-signage.jpeg"],
  ["welcome-board-signage", "Welcome Board / Signage", "Projects", "Wood · Custom signage", "Custom quote", "welcome-board-signage.jpeg"],
  ["custom-box-kash", "Custom Wood Box", "Lifestyle", "Wood · Personalised", "Custom quote", "custom-box-kash.jpeg"],
  ["laser-cut-box", "Laser-Cut Gift Box", "Lifestyle", "Wood · Pattern cut", "Custom quote", "laser-cut-box.jpeg"],
  ["custom-pattern-box", "Custom Pattern Box", "Lifestyle", "Wood · Geometric cut", "Custom quote", "custom-pattern-box.jpeg"],
  ["kash-box-detail", "Custom Box Detail", "Lifestyle", "Wood · Branded", "Custom quote", "kash-box-detail.jpeg"],
  ["round-mini-sign", "Round Mini Sign", "Lifestyle", "Wood · Table signage", "Custom quote", "round-mini-sign.jpeg"],
  ["grind-brand-sign", "Custom Brand Sign", "Lifestyle", "Wood · Acrylic details", "Custom quote", "grind-brand-sign.jpeg"],
  ["menu-sign", "Menu Sign", "Lifestyle", "Wood · Restaurant signage", "Custom quote", "menu-sign.jpeg"],
  ["qr-table-sign", "QR Table Sign", "Lifestyle", "Wood · QR signage", "Custom quote", "qr-table-sign.jpeg"],
  ["mdf-gift-box", "MDF Gift Box", "Corporate", "MDF · Custom engraving", "Custom quote", "mdf-gift-box.jpeg"],
  ["mdf-gift-box-open", "MDF Gift Box — Open", "Corporate", "MDF · Presentation", "Custom quote", "mdf-gift-box-open.png"],
  ["mdf-box-detail", "MDF Box Detail", "Corporate", "MDF · Branded", "Custom quote", "mdf-box-detail.jpeg"],
  ["coaster-set", "Wood Coaster Set", "Lifestyle", "Wood · Engraved", "Custom quote", "coaster-set.jpeg"],
  ["coaster-round", "Round Coaster", "Lifestyle", "Wood · Bamboo", "Custom quote", "coaster-round.jpeg"],
  ["plaque-detail", "Plaque Detail", "Corporate", "Wood · Acrylic", "Custom quote", "plaque-detail.jpeg"],
  ["petra-plaque", "Plaque Box Award", "Corporate", "Wood + Acrylic · Branded", "Custom quote", "petra-plaque.jpeg"],
  ["plaque-award-box", "Presentation Plaque Box", "Corporate", "Wood · Custom", "Custom quote", "plaque-award-box.jpeg"],
  ["keychain-production", "Engraved Keychain Production", "Lifestyle", "Wood · Production", "Custom quote", "keychain-production.jpeg"],
  ["personalised-keychains", "Personalised Keychains", "Lifestyle", "Wood + leather", "Custom quote", "personalised-keychains.jpeg"],
  ["trophy-plaque-01", "Trophy Plaque", "Corporate", "Acrylic + wood", "Custom quote", "trophy-plaque-01.jpeg"],
  ["best-drive-award", "Best Drive Award", "Corporate", "Layered plaque", "Custom quote", "best-drive-award.jpeg"],
  ["engraved-trophy", "Engraved Trophy", "Corporate", "Wood · Acrylic", "Custom quote", "engraved-trophy.jpeg"],
  ["custom-cutout-award", "Custom Cutout Award", "Corporate", "Layered wood", "Custom quote", "custom-cutout-award.jpeg"],
  ["arabic-calligraphy-01", "Arabic Calligraphy Sign", "Islamic", "Wood · Layered", "Custom quote", "arabic-calligraphy-01.jpeg"],
  ["arabic-calligraphy-02", "Arabic Calligraphy Plaque", "Islamic", "Wood · Custom", "Custom quote", "arabic-calligraphy-02.jpeg"],
  ["arabic-calligraphy-03", "Calligraphy Detail", "Islamic", "Wood · Engraved", "Custom quote", "arabic-calligraphy-03.jpeg"],
  ["map-frame-01", "Framed Map", "Projects", "Wood · Multilayer", "Custom quote", "map-frame-01.jpeg"],
  ["map-frame-02", "Map Frame Presentation", "Projects", "Wood + acrylic", "Custom quote", "map-frame-02.jpeg"],
  ["map-frame-03", "Map Detail", "Projects", "Layered wood", "Custom quote", "map-frame-03.jpeg"],
  ["map-frame-04", "Map Close-Up", "Projects", "Custom frame", "Custom quote", "map-frame-04.jpeg"],
  ["conference-plaque", "Conference Plaque", "Corporate", "Acrylic + wood", "Custom quote", "conference-plaque.jpeg"],
  ["floral-recognition-award", "Floral Recognition Award", "Corporate", "Layered wood", "Custom quote", "floral-recognition-award.jpeg"],
  ["trophy-collection", "Trophy Collection", "Corporate", "Acrylic + wood", "Custom quote", "trophy-collection.jpeg"],
  ["family-day-pins-01", "Family Day Pins", "Corporate", "Wood + acrylic", "Custom quote", "family-day-pins-01.jpeg"],
  ["family-day-pins-02", "Lapel Pins", "Corporate", "Wood · Small batch", "Custom quote", "family-day-pins-02.jpeg"],
  ["engraved-pens", "Engraved Pens", "Corporate", "Wood + metal", "Custom quote", "engraved-pens.jpeg"],
  ["wedding-welcome", "Wedding Welcome Board Collection", "Wedding", "Wood · Typography", "Custom quote", "wedding-catalogue-01.png"],
  ["wedding-premium-basic", "Premium & Basic Welcome Boards", "Wedding", "Wood · Floral", "Custom quote", "wedding-catalogue-02.png"],
  ["wedding-modern-frame", "Modern Wedding Boards", "Wedding", "Wood · Frame", "Custom quote", "wedding-catalogue-03.png"],
  ["wedding-guestbook", "Wedding Guestbook", "Wedding", "Wood · Custom cover", "Custom quote", "wedding-catalogue-04.png"],
  ["wedding-cake-topper", "Cake Topper", "Wedding", "Wood · Personalised", "Custom quote", "wedding-catalogue-05.png"],
  ["wedding-jewellery-box", "Jewellery Box", "Wedding", "Wood · Presentation", "Custom quote", "wedding-catalogue-07.png"],
  ["wedding-hanger-mahr", "Wedding Hanger & Framed Mahr", "Wedding", "Wood · Engraved", "Custom quote", "wedding-catalogue-09.png"],
  ["wedding-quran-rehal", "Quran Box & Rehal", "Islamic", "Wood · Geometric cut", "Custom quote", "wedding-catalogue-12.png"],
  ["wedding-invitations", "Acrylic Invitation Cards", "Wedding", "Acrylic · Printed details", "Custom quote", "wedding-catalogue-13.png"],
].map(([id, title, category, meta, price, file]) => ({ id, title, category: category as Exclude<Category, "All">, meta, price, image: `/images/source/${file.startsWith("wedding-") ? `wedding/${file}` : `products/${file}`}` }));

const reveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProductsPage() {
  const [active, setActive] = useState<Category>("All");
  const [dark, setDark] = useState(false);
  const { language } = useLanguage();
  const t = uiText[language];

  useEffect(() => {
    const queryCategory = new URLSearchParams(window.location.search).get("category") as Category | null;
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

  const filtered = useMemo(() => active === "All" ? products : products.filter((product) => product.category === active), [active]);

  return (
    <main className="site-shell min-h-screen overflow-x-hidden">
      <header className="products-header sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="brand-mark display text-2xl tracking-[-0.055em] md:text-3xl">SENITUKANG<span className="ml-1 align-top text-[9px] tracking-normal">®</span></Link>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]">
            <Link href="/" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">{t.products.home}</Link>
            <Link href="/#work" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">{t.products.work}</Link>
            <Link href="/#contact" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">{t.products.quote}</Link>
            <LanguageSwitcher />
            <button onClick={toggleTheme} className="theme-toggle" aria-label={dark ? t.nav.themeLight : t.nav.themeDark}>{dark ? t.products.themeLight : t.products.themeDark}</button>
            <Link href="/" aria-label="Back to home" className="menu-trigger !text-[18px] no-underline">↗</Link>
          </div>
        </div>
      </header>

      <section className="px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="mx-auto max-w-[1600px]">
          <motion.div variants={reveal} initial="hidden" animate="show">
            <div className="eyebrow opacity-50">{t.products.eyebrow}</div>
            <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.6fr] md:items-end">
              <h1 className="display max-w-6xl text-[18vw] leading-[0.77] tracking-[-0.08em] md:text-[11vw]" dangerouslySetInnerHTML={{ __html: t.products.title }} />
              <p className="max-w-sm text-sm leading-7 opacity-65 md:pb-2">{t.products.intro}</p>
            </div>
          </motion.div>

          <div className="mt-16 flex flex-wrap gap-x-7 gap-y-3 border-y border-[var(--line)] py-5 text-[10px] uppercase tracking-[0.18em]">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActive(category)} className={`product-filter transition-opacity ${active === category ? "opacity-100" : "opacity-40 hover:opacity-80"}`}>{t.products.filters[category]}</button>
            ))}
          </div>

          <div className="mt-10 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, index) => {
              const translated = language === "ms" ? productTranslations[product.id]?.ms : undefined;
              const title = translated?.[0] ?? product.title;
              const meta = translated?.[1] ?? product.meta;
              return (
              <motion.article key={product.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: Math.min(index, 10) * 0.035 }} className="group">
                <div className="product-image relative overflow-hidden bg-[var(--soft)]">
                  <div className="relative min-h-[18rem] w-full sm:min-h-[21rem]">
                    <Image src={product.image} alt={title} fill className="object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.025]" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <div className="absolute left-4 top-4 rounded-full border border-current/30 bg-[var(--paper)]/75 px-3 py-2 text-[9px] uppercase tracking-[0.18em] backdrop-blur-md">{t.products.filters[product.category]}</div>
                </div>
                <div className="mt-5 border-b border-[var(--line)] pb-5">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h2 className="display text-3xl leading-[0.92] md:text-4xl">{title}</h2>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.16em] opacity-45">{meta}</p>
                    </div>
                    <span className="shrink-0 pt-1 text-right text-[10px] uppercase tracking-[0.14em] opacity-55">{product.price === "Custom quote" ? t.products.customQuote : product.price}</span>
                  </div>
                </div>
              </motion.article>
              );
            })}
          </div>

          <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="mt-28 grid gap-10 border-t border-[var(--line)] pt-10 md:grid-cols-[1fr_auto] md:items-end">
            <div><div className="eyebrow opacity-50">{t.products.customOrders}</div><h2 className="display mt-5 max-w-4xl text-[12vw] leading-[0.8] md:text-[8vw]">{t.products.ctaTitle}</h2></div>
            <Link href="/#contact" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]">{t.products.cta}<span className="grid h-14 w-14 place-items-center rounded-full border border-current/35 text-lg transition duration-500 group-hover:-rotate-45">↗</span></Link>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
