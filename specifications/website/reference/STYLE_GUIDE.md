# Website Style Guide

**Created:** December 3, 2025
**Updated:** December 3, 2025
**Source:** specifications/references/UI/ - Real Estate Contract Analyzer UI Implementation

## Design Philosophy

This style guide is based on a modern, accessible design system built with **shadcn/ui components**, **Radix UI primitives**, and **Tailwind CSS v4**. The system emphasizes:

- **Accessibility-first approach** with proper focus states, ARIA support, and keyboard navigation
- **Consistent design tokens** using CSS custom properties and OKLCH color space
- **Light and dark theme support** with seamless theme switching
- **Responsive design** that works across all device sizes
- **Component-driven architecture** with reusable, composable UI elements

---

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Buttons](#buttons)
7. [Forms & Inputs](#forms--inputs)
8. [Cards & Containers](#cards--containers)
9. [Navigation](#navigation)
10. [Icons](#icons)
11. [Responsive Design](#responsive-design)
12. [Theme Support](#theme-support)
13. [Accessibility](#accessibility)

---

## Technology Stack

### Core Technologies
- **React 18** - Component framework
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling with OKLCH color space
- **Radix UI** - Unstyled, accessible component primitives
- **shadcn/ui** - Pre-built component library on top of Radix UI
- **Lucide React** - Icon library
- **next-themes** - Theme switching support

### Key Dependencies
```json
{
  "@radix-ui/*": "Comprehensive UI primitives",
  "class-variance-authority": "Component variant management",
  "clsx": "Conditional CSS class merging",
  "tailwind-merge": "Tailwind class conflict resolution",
  "lucide-react": "Icon components"
}
```

---

## Color System

### Design Tokens Structure

The color system uses CSS custom properties with OKLCH color space for better color manipulation and accessibility. All colors support both light and dark themes.

### Light Theme Colors

```css
:root {
  /* Base colors */
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);

  /* Card colors */
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);

  /* Primary brand colors */
  --primary: #030213;           /* Dark blue-black */
  --primary-foreground: oklch(1 0 0);

  /* Secondary colors */
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;

  /* Neutral colors */
  --muted: #ececf0;
  --muted-foreground: #717182;

  /* Accent colors */
  --accent: #e9ebef;
  --accent-foreground: #030213;

  /* Semantic colors */
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;

  /* Border and input colors */
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;

  /* Focus and interaction colors */
  --ring: oklch(0.708 0 0);

  /* Chart colors for data visualization */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}
```

### Dark Theme Colors

```css
.dark {
  /* Base colors - inverted */
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);

  /* Card colors - dark variant */
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);

  /* Primary colors - light on dark */
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);

  /* Secondary colors - adjusted for dark */
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);

  /* Neutral colors - dark variants */
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);

  /* Accent colors - dark variants */
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);

  /* Semantic colors - adjusted for dark */
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);

  /* Border and input - dark variants */
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
}
```

### Color Usage Guidelines

- **Primary (#030213)**: Main brand color for primary buttons, links, and key interactive elements
- **Secondary**: Supporting actions and secondary buttons
- **Muted**: Subtle text and background elements
- **Accent**: Highlighting and focus states
- **Destructive**: Error states and destructive actions
- **Chart colors**: Data visualization with distinct, accessible colors

---

## Typography

### Font System

**System Font Stack** - Optimized for performance and consistency across platforms:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Font Sizes & Weights

```css
/* Base font size */
--font-size: 16px;

/* Font weights */
--font-weight-normal: 400;
--font-weight-medium: 500;

/* Text size scale (based on 16px base) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

### Typography Scale

**Automatic Typography** - Applied when no Tailwind text classes are present:

```css
h1 { font-size: var(--text-2xl); font-weight: var(--font-weight-medium); line-height: 1.5; }
h2 { font-size: var(--text-xl); font-weight: var(--font-weight-medium); line-height: 1.5; }
h3 { font-size: var(--text-lg); font-weight: var(--font-weight-medium); line-height: 1.5; }
h4 { font-size: var(--text-base); font-weight: var(--font-weight-medium); line-height: 1.5; }
p { font-size: var(--text-base); font-weight: var(--font-weight-normal); line-height: 1.5; }
label { font-size: var(--text-base); font-weight: var(--font-weight-medium); line-height: 1.5; }
button { font-size: var(--text-base); font-weight: var(--font-weight-medium); line-height: 1.5; }
input { font-size: var(--text-base); font-weight: var(--font-weight-normal); line-height: 1.5; }
```

---

## Spacing & Layout

### Border Radius Scale

```css
--radius: 0.625rem;        /* 10px - base border radius */
--radius-sm: calc(var(--radius) - 4px);  /* 6px */
--radius-md: calc(var(--radius) - 2px);  /* 8px */
--radius-lg: var(--radius);               /* 10px */
--radius-xl: calc(var(--radius) + 4px);  /* 14px */
```

### Layout Principles

- **Container-based layout** with consistent padding and margins
- **Flexbox and Grid** for responsive layouts
- **Gap-based spacing** using Tailwind's gap utilities
- **Card-based design** with rounded-xl borders and shadow separation

---

## Components

### Component Architecture

All components follow the **shadcn/ui pattern**:
- Built on Radix UI primitives for accessibility
- Styled with Tailwind CSS utilities
- Support for variants using `class-variance-authority`
- TypeScript for type safety
- Consistent API with `asChild` prop for composition

### Available Components

**Layout Components:**
- Card, CardHeader, CardTitle, CardDescription
- Separator
- AspectRatio

**Form Components:**
- Button (variants: default, destructive, outline, secondary, ghost, link)
- Input, Textarea
- Label
- Checkbox, RadioGroup, Switch
- Select, DropdownMenu
- Form validation with react-hook-form

**Feedback Components:**
- Alert, AlertDialog
- Toast (Sonner)
- Progress
- Skeleton

**Navigation Components:**
- NavigationMenu
- Tabs
- Breadcrumb
- Pagination

**Overlay Components:**
- Dialog, Sheet, Popover
- Tooltip, HoverCard
- ContextMenu

**Data Display:**
- Table
- Badge
- Avatar
- Chart (Recharts integration)

---

## Buttons

### Button Variants

```tsx
// Primary action button
<Button>Primary Action</Button>

// Secondary action
<Button variant="secondary">Secondary Action</Button>

// Outline style
<Button variant="outline">Outline Button</Button>

// Ghost style (minimal)
<Button variant="ghost">Ghost Button</Button>

// Destructive action
<Button variant="destructive">Delete</Button>

// Link style
<Button variant="link">Link Button</Button>
```

### Button Sizes

```tsx
// Default size
<Button>Default</Button>

// Small
<Button size="sm">Small</Button>

// Large
<Button size="lg">Large</Button>

// Icon only
<Button size="icon"><Icon /></Button>
```

### Button Styling

- **Border radius**: `rounded-md` (6px)
- **Focus ring**: 3px ring with `ring-ring/50` color
- **Disabled state**: 50% opacity
- **Icon handling**: Automatic sizing and pointer-events management

---

## Forms & Inputs

### Input Components

```tsx
// Basic input
<Input placeholder="Enter text..." />

// With label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>

// Textarea
<Textarea placeholder="Enter description..." />

// Select
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Form Validation

- **Error states**: Red border and focus ring
- **Success states**: Green accents
- **Required fields**: Asterisk in labels
- **Helper text**: Muted color below inputs

### Checkbox & Radio

```tsx
// Checkbox
<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>

// Radio group
<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>
```

---

## Cards & Containers

### Card Structure

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

### Card Styling

- **Background**: `bg-card`
- **Border**: Subtle border with `border`
- **Border radius**: `rounded-xl` (10px)
- **Padding**: 6 units (24px) with gap-6 between sections
- **Shadow**: Subtle shadow for depth

### Container Patterns

- **Grid layouts**: `grid auto-rows-min` for flexible content
- **Flex layouts**: `flex flex-col gap-6` for vertical stacking
- **Responsive containers**: `@container` queries for component-based responsive design

---

## Navigation

### Navigation Patterns

- **Top navigation**: Fixed header with logo, menu, and user actions
- **Breadcrumb navigation**: Clear page hierarchy
- **Tab navigation**: Section-based content switching
- **Pagination**: Large dataset navigation

### NavigationMenu Component

```tsx
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        {/* Dropdown content */}
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

---

## Icons

### Icon Library

**Lucide React** - Comprehensive icon set with consistent styling:

```tsx
import {
  FileText, Shield, Zap, TrendingUp,
  CheckCircle2, Star, ArrowRight, Users,
  Award, Clock, Search, Settings
} from 'lucide-react';

// Usage
<Shield className="h-4 w-4" />
<TrendingUp className="h-6 w-6 text-green-500" />
```

### Icon Guidelines

- **Size consistency**: Use Tailwind size classes (h-4 w-4, h-6 w-6, etc.)
- **Color theming**: Use text color classes or theme-aware colors
- **Pointer events**: Disabled on icons within interactive elements
- **Accessibility**: Icons should have descriptive text alternatives

---

## Responsive Design

### Breakpoint System

Tailwind CSS v4 responsive breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Responsive Patterns

```tsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8">
```

### Container Queries

Component-based responsive design:

```css
@container card-header (min-width: 300px) {
  .card-title { font-size: var(--text-lg); }
}
```

---

## Theme Support

### Theme Implementation

**next-themes** for seamless theme switching:

```tsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* App content */}
    </ThemeProvider>
  );
}
```

### Theme Variables

All CSS custom properties automatically switch between light and dark variants based on the `dark` class on the html element.

### Theme Toggle

```tsx
// Theme toggle button implementation
<button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
  Toggle Theme
</button>
```

---

## Accessibility

### Accessibility Features

- **Keyboard navigation**: All interactive elements focusable and operable via keyboard
- **Screen reader support**: Proper ARIA labels and semantic HTML
- **Focus management**: Visible focus indicators with `ring-ring/50`
- **Color contrast**: OKLCH color space ensures proper contrast ratios
- **Reduced motion**: Respects `prefers-reduced-motion` setting

### ARIA Implementation

```tsx
// Proper labeling
<Label htmlFor="email">Email Address</Label>
<Input id="email" aria-describedby="email-help" />

// Status messages
<div role="status" aria-live="polite">
  Form submitted successfully
</div>
```

### Focus States

- **Ring color**: `ring-ring/50` (semi-transparent focus ring)
- **Ring width**: 3px
- **Ring offset**: None (direct on element)

---

## Implementation Guidelines

### Component Usage

1. **Always use shadcn/ui components** instead of custom implementations
2. **Leverage Radix UI primitives** for complex interactions
3. **Use Tailwind utilities** for custom styling needs
4. **Follow the design token system** for colors and spacing
5. **Test in both light and dark themes**

### Observed Usage Patterns

Based on the reference implementation:

- **Button Variants**: Primary buttons for main actions, secondary for supporting actions, outline for less prominent actions
- **Form Handling**: React Hook Form integration with proper validation states
- **Icon Usage**: Lucide React icons with consistent sizing (h-4 w-4, h-6 w-6)
- **Layout Patterns**: Card-based design with proper spacing and shadows
- **Responsive Design**: Mobile-first approach with breakpoint-specific adjustments

### Development Workflow

1. **Check existing components** in `src/components/ui/` first
2. **Use the component generator** for new shadcn/ui components
3. **Follow TypeScript patterns** for type safety
4. **Test accessibility** with keyboard and screen readers
5. **Validate responsive behavior** across breakpoints

### File Organization

The reference implementation follows this structure:

```
specifications/references/UI/
├── src/
│   ├── components/
│   │   ├── ui/           # shadcn/ui components (40+ components)
│   │   ├── Homepage.tsx  # Landing page component
│   │   ├── AnalysisTool.tsx # Main analysis interface
│   │   └── *.tsx         # Feature-specific components
│   ├── styles/
│   │   └── globals.css   # Design tokens and theme variables
│   ├── guidelines/
│   │   └── Guidelines.md # AI development guidelines
│   └── index.css         # Tailwind CSS v4 imports
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

### Theme Provider Setup

For theme switching functionality, wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

This style guide ensures consistent, accessible, and maintainable UI implementation across the lease-sentry application.

