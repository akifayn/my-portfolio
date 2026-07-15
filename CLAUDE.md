# CLAUDE.md — Kişisel Portfolyo Projesi

Bu dosya hem Claude (AI asistan) hem de geliştirici için proje rehberidir.
Herhangi bir dosyayı düzenlemeden veya yeni kod yazmadan önce bu dosyayı okuyun.

---

## 1. Proje Genel Bakış / Project Overview

**TR:** Muhammet Akif AYAN'In kişisel portfolyo web sitesi. Hakkımda, Projeler ve İletişim bölümlerinden oluşan, Supabase ile tam dinamik, iki dilli (Türkçe/İngilizce) bir Single Page Application.

**EN:** Personal portfolio website for Muhammet Akif AYAN. A fully dynamic, bilingual (Turkish/English) Single Page Application with About, Projects, and Contact sections, powered by Supabase.

**Hedef Kitle / Target Audience:**
- İşe alım uzmanları (HR, recruiters)
- Potansiyel müşteriler ve iş ortakları
- Yazılım topluluğu (GitHub, LinkedIn üzerinden gelenler)

**Mimari Kararlar / Architectural Decisions:**
- Tüm dinamik içerik (projeler, beceriler) Supabase'den çekilir; statik HTML/JSON dosyası kullanılmaz
- Çeviriler `public/locales/` altında JSON dosyalarında tutulur (i18next)
- Form gönderimi doğrudan Supabase `messages` tablosuna yazar; harici e-posta servisi gerekmez
- Sayfa yenileme olmadan dil değişimi desteklenir

---

## 2. Teknoloji Yığını / Tech Stack

| Teknoloji | Versiyon | Gerekçe |
|-----------|----------|---------|
| **React** | 18+ | Bileşen tabanlı UI, büyük ekosistem |
| **Vite** | 5+ | Hızlı HMR, hafif build tooling |
| **TypeScript** | 5+ | Tip güvenliği, Supabase şemasıyla uyum |
| **Tailwind CSS** | 3+ | Utility-first, hızlı prototipleme, kolay responsive |
| **Supabase** | JS Client v2 | PostgreSQL + Auth + RLS + Realtime, ücretsiz tier yeterli |
| **i18next** | latest | React entegrasyonu güçlü, JSON tabanlı çeviri yönetimi |
| **react-i18next** | latest | React hook'ları (`useTranslation`) sağlar |
| **React Router** | v6 | Deklaratif routing, loader/action desteği |
| **Vercel** | — | Otomatik deploy, preview URL'leri, ücretsiz tier |

**Kurulum / Installation:**
```bash
npm create vite@latest my-portfolio -- --template react-ts
cd my-portfolio
npm install @supabase/supabase-js
npm install i18next react-i18next i18next-http-backend i18next-browser-languagedetector
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 3. Supabase Veritabanı Şeması / Database Schema

### 3.1 `projects` Tablosu

```sql
create table public.projects (
  id            uuid default gen_random_uuid() primary key,
  title_tr      text not null,
  title_en      text not null,
  description_tr text not null,
  description_en text not null,
  tech_stack    text[] default '{}',
  github_url    text,
  live_url      text,
  image_url     text,
  gallery_urls  text[] default '{}',  -- detay sayfası galerisi (public/images/projects/ altındaki yollar)
  video_url     text,                 -- detay sayfası tanıtım videosu
  is_featured   boolean default false,
  order_index   integer default 0,
  created_at    timestamptz default now()
);

-- RLS
alter table public.projects enable row level security;
create policy "Anyone can read projects"
  on public.projects for select using (true);
-- INSERT/UPDATE/DELETE yalnızca Supabase Dashboard üzerinden (service_role key)
```

### 3.2 `skills` Tablosu

```sql
create table public.skills (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  category    text not null, -- 'frontend' | 'backend' | 'devops' | 'other'
  icon_name   text,          -- lucide-react veya devicon ikon adı
  level       integer check (level between 1 and 5),
  order_index integer default 0
);

-- RLS
alter table public.skills enable row level security;
create policy "Anyone can read skills"
  on public.skills for select using (true);
```

### 3.3 `messages` Tablosu

```sql
create table public.messages (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  subject    text,
  body       text not null,
  is_read    boolean default false,
  created_at timestamptz default now()
);

-- RLS — Sadece anonim INSERT, kimse SELECT yapamaz
alter table public.messages enable row level security;
create policy "Anyone can insert messages"
  on public.messages for insert with check (true);
-- SELECT, UPDATE, DELETE politikası YOK — Dashboard'dan okunur
```

### 3.4 `blog_posts` Tablosu (İleride Kullanım İçin)

```sql
create table public.blog_posts (
  id          uuid default gen_random_uuid() primary key,
  slug        text unique not null,
  title_tr    text not null,
  title_en    text not null,
  body_tr     text,
  body_en     text,
  tags        text[] default '{}',
  is_published boolean default false,
  created_at  timestamptz default now()
);

-- RLS
alter table public.blog_posts enable row level security;
create policy "Anyone can read published posts"
  on public.blog_posts for select using (is_published = true);
```

---

## 4. Proje Klasör Yapısı / Project Structure

```
my-portfolio/
├── public/
│   └── locales/
│       ├── tr/
│       │   └── translation.json
│       └── en/
│           └── translation.json
├── src/
│   ├── components/        # Yeniden kullanılabilir UI bileşenleri
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillBadge.tsx
│   │   └── ContactForm.tsx
│   ├── pages/             # Route seviyesindeki sayfalar
│   │   ├── HomePage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── ContactPage.tsx
│   ├── hooks/             # Özel React hook'ları
│   │   ├── useProjects.ts
│   │   └── useSkills.ts
│   ├── services/          # Supabase sorgu fonksiyonları (tek sorumluluk)
│   │   ├── projects.service.ts
│   │   ├── skills.service.ts
│   │   └── messages.service.ts
│   ├── lib/
│   │   └── supabase.ts    # Supabase client singleton
│   ├── types/
│   │   └── database.types.ts  # Supabase CLI ile üretilen tipler
│   ├── i18n.ts            # i18next konfigürasyonu
│   ├── App.tsx
│   └── main.tsx
├── .env.local             # GİT'E EKLENMEMELİ — Supabase anahtarları
├── .env.example           # Hangi env var'ların gerektiğini gösterir
├── CLAUDE.md              # Bu dosya
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Adlandırma Kuralları / Naming Conventions

### Dosyalar ve Bileşenler

| Tür | Kural | Örnek |
|-----|-------|-------|
| React bileşenleri | PascalCase | `ProjectCard.tsx` |
| Hook dosyaları | camelCase, `use` prefix | `useProjects.ts` |
| Servis dosyaları | camelCase, `.service.ts` suffix | `projects.service.ts` |
| Sayfa bileşenleri | PascalCase, `Page` suffix | `HomePage.tsx` |
| Tip dosyaları | camelCase, `.types.ts` suffix | `database.types.ts` |

### Çeviri Anahtarları (i18n)

Dot-notation kullanılır, bölüm.alt-bölüm formatında:

```json
{
  "nav.home": "Ana Sayfa",
  "nav.projects": "Projeler",
  "hero.title": "Merhaba, Ben Akif",
  "hero.subtitle": "Full Stack Geliştirici",
  "projects.title": "Projelerim",
  "projects.viewCode": "Kodu Gör",
  "contact.title": "İletişim",
  "contact.send": "Gönder"
}
```

### CSS / Tailwind

- Özel renkler `tailwind.config.js`'de tanımlanır, inline hex kullanılmaz
- Responsive önce mobil: `sm:`, `md:`, `lg:` prefix'leri
- Dark mode: `dark:` prefix ile class-based strateji

---

## 6. Claude İçin Kurallar / Rules for Claude

1. **Dosyayı okumadan düzenleme.** Bir dosyayı değiştirmeden önce her zaman `Read` aracıyla oku.

2. **Aşırı mühendislik yapma.** Tek kullanımlık operasyonlar için yardımcı fonksiyon, soyutlama veya genel çözümler oluşturma. Üç benzer satır, erken soyutlamadan iyidir.

3. **Güvenlik.**
   - `SUPABASE_ANON_KEY` yalnızca public read/insert için kullanılır
   - Hiçbir zaman `service_role` key'i frontend koduna ekleme
   - Tüm tablolarda RLS aktif olmalı
   - Form verilerini client-side sanitize etme — Supabase RLS ve PostgreSQL kısıtlamaları yeterli

4. **i18n zorunluluğu.** Her UI metni `useTranslation()` hook'u ile çeviri anahtarı üzerinden gelmelidir. Bileşenlere hardcode Türkçe veya İngilizce metin yazılmaz.

5. **Services katmanını kullan.** Supabase sorguları direkt bileşen içine yazılmaz; `src/services/` altındaki ilgili servis fonksiyonu üzerinden yapılır.

6. **TypeScript tip güvenliği.** `any` kullanımından kaçın. Supabase tipleri `src/types/database.types.ts`'den import edilir.

7. **Mevcut kod önce.** Yeni bileşen oluşturmadan önce `src/components/` içinde uygun bir şeyin olup olmadığını kontrol et.

8. **Tek sorumluluk.** Her servis dosyası yalnızca bir tabloyla ilgilenir. Her bileşen yalnızca bir şey yapar.

---

## 7. Geliştirici İçin Kurallar / Rules for Developer

### Supabase Dashboard Üzerinden İçerik Yönetimi

- **Proje eklemek:** Supabase Dashboard → Table Editor → `projects` → Insert Row
- **Beceri eklemek:** Supabase Dashboard → Table Editor → `skills` → Insert Row
- **Mesajları okumak:** Supabase Dashboard → Table Editor → `messages` (RLS'den dolayı frontend'den okunamaz)

### Ortam Değişkenleri (.env.local)

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- `.env.local` asla Git'e eklenmez (`.gitignore`'da olmalı)
- `.env.example` boş değerlerle Git'e eklenir, gerekli değişkenleri belgeler
- Vercel'e bu değerler Vercel Dashboard → Settings → Environment Variables'dan eklenir

### Git Workflow

```
main        → production (Vercel'e otomatik deploy)
dev         → geliştirme dalı
feature/*   → yeni özellikler için (örn: feature/blog-section)
fix/*       → hata düzeltmeleri için (örn: fix/contact-form-validation)
```

**Commit Mesaj Formatı (Conventional Commits):**
```
feat: profilphoto bileşeni eklendi
fix: iletişim formu doğrulama hatası giderildi
style: navbar responsive düzeni güncellendi
i18n: blog çevirileri eklendi
chore: bağımlılıklar güncellendi
```

### Çevirileri Güncellemek

1. `public/locales/tr/translation.json` dosyasına Türkçe metni ekle
2. `public/locales/en/translation.json` dosyasına aynı anahtarla İngilizce metni ekle
3. Bileşende `const { t } = useTranslation()` ve `t('anahtar.ismi')` kullan

---

## 8. Geliştirme İş Akışı / Development Workflow

### İlk Kurulum

```bash
# 1. Repo'yu klonla veya Vite projesi oluştur
git clone <repo-url> my-portfolio
cd my-portfolio

# 2. Bağımlılıkları kur
npm install

# 3. Ortam değişkenlerini ayarla
cp .env.example .env.local
# .env.local'ı Supabase proje URL ve anon key ile doldur

# 4. Supabase tablolarını oluştur
# Supabase Dashboard → SQL Editor → Bölüm 3'teki SQL'leri çalıştır

# 5. Geliştirme sunucusunu başlat
npm run dev
```

### npm Komutları

```bash
npm run dev        # Geliştirme sunucusu (localhost:5173)
npm run build      # Production build (dist/ klasörüne)
npm run preview    # Production build'i local'de önizle
npm run typecheck  # TypeScript tip kontrolü (tsc --noEmit)
```

### Supabase TypeScript Tip Üretimi

```bash
# Supabase CLI kurulu olmalı: npm install -g supabase
supabase gen types typescript --project-id <proje-id> \
  > src/types/database.types.ts
```

Şema değişikliklerinde bu komut tekrar çalıştırılmalıdır.

---

## 9. Deployment Talimatları / Deployment Instructions

### Vercel ile Deploy

```bash
# Vercel CLI kur (bir kez)
npm install -g vercel

# İlk deploy (proje bağlama)
vercel

# Production deploy
vercel --prod
```

### Ortam Değişkenleri (Vercel)

Vercel Dashboard → Proje → Settings → Environment Variables:

| Değişken | Ortam |
|----------|-------|
| `VITE_SUPABASE_URL` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Production, Preview, Development |

### Supabase URL Konfigürasyonu

Supabase Dashboard → Authentication → URL Configuration:

- **Site URL:** `https://your-portfolio.vercel.app`

- [ ] `npm run typecheck` hatasız geçiyor
- [ ] Tüm çeviri anahtarları her iki dilde mevcut
- [ ] Supabase RLS politikaları aktif
- [ ] Vercel'de ortam değişkenleri tanımlı
- [ ] `main` branch güncel

---

## 10. Referans Kaynaklar / Reference Resources

| Kaynak | URL |
|--------|-----|
| Supabase Docs | https://supabase.com/docs |
| Supabase JS Client | https://supabase.com/docs/reference/javascript |
| i18next Docs | https://www.i18next.com |
| react-i18next | https://react.i18next.com |
| Vite Docs | https://vitejs.dev/guide |
| Vercel Docs | https://vercel.com/docs |
| React Router v6 | https://reactrouter.com/en/main |
| Tailwind CSS | https://tailwindcss.com/docs |
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook |

---

*Bu dosya proje boyunca güncel tutulmalıdır. Mimari kararlar değiştiğinde bu dosyayı da güncelleyin.*
