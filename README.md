# Maziv Academy

The in-house training academy site for Maziv, operated in association with Centenary Networks.
Static HTML, CSS and JavaScript — no build step, no backend. **Pushing to `main` is the deploy.**

Built 14 August 2026 from the Equinix academy, which shares the same engine. What is genuinely
per-site is listed under "Things a rebrand does not fix" below; everything else re-skins itself
from the palette.

## The palette

Both brand colours come from the Maziv logo.

| Token | Value | What it is |
|---|---|---|
| `--orange` | `#7C1C91` | the logo purple — the primary, despite the token name |
| `--green` | `#ED0390` | the logo magenta — the secondary |
| `--dark` | `#1F0D26` | deep aubergine, for the dark bands |

The token *names* are identical across all four academies and hold different values, which is what
lets a stylesheet written for one site re-skin itself on the others. `--orange` does not mean orange;
it means "the primary".

Every pairing the stylesheet actually makes was contrast-checked before these values were chosen —
thirteen pairs, all passing, the tightest being the intake eyebrow on the dark band at **5.35:1**.
Do not adjust a colour without re-checking the pair it appears in.

## Pages

`index` · `about` · `courses` · `course?c=<slug>` · `module?m=<KM-id>` · `pm-pathway` ·
`pm-schedule` · `pm-progress` · `skills-gap` · `rpl` · `ai-in-action` · `profile` · `contact` ·
`thanks`

## Things a rebrand does not fix

Learned the hard way on the earlier ports. All four are set correctly here, and all four fail
*silently* when they are wrong:

- **`profile.js`** exposes `window.MazivProfile` and stores under `maziv.profile.v1`. The progress
  tracker finds whichever profile global the site exposes rather than assuming a name — it used to
  hardcode one, and simply switched itself off everywhere else.
- **`pm-schedule.js`** sets `BRAND` and `UID_HOST`, which land *inside* the `.ics` file a learner
  downloads. Wrong values put another company's academy in their calendar.
- **Card artwork** terminates its gradient on a literal hex, which no token can reach.
- **The demo scenarios** in `demo.js` are set in this industry — a fibre order waiting on a wayleave,
  a network performance report, odd-looking link data, a build. A colour swap makes a site look like
  the client's; the worked examples are what make it *about* them.
- **`.brand-word`** does not exist here. Maziv's mark is a landscape wordmark that already carries
  the name; the sibling site this came from pairs an icon-only mark with a text span.

## Course locks

`locks.js` has a `LOCKS_ON` switch, **off** here, so the whole catalogue is open. Turning it on
narrows the site to the courses named in `OPEN_TITLES` / `OPEN_SLUGS`. Each academy sets this
independently.

## Where registrations go

Both the registration form and the progress report post to **kgomotso@centenarynetworks.com**.
FormSubmit confirms an address before it will deliver anything, **per form** — so the first
submission on each sends a confirmation email that has to be clicked. Until then nothing arrives.

## Roadmap

- [ ] **Confirm the site's content with Maziv.** The company description, the "who it's for" copy and
  the demo scenarios were written from the public Maziv website and are a starting point, not signed
  off. The stats on their site (17+ years, 25K+ commercial buildings passed, 12.8K+ towers) are not
  used here — put them in only once someone confirms they are current.
- [ ] **A GM photograph and message.** `images/gm-photo.svg` is a placeholder, and the signature
  block says "Name to follow".
- [ ] **A real phone number.** `012 345 6789` is a placeholder on the contact page.
- [ ] **Fill in the `DOCS` links in `pm-modules.js`** — 33 slots (guide/workbook/video × 11) are
  `null`, so every module reads "ask HR for a copy". Set each file's sharing permissions *before*
  pasting its link: these pages are public, so a link is only as private as its own sharing setting.
- [ ] **Sign off the Skills Gap role targets.** The eight skill areas and the per-role targets were
  adapted from a sibling site and need someone at Maziv to agree them.
