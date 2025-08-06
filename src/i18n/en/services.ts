export default {
  heading: "Services",
  metaTitle: "Services — Quim Romero (Frontend)",
  metaDescription:
    "I design and build interfaces in React/TypeScript: landings, e-commerce and dashboards. Clear packages, prices from X, measurable delivery.",
  intro:
    "Clear packages so you know what you get and when: conversion, accessibility and performance first. I use metrics (Lighthouse, axe) and CI/CD.",
  ctas: {
    contact: "Request a quote",
    emailText: "Prefer email? Reach me at",
  },
  packagesTitle: "Packages",
  from: "From",
  ui: {
    seeDetails: "See details",
    hideDetails: "Hide details",
    includes: "Includes",
    deliverables: "Deliverables",
    close: "Close",
    currency: "Currency",
  },
  packages: [
    {
      id: "landing",
      title: "Landing",
      desc: "1–3 sections, animated and optimized. Perfect for launches and quick validation.",
      timeline: "1–2 weeks",
      features: [
        "UX/copy review and clear structure",
        "Subtle motion & microinteractions",
        "Base SEO (meta, OG), analytics, favicon",
        "Lighthouse 90+ performance target",
        "Base accessibility (keyboard/focus)",
      ],
      deliverables: [
        "Repository and deployment (Vercel/Netlify)",
        "Quick editing/content guide",
      ],
    },
    {
      id: "ecommerce",
      title: "Basic e-commerce",
      desc: "Catalog + Stripe Checkout. A solid base to start selling.",
      timeline: "2–3 weeks",
      features: [
        "Catalog up to 20 products",
        "Cart and Stripe Checkout",
        "Legal pages and basic emails",
        "Analytics and base SEO",
        "Performance and accessibility",
      ],
      deliverables: ["Repository and deployment", "Product management guide"],
    },
    {
      id: "dashboard",
      title: "Dashboard",
      desc: "Data, filters and charts. Clear, accessible and performant.",
      timeline: "2–3 weeks",
      features: [
        "Table with filters and empty states",
        "Charts with Chart.js",
        "Keyboard shortcuts & visible focus",
        "Performance budgets",
      ],
      deliverables: [
        "Repository and deployment",
        "Mock API or your data integration",
      ],
    },
  ],
  formTitle: "Tell me about your project",
  form: {
    name: "Name",
    email: "Email",
    goal: "Goal / What you need",
    budget: "Approx. budget",
    submit: "Send",
    success: "Got it! I’ll get back to you soon.",
  },
  breadcrumbHome: "Home",
};
