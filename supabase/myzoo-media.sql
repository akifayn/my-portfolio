-- Myzoo projesine galeri görselleri ve tanıtım videosu ekler.
-- Önce projects tablosuna genel amaçlı medya kolonları eklenir (tüm projeler kullanabilir).
-- Supabase Dashboard > SQL Editor > New query içine yapıştırıp Run ile çalıştır.
-- Not: Şema değiştiği için sonrasında `supabase gen types typescript` çalıştırılmalı
-- (src/types/database.types.ts elle güncellendi, çıktı aynı olmalı).

alter table public.projects
  add column if not exists gallery_urls text[] default '{}',
  add column if not exists video_url text;

-- Myzoo Mobil Uygulaması — uygulama içi ekran görüntüleri + demo videosu
-- (dosyalar public/images/projects/myzoo/ altında, siteyle birlikte deploy edilir)
update public.projects
set
  -- kart kapağı: repodaki yatay header görseli (ekran görüntüleri dikey olduğu için 16:9 karta uymaz)
  image_url = 'https://raw.githubusercontent.com/akifayn/Myzoo-App/main/assets/images/zoo-header.png',
  gallery_urls = array[
    '/images/projects/myzoo/01-login.jpeg',
    '/images/projects/myzoo/02-home.jpeg',
    '/images/projects/myzoo/03-menu.jpeg',
    '/images/projects/myzoo/04-animals.jpeg',
    '/images/projects/myzoo/05-search.jpeg'
  ],
  video_url = '/images/projects/myzoo/myzoo-demo.mp4'
where id = '3919cb27-7bd6-414e-b5ef-f4e28a1a6a95';
