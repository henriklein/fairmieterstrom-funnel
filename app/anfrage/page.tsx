import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnfrageContent } from "./anfrage-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anfrage - fairmieterstrom | Kostenlose Beratung",
  description:
    "Stellen Sie Ihre Anfrage für fairmieterstrom direkt online. Kostenlose Beratung für Mieterstrom in Mehrfamilienhäusern.",
  alternates: {
    canonical: "https://fairmieterstrom.energy/anfrage",
  },
}

export default function AnfragePage() {
  return (
    <main className="min-h-screen bg-[#f3eee7]">
      <Navbar />
      <AnfrageContent />
      <Footer />
    </main>
  )
}
