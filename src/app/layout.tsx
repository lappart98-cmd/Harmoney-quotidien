import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "L'Appart 98 — Atelier Textile Gentilly",
  description:
    "L'Appart 98 — Atelier textile personnalise a Gentilly (94). DTF, stickers UV, broderie. Sans minimum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
    >
      <head>
        <meta name="theme-color" content="#0d0c08" />
      </head>
      <body>{children}</body>
    </html>
  );
}
