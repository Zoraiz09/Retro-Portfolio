import io
from playwright.sync_api import sync_playwright

out = io.open("scripts/contact_test.txt", "w", encoding="utf-8")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )

    # capture the network response from web3forms
    def on_response(resp):
        if "web3forms" in resp.url:
            try:
                out.write(f"WEB3FORMS HTTP {resp.status}\n")
                out.write("BODY: " + resp.text() + "\n")
            except Exception as e:
                out.write(f"resp read error: {e}\n")

    page.on("response", on_response)
    page.on("console", lambda m: out.write(f"CONSOLE[{m.type}]: {m.text}\n"))

    page.goto("http://localhost:5174/contact")
    page.wait_for_load_state("networkidle")

    page.fill('input[placeholder="Your full name"]', "Browser Test")
    page.fill('input[placeholder="you@domain.com"]', "test@example.com")
    page.fill('input[placeholder="Project inquiry / collab / hello"]', "Contact form live test")
    page.fill('textarea', "Automated browser submission confirming the contact terminal delivers email.")
    page.click('button[type="submit"]')

    page.wait_for_timeout(8000)

    body = page.inner_text("body")
    if "TRANSMISSION SENT" in body:
        out.write("RESULT: SUCCESS\n")
    else:
        out.write("RESULT: NOT SENT\n")
    out.write("PAGE_SNIPPET:\n" + body[:1500] + "\n")
    browser.close()

out.close()
print("done")
