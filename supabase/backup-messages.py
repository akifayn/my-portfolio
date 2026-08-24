# -*- coding: utf-8 -*-
"""
messages tablosunu (iletişim formu gönderileri) yerel bir JSON dosyasına yedekler.
Bu veri setup.sql'de değil, sadece canlı veritabanında var — o yüzden ücretsiz
Supabase planında (otomatik yedekleme olmadığı için) tek koruma bu script'tir.

Kullanım:
    python supabase/backup-messages.py

Gereksinim: .env.local içinde SUPABASE_DB_URL tanımlı olmalı.
Çıktı: supabase/backups/messages-<tarih-saat>.json (bu klasör Git'e eklenmez).
"""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import psycopg
from psycopg.rows import dict_row

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / ".env.local"
BACKUP_DIR = ROOT / "supabase" / "backups"


def read_db_url() -> str:
    if not ENV_FILE.exists():
        sys.exit(".env.local bulunamadı. Önce SUPABASE_DB_URL ekleyin.")
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("SUPABASE_DB_URL="):
            url = line.split("=", 1)[1].strip().strip('"').strip("'")
            if url:
                return url
    sys.exit(".env.local içinde SUPABASE_DB_URL yok.")


def main() -> None:
    BACKUP_DIR.mkdir(exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    out_file = BACKUP_DIR / f"messages-{stamp}.json"

    with psycopg.connect(read_db_url(), row_factory=dict_row) as conn:
        with conn.cursor() as cur:
            cur.execute("select * from public.messages order by created_at")
            rows = cur.fetchall()

    out_file.write_text(
        json.dumps(rows, default=str, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"{len(rows)} mesaj yedeklendi: {out_file}")


if __name__ == "__main__":
    main()
