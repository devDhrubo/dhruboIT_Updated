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
  title: `${siteConfig.agencyName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "Web Development Agency",
    "Upwork Top Rated Agency",
    "Next.js Development",
    "MERN Stack",
    "MEAN Stack",
    "Shopify Plus",
    "WordPress Development",
    "AI Integrations",
  ],
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
  },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: ["/images/logo.png"],
    apple: [{ url: "/images/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-white text-[#0B0B0F] antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
