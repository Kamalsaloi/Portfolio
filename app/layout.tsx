import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Handwritten annotations on the hero. */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamal Saloi · Designer Portfolio",
  description: "Creative designer showcasing UI/UX, branding, and design system work",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* The case study embeds Miro boards. Getting DNS, TCP and TLS out of
            the way up front shaves the handshake off the board's start-up,
            which is otherwise paid at the moment the iframe is inserted. */}
        <link rel="preconnect" href="https://miro.com" />
        <link rel="preconnect" href="https://miro.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://miro.com" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
