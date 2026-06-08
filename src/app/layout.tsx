import type { Metadata, Viewport } from "next";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://eram.edu.in"
  ),
  title: {
    default: "ERAM Education | Building Foundations. Shaping Futures.",
    template: "%s | ERAM Education",
  },
  description:
    "ERAM Education was established to build disciplined, value-based institutions that expand access to quality learning and reach communities that need it most.",
  keywords: [
    "ERAM Education",
    "Palakkad schools",
    "MMHSS",
    "MMPS",
    "AMLP",
    "MMITE",
    "higher secondary school Palakkad",
    "teacher training institute Kerala",
  ],
  authors: [{ name: "ERAM Education" }],
  creator: "ERAM Education",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ERAM Education",
    title: "ERAM Education | Building Foundations. Shaping Futures.",
    description:
      "A disciplined educational ecosystem nurturing academic excellence, character, and opportunity across multiple institutions in Palakkad.",
    images: [
      {
        url: "/images/institute.webp",
        width: 1200,
        height: 630,
        alt: "ERAM Education Campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERAM Education | Building Foundations. Shaping Futures.",
    description:
      "A disciplined educational ecosystem in Palakkad nurturing academic excellence.",
    images: ["/images/institute.webp"],
  },

  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <head>
  {/* Preconnect */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />

  {/* Fonts */}
  <link
    href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;800;900&family=Rethink+Sans:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />

  {/* Local Font */}
  <link
    rel="preload"
    href="/fonts/Agency.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />

  {/* SVG Logo */}
  <link
    rel="preload"
    href="/education-1.svg"
    as="image"
    type="image/svg+xml"
  />
</head>

      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}