# nuxt-app (Chat front-end)

Lightweight Nuxt 3 front-end for the chat/webrtc project. Provides UI, authentication by wallet address, and a Socket.IO-based signaling client used to establish WebRTC peer connections with other users.

## Contents

- pages / components / composables — Nuxt app source
- plugins/socket.client.ts — Socket.IO client and helper createSocketConnection
- store / composables — app state and WebRTC helpers

## Requirements

- Node.js 18+ (Node 20 recommended)
- npm or yarn
- Mac: tested on macOS (development instructions use macOS terminal commands)

## Quickstart (local)

1. From repo root:
   cd nuxt-app

2. Install dependencies:
   npm install
   # or
   yarn

3. Environment (runtime config)
   - This project expects the signaling server at runtime. Provide the server URL via env/runtime config:
     - NUXT_PUBLIC_SIGNALING_URL (e.g. http://localhost:3001)
     - NUXT_PUBLIC_SIGNALING_PATH (default: /ws-path/)
   - Example .env:
     NUXT_PUBLIC_SIGNALING_URL=http://localhost:3001
     NUXT_PUBLIC_SIGNALING_PATH=/ws-path/

4. Run dev server:
   npm run dev
   # or
   yarn dev

5. Open:
   http://localhost:3000

## Build & production

Build:
npm run build
Start:
npm run start

The app uses Nuxt's public runtime config to determine the signaling server endpoint. Ensure NUXT_PUBLIC_SIGNALING_URL is set in your production environment.

## Docker (optional)

Example Dockerfile can be added / used. Basic steps:
docker build -t nuxt-app .
docker run -p 3000:3000 -e NUXT_PUBLIC_SIGNALING_URL=http://host.docker.internal:3001 nuxt-app

Note: When running client and signaling server in containers, adjust CORS and host/ports accordingly.

## Socket & Signaling integration

- Client helper: plugins/socket.client.ts — call createSocketConnection(address, opts) to connect.
- Uses Socket.IO path (default `/ws-path/`) to match signaling-server.
- Authentication uses `auth: { address }` so the server can track online users.
- Events used in the app:
  - onlineUsers — updated list of connected addresses
  - chatRequest / chatResponse — request/accept flow
  - webrtcSignal — SDP / ICE relay
- Ensure the signaling server CORS origin and path match the app runtime config.

## WebRTC notes

- The Nuxt client handles peer-creation, offer/answer exchange and ICE candidate forwarding via the signaling server.
- Media permissions: the browser must grant camera/microphone access.
- If peers cannot connect, check:
  - Signaling server reachable from both clients
  - Correct path and auth address
  - ICE/STUN/TURN availability (no TURN configured may fail on restrictive networks)

## Scripts

- npm run dev — start dev server
- npm run build — build for production
- npm run start — run built app
- npm run lint — linting (if configured)
- npm run test — run tests (if present)

## Troubleshooting

- "Recipient not connected" — ensure recipient has an active socket and sent its auth address.
- Path mismatch — confirm NUXT_PUBLIC_SIGNALING_PATH matches server path (default `/ws-path/`).
- CORS errors — update signaling server CORS origins or host the client on the allowed origin.

## Contributing

- Follow existing code patterns for composables and components.
- Update plugins/socket.client.ts when changing signaling protocol/event names.
- Add environment docs here if you introduce additional runtime configuration.

If you want this README expanded with example env files, CI/CD deploy steps, or a Docker Compose example, tell me which details to include.
