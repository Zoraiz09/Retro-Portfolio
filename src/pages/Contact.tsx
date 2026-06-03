import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Page, Container } from "../components/Layout";
import { Tag, Reveal } from "../components/ui";
import { riseItem, staggerParent } from "../components/motion";
import { profile } from "../lib/data";

const channels = [
  { label: "EMAIL", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GITHUB", value: profile.githubHandle, href: profile.github },
  { label: "LINKEDIN", value: profile.linkedinHandle, href: profile.linkedin },
];

// Web3Forms access key — set VITE_WEB3FORMS_KEY in your .env (see .env.example).
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

const field =
  "w-full border-2 border-ink bg-cream px-3.5 py-2.5 font-mono text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:shadow-brutal-sm disabled:opacity-50";
const label = "font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botcheck: "" });

  const sent = status === "sent";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.botcheck) return; // honeypot tripped — silently drop

    if (!ACCESS_KEY) {
      setError("Contact channel not configured. Use the direct channels on the right.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      // FormData (not JSON) keeps this a CORS "simple request" — no preflight.
      const body = new FormData();
      body.append("access_key", ACCESS_KEY);
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("subject", `[Portfolio] ${form.subject}`);
      body.append("message", form.message);
      body.append("from_name", `${form.name} (Portfolio Contact)`);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
      } else {
        setError(data.message || "Transmission failed. Try the direct channels on the right.");
        setStatus("error");
      }
    } catch {
      setError("Network error — could not reach the uplink. Try again or use a direct channel.");
      setStatus("error");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", subject: "", message: "", botcheck: "" });
    setStatus("idle");
    setError("");
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Page>
      <Container className="py-12 sm:py-16">
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={riseItem}>
            <Tag dot="bg-coral" className="text-ink/60">
              NEW_MESSAGE // SECURE_CHANNEL
            </Tag>
            <h1 className="display mt-4 text-5xl sm:text-6xl">
              CONTACT TERMINAL
              <br />
              <span className="italic text-rust">— MESSAGE UPLINK</span>
            </h1>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
            {/* form */}
            <motion.div variants={riseItem} className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream">
                  uplink_form.exe
                </span>
                <span className="font-mono text-[10px] text-mint">● SECURE</span>
              </div>

              {sent ? (
                <div className="grid place-items-center p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className="grid h-16 w-16 place-items-center border-2 border-ink bg-mint shadow-brutal"
                  >
                    <span className="font-display text-3xl font-900">✓</span>
                  </motion.div>
                  <h3 className="display mt-6 text-2xl">TRANSMISSION SENT</h3>
                  <p className="mt-2 max-w-xs font-mono text-sm text-ink/65">
                    Message delivered to {profile.name.split(" ")[0]}'s inbox. Expect a reply within 48 hours,{" "}
                    {form.name || "operator"}.
                  </p>
                  <button onClick={resetForm} className="btn-ghost mt-6">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  {/* honeypot — hidden from humans, catches bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    checked={!!form.botcheck}
                    onChange={(e) => setForm((f) => ({ ...f, botcheck: e.target.checked ? "1" : "" }))}
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label}>Sender Identity</label>
                      <input required disabled={status === "sending"} value={form.name} onChange={set("name")} placeholder="Your full name" className={`${field} mt-2`} />
                    </div>
                    <div>
                      <label className={label}>Digital Address</label>
                      <input required type="email" disabled={status === "sending"} value={form.email} onChange={set("email")} placeholder="you@domain.com" className={`${field} mt-2`} />
                    </div>
                  </div>
                  <div>
                    <label className={label}>Transmission Subject</label>
                    <input required disabled={status === "sending"} value={form.subject} onChange={set("subject")} placeholder="Project inquiry / collab / hello" className={`${field} mt-2`} />
                  </div>
                  <div>
                    <label className={label}>Payload // Message</label>
                    <textarea required disabled={status === "sending"} value={form.message} onChange={set("message")} rows={5} placeholder="Type your message here…" className={`${field} mt-2 resize-none`} />
                  </div>

                  {status === "error" && (
                    <p className="border-2 border-rust bg-rust/10 px-3 py-2 font-mono text-[11px] text-rust">
                      ✕ {error}
                    </p>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-coral w-full disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "sending" ? "◌ Transmitting…" : "▲ Send Transmission"}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* side panels */}
            <div className="space-y-5">
              <motion.div variants={riseItem} className="panel bg-mustard p-6 text-ink">
                <Tag className="text-ink/60">LOCATION_STATUS</Tag>
                <div className="relative mt-4 grid h-28 place-items-center overflow-hidden border-2 border-ink bg-steel">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(244,241,232,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(244,241,232,.2) 1px,transparent 1px)",
                      backgroundSize: "16px 16px",
                    }}
                  />
                  <span className="relative font-mono text-xs uppercase tracking-[0.2em] text-cream">
                    <span className="mr-2 inline-block h-2 w-2 animate-blink bg-coral align-middle" />
                    {profile.location}
                  </span>
                </div>
                <div className="mt-4 space-y-2 font-mono text-[11px]">
                  <Row k="LOCAL TIME" v="GMT+5" />
                  <Row k="TIMEZONE" v="PKT" />
                  <Row k="RESPONSE" v="< 48 HRS" />
                </div>
              </motion.div>

              <motion.div variants={riseItem} className="panel p-6">
                <Tag className="text-ink/50">DIRECT_CHANNELS</Tag>
                <ul className="mt-4 space-y-2.5">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between border-2 border-ink bg-paper px-3 py-2.5 shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal hover:bg-sky"
                      >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink/55">
                          {c.label}
                        </span>
                        <span className="font-mono text-xs font-bold">{c.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* terminal log */}
          <Reveal className="mt-8">
            <div className="border-2 border-ink bg-[#101820] p-4 font-mono text-[11.5px] leading-relaxed text-mint/90 shadow-brutal">
              <p><span className="text-cream/40">[sys]</span> Establishing secure uplink to {profile.name}…</p>
              <p><span className="text-cream/40">[sys]</span> Handshake complete. Channel encrypted.</p>
              <p><span className="text-mustard">[ready]</span> Awaiting transmission <span className="animate-blink">▋</span></p>
            </div>
          </Reveal>
        </motion.div>
      </Container>
    </Page>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-ink/20 pb-1.5">
      <span className="uppercase tracking-[0.16em] text-ink/55">{k}</span>
      <span className="font-bold">{v}</span>
    </div>
  );
}
