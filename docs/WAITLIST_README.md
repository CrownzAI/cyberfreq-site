# CyberFreq Waitlist — Cloudflare Worker + KV

Signups are stored in Cloudflare KV via the `cyberfreq-waitlist` Worker.

- **Worker URL:** `https://cyberfreq-waitlist.brandlens.workers.dev`
- **KV namespace ID:** `b79962f3fb2c42c083aa7f3233cc6f54`
- **Worker project:** `C:\Users\aicro\Projects\CyberFreq-Waitlist\`

## Read signups

```bash
# List all keys
npx wrangler kv key list --namespace-id=b79962f3fb2c42c083aa7f3233cc6f54 --remote

# Read a single entry
npx wrangler kv key get "signup:TIMESTAMP:HASH" --namespace-id=b79962f3fb2c42c083aa7f3233cc6f54 --remote
```

## Export to CSV (for Beehiiv / Mailchimp import at iOS launch)

```bash
npx wrangler kv key list --namespace-id=b79962f3fb2c42c083aa7f3233cc6f54 --remote \
  | node -e "
const keys = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const {execSync} = require('child_process');
console.log('email,timestamp,referrer');
keys.forEach(k => {
  const v = JSON.parse(execSync(
    'npx wrangler kv key get \"'+k.name+'\" --namespace-id=b79962f3fb2c42c083aa7f3233cc6f54 --remote'
  ).toString());
  console.log([v.email, v.timestamp, v.referrer].join(','));
});
"
```

## KV entry format

```json
{
  "email": "user@example.com",
  "timestamp": "2026-04-20T12:00:00.000Z",
  "user_agent": "Mozilla/5.0 ...",
  "referrer": "direct"
}
```
