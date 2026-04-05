# Vista — Strategic Finance Dashboard

Vista is a high-fidelity, Neo-Minimalist financial management platform designed for clarity and impact. Built with a focus on premium aesthetics and fluid motion, it provides real-time visibility into income, expenses, and strategic market velocity.

---

## ✨ High-Fidelity Features

### 💎 Neo-Minimalist Design
A meticulously crafted monochrome interface (Pure Black/White) utilizing **Tailwind CSS v4**. The system prioritizes spacing, typography, and depth through advanced glassmorphism and subtle micro-shadows.

### 🌊 Fluid Motion System
Powered by **Framer Motion**, every interaction in Vista feels organic and responsive:
- **Refractive Glass Hover**: Cards feature a dynamic "light orb" that follows your cursor, simulating physical light hitting a refractive glass surface.
- **Numeric Ticker v3.0**: Financial values roll up with high-performance spring physics, providing a mechanical and premium count-up feel.
- **Staggered Reveals**: View layouts are orchestrated to fade and slide in with a precise, staggered cadence for a cinematic experience.
- **Fixed Info Areas**: Donut charts utilize a structured "top-right" info area to avoid visual collisions with central labels and legends.

### 🔐 Role-Based Access Control (RBAC)
Adaptive UI logic that shifts based on your security profile:
- **Admin (James Kole)**: Full transactional power. Access to the `+ NEW` entry system and row-level modification.
- **Viewer (Sarah Chen)**: Read-only strategic oversight. Sensitive administrative controls are automatically purged from the UI to maintain clear boundaries.

### 📊 Strategic Intelligence
- **Market Velocity Chart**: Interactive balance trend analysis using `Recharts` with custom gradients and smooth interpolation.
- **Saving Wallet**: A high-fidelity allocation chart featuring dynamic data reveals and zero-overlap legends.
- **Automated Observation Cards**: Natural language processing (NLP)-style observations that translate data into actionable insights.

---

## 💻 Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (PostCSS integration)
- **Motion**: Framer Motion (High-performance spring physics)
- **Charts**: Recharts (Custom SVG Gradient Layers)
- **Routing**: React Router DOM v7 (Fluid Page Transitions)
- **Identity**: Dicebear Personalization API

---

## 📂 Architecture

```bash
finance-dashboard/
├── public/                 # Static Assets & Global Typeface
└── src/
    ├── components/         # High-Fidelity Components
    │   ├── dashboard/      # Analytical Charts & Metric Cards
    │   ├── insights/       # Strategic Intelligence Cards
    │   ├── layout/         # Strategic Header, Sidebar, and Navbar
    │   ├── ui/             # Reusable Motion Wrappers (RefractiveCard, Ticker)
    │   └── transactions/   # Transaction Ledger & Security Layers
    ├── context/            # Global Security & App State
    ├── pages/              # Strategic Views (Overview, Ledger, Velocity)
    └── utils/              # Financial Analytics & Formatting
```

---

## 🛠️ Performance Setup

1. **Clone & Initialize**:
   ```bash
   npm install
   ```
2. **Execute Dev Environment**:
   ```bash
   npm run dev
   ```
3. **Strategic Build**:
   ```bash
   npm run build
   ```

---

## 💼 Strategic Vision
Vista is not just a tracker; it's a visual manifestation of financial velocity. Every pixel and every millisecond of transition is designed to provide a sense of professional control and premium craftsmanship.
