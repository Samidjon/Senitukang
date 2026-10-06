import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "../components/custom-cursor";

export const metadata: Metadata = {
  title: "Senitukang — Crafted for your moments",
  description: "Custom wood and acrylic craftsmanship in Malaysia.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
