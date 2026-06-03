#nebula — Python TCP / Tkinter

A complete client–server instant-messaging system built for the Computer
Networks semester project. Pure Python standard library — no `pip install`
required.

```
┌──────────┐       TCP / framed JSON       ┌──────────┐
│ client.py│  ◄──────────────────────────► │ server.py│
│ (Tkinter)│        port 5555 (def.)       │  (multi- │
└──────────┘                               │ threaded)│
                                            └──────────┘
```

Features:
* Length-prefix framed JSON protocol on top of TCP (handles partial reads).
* Multi-threaded server — one daemon thread per connected client, shared
  client table guarded by a `threading.Lock`.
* 1-to-1 (direct) and group (broadcast) messaging.
* Username login with uniqueness check.
* Real-time online-user list pushed to every client on join / leave.
* Polished Tkinter GUI: dark theme, message bubbles, sidebar, send-mode
  toggle, queue-bridged thread-safety.
* File + console logging on the server.

---

## 1. Prerequisites

* **Python 3.8 or newer** (only the standard library is used).
  * On macOS install with `brew install python-tk` if `tkinter` is missing.
  * On Linux install with `sudo apt install python3-tk` (Debian/Ubuntu) or
    `sudo dnf install python3-tkinter` (Fedora).
  * On Windows the official installer ships with Tkinter — nothing extra.

Verify with:

```bash
python --version          # >= 3.8
python -c "import tkinter; print('tk ok')"
```

---

## 2. Project layout

```
im_project/
├── protocol.py        # length-prefix framed JSON (send_msg / recv_msg)
├── server.py          # TCP server, accept-loop + per-client threads
├── client.py          # Tkinter GUI client
├── cli_client.py      # tiny CLI client for testing
├── README.md          # this file
├── REPORT.md          # technical report (rubric sections)
├── logs/              # auto-created; server.log lives here
└── screenshots/       # demo screenshots go here
```

---

## 3. Running on a single machine

Open three terminals.

**Terminal 1 — server**

```bash
cd im_project
python server.py
# 15:10:44 [INFO ] LISTEN 0.0.0.0:5555  (Ctrl+C to stop)
```

**Terminal 2 — first GUI client**

```bash
python client.py
# Login dialog → Server IP: 127.0.0.1, Port: 5555, Username: alice
```

**Terminal 3 — second GUI client**

```bash
python client.py
# Login dialog → Server IP: 127.0.0.1, Port: 5555, Username: bob
```

Pick the other user from the sidebar (the radio flips to **Direct**
automatically) and start chatting. Switch the radio back to **Group** to
broadcast to everyone.

For a third client (group-chat demo) just open a fourth terminal and
`python client.py` again.

---

## 4. Running across two machines on the same Wi-Fi / LAN

### 4.1 Find the server machine's LAN IP

| OS | Command |
|----|---------|
| **Windows** | `ipconfig` — look for "IPv4 Address" under the Wi-Fi or Ethernet adapter (typically `192.168.x.x` or `10.x.x.x`). |
| **macOS** | `ipconfig getifaddr en0` (Wi-Fi) or `ipconfig getifaddr en1` (Ethernet). |
| **Linux** | `hostname -I` (first token), or `ip -4 addr show` and pick the address on your active interface. |

Example: server machine reports `192.168.1.42`.

### 4.2 Start the server (machine A)

```bash
python server.py             # binds 0.0.0.0:5555 by default
```

### 4.3 Start a client (machine B)

```bash
python client.py
# Server IP: 192.168.1.42
# Port:      5555
# Username:  bob
```

> Both machines must be on the same network *and* the server-machine
> firewall must allow incoming connections on the chosen TCP port — see
> Troubleshooting below.

---

## 5. Custom host / port

The server takes optional flags:

```bash
python server.py --host 0.0.0.0 --port 9000
```

Then connect with `client.py` and enter port `9000` in the login dialog.

---

## 6. CLI client (for quick testing)

```bash
python cli_client.py alice                         # localhost:5555
python cli_client.py bob   --host 192.168.1.42     # remote server
```

Once connected:

| Command | Effect |
|---------|--------|
| `/to bob hi there`     | direct message to user `bob`            |
| `/all hello everyone`  | broadcast to all other connected users  |
| `/quit`                | clean disconnect and exit                |

This is the same wire protocol the GUI uses — useful for sanity-checking
the server in isolation.

---

## 7. Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| `OSError: [Errno 98] Address already in use` on server start | A previous server is still running, **or** the kernel hasn't released the port. The server already sets `SO_REUSEADDR`; if you still see this, run `ss -ltnp \| grep 5555` (Linux) / `netstat -ano \| findstr 5555` (Windows) and stop the holding process, or pick another port with `--port`. |
| Login dialog: *"Could not reach 192.168.x.x:5555"* | Wrong IP, server not started, or **firewall is blocking the port**. On Windows: *Windows Defender Firewall → Allow an app → python.exe → check Private network*. On macOS: *System Settings → Network → Firewall → Options*. On Linux: `sudo ufw allow 5555/tcp`. |
| *"username taken"* error | Pick a different username — the server enforces uniqueness. |
| *"user 'x' is offline"* shown after sending a direct message | The recipient is not currently logged in. Use the sidebar list to pick someone who is. |
| GUI is unresponsive while typing | Should never happen — all network I/O lives in a daemon thread and is queue-bridged to the Tk main thread. If it does, capture `logs/server.log` and check the server console output. |
| `tkinter` not found | Install OS-level Tk bindings: see Prerequisites above. |
| Two machines on the same Wi-Fi can't connect | Many home routers enable **AP / wireless isolation** which blocks client-to-client traffic. Either disable AP isolation in the router admin panel, or connect both machines via Ethernet. |
| Want to expose the server over the public internet | Use SSH port-forwarding (`ssh -R 5555:localhost:5555 ...`) or a tunnel like `ngrok tcp 5555` rather than poking holes in your home router. |

---

## 8. Logs

The server writes timestamped events to both stdout and
`im_project/logs/server.log`:

```
15:14:57 [INFO ] LISTEN 0.0.0.0:5555  (Ctrl+C to stop)
15:14:57 [INFO ] CONN   127.0.0.1:63079
15:14:57 [INFO ] LOGIN  alice from 127.0.0.1:63079
15:14:57 [INFO ] MSG    alice -> bob : hello bob
15:14:57 [INFO ] GROUP  bob -> *(1) : hi all
15:14:57 [INFO ] LOGOUT alice
```

The same file is the easiest source of evidence for the *Testing* section
of the report.

---

## 9. Screenshots

Capture three images and save them as PNGs into `screenshots/` for the
report appendix:

1. `01_server_console.png` — server terminal showing log output during a
   live session (multiple LOGIN / MSG / GROUP / LOGOUT lines).
2. `02_one_to_one_chat.png` — two GUI windows side-by-side mid-conversation.
3. `03_group_chat_three_clients.png` — three GUI windows broadcasting in
   group mode.

Suggested capture tool: **Win + Shift + S** on Windows, **Cmd + Shift + 4**
on macOS, `gnome-screenshot -a` on Linux.

---

## 10. Stopping everything

* On any GUI window — close it, `Ctrl+W`, or click ✕. The client sends a
  `DISCONNECT` packet; the server logs `LOGOUT <user>` and broadcasts an
  updated user list to everyone else.
* On the server — `Ctrl+C`. All daemon threads die with the main process.
