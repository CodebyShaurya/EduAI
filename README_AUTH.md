Google authentication (NextAuth)
================================

This project already includes NextAuth wiring:
- `app/api/auth/[...nextauth]/route.ts` — route handler that delegates to `lib/auth.ts`.
- `lib/auth.ts` — contains `authOptions` and already includes the Google provider wired to `process.env.GOOGLE_CLIENT_ID` and `process.env.GOOGLE_CLIENT_SECRET`.

Quick checklist
--------------

- Add environment variables (locally: copy `.env.example` -> `.env.local`).
- Create OAuth credentials in Google Cloud Console and paste the Client ID / Client Secret into your env.
- Run the dev server and click the app's "Sign in with Google" button. It already calls `signIn('google')`.

Environment variables
---------------------

Create a `.env.local` with these keys filled:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<a_secure_random_value>
GOOGLE_CLIENT_ID=<from_google_console>
GOOGLE_CLIENT_SECRET=<from_google_console>
```

Generate a `NEXTAUTH_SECRET` (example, Powershell):

```powershell
# generate a 32-byte hex secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Google Cloud Console setup
--------------------------

1. Open https://console.cloud.google.com/ and either create a new project or use an existing one.
2. In the left menu go to APIs & Services -> OAuth consent screen.
   - Choose "External" for user type if you plan to sign in with personal Google accounts (you may need to submit for verification if you request sensitive scopes beyond email/profile).
   - Fill app name and required fields. Save.
3. Go to APIs & Services -> Credentials -> Create Credentials -> OAuth client ID.
   - Application type: "Web application".
   - Name: e.g. "EduAi Next.js dev auth".
   - Authorized redirect URIs: add the callback URL(s):
       - `http://localhost:3000/api/auth/callback/google` (local dev)
       - `https://YOUR_PRODUCTION_DOMAIN/api/auth/callback/google` (production)
   - Create and copy the Client ID and Client Secret.

4. Paste the values into your `.env.local` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

Deployment notes (Vercel or other hosting)
-----------------------------------------

- In production set `NEXTAUTH_URL` to your canonical site URL (e.g. `https://yourdomain.com`).
- Add the same redirect URI in the Google Cloud Console for your production domain.
- Add the environment variables in your hosting provider's dashboard (do not commit secrets to git).

How the app uses it
-------------------

- `lib/auth.ts` already configures GoogleProvider and `AuthButton` (client component) calls `signIn('google')`.
- After successful sign-in the session will be available through `useSession()`.

Troubleshooting
---------------

- Invalid redirect URI: make sure the redirect URI you configured in Google exactly matches the URL shown in the error (including http/https and trailing slashes).
- If you see a CORS or OAuth error, re-check the OAuth consent screen and scopes.
- For production, ensure `NEXTAUTH_URL` points to the correct domain.

Choosing a Generative AI model
------------------------------

The project can call different Google Generative AI models. Set the env var `GOOGLE_AI_MODEL` to pick the model you want to use. Example values (your key must have access to the model):

```
# example options; use one that `listAvailableModels()` shows for your key
GOOGLE_AI_MODEL=models/gemini-2.5-flash
GOOGLE_AI_MODEL=models/gemini-2.5-pro
GOOGLE_AI_MODEL=models/gemini-2.0-flash
```

If you don't set `GOOGLE_AI_MODEL`, the app defaults to `models/gemini-2.5-flash`. To discover which models your API key supports, set `GOOGLE_AI_LIST_MODELS=true` and restart the dev server; the server will log the available model names.

If you want, I can also:
- Add a small server-side-only check to ensure the required env vars are present at startup.
- Add unit/Integration tests for auth flows (mocked).
