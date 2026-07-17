# Muhammet Akif Ayan — Kişisel Portfolyo

🌐 **Canlı site:** [akifayan.com](https://akifayan.com)

Yapay Zekâ & Full Stack Geliştirici Muhammet Akif Ayan'ın kişisel portfolyo sitesi.
İki dilli (Türkçe/İngilizce), Supabase destekli, tam dinamik bir Single Page Application.

## Özellikler

- 🌍 Türkçe / İngilizce dil desteği (i18next) — sayfa yenilemeden dil değişimi
- 🗄️ Projeler ve beceriler Supabase'den dinamik olarak çekilir
- 📬 İletişim formu mesajları doğrudan Supabase `messages` tablosuna yazılır (RLS korumalı)
- 🖼️ Proje detay sayfalarında galeri ve video desteği
- 🌙 Koyu / açık tema
- 📱 Mobil öncelikli responsive tasarım

## Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Stil | Tailwind CSS |
| Routing | React Router v6 |
| i18n | i18next + react-i18next |
| Backend / DB | Supabase (PostgreSQL + RLS) |
| Deploy | Vercel |

## Yerel Geliştirme

```bash
npm install
cp .env.example .env.local   # Supabase URL ve anon key'i doldur
npm run dev                  # http://localhost:5173
```

Diğer komutlar: `npm run build`, `npm run preview`, `npm run typecheck`

## İletişim

- 🌐 [akifayan.com](https://akifayan.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/muhammet-akif-ayan)
- 🐙 [GitHub](https://github.com/akifayn)
