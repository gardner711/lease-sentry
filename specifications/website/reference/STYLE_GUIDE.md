# Website Style Guide

**Created:** November 10, 2025  
**Updated:** November 10, 2025  
**Source:** http://localhost:5133/

## Design Philosophy

This style guide emphasizes a **Ford blue color scheme** for primary interactions, buttons, links, and highlights. The Ford blue primary (#1a365d) provides strong visual hierarchy and clear call-to-action elements throughout the interface. This blue-forward approach creates a professional, trustworthy aesthetic while maintaining excellent readability and accessibility.

**Key Color Principle:** Use the Ford blue (#1a365d) consistently for:
- Primary buttons and CTAs
- Links and interactive text
- Active navigation states
- Focus indicators
- Form field highlights
- Icons and accents

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Buttons](#buttons)
6. [Forms](#forms)
7. [Navigation](#navigation)
8. [Cards](#cards)
9. [Icons & Images](#icons--images)
10. [Animations & Transitions](#animations--transitions)
11. [Responsive Breakpoints](#responsive-breakpoints)
12. [Accessibility Guidelines](#accessibility-guidelines)

---

## Color Palette

### Primary Colors
**Ford Blue Theme - Primary interaction color for buttons, links, and highlights**
```css
--primary-color: #1a365d;     /* Ford blue primary - default state */
--primary-hover: #142a4a;     /* Darker Ford blue - hover state */
--primary-active: #0f1f37;    /* Deep Ford blue - active/pressed state */
```

**Alternative Blue Shades**
```css
--blue-100: #d1d9e3;
--blue-200: #a3b3c7;
--blue-300: #758dab;
--blue-400: #47678f;
--blue-500: #1a365d;          /* Ford blue primary */
--blue-600: #142a4a;
--blue-700: #0f1f37;
--blue-800: #0a1425;
--blue-900: #050a12;
```

### Secondary Colors
```css
--secondary-color: #6c757d;
--secondary-hover: #5a6268;
--secondary-active: #545b62;
```

### Accent Colors
```css
--accent-color: #28a745;
--accent-hover: #218838;
--accent-active: #1e7e34;
```

### Semantic Colors
```css
--success: #28a745;
--info: #17a2b8;
--warning: #ffc107;
--danger: #dc3545;
--light: #f8f9fa;
--dark: #343a40;
```

### Neutral Colors
```css
--white: #ffffff;
--gray-100: #f8f9fa;
--gray-200: #e9ecef;
--gray-300: #dee2e6;
--gray-400: #ced4da;
--gray-500: #adb5bd;
--gray-600: #6c757d;
--gray-700: #495057;
--gray-800: #343a40;
--gray-900: #212529;
--black: #000000;
```

### Background Colors
```css
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-dark: #212529;
```

### Text Colors
```css
--text-primary: #212529;       /* Dark gray for body text */
--text-secondary: #6c757d;     /* Medium gray for secondary text */
--text-muted: #adb5bd;         /* Light gray for muted text */
--text-light: #ffffff;         /* White text */
--text-link: #1a365d;          /* Ford blue for links */
--text-link-hover: #142a4a;    /* Darker Ford blue for link hover */
--text-header: #1a365d;        /* Ford blue for main headers/titles */
```

---

## Typography

### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-secondary: Georgia, "Times New Roman", Times, serif;
--font-mono: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
```

### Font Sizes
```css
--font-xs: 0.75rem;      /* 12px */
--font-sm: 0.875rem;     /* 14px */
--font-base: 1rem;       /* 16px */
--font-lg: 1.125rem;     /* 18px */
--font-xl: 1.25rem;      /* 20px */
--font-2xl: 1.5rem;      /* 24px */
--font-3xl: 1.875rem;    /* 30px */
--font-4xl: 2.25rem;     /* 36px */
--font-5xl: 3rem;        /* 48px */
```

### Headings
**Ford Blue headings for brand consistency and visual hierarchy**
```css
h1 {
  font-size: 2.5rem;      /* 40px */
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a365d;         /* Ford blue for h1 */
}

h2 {
  font-size: 2rem;        /* 32px */
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1.25rem;
  color: #1a365d;         /* Ford blue for h2 */
}

h3 {
  font-size: 1.75rem;     /* 28px */
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 1rem;
  color: #1a365d;         /* Ford blue for h3 */
}

h4 {
  font-size: 1.5rem;      /* 24px */
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1rem;
}

h5 {
  font-size: 1.25rem;     /* 20px */
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

h6 {
  font-size: 1rem;        /* 16px */
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.75rem;
}
```

**Note:** H1-H3 headings use the Ford blue color (#1a365d) to establish strong visual hierarchy and brand consistency. H4-H6 can remain dark gray for subtler hierarchy levels.

### Body Text
```css
body {
  font-family: var(--font-primary);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-primary);
}

p {
  margin-bottom: 1rem;
}
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

---

## Spacing & Layout

### Spacing Scale
```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
```

### Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.container-fluid {
  width: 100%;
  padding: 0 1rem;
}
```

### Grid System
```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
}

.col {
  flex: 1;
  padding: 0 0.5rem;
}

/* 12-column grid */
.col-1 { width: 8.333%; }
.col-2 { width: 16.666%; }
.col-3 { width: 25%; }
.col-4 { width: 33.333%; }
.col-5 { width: 41.666%; }
.col-6 { width: 50%; }
.col-7 { width: 58.333%; }
.col-8 { width: 66.666%; }
.col-9 { width: 75%; }
.col-10 { width: 83.333%; }
.col-11 { width: 91.666%; }
.col-12 { width: 100%; }
```

---

## Components

### Border Radius
```css
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.25rem;    /* 4px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* Full rounded */
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

---

## Buttons

### Primary Button
**Ford Blue button - main call-to-action style**
```css
.btn-primary {
  background-color: #1a365d;    /* Ford blue background */
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: #142a4a;    /* Darker Ford blue on hover */
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(26, 54, 93, 0.3);  /* Ford blue-tinted shadow */
}

.btn-primary:active {
  background-color: #0f1f37;    /* Deep Ford blue when pressed */
  transform: translateY(0);
}

.btn-primary:focus {
  box-shadow: 0 0 0 0.25rem rgba(26, 54, 93, 0.5);  /* Ford blue focus ring */
}
```

### Secondary Button
```css
.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
```

### Outline Button
**Ford Blue outline - secondary action style**
```css
.btn-outline {
  background-color: transparent;
  color: #1a365d;               /* Ford blue text */
  padding: 0.5rem 1.5rem;
  border: 2px solid #1a365d;    /* Ford blue border */
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background-color: #1a365d;    /* Fill with Ford blue on hover */
  color: white;
  box-shadow: 0 4px 8px rgba(26, 54, 93, 0.25);
}
```

### Button Sizes
```css
.btn-sm {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 0.75rem 2rem;
  font-size: 1.125rem;
}
```

---

## Forms

### Input Fields
```css
.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: white;
  border: 1px solid var(--gray-400);
  border-radius: var(--radius-md);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #1a365d;        /* Ford blue border on focus */
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(26, 54, 93, 0.25);  /* Ford blue focus ring */
}
```

### Labels
```css
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}
```

### Form Groups
```css
.form-group {
  margin-bottom: 1.5rem;
}
```

### Select Dropdown
```css
.form-select {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
  background-color: white;
  border: 1px solid var(--gray-400);
  border-radius: var(--radius-md);
  appearance: none;
  background-image: url("data:image/svg+xml,..."); /* dropdown arrow */
}
```

### Checkbox & Radio
```css
.form-check-input {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  vertical-align: middle;
  cursor: pointer;
}
```

---

## Navigation

### Navbar
**Ford Blue branding in navigation for consistency**
```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: var(--shadow-sm);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a365d;              /* Ford blue for brand/title */
  text-decoration: none;
}

.navbar-nav {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #1a365d;               /* Ford blue on hover */
}

.nav-link.active {
  color: #1a365d;               /* Ford blue for active link */
  font-weight: 600;
}
```

**Note:** The navbar brand/title uses Ford blue (#1a365d) to maintain brand consistency and visual prominence.

---

## Cards

### Basic Card
```css
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  padding: 1.25rem;
  background-color: var(--gray-100);
  border-bottom: 1px solid var(--gray-300);
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1.25rem;
  background-color: var(--gray-100);
  border-top: 1px solid var(--gray-300);
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}
```

---

## Icons & Images

### Image Styles
```css
.img-fluid {
  max-width: 100%;
  height: auto;
}

.img-rounded {
  border-radius: var(--radius-lg);
}

.img-circle {
  border-radius: var(--radius-full);
}
```

### Icon Sizes
```css
.icon-sm { font-size: 1rem; }
.icon-md { font-size: 1.5rem; }
.icon-lg { font-size: 2rem; }
.icon-xl { font-size: 3rem; }
```

---

## Animations & Transitions

### Standard Transitions
```css
--transition-fast: 0.15s ease-in-out;
--transition-base: 0.2s ease-in-out;
--transition-slow: 0.3s ease-in-out;
```

### Common Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Hover Effects
```css
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}
```

---

## Responsive Breakpoints

### Breakpoint Values
```css
/* Mobile first approach */
--breakpoint-sm: 576px;   /* Small devices (landscape phones) */
--breakpoint-md: 768px;   /* Medium devices (tablets) */
--breakpoint-lg: 992px;   /* Large devices (desktops) */
--breakpoint-xl: 1200px;  /* Extra large devices (large desktops) */
--breakpoint-xxl: 1400px; /* Extra extra large devices */
```

### Media Queries
```css
/* Small devices and up */
@media (min-width: 576px) {
  .container { max-width: 540px; }
}

/* Medium devices and up */
@media (min-width: 768px) {
  .container { max-width: 720px; }
}

/* Large devices and up */
@media (min-width: 992px) {
  .container { max-width: 960px; }
}

/* Extra large devices and up */
@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
```

---

## Accessibility Guidelines

### Color Contrast
- Ensure text has a contrast ratio of at least 4.5:1 for normal text
- Large text (18pt+ or 14pt+ bold) should have a contrast ratio of at least 3:1

### Focus States
**Ford Blue focus indicators for accessibility**
```css
*:focus {
  outline: 2px solid #1a365d;  /* Ford blue outline */
  outline-offset: 2px;
}

button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid #1a365d;  /* Ford blue outline */
  outline-offset: 2px;
}

/* Alternative focus ring style */
*:focus-visible {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(26, 54, 93, 0.5);  /* Ford blue glow */
}
```

### ARIA Labels
- Use `aria-label` for icon-only buttons
- Use `aria-labelledby` to connect labels with form elements
- Use `role` attributes for custom components

### Keyboard Navigation
- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators

---

## Usage Examples

### Complete Button Example
```html
<button class="btn-primary btn-lg">
  Click Me
</button>
```

### Complete Form Example
```html
<form>
  <div class="form-group">
    <label class="form-label" for="email">Email</label>
    <input type="email" id="email" class="form-control" placeholder="Enter email">
  </div>
  <button type="submit" class="btn-primary">Submit</button>
</form>
```

### Complete Card Example
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    <p class="card-text">This is some card content.</p>
    <button class="btn-primary">Action</button>
  </div>
</div>
```

---

## CSS Variables Setup

Place these in your root CSS file:

```css
:root {
  /* Primary Colors - Ford Blue Theme */
  --primary-color: #1a365d;
  --primary-hover: #142a4a;
  --primary-active: #0f1f37;
  
  /* Blue Scale */
  --blue-500: #1a365d;
  --blue-600: #142a4a;
  --blue-700: #0f1f37;
  --blue-800: #0a1425;
  
  /* Secondary & Semantic Colors */
  --secondary-color: #6c757d;
  --success: #28a745;
  --danger: #dc3545;
  --warning: #ffc107;
  --info: #17a2b8;
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 0.15s ease-in-out;
  --transition-base: 0.2s ease-in-out;
  --transition-slow: 0.3s ease-in-out;
  
  /* Typography */
  --font-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

---

## Notes

- This style guide is based on observation of http://localhost:5133/
- Adjust color values, spacing, and sizes to match your specific design needs
- Test all components across different browsers and devices
- Maintain consistency throughout your application
- Update this guide as your design system evolves

