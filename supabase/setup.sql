-- ═══════════════════════════════════════════════════════════════════════════
-- PORTFOLYO VERİTABANI KURULUM SCRIPTI
-- ═══════════════════════════════════════════════════════════════════════════
-- Tüm bölümler tek seferde çalıştırılabilir:
--   Supabase Dashboard → SQL Editor → New query → bu dosyayı yapıştır → Run
-- Script idempotenttir: tekrar çalıştırmak hata vermez, mükerrer kayıt oluşturmaz.
-- Son güncelleme: 2026-07-16
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 1: TABLOLAR
-- Ne yapar: projects, skills, messages ve blog_posts tablolarını oluşturur.
-- Tablo zaten varsa dokunmaz (if not exists).
-- ─────────────────────────────────────────────────────────────────────────────

-- 1.1 · projects — portfolyodaki projeler (kart + detay sayfası içeriği)
create table if not exists public.projects (
  id             uuid default gen_random_uuid() primary key,
  title_tr       text not null,
  title_en       text not null,
  description_tr text not null,
  description_en text not null,
  tech_stack     text[] default '{}',
  github_url     text,
  live_url       text,
  image_url      text,
  gallery_urls   text[] default '{}',  -- detay sayfası galerisi
  video_url      text,                 -- detay sayfası tanıtım videosu
  is_featured    boolean default false,
  order_index    integer default 0,
  created_at     timestamptz default now()
);

-- 1.2 · skills — beceri rozetleri (kategoriye göre gruplanır)
create table if not exists public.skills (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  category    text not null, -- 'frontend' | 'backend' | 'devops' | 'other'
  icon_name   text,
  level       integer check (level between 1 and 5),
  order_index integer default 0
);

-- 1.3 · messages — iletişim formu gönderileri (sadece Dashboard'dan okunur)
create table if not exists public.messages (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  subject    text,
  body       text not null,
  is_read    boolean default false,
  created_at timestamptz default now()
);

-- 1.4 · blog_posts — ileride kullanım için blog altyapısı
create table if not exists public.blog_posts (
  id           uuid default gen_random_uuid() primary key,
  slug         text unique not null,
  title_tr     text not null,
  title_en     text not null,
  body_tr      text,
  body_en      text,
  tags         text[] default '{}',
  is_published boolean default false,
  created_at   timestamptz default now()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 2: RLS (ROW LEVEL SECURITY) POLİTİKALARI
-- Ne yapar: Anonim (anon key) erişim kurallarını tanımlar.
--   projects/skills  → herkes okuyabilir, kimse yazamaz
--   messages         → herkes ekleyebilir, kimse okuyamaz
--   blog_posts       → sadece yayınlanmış yazılar okunabilir
-- Yazma işlemleri her zaman Dashboard (service_role) üzerinden yapılır.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.projects   enable row level security;
alter table public.skills     enable row level security;
alter table public.messages   enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "Anyone can read projects" on public.projects;
create policy "Anyone can read projects"
  on public.projects for select using (true);

drop policy if exists "Anyone can read skills" on public.skills;
create policy "Anyone can read skills"
  on public.skills for select using (true);

-- Not: with check (true) yerine temel doğrulama kullanılır; hem Supabase
-- Security Advisor uyarısını giderir hem de spam/kötüye kullanımı sınırlar.
drop policy if exists "Anyone can insert messages" on public.messages;
create policy "Anyone can insert messages"
  on public.messages for insert
  with check (
    char_length(name)  between 1 and 200
    and char_length(email) between 3 and 320
    and position('@' in email) > 1
    and char_length(body)  between 1 and 5000
    and (subject is null or char_length(subject) <= 200)
    and is_read = false
  );

drop policy if exists "Anyone can read published posts" on public.blog_posts;
create policy "Anyone can read published posts"
  on public.blog_posts for select using (is_published = true);


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 3: PROJE KAYITLARI (SEED)
-- Ne yapar: Önce aynı başlıklı mükerrer kayıtları temizler (en eskisi kalır),
-- sonra 8 projeyi ekler. Aynı İngilizce başlıkta kayıt varsa atlar,
-- bu sayede script tekrar çalıştırıldığında mükerrer kayıt oluşmaz.
-- ─────────────────────────────────────────────────────────────────────────────

-- 3.0 · Mükerrer kayıt temizliği: aynı title_en'e sahip kayıtlardan
-- yalnızca en eski (orijinal) olanı tutar, sonradan oluşan kopyaları siler.
delete from public.projects p
using public.projects d
where p.title_en = d.title_en
  and p.created_at > d.created_at;

-- 3.1 · Kişisel Portfolyo Sitesi
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Kişisel Portfolyo Sitesi',
  'Personal Portfolio Website',
  'İki dilli, Supabase destekli, tamamen dinamik portfolyo sitesi. İçerik veritabanından gelir.',
  'A bilingual, fully dynamic portfolio powered by Supabase. Content is served from the database.',
  array['React','TypeScript','Tailwind CSS','Supabase','Vite'],
  null, null, null, '{}', null, true, 1
where not exists (select 1 from public.projects where title_en = 'Personal Portfolio Website');

-- 3.2 · Röntgenden Zatürre Tespiti (içeriği Bölüm 4'te zenginleştirilir)
-- Not: Bölüm 4 başlığı değiştirdiği için kontrol her iki başlığa da bakar;
-- aksi halde script tekrar çalıştırıldığında mükerrer kayıt oluşur.
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Röntgenden Zatürre Tespiti',
  'Pneumonia Detection from X-rays',
  'RSNA veri seti üzerinde derin öğrenme ile göğüs röntgenlerinden zatürre tespiti.',
  'Detecting pneumonia from chest X-rays using deep learning on the RSNA dataset.',
  array['Python','Deep Learning','Computer Vision'],
  'https://github.com/akifayn/pneumonia-detection-deep-learning',
  null, null, '{}', null, true, 2
where not exists (
  select 1 from public.projects
  where title_en in ('Pneumonia Detection from X-rays', 'Pneumonia Detection with Deep Learning')
);

-- 3.3 · Zehirli Yılan Sınıflandırma
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Zehirli Yılan Sınıflandırma',
  'Venomous Snake Classification',
  'ResNet50, VGG16 ve MobileNetV2 ile transfer öğrenme kullanarak zehirli yılan sınıflandırması.',
  'Venomous snake classification using transfer learning with ResNet50, VGG16 and MobileNetV2.',
  array['Python','TensorFlow','Transfer Learning'],
  'https://github.com/akifayn/snake-classification',
  null, null, '{}', null, false, 3
where not exists (select 1 from public.projects where title_en = 'Venomous Snake Classification');

-- 3.4 · Mantar Sınıflandırma
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Mantar Sınıflandırma',
  'Mushroom Classification',
  'Random Forest, XGBoost, SVM ve KNN modelleriyle yenilebilir/zehirli mantar sınıflandırması.',
  'Edible vs poisonous mushroom classification using Random Forest, XGBoost, SVM and KNN.',
  array['Python','scikit-learn','XGBoost'],
  'https://github.com/akifayn/mushroom-classification',
  null, null, '{}', null, false, 4
where not exists (select 1 from public.projects where title_en = 'Mushroom Classification');

-- 3.5 · Myzoo Mobil Uygulaması
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Myzoo Mobil Uygulaması',
  'Myzoo Mobile App',
  'React Native ve Expo ile geliştirilen hayvanat bahçesi uygulaması: hayvan bilgileri, etkinlikler, harita ve kullanıcı profilleri.',
  'A zoo mobile app built with React Native and Expo: animal info, events, map and user profiles.',
  array['React Native','Expo','JavaScript'],
  'https://github.com/akifayn/Myzoo-App',
  null,
  'https://raw.githubusercontent.com/akifayn/Myzoo-App/main/assets/images/zoo-header.png',
  array['/images/projects/myzoo/01-login.jpeg','/images/projects/myzoo/02-home.jpeg','/images/projects/myzoo/03-menu.jpeg','/images/projects/myzoo/04-animals.jpeg','/images/projects/myzoo/05-search.jpeg'],
  '/images/projects/myzoo/myzoo-demo.mp4',
  true, 5
where not exists (select 1 from public.projects where title_en = 'Myzoo Mobile App');

-- 3.6 · IoT Robotik Tutucu
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'IoT Robotik Tutucu',
  'IoT Robotic Gripper',
  'Wi-Fi üzerinden kontrol edilen robotik tutucu projesi.',
  'A Wi-Fi controlled robotic gripper project.',
  array['C++','ESP8266','IoT'],
  'https://github.com/akifayn/IoT-Gripper',
  null, null, '{}', null, false, 6
where not exists (select 1 from public.projects where title_en = 'IoT Robotic Gripper');

-- 3.7 · Sıcaklık & Nem Uyarı Sistemi
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Sıcaklık & Nem Uyarı Sistemi',
  'Temperature & Humidity Alert System',
  'ESP8266 ve DHT11 ile sıcaklık/nem takibi: LCD ekran, eşik aşımında buzzer/LED uyarısı ve Blynk entegrasyonu.',
  'Temperature and humidity monitoring with ESP8266 and DHT11: LCD display, buzzer/LED alerts above threshold, and Blynk integration.',
  array['C++','ESP8266','Blynk'],
  'https://github.com/akifayn/TemperatureHumidityWarning',
  null, null, '{}', null, false, 7
where not exists (select 1 from public.projects where title_en = 'Temperature & Humidity Alert System');


-- 3.8 · Liman MYS Araç Seti (2026-07-18 eklendi)
-- Görseller GitHub README'sinden indirilip public/images/projects/liman-toolkit/
-- altına kopyalandı; kart görseli Liman web arayüzü ekranıdır.
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, live_url, image_url, gallery_urls, video_url, is_featured, order_index)
select
  'Liman MYS Araç Seti',
  'Liman MYS Toolkit',
  'HAVELSAN Liman Merkezi Yönetim Sistemi için Bash araç seti. Tek komutla Node.js, PHP ve PostgreSQL depolarını ekleyip Liman paketini kurar; kaldırma, yönetici parolası sıfırlama, geçici giriş bilgisi alma ve web arayüzüne doğrudan erişim komutları sunar. Tüm işlemler zaman damgalı olarak log dosyasına kaydedilir.',
  'A Bash toolkit for the HAVELSAN Liman Central Management System. A single command adds the Node.js, PHP and PostgreSQL repositories and installs the Liman package; it also provides commands for removal, admin password reset, retrieving temporary credentials and opening the web interface directly. Every operation is logged with timestamps.',
  array['Bash','Linux','Liman MYS','PostgreSQL'],
  'https://github.com/akifayn/Liman-MYS-Toolkit',
  null,
  '/images/projects/liman-toolkit.png',
  array[
    '/images/projects/liman-toolkit/01-temp-password.png',
    '/images/projects/liman-toolkit/02-initial-setup.png',
    '/images/projects/liman-toolkit/03-add-user.png',
    '/images/projects/liman-toolkit/04-install-complete.png',
    '/images/projects/liman-toolkit/05-web-interface.png',
    '/images/projects/liman-toolkit/06-ip-output.png',
    '/images/projects/liman-toolkit/07-help-command.png',
    '/images/projects/liman-toolkit/08-administrator.png',
    '/images/projects/liman-toolkit/09-password-reset.png',
    '/images/projects/liman-toolkit/10-log-file.jpg'
  ],
  null, true, 8
where not exists (
  select 1 from public.projects
  where title_en in ('Liman MYS Toolkit', 'Liman MYS Araç Seti')
);


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 4: ZATÜRRE PROJESİ — GÖRSELLER, VİDEO VE ZENGİN AÇIKLAMA
-- Ne yapar: Mevcut zatürre kaydını detaylı açıklama, kart görseli,
-- 5 görsellik galeri ve demo videosuyla günceller (2026-07-16 çekimleri).
-- ─────────────────────────────────────────────────────────────────────────────

update public.projects
set
  title_tr       = 'Derin Öğrenme ile Zatürre Tespiti',
  title_en       = 'Pneumonia Detection with Deep Learning',
  description_tr = 'RSNA veri setindeki 14.863 göğüs röntgeni üzerinde 5 derin öğrenme mimarisinin (ResNet50, DenseNet121, EfficientNetB0, MobileNetV2, özel CNN) karşılaştırıldığı proje. İki aşamalı transfer learning ile eğitilen ResNet50 modeli %92.8 doğruluk ve 0.97 ROC AUC değerine ulaştı; Recall >= 0.93 kısıtıyla klinik eşik optimizasyonu yapıldı. En iyi model, PNG/JPG/DICOM destekli gerçek zamanlı bir Flask web uygulaması olarak yayınlandı.',
  description_en = 'A comparative study of 5 deep learning architectures (ResNet50, DenseNet121, EfficientNetB0, MobileNetV2, custom CNN) on 14,863 chest X-rays from the RSNA dataset. The ResNet50 model trained with two-stage transfer learning reached 92.8% accuracy and 0.97 ROC AUC, with a clinical threshold optimized for Recall >= 0.93. The best model is deployed as a real-time Flask web app supporting PNG/JPG/DICOM.',
  tech_stack     = array['Python','TensorFlow','Keras','ResNet50','Flask','Transfer Learning'],
  image_url      = '/images/projects/pneumonia-detection.png',
  gallery_urls   = array[
    '/images/projects/pneumonia-detection/01-home.png',
    '/images/projects/pneumonia-detection/02-pneumonia-result.png',
    '/images/projects/pneumonia-detection/03-normal-result.png',
    '/images/projects/pneumonia-detection/04-confusion-matrix.png',
    '/images/projects/pneumonia-detection/05-roc-curve.png',
    '/images/projects/pneumonia-detection/06-gradcam-pneumonia.png',
    '/images/projects/pneumonia-detection/07-gradcam-normal.png'
  ],
  video_url      = '/images/projects/pneumonia-detection/pneumonia-demo.mp4',
  is_featured    = true
where title_en in ('Pneumonia Detection from X-rays', 'Pneumonia Detection with Deep Learning');


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 4B: IoT GRIPPER — GALERİ VE YOUTUBE VİDEOSU
-- Ne yapar: Gripper kaydına 2 ekran görüntüsü ve YouTube tanıtım videosu ekler.
-- YouTube bağlantıları sitede gömülü oynatıcıyla gösterilir (2026-07-16).
-- ─────────────────────────────────────────────────────────────────────────────

update public.projects
set
  gallery_urls = array[
    '/images/projects/iot-gripper/01-blynk-control.png',
    '/images/projects/iot-gripper/02-gripper-pickup.png'
  ],
  video_url    = 'https://youtu.be/d5sRWF0U2fg',
  image_url    = coalesce(image_url, '/images/projects/iot-gripper.png')
where title_en = 'IoT Robotic Gripper';


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 4C: SICAKLIK & NEM — GALERİ VE YOUTUBE VİDEOSU
-- Ne yapar: Sıcaklık & Nem kaydına 3 ekran görüntüsü (fiziksel kurulum,
-- devre şeması, Proteus + Blynk) ve YouTube tanıtım videosu ekler (2026-07-16).
-- ─────────────────────────────────────────────────────────────────────────────

update public.projects
set
  gallery_urls = array[
    '/images/projects/temperature-humidity/01-hardware-setup.png',
    '/images/projects/temperature-humidity/02-circuit-diagram.png',
    '/images/projects/temperature-humidity/03-proteus-blynk.png'
  ],
  video_url    = 'https://www.youtube.com/watch?v=UFVGz6wSowM',
  image_url    = coalesce(image_url, '/images/projects/temperature-humidity.png')
where title_en = 'Temperature & Humidity Alert System';


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 4D: YILAN & MANTAR SINIFLANDIRMA — KAPAK GÖRSELLERİ
-- Ne yapar: Uygulama arayüzü olmayan bu iki model geliştirme projesine
-- konuyla ilgili kapak görsellerini bağlar (görseller public/ altında mevcut).
-- ─────────────────────────────────────────────────────────────────────────────

update public.projects
set image_url = '/images/projects/snake-classification.png'
where title_en = 'Venomous Snake Classification';

update public.projects
set image_url = '/images/projects/mushroom-classification.png'
where title_en = 'Mushroom Classification';


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 4E: PORTFOLYO SİTESİ — KAPAK GÖRSELİ
-- Ne yapar: Portfolyo projesine sitenin kendi hero ekranından alınan
-- kapak görselini bağlar (2026-07-16 çekimi).
-- ─────────────────────────────────────────────────────────────────────────────

update public.projects
set
  image_url      = '/images/projects/portfolio-website.png',
  -- Çini/İznik göndermesi açıklamadan çıkarıldı (2026-07-18)
  description_tr = 'İki dilli, Supabase destekli, tamamen dinamik portfolyo sitesi. İçerik veritabanından gelir.',
  description_en = 'A bilingual, fully dynamic portfolio powered by Supabase. Content is served from the database.'
where title_en = 'Personal Portfolio Website';


-- ─────────────────────────────────────────────────────────────────────────────
-- BÖLÜM 5: BECERİ KAYITLARI (SEED)
-- Ne yapar: 13 beceriyi ekler. Aynı isimde kayıt varsa atlar.
-- ─────────────────────────────────────────────────────────────────────────────

insert into public.skills (name, category, icon_name, level, order_index)
select 'React', 'frontend', null, 4, 1
where not exists (select 1 from public.skills where name = 'React');

insert into public.skills (name, category, icon_name, level, order_index)
select 'TypeScript', 'frontend', null, 3, 2
where not exists (select 1 from public.skills where name = 'TypeScript');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Tailwind CSS', 'frontend', null, 4, 3
where not exists (select 1 from public.skills where name = 'Tailwind CSS');

insert into public.skills (name, category, icon_name, level, order_index)
select 'React Native', 'frontend', null, 3, 4
where not exists (select 1 from public.skills where name = 'React Native');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Node.js', 'backend', null, 3, 1
where not exists (select 1 from public.skills where name = 'Node.js');

insert into public.skills (name, category, icon_name, level, order_index)
select 'PostgreSQL', 'backend', null, 2, 2
where not exists (select 1 from public.skills where name = 'PostgreSQL');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Supabase', 'backend', null, 3, 3
where not exists (select 1 from public.skills where name = 'Supabase');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Python', 'backend', null, 4, 4
where not exists (select 1 from public.skills where name = 'Python');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Git & GitHub', 'devops', null, 3, 1
where not exists (select 1 from public.skills where name = 'Git & GitHub');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Vercel', 'devops', null, 2, 2
where not exists (select 1 from public.skills where name = 'Vercel');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Machine Learning', 'other', null, 3, 1
where not exists (select 1 from public.skills where name = 'Machine Learning');

insert into public.skills (name, category, icon_name, level, order_index)
select 'Deep Learning', 'other', null, 3, 2
where not exists (select 1 from public.skills where name = 'Deep Learning');

insert into public.skills (name, category, icon_name, level, order_index)
select 'C++ / Arduino', 'other', null, 2, 3
where not exists (select 1 from public.skills where name = 'C++ / Arduino');
