import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { PERSON, PERSON_ID, SITE_URL, jsonLd } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kamal Saloi, Product Designer",
    template: "%s · Kamal Saloi, Product Designer",
  },
  description: PERSON.description,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Kamal Saloi",
    title: "Kamal Saloi, Product Designer",
    description: PERSON.description,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@KamalSaloi15710",
    title: "Kamal Saloi, Product Designer",
    description: PERSON.description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* Who this site is about, for search engines and AI assistants. */
const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      description: PERSON.summary,
      url: SITE_URL,
      worksFor: { "@type": "Organization", name: PERSON.employer, url: PERSON.employerUrl },
      address: { "@type": "PostalAddress", addressLocality: PERSON.city, addressCountry: PERSON.country },
      knowsAbout: PERSON.knowsAbout,
      sameAs: PERSON.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Kamal Saloi, Product Designer",
      author: { "@id": PERSON_ID },
    },
  ],
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(PERSON_JSON_LD) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
