// ============================================================
//  KOMPASSET — Startdata for tips og instruksjoner
//  Admins kan endre dette direkte eller via admin-panelet.
//  Bilder støttes som:
//    - URL/filsti (f.eks. "assets/tips/bilde.png")
//    - base64 data-URL (når admin laster opp via panelet)
//    - SVG-tekst (direkte innlimt <svg>…</svg>)
// ============================================================

const KOMPASS_KATEGORIER = [
  { id: "kom-i-gang",  navn: "Kom i gang",      ikon: "\u{1F4CD}", beskr: "Start her — 2-min omvisning gjennom nettsiden." },
  { id: "prompt-tips", navn: "Prompt-tips",     ikon: "\u{1F4A1}", beskr: "Rolle, kontekst, rammer — slik skriver du gode prompts." },
  { id: "pedagogikk",  navn: "Pedagogiske råd", ikon: "\u{1F393}", beskr: "KI som sparringspartner — ikke erstatter for læreren." },
  { id: "teknisk",     navn: "Tekniske tips",   ikon: "\u2699\uFE0F",  beskr: "Copilot-innstillinger, snarveier og feilsøking." },
  { id: "personvern",  navn: "Personvern",      ikon: "\u{1F512}", beskr: "Hva du kan og ikke kan lime inn i Copilot." },
  { id: "ordliste",    navn: "Begreper",        ikon: "\u{1F4DA}", beskr: "Prompt, hallusinasjon, token — ordliste for lærere." },
  { id: "video",       navn: "Videoguider",     ikon: "\u{1F3AC}", beskr: "Korte skjermopptak av veiviseren og kortene." },
  { id: "faq",         navn: "FAQ",             ikon: "\u2753",     beskr: "Svar på det kollegene ofte spør om." }
];

// Hvert tips har et innhold-array med blokker av type:
//   { type: "p",      tekst: "Avsnittstekst…" }
//   { type: "h2",     tekst: "Mellomtittel" }
//   { type: "liste",  punkter: ["Punkt 1", "Punkt 2"] }
//   { type: "tips",   tekst: "Fremhevet tips / advarsel" }
//   { type: "kode",   tekst: "Prompt-eksempel eller kode" }
//   { type: "bilde",  src: "…", alt: "…", bildetekst: "…" }
//   { type: "video",  embed: "https://www.youtube.com/embed/…" }
//   { type: "lenke",  href: "…", tekst: "Lenkesetning" }

const KOMPASS_TIPS = [
  {
    id: "start-01",
    kategori: "kom-i-gang",
    tittel: "Velkommen til KI i klasserommet",
    ingress: "En rask omvisning gjennom de tre hovedsidene — Kurskartet, Veiviseren og Min bank.",
    oppdatert: "2026-04-20",
    minutter: 2,
    innhold: [
      { type: "p", tekst: "Denne nettsiden er laget for lærere på videregående som vil bruke Microsoft Copilot mer effektivt i planlegging og undervisning. Du trenger ingen forkunnskaper." },
      { type: "h2", tekst: "De tre hovedsidene" },
      { type: "liste", punkter: [
        "Kurskartet — et øykart med seks kapitler. Jobb deg gjennom kortene i ditt eget tempo.",
        "Veiviseren — en trinnvis veileder som lager undervisningsopplegg basert på kompetansemål fra Udir.",
        "Min bank — her lagres promptene du vil bruke igjen senere."
      ]},
      { type: "tips", tekst: "Begynn alltid med ett kort på Kom i gang-øya. Da forstår du logikken før du dykker dypere." }
    ]
  },
  {
    id: "prompt-01",
    kategori: "prompt-tips",
    tittel: "Oppskriften for en god prompt",
    ingress: "Gode prompts følger tre enkle prinsipper: rolle, kontekst og rammer.",
    oppdatert: "2026-04-20",
    minutter: 3,
    innhold: [
      { type: "p", tekst: "En vanlig feil er å skrive for lite. KI kan ikke gjette hva du vil ha. Her er oppskriften vi bruker på kurset:" },
      { type: "h2", tekst: "1. Gi KI en rolle" },
      { type: "p", tekst: "Start alltid med å fortelle KI-en hvem den skal være. Dette setter tonen og kvaliteten på svaret." },
      { type: "kode", tekst: "Du er en erfaren lærer i norsk på videregående og kjenner Kunnskapsløftet godt." },
      { type: "h2", tekst: "2. Beskriv oppgaven konkret" },
      { type: "liste", punkter: [
        "Fag, trinn og tema",
        "Tidsramme (minutter eller økter)",
        "Hva elevene skal sitte igjen med"
      ]},
      { type: "h2", tekst: "3. Sett rammer for svaret" },
      { type: "p", tekst: "Be om et bestemt format — «punktliste», «tabell med tre kolonner», «maks 150 ord». Det sparer deg for redigering etterpå." },
      { type: "tips", tekst: "Jo mer kontekst du gir, desto bedre svar. Men ikke lim inn personopplysninger om elever — bruk heller «28 elever med stor spredning»." }
    ]
  },
  {
    id: "prompt-02",
    kategori: "prompt-tips",
    tittel: "Fem vanlige feil nye brukere gjør",
    ingress: "Fra for korte spørsmål til blind tillit — her er de vanligste fellene.",
    oppdatert: "2026-04-20",
    minutter: 4,
    innhold: [
      { type: "liste", punkter: [
        "For korte prompts uten kontekst",
        "Spørre etter «det beste» i stedet for å beskrive behovet",
        "Ikke gi en rolle",
        "Godta første svar uten å be om justering",
        "Lime inn elevnavn eller sensitive data"
      ]},
      { type: "tips", tekst: "Trikset for (4): be alltid om en variant til. «Gi meg en enklere versjon» eller «Lag det mer konkret» forbedrer ofte svaret mye." }
    ]
  },
  {
    id: "ped-01",
    kategori: "pedagogikk",
    tittel: "KI som sparringspartner, ikke autopilot",
    ingress: "Lærerens faglige og pedagogiske skjønn er alltid det viktigste filteret.",
    oppdatert: "2026-04-20",
    minutter: 3,
    innhold: [
      { type: "p", tekst: "KI kan lage ti forslag på to minutter. Jobben din er å velge hvilket av dem som passer akkurat din klasse — eller om ingen gjør det." },
      { type: "h2", tekst: "Huskeregler" },
      { type: "liste", punkter: [
        "Les alltid gjennom svaret før du bruker det",
        "Tilpass språk og eksempler til elevenes forutsetninger",
        "Vær åpen med elevene om at du har brukt KI — det er god modellering"
      ]}
    ]
  },
  {
    id: "tek-01",
    kategori: "teknisk",
    tittel: "Hurtigtaster i Copilot",
    ingress: "Spar sekunder mange ganger om dagen.",
    oppdatert: "2026-04-20",
    minutter: 2,
    innhold: [
      { type: "liste", punkter: [
        "Ctrl+V — lim inn prompt",
        "Ctrl+Enter — send prompten",
        "Shift+Enter — linjeskift uten å sende",
        "Pil opp — hent forrige prompt"
      ]}
    ]
  },
  {
    id: "pv-01",
    kategori: "personvern",
    tittel: "Hva du aldri bør lime inn",
    ingress: "Personopplysninger, elevtekster med navn og karakterer — dette hører ikke hjemme i Copilot.",
    oppdatert: "2026-04-20",
    minutter: 3,
    innhold: [
      { type: "tips", tekst: "Hovedregel: Hvis du ikke ville lagt det på en felles-skjerm i klasserommet, skal det ikke inn i Copilot." },
      { type: "h2", tekst: "Eksempler på det du ikke skal lime inn" },
      { type: "liste", punkter: [
        "Navn, fødselsdato, adresse eller kontaktinfo til elever",
        "Karakterer knyttet til navn",
        "Fullstendige elevtekster (anonymiser og fjern navn først)",
        "Sensitive helseopplysninger eller diagnoser"
      ]},
      { type: "h2", tekst: "Trygge alternativer" },
      { type: "liste", punkter: [
        "Anonymiser: «En elev i Vg2 som sliter med lesing…»",
        "Klipp ut navn og stedsnavn før du limer inn",
        "Be KI om en mal, og fyll ut detaljene selv etterpå"
      ]}
    ]
  },
  {
    id: "faq-01",
    kategori: "faq",
    tittel: "Hvor lenge lagres «Min bank»?",
    ingress: "Prompt-banken lever i nettleseren din — ikke på en server.",
    oppdatert: "2026-04-20",
    minutter: 1,
    innhold: [
      { type: "p", tekst: "Min bank bruker nettleserens localStorage. Det betyr at promptene dine ligger lagret på denne PC-en, i denne nettleseren. Bytter du nettleser eller tømmer cachen, forsvinner de." },
      { type: "tips", tekst: "Last alltid ned en .txt-kopi av viktige prompts og legg dem i OneDrive eller Teams — da er de trygge uansett." }
    ]
  },
  {
    id: "ord-01",
    kategori: "ordliste",
    tittel: "Prompt",
    ingress: "Det du skriver til en KI.",
    oppdatert: "2026-04-20",
    minutter: 1,
    innhold: [
      { type: "p", tekst: "En prompt er instruksjonen du gir KI-en — alt fra et kort spørsmål til et langt oppsett med rolle, kontekst og ramme. Kvaliteten på prompten bestemmer kvaliteten på svaret." }
    ]
  },
  {
    id: "ord-02",
    kategori: "ordliste",
    tittel: "Hallusinasjon",
    ingress: "Når KI finner på noe som høres riktig ut, men er feil.",
    oppdatert: "2026-04-20",
    minutter: 1,
    innhold: [
      { type: "p", tekst: "KI-modeller kan generere tekst som ser autoritativ og velformulert ut, men som inneholder faktiske feil — for eksempel oppfunne kildehenvisninger eller årstall. Sjekk alltid faktapåstander mot en pålitelig kilde." },
      { type: "tips", tekst: "Lim inn setningen: «Hva kan være feil eller ufullstendig i svaret du nettopp ga meg?» — da avslører ofte KI-en egne svakheter." }
    ]
  }
];
