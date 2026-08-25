"use client";

import { Card } from "@/components/ui/card";
import { BookingWidget } from "@/components/booking-widget";

// 2026-08-25: Calendly fully removed (Jan's report — one flow still surfaced
// Calendly). The section was already rendering the in-house BookingWidget;
// this cleanup deletes the leftover dead code (unused popup handler + iframe
// polling) and stops loading Calendly's third-party widget.js on the page.
// All bookings run through www.fairmieterstrom.app/booking/*.
export function AnsprechpartnerSection() {
  return (
    <section
      id="kontakt"
      className="py-20 px-4 bg-gradient-to-br from-[#f3eee7] to-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance text-[#04252b]">
          Ihr persönlicher Ansprechpartner
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left side - Leroy's info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-[#04252b] mb-6">
              Hey, ich bin Jan!
            </h3>
            <Card className="p-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1">
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex justify-center">
                  <img
                    src="/images/design-mode/68681412c4914a212e8638ba_Jan%20Graventein(1).png"
                    alt="Jan Graventein - Ihr persönlicher Ansprechpartner"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white/50 shadow-lg"
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Gemeinsam mit meinem Team habe ich lange an der Perfektion
                    des{" "}
                    <span className="text-[#074742] font-semibold">
                      fairmieterstrom
                    </span>{" "}
                    Modells gearbeitet und bin stolz es Ihnen präsentieren zu
                    dürfen.
                  </p>
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Buchen Sie sich ein Gespräch mit mir und ich werde Ihnen im
                    Detail erklären, wie das{" "}
                    <span className="text-[#074742] font-semibold">
                      fairmieterstrom
                    </span>{" "}
                    Modell funktioniert.
                  </p>
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Natürlich ist jedes Gespräch unverbindlich und kostenfrei:
                    Wir wollen Ihnen einfach nur helfen, die Vorteile von{" "}
                    <span className="text-[#074742] font-semibold">
                      fairmieterstrom
                    </span>{" "}
                    zu verstehen.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-center text-[#04252b] mb-6">
              Jetzt Gespräch ausmachen
            </h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 flex-1 relative p-6 sm:p-8">
              {/* Booking for Jan Graventein (meeting type slug "jan-graventein")
                  — a real call-booking widget here, not the intake funnel. */}
              <BookingWidget slug="jan-graventein" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
