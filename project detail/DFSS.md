Distributed File Storage System (DFSS)
A cloud-like storage platform — think a miniature Dropbox / HDFS — that splits files into chunks, replicates them across multiple storage nodes, detects node failures, and automatically heals lost replicas. Built to demonstrate distributed systems, networking, databases, OS concepts, and full-stack engineering.

        USER → React Client → Master Server → Storage Node 1
                                   │        → Storage Node 2
                              PostgreSQL     → Storage Node 3
                              (metadata)
Features
Requirement	Status	Where
Register / Login (JWT, bcrypt)	✅	master_server/app/api/auth.py
Upload → chunk → replicate	✅	services/storage_service.py
Download → parallel fetch → merge	✅	services/storage_service.py
Delete (chunks + replicas + metadata)	✅	services/storage_service.py
File list + status (available/degraded/lost)	✅	api/files.py
Chunking (AR-1)	✅	configurable CHUNK_SIZE_BYTES
Replication factor 3 (AR-2)	✅	services/node_service.py
Heartbeat monitoring (AR-3)	✅	storage_node/app/heartbeat.py
Node failure detection (AR-4)	✅	services/recovery_service.py
Automatic re-replication (AR-5)	✅	scheduler/monitor.py
Load balancing — emptiest node first (AR-6)	✅	services/node_service.py
Parallel downloads (AR-7)	✅	asyncio.gather in storage_service
SHA-256 integrity verification (AR-8)	✅	utils/checksum.py
Statistics dashboard (AR-9)	✅	api/nodes.py + React Stats
Dockerized (9 containers)	✅	docker-compose.yml
Beyond-spec features
Feature	Status	Where
4-node cluster + live re-replication onto a spare	✅	services/recovery_service.py
Animated cluster topology view (live)	✅	client/.../components/Topology.jsx
Public file sharing (tokenised links, expiry, counts)	✅	api/shares.py + ShareModal
Prometheus metrics + Grafana dashboards	✅	app/metrics.py, monitoring/
AES-256-GCM at-rest encryption (nodes hold ciphertext)	✅	utils/crypto.py + storage_service.py
File versioning (history, restore, per-version delete)	✅	api/files.py + VersionsModal
RBAC — admin/user roles + cluster-wide admin console	✅	api/admin.py + AdminPage
Reed-Solomon erasure coding RS(4,2) — survive 2 at 1.5×	✅	utils/erasure.py + storage_service.py
Tech stack
Master Server — Python 3.12, FastAPI, SQLAlchemy 2, PostgreSQL, JWT, bcrypt, AES-256-GCM (cryptography), Reed-Solomon erasure coding (zfec)
Storage Nodes — Python 3.12, FastAPI (local-disk chunk store)
Client — React 18 + Vite + React Router (Home / Files / Storage Nodes / Admin)
Infra — Docker Compose (PostgreSQL + master + 6 storage nodes + client + Prometheus + Grafana)
Quick start (Docker — recommended)
cp .env.example .env          # adjust JWT_SECRET etc.
docker-compose up --build
Then open:

Client: http://localhost:3000
Master API docs (Swagger): http://localhost:8000/docs
Prometheus: http://localhost:9090
Grafana (admin/admin): http://localhost:3001 → DFSS Cluster Overview
Register an account in the UI, upload a file, and watch the Storage Nodes panel — chunks spread across node1/2/3. Kill a node to see fault tolerance + recovery:

docker-compose stop storage1     # master marks it dead within ~15s
# Downloads keep working (served from replicas); the monitor re-replicates
# the lost copies onto the spare node (node4) to restore the replication
# factor. Watch it happen live in the "Cluster Topology" panel — node1 turns
# red, and chunk counts flow onto the healthy nodes.
docker-compose start storage1     # node rejoins via heartbeat; excess copies pruned
Public file sharing
Click Share on any file to mint a tokenised public link (http://localhost:3000/?s=<token>) with an optional expiry. Anyone with the link can download — no account needed. Revoke anytime; download counts are tracked.

Run the tests
The core data path (upload→download→delete→recovery) is covered by tests that use an in-memory metadata DB and a fake storage cluster — no Docker/Postgres needed:

python -m venv .venv
.venv/Scripts/pip install -r master_server/requirements.txt pytest   # Windows
# source .venv/bin/activate && pip install ...                       # Linux/macOS
python -m pytest tests/ -v
Local dev (without Docker)
You need a running PostgreSQL. Set the POSTGRES_* env vars (see .env.example), then:

# Master
cd master_server && uvicorn app.main:app --reload --port 8000

# Storage nodes (3 terminals, distinct NODE_ID / ports / CHUNK_DIR)
cd storage_node
NODE_ID=node1 NODE_PUBLIC_URL=http://localhost:9001 CHUNK_DIR=./data/node1 \
  MASTER_URL=http://localhost:8000 uvicorn app.main:app --port 9001

# Client
cd client && npm install && npm run dev
Layout
DFSS/
├── master_server/   FastAPI "brain": auth, metadata, chunking, replication, recovery
│   └── app/{api,database,services,scheduler,utils}
├── storage_node/    FastAPI chunk store + heartbeat sender
├── client/          React + Vite dashboard (brutalist UI, live topology, sharing)
├── monitoring/      Prometheus config + Grafana datasource/dashboard provisioning
├── tests/           pytest data-path suite
├── docs/            ARCHITECTURE.md, API.md
└── docker-compose.yml
See docs/ARCHITECTURE.md and docs/API.md for details.