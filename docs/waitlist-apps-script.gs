/**
 * CyberFreq iOS Waitlist — Google Apps Script endpoint
 *
 * HOW TO DEPLOY (5 min):
 *  1. Open your target Google Sheet (named "CyberFreq iOS Waitlist")
 *  2. Extensions → Apps Script
 *  3. Delete any starter code; paste this entire file
 *  4. Click Save (floppy icon)
 *  5. Click Deploy → New deployment
 *       Type: Web app
 *       Execute as: Me
 *       Who has access: Anyone
 *  6. Click Deploy → copy the Web app URL
 *  7. Paste that URL into index.html (replace PLACEHOLDER_APPS_SCRIPT_URL)
 *  8. Commit + push — done
 *
 * The sheet must have these headers in row 1:
 *   Timestamp | Email | User Agent | Referrer
 * (The script creates them automatically on first run if the sheet is empty.)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Bootstrap headers on a fresh sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'User Agent', 'Referrer']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    // The browser sends application/x-www-form-urlencoded (no-cors safe)
    var email      = e.parameter.email      || '';
    var userAgent  = e.parameter.user_agent || '';
    var referrer   = e.parameter.referrer   || 'direct';

    // Basic sanity check — don't log empty/bot submissions
    if (!email || !email.includes('@')) {
      return ContentService
        .createTextOutput('ignored')
        .setMimeType(ContentService.MimeType.TEXT);
    }

    sheet.appendRow([new Date(), email, userAgent, referrer]);

    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    // Silently log errors to Apps Script execution log; never expose to client
    console.error('Waitlist error:', err.toString());
    return ContentService
      .createTextOutput('error')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Quick smoke-test — run this function manually from the editor to
 * verify the sheet connection before deploying.
 */
function testAppend() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), 'test@example.com', 'manual test', 'smoke-test']);
  Logger.log('Row appended to: ' + sheet.getName());
}
