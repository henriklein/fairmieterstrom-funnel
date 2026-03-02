"use client"

import { useState } from "react"
import { CheckCircle2, ChevronLeft, Home, Building2, HelpCircle, Loader2 } from "lucide-react"
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
  phone: string
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
    phone: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

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
          phone: formData.phone.trim() || undefined,
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

  return (
    <div className="space-y-4">
      {error && step !== 6 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
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
              <button
                key={option}
                onClick={() => selectOption("unit_count_range", option)}
                className="px-4 py-4 rounded-xl border border-[#04252b]/10 bg-white text-[#04252b] hover:border-[#77be21] hover:bg-[#77be21]/5 transition-all text-sm font-medium text-center shadow-sm"
              >
                {option} Einheiten
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Stromkosten */}
      {step === 2 && (
        <div className="space-y-4">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Zurück
          </button>
          <p className="text-base font-semibold text-[#04252b] text-center">
            Wie hoch sind Ihre monatlichen Stromkosten für Allgemeinflächen?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["<100€", "100-250€", "250-500€", "500€+"].map((option) => (
              <button
                key={option}
                onClick={() => selectOption("monthly_electricity_cost", option)}
                className="px-4 py-4 rounded-xl border border-[#04252b]/10 bg-white text-[#04252b] hover:border-[#77be21] hover:bg-[#77be21]/5 transition-all text-sm font-medium text-center shadow-sm"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Dachart */}
      {step === 3 && (
        <div className="space-y-4">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
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
                className="flex flex-col items-center gap-2 px-3 py-5 rounded-xl border border-[#04252b]/10 bg-white text-[#04252b] hover:border-[#77be21] hover:bg-[#77be21]/5 transition-all text-sm font-medium shadow-sm"
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
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
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
                className="w-full px-4 py-3.5 rounded-xl border border-[#04252b]/10 bg-white text-[#04252b] hover:border-[#77be21] hover:bg-[#77be21]/5 transition-all text-sm font-medium text-left shadow-sm"
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
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
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
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
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
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Telefon (optional)"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
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

      {/* Step 6: Confirmation */}
      {step === 6 && (
        <div className="text-center space-y-4 py-4">
          <CheckCircle2 className="h-12 w-12 mx-auto text-[#77be21]" />
          <div>
            <h3 className="text-lg font-semibold text-[#04252b]">Vielen Dank!</h3>
            <p className="text-sm text-[#04252b]/60 mt-1">
              Ihre Anfrage wurde erfolgreich übermittelt.
            </p>
          </div>
          <p className="text-sm text-[#04252b]/50">
            Wir melden uns innerhalb von 24 Stunden bei Ihnen unter{" "}
            <span className="font-medium text-[#04252b]/70">{formData.email}</span>
          </p>
        </div>
      )}
    </div>
  )
}
