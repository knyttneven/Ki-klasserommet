// ============================================================
//  KI I KLASSEROMMET — DATAFIL  (data.js)
//  Sist oppdatert: April 2025
//
//  Denne filen inneholder ALT innhold på nettsiden:
//  øyer, prompt-kort, fagkoder og kompetansemål.
//
//  SOM ADMIN KAN DU TRYGT ENDRE:
//  ✓ Titler og beskrivelser på kort
//  ✓ Prompt-tekster
//  ✓ Fagkoder (f.eks. NOR01-06 → NOR01-07)
//  ✓ Kompetansemål (kopier tekst direkte fra udir.no)
//  ✓ Udir-lenker
//  ✓ Legge til nye kort (se mal nederst i filen)
//
//  VIKTIG: Ikke endre variabelnavnene (const FAG, const ISLANDS osv.)
//  Lagre alltid filen med UTF-8 encoding.
//  Last opp kun data.js til serveren etter endringer.
// ============================================================


// ─────────────────────────────────────────────────────────────
//  FAG, FAGKODER OG KOMPETANSEMÅL
//  Oppdater disse når Udir endrer læreplanen.
//
//  URL-FORMAT (oppdatert april 2025):
//  Udir bruker nå: https://www.udir.no/lk20/[fagkode]
//  Eksempel norsk: https://www.udir.no/lk20/nor01-06
//  Hvis en fagkode-URL gir 404, bruk hovedsiden:
//  https://www.udir.no/laring-og-trivsel/lareplanverket/
// ─────────────────────────────────────────────────────────────

// Hovedside for læreplanverket — brukes som fallback i veiviseren
// hvis en fagkode-URL ikke lenger fungerer.
const UDIR_HOVED = "https://www.udir.no/laring-og-trivsel/lareplanverket/";

// ─────────────────────────────────────────────────────────────
//  FAG_GRUPPER — kategorier som vises som <optgroup> i veiviseren
//  Legg til nye grupper her om nødvendig.
// ─────────────────────────────────────────────────────────────
const FAG_GRUPPER = [
  "Fellesfag – studieforberedende",
  "Fellesfag – yrkesfag",
  "Realfag (programfag)",
  "Språk, samfunn og økonomi (programfag)",
  "Yrkesfaglige programfag",
  "Andre fag"
];

// ─────────────────────────────────────────────────────────────
//  FAG — alle relevante fag for videregående skole (LK20)
//
//  Felter:
//  navn:           Fagnavn slik det vises i nedtrekksmenyen
//  kode:           Fagplanens ID fra udir.no
//  gruppe:         Kategori (må matche en verdi i FAG_GRUPPER)
//  udir:           Direkte lenke til læreplanen
//  kompetansemaal: 2–4 representative kompetansemål (hentes fra udir.no)
//
//  For å oppdatere en fagkode:
//  Finn linjen med riktig fag, endre kode og udir-lenke, lagre og last opp.
// ─────────────────────────────────────────────────────────────
const FAG = {

  // ── FELLESFAG STUDIEFORBEREDENDE ──────────────────────────

  NOR: {
    navn: "Norsk",
    kode: "NOR01-06",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/nor01-06",
    kompetansemaal: [
      "lese og analysere et bredt utvalg tekster i ulike sjangere og fra ulike kilder, og bruke faglig kunnskap og forståelse til å vurdere innhold og form",
      "skrive tekster med klart formål, god struktur og presis språkbruk tilpasset mottaker og situasjon",
      "lytte til og forstå varianter av norsk talemål og bruke lyttestrategier i samtale og diskusjon",
      "utforske og reflektere over hvordan språk og kommunikasjon påvirker og blir påvirket av samfunn og kultur"
    ]
  },

  ENG: {
    navn: "Engelsk",
    kode: "ENG01-04",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/eng01-04",
    kompetansemaal: [
      "lese og analysere ulike typer engelskspråklige tekster fra flere deler av verden, og reflektere over innhold, form og formål",
      "skrive ulike typer tekster med strukturert og variert språkbruk, tilpasset formål og mottaker",
      "lytte til og forstå ulike varieteter av engelsk i autentiske situasjoner",
      "utforske og reflektere over engelskspråklig litteratur, kultur og samfunnsforhold"
    ]
  },

  MAT_1P: {
    navn: "Matematikk 1P",
    kode: "MAT01-04",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/mat01-04",
    kompetansemaal: [
      "utforske og beskrive sammenhenger mellom tall, algebra og funksjoner og bruke dette til problemløsning",
      "bruke matematiske metoder og hjelpemidler til å løse problemer fra hverdagen og samfunnslivet",
      "modellere og simulere situasjoner fra virkeligheten ved hjelp av matematikk og digitale verktøy"
    ]
  },

  MAT_1T: {
    navn: "Matematikk 1T",
    kode: "MAT01-04",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/mat01-04",
    kompetansemaal: [
      "utforske og beskrive egenskaper ved og mellom funksjoner algebraisk, grafisk og digitalt",
      "formulere og løse problemer ved hjelp av algebra og forstå sammenhengen mellom representasjonsformer",
      "argumentere for og presentere matematiske sammenhenger med presist språk"
    ]
  },

  NAT: {
    navn: "Naturfag",
    kode: "NAT01-04",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/nat01-04",
    kompetansemaal: [
      "planlegge og gjennomføre utforskende aktiviteter og enkle forsøk, samle og bearbeide data og diskutere observasjoner og funn",
      "bruke naturfaglig kunnskap til å vurdere informasjon om natur, helse og teknologi og gjøre seg opp en mening",
      "utforske og argumentere for sammenhengen mellom bærekraftig utvikling og naturvitenskapelige prinsipper"
    ]
  },

  SAF: {
    navn: "Samfunnsfag",
    kode: "SAF01-04",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/saf01-04",
    kompetansemaal: [
      "utforske og presentere dagsaktuelle tema og samfunnsspørsmål ved å bruke samfunnsfaglige metoder, kilder og digitale ressurser",
      "reflektere over korleis identitet, kultur og levesett påverkar og blir påverka av geografiske og historiske tilhøve",
      "drøfte samanhengar mellom politiske, økonomiske og kulturelle strukturar på lokalt, nasjonalt og globalt nivå"
    ]
  },

  HIS: {
    navn: "Historie",
    kode: "HIS01-03",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/his01-03",
    kompetansemaal: [
      "utforske og presentere historiske hendelser og utviklingslinjer ved å bruke ulike kilder og drøfte hvordan fortiden påvirker nåtiden",
      "reflektere over hvordan historiebruk former vår forståelse av fortid, nåtid og fremtid",
      "analysere og vurdere årsaker til og konsekvenser av sentrale historiske hendelser og prosesser"
    ]
  },

  REL: {
    navn: "Religion og etikk",
    kode: "REL01-02",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/rel01-02",
    kompetansemaal: [
      "utforske og drøfte religioner, livssyn og etiske tradisjoner med respekt og faglig nysgjerrighet",
      "reflektere over eksistensielle spørsmål og etiske problemstillinger ved å bruke etiske teorier og modeller",
      "drøfte sammenhenger mellom religion, kultur og samfunn i et historisk og nåtidig perspektiv"
    ]
  },

  KRO: {
    navn: "Kroppsøving",
    kode: "KRO01-05",
    gruppe: "Fellesfag – studieforberedende",
    udir: "https://www.udir.no/lk20/kro01-05",
    kompetansemaal: [
      "praktisere og undervise i bevegelsesaktiviteter som fremmer helse og mestring for ulike målgrupper",
      "planlegge, gjennomføre og vurdere aktivitetsopplegg knyttet til idrett, dans og friluftsliv",
      "reflektere over sammenhengen mellom fysisk aktivitet, livsstil og helse"
    ]
  },

  // ── FELLESFAG YRKESFAG ────────────────────────────────────

  NOR_YF: {
    navn: "Norsk (yrkesfag)",
    kode: "NOR01-06",
    gruppe: "Fellesfag – yrkesfag",
    udir: "https://www.udir.no/lk20/nor01-06",
    kompetansemaal: [
      "lese og vurdere tekster fra eget programområde og fra samfunns- og arbeidslivet",
      "skrive tekster tilpasset kommunikasjonssituasjoner i yrkeslivet",
      "bruke digitale verktøy og kildekritisk vurdering i skole og arbeidsliv"
    ]
  },

  ENG_YF: {
    navn: "Engelsk (yrkesfag)",
    kode: "ENG01-04",
    gruppe: "Fellesfag – yrkesfag",
    udir: "https://www.udir.no/lk20/eng01-04",
    kompetansemaal: [
      "kommunisere på engelsk i situasjoner fra eget programområde og yrkesliv",
      "lese og forstå faglige tekster og instruksjoner på engelsk",
      "reflektere over kulturforskjeller og kommunikasjon i internasjonale arbeidssituasjoner"
    ]
  },

  MAT_YF: {
    navn: "Matematikk (yrkesfag)",
    kode: "MAT01-04",
    gruppe: "Fellesfag – yrkesfag",
    udir: "https://www.udir.no/lk20/mat01-04",
    kompetansemaal: [
      "bruke matematikk fra eget programområde til problemløsning og beregninger i yrkesutøvelsen",
      "tolke og bruke statistikk, målenheter og geometri knyttet til aktuelt yrkesfag",
      "bruke digitale verktøy til matematiske beregninger og modellering"
    ]
  },

  NAT_YF: {
    navn: "Naturfag (yrkesfag)",
    kode: "NAT01-04",
    gruppe: "Fellesfag – yrkesfag",
    udir: "https://www.udir.no/lk20/nat01-04",
    kompetansemaal: [
      "bruke naturfaglig kunnskap fra eget programområde i yrkespraksis",
      "vurdere helse-, miljø- og sikkerhetshensyn i utøvelse av yrkesfaget",
      "reflektere over sammenhenger mellom teknologi, natur og bærekraft"
    ]
  },

  // ── REALFAG (PROGRAMFAG) ──────────────────────────────────

  MAT_R1: {
    navn: "Matematikk R1",
    kode: "MAR01-02",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/mar01-02",
    kompetansemaal: [
      "utforske og anvende derivasjon og integrasjon i analyse av funksjoner",
      "bruke vektorer og geometri til å løse problemer i to og tre dimensjoner",
      "modellere situasjoner fra naturfag og teknologi med matematiske funksjoner"
    ]
  },

  MAT_R2: {
    navn: "Matematikk R2",
    kode: "MAR02-01",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/mar02-01",
    kompetansemaal: [
      "anvende differensiallikninger og vektorfunksjoner til å modellere og løse problemer",
      "bruke sannsynlighetsregning og statistikk til analyse og beslutninger",
      "utforske og presentere matematiske bevis og resonnement"
    ]
  },

  MAT_S1: {
    navn: "Matematikk S1",
    kode: "MAS01-02",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/mas01-02",
    kompetansemaal: [
      "bruke funksjoner, likninger og optimering til å løse praktiske problemer",
      "anvende sannsynlighetsregning og kombinatorikk i dagliglivet og samfunnet",
      "tolke og kritisk vurdere statistiske fremstillinger og modeller"
    ]
  },

  FYS1: {
    navn: "Fysikk 1",
    kode: "FYS01-02",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/fys01-02",
    kompetansemaal: [
      "planlegge og gjennomføre forsøk, analysere data og vurdere usikkerhet",
      "bruke bevegelseslover og energiprinsipper til å forklare fenomener",
      "reflektere over fysikkens rolle i teknologisk utvikling og samfunn"
    ]
  },

  KJE1: {
    navn: "Kjemi 1",
    kode: "KJE01-02",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/kje01-02",
    kompetansemaal: [
      "planlegge og gjennomføre kjemiforsøk og vurdere resultater kritisk",
      "bruke kjemisk kunnskap til å forklare stoffers egenskaper og reaksjoner",
      "reflektere over kjemiens betydning for helse, miljø og teknologi"
    ]
  },

  BIO1: {
    navn: "Biologi 1",
    kode: "BIO01-03",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/bio01-03",
    kompetansemaal: [
      "planlegge og gjennomføre biologiske undersøkelser og drøfte funn",
      "bruke kunnskap om celler, arv og evolusjon til å forklare biologiske fenomener",
      "reflektere over biologiens rolle i etiske spørsmål og naturforvaltning"
    ]
  },

  GEO1: {
    navn: "Geografi",
    kode: "GEO01-02",
    gruppe: "Realfag (programfag)",
    udir: "https://www.udir.no/lk20/geo01-02",
    kompetansemaal: [
      "utforske og beskrive naturlandskap og kulturlandskap i ulike deler av verden",
      "analysere sammenhengen mellom befolkningsutvikling, ressursbruk og bærekraft",
      "bruke geografiske verktøy og data til å tolke og presentere geografisk informasjon"
    ]
  },

  // ── SPRÅK, SAMFUNN OG ØKONOMI (PROGRAMFAG) ──────────────

  POL_SOK: {
    navn: "Politikk, individ og samfunn",
    kode: "PIS01-02",
    gruppe: "Språk, samfunn og økonomi (programfag)",
    udir: "https://www.udir.no/lk20/pis01-02",
    kompetansemaal: [
      "utforske og analysere politiske systemer og maktforhold i Norge og verden",
      "bruke samfunnsvitenskapelige metoder til å undersøke og drøfte samfunnsspørsmål",
      "reflektere over demokrati, menneskerettigheter og medborgerskap"
    ]
  },

  SOK: {
    navn: "Sosiologi og sosialantropologi",
    kode: "SSA01-02",
    gruppe: "Språk, samfunn og økonomi (programfag)",
    udir: "https://www.udir.no/lk20/ssa01-02",
    kompetansemaal: [
      "bruke sosiologiske og sosialantropologiske begreper til å analysere samfunnet",
      "utforske og diskutere identitet, kultur og sosiale strukturer",
      "reflektere over globalisering og kulturelt mangfold"
    ]
  },

  OEK: {
    navn: "Økonomi og ledelse",
    kode: "OEL01-01",
    gruppe: "Språk, samfunn og økonomi (programfag)",
    udir: "https://www.udir.no/lk20/oel01-01",
    kompetansemaal: [
      "analysere bedriftsøkonomiske sammenhenger og bruke regnskapsprinsipper",
      "utforske og drøfte markedsmekanismer, ledelse og bærekraftig forretningsdrift",
      "bruke digitale verktøy til å løse økonomi- og ledelsesoppgaver"
    ]
  },

  PSYK: {
    navn: "Psykologi",
    kode: "PSY01-02",
    gruppe: "Språk, samfunn og økonomi (programfag)",
    udir: "https://www.udir.no/lk20/psy01-02",
    kompetansemaal: [
      "utforske og forklare psykologiske teorier om atferd, tanker og følelser",
      "analysere hva som påvirker helse, utvikling og mellommenneskelige relasjoner",
      "reflektere etisk over psykologiens metoder og anvendelse"
    ]
  },

  // ── YRKESFAGLIGE PROGRAMFAG ──────────────────────────────

  HSF: {
    navn: "Helsefremmende arbeid (Helse og oppvekst)",
    kode: "HSF01-03",
    gruppe: "Yrkesfaglige programfag",
    udir: "https://www.udir.no/lk20/hsf01-03",
    kompetansemaal: [
      "planlegge og gjennomføre helsefremmende og forebyggende tiltak for ulike brukergrupper",
      "bruke faglig kunnskap og etisk refleksjon i møte med enkeltpersoner og grupper",
      "vurdere sammenhenger mellom livsstil, helse og mestring"
    ]
  },

  TEK: {
    navn: "Teknologi og forskningslære",
    kode: "TFO01-02",
    gruppe: "Yrkesfaglige programfag",
    udir: "https://www.udir.no/lk20/tfo01-02",
    kompetansemaal: [
      "planlegge og gjennomføre teknologiske og vitenskapelige prosjekter",
      "bruke vitenskapelige metoder og digitale verktøy til innsamling og analyse av data",
      "reflektere over teknologiens rolle i samfunn, etikk og bærekraft"
    ]
  },

  // ── ANDRE FAG ────────────────────────────────────────────

  PRO: {
    navn: "Programmering",
    kode: "PRO01-01",
    gruppe: "Andre fag",
    udir: "https://www.udir.no/lk20/pro01-01",
    kompetansemaal: [
      "designe og lage løsninger som inkluderer brukervennlighet og universell utforming ved hjelp av ulike programmeringsspråk",
      "planlegge og dokumentere et programmeringsprosjekt, herunder versjonskontroll og samarbeid",
      "analysere og løse problemer ved hjelp av algoritmisk tenkning og ulike programmeringsparadigmer"
    ]
  },

  INF: {
    navn: "Informasjonsteknologi",
    kode: "INF01-02",
    gruppe: "Andre fag",
    udir: "https://www.udir.no/lk20/inf01-02",
    kompetansemaal: [
      "planlegge og utvikle digitale løsninger ved bruk av relevante programmeringsspråk og verktøy",
      "analysere og håndtere data og databaser på en sikker og etisk måte",
      "reflektere over samfunnsmessige konsekvenser av digitalisering og KI"
    ]
  },

  MEDIE: {
    navn: "Medier og kommunikasjon",
    kode: "MEK01-01",
    gruppe: "Andre fag",
    udir: "https://www.udir.no/lk20/mek01-01",
    kompetansemaal: [
      "planlegge og produsere medieprodukter tilpasset ulike plattformer og målgrupper",
      "analysere og vurdere medietekster kritisk i et samfunnsmessig og etisk perspektiv",
      "bruke digitale verktøy til produksjon, publisering og distribusjon av innhold"
    ]
  }

};

const TRINN = ["Vg1", "Vg2", "Vg3"];

const ISLANDS = [
  {
    id: 0,
    name: "Kom i gang",
    status: "done",
    desc: "Grunnlaget for all KI-bruk. Forstå hva en prompt er, hvordan du stiller gode spørsmål, og hvordan du sjekker svar kritisk.",
    wizardUnlockAt: 0,
    cards: [
      {
        id: "kom-01",
        type: "simple",
        title: "Din første prompt",
        out: "Forstå KI ved å prøve det selv",
        doThis: "Kopier og lim inn i Copilot — uten å endre noe",
        prompt: "Du er en hjelpsom assistent for lærere i videregående skole.\nForklar i maks 5 korte punkter hva du kan hjelpe meg med i undervisningen.",
        time: "2 min",
        tags: ["Alle trinn", "Alle fag"]
      },
      {
        id: "kom-02",
        type: "simple",
        title: "Sjekk svaret kritisk",
        out: "Lær KI å avsløre egne svakheter",
        doThis: "Legg denne setningen til på slutten av en hvilken som helst prompt",
        prompt: "Hva kan være feil, misvisende eller ufullstendig i svaret du nettopp ga meg?\nList opp 3 mulige svakheter og si hva læreren bør sjekke selv.",
        time: "2 min",
        tags: ["Alle trinn", "Alle fag"]
      }
    ]
  },
  {
    id: 1,
    name: "Undervisning",
    status: "active",
    desc: "Planlegg og gjennomfør timer raskere. Alle prompts er forankret i kompetansemål fra Udir.",
    wizardUnlockAt: 3,
    cards: [
      {
        id: "und-01",
        type: "simple",
        title: "Åpningstekst til timen",
        out: "Vekk nysgjerrighet fra første minutt",
        doThis: "Fyll inn [FAG] og [TEMA]",
        prompt: "Du er lærer i [FAG] for Vg1 i videregående skole.\nSkriv en åpningstekst på 2–3 setninger som vekker nysgjerrighet rundt temaet [TEMA].\nIkke avslør svaret – still heller et godt spørsmål som setter klassen i gang.",
        time: "3 min",
        tags: ["Vg1", "Alle fag"]
      },
      {
        id: "und-02",
        type: "simple",
        title: "Læringsaktivitet 20 min",
        out: "Ferdig aktivitet med mål, gjennomføring og avrunding",
        doThis: "Fyll inn [FAG], [TRINN] og [TEMA]",
        prompt: "Lag en læringsaktivitet for [FAG] på [TRINN] om temaet [TEMA].\nTidsramme: 20 minutter.\nInkluder:\n- Læringsmål (1 setning)\n- Steg-for-steg gjennomføring\n- Ett avslutningsspørsmål til klassen\nUnngå at elevene trenger digitale verktøy.",
        time: "5 min",
        tags: ["Alle trinn", "Alle fag"]
      },
      {
        id: "und-03",
        type: "simple",
        title: "Ukesplan fra kompetansemål",
        out: "Strukturert ukesplan på under 5 minutter",
        doThis: "Lim inn kompetansemål fra udir.no",
        prompt: "Du er lærer i [FAG] på [TRINN] i videregående.\nLag en ukesplan basert på dette kompetansemålet:\n[LIMED INN FRA UDIR]\n\nInkluder for hver økt: læringsmål, aktivitetstype og vurderingsform.\nHold det praktisk og gjennomførbart for en vanlig skoleuke.",
        time: "5 min",
        tags: ["Alle trinn", "Alle fag"]
      },
      {
        id: "und-04",
        type: "simple",
        title: "Differensiert oppgavesett",
        out: "Tre nivåer av samme oppgave klar til bruk",
        doThis: "Beskriv oppgaven og fyll inn [FAG]",
        prompt: "Du er lærer i [FAG]. Lag tre varianter av denne oppgaven tilpasset ulike faglige nivåer:\n[BESKRIV OPPGAVEN]\n\nVariant 1 – Grunnleggende: forenklet språk og tydelig struktur\nVariant 2 – Standard: som oppgaven er tenkt\nVariant 3 – Utvidet: krever dypere analyse og selvstendig tenkning\n\nHold formålet likt for alle tre nivåer.",
        time: "5 min",
        tags: ["Alle trinn", "Tilpasning"]
      },
      {
        id: "und-wizard",
        type: "wizard",
        title: "Lag undervisningsopplegg",
        out: "Ferdig opplegg basert på Udir-kompetansemål",
        doThis: "Velg fag, trinn og tema i veiviseren",
        prompt: "",
        time: "5–8 min",
        tags: ["Alle trinn", "Alle fag"]
      }
    ]
  },
  {
    id: 2,
    name: "Vurdering",
    status: "open",
    desc: "Rubrikker, tilbakemelding og egenvurdering. Spar tid på det som tar mest tid.",
    wizardUnlockAt: 0,
    cards: [
      {
        id: "vurd-01",
        type: "simple",
        title: "Rubric på 60 sekunder",
        out: "4-nivå rubric tilpasset oppgaven din",
        doThis: "Fyll inn [OPPGAVE] og [KRITERIER]",
        prompt: "Lag en vurderingsrubric med 4 nivåer (fremragende / god / grunnleggende / under forventning) for denne oppgaven:\n[OPPGAVE]\n\nVurderingskriterier:\n[KRITERIER]\n\nFormater som en enkel tabell med nivå, beskrivelse og kjennetegn.",
        time: "5 min",
        tags: ["Alle trinn", "Skriftlig"]
      },
      {
        id: "vurd-02",
        type: "simple",
        title: "Tilbakemelding på utkast",
        out: "Konstruktiv tilbakemelding klar til justering",
        doThis: "Lim inn elevtekst uten navn eller personopplysninger",
        prompt: "Du er en erfaren lærer i [FAG].\nLes elevutkastet under og gi tilbakemelding med:\n1) Hva fungerer bra (2–3 konkrete punkt)\n2) Hva kan forbedres (2–3 konkrete punkt)\n3) Ett konkret forslag til neste revisjon\n\nVær konstruktiv. Læreren vurderer selv hva som passer for eleven.\n\nElevtekst:\n[LIMER INN HER]",
        time: "5 min",
        tags: ["Alle trinn", "Skriftlig"]
      },
      {
        id: "vurd-03",
        type: "simple",
        title: "Egenvurderingsskjema",
        out: "Refleksjonsskjema elevene fyller ut selv",
        doThis: "Fyll inn [FAG] og [OPPGAVETYPE]",
        prompt: "Lag et egenvurderingsskjema for elever i [FAG] etter [OPPGAVETYPE].\nInkluder 4–5 spørsmål som hjelper eleven å:\n- Reflektere over eget arbeid\n- Identifisere hva de mestrer\n- Peke på hva de vil jobbe videre med\n\nSkriv spørsmålene i et enkelt og direkte språk tilpasset videregående elever.",
        time: "5 min",
        tags: ["Alle trinn", "Egenvurdering"]
      }
    ]
  },
  {
    id: 3,
    name: "Tilpasset opplæring",
    status: "open",
    desc: "Forenkle forklaringer, lag ekstraoppgaver og tilpass for alle nivåer uten å doble arbeidsmengden.",
    wizardUnlockAt: 0,
    cards: [
      {
        id: "til-01",
        type: "simple",
        title: "Forenklet forklaring",
        out: "Enklere versjon av begrep eller tekst",
        doThis: "Skriv inn begrepet eller teksten du vil forenkle",
        prompt: "Forklar [BEGREP ELLER TEKST] for en elev i videregående som synes faget er krevende.\nBruk:\n- Korte setninger\n- Hverdagslige ord\n- Ett konkret eksempel fra dagliglivet\nMaks 150 ord.",
        time: "3 min",
        tags: ["Alle trinn", "Tilpasning"]
      },
      {
        id: "til-02",
        type: "simple",
        title: "Ekstra utfordring",
        out: "Meningsfull tilleggsoppgave for faglig sterke elever",
        doThis: "Fyll inn [FAG], [TEMA] og [TRINN]",
        prompt: "Lag 2 ekstraoppgaver i [FAG] om [TEMA] for elever på [TRINN] som allerede mestrer grunnpensumet.\nOppgavene skal:\n- Kreve selvstendig tenkning\n- Anvende kunnskap i nye sammenhenger\n- Ikke bare være «mer av det samme»\n\nInkluder fasit med forklaring.",
        time: "5 min",
        tags: ["Alle trinn", "Tilpasning"]
      },
      {
        id: "til-03",
        type: "simple",
        title: "Alternativt læringsopplegg",
        out: "Annen innfallsvinkel til samme læringsmål",
        doThis: "Beskriv læringsmålet og hva som ikke fungerte",
        prompt: "En elev i [FAG] på [TRINN] forstår ikke dette læringsmålet via vanlig undervisning:\n[LÆRINGSMÅL]\n\nForeslå 2 alternative måter å nærme seg samme mål på.\nBruk ulike læringsformer (visuell, praktisk, muntlig osv.).\nVær konkret og handlingsorientert.",
        time: "5 min",
        tags: ["Alle trinn", "Tilpasning"]
      }
    ]
  },
  {
    id: 4,
    name: "Koding og teknologi",
    status: "open",
    desc: "Bruk KI til å forklare kode, feilsøke og lage programmeringsoppgaver elevene forstår.",
    wizardUnlockAt: 0,
    cards: [
      {
        id: "kod-01",
        type: "simple",
        title: "Forklar koden",
        out: "Linje-for-linje forklaring på norsk",
        doThis: "Lim inn kodeblokken under prompten",
        prompt: "Forklar hva denne koden gjør, linje for linje, på norsk.\nAnta at leseren er nybegynner i programmering.\nAvslutt med én setning om hva koden brukes til i praksis.\n\nKode:\n[LIMES INN HER]",
        time: "3 min",
        tags: ["Vg1", "Programmering"]
      },
      {
        id: "kod-02",
        type: "simple",
        title: "Feilsøking med forståelse",
        out: "Finn feilen og forstå hvorfor den oppsto",
        doThis: "Lim inn koden og feilmeldingen",
        prompt: "Jeg har kode som ikke fungerer.\nGi meg ikke bare fikset kode — hjelp meg forstå feilen ved å:\n1) Forklare hva feilmeldingen betyr\n2) Peke på linjen som trolig er årsaken\n3) Foreslå to mulige løsninger med forklaring\n\nKode:\n[KODE]\n\nFeilmelding:\n[FEILMELDING]",
        time: "5 min",
        tags: ["Vg2", "Vg3", "Programmering"]
      },
      {
        id: "kod-03",
        type: "simple",
        title: "Lag en programmeringsoppgave",
        out: "Klar oppgave tilpasset elevenes nivå",
        doThis: "Fyll inn [SPRÅK], [TEMA] og [NIVÅ]",
        prompt: "Lag en programmeringsoppgave i [SPRÅK] om [TEMA] for elever på [NIVÅ].\nInkluder:\n- Oppgavebeskrivelse i klart språk\n- Eksempel på input og forventet output\n- Hint-seksjon (3 hint som ikke avslører løsningen)\n- Fasit med kommentarer i koden",
        time: "5 min",
        tags: ["Alle trinn", "Programmering"]
      }
    ]
  },
  {
    id: 5,
    name: "Kildebruk og kvalitet",
    status: "locked",
    desc: "Låst. Fullfør 3 andre kapitler for å åpne dette. Her lærer du å hjelpe elever vurdere kilder kritisk og gjenkjenne KI-tekst.",
    wizardUnlockAt: 0,
    cards: [
      {
        id: "kil-01",
        type: "simple",
        title: "Kildekritikk i 5 steg",
        out: "Strukturert vurdering av én kilde",
        doThis: "Kopier inn URL eller tittel på kilden",
        prompt: "Hjelp meg vurdere denne kilden kritisk: [KILDE / URL]\n\nGå gjennom:\n1) Hvem har skrevet det, og hva er deres bakgrunn?\n2) Når ble det publisert?\n3) Hva er hensikten — informere, selge, overbevise?\n4) Er påstandene dokumentert med referanser?\n5) Finnes andre uavhengige kilder som bekrefter dette?\n\nAvslutt med en samlet vurdering på 2–3 setninger.",
        time: "5 min",
        tags: ["Alle trinn", "Kildevurdering"]
      },
      {
        id: "kil-02",
        type: "simple",
        title: "Gjenkjenn KI-generert tekst",
        out: "Lær elever å identifisere typiske KI-trekk",
        doThis: "Bruk som utgangspunkt for klassediskusjon",
        prompt: "Les teksten under og vurder om den kan være skrevet av en KI.\nLegg spesielt merke til:\n- Klisjebruk og generiske formuleringer\n- Manglende personlig stemme eller konkrete detaljer\n- Unormalt jevnt og «perfekt» språk\n- Påstander uten kildehenvisning\n\nForklar hva som gjør deg sikker eller usikker.\n\nTekst:\n[TEKST]",
        time: "5 min",
        tags: ["Alle trinn", "Kildevurdering"]
      },
      {
        id: "kil-03",
        type: "simple",
        title: "Sammenlign to kilder",
        out: "Strukturert sammenligning klar til klassediskusjon",
        doThis: "Lim inn eller beskriv de to kildene",
        prompt: "Sammenlign disse to kildene om samme tema:\n\nKilde 1: [KILDE 1]\nKilde 2: [KILDE 2]\n\nSe på:\n- Likheter og forskjeller i påstander\n- Forskjell i perspektiv og vinkling\n- Hvilken kilde virker mest pålitelig og hvorfor\n\nAvslutt med 2 diskusjonsspørsmål egnet for en Vg-klasse.",
        time: "5 min",
        tags: ["Alle trinn", "Kildevurdering"]
      }
    ]
  }
];

const ADMIN_PIN = CONFIG.ADMIN_PIN;

/*
──────────────────────────────────────────────
  MAL FOR NYTT KORT
  Kopier, fyll inn, lim inn i riktig øy.
──────────────────────────────────────────────
{
  id: "xxx-01",
  type: "simple",
  title: "Kortets tittel",
  out: "Én setning: hva læreren får",
  doThis: "Instruksjon til læreren",
  prompt: "Selve prompten.\nBruk [KLAMMER] for felt læreren fyller inn.",
  time: "5 min",
  tags: ["Vg1", "Norsk"]
}
*/
