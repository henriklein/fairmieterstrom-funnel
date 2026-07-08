"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronDown, Play, Phone, Mail, Check, X } from "lucide-react"
import { BookingWidget } from "@/components/booking-widget"
import { IntakeWidget } from "@/components/intake-widget"
import { LeadMagnetWidget } from "@/components/lead-magnet-widget"
import { LpHeader } from "@/components/lp/lp-header"
import { Footer } from "@/components/footer"
import { lpFontVars, DISPLAY, BODY, MONO } from "@/lib/fonts"
import {
  type Audience,
  type CtaVariant,
  CTA_VARIANTS,
  TESTIMONIAL,
  CONTACT,
} from "@/lib/audiences"

// =============================================================================
// Config-driven landing page for all three audiences.
// Design system: ui-ux-pro-max "Trust & Authority" — Calistoga display serif,
// Inter body, JetBrains Mono data labels; metric reveal on scroll; before/after
// comparison + case-study proof. The CTA switches between the shared
// Booking / Intake / LeadMagnet widgets via ?v=termin|funnel|pdf.
// =============================================================================

function useVariant(fallback: CtaVariant): CtaVariant {
  const [variant, setVariant] = useState<CtaVariant>(fallback)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v")
    if (v && (CTA_VARIANTS as string[]).includes(v)) setVariant(v as CtaVariant)
  }, [])
  return variant
}

/** Fade/rise into view once, respecting prefers-reduced-motion. */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-500 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  )
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
    <div className="rounded-3xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/5 p-5 sm:p-6">
      <div className="text-center mb-4">
        <h3 className={`${DISPLAY} text-xl text-[#04252b]`}>{copy.title}</h3>
        <p className="text-sm text-[#04252b]/55 mt-1.5">{copy.subtitle}</p>
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
      <p className="mt-4 text-center text-xs text-[#04252b]/50">
        Lieber telefonisch?{" "}
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-1 font-medium text-[#04252b]/75 hover:text-[#5a8a1a] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#77be21]"
        >
          <Phone className="h-3 w-3 text-[#77be21]" />
          {CONTACT.phone}
        </a>
      </p>
    </div>
  )
}

/** Section eyebrow — mono, uppercase, tracked (data-product cue). */
function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`${MONO} flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-balance ${
        onDark ? "text-[#a5e06a]" : "text-[#5a8a1a]"
      }`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#77be21]" />
      {children}
    </span>
  )
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft green glow, bottom-right */}
      <div className="absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[#77be21]/20 blur-[120px]" />
      {/* fine concentric rings, top-right */}
      <div className="absolute -right-24 -top-28 h-[520px] w-[520px] opacity-[0.35]">
        <div className="absolute inset-0 rounded-full border border-[#77be21]/30" />
        <div className="absolute inset-[12%] rounded-full border border-[#77be21]/20" />
        <div className="absolute inset-[24%] rounded-full border border-[#77be21]/15" />
        <div className="absolute inset-[36%] rounded-full border border-[#77be21]/10" />
      </div>
      {/* subtle top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#77be21]/40 to-transparent" />
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#04252b]/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="font-semibold text-[#04252b] group-hover:text-[#5a8a1a] transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#77be21] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-[#04252b]/70 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

function VideoEmbed() {
  const [play, setPlay] = useState(false)
  const id = TESTIMONIAL.youtubeId
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#04252b] ring-1 ring-white/10 shadow-xl">
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title="fairMieterstrom Testimonial"
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="group absolute inset-0 cursor-pointer"
          aria-label="Video abspielen"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#77be21] shadow-lg transition-transform duration-200 group-hover:scale-110">
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
    <div className={`${lpFontVars} ${BODY} bg-[#f3eee7] text-[#04252b] antialiased`}>
      <LpHeader ctaLabel={variant === "pdf" ? "Infomaterial" : "Gespräch vereinbaren"} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#04252b] text-[#f3eee7]">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            {/* Left: message */}
            <div>
              <Reveal>
                <Eyebrow onDark>{audience.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <h1
                  className={`${DISPLAY} mt-5 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.04] tracking-tight text-balance`}
                >
                  {audience.headline}{" "}
                  <span className="text-[#77be21]">{audience.headlineAccent}</span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 text-lg text-[#f3eee7]/75 max-w-xl leading-relaxed">
                  {audience.subline}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <dl className="mt-9 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-5 max-w-lg">
                  {audience.heroStats.map((s) => (
                    <div key={s.label} className="border-l-2 border-[#77be21]/40 pl-3 min-w-0">
                      <dt
                        className={`${DISPLAY} text-xl sm:text-2xl lg:text-3xl text-[#77be21] tabular-nums leading-none whitespace-nowrap`}
                      >
                        {s.value}
                      </dt>
                      <dd className={`${MONO} mt-2 text-[10px] uppercase tracking-wider text-[#f3eee7]/55 leading-snug`}>
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Right: conversion block */}
            <div id="cta" className="scroll-mt-24">
              <Reveal delay={120}>
                <CtaCard audience={audience} variant={variant} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROOF BAND ================= */}
      <div className="bg-[#04252b] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
          {[
            { v: "20 Jahre", l: "familiengeführt · Generalunternehmer" },
            { v: "3 Modelle", l: "Mieterstrom · GGV · Gebäudeinterner Strommarkt" },
            { v: "8–10 Wochen", l: "bis zur techn. Inbetriebnahme" },
            { v: "Oskomera", l: "GmbH — solide Basis" },
          ].map((it) => (
            <div key={it.l} className="text-center sm:text-left">
              <div className={`${DISPLAY} text-lg text-[#77be21] whitespace-nowrap`}>{it.v}</div>
              <div className={`${MONO} text-[10px] uppercase tracking-wider text-[#f3eee7]/45 mt-1`}>
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PAINS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl tracking-tight text-balance max-w-2xl`}>
            {audience.painsTitle}
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {audience.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white p-6 ring-1 ring-black/5 hover:ring-[#04252b]/15 hover:shadow-lg transition-all duration-200">
                <div className={`${MONO} flex h-9 w-9 items-center justify-center rounded-lg bg-[#04252b] text-[#77be21] text-sm`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 font-semibold text-lg text-[#04252b]">{p.title}</h3>
                <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= TURNING POINT ================= */}
      <section className="bg-[#04252b] text-[#f3eee7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <Reveal>
            <p className={`${DISPLAY} text-[1.7rem] sm:text-3xl lg:text-[2.6rem] leading-[1.15] text-balance`}>
              {audience.turningPoint}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= SERVICE STEPS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Der Mehrwert ist die Dienstleistung</Eyebrow>
            <h2 className={`${DISPLAY} mt-4 text-3xl sm:text-4xl tracking-tight text-balance`}>
              {audience.serviceTitle}
            </h2>
            <p className="mt-4 text-lg text-[#04252b]/65 leading-relaxed">{audience.serviceIntro}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {audience.serviceSteps.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className={`${DISPLAY} text-5xl text-[#77be21]/25 leading-none`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < audience.serviceSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block h-5 w-5 text-[#77be21]/40" />
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-lg text-[#04252b]">{s.title}</h3>
                <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= VALUE BENTO ================= */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Reveal>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl tracking-tight text-balance max-w-2xl`}>
              {audience.valueTitle}
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audience.valueProps.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-2xl bg-[#f3eee7]/70 p-6 ring-1 ring-black/5 hover:ring-[#77be21]/50 hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#77be21] shadow-sm shadow-[#77be21]/40">
                    <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 font-semibold text-[#04252b]">{v.title}</h3>
                  <p className="mt-2 text-sm text-[#04252b]/65 leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPARISON (before / after) ================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>Der Unterschied</Eyebrow>
            <h2 className={`${DISPLAY} mt-4 text-3xl sm:text-4xl tracking-tight text-balance`}>
              {audience.comparison.title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-lg">
            <div className="grid grid-cols-[1fr] sm:grid-cols-[minmax(0,180px)_1fr_1fr]">
              {/* header row */}
              <div className="hidden sm:block bg-white" />
              <div className={`${MONO} bg-white px-5 py-4 text-[11px] uppercase tracking-wider text-[#04252b]/45 text-center border-l border-black/5`}>
                {audience.comparison.beforeLabel}
              </div>
              <div className={`${MONO} bg-[#04252b] px-5 py-4 text-[11px] uppercase tracking-wider text-[#a5e06a] text-center`}>
                {audience.comparison.afterLabel}
              </div>
              {/* rows */}
              {audience.comparison.rows.map((r, i) => (
                <div key={r.label} className="contents">
                  <div
                    className={`${MONO} flex items-center bg-[#f3eee7]/60 px-5 py-4 text-[11px] uppercase tracking-wider text-[#04252b]/55 ${
                      i > 0 ? "border-t border-black/5" : ""
                    }`}
                  >
                    {r.label}
                  </div>
                  <div
                    className={`flex items-center gap-2 bg-white px-5 py-4 text-sm text-[#04252b]/55 border-l border-black/5 ${
                      i > 0 ? "border-t border-black/5" : ""
                    }`}
                  >
                    <X className="h-4 w-4 shrink-0 text-[#04252b]/25" />
                    <span>{r.before}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 bg-[#04252b] px-5 py-4 text-sm font-medium text-[#f3eee7] ${
                      i > 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#77be21]" strokeWidth={2.5} />
                    <span>{r.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Projekte im Detail</Eyebrow>
              <h2 className={`${DISPLAY} mt-4 text-3xl sm:text-4xl tracking-tight text-balance`}>
                {audience.projectsTitle}
              </h2>
              <p className="mt-4 text-lg text-[#04252b]/65 leading-relaxed">{audience.projectsIntro}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid lg:grid-cols-3 gap-5">
            {audience.projects.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 80}>
                <div className="flex h-full flex-col rounded-3xl bg-[#04252b] text-[#f3eee7] p-6 ring-1 ring-white/10 hover:ring-[#77be21]/40 transition-all duration-200">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`${MONO} inline-flex rounded-full bg-[#77be21]/15 text-[#a5e06a] px-3 py-1 text-[10px] uppercase tracking-wider`}>
                      {p.tag}
                    </span>
                    <span
                      className={`${MONO} text-[10px] uppercase tracking-wider ${
                        p.real ? "text-[#a5e06a]" : "text-[#f3eee7]/45"
                      }`}
                    >
                      {p.statusLabel}
                    </span>
                  </div>
                  <h3 className={`${DISPLAY} mt-4 text-xl`}>{p.title}</h3>
                  <p className="text-sm text-[#f3eee7]/50">{p.location}</p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <div className={`${DISPLAY} text-lg text-[#77be21] tabular-nums leading-tight`}>
                          {s.value}
                        </div>
                        <div className={`${MONO} text-[9px] uppercase tracking-wide text-[#f3eee7]/50 leading-snug mt-1`}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-sm text-[#f3eee7]/70 leading-relaxed">{p.body}</p>
                  {p.result && (
                    <p className="mt-4 pt-4 border-t border-white/10 text-sm font-semibold text-[#a5e06a] flex gap-2">
                      <Check className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span>{p.result}</span>
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#04252b]/45 max-w-3xl">
            Echte umgesetzte Projekte. Konkrete Zahlen hängen vom jeweiligen Gebäude ab und rechnen
            wir im Erstgespräch durch.
          </p>
        </div>
      </section>

      {/* ================= TESTIMONIAL + VIDEO ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal>
          <VideoEmbed />
        </Reveal>
        <Reveal delay={80}>
          <div>
            <Eyebrow>Partnerschaftlich · verlässlich · auf Augenhöhe</Eyebrow>
            <blockquote className={`${DISPLAY} mt-5 text-2xl sm:text-3xl leading-snug text-[#04252b] text-balance`}>
              „{TESTIMONIAL.quote}"
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-[#04252b]">{TESTIMONIAL.name}</p>
              <p className={`${MONO} text-[11px] uppercase tracking-wider text-[#04252b]/50 mt-0.5`}>
                {TESTIMONIAL.role}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <Reveal>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl tracking-tight text-center text-balance`}>
              Häufige Fragen
            </h2>
          </Reveal>
          <div className="mt-8">
            {audience.faq.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#04252b] text-[#f3eee7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <Reveal>
              <div>
                <Eyebrow onDark>{audience.cta.eyebrow}</Eyebrow>
                <h2 className={`${DISPLAY} mt-4 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-balance`}>
                  {audience.cta.headline}{" "}
                  <span className="text-[#77be21]">{audience.cta.headlineAccent}</span>
                </h2>
                <p className="mt-4 text-lg text-[#f3eee7]/70 max-w-lg leading-relaxed">
                  {audience.cta.subline}
                </p>
                <button
                  onClick={() =>
                    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#77be21] hover:bg-[#6ba01d] text-white font-semibold px-7 py-3.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#77be21]"
                >
                  {variant === "pdf"
                    ? "Infomaterial anfordern"
                    : variant === "funnel"
                      ? "Jetzt Einschätzung holen"
                      : "Kostenloses Gespräch buchen"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-6">
                <p className={`${DISPLAY} text-lg`}>{CONTACT.name}</p>
                <p className={`${MONO} text-[11px] uppercase tracking-wider text-[#f3eee7]/55 mt-1`}>
                  {CONTACT.role}
                </p>
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
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
