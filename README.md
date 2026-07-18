# Lakshit Wasan — Portfolio

A fast, single-page portfolio that presents one engineer through **two lenses** —
**AI Systems** and **Backend / Fullstack** — switchable from a hero toggle. The same
work re-ranks, re-describes, and re-accents itself for whichever role you're hiring for.

- **Deep links:** `/ai` and `/backend` preset the matching lens, so you can paste the
  right framing into role-specific job applications. `/` defaults to the AI lens.
- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion.
- **Contact form:** a live serverless endpoint (`/api/contact`) backed by AWS SES.
- **Deploy target:** Docker → Amazon ECR → AWS App Runner, behind Route 53 + ACM.

---

## Local development

```bash
npm install
cp .env.example .env.local   # optional; the form logs to console without SES
npm run dev                  # http://localhost:3000
```

Useful scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (`standalone` output for Docker) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

### Editing content

All copy lives in **`lib/content.ts`** — profile, per-lens hero framing, projects
(tagged by lens), skills, experience and publications. Change it there; nothing is
hard-coded in components.

> **TODO:** add the real Pred-AHCP paper / web-server URL in `lib/content.ts`
> (`publications[0]`), currently left blank to avoid shipping a placeholder link.

---

## Contact form

The route `app/api/contact/route.ts`:

- validates with the shared Zod schema (`lib/contact-schema.ts`),
- drops honeypot submissions silently,
- rate-limits per IP (5 / 10 min, per instance),
- picks an email provider in order — **Resend → AWS SES → console log** — so it works
  on Vercel today and on AWS later with only an env-var change.

### Resend (recommended on Vercel — free)

1. Create an account at [resend.com] and an API key.
2. Set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. Sign up with the same Gmail as `CONTACT_TO_EMAIL` and the default
   `onboarding@resend.dev` sender delivers immediately — no domain verification. Verify
   `lakshitwasan.dev` later for a branded `from`.

### AWS SES (for the AWS deploy)

Leave `RESEND_API_KEY` blank and set `SES_FROM_EMAIL` + `AWS_REGION`. SES starts in
**sandbox mode** (verified recipients only) until you request production access.

---

## Deploy to Vercel (primary / live site)

Fastest path to a live site at `lakshitwasan.dev`, free hosting.

1. Push this repo to GitHub.
2. Import it at [vercel.com/new] — Vercel auto-detects Next.js; no config needed.
3. Add environment variables in the Vercel project settings:
   ```
   NEXT_PUBLIC_SITE_URL=https://lakshitwasan.dev
   CONTACT_TO_EMAIL=lakshitwasan31@gmail.com
   RESEND_API_KEY=...        # from resend.com
   ```
4. Add `lakshitwasan.dev` under Vercel → Domains, then set the DNS records it shows at
   your registrar. HTTPS is automatic.

Every push to `main` redeploys.

## Deploy to AWS (learning track)

Optional — spin up to gain AWS experience, document it, and tear down to avoid ongoing
cost. Mirrors the résumé's Docker · AWS · CI/CD story.

### One-time setup

1. **ECR** — create a repository:
   ```bash
   aws ecr create-repository --repository-name lakshit-portfolio
   ```
2. **App Runner** — create a service from that ECR image (port `3000`), and add the
   SES env vars above. Give its **instance role** `ses:SendEmail` permission.
3. **SES** — verify your domain (or sending address) and the recipient address.
4. **Route 53 + ACM** — request an ACM cert for `lakshitwasan.dev`, add the domain as a
   custom domain on the App Runner service, and point Route 53 records at it.
5. **GitHub OIDC** — create an IAM role trusting GitHub's OIDC provider with ECR +
   App Runner permissions; put its ARN in the repo secret `AWS_DEPLOY_ROLE_ARN`.

### Continuous deployment

`.github/workflows/deploy.yml` builds and pushes the image, then triggers an App Runner
rollout on every push to `main`. Configure repo **variables**:

```
AWS_REGION, ECR_REPOSITORY, APP_RUNNER_SERVICE_ARN
```

### Build/run the container locally

```bash
docker build -t lakshit-portfolio .
docker run -p 3000:3000 --env-file .env.local lakshit-portfolio
```

### Cheaper alternative

For near-zero cost, `next build` + a static export can be served from **S3 + CloudFront**,
with the contact form moved to a standalone **Lambda + API Gateway + SES**. Trade-off:
no server runtime, so the current Next.js API route would be replaced by the Lambda.

---

## Accessibility & performance

- Dark-first, fully themed light mode; theme + lens both drive CSS variables.
- Honors `prefers-reduced-motion` (hero animation and reveals collapse to fades).
- Keyboard-operable toggle (radio group) and visible focus rings throughout.
- Self-hosted fonts via `next/font` (no CDN, no layout shift).
