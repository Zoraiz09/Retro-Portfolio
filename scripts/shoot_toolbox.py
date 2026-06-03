from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1280, "height": 900})
    page.goto("http://localhost:5174/")
    page.wait_for_load_state("networkidle")
    page.evaluate("""() => {
        const h = [...document.querySelectorAll('h2')].find(e => e.textContent.includes('TOOL'));
        if (h) window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 140);
    }""")
    page.wait_for_timeout(900)
    page.screenshot(path="screenshots/toolbox.png")
    print("shot toolbox")
    browser.close()
