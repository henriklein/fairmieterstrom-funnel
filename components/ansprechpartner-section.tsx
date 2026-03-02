"use client"

import { Card } from "@/components/ui/card"
import { BookingWidget } from "@/components/booking-widget"

export function AnsprechpartnerSection() {
  return (
    <section id="kontakt" className="py-20 px-4 bg-gradient-to-br from-[#f3eee7] to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance text-[#04252b]">
          Ihr persönlicher Ansprechpartner
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left side - Team info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-[#04252b] mb-6">Hey, wir sind Ihr PEG-Team!</h3>
            <Card className="p-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1">
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex justify-center gap-4">
                  <img
                    src="/images/design-mode/68681412c4914a212e8638ba_Jan%20Graventein(1).png"
                    alt="Jan Graventein"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white/50 shadow-lg"
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Gemeinsam haben wir lange an der Perfektion des{" "}
                    <span className="text-[#074742] font-semibold">fairmieterstrom</span> Modells gearbeitet und sind
                    stolz, es Ihnen präsentieren zu dürfen.
                  </p>
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Buchen Sie sich ein Gespräch und wir werden Ihnen im Detail erklären, wie das{" "}
                    <span className="text-[#074742] font-semibold">fairmieterstrom</span>{" "}
                    Modell funktioniert.
                  </p>
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Natürlich ist jedes Gespräch unverbindlich und kostenfrei: Wir wollen Ihnen einfach nur helfen, die
                    Vorteile von <span className="text-[#074742] font-semibold">fairmieterstrom</span> zu verstehen.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right side - Booking widget */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-center text-[#04252b] mb-6">Jetzt Gespräch ausmachen</h3>
            <Card className="p-6 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl flex-1">
              <BookingWidget slug="erstkontakt" />
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
