# Nuxt Chat/WebRTC Application

## Overview
This is a lightweight Nuxt 3 frontend application for a chat/WebRTC project. It provides a modern web interface for real-time chat with WebRTC peer-to-peer communication capabilities, using wallet-based authentication.

**Purpose:** Provide UI, wallet-based authentication, and Socket.IO signaling for WebRTC peer connections

**Current State:** Fully configured and running on Replit with proper environment setup

## Recent Changes
- **2025-11-05:** Initial Replit setup
  - Configured Nuxt to run on 0.0.0.0:5000 for Replit proxy compatibility
  - Set up Node.js 20 environment
  - Configured workflow for development server
  - Set up deployment configuration for production

## Project Architecture

### Technology Stack
- **Framework:** Nuxt 3.15.4 (Vue.js meta-framework)
- **UI:** Tailwind CSS with color mode support
- **State Management:** Pinia with persistence
- **Web3:** Wagmi Vue for Ethereum wallet integration
- **Real-time:** Socket.IO client for signaling
- **WebRTC:** Peer-to-peer video/audio communication
- **Internationalization:** i18n (English, French)

### Key Features
1. **Wallet Authentication:** Connect via Ethereum wallets (MetaMask, etc.)
2. **Real-time Chat:** WebSocket-based messaging
3. **WebRTC Video/Audio:** Peer-to-peer communication
4. **Multi-language:** English and French support
5. **Dark Mode:** Built-in color mode switching

### Project Structure
- `pages/` - Route pages (index, chats, test)
- `components/` - Vue components (header, footer, modals, etc.)
- `plugins/` - Nuxt plugins (Socket.IO, Wagmi, event bus)
- `stores/` - Pinia state stores (chat, toast)
- `composables/` - Vue composables (event bus)
- `middleware/` - Route middleware (auth)
- `locales/` - i18n translation files
- `assets/css/` - Global styles

### Environment Configuration

The app uses Nuxt's public runtime config for the signaling server:

```
NUXT_PUBLIC_SIGNALING_URL=http://localhost:3001
NUXT_PUBLIC_SIGNALING_PATH=/ws-path/
```

These can be set in Replit Secrets for production deployment.

### Development Setup
- **Host:** 0.0.0.0 (required for Replit proxy)
- **Port:** 5000 (required for Replit webview)
- **Dev Command:** `npm run dev`
- **Package Manager:** npm (yarn.lock exists but npm is used in Replit)

### Deployment
- **Type:** Autoscale (serverless)
- **Build:** `npm run build`
- **Run:** `node .output/server/index.mjs`

## Dependencies

### Core Dependencies
- nuxt: 3.15.4
- vue: latest
- @pinia/nuxt: State management
- @wagmi/vue: Ethereum wallet integration
- socket.io-client: Real-time communication
- viem: Ethereum utilities

### UI Dependencies
- @nuxtjs/tailwindcss: Utility-first CSS
- @nuxtjs/color-mode: Dark/light mode
- @nuxtjs/i18n: Internationalization

## User Preferences
None specified yet.

## Important Notes
1. **Signaling Server:** This app requires a separate signaling server (typically on port 3001) for WebRTC to function
2. **WebRTC Requirements:** Browser must grant camera/microphone permissions for video/audio chat
3. **Wallet Required:** Users need an Ethereum wallet extension (MetaMask, etc.) to authenticate
4. **CORS:** Signaling server must allow CORS from this application's origin

## Troubleshooting
- **"Recipient not connected":** Ensure the other user has an active socket connection
- **Path mismatch:** Verify `NUXT_PUBLIC_SIGNALING_PATH` matches server path (default: `/ws-path/`)
- **CORS errors:** Update signaling server CORS configuration
- **WebRTC connection fails:** Check ICE/STUN/TURN configuration and network restrictions
