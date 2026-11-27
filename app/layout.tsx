import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/data/content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.agencyName} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.agencyName}`,
  },
  description: siteConfig.description,
  keywords: [
    "Dhrubo IT",
    "DhruboIT",
    "dhruboit.tech",
    "Software Development Agency",
    "Web Development Agency",
    "Next.js Development",
    "SaaS Engineering",
    "AI Solutions & RAG",
    "Mobile App Development",
    "Cloud & DevOps",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.agencyName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.agencyName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.agencyName} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: ["/images/logo.png"],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.agencyName,
      alternateName: ["DhruboIT", "Dhrubo IT Agency", "Dhrubo IT Studio"],
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/logo.png`,
      email: siteConfig.email,
      description: siteConfig.description,
      areaServed: ["EU", "US", "APAC", "Worldwide"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.agencyName,
      alternateName: "DhruboIT",
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-white text-[#0B0B0F] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
