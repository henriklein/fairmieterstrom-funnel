"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function AnsprechpartnerSection() {
  const [calendlyLoaded, setCalendlyLoaded] = useState(true)
  const [showCalendlyPopup, setShowCalendlyPopup] = useState(false)

  useEffect(() => {
    // Check if Calendly widget loaded after a delay
    const timer = setTimeout(() => {
      const calendlyWidget = document.querySelector(".calendly-inline-widget")
      if (calendlyWidget && !calendlyWidget.querySelector("iframe")) {
        setCalendlyLoaded(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const openCalendlyPopup = () => {
    window.open(
      "https://calendly.com/pure-energy-germany/setter-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=04252b&primary_color=77be21",
      "_blank",
      "width=800,height=700,scrollbars=yes,resizable=yes",
    )
  }

  return (
    <section id="kontakt" className="py-20 px-4 bg-gradient-to-br from-[#f3eee7] to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-balance text-[#04252b]">
          Ihr persönlicher Ansprechpartner
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left side - Jan's info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-[#04252b] mb-6">Hey, ich bin Jan!</h3>
            <Card className="p-8 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 flex-1">
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex justify-center">
                  <img
                    src="/images/design-mode/68681412c4914a212e8638ba_Jan%20Graventein(1).png"
                    alt="Jan - Ihr persönlicher Ansprechpartner"
                    className="w-48 h-48 rounded-full object-cover border-4 border-white/50 shadow-lg"
                  />
                </div>

                <div className="space-y-4 flex-1">
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Gemeinsam mit meinem Team habe ich lange an der Perfektion des{" "}
                    <span className="text-[#074742] font-semibold">fairmieterstrom</span> Modells gearbeitet und bin
                    stolz es Ihnen präsentieren zu dürfen.
                  </p>
                  <p className="text-lg text-[#04252b]/80 leading-relaxed">
                    Buchen Sie sich ein Gespräch mit mir und ich werde Ihnen im Detail erklären, wie das{" "}
                    <span className="text-[#074742] font-semibold">fairmieterstrom</span>
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

          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold text-center text-[#04252b] mb-6">Jetzt Gespräch ausmachen</h3>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 flex-1">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  @media screen and (max-width: 479px) {
                    .calendly-inline-widget {
                      min-width: 290px !important;
                    }
                  }
                `,
                }}
              />
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/pure-energy-germany/setter-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=04252b&primary_color=77be21"
                style={{ minWidth: "280px", height: "660px" }}
              />
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />

              {!calendlyLoaded && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-[#04252b] mb-4">Terminbuchung lädt nicht?</p>
                    <Button onClick={openCalendlyPopup} className="bg-[#77be21] hover:bg-[#6ba01d] text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Hier klicken für Popup
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
