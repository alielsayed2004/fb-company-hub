# F.B Company — Internal Sheets

A private, password-protected page listing the company's Google Sheets.
It is deployed as its own Vercel project (`fb-internal-sheets`), separate from the public hub and from `fb-company-bank-details`.

## How it works

- `index.html` shows only a password form. It contains no sheet names or links.
- `api/sheets.js` (Vercel Function) checks the password on the server and only then returns the sheets.
- Sheet names and links are stored **only** in Vercel environment variables, never in this repository:
  - `SHEETS_PASSWORD` — the page password.
  - `SHEETS_LINKS` — JSON array, for example
    `[{"title":"Sheet name","url":"https://docs.google.com/spreadsheets/d/<id>/edit?usp=sharing"}]`
- After 10 wrong passwords from one IP in 15 minutes the API answers `429` (per warm instance), and every wrong attempt is delayed.

## Changing the password or the sheets

Vercel → project `fb-internal-sheets` → Settings → Environment Variables → edit `SHEETS_PASSWORD` or `SHEETS_LINKS`, then redeploy.
When editing `SHEETS_LINKS`, paste the links exactly as Google gives them: sheet IDs are case-sensitive (`I` vs `l`, `D` vs `d`).
