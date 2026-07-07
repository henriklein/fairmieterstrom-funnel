// Landing-page type system (scoped to /lp/* — does not touch the existing site).
// Recommended by the ui-ux-pro-max "Trust & Authority" system:
//   Calistoga (display serif, human warmth) for headlines,
//   Inter for body/UI,
//   JetBrains Mono (uppercase, tracked) for data labels & section eyebrows.
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google"

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono-data",
  display: "swap",
})

/** Apply on the landing-page root so the CSS variables are in scope. */
export const lpFontVars = `${calistoga.variable} ${inter.variable} ${jetbrains.variable}`

// Tailwind v4 arbitrary utilities that resolve to the variables above.
export const DISPLAY = "font-[family-name:var(--font-display)]"
export const BODY = "font-[family-name:var(--font-body)]"
export const MONO = "font-[family-name:var(--font-mono-data)]"
