"use client"

import { useEffect, useState } from "react"
import {
  ArrowRight,
  ChevronDown,
  Play,
  Phone,
  Mail,
  Check,
} from "lucide-react"
import { BookingWidget } from "@/components/booking-widget"
import { IntakeWidget } from "@/components/intake-widget"
import { LeadMagnetWidget } from "@/components/lead-magnet-widget"
import { LpHeader } from "@/components/lp/lp-header"
import { Footer } from "@/components/footer"
import {
  type Audience,
  type CtaVariant,
  CTA_VARIANTS,
  TESTIMONIAL,
  CONTACT,
} from "@/lib/audiences"

// =============================================================================
// One config-driven landing page for all three audiences. The conversion block
// switches between the shared Booking / Intake / LeadMagnet widgets via the
// ?v=termin|funnel|pdf query param, so a single page powers clean A/B tests.
// =============================================================================

function useVariant(fallback: CtaVariant): CtaVariant {
  const [variant, setVariant] = useState<CtaVariant>(fallback)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v")
    if (v && (CTA_VARIANTS as string[]).includes(v)) setVariant(v as CtaVariant)
  }, [])
  return variant
}

const CTA_COPY: Record<CtaVariant, { title: string; subtitle: string }> = {
  termin: {
    title: "Kostenloses Erstgespräch buchen",
    subtitle: "Suchen Sie sich direkt einen Termin — unverbindlich.",
  },
  funnel: {
    title: "In 60 Sekunden zur Einschätzung",
    subtitle: "Ein paar kurze Fragen — wir melden uns mit einer ersten Einschätzung.",
  },
  pdf: {
    title: "Infomaterial anfordern",
    subtitle: "Alles Wichtige kompakt als PDF — sofort zum Download.",
  },
}

function CtaCard({ audience, variant }: { audience: Audience; variant: CtaVariant }) {
  const copy = CTA_COPY[variant]
  return (
    <div className="rounded-2xl bg-white shadow-2xl shadow-black/20 ring-1 ring-black/5 p-5 sm:p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-[#04252b]">{copy.title}</h3>
        <p className="text-sm text-[#04252b]/55 mt-1">{copy.subtitle}</p>
      </div>
      {variant === "termin" && <BookingWidget slug={audience.bookingSlug} />}
      {variant === "funnel" && <IntakeWidget />}
      {variant === "pdf" && (
        <LeadMagnetWidget
          audience={audience.slug}
          pdfFile={audience.pdf.file}
          pdfTitle={audience.pdf.title}
          pdfMeta={audience.pdf.meta}
          pdfBullets={audience.pdf.bullets}
        />
      )}
    </div>
  )
}

function Rings() {
  // Decorative concentric rings (echoes the partner deck), purely cosmetic.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-32 -top-24 h-[640px] w-[640px] opacity-40"
    >
      <div className="absolute inset-0 rounded-full border border-[#77be21]/25" />
      <div className="absolute inset-16 rounded-full border border-[#77be21]/20" />
      <div className="absolute inset-32 rounded-full border border-[#77be21]/15" />
      <div className="absolute inset-[38%] rounded-full bg-[#77be21]/80 blur-sm" />
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#04252b]/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-[#04252b]">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#77be21] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-5 -mt-1 text-[#04252b]/70 leading-relaxed">{a}</p>}
    </div>
  )
}

function VideoEmbed() {
  const [play, setPlay] = useState(false)
  const id = TESTIMONIAL.youtubeId
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#04252b] ring-1 ring-white/10">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="fairMieterstrom Testimonial"
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlay(true)} className="group absolute inset-0" aria-label="Video abspielen">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt="Testimonial abspielen"
            className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#77be21] shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export function AudienceLanding({ audience }: { audience: Audience }) {
  const variant = useVariant(audience.defaultVariant)

  return (
    <div className="bg-[#f3eee7] text-[#04252b]">
      <LpHeader ctaLabel={variant === "pdf" ? "Infomaterial" : "Gespräch vereinbaren"} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#04252b] text-[#f3eee7]">
        <Rings />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            {/* Left: message */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#77be21]/15 text-[#a5e06a] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#77be21]" />
                {audience.eyebrow}
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] tracking-tight text-balance">
                {audience.headline}{" "}
                <span className="text-[#77be21]">{audience.headlineAccent}</span>
              </h1>
              <p className="mt-5 text-lg text-[#f3eee7]/75 max-w-xl leading-relaxed">
                {audience.subline}
              </p>

              <dl className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
                {audience.heroStats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl sm:text-3xl font-bold text-[#77be21]">{s.value}</dt>
                    <dd className="mt-1 text-xs sm:text-sm text-[#f3eee7]/55 leading-snug">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: conversion block */}
            <div id="cta" className="scroll-mt-24">
              <CtaCard audience={audience} variant={variant} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <div className="bg-[#04252b] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#f3eee7]/50">
          <span>20 Jahre Generalunternehmer</span>
          <span className="text-[#77be21]">·</span>
          <span>Mieterstrom · GGV · gebäudeinterner Strommarkt</span>
          <span className="text-[#77be21]">·</span>
          <span>Spezialist fürs Mehrfamilienhaus</span>
        </div>
      </div>

      {/* ================= PAINS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance max-w-2xl">
          {audience.painsTitle}
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {audience.pains.map((p, i) => (
            <div key={p.title} className="rounded-2xl bg-white p-6 ring-1 ring-black/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#04252b] text-[#77be21] font-bold text-sm">
                {i + 1}
              </div>
              <h3 className="mt-4 font-bold text-[#04252b]">{p.title}</h3>
              <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TURNING POINT ================= */}
      <section className="bg-[#04252b] text-[#f3eee7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-balance">
            {audience.turningPoint}
          </p>
        </div>
      </section>

      {/* ================= SERVICE STEPS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#77be21]">
            Der Mehrwert ist die Dienstleistung
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {audience.serviceTitle}
          </h2>
          <p className="mt-4 text-lg text-[#04252b]/65 leading-relaxed">{audience.serviceIntro}</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {audience.serviceSteps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-[#77be21]/30 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < audience.serviceSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block h-5 w-5 text-[#77be21]/40" />
                )}
              </div>
              <h3 className="mt-4 font-bold text-[#04252b]">{s.title}</h3>
              <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= VALUE BENTO ================= */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance max-w-2xl">
            {audience.valueTitle}
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audience.valueProps.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl bg-[#f3eee7]/70 p-6 ring-1 ring-black/5 hover:ring-[#77be21]/40 transition"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#77be21]">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-bold text-[#04252b]">{v.title}</h3>
                <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#77be21]">
            Projekte im Detail
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            {audience.projectsTitle}
          </h2>
          <p className="mt-4 text-lg text-[#04252b]/65 leading-relaxed">{audience.projectsIntro}</p>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-5">
          {audience.projects.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl bg-[#04252b] text-[#f3eee7] p-6 ring-1 ring-white/10"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex rounded-full bg-[#77be21]/15 text-[#a5e06a] px-3 py-1 text-xs font-semibold">
                  {p.tag}
                </span>
                {p.real ? (
                  <span className="text-xs text-[#f3eee7]/45">Echte Referenz</span>
                ) : (
                  <span className="text-xs text-[#f3eee7]/35">Modellrechnung</span>
                )}
              </div>
              <h3 className="mt-4 text-xl font-bold">{p.title}</h3>
              <p className="text-sm text-[#f3eee7]/50">{p.location}</p>

              <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                {p.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-bold text-[#77be21] leading-tight">{s.value}</div>
                    <div className="text-[11px] text-[#f3eee7]/50 leading-snug mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-[#f3eee7]/70 leading-relaxed">{p.body}</p>
              {p.result && (
                <p className="mt-4 pt-4 border-t border-white/10 text-sm font-semibold text-[#a5e06a] flex gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{p.result}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-[#04252b]/45 max-w-3xl">
          Rechenannahmen (Modell): 2.500 kWh je Haushalt + 1.000 kWh Allgemeinstrom · Mieterstrompreis
          0,25 €/kWh (Referenz Grundversorgung 0,28 €/kWh) · Energiewerte aus Anlagensimulation,
          Darstellung schematisch. Konkrete Zahlen rechnen wir für Ihr Objekt im Erstgespräch durch.
        </p>
      </section>

      {/* ================= TESTIMONIAL + VIDEO ================= */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <VideoEmbed />
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[#77be21]">
              Partnerschaftlich, verlässlich, auf Augenhöhe
            </span>
            <blockquote className="mt-4 text-2xl sm:text-3xl font-semibold leading-snug text-[#04252b] text-balance">
              „{TESTIMONIAL.quote}"
            </blockquote>
            <div className="mt-6">
              <p className="font-bold text-[#04252b]">{TESTIMONIAL.name}</p>
              <p className="text-sm text-[#04252b]/55">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-balance">
          Häufige Fragen
        </h2>
        <div className="mt-8">
          {audience.faq.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#04252b] text-[#f3eee7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[#77be21]">
                {audience.cta.eyebrow}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                {audience.cta.headline}{" "}
                <span className="text-[#77be21]">{audience.cta.headlineAccent}</span>
              </h2>
              <p className="mt-4 text-lg text-[#f3eee7]/70 max-w-lg leading-relaxed">
                {audience.cta.subline}
              </p>
              <button
                onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#77be21] hover:bg-[#6ba01d] text-white font-semibold px-7 py-3.5 transition-colors"
              >
                {variant === "pdf"
                  ? "Infomaterial anfordern"
                  : variant === "funnel"
                    ? "Jetzt Einschätzung holen"
                    : "Kostenloses Gespräch buchen"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
              <p className="font-bold text-lg">{CONTACT.name}</p>
              <p className="text-sm text-[#f3eee7]/60">{CONTACT.role}</p>
              <div className="mt-5 space-y-3 text-sm">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-[#f3eee7]/80 hover:text-[#77be21] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#77be21]" />
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-[#f3eee7]/80 hover:text-[#77be21] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#77be21]" />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
