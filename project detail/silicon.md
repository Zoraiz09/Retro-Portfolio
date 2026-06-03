# SILICON Tomasulo Out-of-Order Execution Simulator

A **cycle-accurate** simulator for a dynamically scheduled processor implementing
**Tomasulo's algorithm with a Reorder Buffer (ROB)**, paired with a single-issue
**in-order baseline** for head-to-head comparison and a **direct-mapped L1
D-cache** for studying memory-system effects.

The project ships in two forms:

1. A **Python simulator** (`src/`) — the reference engine, with a CLI, batch
   runner, unit tests, and matplotlib figure generation.
2. An **interactive web visualizer** (`web/`) — a faithful JavaScript port that
   animates both machines side by side, **cycle by cycle**, so you can *watch*
   why out-of-order execution wins. See **[The Software Simulation](#the-software-simulation-interactive-web-visualizer)**.

Both engines are verified to produce **identical** cycle counts, IPC, cache
hit rates, and branch statistics (see [Correctness & Verification](#correctness--verification)).

---

## Table of Contents

- [What This Demonstrates](#what-this-demonstrates)
- [Repository Layout](#repository-layout)
- [Quick Start](#quick-start)
- [The Software Simulation (Interactive Web Visualizer)](#the-software-simulation-interactive-web-visualizer)
- [The Two Execution Models](#the-two-execution-models)
- [Microarchitecture & Pipeline](#microarchitecture--pipeline)
- [ISA Reference](#isa-reference)
- [Configurable Parameters](#configurable-parameters)
- [Benchmarks & Results](#benchmarks--results)
- [Correctness & Verification](#correctness--verification)
- [Module Reference](#module-reference)
- [Suggested Experiments](#suggested-experiments)
- [Known Limitations / Extensions](#known-limitations--extensions)
- [Team Members](#team-members)

---

## What This Demonstrates

- **CPU organisation** — architectural register file with renaming tags,
  reservation-station pools, a circular reorder buffer, a common data bus, and
  a functional-unit model.
- **A small RISC-style ISA** — `ADD, SUB, ADDI, MUL, DIV, LW, SW, BEQ, BNE, HALT`.
- **Dynamic scheduling** — the classic four-stage Tomasulo pipeline:
  *issue → execute → write-back → commit*.
- **Hazard handling**
  - **RAW** (read-after-write) — resolved by forwarding results over the
    **Common Data Bus (CDB)** and by reading completed-but-uncommitted values
    straight from the ROB at issue time.
  - **WAR / WAW** (false dependencies) — eliminated by **register renaming**
    through ROB tags.
  - **Memory ordering** — **memory disambiguation with store-to-load
    forwarding** keeps loads correct when older stores are still in flight.
- **Cache memory** — a direct-mapped L1 D-cache with hit/miss tracking and a
  miss penalty folded into load/store latency.
- **Performance analysis** — IPC, CPI, cache hit rate, branch misprediction
  rate, and in-order vs. out-of-order speedup, plotted across four benchmarks.

---

## Repository Layout

```
.
├── src/                         # Python reference simulator
│   ├── isa.py                   # Instruction parser, opcode + latency tables
│   ├── register_file.py         # Architectural registers + pending-write tags
│   ├── reservation_station.py   # RS entries/pools, CDB snoop (capture) logic
│   ├── reorder_buffer.py        # Circular ROB: allocate / commit / flush
│   ├── cache.py                 # Direct-mapped L1 (set-associative is a TODO)
│   ├── cdb.py                   # Common Data Bus (broadcast + drain)
│   ├── functional_units.py      # FU contention model (extension hook)
│   ├── tomasulo.py              # Out-of-order engine (4-stage state machine)
│   ├── inorder.py               # In-order single-issue baseline
│   ├── visualizer.py            # Plain-text metrics + cycle-trace printers
│   ├── run_all.py               # Run every trace -> results/summary.csv
│   ├── run_everything.py        # Run all + generate + open all figures
│   ├── plots.py                 # Generate the 6 PNG figures (matplotlib)
│   └── main.py                  # Single-trace CLI entry point
├── web/                         # Interactive browser visualizer (JS port)
│   ├── index.html               # App shell (3 tabs)
│   ├── css/styles.css           # Blueprint/instrument theme
│   ├── js/
│   │   ├── traces.js            # The 4 sample programs (embedded)
│   │   ├── isa.js               # Parser + latencies + cache (port of isa/cache)
│   │   ├── inorder.js           # In-order baseline + per-cycle frames
│   │   ├── tomasulo.js          # Tomasulo + ROB + per-cycle frames & timing
│   │   ├── charts.js            # Dependency-free SVG charts
│   │   └── app.js               # UI controller (tabs, transport, rendering)
│   └── README.md                # Visualizer-specific docs
├── traces/                      # Sample assembly programs
│   ├── simple.asm   dotproduct.asm   fibonacci.asm   matmul.asm
├── tests/test_basic.py          # Smoke + correctness tests
├── results/summary.csv          # Aggregate metrics across all four traces
├── report/figures/              # Auto-generated performance plots (PNG)
├── figures/                     # Copy of the figures kept at the project root
├── CA_report.pdf                # Compiled project report
├── requirements.txt
└── README.md
```

---

## Quick Start

Requires **Python 3.10+**. The simulator core has **no third-party
dependencies**; `matplotlib` (in `requirements.txt`) is only needed to
regenerate figures.

```powershell
# Run one trace: prints in-order vs. OoO metrics + speedup
python -m src.main traces\matmul.asm

# Add --trace to also print the OoO cycle-by-cycle history
python -m src.main traces\dotproduct.asm --trace

# Run every trace and write results/summary.csv (+ a printed table)
python -m src.run_all

# Regenerate the 6 report figures into report/figures/
python -m src.plots

# Run the unit tests
python tests\test_basic.py
```

To launch the **web visualizer**, see the next section.

---

## The Software Simulation (Interactive Web Visualizer)

`web/` is a **zero-install, single-page web app** that runs the *same program*
on both processors and shows, **cycle by cycle**, exactly how out-of-order
execution overlaps work that the in-order machine is forced to serialise. It is
a line-for-line JavaScript port of the Python engine, so what you see on screen
is the real model — not a mock-up.

### Why a separate visualizer?

Text metrics tell you *that* OoO is faster; the visualizer shows you *why*. You
can scrub to any cycle and inspect the live state of the reservation stations,
the reorder buffer, register renaming tags, and the cache — and a unified timing
chart makes the contrast between the two machines immediate.

### Launching it

**Option A — open the file directly (no server):**
the app is built to run from `file://` (classic `<script>` tags, sample programs
embedded inline, no `fetch`). Just double-click:

```
web/index.html
```

**Option B — serve it locally** (nicer URL, recommended):

```powershell
python -m http.server 7331 --directory web
# then open http://localhost:7331
```

### Visual language

The whole UI is colour-coded so the comparison reads at a glance:

| Colour | Machine | Intuition |
|--------|---------|-----------|
| **Warm amber** | In-Order baseline | slow / serial |
| **Cool cyan**  | Tomasulo Out-of-Order | fast / overlapped |

### The three tabs

#### 1. Simulator (the main view)

A control toolbar, two live machine panels, and a timing chart.

- **Program selector** — pick any of the four sample traces. Click **`‹/›
  Edit code`** to open a drawer where you can edit the assembly (or paste your
  own) and press **Assemble & Run**. Parse errors are reported inline.
- **Parameters** — change **ROB size** and **cache** geometry (size, line size,
  miss penalty) and re-run instantly to see the effect.
- **Transport bar** — `⏮ reset`, `◀ step back`, `▶/⏸ play`, `▶▌ step
  forward`, a **speed** slider, and a **scrubber** to jump to any cycle. A live
  `CYCLE n / max` readout sits in the middle. Keyboard: **Space** = play/pause,
  **← / →** = step.
- **In-Order panel (amber)** — the instruction currently executing, the
  architectural register file (changed registers flash), and L1 cache
  hit/miss/rate stats. Because the machine is non-pipelined, a single slow
  instruction visibly freezes everything.
- **Out-of-Order panel (cyan)** —
  - **Reservation Stations** grouped by pool (Add / Mul / Load / Store /
    Branch), each row showing the opcode, its operand values or the `#ROB`
    tags it is still waiting on (`Qj/Qk`), and the remaining execution
    latency. Slots actively executing glow.
  - **Reorder Buffer** as a strip from **head** (oldest, commits next) to tail,
    each cell showing its `#id`, destination, and state (issued / executing /
    ready-with-value).
  - **Register status** — value plus a `#ROB` tag when a register is renamed
    (i.e., waiting on an in-flight producer).
  - **L1 cache & branch** stats, including misprediction count.
- **Instruction timing chart (Gantt)** — one row per *dynamic* instruction, in
  two sections (In-Order, then OoO). Each bar shows the **issue** tick, the
  **execute** span, the **write** tick, and the **commit** tick; for OoO a faint
  segment marks time spent **waiting in a reservation station**. Squashed
  (mispredicted) instructions are dimmed and flagged. A white **playhead**
  tracks the current cycle. This is where the story lands: In-Order is a rigid
  diagonal staircase; OoO packs many bars into the same columns.

#### 2. Dashboard

- **Per-benchmark cards** with the headline speedup (amber when OoO loses).
- **Six interactive SVG charts** — speedup, IPC, CPI, total cycles, L1 hit
  rate, and branch misprediction rate (the same set as the report figures).
- **Live ROB-size sweep** — pick a benchmark and see IPC vs. ROB size
  (2 → 64) recomputed in the browser, illustrating diminishing returns.

#### 3. Guide

A plain-language explainer of in-order vs. OoO execution, reservation stations,
the ROB, register renaming, the CDB, the hazard types, and branch handling —
plus "what to look for" notes for each benchmark.

### How the animation is produced

When you press **Assemble & Run**, both JS engines execute the program to
completion and record, for every cycle, a full snapshot of machine state, plus a
per-instruction timing record. Playback simply indexes into those precomputed
frames — so stepping, scrubbing, and playing are all instant and deterministic.

---

## The Two Execution Models

Both machines execute the **same** instruction stream; the only difference is
**when** each instruction is allowed to run.

**In-Order baseline (`src/inorder.py`)** — a straight interpreter. It fetches one
instruction, runs it to completion (charging the full opcode latency plus any
cache-miss penalty to the cycle counter), then fetches the next. There are no
reservation stations, no ROB, and no speculation: **every dependency, and every
slow instruction, stalls the whole machine.** This is the honest baseline a
"simple CPU" would achieve.

**Tomasulo Out-of-Order (`src/tomasulo.py`)** — instructions *issue* in program
order but *execute* as soon as their operands are ready, even past an older
instruction that is still stuck on a slow `MUL`/`DIV` or a cache miss. Results
are broadcast on the CDB and *committed* in program order from the ROB head, so
the architectural state (registers and memory) stays exactly as a sequential
machine would leave it.

---

## Microarchitecture & Pipeline

The OoO engine advances all stages by one simulated cycle per `step()`, executed
in **reverse pipeline order** so a value produced this cycle cannot skip more
than one stage:

```
step():  cycle++  ->  commit()  ->  execute()  ->  issue()  ->  snapshot()
```

**Issue (1 instruction/cycle).** Fetch `program[pc]`; find a free reservation
station for its opcode class and a free ROB slot. If either is missing
(**structural hazard**) the front-end stalls this cycle. Otherwise allocate the
ROB entry, read each source operand — taking the architectural value, a
ready ROB value, or a `#ROB` **tag** if the producer is still in flight — and
record the destination register's new producer tag (**register renaming**).

**Execute.** Each ready RS (`Qj == Qk == None`) ticks its latency counter.
- **`LW`** performs **memory disambiguation** first: it scans older in-flight
  ROB entries; if any older store's address is unresolved it **stalls** (it might
  alias), otherwise it **forwards** the youngest aliasing store's value or reads
  committed memory. The cache is probed and the miss penalty is added to latency.
- **`SW`** publishes its effective address and data into its ROB entry as soon
  as it begins executing, so younger loads can disambiguate/forward against it.
- On completion, the result is placed on the **Common Data Bus**. The CDB is
  drained at the end of the cycle, so every waiting RS latches the value and its
  dependents become ready the *next* cycle (deterministic, order-independent
  wake-ups).

**Commit (1 instruction/cycle).** Retire the ROB head once it is ready. Register
results are written to the architectural file; `SW` performs its
(bounds-checked) memory write here, in order, never speculatively; `HALT` stops
the engine.

**Branches.** The predictor is **always-not-taken**: issue falls through, and a
branch that resolves *taken* at commit is a **misprediction** — all speculative
RS/ROB state is flushed and the front-end is redirected to the target.

**Cache.** Direct-mapped L1: an address maps to exactly one line; a tag mismatch
is a miss that installs the new tag and charges the miss penalty. No eviction
policy is needed (one candidate line per address).

---

## ISA Reference

| Op    | Form                  | Semantics                       |
|-------|-----------------------|---------------------------------|
| ADD   | `ADD Rd, Rs, Rt`      | `Rd = Rs + Rt`                  |
| SUB   | `SUB Rd, Rs, Rt`      | `Rd = Rs - Rt`                  |
| MUL   | `MUL Rd, Rs, Rt`      | `Rd = Rs * Rt`                  |
| DIV   | `DIV Rd, Rs, Rt`      | `Rd = Rs / Rt` (div-by-0 -> 0)  |
| ADDI  | `ADDI Rd, Rs, imm`    | `Rd = Rs + imm`                 |
| LW    | `LW  Rd, offset(Rs)`  | `Rd = MEM[Rs + offset]`         |
| SW    | `SW  Rt, offset(Rs)`  | `MEM[Rs + offset] = Rt`         |
| BEQ   | `BEQ Rs, Rt, label`   | `if (Rs == Rt) PC = label`      |
| BNE   | `BNE Rs, Rt, label`   | `if (Rs != Rt) PC = label`      |
| HALT  | `HALT`                | stop simulation                 |

`R0` is hardwired to `0`. Comments start with `#`. Labels sit on their own line
and end with `:`. Commas are optional (`ADD R1, R2, R3` == `ADD R1 R2 R3`).
Default per-opcode latencies live in `src/isa.py:EXEC_LATENCY`:

| ADD | SUB | ADDI | MUL | DIV | LW | SW | BEQ | BNE |
|-----|-----|------|-----|-----|----|----|-----|-----|
| 2   | 2   | 1    | 10  | 40  | 2* | 2* | 1   | 1   |

\* plus the cache miss penalty on a miss.

---

## Configurable Parameters

Defined in `src/tomasulo.py:TomasuloSimulator.__init__` (and editable live in the
web visualizer's toolbar):

- **ROB size:** 16 entries
- **Reservation stations:** 3 Add, 2 Mul, 2 Load, 2 Store, 1 Branch
- **L1 D-cache:** 256 B, 16 B lines, direct-mapped, 10-cycle miss penalty
- **Branch predictor:** always-not-taken
- **Memory:** 1024 words (bounds-checked)

---

## Benchmarks & Results

From `results/summary.csv` (regenerate with `python -m src.run_all`):

| Benchmark   | Instr | In-order cyc | OoO cyc | Speedup | In IPC | OoO IPC | OoO cache hit | Mispred/Total |
|-------------|------:|-------------:|--------:|--------:|-------:|--------:|--------------:|--------------:|
| simple      |     6 |           17 |      19 |  0.895× |  0.353 |   0.316 |             — |           0/0 |
| dotproduct  |    15 |          108 |      98 |  1.102× |  0.361 |   0.367 |          0.75 |           3/4 |
| fibonacci   |    11 |           71 |      63 |  1.127× |  0.648 |   0.619 |           0.0 |           7/8 |
| matmul      |    49 |          153 |     102 |  1.500× |  0.320 |   0.480 |         0.875 |           0/0 |

**Reading the results**

- **matmul (1.50×)** — many *independent* loads and multiplies; the OoO engine
  fills its reservation stations and overlaps them while in-order trickles
  through one at a time. The best case for out-of-order.
- **fibonacci (1.13×)** — a tight dependency chain (each step needs the
  previous); the ROB fills but little can overlap, so OoO barely helps.
- **simple (0.90×)** — OoO is actually a hair *slower*: on a tiny dependent
  chain the issue/commit overhead isn't repaid. A useful, honest counter-example.
- **dotproduct (1.10×)** — modest overlap inside the loop, with the cache
  warming up on later iterations.

---

## Correctness & Verification

- **Architectural equivalence.** For any program, the OoO engine must leave the
  same register and memory state as the in-order baseline. `tests/test_basic.py`
  asserts this on arithmetic, branches/loops, and load/store round-trips.
- **Store-to-load forwarding** (`test_ooo_store_to_load_forwarding`). A load
  whose store's data is delayed behind a slow `MUL` must still observe the
  stored value (not stale memory). This exercises the memory-disambiguation path
  directly.
- **Common Data Bus.** Result forwarding is routed through `src/cdb.py`
  (broadcast on write-back, drained at end of cycle), giving deterministic,
  RS-order-independent wake-ups.
- **Python ⇆ JavaScript parity.** The web port reproduces the Python cycle
  counts, IPC, cache hit rates, and branch statistics **exactly** for all four
  benchmarks.

Run the suite:

```powershell
python tests\test_basic.py        # -> "All tests passed."
```

### Sample CLI output

```
Loaded 49 instructions from traces/matmul.asm

=== In-Order Baseline ===
  cycles                 : 153
  instructions_committed : 49
  IPC                    : 0.32
  CPI                    : 3.122
  cache_hit_rate         : 0.893
  cache_hits             : 25
  cache_misses           : 3

=== Tomasulo Out-of-Order ===
  cycles                 : 102
  instructions_committed : 49
  IPC                    : 0.48
  CPI                    : 2.082
  ...

=== Speedup (in-order / out-of-order) ===
  in-order cycles : 153
  ooo cycles      : 102
  speedup         : 1.5x
```

---

## Module Reference

| File | Responsibility |
|------|----------------|
| `src/isa.py` | `Instruction` dataclass, `OpType`, `EXEC_LATENCY`, and `parse_program()` (comments, labels, operand forms). |
| `src/register_file.py` | Architectural values + per-register pending-write tags (`status`); `R0` hardwired to 0. |
| `src/reservation_station.py` | `RSEntry` (operands `Vj/Vk`, tags `Qj/Qk`, latency, resolved load value) and pools with CDB `capture()`. |
| `src/reorder_buffer.py` | Fixed-size circular ROB: `allocate / head_entry / commit / flush`. |
| `src/cdb.py` | Common Data Bus: `broadcast()` / `drain()`. |
| `src/cache.py` | `DirectMappedCache` (working) and a `SetAssociativeCache` stub (extension). |
| `src/functional_units.py` | `FunctionalUnit` pool for modelling FU contention (extension hook). |
| `src/tomasulo.py` | The OoO engine: issue/execute/write-back/commit, renaming, disambiguation, branch flush, metrics. |
| `src/inorder.py` | The non-pipelined in-order baseline. |
| `src/visualizer.py` | Plain-text metrics, speedup, and cycle-trace printers. |
| `src/main.py` / `run_all.py` / `run_everything.py` / `plots.py` | CLI, batch CSV, all-in-one runner, and figure generation. |
| `web/js/*.js` | JavaScript port of the above + the interactive UI (see [the visualizer section](#the-software-simulation-interactive-web-visualizer)). |

---

## Suggested Experiments

1. **In-order vs. OoO speedup** across all four traces (done — see the table).
2. **ROB size sweep** (2 → 64): where do diminishing returns begin? Plot IPC vs.
   ROB size. *(Available live in the visualizer's Dashboard.)*
3. **Cache geometry sweep** — vary `DirectMappedCache` size/line on
   `dotproduct.asm`; plot hit rate vs. cache size.
4. **Branch predictor comparison** — implement static / 1-bit / 2-bit / gshare
   predictors and chart misprediction rates on `fibonacci.asm`.
5. **Issue-width sweep** — extend `issue()` to dispatch two instructions per
   cycle and measure the IPC gain.

---

## Known Limitations / Extensions

Implemented since the first cut: **CDB-routed forwarding** and **memory
disambiguation with store-to-load forwarding** (both engines), plus the
interactive cycle-by-cycle visualizer that supersedes the old text trace.

Open extension work:

- [ ] Replace always-not-taken with 2-bit / gshare / tournament predictors
      (`src/tomasulo.py:commit`).
- [ ] Implement the set-associative cache with LRU/FIFO/Random replacement
      (`src/cache.py:SetAssociativeCache`).
- [ ] Wire `FunctionalUnit` instances into `tomasulo.py` to model FU contention
      separately from RS occupancy.
- [ ] Add a multi-issue front-end (issue width = 2) and re-measure IPC.
- [ ] Replace the full speculative flush with selective ROB rollback past a
      mispredicted branch.

---

## Team Members
