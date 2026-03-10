"use client"

import { Card } from "@/components/ui/card"
import { IntakeWidget } from "@/components/intake-widget"
import { BookingWidget } from "@/components/booking-widget"

export function AnfrageContent() {
  return (
    <>
      {/* Intake Section */}
      <section className="pt-28 pb-12 px-4 bg-gradient-to-br from-[#f3eee7] to-white">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-balance text-[#04252b] mb-4">
            Kostenlose Beratung anfragen
          </h1>
          <p className="text-lg text-center text-[#04252b]/70 mb-8">
            Füllen Sie das Formular aus und wir melden uns bei Ihnen.
          </p>
          <Card className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl">
            <IntakeWidget />
          </Card>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-white to-[#f3eee7]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-balance text-[#04252b] mb-4">
            Oder direkt Gespräch buchen
          </h2>
          <p className="text-lg text-center text-[#04252b]/70 mb-8">
            Vereinbaren Sie einen unverbindlichen Beratungstermin.
          </p>
          <Card className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl">
            <BookingWidget slug="erstkontakt" />
          </Card>
        </div>
      </section>
    </>
  )
}
