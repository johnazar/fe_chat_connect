FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json yarn.lock ./

# Install Python and build tools required by node-gyp for native modules
RUN apk add --no-cache python3 build-base linux-headers && \
	ln -sf /usr/bin/python3 /usr/bin/python && \
	corepack enable && corepack prepare yarn@1.22.19 --activate && yarn install --frozen-lockfile

# Copy app sources
COPY . .

# Build the Nuxt app
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy only the built output & production deps
COPY --from=builder /usr/src/app .

EXPOSE 3000

# Run the Nuxt preview server (serves the built app)
CMD ["npm", "run", "preview"]
