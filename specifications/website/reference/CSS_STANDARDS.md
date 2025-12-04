# CSS Standards for Design System

**Source**: STYLE_GUIDE.md  
**Applies to**: ENB-189342 (Design System Implementation)  
**Created**: November 10, 2025  
**Updated**: November 10, 2025

---

## Overview

This document defines the standardized CSS values, tokens, and patterns that SHALL be implemented in the Design System (ENB-189342). All website enablers MUST follow these standards for consistency.

## Critical Requirements

### CSS Variables Usage
**MANDATORY**: All color references MUST use CSS custom properties (variables) instead of hardcoded hex values. This ensures:
- Consistent theming across light/dark modes
- Single source of truth for color values
- Easy maintenance and updates
- Proper cascade of theme changes

**❌ NEVER DO THIS:**
```css
.button {
  color: #007bff;  /* Hardcoded - BAD */
  border-color: #0056b3;  /* Hardcoded - BAD */
}
```

**✅ ALWAYS DO THIS:**
```css
.button {
  color: var(--primary-color);  /* CSS Variable - GOOD */
  border-color: var(--primary-hover);  /* CSS Variable - GOOD */
}
```

---

## Color Palette

### Primary Colors - shadcn/ui Design System
**Updated November 10, 2025**: Colors updated to match actual shadcn/ui implementation with OKLCH color space
```css
--primary: #030213;           /* Dark blue-black primary */
--primary-foreground: oklch(1 0 0); /* White text on primary */
```

**Legacy values (deprecated):**
```css
/* OLD - DO NOT USE */
--primary-color: #0d6efd;  /* ❌ DEPRECATED - Bootstrap 5 blue */
--primary-hover: #0b5ed7;  /* ❌ DEPRECATED */
--primary-active: #0a58ca; /* ❌ DEPRECATED */

--primary-color: #007bff;  /* ❌ DEPRECATED - Bootstrap 4 blue */
--primary-hover: #0056b3;  /* ❌ DEPRECATED */
--primary-active: #004494; /* ❌ DEPRECATED */
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

### Neutral Gray Scale
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
--text-primary: #212529;
--text-secondary: #6c757d;
--text-muted: #adb5bd;
--text-light: #ffffff;
```

---

## Typography System

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

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Heading Styles
| Element | Size | Weight | Line Height | Margin Bottom |
|---------|------|--------|-------------|---------------|
| h1 | 2.5rem (40px) | 700 | 1.2 | 1.5rem |
| h2 | 2rem (32px) | 600 | 1.3 | 1.25rem |
| h3 | 1.75rem (28px) | 600 | 1.3 | 1rem |
| h4 | 1.5rem (24px) | 600 | 1.4 | 1rem |
| h5 | 1.25rem (20px) | 600 | 1.4 | 0.75rem |
| h6 | 1rem (16px) | 600 | 1.5 | 0.75rem |

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

---

## Spacing Scale

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

---

## Border & Radius

### Border Radius
```css
--radius-sm: 0.125rem;   /* 2px */
--radius-md: 0.25rem;    /* 4px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* Full rounded */
```

---

## Box Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

---

## Transitions & Animations

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

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 576px;   /* Small devices (landscape phones) */
--breakpoint-md: 768px;   /* Medium devices (tablets) */
--breakpoint-lg: 992px;   /* Large devices (desktops) */
--breakpoint-xl: 1200px;  /* Extra large devices (large desktops) */
--breakpoint-xxl: 1400px; /* Extra extra large devices */
```

### Container Widths
```css
/* Mobile first approach */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 576px) {
  .container { max-width: 540px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}

@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}
```

---

## Grid System

### 12-Column Grid
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

/* Column widths */
.col-1  { width: 8.333%; }
.col-2  { width: 16.666%; }
.col-3  { width: 25%; }
.col-4  { width: 33.333%; }
.col-5  { width: 41.666%; }
.col-6  { width: 50%; }
.col-7  { width: 58.333%; }
.col-8  { width: 66.666%; }
.col-9  { width: 75%; }
.col-10 { width: 83.333%; }
.col-11 { width: 91.666%; }
.col-12 { width: 100%; }
```

---

## Component Standards

### Buttons
```css
.btn-primary {
  background-color: var(--primary-color);
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
  background-color: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background-color: var(--primary-active);
  transform: translateY(0);
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

### Form Controls
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
  border-color: var(--primary-color);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(26, 54, 93, 0.25);
}
```

### Form Labels
```css
.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group {
  margin-bottom: 1.5rem;
}
```

### Cards
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
```

### Navigation
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
  color: var(--text-primary);
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
  color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
}
```

---

## Accessibility Standards

### Focus States
```css
*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

### Color Contrast Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio
- **All text over images**: Recommend 7:1 for hero sections

### Keyboard Navigation
- All interactive elements MUST be keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Use `aria-label` for icon-only buttons
- Use `aria-labelledby` to connect labels with form elements
- Use `role` attributes for custom components

---

## Image Standards

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

## Usage Guidelines

### Root CSS Variables Setup
Place these in your root CSS file:

```css
:root {
  /* Colors - shadcn/ui Design System */
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
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

## Implementation Notes

1. **All website enablers** MUST reference ENB-189342 (Design System Implementation) in their dependencies
2. **All new components** MUST use these CSS standards for consistency
3. **Custom modifications** require approval from Product Team
4. **Updates to this document** require corresponding updates to ENB-189342 and affected enablers
5. **Testing** must verify visual consistency across all browsers (Chrome, Firefox, Safari, Edge)
