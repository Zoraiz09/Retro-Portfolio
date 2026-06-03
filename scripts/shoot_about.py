from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:5174/about")
    page.wait_for_load_state("networkidle")
    # scroll to the WHAT I BRING heading
    page.evaluate("""() => {
        const els = [...document.querySelectorAll('h2')];
        const t = els.find(e => e.textContent.includes('WHAT I'));
        if (t) t.scrollIntoView({block:'start'});
    }""")
    page.wait_for_timeout(900)
    page.screenshot(path="screenshots/about-pillars.png")
    print("shot about-pillars")
    browser.close()
