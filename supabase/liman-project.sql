-- Liman MYS Toolkit projesini ekler (README'sinde gerçek ekran görüntüleri var).
-- Supabase Dashboard > SQL Editor > New query içine yapıştırıp Run ile çalıştır.

insert into public.projects
  (title_tr, title_en, description_tr, description_en, tech_stack, github_url, image_url, is_featured, order_index)
values
  ('Liman MYS Araç Seti', 'Liman MYS Toolkit',
   'HAVELSAN Liman Merkezi Yönetim Sistemi için araç seti: kurulum ve yönetim işlemlerini kolaylaştıran kabuk betikleri.',
   'A toolkit for HAVELSAN Liman Central Management System: shell scripts that streamline setup and administration.',
   array['Shell','Linux','Liman MYS'],
   'https://github.com/akifayn/Liman-MYS-Toolkit',
   'https://github.com/akifayn/HAVELSAN-PROJE/assets/138572294/d6911dbb-6c24-407c-9b97-a99e5bb4a5f7',
   true, 8);
