import "./globals.css";

export const metadata = {
  title: "ARYA – Haus der Helden | Iranisch-Afghanisches Restaurant Düsseldorf",
  description:
    "Düsseldorfs Superhelden-Restaurant. Iranische & Afghanische Küche, Hero Burger und mehr. Kölner Str. 220 · 40227 Düsseldorf. Jetzt per WhatsApp bestellen!",
  keywords:
    "ARYA, Haus der Helden, Düsseldorf, Restaurant, Iranisch, Afghanisch, Superhelden, Burger, Kölner Straße, Fast Food",
  authors: [{ name: "ARYA – Haus der Helden" }],
  openGraph: {
    title: "ARYA – Haus der Helden",
    description:
      "Das Superhelden-Restaurant in Düsseldorf. Iranisch & Afghanisch. Premium Fast Food.",
    url: "https://arya-hausderhelden.de",
    siteName: "ARYA – Haus der Helden",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARYA – Haus der Helden",
    description: "Düsseldorfs Superhelden-Restaurant. Iranisch & Afghanisch.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
