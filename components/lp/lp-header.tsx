"use client"

import Image from "next/image"
import { Phone } from "lucide-react"
import { CONTACT } from "@/lib/audiences"

// Slim landing-page header: logo + phone + one CTA that scrolls to the
// conversion block. Deliberately no full nav — ad traffic should convert, not
// wander off.
export function LpHeader({ ctaLabel = "Gespräch vereinbaren" }: { ctaLabel?: string }) {
  const scrollToCta = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 bg-[#04252b]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center shrink-0">
          <Image
            src="/images/design-mode/68512d19b79e73d7ac83ae53_header-logo(1).webp"
            alt="Pure Energy Germany"
            width={170}
            height={38}
            className="h-9 w-auto brightness-0 invert"
            priority
          />
        </a>
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[#f3eee7]/80 hover:text-white transition-colors"
          >
            <Phone className="h-4 w-4 text-[#77be21]" />
            {CONTACT.phone}
          </a>
          <button
            onClick={scrollToCta}
            className="inline-flex items-center rounded-full bg-[#77be21] hover:bg-[#6ba01d] text-white text-sm font-semibold px-4 sm:px-5 py-2.5 transition-colors"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </header>
  )
}
