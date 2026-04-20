# CyberFreq iOS Waitlist — Persistent Storage Setup

**Time required:** ~5 minutes  
**Cost:** $0  
**Result:** Every signup is saved to a Google Sheet AND emails `aicrownzllc@gmail.com` instantly.

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it **CyberFreq iOS Waitlist**.
3. Leave it empty — the script adds headers automatically on the first signup.

---

## Step 2 — Open Apps Script

1. Inside the sheet, click **Extensions → Apps Script**.
2. A new browser tab opens with the script editor.
3. Delete all existing starter code in the editor.

---

## Step 3 — Paste the script

1. Open `docs/waitlist-apps-script.gs` from this repo.
2. Copy the entire file contents.
3. Paste it into the Apps Script editor.
4. Click **Save** (Ctrl+S / ⌘+S).

---

## Step 4 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Type" and select **Web app**.
3. Set the fields:
   - **Description:** CyberFreq Waitlist v1
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Google will ask you to authorize the script — click through the prompts (it only needs access to the spreadsheet you already have open).
6. Copy the **Web app URL** — it looks like:  
   `https://script.google.com/macros/s/AKfycbXXXXXXXXXXXXXXXXXXXXXXXXXX/exec`

---

## Step 5 — Wire the URL into the site

1. Open `index.html` in this repo.
2. Search for: `PLACEHOLDER_APPS_SCRIPT_URL`
3. Replace it with the URL you copied in Step 4.  
   Example:
   ```js
   const WAITLIST_SHEET_URL = 'https://script.google.com/macros/s/AKfycbXXX.../exec';
   ```
4. Save the file.

---

## Step 6 — Commit and push

```bash
cd cyberfreq-site
git add index.html
git commit -m "feat(waitlist): wire Apps Script sheet endpoint"
git push
```

GitHub Pages redeploys automatically (~60 seconds).

---

## Step 7 — Smoke test

1. Run `testAppend()` manually in the Apps Script editor (select the function from the dropdown → Run) to confirm a test row appears in the sheet.
2. Submit a test email on the live `cyberfreq.app/#signup` form.
3. Verify: row appears in the sheet AND you receive an email at `aicrownzllc@gmail.com`.

---

## What happens before you complete setup

- **Formsubmit email path works immediately** — every signup emails `aicrownzllc@gmail.com` in real time. No signups are lost.
- The sheet just won't populate until Step 5 is done.
- The `PLACEHOLDER_APPS_SCRIPT_URL` guard in the JS prevents any console errors in the meantime.

---

## Activating Formsubmit (one-time, if not done yet)

The first real waitlist submission triggers a confirmation email from Formsubmit to `aicrownzllc@gmail.com`. Click the **Activate Form** link in that email once. After that, all future submissions email you automatically.

---

## Exporting the list at iOS launch

1. Open the **CyberFreq iOS Waitlist** sheet.
2. File → Download → Comma Separated Values (.csv).
3. Import into Beehiiv / ConvertKit / Mailchimp as a subscriber list.
