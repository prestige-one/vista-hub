# Vista Hub

Next.js App Router landing page, TypeScript and plain CSS. Authored classes and internal form/accessibility IDs use `vh-`; public section anchors use short names such as #amenities, #portfolio and #enquire. Shared elements live in `components/ui.tsx`; interactive navigation lives in `components/interactive.tsx`; collection and enquiry have their own reusable modules.

## Run

```sh
npm install
npm run dev
```

Production: `npm run build`, then `npm start`. Type check: `npm run typecheck`.

## Routes

- / — Coming Soon page (app/page.tsx, app/coming-soon.css).
- /home-launch — Full landing page (app/home-launch/page.tsx).

## Content and media

- Edit landing-page sections in `app/home-launch/page.tsx` and interactive content in `components/interactive.tsx`. Header/hero styles are in `app/hero.css`, statistics and introduction styles in `app/hero-stats.css`, and the third section in `components/strategic-address.tsx` with `app/strategic-address.css`. Shared styles are in `app/globals.css`.
- Local imagery is in `public/images`. Original supplied images are retained in `images`.
- Google Sans loads from Google Fonts; the rest of the assets are local.
- The hero uses `public/images/facade-vista.webp`. Set `VISTA_HERO_VIDEO_URL=/videos/vista-hub.mp4` in `.env.local` and put the MP4 in `public/videos` to switch to video. Rebuild for production after changing it. The facade image remains the video poster.
- The enquiry form validates locally and displays a preview message. It does not send, store or log contact details. Connect a submission endpoint when approved.
- Floor-plan requests lead to the enquiry form. No brochure or floor-plan files were supplied.
- The location section uses `public/images/vista-hub-map.webp`. Connectivity uses `Dubai-Skyline-full.webp` and the supplied indicative drive times. Completion dates are omitted.
- The statistics count up once when entering view. `components/text-char-slide.tsx` provides the reusable title entrance; the introduction also includes a gold shimmer. Animations respect reduced-motion preferences.

## Verified

Production build and TypeScript pass. Browser checks cover desktop and mobile layouts, navigation, amenity selection, unit selection, preview form validation, image loading, Google Sans and horizontal overflow.

## Amenities

The motion-blur amenities slider uses the shared max-width section container. `components/amenities.tsx` supplies the original spaces to reusable `components/motion-showcase.tsx`; styles live in `app/amenities.css`. The slider shows the Vista Hub wordmark, category/title and previous/next controls. Keyboard arrows and mobile swipes navigate all 16 spaces. Image elements retain stable keys between current and outgoing states to prevent flashes. Only the current and incoming images mount during a transition; the old image is removed after animation-end. Incoming images decode before transitions begin. Autoplay advances every 4 seconds while the section is visible and the tab is active. Reduced-motion preferences disable sliding and blur. There are no slider, animation or 3D dependencies.



## Phone input

The reusable `components/phone-input.tsx` defaults to UAE (+971), with searchable country calling codes and local SVG flags. Data is in `components/phone-countries.ts`; asset licenses are in `licenses/phone-assets.txt`. The chosen country and calling code are separate hidden form fields; the local preview does not submit or store them. No phone-input library is shipped. Shared 10px panel corners live in `app/panels.css`.

## Footer, timed popup and scroll reveal

The dark footer is in components/footer.tsx with app/footer.css; it contains project links and contact details without a subscription form. The lead dialog is in components/lead-popup.tsx with app/lead-popup.css. It opens after 3 seconds for a first visit or expired cookie. The host-scoped vh_lead_popup_seen cookie stores only a 24-hour expiry timestamp, with Max-Age=86400, Expires, Path=/ and SameSite=Lax (Secure on HTTPS). It is set only when the popup opens and is not renewed on repeat visits. Forms remain local previews.

The original collection is retained in components/legacy-collection.tsx but temporarily omitted from the home page. To restore it, import and render LegacyCollection before SpaceReveal. A separate components/space-reveal.tsx immediately after it keeps its title and description visible from the compact state, expands the navy panel on scroll, and progressively reveals a second interactive collection below. The two collection instances have independent state and unique control IDs. The backdrop is a newly generated business-plaza image in public/images/space-purpose-plaza.webp; its original and exact generation prompt are retained in images/space-purpose-plaza.png and images/space-purpose-plaza.prompt.txt. It uses passive scroll events and one requestAnimationFrame update while visible, with no animation library. Reduced motion and short viewports use a static panel. Shared collection content is in components/collection-data.ts.

Regression checks: node --experimental-strip-types --test tests/lead-popup-cookie.test.mjs tests/space-reveal-progress.test.mjs



## Context-aware enquiry actions

Header Enquire, Download Brochure and Request floor plans use the shared LeadPopupTrigger. Explicit clicks open the popup even when the daily automatic-popup cookie is present. components/lead-request.ts defines intent-specific headings, default messages and email subjects/bodies; floor-plan requests include the selected unit type. The preview prepares email_subject and email_body form fields, but no email is sent or persisted. Connect the exported builder to the eventual approved submission endpoint. The on-page contact action is centered at a 190px minimum width and 44px height.

Legal URLs are centralized in components/site-links.ts. The footer opens the supplied Prestige One policies in a new tab. The original collection is retained but not rendered; its footer link targets the new expanding section.


Connectivity background: public/images/v2/majan-calm-connectivity.webp is a generated Majan-inspired neighbourhood illustration, not an authenticated location photograph. Original PNG and exact generation prompt are retained in images/.

Hero text effects: Grade A uses components/decrypting-text.tsx, repeating every 3 seconds while visible. Reduced-motion users see static text. The previous oval highlight remains available in components/circled-text.tsx and its CSS for later reuse.