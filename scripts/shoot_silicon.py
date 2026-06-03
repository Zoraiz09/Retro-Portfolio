from playwright.sync_api import sync_playwright

def trigger_reveals(page):
    h = page.evaluate("document.body.scrollHeight")
    y = 0
    while y < h:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(120)
        y += 500
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(300)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    for route, name in [("/projects", "projects"), ("/projects/silicon-ooo-cpu", "silicon-detail")]:
        page.goto("http://localhost:5174" + route)
        page.wait_for_load_state("networkidle")
        trigger_reveals(page)
        page.screenshot(path=f"screenshots/{name}.png", full_page=True)
        print("shot", name)
    browser.close()
