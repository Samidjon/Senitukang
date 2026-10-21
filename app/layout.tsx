import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../components/language-provider";
import { ChatWidget } from "../components/chat-widget";

export const metadata: Metadata = {
  title: "Senitukang — Crafted for your moments",
  description: "Custom wood and acrylic craftsmanship in Malaysia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <div className="noise" aria-hidden="true" />
          {children}
          <ChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
