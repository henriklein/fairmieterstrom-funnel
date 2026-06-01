import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnfrageContent } from "../anfrage-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anfrage (klassisches Formular) - fairmieterstrom",
  description:
    "Klassisches Anfrageformular für fairmieterstrom – Intake-Formular und Terminbuchung auf einer Seite.",
  alternates: {
    canonical: "https://fairmieterstrom.energy/anfrage/klassisch",
  },
}

// Preserved single-page intake + booking experience. The primary /anfrage now
// embeds the new multi-step funnel (www.fairmieterstrom.app/funnel); this
// classic form stays available as a subpage.
export default function AnfrageKlassischPage() {
  return (
    <main className="min-h-screen bg-[#f3eee7]">
      <Navbar />
      <AnfrageContent />
      <Footer />
    </main>
  )
}
