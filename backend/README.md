# Backend (Express + TypeScript)

This folder contains the backend API for the blog system.

## Overview
- Built with TypeScript, Express and Mongoose (MongoDB).
- Authentication uses JWT signed with RSA key pair located in `app/keys`.

## Prerequisites
- Node.js 18+ and npm
- A running MongoDB instance
- OpenSSL (to generate RSA keys) — optional if you already have keys

## Setup
1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend` (or set env vars in your environment). Example:

```env
MONGO_CONNECTION=mongodb://localhost:27017/blog
PORT=3000
```

3. Place JWT RSA keys

The server expects `public.pem` and `private.pem` inside `app/keys`.
To generate a key pair with OpenSSL:

```bash
# generate private key
openssl genrsa -out private.pem 4096
# extract public key
openssl rsa -in private.pem -pubout -out public.pem
# then move both files into backend/app/keys
```

Alternatively, if you already have keys, copy them into `app/keys` as `private.pem` and `public.pem`.

## Run
- Build & run (production-like)

```bash
npm run start
```

This script compiles TypeScript and runs the compiled code from `build/index.js`.

## Development
For development you can rebuild on change with your preferred workflow (e.g., `tsc -w` + `node build/index.js` or using `ts-node` if you install it). A minimal workflow:

```bash
# In one terminal: watch-compile
npx tsc -w
# In another terminal: run the built server
node build/index.js
```

## Important envs & files
- `MONGO_CONNECTION` — MongoDB connection string (required)
- `PORT` — port to run the server (defaults to environment if set)
- `app/keys/public.pem` & `app/keys/private.pem` — RSA keys used for JWT

## Notes
- Endpoints are defined under `app/feature-modules` and routed in `app/router`.
- If you change TypeScript sources, run `npm run start` again to recompile and restart.

