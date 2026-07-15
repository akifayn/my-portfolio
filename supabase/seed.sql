-- Portfolyo başlangıç verileri
-- Supabase Dashboard > SQL Editor > New query içine yapıştırıp Run ile çalıştır.

-- ============ GITHUB PROJELERİ ============
insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, is_featured, order_index)
values
  ('Röntgenden Zatürre Tespiti', 'Pneumonia Detection from X-rays',
   'RSNA veri seti üzerinde derin öğrenme ile göğüs röntgenlerinden zatürre tespiti.',
   'Detecting pneumonia from chest X-rays using deep learning on the RSNA dataset.',
   array['Python','Deep Learning','Computer Vision'],
   'https://github.com/akifayn/pneumonia-detection-deep-learning', true, 2),

  ('Zehirli Yılan Sınıflandırma', 'Venomous Snake Classification',
   'ResNet50, VGG16 ve MobileNetV2 ile transfer öğrenme kullanarak zehirli yılan sınıflandırması.',
   'Venomous snake classification using transfer learning with ResNet50, VGG16 and MobileNetV2.',
   array['Python','TensorFlow','Transfer Learning'],
   'https://github.com/akifayn/snake-classification', false, 3),

  ('Mantar Sınıflandırma', 'Mushroom Classification',
   'Random Forest, XGBoost, SVM ve KNN modelleriyle yenilebilir/zehirli mantar sınıflandırması.',
   'Edible vs poisonous mushroom classification using Random Forest, XGBoost, SVM and KNN.',
   array['Python','scikit-learn','XGBoost'],
   'https://github.com/akifayn/mushroom-classification', false, 4),

  ('Myzoo Mobil Uygulaması', 'Myzoo Mobile App',
   'React Native ve Expo ile geliştirilen hayvanat bahçesi uygulaması: hayvan bilgileri, etkinlikler, harita ve kullanıcı profilleri.',
   'A zoo mobile app built with React Native and Expo: animal info, events, map and user profiles.',
   array['React Native','Expo','JavaScript'],
   'https://github.com/akifayn/Myzoo-App', true, 5),

  ('IoT Robotik Tutucu', 'IoT Robotic Gripper',
   'Wi-Fi üzerinden kontrol edilen robotik tutucu projesi.',
   'A Wi-Fi controlled robotic gripper project.',
   array['C++','ESP8266','IoT'],
   'https://github.com/akifayn/IoT-Gripper', false, 6),

  ('Sıcaklık & Nem Uyarı Sistemi', 'Temperature & Humidity Alert System',
   'ESP8266 ve DHT11 ile sıcaklık/nem takibi: LCD ekran, eşik aşımında buzzer/LED uyarısı ve Blynk entegrasyonu.',
   'Temperature and humidity monitoring with ESP8266 and DHT11: LCD display, buzzer/LED alerts above threshold, and Blynk integration.',
   array['C++','ESP8266','Blynk'],
   'https://github.com/akifayn/TemperatureHumidityWarning', false, 7);

-- ============ YENİ BECERİLER ============
insert into public.skills (name, category, level, order_index) values
  ('Python',           'backend',  4, 4),
  ('Machine Learning', 'other',    3, 1),
  ('Deep Learning',    'other',    3, 2),
  ('C++ / Arduino',    'other',    2, 3),
  ('React Native',     'frontend', 3, 4);
