# Payload Blank Template

This template comes configured with the bare minimum to get started on anything you need.

## Quick start

This template can be deployed directly from our Cloud hosting and it will setup MongoDB and cloud S3 object storage for media.

## Quick Start - local setup

To spin up this template locally, follow these steps:

### Clone

After you click the `Deploy` button above, you'll want to have standalone copy of this repo on your machine. If you've already cloned this repo, skip to [Development](#development).

### Development

1. First [clone the repo](#clone) if you have not done so already
2. `cd my-project && cp .env.example .env` to copy the example environment variables. You'll need to add the `MONGODB_URL` from your Cloud project to your `.env` if you want to use S3 storage and the MongoDB database that was created for you.

3. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. Follow the on-screen instructions to login and create your first admin user. Then check out [Production](#production) once you're ready to build and serve your app, and [Deployment](#deployment) when you're ready to go live.

#### Docker (MongoDB only — recommended)

Use Docker for MongoDB and run the Next.js app locally on port 3000:

1. Ensure `DATABASE_URL` in `.env` points at the local container, e.g. `mongodb://127.0.0.1/ecolengt`
2. Start MongoDB: `pnpm docker:db` (or `docker compose up mongo -d`)
3. Run `pnpm dev` and open `http://localhost:3000`

Do **not** run `docker compose up` with the full stack while `pnpm dev` is running — both bind port 3000.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/3.x/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

### Docker (full stack — optional)

To run both MongoDB and the app inside Docker (e.g. without Node installed locally):

1. Follow [steps 1 and 2 from above](#development)
2. Run `docker compose --profile full-stack up`
3. Open `http://localhost:3000` and create your first admin user

For day-to-day development, prefer MongoDB in Docker plus `pnpm dev` (see above).

## Deployment (Vercel)

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for step-by-step setup on the Vercel Hobby (free) plan: MongoDB Atlas, Vercel Blob, and environment variables.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
