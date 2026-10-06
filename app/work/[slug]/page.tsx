"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

const collections = {
  corporate: {
    number: "01",
    title: "Corporate",
    eyebrow: "Awards · gifts · branded objects",
    description:
      "Corporate pieces built around identity — plaques, trophies, boxes, pens, tags and custom branded gifts. The collection follows Senitukang's corporate catalogue and product photography.",
    hero: "/images/corporate-feature.jpg",
    color: "#11100f",
    items: [
      ["/images/work/corporate/corporate-plaque.jpg", "Appreciation plaque", "Wood + acrylic"],
      ["/images/work/corporate/corporate-box-plaque.jpg", "Plaque box", "Wood + acrylic"],
      ["/images/work/corporate/corporate-frame.jpg", "Bingkai", "Layered wood"],
      ["/images/work/corporate/corporate-trophy.jpg", "Trofi", "Solid wood"],
      ["/images/work/corporate/corporate-pen.jpg", "Engraved pen", "Wood + metal"],
      ["/images/work/corporate/corporate-gift-box.jpg", "Corporate gift box", "Custom-size box"],
      ["/images/work/corporate/corporate-info-board.jpg", "Information board", "Interchangeable plate"],
      ["/images/work/corporate/corporate-tag-pin.jpg", "Tag / pingat", "Multi-layer material"],
      ["/images/work/corporate/corporate-bod-gift.jpg", "BOD / gift", "Acrylic + wood"],
    ],
  },
  wedding: {
    number: "02",
    title: "Wedding",
    eyebrow: "Wedding collections · details · keepsakes",
    description:
      "Welcome boards, guestbooks, cake toppers, jewellery boxes, hangers, mahr pieces, Quran products and invitations — a collection designed around the moments people keep.",
    hero: "/images/wedding-feature.jpg",
    color: "#4b3b31",
    items: [
      ["/images/work/wedding/wedding-welcome-board.jpg", "Welcome board", "Event signage"],
      ["/images/work/wedding/wedding-guestbook.jpg", "Guestbook", "Custom cover"],
      ["/images/work/wedding/wedding-cake-topper.jpg", "Cake topper", "Layered wood"],
      ["/images/work/wedding/wedding-jewellery-box.jpg", "Jewellery box", "Personalised"],
      ["/images/work/wedding/wedding-hanger-mahr.jpg", "Wedding hanger", "Engraved wood"],
      ["/images/work/wedding/wedding-mahr-frame.jpg", "Framed Mahr", "Presentation piece"],
      ["/images/work/wedding/wedding-jewellery-detail.jpg", "Jewellery detail", "Keepsake set"],
      ["/images/work/wedding/wedding-quran-rehal.jpg", "Quran / Rehal", "Islamic wedding"],
      ["/images/work/wedding/wedding-invitation-card.jpg", "Invitation cards", "Acrylic details"],
    ],
  },
  lifestyle: {
    number: "03",
    title: "Lifestyle",
    eyebrow: "Personalised objects · signage · everyday pieces",
    description:
      "Smaller objects with personality: keychains, boxes, signs, coasters, map frames, pens and lapel pins. These are the pieces that make everyday spaces feel personal.",
    hero: "/images/lifestyle-feature.jpg",
    color: "#2b2722",
    items: [
      ["/images/work/lifestyle/lifestyle-custom-box.jpg", "Custom wooden box", "Custom-size"],
      ["/images/work/lifestyle/lifestyle-keychain.jpg", "Keychains", "Name engraving"],
      ["/images/work/lifestyle/lifestyle-mdf-box.jpg", "MDF box", "Dark finish"],
      ["/images/work/lifestyle/lifestyle-mini-signage.jpg", "Mini signage", "Custom size"],
      ["/images/work/lifestyle/lifestyle-coaster.jpg", "Coaster set", "Wood / bamboo"],
      ["/images/work/lifestyle/lifestyle-map-frame.jpg", "Map frame", "Multilayer"],
      ["/images/work/lifestyle/lifestyle-wood-signage.jpg", "Wood signage", "Arabic engraving"],
      ["/images/work/lifestyle/lifestyle-pen-lapel-pin.jpg", "Pens & lapel pins", "Branded details"],
      ["/images/work/lifestyle/lifestyle-multilayer-frame.jpg", "Multilayer frame", "Custom layered art"],
      ["/images/work/lifestyle/lifestyle-plaque-box.jpg", "Plaque box", "Presentation case"],
    ],
  },
  projects: {
    number: "04",
    title: "Projects",
    eyebrow: "Large-format commissions · spaces · installations",
    description:
      "From exhibition stands and wall panels to signboards, planters and collaborations — larger commissions where the craft becomes part of a physical space.",
    hero: "/images/projects-feature.jpg",
    color: "#1a1a18",
    items: [
      ["/images/projects-feature.jpg", "Exhibition installation", "Wood + lighting"],
      ["/images/work/projects/project-ctcs-stand.jpg", "CTCS stand", "Expo installation"],
      ["/images/work/projects/project-pr1ma-wall-panel.jpg", "PR1MA wall panel", "Interior panel"],
      ["/images/work/projects/project-maha-signboard.jpg", "MAHA signboard", "Event signage"],
      ["/images/work/projects/project-planter-box.jpg", "Planter box", "Cut + assemble"],
      ["/images/work/projects/project-cartier-ramadhan.jpg", "Cartier collaboration", "Ramadhan accessory"],
      ["/images/work/projects/project-ducati-keychain.jpg", "Ducati keychain set", "Brand collaboration"],
      ["/images/work/projects/project-mee-hiris-welcome.jpg", "Mee Hiris welcome board", "Multi-location"],
      ["/images/work/projects/project-sime-darby-model.jpg", "Sime Darby site model", "Scale model"],
    ],
  },
} as const;

type Slug = keyof typeof collections;

const order: Slug[] = ["corporate", "wedding", "lifestyle", "projects"];

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon"><path d="M20.3 15.1A8.6 8.6 0 0 1 8.9 3.7a8.6 8.6 0 1 0 11.4 11.4Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="theme-icon"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
  );
}

export default function WorkCollectionPage() {
  const params = useParams<{ slug: string }>();
  const [dark, setDark] = useState(false);
  const slug = (params.slug || "corporate").toLowerCase() as Slug;
  const collection = collections[slug] ?? collections.corporate;
  const index = useMemo(() => order.indexOf(slug in collections ? slug : "corporate"), [slug]);
  const prev = order[(index - 1 + order.length) % order.length];
  const next = order[(index + 1) % order.length];

  useEffect(() => {
    const saved = window.localStorage.getItem("senitukang-theme");
    const preferred = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
    document.documentElement.dataset.theme = preferred ? "dark" : "light";
    window.scrollTo(0, 0);
  }, [slug]);

  const toggleTheme = () => {
    const nextTheme = !dark;
    setDark(nextTheme);
    window.localStorage.setItem("senitukang-theme", nextTheme ? "dark" : "light");
    document.documentElement.dataset.theme = nextTheme ? "dark" : "light";
  };

  return (
    <main className="site-shell min-h-screen overflow-x-hidden">
      <header className="products-header sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="brand-mark display text-2xl tracking-[-0.055em] md:text-3xl">SENITUKANG<span className="ml-1 align-top text-[9px]">®</span></Link>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em]">
            <Link href="/" className="opacity-60 transition-opacity hover:opacity-100">Home</Link>
            <Link href="/products" className="hidden opacity-60 transition-opacity hover:opacity-100 md:inline">Products</Link>
            <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle icon-control"><ThemeIcon dark={dark} /></button>
            <Link href="/" aria-label="Back home" className="menu-trigger icon-control !text-[18px]">↗</Link>
          </div>
        </div>
      </header>

      <section className="work-detail-hero px-6 py-8 md:px-10 md:py-10">
        <div className="mx-auto grid min-h-[78vh] max-w-[1600px] gap-10 lg:grid-cols-[0.42fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-between py-4 lg:py-8">
            <div><div className="eyebrow opacity-45">Selected work / {collection.number}</div><h1 className="display mt-6 text-[18vw] leading-[0.75] tracking-[-0.08em] md:text-[10vw]">{collection.title}</h1><p className="mt-8 max-w-md text-sm leading-7 opacity-65">{collection.description}</p><div className="mt-8 text-[10px] uppercase tracking-[0.2em] opacity-45">{collection.eyebrow}</div></div>
            <Link href="#collection" className="mt-12 inline-flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em]" data-cursor>Explore collection <span className="grid h-12 w-12 place-items-center rounded-full border border-current/30">↓</span></Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative min-h-[58vh] overflow-hidden bg-[var(--soft)]">
            <Image src={collection.hero} alt={`${collection.title} collection`} fill priority className="object-cover" sizes="(min-width: 1024px) 65vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-7 pt-28 text-white"><div className="eyebrow text-white/65">{collection.eyebrow}</div><div className="display mt-2 text-5xl md:text-7xl">{collection.title}</div></div>
          </motion.div>
        </div>
      </section>

      <section id="collection" className="px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between border-t border-[var(--line)] pt-6"><div><div className="eyebrow opacity-45">The collection</div><div className="display mt-3 text-4xl md:text-6xl">Selected pieces</div></div><span className="hidden text-[10px] uppercase tracking-[0.18em] opacity-45 md:block">{collection.items.length} works</span></div>
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
            {collection.items.map(([src, label, meta], i) => (
              <motion.article key={src} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.75, delay: (i % 2) * 0.05 }} className={`group ${i === 0 ? "md:col-span-2" : ""}`}>
                <div className={`relative overflow-hidden bg-[var(--soft)] ${i === 0 ? "aspect-[1.8]" : "aspect-[1.25]"}`}><Image src={src} alt={label} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]" sizes={i === 0 ? "90vw" : "45vw"} /><div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" /></div>
                <div className="mt-5 flex items-start justify-between gap-6 border-b border-[var(--line)] pb-5"><div><h2 className="display text-3xl md:text-4xl">{label}</h2><p className="mt-2 text-[9px] uppercase tracking-[0.18em] opacity-45">{meta}</p></div><span className="text-sm opacity-35 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1600px]"><div className="eyebrow text-white/35">Start something new</div><div className="mt-6 grid gap-10 md:grid-cols-[1fr_auto] md:items-end"><h2 className="display max-w-5xl text-[13vw] leading-[0.78] md:text-[8.5vw]">Have a {collection.title.toLowerCase()} project?</h2><Link href="/#contact" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]" data-cursor>Get a quote <span className="grid h-14 w-14 place-items-center rounded-full border border-white/30 transition-transform duration-500 hover:-rotate-45">↗</span></Link></div></div>
      </section>

      <nav className="border-t border-[var(--line)]" aria-label="Work collections">
        <div className="grid md:grid-cols-2">
          <Link href={`/work/${prev}`} className="group border-b border-[var(--line)] px-6 py-16 md:border-b-0 md:border-r md:px-10 md:py-24" data-cursor><div className="eyebrow opacity-40">Previous</div><div className="mt-4 flex items-end justify-between gap-6"><span className="display text-5xl md:text-8xl">{collections[prev].title}</span><span className="text-2xl transition-transform duration-500 group-hover:-translate-x-1">←</span></div></Link>
          <Link href={`/work/${next}`} className="group px-6 py-16 md:px-10 md:py-24" data-cursor><div className="eyebrow opacity-40">Next</div><div className="mt-4 flex items-end justify-between gap-6"><span className="display text-5xl md:text-8xl">{collections[next].title}</span><span className="text-2xl transition-transform duration-500 group-hover:translate-x-1">→</span></div></Link>
        </div>
      </nav>

      <footer className="footer px-6 py-8 md:px-10"><div className="mx-auto flex max-w-[1600px] justify-between gap-4 text-[9px] uppercase tracking-[0.18em] opacity-50"><span>© {new Date().getFullYear()} Senitukang</span><Link href="/products">Products</Link></div></footer>
    </main>
  );
}
