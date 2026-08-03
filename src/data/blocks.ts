export type SlideLayout =
  | "title"
  | "text"
  | "image"
  | "text-image"
  | "video"
  | "quote"
  | "stats";

export type Stat = { value: string; label: string };

export type Slide = {
  id: string;
  layout: SlideLayout;
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  caption?: string;
  quote?: string;
  quoteBy?: string;
  stats?: Stat[];
};

export type Block = {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  accent: "red" | "gold" | "blue" | "copper" | "cactus" | "plum" | "rust";
  slides: Slide[];
};

export const blocks: Block[] = [
  {
    id: "intro",
    title: "Co je Arizona Trail",
    subtitle: "Úvod do trailu, který mě potkal",
    icon: "🌵",
    accent: "gold",
    slides: [
      {
        id: "intro-1",
        layout: "title",
        title: "Arizona Trail",
        subtitle: "1 300 km z Mexika do Utahu, napříč pouští a horami",
      },
      {
        id: "intro-2",
        layout: "stats",
        title: "V číslech",
        stats: [
          { value: "1 300 km", label: "délka" },
          { value: "800 m → 2 800 m", label: "elevace" },
          { value: "1 měsíc", label: "můj čas na stezce" },
        ],
      },
      {
        id: "intro-3",
        layout: "text-image",
        title: "Odkud kam",
        body: "Z hranice s Mexikem u městečka Coronado až k okraji Grand Canyonu a dál do Utahu. Stezka propojuje pouště, dubové savany, borovicové lesy a alpínské louky.",
      },
      {
        id: "intro-4",
        layout: "text",
        title: "Proč zrovna Arizona",
        body: "Chtěl jsem něco delšího než víkendovku. Nechtěl jsem dav PCT. AZT je divoká, tichá a málokdo o ní ví.",
      },
    ],
  },
  {
    id: "den",
    title: "Den na trailu",
    subtitle: "Ráno, poledne, večer",
    icon: "☀️",
    accent: "red",
    slides: [
      {
        id: "den-1",
        layout: "title",
        title: "Den na trailu",
        subtitle: "Jak vypadá 24 hodin",
      },
      {
        id: "den-2",
        layout: "text",
        title: "5:30 — vstávání",
        body: "Před sluncem. Chladno, sbaleno za 20 minut. Prvních pár km než začne pálit.",
      },
      {
        id: "den-3",
        layout: "text",
        title: "Poledne — schování",
        body: "Ve stínu skály nebo saguara. Vaří se boty. Spím.",
      },
      {
        id: "den-4",
        layout: "text",
        title: "Večer — kilometry navíc",
        body: "Když slunce padá, jdu dál. Nejhezčí hodiny na trailu.",
      },
    ],
  },
  {
    id: "voda",
    title: "Voda",
    subtitle: "Nejdůležitější zdroj",
    icon: "💧",
    accent: "blue",
    slides: [
      {
        id: "voda-1",
        layout: "title",
        title: "Voda",
        subtitle: "Bez ní ani krok",
      },
      {
        id: "voda-2",
        layout: "stats",
        title: "Kolik piju",
        stats: [
          { value: "5–7 L", label: "denně" },
          { value: "40 km", label: "mezi zdroji (max)" },
          { value: "1 kg = 1 L", label: "co táhnu navíc" },
        ],
      },
      {
        id: "voda-3",
        layout: "text",
        title: "Kde ji beru",
        body: "Cache boxy od trail angels, kravské napajedla, potoky. Filtruji vše.",
      },
    ],
  },
  {
    id: "strava",
    title: "Strava",
    subtitle: "5 000 kalorií denně",
    icon: "🌯",
    accent: "copper",
    slides: [
      {
        id: "strava-1",
        layout: "title",
        title: "Strava",
        subtitle: "Kalorie, které nikdy nestačí",
      },
      {
        id: "strava-2",
        layout: "text",
        title: "Base menu",
        body: "Ovesná kaše ráno. Tortilly s arašídovým máslem během dne. Sušené jídlo večer. Opakuj měsíc.",
      },
      {
        id: "strava-3",
        layout: "text",
        title: "Resupply",
        body: "Každých 5–7 dní zajít do města. Poste restante krabice, nebo Walmart. Jednou i benzínka.",
      },
    ],
  },
  {
    id: "zvirata",
    title: "Zvířata",
    subtitle: "Co jsem potkal",
    icon: "🦎",
    accent: "cactus",
    slides: [
      {
        id: "zvirata-1",
        layout: "title",
        title: "Zvířata",
        subtitle: "Co všechno se sem vejde",
      },
      {
        id: "zvirata-2",
        layout: "text",
        title: "Chřestýš",
        body: "Třikrát. Vždycky ho slyšíš dřív než vidíš. Cvakání je bez debat srozumitelné.",
      },
      {
        id: "zvirata-3",
        layout: "text",
        title: "Kojoti v noci",
        body: "Skřehotají kolem stanu. Zvyknete si. Skoro.",
      },
      {
        id: "zvirata-4",
        layout: "text",
        title: "Kolibříci a vidlorohy",
        body: "Malé zázraky během chůze. Vidlorohové antilopy vypadají jak z jiného kontinentu.",
      },
    ],
  },
  {
    id: "lide",
    title: "Lidé",
    subtitle: "Američané na stezce i mimo ni",
    icon: "🤠",
    accent: "rust",
    slides: [
      {
        id: "lide-1",
        layout: "title",
        title: "Lidé",
        subtitle: "Trail angels, hikeři, ranchers",
      },
      {
        id: "lide-2",
        layout: "text",
        title: "Trail angels",
        body: "Cizí lidé nechávají vodu, jídlo a někdy klíč od chatky. Bez očekávání. Kultura, která u nás neexistuje.",
      },
      {
        id: "lide-3",
        layout: "text",
        title: "Ostatní hikeři",
        body: "Za měsíc jsem potkal 12 lidí. Většina mířila stejným směrem. Někteří se stali kamarády.",
      },
    ],
  },
  {
    id: "prihody",
    title: "Příhody",
    subtitle: "Zajímavosti a překvapení",
    icon: "⚡",
    accent: "plum",
    slides: [
      {
        id: "prihody-1",
        layout: "title",
        title: "Příhody",
        subtitle: "Co si pamatuju nejvíc",
      },
      {
        id: "prihody-2",
        layout: "text",
        title: "Bouřka na Mogollon Rim",
        body: "Za hodinu spadlo 30 mm. Byl jsem uprostřed náhorní plošiny. Bleskový útěk k stromům.",
      },
      {
        id: "prihody-3",
        layout: "text",
        title: "Rancher s pivem",
        body: "Zastavil pick-up, otevřel chladák, řekl \"take one\". Odjel.",
      },
    ],
  },
  {
    id: "vybaveni",
    title: "Vybavení",
    subtitle: "Co mám na zádech",
    icon: "🎒",
    accent: "gold",
    slides: [
      {
        id: "vybaveni-1",
        layout: "title",
        title: "Vybavení",
        subtitle: "Base weight 6 kg",
      },
      {
        id: "vybaveni-2",
        layout: "stats",
        title: "Tři nejdražší kusy",
        stats: [
          { value: "Batoh 45L", label: "hlavní věc" },
          { value: "Cuben tarp", label: "místo stanu" },
          { value: "Trailboty", label: "3 páry za trip" },
        ],
      },
    ],
  },
];
