from playwright.sync_api import sync_playwright

BASE = "http://localhost:5175"
ROUTES = {
    "home": "/",
    "about": "/about",
    "projects": "/projects",
    "detail": "/projects/distributed-storage-system",
    "dewy": "/projects/dewy-hydration-tracker",
    "nebula": "/projects/hermes-messenger",
    "cashdash": "/projects/cashdash-exchange",
    "startup": "/startup",
    "contact": "/contact",
}
OUT = "E:/Projects/Portfolio Page/screenshots"

import os
os.makedirs(OUT, exist_ok=True)


def trigger_reveals(page):
    """Scroll the whole page in steps so IntersectionObserver-based reveals fire."""
    height = page.evaluate("document.body.scrollHeight")
    step = 500
    y = 0
    while y < height:
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(120)
        y += step
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(400)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1366, "height": 900}, device_scale_factor=2)
    for name, route in ROUTES.items():
        page.goto(BASE + route)
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(900)
        trigger_reveals(page)
        page.screenshot(path=f"{OUT}/{name}.png", full_page=True)
        print(f"shot {name} -> {route}")

    # also capture a mobile viewport of the home page
    mobile = browser.new_page(viewport={"width": 390, "height": 844}, device_scale_factor=2)
    mobile.goto(BASE + "/")
    mobile.wait_for_load_state("networkidle")
    mobile.wait_for_timeout(900)
    trigger_reveals(mobile)
    mobile.screenshot(path=f"{OUT}/home-mobile.png", full_page=True)
    print("shot home-mobile")

    browser.close()
print("done")
