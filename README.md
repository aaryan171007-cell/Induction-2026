# IIT Kharagpur - Undergraduate Induction Portal (2026-2027)

A fully responsive, visually stunning, and highly interactive Induction Website tailored for first-year students joining **IIT Kharagpur**. This portal helps incoming undergraduates navigate campus life, academics, halls of residence, emergency helpdesks, and student clubs/societies.

Built on behalf of **Technology Students' Gymkhana (TSG)** for the Academic Session 2026-2027.

---

## 🌟 Key Features

1. **Welcoming Hero & Landing Page**
   - Sleek header branding, dynamic gradient meshes, and subtle micro-animations.
   - Smooth-scrolling Call-to-Action (CTA) directing freshers to deep dive into campus pillars.
   - Mobile-responsive layout matching modern UI/UX design paradigms.
2. **Sticky Navigation Bar**
   - High-fidelity glassmorphic navigation panel (`backdrop-blur-md`).
   - Seamless routing between Home, FAQ, and Contacts using **React Router**.
   - Accessible shortcuts to the official TSG and IIT KGP websites.
   - Responsive hamburger drawer menu on mobile viewports.
3. **About Campus Highlights**
   - Structural grid highlighting Academics, Halls of Residence, TSG activities, and iconic campus festivals (Spring Fest & Kshitij).
   - Designed with curated vector icons and hover-glow elevation changes.
4. **Interactive Clubs & Societies Portal**
   - Full grid listing technical, cultural, sports, and social service societies.
   - Category filter tabs (All, Technical, Cultural, Sports & Games, Social Service) to query clubs instantly.
   - Informative badges and customized acronym avatars.
5. **Searchable FAQ Accordion**
   - Real-time text filter allowing users to search through 8 comprehensive FAQs covering credit systems, mess allotment, bicycle restrictions, etc.
   - Clean custom-built React accordion showing clean animations on opening/collapsing.
6. **Searchable & Filterable Contacts Directory**
   - Search-input bar and category filters (Student Council, Emergency Lines, Administration).
   - Dynamic buttons with `tel:` and `mailto:` shortcuts for instant contact.
7. **Premium Themes (Dark Mode Toggle)**
   - Dark/Light mode theme provider persisting preference across sessions using `localStorage`.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React 19](https://react.dev/) & [Vite 8](https://vite.dev/) (fast compile and Hot Module Replacement).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS-in-JS utility-first styling with `@theme` configurations).
- **Icons**: [Lucide React](https://lucide.dev/) (highly scalable, clean vector SVG icons).
- **Routing**: [React Router Dom v7](https://reactrouter.com/) (declarative routing for SPAs).
- **Linting**: [Oxlint](https://github.com/oxc-project/oxc) (ultra-fast linter for syntax & code quality validation).

---

## 📂 Project Structure

```bash
kgp-induction-portal/
├── public/                 # Static assets (images, logos)
├── src/
│   ├── assets/             # Images & icons (.svg, .png)
│   ├── components/         # Reusable global layout elements
│   │   ├── Navbar.jsx      # Sticky navbar with mobile drawer & theme toggle
│   │   ├── Footer.jsx      # Portal footer with quick links & scroll-to-top
│   │   └── ScrollToTop.jsx # Router hook to reset window scroll position
│   ├── context/
│   │   └── ThemeContext.jsx# Dark/Light mode state provider
│   ├── data/
│   │   └── mockData.js     # Campus features, clubs, FAQs, and contact data
│   ├── pages/              # Routing page views
│   │   ├── Home.jsx        # Landing page with Hero, Highlights, Clubs, Testimonials
│   │   ├── FAQ.jsx         # Searchable FAQ accordion page
│   │   └── Contact.jsx     # Searchable emergency & support directory page
│   ├── App.css
│   ├── App.jsx             # App initialization and router configuration
│   ├── index.css           # Tailwind v4 configuration, themes & utility classes
│   └── main.jsx            # DOM renderer entrypoint
├── index.html              # HTML structure template (loads Outfit/Inter fonts)
├── package.json            # Scripts and dependencies manifests
└── vite.config.js          # Vite build plugin definitions
```

---

## 🚀 Installation & Local Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and npm installed.

### Step 1: Clone or Navigate to the Directory
Open your terminal and make sure you are in the project folder:
```bash
cd kgp-induction-portal
```

### Step 2: Install Dependencies
Install all required node modules:
```bash
npm install
```
*(Windows PowerShell Note: If you encounter an Execution Policy script error with `npm`, run `npm.cmd install` instead to load the command natively.)*

### Step 3: Run Development Server
Start the local server to run the site:
```bash
npm run dev
```
*(Or use `npm.cmd run dev` on restricted PowerShell environments.)*

Open your browser and navigate to: `http://localhost:5173/`

### Step 4: Build for Production
To build a static production bundle:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory, ready to be deployed to GitHub Pages, Netlify, or Vercel.

### Step 5: Linting
Ensure syntax check compliance:
```bash
npm run lint
```
