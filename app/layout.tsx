import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { Suspense } from "react"
import { CookieBanner } from "@/components/cookie-banner"
import "./globals.css"

import { GeistSans, GeistMono } from "geist/font"

import { Source_Serif_4, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], variable: '--v0-font-source-serif-4' })
const _v0_fontVariables = `${_sourceSerif_4.variable}`

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  title: {
    default: "fairMieterstrom für Eigentümer - Mieterstrom neu gedacht",
    template: "%s | fairMieterstrom",
  },
  description:
    "Mieterstrom neu gedacht. Mit fairMieterstrom schaffen Sie ein lukratives Investment ohne zusätzlichen Aufwand oder bürokratischen Albtraum. Bis zu 15% gesicherte Rendite.",
  keywords:
    "Mieterstrom, PV-Anlage, Mehrfamilienhaus, Solarenergie, Rendite, fairMieterstrom, Pure Energy Germany, Eigentümer, Vermieter",
  authors: [{ name: "Pure Energy Germany" }],
  creator: "Pure Energy Germany",
  publisher: "Pure Energy Germany",
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
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "fairMieterstrom für Eigentümer - Mieterstrom neu gedacht",
    description:
      "Mieterstrom neu gedacht. Mit fairMieterstrom schaffen Sie ein lukratives Investment ohne zusätzlichen Aufwand oder bürokratischen Albtraum. Bis zu 15% gesicherte Rendite.",
    url: "https://fairmieterstrom.energy",
    siteName: "fairMieterstrom",
    images: [
      {
        url: "https://cdn.prod.website-files.com/6851230f794c51bed168c638/68512d19b79e73d7ac83ae53_header-logo.webp",
        width: 1200,
        height: 630,
        alt: "Pure Energy Germany Logo - fairMieterstrom",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "fairMieterstrom für Eigentümer - Mieterstrom neu gedacht",
    description:
      "Mieterstrom neu gedacht. Mit fairMieterstrom schaffen Sie ein lukratives Investment ohne zusätzlichen Aufwand oder bürokratischen Albtraum. Bis zu 15% gesicherte Rendite.",
    images: ["https://cdn.prod.website-files.com/6851230f794c51bed168c638/68512d19b79e73d7ac83ae53_header-logo.webp"],
  },
  alternates: {
    canonical: "https://fairmieterstrom.energy",
  },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PCGMK98R');
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${sourceSerif.variable} ${_v0_fontVariables}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCGMK98R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <CookieBanner />
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? ''}");
            `,
          }}
        />
      </body>
    </html>
  )
}
