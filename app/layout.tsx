import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Let's Date — High-Speed Dating App powered by Indxflow Serverless DBaaS",
  description:
    "Experience next-gen dating with 36 verified profiles, instant mutual matching, real-time localized chat, and zero cold-start HTTP PostgreSQL powered by Indxflow DBaaS & ORM.",
  keywords: [
    "tinder clone",
    "dating app nextjs 15",
    "indxflow",
    "indxflow dbaas",
    "serverless postgresql",
    "serverless orm",
    "http sql api",
    "zero cold start database",
    "edge database nextjs",
    "scale to zero postgres",
  ],
  authors: [{ name: "Indxflow Engineering", url: "https://indxflow.com" }],
  creator: "Indxflow DBaaS",
  metadataBase: new URL("https://letsdate.indxflow.com"),
  openGraph: {
    title: "Let's Date — Tinder-like Web App with Indxflow Serverless PostgreSQL",
    description:
      "All 36 girls already liked you! Experience instant matching, persistent chat, and sub-3ms HTTP SQL powered by Indxflow DBaaS.",
    url: "https://letsdate.indxflow.com",
    siteName: "Let's Date",
    images: [
      {
        url: "/f4b82d31-9c1a-4f5e-a67b-12d98c3e4b7a.webp",
        width: 1200,
        height: 630,
        alt: "Let's Date Tinder-Like Web App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Date — Tinder-like Web App powered by Indxflow DBaaS",
    description:
      "Instant matching, persistent chat, and sub-3ms serverless SQL query execution.",
    images: ["/f4b82d31-9c1a-4f5e-a67b-12d98c3e4b7a.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Let's Date",
    applicationCategory: "DatingApplication",
    operatingSystem: "Any Web Browser, Next.js 15 Edge Runtime",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Indxflow DBaaS",
      url: "https://indxflow.com",
      description: "Low-cost, high-DX serverless PostgreSQL with HTTP API & Zero-dependency ORM.",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#09090b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
