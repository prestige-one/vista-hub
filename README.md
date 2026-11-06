# Vista Hub

Next.js App Router landing page, TypeScript and plain CSS. All authored classes and IDs use `vh-`. Shared elements live in `components/ui.tsx`; interactive navigation, amenities, collection and preview form live in `components/interactive.tsx`.

## Run

```sh
npm install
npm run dev
```

Production: `npm run build`, then `npm start`. Type check: `npm run typecheck`.

## Content and media

- Edit sections in `app/page.tsx` and interactive content in `components/interactive.tsx`. Header/hero styles are in `app/hero.css`, statistics and introduction styles in `app/hero-stats.css`, and the third section in `components/strategic-address.tsx` with `app/strategic-address.css`. Shared styles are in `app/globals.css`.
- Local imagery is in `public/images`. Original supplied images are retained in `images`.
- Google Sans loads from Google Fonts; the rest of the assets are local.
- The hero uses `public/images/facade-vista.webp`. Set `VISTA_HERO_VIDEO_URL=/videos/vista-hub.mp4` in `.env.local` and put the MP4 in `public/videos` to switch to video. Rebuild for production after changing it. The facade image remains the video poster.
- The enquiry form validates locally and displays a preview message. It does not send, store or log contact details. Connect a submission endpoint when approved.
- Floor-plan requests lead to the enquiry form. No brochure or floor-plan files were supplied.
- The third section uses the original site's Dubai location map. The later travel-time section includes an illustrative diagram. Both link to Google Maps. Travel times come from the supplied content and are marked indicative. Completion dates are omitted.
- The statistics count up once when entering view. `components/text-char-slide.tsx` provides the reusable title entrance; the introduction also includes a gold shimmer. Animations respect reduced-motion preferences.

## Verified

Production build and TypeScript pass. Browser checks cover desktop and mobile layouts, navigation, amenity selection, unit selection, preview form validation, image loading, Google Sans and horizontal overflow.
