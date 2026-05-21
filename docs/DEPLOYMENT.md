# Deploying to Vercel (Hobby / free plan)

This project is a **Payload CMS 3 + Next.js** app. On Vercel you need:

1. **MongoDB Atlas** (free M0 cluster) — serverless cannot use a local database.
2. **Vercel Blob** — media uploads do not persist on Vercel’s ephemeral filesystem.
3. Environment variables listed below.

## 1. MongoDB Atlas (free)

1. Create an account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **free M0** cluster.
3. **Database Access** → add a database user (username + password).
4. **Network Access** → add `0.0.0.0/0` (allow from anywhere) so Vercel can connect. For stricter security, use [Atlas IP access for Vercel](https://vercel.com/integrations/mongodbatlas) later.
5. **Connect** → “Drivers” → copy the connection string.
6. Replace `<password>` with your user password and set the database name (e.g. `ecolengt`):

   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/ecolengt?retryWrites=true&w=majority
   ```

## 2. Deploy on Vercel

### Option A — GitHub (recommended)

1. Push this repo to GitHub (already at `aurelien-robineau/ecolengt` if linked).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Framework preset: **Next.js** (auto-detected).
4. Install command: `pnpm install` (from `vercel.json`).
5. Do **not** deploy yet — add env vars first (step 3).

### Option B — Vercel CLI

```bash
pnpm add -g vercel
vercel login
vercel link
vercel env pull .env.vercel.local   # optional, for local preview
```

## 3. Environment variables

In the Vercel project → **Settings** → **Environment Variables**, add:

| Variable | Environments | Value |
|----------|--------------|--------|
| `DATABASE_URL` | Production, Preview | MongoDB Atlas URI from step 1 |
| `PAYLOAD_SECRET` | Production, Preview | `openssl rand -hex 32` |
| `NEXT_PUBLIC_SERVER_URL` | Production | `https://your-project.vercel.app` (or custom domain) |
| `NEXT_PUBLIC_SERVER_URL` | Preview | `https://$VERCEL_URL` is fine; or leave unset (falls back to `VERCEL_URL`) |

`BLOB_READ_WRITE_TOKEN` is added automatically when you enable Blob (step 4).

## 4. Enable Vercel Blob

1. Vercel project → **Storage** → **Create Database** → **Blob**.
2. Connect it to this project.
3. Vercel injects `BLOB_READ_WRITE_TOKEN` — no manual copy needed.
4. Redeploy if the first deploy ran before Blob was added.

Media uploads use **client uploads** to avoid Vercel’s 4.5 MB serverless body limit.

## 5. First deploy

1. Click **Deploy**.
2. After build, open `https://<your-domain>/admin`.
3. Create the first admin user.
4. Re-upload media if you had files only on local disk (they are not migrated automatically).

## 6. Custom domain (optional)

**Settings** → **Domains** → add your domain, then set:

```
NEXT_PUBLIC_SERVER_URL=https://www.your-domain.fr
```

Redeploy after changing this variable.

## Local development

- Copy `.env.example` to `.env`.
- Run MongoDB locally (`docker compose up` or local install).
- Blob is **optional** locally — without `BLOB_READ_WRITE_TOKEN`, uploads go to `media/` on disk.

```bash
cp .env.example .env
pnpm install
pnpm dev
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on `DATABASE_URL` | Set `DATABASE_URL` in Vercel env for **Production** and **Preview**. |
| Admin works, uploads fail | Enable **Blob** storage; confirm `BLOB_READ_WRITE_TOKEN` exists. Redeploy after enabling Blob so the build runs `payload generate:importmap` with the token (adds `VercelBlobClientUploadHandler` to the admin import map). |
| Images broken on frontend | Redeploy after Blob is enabled; new uploads get `*.blob.vercel-storage.com` URLs. |
| Cannot connect to MongoDB | Atlas network access `0.0.0.0/0` or Vercel ↔ Atlas integration; check user/password in URI. |
| `PAYLOAD_SECRET` errors | Must be set and identical across instances; use a long random string. |

## Free plan limits (summary)

- **Vercel Hobby**: bandwidth and build minutes limits; suitable for a small school site.
- **MongoDB Atlas M0**: 512 MB storage, shared cluster.
- **Vercel Blob**: free tier storage and bandwidth — see [Vercel pricing](https://vercel.com/pricing).

For production traffic beyond hobby limits, upgrade Vercel or Atlas as needed.
