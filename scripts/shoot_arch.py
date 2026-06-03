from playwright.sync_api import sync_playwright
BASE="http://localhost:5175"
with sync_playwright() as p:
    b=p.chromium.launch(headless=True)
    pg=b.new_page(viewport={"width":1366,"height":900}, device_scale_factor=2)
    pg.goto(BASE+"/projects/distributed-storage-system")
    pg.wait_for_load_state("networkidle"); pg.wait_for_timeout(800)
    pg.get_by_text("ARCHITECTURE", exact=True).click()
    pg.wait_for_timeout(900)
    pg.screenshot(path="screenshots/arch_desktop.png", full_page=True)
    # mobile
    m=b.new_page(viewport={"width":390,"height":844}, device_scale_factor=2)
    m.goto(BASE+"/projects/distributed-storage-system")
    m.wait_for_load_state("networkidle"); m.wait_for_timeout(800)
    m.get_by_text("ARCHITECTURE", exact=True).click()
    m.wait_for_timeout(900)
    m.screenshot(path="screenshots/arch_mobile.png", full_page=True)
    b.close()
print("done")
