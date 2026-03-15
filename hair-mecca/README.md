# Hair Mecca — Luxury Hair & Beauty Salon Website

A premium single-page website for Hair Mecca, a luxury hair and beauty salon located in Osu Klottey, Accra, Ghana.

## 🌐 Live Preview

Open `index.html` in any browser, or deploy to [GitHub Pages](#deploying-to-github-pages).

## 📁 Project Structure

```
hair-mecca/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles + animations
├── js/
│   └── main.js             # Before/after slider + scroll reveal
├── assets/
│   └── images/             # All site images (jpg)
└── README.md
```

## ✨ Features

- **Hero section** — Full-screen entrance animation on page load (fade + scale)
- **Scroll reveal animations** — Each section animates in once as you scroll (fire-once)
- **Sticky service menu** — Left photo stays fixed while the service list scrolls
- **Before/After slider** — Draggable wig revamp comparison widget
- **WhatsApp booking** — Direct CTA links to WhatsApp
- **Google Maps embed** — Location section with interactive map
- **Fully responsive** — Mobile-friendly layout

## 🛠 Tech Stack

- Pure HTML, CSS, JavaScript — no frameworks or dependencies
- Google Fonts (Cormorant Garamond + DM Sans)
- CSS custom properties (variables) for theming
- `IntersectionObserver` API for scroll animations
- CSS `position: sticky` for the service menu sidebar

## 🚀 Deploying to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://yourusername.github.io/hair-mecca/`

## 📝 Customization

### Colors
Edit the CSS variables at the top of `css/styles.css`:
```css
:root {
  --gold: #C9972B;
  --cream: #FAF8F5;
  --dark: #1A1814;
}
```

### Content
All text content is in `index.html`. Search for the section you want to edit.

### Images
Replace any file in `assets/images/` with your own photos. Keep the same filenames, or update the `src` attributes in `index.html`.

### WhatsApp Number
Search for `wa.me/233202809178` in `index.html` and replace with your number.

## 📞 Contact Details (edit in index.html)

- **Address:** 2nd Ringway Close, Osu Klottey, Accra, Ghana
- **WhatsApp:** +233 202 809 178
- **Instagram:** @hairmecca_beautybar
- **Hours:** Tue–Sat: 9:00 AM – 7:00 PM
