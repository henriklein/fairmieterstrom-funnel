"use client"

import { useState, useRef, useEffect } from "react"
import { CheckCircle2, ChevronLeft, ChevronDown, Home, Building2, HelpCircle, Loader2, Calendar } from "lucide-react"
import { BookingWidget } from "@/components/booking-widget"
import { Button } from "@/components/ui/button"

// =============================================================================
// Config
// =============================================================================

const PEG_API = "https://www.fairmieterstrom.app"

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  const utms: Record<string, string> = {}
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const val = params.get(key)
    if (val) utms[key] = val
  }
  return utms
}

const COUNTRY_CODES = [
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", label: "DE" },
  { code: "+43", flag: "\u{1F1E6}\u{1F1F9}", label: "AT" },
  { code: "+41", flag: "\u{1F1E8}\u{1F1ED}", label: "CH" },
  { code: "+31", flag: "\u{1F1F3}\u{1F1F1}", label: "NL" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", label: "FR" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", label: "GB" },
  { code: "+39", flag: "\u{1F1EE}\u{1F1F9}", label: "IT" },
  { code: "+34", flag: "\u{1F1EA}\u{1F1F8}", label: "ES" },
  { code: "+48", flag: "\u{1F1F5}\u{1F1F1}", label: "PL" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", label: "US" },
]

// =============================================================================
// Types
// =============================================================================

type Step = 1 | 2 | 3 | 4 | 5 | 6

interface FormData {
  unit_count_range: string
  monthly_electricity_cost: string
  roof_type: string
  ownership_role: string
  name: string
  email: string
  phoneNumber: string
  countryCode: string
}

// =============================================================================
// Component
// =============================================================================

export function IntakeWidget() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({
    unit_count_range: "",
    monthly_electricity_cost: "",
    roof_type: "",
    ownership_role: "",
    name: "",
    email: "",
    phoneNumber: "",
    countryCode: "+49",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [showBooking, setShowBooking] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedCountry = COUNTRY_CODES.find((c) => c.code === formData.countryCode) ?? COUNTRY_CODES[0]

  const selectOption = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setStep((s) => (s + 1) as Step)
  }

  const goBack = () => {
    setError(null)
    setStep((s) => (s - 1) as Step)
  }

  const validateContact = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim() || formData.name.trim().length < 2)
      errors.name = "Bitte geben Sie Ihren Namen ein"
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Bitte geben Sie eine gültige E-Mail ein"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getFullPhone = () => {
    const num = formData.phoneNumber.trim()
    if (!num) return undefined
    return `${formData.countryCode} ${num}`
  }

  const handleSubmit = async () => {
    if (!validateContact()) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${PEG_API}/api/intake/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: getFullPhone(),
          unit_count_range: formData.unit_count_range,
          monthly_electricity_cost: formData.monthly_electricity_cost,
          roof_type: formData.roof_type,
          ownership_role: formData.ownership_role,
          ...getUtmParams(),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Anfrage fehlgeschlagen")

      setStep(6)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  const cardClass =
    "px-4 py-4 rounded-xl border border-white/40 bg-white/50 text-[#04252b] hover:border-[#77be21] hover:bg-white/70 transition-all text-sm font-medium text-center"

  return (
    <div className="space-y-4">
      {error && step !== 6 && (
        <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Step 1: Wohneinheiten */}
      {step === 1 && (
        <div className="space-y-4">
          <p className="text-base font-semibold text-[#04252b] text-center">
            Wie viele Wohneinheiten hat Ihr Gebäude?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["3-6", "7-12", "13-18", "19+"].map((option) => (
              <button key={option} onClick={() => selectOption("unit_count_range", option)} className={cardClass}>
                {option} Einheiten
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Stromkosten */}
      {step === 2 && (
        <div className="space-y-4">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <p className="text-base font-semibold text-[#04252b] text-center">
            Wie hoch sind Ihre monatlichen Stromkosten für Allgemeinflächen?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["<100\u20AC", "100-250\u20AC", "250-500\u20AC", "500\u20AC+"].map((option) => (
              <button key={option} onClick={() => selectOption("monthly_electricity_cost", option)} className={cardClass}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Dachart */}
      {step === 3 && (
        <div className="space-y-4">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <p className="text-base font-semibold text-[#04252b] text-center">
            Welche Art von Dach hat Ihr Gebäude?
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Schrägdach", icon: Home },
              { label: "Flachdach", icon: Building2 },
              { label: "Anderes", icon: HelpCircle },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => selectOption("roof_type", label)}
                className="flex flex-col items-center gap-2 px-3 py-5 rounded-xl border border-white/40 bg-white/50 text-[#04252b] hover:border-[#77be21] hover:bg-white/70 transition-all text-sm font-medium"
              >
                <Icon className="h-6 w-6 text-[#77be21]" />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Rolle */}
      {step === 4 && (
        <div className="space-y-4">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <p className="text-base font-semibold text-[#04252b] text-center">
            Was trifft am besten auf Sie zu?
          </p>
          <div className="flex flex-col gap-2">
            {[
              "Ich besitze ein Haus",
              "Ich besitze eine Eigentumswohnung",
              "Ich bin Verwalter",
              "Ich bin Investor",
            ].map((option) => (
              <button
                key={option}
                onClick={() => selectOption("ownership_role", option)}
                className="w-full px-4 py-3.5 rounded-xl border border-white/40 bg-white/50 text-[#04252b] hover:border-[#77be21] hover:bg-white/70 transition-all text-sm font-medium text-left"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Contact form */}
      {step === 5 && (
        <div className="space-y-4">
          <button onClick={goBack} className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <p className="text-base font-semibold text-[#04252b] text-center">
            Wie können wir Sie kontaktieren?
          </p>

          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Ihr Name *"
                value={formData.name}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, name: e.target.value }))
                  setFormErrors((p) => ({ ...p, name: "" }))
                }}
                className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/50 text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-Mail Adresse *"
                value={formData.email}
                onChange={(e) => {
                  setFormData((p) => ({ ...p, email: e.target.value }))
                  setFormErrors((p) => ({ ...p, email: "" }))
                }}
                className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/50 text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            {/* Phone with country code */}
            <div className="flex gap-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown((v) => !v)}
                  className="flex items-center gap-1 px-3 py-3 rounded-lg border border-white/40 bg-white/50 text-[#04252b] text-sm min-w-[90px] justify-between hover:bg-white/70 transition-all"
                >
                  <span>{selectedCountry.flag} {selectedCountry.code}</span>
                  <ChevronDown className="h-3 w-3 text-[#04252b]/40" />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-[160px] bg-white rounded-lg border border-[#04252b]/10 shadow-lg z-50 max-h-[200px] overflow-y-auto">
                    {COUNTRY_CODES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setFormData((p) => ({ ...p, countryCode: c.code }))
                          setShowCountryDropdown(false)
                        }}
                        className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-[#77be21]/10 transition-colors ${
                          c.code === formData.countryCode ? "bg-[#77be21]/5 font-medium" : ""
                        }`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.label}</span>
                        <span className="text-[#04252b]/50">{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                type="tel"
                placeholder="Handynummer"
                value={formData.phoneNumber}
                onChange={(e) => setFormData((p) => ({ ...p, phoneNumber: e.target.value }))}
                className="flex-1 px-4 py-3 rounded-lg border border-white/40 bg-white/50 text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#77be21] hover:bg-[#6ba01d] text-white py-3 rounded-lg font-medium text-sm transition-colors"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Senden"}
          </Button>

          <p className="text-xs text-center text-[#04252b]/40">
            Kostenlos & unverbindlich · Wir melden uns innerhalb von 24 Stunden
          </p>
        </div>
      )}

      {/* Step 6: Confirmation + optional booking */}
      {step === 6 && (
        <div className="space-y-5">
          <div className="text-center space-y-3 py-2">
            <CheckCircle2 className="h-10 w-10 mx-auto text-[#77be21]" />
            <div>
              <h3 className="text-lg font-semibold text-[#04252b]">Vielen Dank!</h3>
              <p className="text-sm text-[#04252b]/60 mt-1">
                Ihre Anfrage wurde erfolgreich übermittelt.
              </p>
            </div>
          </div>

          {!showBooking ? (
            <div className="space-y-3">
              <p className="text-sm text-center text-[#04252b]/50">
                Wir melden uns innerhalb von 24 Stunden bei Ihnen unter{" "}
                <span className="font-medium text-[#04252b]/70">{formData.email}</span>
              </p>
              <button
                onClick={() => setShowBooking(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#77be21] hover:bg-[#6ba01d] text-white font-medium text-sm transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Jetzt Gespräch vereinbaren
              </button>
              <p className="text-xs text-center text-[#04252b]/35">
                Sichern Sie sich direkt einen kostenlosen Beratungstermin
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-center text-[#04252b]/50 font-medium">
                Wählen Sie einen Termin:
              </p>
              <BookingWidget
                prefill={{
                  name: formData.name,
                  email: formData.email,
                  phone: getFullPhone(),
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
