# Média

Sem dej obrázky a videa z iPhonu.

## Struktura

- `public/media/nazev-obrazku.jpg`
- `public/media/video-kojoti.mp4`

## Přidání do slidu (nový 2×2 layout)

Každý **text slide** má vpravo mřížku 2×2 — 4 sloty pro obrázky/videa.
Bez `media` se nakreslí přerušované rámečky jako placeholder.

Do slidu v `src/data/blocks.ts` přidej `media`:

```ts
{
  id: "voda-5",
  layout: "text",
  title: "Divoké zdroje",
  body: "Kravské napajedla, potoky, stojaté kaluže. Barva jak silný čaj, ale filtruje se to.",
  media: [
    { kind: "image", src: "/media/napajedlo.jpg", alt: "Kravské napajedlo", caption: "Papago Wash" },
    { kind: "image", src: "/media/potok.jpg", caption: "Redington Creek" },
    { kind: "video", src: "/media/filtrovani.mp4", caption: "Sawyer za práce" },
    // 4. slot zůstane placeholder
  ],
}
```

- `kind: "image"` → `src`, volitelně `alt` a `caption`
- `kind: "video"` → `src`, volitelně `caption` (spustí se s ovladači)
- Max 4 položky. Když jich dáš míň, zbytek jsou placeholdery.

## Formáty

- **Obrázky:** JPG (max ~2 MB), WebP je ještě lepší.
- **Videa:** MP4 z iPhonu jsou hotová, jen sem přesuň. Krátké klipy (do 30 s) jsou nejlepší pro Vercel (100 MB limit / soubor).
