export type SlideLayout =
  | "title"
  | "text"
  | "image"
  | "text-image"
  | "video"
  | "quote"
  | "stats";

export type Stat = { value: string; label: string };

/**
 * One image or video slot shown next to a text slide.
 * On text slides, media appears as a 2×2 grid to the right of the copy.
 * Provide at most 4 items — extras are ignored.
 */
export type MediaItem =
  | { kind: "image"; src: string; alt?: string; caption?: string }
  | { kind: "video"; src: string; caption?: string };

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
  /**
   * Optional media grid (max 4). Text slides render 4 placeholder tiles
   * when this is undefined, so the layout is ready to receive media.
   */
  media?: MediaItem[];
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
  /* --------------------------- 1. Arizona Trail --------------------------- */
  {
    id: "intro",
    title: "Arizona Trail",
    subtitle: "Úvod do trailu, který mě potkal",
    icon: "🌵",
    accent: "gold",
    slides: [
      {
        id: "intro-1",
        layout: "title",
        title: "Arizona Trail",
        subtitle: "1 000 km od Mexika k Utahu",
      },
      {
        id: "intro-2",
        layout: "stats",
        title: "V číslech",
        stats: [
          { value: "1 000 km", label: "délka" },
          { value: "24 000 m", label: "nastoupáno" },
          { value: "26 dní", label: "na trailu" },
        ],
      },
      {
        id: "intro-3",
        layout: "text",
        title: "Co je thruhiking?",
        body: "Thruhiking je pěší putování na dlouhé trati (obvykle stovky až tisíce kilometrů), kdy člověk projde celou trasu vytyčené dálkové stezky v jednom nepřerušeném tahu, obvykle během jedné sezóny.",
      },
      {
        id: "intro-4",
        layout: "text",
        title: "Velké thruhiky & FKT",
        body: "AT (Appalachian) 3 500 km · PCT 4 300 km · CDT 4 900 km · TA (Te Araroa) 3 000 km. AZT je z nich nejmenší, zato divoký. FKT drží Nick Fowler — self-supported za 12 d 17 h (2024). Unsupported Art Brody: 28 d 3 h (2021).",
      },
    ],
  },

  /* --------------------------- 2. Rutina na trailu ---------------------- */
  {
    id: "den",
    title: "Rutina na trailu",
    subtitle: "50–60 km denně",
    icon: "☀️",
    accent: "red",
    slides: [
      {
        id: "den-1",
        layout: "title",
        title: "Rutina na trailu",
        subtitle: "50–60 km denně",
      },
      {
        id: "den-2",
        layout: "stats",
        title: "Denní objem",
        stats: [
          { value: "50–60 km", label: "denně" },
          { value: "12–14 h", label: "pohybu" },
          { value: "3 dny", label: "volna za celý trip" },
        ],
      },
      {
        id: "den-3",
        layout: "text",
        title: "5:30 vstávání",
        body: "Před sluncem. Sbaleno za 20 minut. První kilometry, než začne pálit.",
      },
      {
        id: "den-4",
        layout: "text",
        title: "Poledne",
        body: "Ve stínu skály nebo saguara. Vaří se boty. Spím, jím, doplňuju vodu.",
      },
      {
        id: "den-5",
        layout: "text",
        title: "Večer",
        body: "Když slunce padá, jdu dál. Nejhezčí hodiny na stezce. Kemp až po tmě.",
      },
      {
        id: "den-6",
        layout: "text",
        title: "Přenos do závodu",
        body: "Objem, který nedá žádný trénink. Mentál na dlouhé úseky = maraton po 30. km. Perfektní příprava na Beskydskou sedmičku — dlouhé hodiny pohybu, únava, regenerace za pochodu.",
      },
    ],
  },

  /* --------------------------- 3. Voda --------------------------- */
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
        layout: "text",
        title: "Arizona a voda",
        body: "Nejsuchší stát USA. V jižní části v květnu naprší cca nic. Voda určuje, kam a jak daleko dojdeš.",
      },
      {
        id: "voda-3",
        layout: "stats",
        title: "V číslech",
        stats: [
          { value: "5–7 L", label: "denně" },
          { value: "40 km", label: "max mezi zdroji" },
          { value: "+1 kg = +1 L", label: "co táhnu navíc" },
        ],
      },
      {
        id: "voda-4",
        layout: "text",
        title: "Water catchers & collectors",
        body: "Betonové sběrače dešťovky u stezky, cache boxy od Arizona Trail Association. Nikdy nevíš jistě, jestli je plno.",
      },
      {
        id: "voda-5",
        layout: "text",
        title: "Divoké zdroje",
        body: "Kravské napajedla, potoky, stojaté kaluže. Barva jako silný čaj, ale filtruje se to.",
      },
      {
        id: "voda-6",
        layout: "text",
        title: "Filtrování",
        body: "Sawyer Squeeze 85 g, 1 L za minutu. Filtr vydrží celý trip, když se čistí stříkačkou.",
      },
      {
        id: "voda-7",
        layout: "text",
        title: "Water management",
        body: "Plánování dne kolem vodních bodů. Kolik ponesu, kolik naberu, jestli to dojdu.",
      },
    ],
  },

  /* --------------------------- 4. Strava --------------------------- */
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
        subtitle: "5 000 kcal denně",
      },
      {
        id: "strava-2",
        layout: "stats",
        title: "V číslech",
        stats: [
          { value: "5 000 kcal", label: "denně" },
          { value: "800 g", label: "jídla / den" },
          { value: "5–7 dní", label: "mezi resupply" },
        ],
      },
      {
        id: "strava-3",
        layout: "text",
        title: "Makra",
        body: "~50 % sacharidy, ~30 % tuky, ~20 % bílkoviny. Tuky nejvíc energie na váhu, sacharidy pro rychlou práci.",
      },
      {
        id: "strava-4",
        layout: "text",
        title: "Snídaně",
        body: "Ovesná kaše s ořechy a medem. 5 minut na vaření, 700 kcal.",
      },
      {
        id: "strava-5",
        layout: "text",
        title: "Oběd a svačiny",
        body: "Tortilly s arašídovým máslem a medem. Sušené maso. Kešu, mandle. Nutriční tyčinky.",
      },
      {
        id: "strava-6",
        layout: "text",
        title: "Večeře",
        body: "Dehydrované jídlo (Trail Meal / Real Turmat), těstoviny, rýže s omáčkou. 800–1 000 kcal jedním pytlíkem.",
      },
      {
        id: "strava-7",
        layout: "text",
        title: "Resupply",
        body: "Každých 5–7 dní ve městě. Walmart, benzínka, nebo poste restante krabice, kterou jsem si sám poslal dopředu.",
      },
    ],
  },

  /* --------------------------- 5. Zvířata --------------------------- */
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
        subtitle: "Rozmanitější než čekáš",
      },
      {
        id: "zvirata-2",
        layout: "text",
        title: "Poušť není mrtvá",
        body: "Ráno a večer žije. Odpoledne se všechno schová. Biotop se mění od pouště na jihu po hory nad Flagstaffem.",
      },
      {
        id: "zvirata-3",
        layout: "text",
        title: "Kojoti",
        body: "V noci skřehotají kolem stanu. Zvykneš si. Skoro.",
      },
      {
        id: "zvirata-4",
        layout: "text",
        title: "Hadi",
        body: "Chřestýše jsem potkal třikrát. Cvakání slyšíš dřív, než ho vidíš. Kingsnakes, gopher snakes — neškodné, ale vyleknou.",
      },
      {
        id: "zvirata-5",
        layout: "text",
        title: "Ještěři",
        body: "Každý osluněný kámen. Whiptail lizards utíkají po zadních jak minidinosauři.",
      },
      {
        id: "zvirata-6",
        layout: "text",
        title: "Hmyz",
        body: "Málo. Jen u vody komáři a muchničky u napajedel.",
      },
      {
        id: "zvirata-7",
        layout: "text",
        title: "Vyšší polohy",
        body: "Za Flagstaffem se biotop mění. Srnky, jeleni. Noci pod nulou.",
      },
      {
        id: "zvirata-8",
        layout: "text",
        title: "Kondoři kalifornští",
        body: "V Grand Canyonu nad hlavou. Rozpětí křídel 3 metry. Skoro vyhynulý druh — v 80. letech bylo 27 kusů v přírodě, dnes okolo 340.",
      },
    ],
  },

  /* --------------------------- 6. Lidé --------------------------- */
  {
    id: "lide",
    title: "Lidé",
    subtitle: "Trail angels a další",
    icon: "🤠",
    accent: "rust",
    slides: [
      {
        id: "lide-1",
        layout: "title",
        title: "Lidé",
        subtitle: "Trail angels a další",
      },
      {
        id: "lide-2",
        layout: "text",
        title: "Kdo je Trail Angel",
        body: "Místní dobrovolník pomáhající thruhikerům. Nechávají vodu, vaří večeře, ubytují. Součást identity dálkových stezek v USA.",
      },
      {
        id: "lide-3",
        layout: "text",
        title: "Kultura",
        body: "Bez očekávání odplaty. Štědrost jako součást komunity. U nás nic podobného neexistuje.",
      },
      {
        id: "lide-4",
        layout: "text",
        title: "Konkrétně",
        body: "[Konkrétní jména a příběhy doplním před přednáškou.]",
      },
      {
        id: "lide-5",
        layout: "text",
        title: "Ostatní hikeři",
        body: "Za měsíc jsem potkal 12 lidí. Většinou stejný směr. Někteří se stali kamarády.",
      },
      {
        id: "lide-6",
        layout: "text",
        title: "Rancheři, řidiči",
        body: "Cestou na hitchhike. Pick-up, chladák s pivem, „take one“.",
      },
    ],
  },

  /* --------------------------- 7. Příhody --------------------------- */
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
        title: "Došla mi voda",
        body: "[Detail doplním před přednáškou — kde, kolik chybělo, jak jsem to řešil.]",
      },
      {
        id: "prihody-3",
        layout: "text",
        title: "Noc na dně Grand Canyonu",
        body: "40 °C ve dne, 25 °C v noci u řeky Colorado. Zvuk vody místo ticha.",
      },
      {
        id: "prihody-4",
        layout: "text",
        title: "Záda",
        body: "[Okolnosti a řešení doplním před přednáškou.]",
      },
      {
        id: "prihody-5",
        layout: "text",
        title: "Puchýře",
        body: "Přes všechen Squirrel's Nut Butter. Kdy, jak, co pomohlo.",
      },
      {
        id: "prihody-6",
        layout: "text",
        title: "Zarostlá tříska",
        body: "Ten okamžik, kdy „tohle nechci ani vidět“. Řešení v terénu.",
      },
    ],
  },

  /* --------------------------- 8. Vybavení --------------------------- */
  {
    id: "vybaveni",
    title: "Vybavení",
    subtitle: "Base weight 5,9 kg",
    icon: "🎒",
    accent: "gold",
    slides: [
      {
        id: "vybaveni-1",
        layout: "title",
        title: "Vybavení",
        subtitle: "Base weight 5,9 kg",
      },
      {
        id: "vybaveni-2",
        layout: "stats",
        title: "Váhy",
        stats: [
          { value: "5,9 kg", label: "base weight" },
          { value: "7,8 kg", label: "s worn věcma" },
          { value: "~13 kg", label: "s vodou a jídlem" },
        ],
      },
      {
        id: "vybaveni-3",
        layout: "text",
        title: "Velká trojka · 2,3 kg",
        body: "Batoh Hyperlite Junction 55 (910 g), tarp Six Moon Designs Deschutes (632 g), spacák REI Magma 30 (737 g). Ultralight bez kompromisu.",
      },
      {
        id: "vybaveni-4",
        layout: "text",
        title: "Spaní a vaření · 0,9 kg",
        body: "Karimatka Thermarest NeoAir (400 g). Vařič MSR Pocket Rocket (75 g), titanový hrnek Toaks 550 ml (74 g), plyn Jetboil 100 g. Vaří se jenom večer.",
      },
      {
        id: "vybaveni-5",
        layout: "text",
        title: "Water system · 0,27 kg",
        body: "Filtr Sawyer Squeeze (85 g), 2× Platypus 2 L dromedář (70 g), Cnoc Premium (41 g) a Smartwater 1 L (28 g) na dopití, Aquatabs jako záloha.",
      },
      {
        id: "vybaveni-6",
        layout: "text",
        title: "Elektronika · 0,82 kg",
        body: "iPhone (212 g), powerbank Nitecore NB10000 GEN4 (143 g), satelitní tracker Garmin InReach Mini 2 (100 g), čelovka Petzl Bindi (34 g), AirPods, AirTag.",
      },
      {
        id: "vybaveni-7",
        layout: "text",
        title: "Oblečení v batohu · 1 kg",
        body: "Péřovka Patagonia Micro Puff, baselayer Craft, bunda Salomon Bonatti, kalhoty Salomon S/Lab, náhradní ponožky Darn Tough, čepice, buff, rukavice.",
      },
      {
        id: "vybaveni-8",
        layout: "text",
        title: "Worn on trail · 1,9 kg",
        body: "Boty Hoka Mafate X, hůlky Black Diamond, hodinky Garmin Fenix 8, kraťasy Salomon, Rab Force Hoody, gaiters, čepice, brýle.",
      },
      {
        id: "vybaveni-9",
        layout: "text",
        title: "Lékárnička · 0,3 kg",
        body: "SPF 50, Squirrel's Nut Butter (proti odřeninám — kritické), leukoplast, Paralen, Aulin, Ibaglin, Imodium, špunty do uší, fixing kit na karimatku a stan.",
      },
    ],
  },
];
