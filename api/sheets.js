import { createHash, timingSafeEqual } from 'node:crypto';

// Both values live only in the Vercel project's environment variables:
//   SHEETS_PASSWORD  the shared password for the page
//   SHEETS_LINKS     JSON array: [{ "title": "...", "url": "https://docs.google.com/spreadsheets/d/..." }]
// Nothing about the sheets is stored in this repository or sent to the browser before login.
// Used by the Sheets page of the hub (src/pages/SheetsPage.tsx).

const SHEET_URL = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]+\/edit\?usp=sharing$/;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;
const failures = new Map(); // ip -> { count, since } (per warm instance)

const sha256 = (value) => createHash('sha256').update(String(value), 'utf8').digest();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded || '').split(',')[0].trim() || 'unknown';
}

function isLockedOut(ip) {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.since > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.since > WINDOW_MS) {
    failures.set(ip, { count: 1, since: Date.now() });
  } else {
    entry.count += 1;
  }
}

function loadSheets() {
  const sheets = JSON.parse(process.env.SHEETS_LINKS || '[]');
  if (!Array.isArray(sheets)) throw new Error('SHEETS_LINKS must be a JSON array');
  return sheets.map(({ title, url }) => {
    if (typeof title !== 'string' || !title.trim() || !SHEET_URL.test(url)) {
      throw new Error('SHEETS_LINKS has an invalid entry');
    }
    return { title: title.trim(), url };
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const expected = process.env.SHEETS_PASSWORD;
  let sheets;
  try {
    sheets = loadSheets();
  } catch {
    sheets = null;
  }
  if (!expected || !sheets) {
    return res.status(500).json({ error: 'not_configured' });
  }

  const ip = clientIp(req);
  if (isLockedOut(ip)) {
    return res.status(429).json({ error: 'too_many_attempts' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const password = body && typeof body.password === 'string' ? body.password : '';

  if (!timingSafeEqual(sha256(password), sha256(expected))) {
    recordFailure(ip);
    await sleep(800);
    return res.status(401).json({ error: 'wrong_password' });
  }

  failures.delete(ip);
  return res.status(200).json({ sheets });
}
