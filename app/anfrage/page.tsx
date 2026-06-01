import { Navbar } from "@/components/navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anfrage - fairmieterstrom | Kostenlose Beratung",
  description:
    "Stellen Sie Ihre Anfrage für fairmieterstrom direkt online. Kostenlose Beratung für Mieterstrom in Mehrfamilienhäusern.",
  alternates: {
    canonical: "https://fairmieterstrom.energy/anfrage",
  },
}

// The primary Anfrage experience is now the new multi-step funnel hosted by the
// dashboard app (www.fairmieterstrom.app/funnel), embedded here as an iframe.
// The previous single-page intake + booking form is preserved at
// /anfrage/klassisch. Navbar is sticky (h-16); the iframe fills the viewport
// below it and scrolls internally.
export default function AnfragePage() {
  return (
    <main className="min-h-screen bg-[#04252b]">
      <Navbar />
      <iframe
        src="https://www.fairmieterstrom.app/funnel"
        title="fairMieterstrom – Anfrage"
        className="block w-full border-0 h-[calc(100dvh-4rem)] min-h-[640px]"
        loading="eager"
        allow="clipboard-write"
      />
      <noscript>
        <p className="p-6 text-center text-white">
          Bitte aktivieren Sie JavaScript – oder nutzen Sie das{" "}
          <a href="/anfrage/klassisch" className="underline">
            klassische Anfrageformular
          </a>
          .
        </p>
      </noscript>
    </main>
  )
}
