# Ghost Bike Counter · Pilot (multi-desk, cloud)

All desks share one Firebase database: an order confirmed at the front appears at the delivery desk within a second, and every desk can work on the same orders. Each desk signs in with its own email and password.

## Files in this folder (upload ALL of them to GitHub)

`index.html` · `config.js` · `firebase.js` · `sw.js` · `manifest.webmanifest` · `icon-192.png` · `icon-512.png` · `README.md` · `firestore.rules` (reference copy of the security rules)

## 1. Update GitHub

Repository → **Add file → Upload files** → drag all the files above → **Commit changes**.

## 2. Check `config.js` (important)

`config.js` holds your Firebase project settings, typed from your screenshot. One wrong character in the long `apiKey` stops sign-in. To be safe:

1. On GitHub, click `config.js` → the **pencil** (Edit) icon.
2. In Firebase → **Settings → Project settings → Your apps → counter**, copy the `firebaseConfig` block.
3. Replace the block between `window.FIREBASE_CONFIG = {` and `};` with the copied lines → **Commit changes**.

If sign-in says *"The Firebase settings in config.js are wrong (API key)"*, this step was not done.

## 3. First sign-in on each device

1. Open the app (installed icon or the GitHub Pages link). Close and reopen it twice so the new version loads.
2. Sign in with that desk's email and password (created in Firebase → Security → Authentication → Users).
3. The header shows the desk name and **● Online**. Sign-in needs internet the first time; after that the desk keeps working through short internet cuts and syncs when back.

## 4. Move the client PC's existing data to the cloud (once)

On the **client's counter PC** (where the pilot was used before), after signing in:
Settings → **Move this PC's earlier data to the cloud (N orders)** → OK.
Do this once only, from that PC, before staff start using other desks. Order numbers continue after the old ones.

(From any other PC you can load a backup file instead: Settings → **Load a backup into the cloud…**)

## 5. Bikes and settings

Settings are shared: change bikes, prices or accounts on any desk → **Save all** → every desk updates.

## How the desks stay correct

| Situation | What happens |
|---|---|
| Two desks confirm the same bike at the same moment | Only one gets it; the other desk is told and the bike is removed from its ticket |
| Two desks change the same order at the same moment | Both changes are kept |
| Order / invoice numbers | One shared counter: no duplicates across desks |
| Internet drops on one desk | That desk keeps working; changes sync automatically when back. Numbers issued while offline look different (e.g. `T-F1A2B3C`) but stay unique |
| Someone is typing an amount or cash count | Live updates from other desks never wipe what is being typed |

## Daily routine, receipts, exports

Unchanged: New rental → Delivery desk → Settle payment; Day report → Close day saves the Odoo journal entry, customers, details and a backup file. Receipts now show who served the customer (the signed-in desk).

## Security rules (already pasted in Firebase → Firestore → Rules)

Only signed-in staff can read or write. A copy is in `firestore.rules`.
