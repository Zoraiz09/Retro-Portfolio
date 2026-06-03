from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(viewport={"width": 1280, "height": 950})
    page.goto("http://localhost:5174/")
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(1200)
    page.screenshot(path="screenshots/home-hero.png")
    print("shot home-hero")
    browser.close()
