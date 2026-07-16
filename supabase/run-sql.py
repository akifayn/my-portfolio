# -*- coding: utf-8 -*-
"""
setup.sql'i (veya verilen SQL dosyasını) doğrudan Supabase veritabanında çalıştırır.

Kullanım:
    python supabase/run-sql.py                  # setup.sql'i çalıştırır
    python supabase/run-sql.py baska-dosya.sql  # istenen dosyayı çalıştırır

Gereksinim: .env.local içinde SUPABASE_DB_URL tanımlı olmalı.
Bağlantı adresi: Supabase Dashboard → Connect → Session pooler URI
(Şifre bu dosyada veya çıktıda asla görünmez; .env.local Git'e eklenmez.)
"""
import sys
from pathlib import Path

import psycopg

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env.local"


def read_db_url() -> str:
    if not ENV_FILE.exists():
        sys.exit(".env.local bulunamadı. Önce SUPABASE_DB_URL ekleyin.")
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("SUPABASE_DB_URL="):
            url = line.split("=", 1)[1].strip().strip('"').strip("'")
            if url:
                return url
    sys.exit(
        ".env.local içinde SUPABASE_DB_URL yok.\n"
        "Supabase Dashboard → Connect → Session pooler URI'sini kopyalayıp\n"
        ".env.local dosyasına şu satırı ekleyin:\n"
        "SUPABASE_DB_URL=postgresql://postgres.xxxx:SIFRE@aws-x-region.pooler.supabase.com:5432/postgres"
    )


def main() -> None:
    sql_file = ROOT / "supabase" / (sys.argv[1] if len(sys.argv) > 1 else "setup.sql")
    if not sql_file.exists():
        sys.exit(f"SQL dosyası bulunamadı: {sql_file}")

    sql = sql_file.read_text(encoding="utf-8")
    print(f"Çalıştırılıyor: {sql_file.name} ({len(sql.splitlines())} satır)")

    with psycopg.connect(read_db_url()) as conn:
        with conn.cursor() as cur:
            cur.execute(sql)
        conn.commit()

    print("Tamamlandı — tüm komutlar tek işlemde (transaction) uygulandı.")


if __name__ == "__main__":
    main()
