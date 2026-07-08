# Jan Graventeins Vercel-Kommentare — Vollständige Erfassung & Umsetzungsplan

Quelle: Vercel Preview Comments, Branch `feature/audience-landingpages`, User `jgraventein-6325`.
**Status: Erfassung abgeschlossen.**

- `/lp/eigentuemer` → 13 Kommentare
- `/lp/hausverwaltung` → 16 Kommentare
- `/lp/handwerker` → **0 Kommentare** (verifiziert: keine Pins, keine Highlights)

**Zugriffsweg (dokumentiert für später):** Es gibt **keine Vercel-Comments-API**. Verifiziert: OpenAPI hat 244 Pfade,
keiner mit `comment`/`feedback`; alle geratenen Endpoints → 404; `vercel.live` ist session-/cookie-gebunden (CLI-Bearer-Token
greift nicht); die Toolbar rendert in einem **closed shadow DOM** → kein JS-Zugriff. Einziger Weg: Preview öffnen →
Toolbar → Inbox. Das Panel paart Anker + Kommentar, scrollt aber **nur per Scrollbar-Drag**. Pin-Klick auf der Seite
zeigt den **Volltext** (Panel kürzt lange Kommentare mit „…"), aber **ohne** Ankertext.

Legende: **Anker** = markierte Textstelle · **Jan** = wörtlich · **→** = Umsetzung

---

# 1. Verbindliche Fakten aus Jans Kommentaren

Diese Werte ersetzen die aktuellen — sie betreffen **beide Seiten UND alle drei PDFs**.

| Thema | Aktuell (falsch) | Jans Vorgabe |
|---|---|---|
| Genehmigungsdauer (mit PEG) | „~4 Wochen bis zur Genehmigung" | **„Genehmigungen und Zählerwechsel ca. 8–10 Wochen nach Auftrag"**, Zielgröße = **technische Inbetriebnahme** |
| Dauer klassisch | „3 bis 6 Monate" / „6–10 Monate" | **6–12 Monate** |
| Laufende Kosten klassisch | „60–75 € je Partei/Jahr" | **120–180 € pro Jahr und Mieter** |
| Rendite klassisch | „geschmälert" | **max. 12 % abzgl. laufender Kosten** |
| Energieversorger-Status | „Nein." (absolut) | **„Das hängt von Ihnen ab"** — modellabhängig |
| Projektkarten | „Modellrechnung" | **Echte Projekte** (1× GGV umgesetzt, 1× Elfenthal umgesetzt, 1× Umsetzung steht bevor) |
| Positionierung | „20 Jahre Generalunternehmer" | **familiengeführter** Generalunternehmer, „Bauen mit Leidenschaft" — kein „Baulöwe" |

**Neue Leistungen, die noch nirgends stehen:**
- Standardmäßig **30-minütige FAQ-Runde mit den Eigentümern** im Angebot enthalten.
- **Unterstützung bei Verträgen.**

---

# 2. Alle Kommentare

## 2.1 /lp/eigentuemer

| # | Sektion | Anker | Jans Kommentar | Umsetzung |
|---|---|---|---|---|
| E1 | Hero-Kennzahl | `bis 18,5 %` | „Format" | Layout-Bug: Wert bricht auf 2 Zeilen („bis 18,5" / „%"). Umbruch verhindern. |
| E2 | Hero-Kennzahl | `~4 Wochen` | „siehe dauer bei Hausverwaltung und Co." | Dauer an H5 angleichen. |
| E3 | Proof-Band | `gebäudeintern` | „Gebäudeinterner Stormmarkt" [sic] | Ausschreiben: **„Gebäudeinterner Strommarkt"**. |
| E4 | Proof-Band | `~4 Wochen` | „Dauer" | Siehe H5. |
| E5 | Pain-Karte 02 | `3 bis 6 Monate:` | „6 - 12 Monate" | Dauer korrigieren. |
| E6 | Vergleich · Genehmigung/klassisch | `6–10 Monate` | „Dauer" | → 6–12 Monate. |
| E7 | Vergleich · Rendite/klassisch | `geschmälert` | „max. 12 % abzgl. laufender Kosten" | Konkrete Zahl statt Floskel. |
| E8 | Vergleich · Laufende Kosten/klassisch | `60–75 € je Partei/Jahr` | „120 - 180" | → 120–180 €/Jahr/Mieter. |
| E9 | Vergleich · Ihre Rolle/fair | `nur das Dach — den Rest machen wir` | *(Text nicht gelesen)* | **OFFEN** — vermutlich „ebenfalls anpassen". |
| E10 | FAQ „Welches Modell…" | `…gstem Aufwand bringt.` | „und am besten zu Ihren wünschen passt!" | Kundenwunsch als drittes Kriterium ergänzen. |
| E11 | FAQ „Wie hoch ist die Rendite…" | `konkreten` | „potenzial" | „Ihre konkreten Zahlen" → „Ihr **Potenzial**". |
| E12 | FAQ „Werde ich zum Energieversorger?" | „Nein. Die Modelle sind so gestaltet, dass für Sie keine Einstufung als Energieversorger nötig ist. Genau diese Komplexität nehmen wir Ihnen ab." | **„Das hängt von Ihnen ab. Es gibt standar[d] Modelle aber eben auch die Möglichkeit nicht als Energieversorger aufzutreten. Sie sagen uns was Ihnen wichtig ist und wir finden das perfekte Modell, passend zu Ihren Wünschen"** | Antwort komplett ersetzen. **Fachlich falsch.** |
| E13 | Projekte | `Modellrechnung` | „Auch hier: Projekt kurz vor Umsetzung oder sowas" | Badge ersetzen (→ H13/H14). |

## 2.2 /lp/hausverwaltung

| # | Sektion | Anker | Jans Kommentar | Umsetzung |
|---|---|---|---|---|
| H1/H12 | Vergleich · Laufende Kosten/klassisch | `60–75 €` | „120-180" / **„120 - 180€/ Jahr / Mieter"** | Exakte Einheit übernehmen. |
| H2 | FAQ „Funktioniert das auch für eine WEG?" | „Wir bereiten die Entscheidung so auf, dass sie beschlussfähig und für alle Parteien fair ist." | **„Wir unterstützen bei Verträgen. In unserem Angebot ist standardgemäß eine 30-minütige FAQ Runde mit den Eigentrümern eingeplant!"** | Konkretes Leistungsversprechen. Auch in Service-Liste. |
| H3 | FAQ „Werden wir zum Energieversorger?" | `…das ist Teil unserer Aufgabe.` | „weg lassen" | Satzteil streichen (passt zu E12). |
| H4 | Hero-Kennzahl | `~4 Wochen` | „siehe unten, technische Inbetriebnahme; etc…" | Verweis auf H5. |
| **H5** | Proof-Band | `BIS ZUR GENEHMIGUNG` | **„bis zur technischen Inbetriebnahme; Genehmigungen und Zählerwechsel circa 8 - 10 Wochen nach Auftrag"** | **Der verbindliche Wert.** |
| H6 | Proof-Band | `GENERALUNTERNEHMER` | „familiengeführter Generalunternehmer - Bauen mit Leidenschaft oder sowas. Sollte nicht so aussehen wie ein Baulöwe u know?" | Tonalität + Positionierung. |
| H7 | CTA-Karte | `Kostenloses Erstgespräch buchen` | „unten auch Tel. Nummer" | Telefonnummer unter das Buchungs-Widget. |
| H8 | CTA-Karte | `Termintyp konnte nicht geladen werden` | „Ladefehler" | **Bug**: Booking-Widget lädt nicht. |
| H9 | Pain-Überschrift | `Was Solar im Bestand heute so zäh macht` | „Warum Mieterstrom für viele unrealisierbar wirkt" | Wörtlich ersetzen. |
| H10 | Pain-Karte 03 (2 Kommentare) | `Laufende Pflichten` | „Laufende Verpflichtungen, Hohe kosten!" · „alternativ zu hohe kosten: Kosten Falle Laufende Gebühren" | Überschrift schärfen. |
| H11 | Vergleich · Genehmigung/fair | `~4 Wochen` | „ebenfalls anpassen" | Siehe H5. |
| H13 | Projekt „Portfolio mit 3 Objekten" | `MODELLRECHNUNG` | „Umsetzung steht bevor (könnte man als Art Live PROJEKT VERFOLGUNG ODER SO DARSTELLENE, SODASS ES KEINE RANDOM MODELL IST SONDERN MIT ECHTEN DATEN GEFÜTTERT" | Echtes Projekt; Live-Projektverfolgung als Idee. |
| H14 | Projekt „WEG mit 12 Einheiten" | `MODELLRECHNUNG` | „Haben wir auch mit Elfenthal schon umgesetzt" | **Echtes, umgesetztes Projekt (Elfenthal).** |
| H15 | FAQ „Was kostet es die Verwaltung?" | `60–75 € pro Mietpartei und Jahr` | „120-180" | Dritte Bestätigung. |
| H16 | FAQ „Wie viel Arbeit bleibt bei uns?" | (Antwort) | „Ihre Abrechnung mit den Mietern wird kinderleicht!" | Nutzen-Satz aufnehmen. |

## 2.3 /lp/handwerker
**Keine Kommentare.** Jan hat diese Seite nicht kommentiert.

---

# 3. Querabgleich — was gilt auch auf den anderen Seiten?

Jans Kommentare sind fast durchgehend **nicht seitenspezifisch**. Was er auf einer Seite anmerkt, gilt fast immer überall:

| Änderung | eigentuemer | hausverwaltung | handwerker | PDFs |
|---|:--:|:--:|:--:|:--:|
| Dauer → 8–10 Wochen bis techn. Inbetriebnahme | ✅ | ✅ | ✅ (Proof-Band + „3–6 Monate" in Pain 03) | ✅ alle 3 |
| Dauer klassisch → 6–12 Monate | ✅ | ✅ | ✅ | ✅ |
| Laufende Kosten → 120–180 €/Jahr/Mieter | ✅ | ✅ | – (kommt nicht vor) | ✅ HV + Eigentümer |
| Rendite klassisch → max. 12 % abzgl. lfd. Kosten | ✅ | ✅ (Vergleich) | – | ✅ |
| „Gebäudeinterner Strommarkt" ausschreiben | ✅ | ✅ (gleiches Proof-Band) | ✅ | ✅ |
| Kein absolutes „Nein" beim EVU-Status | ✅ | ✅ | – | ✅ HV + Eigentümer |
| „familiengeführt / Bauen mit Leidenschaft" | ✅ | ✅ | ✅ | ✅ |
| „Modellrechnung"-Badge → echte Projekte | ✅ | ✅ | ✅ | ✅ |
| Tel.-Nummer unter dem CTA | ✅ | ✅ | ✅ | – |
| Hero-Kennzahl-Umbruch („Format") | ✅ | ✅ (`~4 Wochen`) | ✅ (`ab 20.000 €`) | – |
| 30-Min-FAQ-Runde + Vertragsunterstützung | ✅ | ✅ | – (andere Zielgruppe) | ✅ |
| Booking-Widget-Ladefehler | ✅ | ✅ | ✅ | – |

**Fazit:** Aus 29 Kommentaren werden ~12 systematische Änderungen, die zentral in `lib/audiences.ts`
(+ dem PDF-Generator) gepflegt werden — die Config-getriebene Architektur zahlt sich hier aus.

---

# 4. Umsetzungsplan

## Phase 0 — Blocker zuerst
1. **Booking-Widget-Ladefehler (H8)** — höchste Priorität. Ohne Fix konvertiert die `?v=termin`-Variante nicht,
   und genau darauf sollen Google Ads zeigen. Ursache prüfen: Origin-/CORS-Whitelist von `fairmieterstrom.app`
   für die Preview-Domain **und** für `fairmieterstrom.energy`.

## Phase 1 — Fakten (zentral in `lib/audiences.ts` + `scratchpad/gen-pdfs.mjs`)
2. Alle Genehmigungs-/Dauerwerte ersetzen (E2, E4, E5, E6, H4, H5, H11).
3. Laufende Kosten 60–75 € → **120–180 €/Jahr/Mieter** (E8, H1, H12, H15).
4. Rendite klassisch „geschmälert" → **„max. 12 % abzgl. laufender Kosten"** (E7).
5. FAQ-Antwort „Energieversorger" komplett ersetzen (E12) + Satzteil streichen (H3).
6. „gebäudeintern" → „Gebäudeinterner Strommarkt" (E3).
7. Rendite-Fußnote/„Rechenannahmen (Modell)" überarbeiten — die Projekte sind **real** (H13, H14).

## Phase 2 — Substanz & Tonalität
8. Projektkarten: Badges „Modellrechnung" raus. Status je Karte: *umgesetzt* / *umgesetzt (Elfenthal)* /
   *Umsetzung steht bevor*. Jans Idee „Live-Projektverfolgung mit echten Daten" als eigenständiges Konzept prüfen.
9. Proof-Band: „familiengeführter Generalunternehmer · Bauen mit Leidenschaft" (H6).
10. Pain-Überschrift HV → „Warum Mieterstrom für viele unrealisierbar wirkt" (H9); Karte 03 → „Laufende
    Verpflichtungen, hohe Kosten!" (H10).
11. Neue Leistungen einbauen: 30-Min-FAQ-Runde mit Eigentümern, Unterstützung bei Verträgen (H2).
12. FAQ-Ergänzungen: „und am besten zu Ihren Wünschen passt" (E10), „Ihr Potenzial" (E11),
    „Ihre Abrechnung mit den Mietern wird kinderleicht!" (H16).

## Phase 3 — UI/Layout
13. Hero-Kennzahl-Umbruch fixen (E1) — betrifft alle drei Seiten (`bis 18,5 %`, `~4 Wochen`, `ab 20.000 €`).
14. Telefonnummer unter dem CTA-Widget (H7).
15. Danach: `frontend-design` + `ui-ux-pro-max` für den Feinschliff.

## Phase 4 — Danach
16. Webhook-Logik für Funnel-Daten (kommt von Henri).
17. Google Ads (Connector fehlt noch).

---

# 5. Offene Fragen — von Henri entschieden

1. **E9** („nur das Dach — den Rest machen wir"): **bleibt unverändert** (Henri: „idk").
2. **Dauer klassisch: 6–16 Monate** (Henri). ⚠️ Henri tippte „16-16 montate" — interpretiert als 6–16;
   **bitte final gegenlesen**.
3. **Rendite mit PEG: „bis zu 18,5 %" bleibt** (stammt aus PEGs Partnerdeck).
4. **Live-Projektverfolgung (H13): jetzt nur Badge/Status ändern.** Die „Live-Projektverfolgung mit echten Daten"
   ist als **eigenes Feature für später vorgemerkt** (Henri: „schreib das mit rein") — siehe Abschnitt 6.
5. **Elfenthal (H14): freigegeben** — Kunde darf namentlich bei der Projektkarte genannt werden (Henri).

---

# 6. Vorgemerktes Feature — „Live-Projektverfolgung" (Jans Idee H13)

Statt statischer „Modellrechnung"-Karten: eine **Live-Ansicht echter Projekte mit echten Daten** — z. B. reale,
laufend aktualisierte Kennzahlen (PV-Leistung, Autarkie, Eigenverbrauch, CO₂, Status im Umsetzungs-Funnel:
Aufnahme → Genehmigung → Zählerwechsel → Inbetriebnahme). So wirken die Projektkarten nicht generisch, sondern
belegbar echt.
**Scope jetzt:** nur `statusLabel` (Umgesetzt / Umsetzung steht bevor) + „Modellrechnung" entfernen.
**Später (eigenes Feature):** Datenquelle definieren (CRM/Dashboard-Feed oder gepflegte Projekt-JSON), Verlaufs-/
Status-Komponente, ggf. Anbindung ans fairmieterstrom.app-Backend. Offene Punkte: Datenquelle, wie „live",
Datenschutz/Anonymisierung je Projekt.
