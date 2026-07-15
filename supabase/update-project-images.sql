-- Proje kart görselleri (image_url) güncellemesi
-- Supabase Dashboard → SQL Editor'da çalıştırın.
--
-- GitHub repolarında gerçek uygulama ekran görüntüsü bulunmadığından,
-- şimdilik GitHub'ın her repo için otomatik ürettiği önizleme görselleri
-- (opengraph.githubassets.com) kullanılıyor. Myzoo için repodaki gerçek
-- uygulama görseli kullanıldı.
--
-- Kendi ekran görüntünüzü eklemek için:
--   1. Görseli public/images/projects/ klasörüne koyun (örn: myzoo.png)
--   2. Aşağıdaki ilgili satırda image_url'i '/images/projects/myzoo.png' yapın
--   3. Bu dosyayı SQL Editor'da tekrar çalıştırın (veya Table Editor'dan düzenleyin)

-- Kişisel Portfolyo Sitesi — sitenin kendi ekran görüntüsü
-- (public/images/projects/portfolio.png dosyasını ekleyince görünür;
--  dosya yokken kartta otomatik yedek görsel gösterilir)
update public.projects
set image_url = '/images/projects/portfolio.png'
where id = 'b854855e-ebc4-4e01-bb99-28c52a9026a7';

-- Röntgenden Zatürre Tespiti — Flask arayüzü ekran görüntüsü gelene kadar
-- GitHub önizleme kartı kullanılıyor
update public.projects
set image_url = 'https://opengraph.githubassets.com/1/akifayn/pneumonia-detection-deep-learning'
where id = 'b5caf497-f419-45c4-958d-91e4e6917667';

-- Zehirli Yılan Sınıflandırma — PDF rapordan üretilen kolaj
-- (veri örneği + model karşılaştırma tablosu + eğitim eğrileri)
update public.projects
set image_url = '/images/projects/snake-classification.png'
where id = 'c40a9e92-ac68-4250-b8ae-5db7b41ec348';

-- Mantar Sınıflandırma — notebook çıktılarından üretilen kolaj
-- (model doğruluk karşılaştırması + öznitelik önem grafiği)
update public.projects
set image_url = '/images/projects/mushroom-classification.png'
where id = 'd6f0a4d4-6e4d-4649-a503-19e4918fcf2c';

-- Myzoo Mobil Uygulaması — repodaki uygulama görseli
update public.projects
set image_url = 'https://raw.githubusercontent.com/akifayn/Myzoo-App/main/assets/images/zoo-header.png'
where id = '3919cb27-7bd6-414e-b5ef-f4e28a1a6a95';

-- IoT Robotik Tutucu — PDF rapordaki gerçek cihaz fotoğrafları
update public.projects
set image_url = '/images/projects/iot-gripper.png'
where id = '4879feae-56ee-4dfc-89bb-cb6648fe9e0c';

-- Sıcaklık & Nem Uyarı Sistemi — PDF rapordaki gerçek devre fotoğrafı
update public.projects
set image_url = '/images/projects/temperature-humidity.png'
where id = '2d701ebf-4fad-4979-babb-118dd5fb3148';
