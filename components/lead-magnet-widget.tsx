"use client"

import { useState } from "react"
import { CheckCircle2, Download, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// =============================================================================
// Lead-magnet widget: capture name + email BEFORE revealing the PDF download.
// The lead is written to the same CRM as the funnel/booking widgets via
// POST /api/intake/create (with UTM params + a source marker), so PDF requests
// land in the pipeline exactly like every other lead.
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

interface LeadMagnetWidgetProps {
  /** Audience slug, stored with the lead for segmentation. */
  audience: string
  /** Path to the PDF served after submit. */
  pdfFile: string
  pdfTitle: string
  pdfMeta: string
  pdfBullets: string[]
}

export function LeadMagnetWidget({
  audience,
  pdfFile,
  pdfTitle,
  pdfMeta,
  pdfBullets,
}: LeadMagnetWidgetProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) errors.name = "Bitte geben Sie Ihren Namen ein"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Bitte geben Sie eine gültige E-Mail ein"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${PEG_API}/api/intake/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          source: "pdf_download",
          audience,
          lead_magnet: pdfFile,
          ...getUtmParams(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      // Even if the CRM call hiccups, we still let the user download — but we
      // surface real errors when the request outright fails.
      if (!res.ok && res.status >= 500) {
        throw new Error(data.error || "Anfrage fehlgeschlagen")
      }
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center space-y-5 py-2">
        <CheckCircle2 className="h-11 w-11 mx-auto text-[#77be21]" />
        <div>
          <h3 className="text-lg font-semibold text-[#04252b]">Ihr Infomaterial ist bereit</h3>
          <p className="text-sm text-[#04252b]/60 mt-1">
            Wir haben eine Kopie an <span className="font-medium text-[#04252b]/80">{email}</span> vermerkt.
          </p>
        </div>
        <a
          href={pdfFile}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#77be21] hover:bg-[#6ba01d] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
        >
          <Download className="h-4 w-4" />
          {pdfTitle} herunterladen
        </a>
        <p className="text-xs text-[#04252b]/40">
          Öffnet sich nicht automatisch? Nutzen Sie den Button oben.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* PDF preview card */}
      <div className="flex gap-3 items-start rounded-xl border border-[#04252b]/10 bg-[#f3eee7]/60 p-4">
        <div className="shrink-0 h-11 w-11 rounded-lg bg-[#04252b] flex items-center justify-center">
          <FileText className="h-5 w-5 text-[#77be21]" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[#04252b] text-sm leading-snug">{pdfTitle}</p>
          <p className="text-xs text-[#04252b]/50 mt-0.5">{pdfMeta}</p>
        </div>
      </div>

      <ul className="space-y-1.5">
        {pdfBullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-[#04252b]/75">
            <CheckCircle2 className="h-4 w-4 text-[#77be21] shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {error && (
        <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3 pt-1">
        <div>
          <input
            type="text"
            placeholder="Ihr Name *"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setFormErrors((p) => ({ ...p, email: "" }))
            }}
            className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
          />
          {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#77be21] hover:bg-[#6ba01d] text-white py-3.5 rounded-xl font-semibold text-sm transition-colors"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <span className="inline-flex items-center gap-2">
            <Download className="h-4 w-4" />
            Infomaterial anfordern
          </span>
        )}
      </Button>

      <p className="text-xs text-center text-[#04252b]/40">
        Kostenlos · Sie erhalten den Download sofort und eine Kopie per E-Mail
      </p>
    </div>
  )
}
