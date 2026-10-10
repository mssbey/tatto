# Tattoo station — statik site

Dövme stüdyosu ve koleksiyonluk sanat mağazası için tanıtım sitesi. Next.js 16 (App Router, `output: "export"`), TypeScript, Tailwind CSS 4, Motion.

Bu sürüm **tamamen statiktir**: sunucu, veritabanı, yönetim paneli, sepet/ödeme ve form gönderimi yoktur. `next build` çıktısı `out/` klasörüne düz HTML/CSS/JS olarak yazılır.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statik çıktı → out/
npm start          # out/ klasörünü yerelde sunar (http://localhost:3000)
npm run lint && npm run typecheck && npm test
```

## Vercel'e yayınlama

1. Vercel'de **Add New → Project** ile bu repoyu içe aktar.
2. Framework otomatik olarak **Next.js** algılanır; ek ayar gerekmez (`output: "export"`).
3. İsteğe bağlı ortam değişkeni: `SITE_URL=https://alanadin.com` (canonical, sitemap). Verilmezse Vercel'in üretim alan adı kullanılır.

Güvenlik başlıkları `vercel.json` içindedir.

## İçeriği güncelleme

| Ne | Nerede |
|---|---|
| İşletme bilgileri (adres, telefon, e-posta, WhatsApp, sosyal medya, logo) | `src/config/site.ts` → `siteDefaults`. Boş alanlar sitede gösterilmez; WhatsApp numarası girilince WhatsApp bağlantıları açılır. |
| Çalışmalar, Store eserleri, kategoriler, sanatçılar | `src/content/catalog.ts` |
| Görseller | `public/` (eşleme: `public/demo/manifest.json`) |
| Bakım rehberi ve SSS | `src/content/care.ts` |

## Bu sürümde olmayanlar

- **Online satış**: Store bir vitrindir. Ürün sayfasındaki "Satın almak için iletişime geç" butonu WhatsApp'a (numara girildiyse), e-postaya veya iletişim sayfasına yönlendirir.
- **Randevu formu**: `/randevu` bir hazırlık rehberi ve iletişim kanalları sayfasıdır; veri kaydetmez.
- **Yönetim paneli, veritabanı, ödeme altyapısı**: ayrı tutulan tam uygulama sürümünde bulunur ve bu repoya dahil edilmemiştir.

## İçerik notları

- Tüm çalışma ve Store kayıtları **demo**dur ve sitede "Demo" etiketiyle gösterilir; yapısal veri (JSON-LD) ve sitemap'e eklenmez.
- `public/tattoos/traditional/` altındaki fotoğrafların kaynağı `public/demo/photo-sources.json` dosyasında belirtilmiştir (Skin Design Tattoos). Bu görsellerin kullanım izni site sahibine aittir.
