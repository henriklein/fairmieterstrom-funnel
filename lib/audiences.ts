// =============================================================================
// Audience configuration for the /lp/[audience] landing pages.
//
// Three target groups (Handwerker, Hausverwaltung, Eigentümer/Investor), each
// rendered by the same config-driven page. The CTA block switches between the
// shared BookingWidget / IntakeWidget / LeadMagnetWidget via the ?v= query
// param (termin | funnel | pdf) so a single page powers clean A/B testing.
//
// All copy is sourced from the Pure Energy Germany partner deck, the
// Projektübersicht example and the live fairmieterstrom messaging.
// =============================================================================

export type CtaVariant = "termin" | "funnel" | "pdf"

export const CTA_VARIANTS: CtaVariant[] = ["termin", "funnel", "pdf"]

export interface Stat {
  value: string
  label: string
}

export interface Item {
  title: string
  body: string
}

export interface Project {
  tag: string
  title: string
  location: string
  stats: Stat[]
  body: string
  /** Optional highlighted result line, e.g. a return or an order value. */
  result?: string
  /** True for the one real, non-modelled reference. */
  real?: boolean
}

export interface Faq {
  q: string
  a: string
}

export interface Audience {
  slug: string
  /** Short internal name. */
  label: string
  eyebrow: string
  /** Headline is split so one part can be colour-accented. */
  headline: string
  headlineAccent: string
  subline: string
  heroStats: Stat[]
  /** "Die Realität" — the pain we remove. */
  painsTitle: string
  pains: Item[]
  turningPoint: string
  /** "So arbeiten wir für Sie" — the service = the value. */
  serviceTitle: string
  serviceIntro: string
  serviceSteps: Item[]
  /** Bento value props. */
  valueTitle: string
  valueProps: Item[]
  /** Before/after comparison ("Trust & Authority" proof element). */
  comparison: {
    title: string
    beforeLabel: string
    afterLabel: string
    rows: { label: string; before: string; after: string }[]
  }
  projectsTitle: string
  projectsIntro: string
  projects: Project[]
  faq: Faq[]
  pdf: {
    file: string
    title: string
    meta: string
    bullets: string[]
  }
  bookingSlug: string
  defaultVariant: CtaVariant
  cta: {
    eyebrow: string
    headline: string
    headlineAccent: string
    subline: string
  }
  meta: {
    title: string
    description: string
  }
}

// -----------------------------------------------------------------------------
// Shared testimonial (real, from the live site — Alexej Tschernow)
// -----------------------------------------------------------------------------

export const TESTIMONIAL = {
  quote:
    "Sehr professionelle Firma mit klarem Dienstleistungsgedanken. Die Zusammenarbeit läuft partnerschaftlich, verlässlich und auf Augenhöhe — genau so muss das sein.",
  name: "Hausverwaltung Elfenthal",
  role: "Kunde von Pure Energy Germany",
  youtubeId: "UdEDoUNaoaw",
}

export const CONTACT = {
  name: "Jan Graventein",
  role: "Vertriebsleitung · Pure Energy Germany",
  email: "j.graventein@pure-energy-germany.de",
  phone: "+49 151 70593094",
}

// -----------------------------------------------------------------------------
// Audiences
// -----------------------------------------------------------------------------

export const AUDIENCES: Record<string, Audience> = {
  // ===========================================================================
  // 1) HANDWERKER / PV- & ELEKTROBETRIEBE  →  B2B-Aufträge
  // ===========================================================================
  handwerker: {
    slug: "handwerker",
    label: "Handwerker",
    eyebrow: "Eine Partnerschaft für das Handwerk",
    headline: "Mehrfamilienhaus-Aufträge annehmen statt",
    headlineAccent: "ablehnen.",
    subline:
      "Ihr macht euer Handwerk — wir bringen den fertigen Auftrag, übernehmen Vertrieb, Anträge und die komplette Mieterstrom-Abwicklung. Ihr steht nie allein.",
    heroStats: [
      { value: "20 Jahre", label: "Generalunternehmer-Erfahrung" },
      { value: "ab 20.000 €", label: "Auftragswert im MFH" },
      { value: "0 €", label: "Akquise-Aufwand für euch" },
    ],
    painsTitle: "Warum ihr MFH-Anfragen heute abgebt",
    pains: [
      {
        title: "Mieterstrom ist hochkomplex",
        body: "Förderung, Anmeldungen, Verträge, Messkonzepte, Abstimmung mit Netzbetreibern — ein Papierberg, der nichts mit eurem Handwerk zu tun hat.",
      },
      {
        title: "Akquise frisst eure Marge",
        body: "Leads kaufen, kalt anrufen, selbst hinfahren — Akquise-Aufwand tragt ihr unbezahlt. Viele Anfragen, dünne Marge, Dauer-Preiskampf im Einfamilienhaus.",
      },
      {
        title: "Lange, zähe Wege",
        body: "Von der Anfrage bis zur Umsetzung 3 bis 6 Monate. Komplexe MFH-Anfragen werden deshalb heute schlicht abgelehnt — und damit echter Umsatz.",
      },
    ],
    turningPoint:
      "Heute könnt ihr das nicht. Mit uns könnt ihr das — ohne dass ihr zu Mieterstrom-Experten werden müsst.",
    serviceTitle: "Klare Aufgabenteilung — jeder macht, was er am besten kann",
    serviceIntro:
      "Wir bauen nichts und nehmen euch nichts weg. Wir sitzen als Bindeglied zwischen Endkunde und Handwerk und sorgen dafür, dass beide Seiten gewinnen.",
    serviceSteps: [
      {
        title: "Vertrieb & Akquise",
        body: "Wir übernehmen die Auftragsgewinnung. Ihr bekommt den fertigen Auftrag — kein Lead-Kauf, kein Kaltanruf.",
      },
      {
        title: "Anträge & Mietverträge",
        body: "Förderung, Anmeldungen und Verträge laufen über uns. Der Papierberg bleibt bei uns.",
      },
      {
        title: "Messkonzept & Modellwahl",
        body: "Wir wählen das passende Modell und Messkonzept je Gebäude — Mieterstrom, GGV oder gebäudeinterner Strommarkt.",
      },
      {
        title: "Ablesung, Abrechnung & Abwicklung",
        body: "Die laufenden Pflichten über die ganze Laufzeit übernehmen wir komplett im Hintergrund.",
      },
    ],
    valueTitle: "Euer Rückhalt am Bau — und dahinter",
    valueProps: [
      {
        title: "Wir federn ab",
        body: "Zwischen euch und dem Kunden: Reklamationen, Erwartungen und Druck fangen wir auf.",
      },
      {
        title: "Wir kämpfen für Nachträge",
        body: "Muss etwas zusätzlich beauftragt werden, stehen wir an eurer Seite.",
      },
      {
        title: "Planbar & wiederkehrend",
        body: "Ein Gebäude bringt viele Wohneinheiten — Umsatz, der sich multiplizieren lässt. Mehr Folgeaufträge statt Einzelkampf.",
      },
      {
        title: "Faire, stabile Preise",
        body: "Verlässliche Preise statt Preiskampf. Ist mit einem Partner ein Projekt vereinbart, entfällt jeder Wettbewerb.",
      },
    ],
    comparison: {
      title: "Einfamilienhaus-Preiskampf vs. Mehrfamilienhaus mit uns",
      beforeLabel: "Einfamilienhaus heute",
      afterLabel: "MFH mit Pure Energy Germany",
      rows: [
        { label: "Auftragswert", before: "10.000–20.000 €", after: "ab 20.000 € aufwärts" },
        { label: "Vertrieb", before: "Leads kaufen, kalt anrufen, selbst hinfahren", after: "Wir liefern den fertigen Auftrag" },
        { label: "Akquise-Aufwand", before: "unbezahlt bei euch", after: "0 € — tragen wir" },
        { label: "Aufträge", before: "viele Anfragen, dünne Marge", after: "planbar & wiederkehrend" },
      ],
    },
    projectsTitle: "Drei Projekte, wie sie bei euch laufen könnten",
    projectsIntro:
      "So sieht ein typisches Mehrfamilienhaus-Projekt in Zahlen aus — inklusive einer echten, durchgerechneten Referenz.",
    projects: [
      {
        tag: "Referenz · GGV",
        title: "6-Parteien-Haus mit Wallbox",
        location: "Gemeinschaftliche Gebäudeversorgung",
        real: true,
        stats: [
          { value: "24,84 kWp", label: "PV-Leistung" },
          { value: "30,72 kWh", label: "Speicher" },
          { value: "82,6 %", label: "Eigenverbrauch" },
        ],
        body: "6 Wohneinheiten, E-Mobilität integriert, 54 Module, PowerTower. 71,8 % Autarkie, 5,68 t CO₂-Ersparnis pro Jahr — alle Gewerke unter einem Dach abgewickelt.",
        result: "Auftragswert im oberen fünfstelligen Bereich · mehr Gewerke, hochwertigere Technik",
      },
      {
        tag: "Modell · Mieterstrom",
        title: "12-Parteien-Wohnanlage",
        location: "Reiner Gebäudeverbrauch",
        stats: [
          { value: "42 kWp", label: "PV-Leistung" },
          { value: "40 kWh", label: "Speicher" },
          { value: "3–6 Mon.", label: "bis Umsetzung" },
        ],
        body: "Größere Anlage, mehrere Zähler, Summenzähler-Messkonzept. Genau die Anfrage, die ihr heute abgeben müsstet — mit uns wird sie zum planbaren Auftrag.",
        result: "Folgeaufträge durch Nachrüstungen bei Bestandskunden",
      },
      {
        tag: "Modell · Portfolio",
        title: "Verwalter-Portfolio, 3 Objekte",
        location: "Gebäudeinterner Strommarkt",
        stats: [
          { value: "3 Objekte", label: "gebündelt" },
          { value: "28 WE", label: "gesamt" },
          { value: "wiederkehrend", label: "Umsatz" },
        ],
        body: "Ein Verwalter, mehrere Gebäude — gebündelt geplant und umgesetzt. Ein blinder Fleck der Energiewende öffnet sich, und ihr seid von Anfang an dabei.",
        result: "Planbare Pipeline statt Einzelanfragen",
      },
    ],
    faq: [
      {
        q: "Tretet ihr beim Kunden als Wettbewerber auf?",
        a: "Nein. Wir bauen nichts und treten nie selbst als Monteur auf. Wir arbeiten für euch und mit euch — als Bindeglied zwischen Endkunde und Handwerk.",
      },
      {
        q: "Was kostet mich die Partnerschaft?",
        a: "Ihr tragt keinen Akquise-Aufwand und keine Lead-Kosten. Wir gewinnen den Auftrag, ihr setzt euer Handwerk um. Details besprechen wir im Erstgespräch.",
      },
      {
        q: "Muss ich Mieterstrom-Experte werden?",
        a: "Nein. Genau die Komplexität — Modelle, Förderwege, Messkonzepte, Abrechnung — nehmen wir euch ab. Ihr konzentriert euch auf Montage und Qualität.",
      },
      {
        q: "Wie fangt ihr an?",
        a: "Wir lernen euch und eure Stärken kennen, schulen am echten Auftrag, kommen bei den ersten Projekten mit auf die Baustelle und übernehmen Vertrieb & Backoffice komplett im Hintergrund.",
      },
    ],
    pdf: {
      file: "/downloads/fairmieterstrom-partner-handwerk.pdf",
      title: "Partner-Infomaterial für das Handwerk",
      meta: "PDF · Partnerschaft, Aufgabenteilung & Auftragspotenzial",
      bullets: [
        "Wie die Aufgabenteilung konkret aussieht",
        "Auftragswerte & Margen im Mehrfamilienhaus",
        "Der Ablauf: von der Aufnahme bis zum Folgeauftrag",
      ],
    },
    bookingSlug: "erstkontakt",
    defaultVariant: "termin",
    cta: {
      eyebrow: "Jetzt mitgestalten",
      headline: "Lasst uns die Reise",
      headlineAccent: "gemeinsam gehen.",
      subline:
        "Ob ihr schon ein konkretes Projekt habt oder noch Fragen — wir finden gemeinsam heraus, für wen es passt.",
    },
    meta: {
      title: "Partner werden · MFH-Aufträge für PV- & Elektrobetriebe | fairMieterstrom",
      description:
        "Mehrfamilienhaus-Aufträge annehmen statt ablehnen: Wir übernehmen Vertrieb, Anträge und Mieterstrom-Abwicklung. Ihr macht euer Handwerk. 20 Jahre Erfahrung.",
    },
  },

  // ===========================================================================
  // 2) HAUSVERWALTUNG
  // ===========================================================================
  hausverwaltung: {
    slug: "hausverwaltung",
    label: "Hausverwaltung",
    eyebrow: "Für Hausverwaltungen & WEG-Verwalter",
    headline: "Solar im Bestand — ohne dass es",
    headlineAccent: "Ihren Schreibtisch erreicht.",
    subline:
      "Wir bringen Photovoltaik und Mieterstrom in Ihre Objekte und übernehmen Planung, Anträge, Mieterkommunikation und Abrechnung. Ihr Verwaltungsaufwand: nahezu null.",
    heroStats: [
      { value: "~4 Wochen", label: "statt 6–10 Monate Genehmigung" },
      { value: "15 Min/Jahr", label: "Abrechnungsaufwand je Objekt" },
      { value: "0 €", label: "laufende Kosten für Sie" },
    ],
    painsTitle: "Was Solar im Bestand heute so zäh macht",
    pains: [
      {
        title: "Bürokratie & Anträge",
        body: "Förderung, Anmeldungen, Verträge, Abstimmung mit Netzbetreibern — für eine Verwaltung mit vielen Objekten ein kaum leistbarer Papierberg.",
      },
      {
        title: "Komplexe Messkonzepte",
        body: "Zähler, Modelle und Konzepte sind je Gebäude verschieden. Ein Fehler zieht sich über die ganze Laufzeit.",
      },
      {
        title: "Laufende Pflichten",
        body: "Ablesung, Abrechnung und Mieterkommunikation binden dauerhaft Personal, das Sie nicht haben.",
      },
    ],
    turningPoint:
      "Sie müssen kein Energieversorger werden. Wir haben die Komplexität so weit reduziert, dass das Mehrfamilienhaus für Sie machbar wird.",
    serviceTitle: "So halten wir Ihnen den Rücken frei",
    serviceIntro:
      "Wir sitzen zwischen Eigentümer, Mieter und Handwerk und sorgen dafür, dass für alle Seiten etwas übrig bleibt — bei minimalem Aufwand für Ihre Verwaltung.",
    serviceSteps: [
      {
        title: "Aufnahme & Beratung",
        body: "Wir hören uns Ihr Portfolio an, verstehen jedes Objekt und empfehlen das passende Modell — Mieterstrom, GGV oder gebäudeinterner Strommarkt.",
      },
      {
        title: "Modelle & Preise verhandelt",
        body: "Wir suchen für Sie verschiedene Modelle, besprechen mit Partnern, was möglich ist, und verhandeln die Preise.",
      },
      {
        title: "Anträge & Umsetzung",
        body: "Genehmigungen, Messkonzept und Installation über erfahrene Partnerbetriebe — koordiniert von uns.",
      },
      {
        title: "Abrechnung & Betreuung",
        body: "Digitale Ablesung, Mieterabrechnung und laufende Betreuung übernehmen wir komplett.",
      },
    ],
    valueTitle: "Warum Verwaltungen mit uns arbeiten",
    valueProps: [
      {
        title: "Ein Ansprechpartner",
        body: "Für alle Objekte, alle Modelle und alle Phasen — statt für jedes Gewerk jemand anderes.",
      },
      {
        title: "Mehr Objektwert",
        body: "PV und faire Mieterstrompreise steigern Attraktivität und Wert der verwalteten Immobilien.",
      },
      {
        title: "Zufriedene Mieter",
        body: "Mieter sparen bis zu 30 % gegenüber der Grundversorgung — ohne Wechselstress.",
      },
      {
        title: "Skaliert über das Portfolio",
        body: "Ein Rahmen, viele Objekte. Was einmal steht, lässt sich auf das ganze Portfolio ausrollen.",
      },
    ],
    comparison: {
      title: "Klassischer Mieterstrom vs. fairMieterstrom",
      beforeLabel: "Klassisch",
      afterLabel: "fairMieterstrom",
      rows: [
        { label: "Genehmigung", before: "6–10 Monate", after: "~4 Wochen" },
        { label: "Laufende Kosten", before: "60–75 € je Partei/Jahr", after: "0 € für Sie" },
        { label: "Abrechnungsaufwand", before: "laufend, personalintensiv", after: "~15 Min pro Jahr & Objekt" },
        { label: "Einstufung", before: "Energieversorger-Risiko", after: "keine Einstufung nötig" },
      ],
    },
    projectsTitle: "Drei Objekte, drei Wege",
    projectsIntro:
      "Von der einzelnen WEG bis zum gebündelten Portfolio — mit einer echten, durchgerechneten Referenz.",
    projects: [
      {
        tag: "Referenz · GGV",
        title: "6-Parteien-Haus",
        location: "Gemeinschaftliche Gebäudeversorgung",
        real: true,
        stats: [
          { value: "24,84 kWp", label: "PV-Leistung" },
          { value: "71,8 %", label: "Autarkiegrad" },
          { value: "5,68 t", label: "CO₂ / Jahr" },
        ],
        body: "6 Wohneinheiten inkl. E-Mobilität, 82,6 % Eigenverbrauch. Vollständig abgewickelt — von der Beratung bis zur laufenden Abrechnung.",
        result: "Für die Verwaltung: 15 Minuten Aufwand pro Jahr",
      },
      {
        tag: "Modell · Mieterstrom",
        title: "WEG mit 12 Einheiten",
        location: "Eigentümergemeinschaft",
        stats: [
          { value: "42 kWp", label: "PV-Leistung" },
          { value: "~30 %", label: "Ersparnis Mieter" },
          { value: "1 Konzept", label: "für alle Parteien" },
        ],
        body: "Beschlussfähige Lösung für die Eigentümergemeinschaft: ein Modell, klare Abrechnung, keine laufende Belastung der Verwaltung.",
        result: "Wertsteigerung ohne Sonderumlage-Chaos",
      },
      {
        tag: "Modell · Portfolio",
        title: "Portfolio mit 3 Objekten",
        location: "Gebündelte Umsetzung",
        stats: [
          { value: "3 Objekte", label: "ein Rahmen" },
          { value: "28 WE", label: "gesamt" },
          { value: "1 Partner", label: "für alles" },
        ],
        body: "Mehrere Gebäude gebündelt geplant und umgesetzt — mit einheitlicher Abrechnung und einem Ansprechpartner über das ganze Portfolio.",
        result: "Planbar ausrollbar auf weitere Objekte",
      },
    ],
    faq: [
      {
        q: "Wie viel Arbeit bleibt bei uns?",
        a: "Nahezu keine. Wir übernehmen Beratung, Anträge, Messkonzept, Installation über Partner, Mieterkommunikation und Abrechnung. Die jährliche Abrechnung je Objekt dauert rund 15 Minuten.",
      },
      {
        q: "Werden wir dadurch zum Energieversorger?",
        a: "Nein. Die Modelle sind so aufgesetzt, dass für Eigentümer und Verwaltung keine Einstufung als Energieversorger nötig ist — das ist Teil unserer Aufgabe.",
      },
      {
        q: "Funktioniert das auch für eine WEG?",
        a: "Ja. Für Eigentümergemeinschaften gibt es passende Modelle. Wir bereiten die Entscheidung so auf, dass sie beschlussfähig und für alle Parteien fair ist.",
      },
      {
        q: "Was kostet es die Verwaltung?",
        a: "Für Sie fallen keine laufenden Kosten an — im Gegensatz zu klassischen Mieterstrommodellen mit 60–75 € pro Mietpartei und Jahr.",
      },
    ],
    pdf: {
      file: "/downloads/fairmieterstrom-hausverwaltung.pdf",
      title: "Infomaterial für Hausverwaltungen",
      meta: "PDF · Modelle, Aufwand & Abrechnung im Überblick",
      bullets: [
        "Die drei Modelle im Vergleich — was zu welchem Objekt passt",
        "Wie wir den Verwaltungsaufwand auf ~15 Min/Jahr senken",
        "Ablauf von der Aufnahme bis zur laufenden Betreuung",
      ],
    },
    bookingSlug: "erstkontakt",
    defaultVariant: "termin",
    cta: {
      eyebrow: "Ihr nächster Schritt",
      headline: "Bringen wir Solar in Ihre",
      headlineAccent: "Objekte.",
      subline:
        "Erzählen Sie uns von Ihrem Portfolio — wir prüfen kostenlos, welche Objekte sich eignen und mit welchem Modell.",
    },
    meta: {
      title: "Mieterstrom für Hausverwaltungen — ohne Aufwand | fairMieterstrom",
      description:
        "Photovoltaik & Mieterstrom im Bestand: Wir übernehmen Anträge, Mieterkommunikation und Abrechnung. Für Ihre Verwaltung nahezu null Aufwand. Kostenlose Prüfung.",
    },
  },

  // ===========================================================================
  // 3) EIGENTÜMER / INVESTOREN
  // ===========================================================================
  eigentuemer: {
    slug: "eigentuemer",
    label: "Eigentümer & Investoren",
    eyebrow: "Für Eigentümer & Investoren von Mehrfamilienhäusern",
    headline: "Bis zu 18 % Rendite aufs Dach — wir navigieren die",
    headlineAccent: "Komplexität für Sie.",
    subline:
      "Photovoltaik und Mieterstrom für Ihr Mehrfamilienhaus, schlüsselfertig. Wir hören uns Ihr Projekt an, finden das beste Modell, verhandeln die Preise — Sie kassieren die Rendite.",
    heroStats: [
      { value: "bis 18,5 %", label: "Rendite p. a. für Eigentümer" },
      { value: "bis 30 %", label: "Ersparnis für Ihre Mieter" },
      { value: "~4 Wochen", label: "bis zur Genehmigung" },
    ],
    painsTitle: "Warum das Dach heute meist ungenutzt bleibt",
    pains: [
      {
        title: "Ein Dschungel an Modellen",
        body: "Mieterstrom, gemeinschaftliche Gebäudeversorgung, gebäudeinterner Strommarkt — welches Modell rechnet sich für Ihr Gebäude? Kaum zu durchschauen.",
      },
      {
        title: "Bürokratie & lange Wege",
        body: "Von der Idee bis zur Anlage 3 bis 6 Monate: Förderung, Anmeldungen, Messkonzept, Netzbetreiber. Die meisten geben vorher auf.",
      },
      {
        title: "Angst vor laufendem Aufwand",
        body: "Ablesung, Abrechnung, Mieterkommunikation — viele fürchten, damit selbst zum Energieversorger zu werden.",
      },
    ],
    turningPoint:
      "Sie müssen kein Mieterstrom-Experte werden. Wir haben uns durch alle Modelle und Förderwege gearbeitet und die Komplexität für Sie aufgelöst.",
    serviceTitle: "Wir navigieren den Mieterstrom-Dschungel für Sie",
    serviceIntro:
      "Der eigentliche Mehrwert ist die Dienstleistung: Wir hören zu, verstehen Ihr Projekt, beraten unabhängig, suchen Modelle, verhandeln mit Partnern und finden die beste Lösung.",
    serviceSteps: [
      {
        title: "Zuhören & verstehen",
        body: "Wir hören uns Ihr Projekt an und verstehen, was Sie und Ihr Gebäude wirklich brauchen.",
      },
      {
        title: "Beraten & Modelle finden",
        body: "Wir suchen für Sie verschiedene Modelle und beraten, welches die beste Rendite bei geringstem Aufwand bringt.",
      },
      {
        title: "Verhandeln & absichern",
        body: "Wir besprechen mit Partnern, was möglich ist, und verhandeln für Sie die Preise — für stabile, faire Konditionen.",
      },
      {
        title: "Umsetzen & abrechnen",
        body: "Installation, Messkonzept, Ablesung und Mieterabrechnung übernehmen wir komplett. Ihr Aufwand danach: minimal.",
      },
    ],
    valueTitle: "Was für Sie herausspringt",
    valueProps: [
      {
        title: "Höhere Rendite",
        body: "Vereinfachte Prozesse und das passende Modell heben Ihre Rendite — bis zu 18,5 % p. a.",
      },
      {
        title: "Kein laufender Aufwand",
        body: "Schlüsselfertig inklusive Betrieb. Die jährliche Abrechnung erledigen wir für Sie.",
      },
      {
        title: "Mehr Immobilienwert",
        body: "PV und faire Strompreise steigern Attraktivität und Wert Ihres Objekts nachhaltig.",
      },
      {
        title: "Unabhängige Beratung",
        body: "Wir sind auf Ihrer Seite: Wir suchen das beste Angebot und verhandeln für Sie — nicht für einen Hersteller.",
      },
    ],
    comparison: {
      title: "Klassischer Mieterstrom vs. fairMieterstrom",
      beforeLabel: "Klassisch",
      afterLabel: "fairMieterstrom",
      rows: [
        { label: "Genehmigung", before: "6–10 Monate", after: "~4 Wochen" },
        { label: "Rendite-Wirkung", before: "geschmälert", after: "bis 18,5 % p. a." },
        { label: "Laufende Kosten", before: "60–75 € je Partei/Jahr", after: "0 € für Sie" },
        { label: "Ihre Rolle", before: "Sie werden Energieversorger", after: "nur das Dach — den Rest machen wir" },
      ],
    },
    projectsTitle: "Drei Projekte, transparent durchgerechnet",
    projectsIntro:
      "Damit Sie sehen, was möglich ist — mit einer echten Referenz und modellierten Vergleichsfällen.",
    projects: [
      {
        tag: "Referenz · mit Wallbox",
        title: "6-Parteien-Haus, E-Mobilität integriert",
        location: "Gemeinschaftliche Gebäudeversorgung",
        real: true,
        stats: [
          { value: "82,6 %", label: "Eigenverbrauch" },
          { value: "71,8 %", label: "Autarkiegrad" },
          { value: "3.381 €", label: "Ertrag p. a. (Finanzierer)" },
        ],
        body: "24,84 kWp PV, 30,72 kWh Speicher, 2 × Wallbox. 6 Haushalte, E-Auto mit 30.000 km/a, 5,68 t CO₂-Ersparnis pro Jahr. Voll durchgerechnet inkl. Dachpatenschaft.",
        result: "1.370 € Ertrag p. a. für den Eigentümer über die Dachpatenschaft",
      },
      {
        tag: "Referenz · ohne Wallbox",
        title: "6-Parteien-Haus, reiner Gebäudeverbrauch",
        location: "Gemeinschaftliche Gebäudeversorgung",
        real: true,
        stats: [
          { value: "86,3 %", label: "Eigenverbrauch" },
          { value: "66,8 %", label: "Autarkiegrad" },
          { value: "1.763 €", label: "Ertrag p. a. (Finanzierer)" },
        ],
        body: "16,10 kWp PV, 20,48 kWh Speicher, 35 Module. Schlanke Variante ohne E-Mobilität — dasselbe Gebäude, anderes Modell, klar vergleichbar.",
        result: "1.092 € Ertrag p. a. für den Eigentümer über die Dachpatenschaft",
      },
      {
        tag: "Modell · größere Anlage",
        title: "12-Parteien-Wohnanlage",
        location: "Mieterstrom",
        stats: [
          { value: "42 kWp", label: "PV-Leistung" },
          { value: "bis 30 %", label: "Ersparnis Mieter" },
          { value: "planbar", label: "Rendite" },
        ],
        body: "Größere Anlage mit mehreren Zählern und Summenzähler-Messkonzept — zeigt, wie sich das Modell mit der Objektgröße skaliert.",
        result: "Mehr Wohneinheiten = multiplizierbarer Ertrag",
      },
    ],
    faq: [
      {
        q: "Welches Modell ist das richtige für mein Gebäude?",
        a: "Das finden wir für Sie heraus. Es gibt Mieterstrom, gemeinschaftliche Gebäudeversorgung und den gebäudeinternen Strommarkt — wir prüfen, welches bei Ihrem Objekt die beste Rendite bei geringstem Aufwand bringt.",
      },
      {
        q: "Werde ich damit zum Energieversorger?",
        a: "Nein. Die Modelle sind so gestaltet, dass für Sie keine Einstufung als Energieversorger nötig ist. Genau diese Komplexität nehmen wir Ihnen ab.",
      },
      {
        q: "Wie hoch ist die Rendite realistisch?",
        a: "Eigentümer erzielen je nach Modell und Gebäude Renditen bis zu 18,5 %, während Mieter bis zu 30 % gegenüber der Grundversorgung sparen. Ihre konkreten Zahlen rechnen wir im Erstgespräch durch.",
      },
      {
        q: "Wie viel Aufwand habe ich laufend?",
        a: "Nahezu keinen. Installation, Messkonzept, Ablesung und Mieterabrechnung übernehmen wir. Ihr Part beschränkt sich auf die Entscheidung — den Rest navigieren wir.",
      },
    ],
    pdf: {
      file: "/downloads/fairmieterstrom-eigentuemer.pdf",
      title: "Infomaterial für Eigentümer & Investoren",
      meta: "PDF · Modelle, Rendite & durchgerechnete Beispiele",
      bullets: [
        "Die drei Modelle und welches sich für Ihr Objekt rechnet",
        "Zwei echte Projekte voll durchgerechnet (mit/ohne Wallbox)",
        "Rendite, Eigenverbrauch, Autarkie & CO₂ transparent",
      ],
    },
    bookingSlug: "erstkontakt",
    defaultVariant: "termin",
    cta: {
      eyebrow: "Ihr nächster Schritt",
      headline: "Rechnen wir Ihr Dach",
      headlineAccent: "durch.",
      subline:
        "Kostenlos und unverbindlich: Erzählen Sie uns von Ihrem Gebäude und wir zeigen Ihnen das passende Modell und Ihre Rendite.",
    },
    meta: {
      title: "Mieterstrom für Eigentümer — bis 18 % Rendite schlüsselfertig | fairMieterstrom",
      description:
        "PV & Mieterstrom fürs Mehrfamilienhaus, schlüsselfertig. Wir finden das beste Modell, verhandeln die Preise und rechnen ab. Bis zu 18,5 % Rendite. Kostenlose Beratung.",
    },
  },
}

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES[slug]
}

export const AUDIENCE_SLUGS = Object.keys(AUDIENCES)
