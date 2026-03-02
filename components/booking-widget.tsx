"use client"

import { useState, useEffect, useCallback } from "react"
import { format, addDays, isWeekend, startOfDay, isBefore } from "date-fns"
import { de } from "date-fns/locale"
import { DayPicker } from "react-day-picker"
import { Calendar, CheckCircle2, ChevronLeft, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// =============================================================================
// Types
// =============================================================================

interface MeetingType {
  id: string
  name: string
  slug: string
  description: string | null
  duration_minutes: number
  advance_window_days: number
  members: { id: string; vorname: string; nachname: string; image_url: string | null }[]
}

interface TimeSlot {
  start: string
  end: string
  available: boolean
  availableHosts: { portal_user_id: string; vorname: string; nachname: string }[]
}

interface SlotsResponse {
  slots: TimeSlot[]
  meetingType: { name: string; duration_minutes: number; description: string | null }
}

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
// Component
// =============================================================================

type Step = "date" | "time" | "form" | "confirm"

export function BookingWidget({ slug = "erstkontakt" }: { slug?: string }) {
  const [step, setStep] = useState<Step>("date")
  const [meetingType, setMeetingType] = useState<MeetingType | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [loading, setLoading] = useState(false)
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmData, setConfirmData] = useState<{ host_name: string } | null>(null)

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Fetch meeting type on mount
  useEffect(() => {
    fetch(`${PEG_API}/api/booking/meeting-type/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setMeetingType(data)
      })
      .catch((err) => setError("Termintyp konnte nicht geladen werden"))
  }, [slug])

  // Fetch slots when date changes
  const fetchSlots = useCallback(
    async (date: Date) => {
      if (!meetingType) return
      setSlotsLoading(true)
      setSlots([])
      try {
        const dateStr = format(date, "yyyy-MM-dd")
        const res = await fetch(
          `${PEG_API}/api/booking/slots?date=${dateStr}&type=${meetingType.id}`
        )
        const data: SlotsResponse = await res.json()
        if ("error" in data) throw new Error((data as { error: string }).error)
        setSlots(data.slots.filter((s) => s.available))
      } catch {
        setSlots([])
      } finally {
        setSlotsLoading(false)
      }
    },
    [meetingType]
  )

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return
    setSelectedDate(date)
    setSelectedSlot(null)
    setStep("time")
    fetchSlots(date)
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setStep("form")
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) errors.name = "Bitte geben Sie Ihren Namen ein"
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Bitte geben Sie eine gültige E-Mail ein"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !selectedSlot || !meetingType) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${PEG_API}/api/booking/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guest_name: name.trim(),
          guest_email: email.trim(),
          guest_phone: phone.trim() || undefined,
          meeting_type_slug: slug,
          slot_start: selectedSlot.start,
          slot_end: selectedSlot.end,
          ...getUtmParams(),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Buchung fehlgeschlagen")

      setConfirmData({ host_name: data.host_name })
      setStep("confirm")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
    } finally {
      setLoading(false)
    }
  }

  // Calendar constraints
  const today = startOfDay(new Date())
  const maxDate = addDays(today, meetingType?.advance_window_days ?? 30)
  const disabledDays = [
    { before: addDays(today, 1) },
    { after: maxDate },
    (date: Date) => isWeekend(date),
  ]

  if (error && !meetingType) {
    return (
      <div className="flex items-center justify-center h-64 text-[#04252b]/60">
        <p>{error}</p>
      </div>
    )
  }

  if (!meetingType) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-[#77be21]" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pb-2">
        <p className="text-sm text-[#04252b]/60">
          {meetingType.duration_minutes} Min · Kostenlos & unverbindlich
        </p>
      </div>

      {error && step !== "confirm" && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Step: Date selection */}
      {step === "date" && (
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={disabledDays}
            locale={de}
            showOutsideDays={false}
            className="!font-sans"
            classNames={{
              months: "flex flex-col",
              month: "space-y-3",
              caption: "flex justify-center pt-1 relative items-center text-[#04252b] font-semibold",
              caption_label: "text-base font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 text-[#04252b]/60 hover:text-[#04252b] inline-flex items-center justify-center rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell: "text-[#04252b]/50 rounded-md w-10 font-normal text-[0.8rem] text-center",
              row: "flex w-full mt-1",
              cell: "text-center text-sm p-0 relative first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-10 w-10",
              day: "h-10 w-10 p-0 font-normal rounded-full hover:bg-[#77be21]/10 transition-colors inline-flex items-center justify-center",
              day_selected: "bg-[#77be21] text-white hover:bg-[#6ba01d] focus:bg-[#6ba01d]",
              day_today: "font-bold text-[#77be21]",
              day_outside: "text-[#04252b]/20",
              day_disabled: "text-[#04252b]/20 cursor-not-allowed hover:bg-transparent",
            }}
          />
        </div>
      )}

      {/* Step: Time slot selection */}
      {step === "time" && selectedDate && (
        <div className="space-y-3">
          <button
            onClick={() => setStep("date")}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {format(selectedDate, "EEEE, d. MMMM", { locale: de })}
          </button>

          {slotsLoading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-5 w-5 animate-spin text-[#77be21]" />
            </div>
          ) : slots.length === 0 ? (
            <div className="text-center py-10 text-[#04252b]/50">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p>Keine freien Termine an diesem Tag</p>
              <button
                onClick={() => setStep("date")}
                className="mt-3 text-sm text-[#77be21] hover:underline"
              >
                Anderen Tag wählen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
              {slots.map((slot) => {
                const time = format(new Date(slot.start), "HH:mm", { locale: de })
                return (
                  <button
                    key={slot.start}
                    onClick={() => handleSlotSelect(slot)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#04252b]/10 text-[#04252b] hover:border-[#77be21] hover:bg-[#77be21]/5 transition-all text-sm font-medium"
                  >
                    <Clock className="h-3.5 w-3.5 text-[#04252b]/40" />
                    {time} Uhr
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Step: Guest info form */}
      {step === "form" && selectedSlot && selectedDate && (
        <div className="space-y-4">
          <button
            onClick={() => setStep("time")}
            className="flex items-center gap-1 text-sm text-[#04252b]/60 hover:text-[#04252b] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            {format(selectedDate, "d. MMMM", { locale: de })} um{" "}
            {format(new Date(selectedSlot.start), "HH:mm")} Uhr
          </button>

          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Ihr Name *"
                value={name}
                onChange={(e) => { setName(e.target.value); setFormErrors((p) => ({ ...p, name: "" })) }}
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="E-Mail Adresse *"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFormErrors((p) => ({ ...p, email: "" })) }}
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Telefon (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-[#04252b]/15 bg-white text-[#04252b] placeholder:text-[#04252b]/40 focus:outline-none focus:ring-2 focus:ring-[#77be21]/40 focus:border-[#77be21] transition-all text-sm"
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#77be21] hover:bg-[#6ba01d] text-white py-3 rounded-lg font-medium text-sm transition-colors"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Termin bestätigen"
            )}
          </Button>

          <p className="text-xs text-center text-[#04252b]/40">
            Kostenlos & unverbindlich · Sie erhalten eine Bestätigung per E-Mail
          </p>
        </div>
      )}

      {/* Step: Confirmation */}
      {step === "confirm" && selectedSlot && selectedDate && (
        <div className="text-center space-y-4 py-4">
          <CheckCircle2 className="h-12 w-12 mx-auto text-[#77be21]" />
          <div>
            <h3 className="text-lg font-semibold text-[#04252b]">Termin gebucht!</h3>
            <p className="text-sm text-[#04252b]/60 mt-1">
              {format(selectedDate, "EEEE, d. MMMM yyyy", { locale: de })} um{" "}
              {format(new Date(selectedSlot.start), "HH:mm")} Uhr
            </p>
            {confirmData?.host_name && (
              <p className="text-sm text-[#04252b]/60">
                mit {confirmData.host_name}
              </p>
            )}
          </div>
          <p className="text-sm text-[#04252b]/50">
            Sie erhalten in Kürze eine Bestätigung per E-Mail an{" "}
            <span className="font-medium text-[#04252b]/70">{email}</span>
          </p>
        </div>
      )}
    </div>
  )
}
