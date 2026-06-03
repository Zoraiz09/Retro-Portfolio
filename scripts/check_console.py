import io
from playwright.sync_api import sync_playwright
BASE="http://localhost:5175"
routes=["/","/about","/projects","/startup","/contact","/nope-404"]
errs=[]
with sync_playwright() as p:
    b=p.chromium.launch(headless=True); pg=b.new_page()
    pg.on("console", lambda m: errs.append((m.type,m.text)) if m.type in ("error","warning") else None)
    pg.on("pageerror", lambda e: errs.append(("pageerror",str(e))))
    for r in routes:
        pg.goto(BASE+r); pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(500)
    b.close()
with io.open("scripts/console.txt","w",encoding="utf-8") as f:
    f.write(f"ISSUES: {len(errs)}\n")
    for t,m in errs: f.write(f"[{t}] {m[:200]}\n")
