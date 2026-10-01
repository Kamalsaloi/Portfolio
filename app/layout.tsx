import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* Fonts are self-hosted in app/fonts (latin, variable weight) rather than
   next/font/google: on Vercel, the Google loader's URL query broke the build. */
const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
