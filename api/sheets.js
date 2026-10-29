// Sheet names and links live only in the Vercel project's environment variable:
//   SHEETS_LINKS  JSON array: [{ "title": "...", "url": "https://docs.google.com/spreadsheets/d/..." }]
// They are not stored in this repository or bundled into the frontend.
// Used by the Sheets page of the hub (src/pages/SheetsPage.tsx).

const SHEET_URL = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[A-Za-z0-9_-]+\/edit\?usp=sharing$/;

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

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  let sheets;
  try {
    sheets = loadSheets();
  } catch {
    return res.status(500).json({ error: 'not_configured' });
  }

  return res.status(200).json({ sheets });
}
