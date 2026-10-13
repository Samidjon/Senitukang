const socialProfiles = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/senitukang/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.6" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/officialSenitukang",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
        <path d="M13.4 21v-8.2h2.75l.42-3.2H13.4V7.56c0-.93.26-1.56 1.6-1.56h1.7V3.14c-.3-.04-1.32-.14-2.5-.14-2.48 0-4.18 1.51-4.18 4.29V9.6H7.2v3.2h2.82V21h3.38Z" />
      </svg>
    ),
  },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`} aria-label="Senitukang social media">
      {socialProfiles.map((profile) => (
        <a
          key={profile.name}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit Senitukang on ${profile.name}`}
          className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] opacity-70 transition-opacity duration-300 hover:opacity-100"
        >
          {profile.icon}
          <span>{profile.name}</span>
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
        </a>
      ))}
    </div>
  );
}
