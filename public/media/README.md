# Média

Sem dej obrázky a videa z iPhonu.

## Struktura

- `public/media/nazev-obrazku.jpg`
- `public/media/video-kojoti.mp4`

## Použití ve slidech

V `src/data/blocks.ts` u slidu vyplň:

```ts
{
  id: "voda-3",
  layout: "text-image",
  title: "Kravské napajedlo",
  body: "Ano, opravdu se z toho pije...",
  image: "/media/napajedlo.jpg",
}
```

Pro video:

```ts
{
  id: "prihody-4",
  layout: "video",
  title: "Bouřka",
  video: "/media/bourka.mp4",
  caption: "30 mm za hodinu",
}
```

## Formáty

- Obrázky: JPG (max ~2 MB), WebP je ještě lepší
- Videa: MP4 z iPhonu jsou hotová, jen je sem přesuň (klidně 100+ MB je OK pro lokální prezentaci)
