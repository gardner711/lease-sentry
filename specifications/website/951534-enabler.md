# Header

## Metadata

- **Name**: Header
- **Type**: Enabler
- **ID**: ENB-951534
- **Approval**: Approved
- **Capability ID**: CAP-924443
- **Owner**: Product Team
- **Status**: Fully implemented with theme toggle and matches STYLE_GUIDE.md specifications
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
Implements a responsive header component with a clean, professional design, featuring a fixed-height navigation bar with logo, title, navigation elements, and theme toggle functionality. The header uses a white background with dark text in light mode and dark background with light text in dark mode per STYLE_GUIDE.md, providing consistent branding and navigation across all pages of the website with full theme support.
The title is configurable and will change based on environment e.g. Lease Sentry (test) or Lease Sentry (dev)

## Functional Requirements

| ID | Name | Requirement | Priority | Status | Approval |
|----|------|-------------|----------|--------|----------|
| FR-951001 | Header Container | The header must be a fixed-height container at the top of every page with a height of 64px | High | Implemented | Approved |
| FR-951002 | Logo Display | The header must display a logo on the left side with dimensions 32x32px, positioned 16px from the left edge | High | Implemented | Approved |
| FR-951003 | Title Display | The header must display the website title text immediately adjacent to the logo (8px spacing), using a clear, readable font at 24px size (1.5rem) | High | Implemented | Approved |
| FR-951004 | Horizontal Layout | Logo and title must be arranged horizontally in a flex container with centered vertical alignment | High | Implemented | Approved |
| FR-951005 | Navigation Items | The header must support additional navigation items positioned to the right of the title | Medium | Implemented | Approved |
| FR-951006 | Light Background | The header must have a white background color with light shadow per STYLE_GUIDE.md | Medium | Implemented | Approved |
| FR-951007 | Text Contrast | Title and navigation text must be dark colored (#212529 for title, #6c757d for links) for contrast against the white background in light mode, and light colored (#e6edf3 for title, #8b949e for links) in dark mode | High | Implemented | Approved |
| FR-951008 | Logo Link | The logo and title must function as a clickable link to return to the home page | Medium | Implemented | Approved |
| FR-951009 | Theme Toggle | The header must include a theme toggle button that switches between light and dark modes with visual feedback (moon icon for light mode, sun icon for dark mode) | High | Implemented | Approved |
| FR-951010 | Theme Persistence | The selected theme must persist across page refreshes using localStorage | High | Implemented | Approved |

## Non-Functional Requirements

| ID | Name | Type | Requirement | Priority | Status | Approval |
|----|------|------|-------------|----------|--------|----------|
| NFR-951001 | Responsive Design | Usability | The header must maintain its layout and proportions across desktop, tablet, and mobile screen sizes (min-width: 320px) | High | Ready for Implementation | Not Approved |
| NFR-951002 | Load Performance | Performance | Header assets (logo image) must load within 200ms on standard connections | Medium | Ready for Implementation | Not Approved |
| NFR-951003 | Browser Compatibility | Compatibility | The header must render consistently across Chrome, Firefox, Safari, and Edge browsers | High | Ready for Implementation | Not Approved |
| NFR-951004 | Accessibility | Accessibility | The header must meet WCAG 2.1 Level AA standards with proper semantic HTML and ARIA labels | High | Ready for Implementation | Not Approved |
| NFR-951005 | Sticky Positioning | Usability | The header must remain fixed at the top of the viewport during page scrolling | Medium | Ready for Implementation | Not Approved |
| NFR-951006 | Visual Consistency | Maintainability | Header styling must use CSS variables for colors and dimensions to enable theme customization | Low | Ready for Implementation | Not Approved |

## Dependencies

### Internal Upstream Dependency

| Enabler ID | Description |
|------------|-------------|
| ENB-189342 | Design System Implementation - provides color scheme, typography, and spacing standards |

### Internal Downstream Impact

| Enabler ID | Description |
|------------|-------------|
| ENB-501283 | Web Application - uses the header component on all application pages |

### External Dependencies

**External Upstream Dependencies**: None identified.

**External Downstream Impact**: None identified.

## Technical Specifications (Template)

### Enabler Dependency Flow Diagram
```mermaid
flowchart TD
    ENB_189342["ENB-189342<br/>Design System<br/>🎨"]
    ENB_951534["ENB-951534<br/>Header<br/>📡"]
    ENB_501283["ENB-501283<br/>Web Application<br/>🌐"]

    ENB_189342 --> ENB_951534
    ENB_951534 --> ENB_501283

    classDef enabler fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    class ENB_189342,ENB_951534,ENB_501283 enabler
```
### API Technical Specifications (if applicable)

| API Type | Operation | Channel / Endpoint | Description | Request / Publish Payload | Response / Subscribe Data |
|----------|-----------|---------------------|-------------|----------------------------|----------------------------|
| | | | | | |

### Data Models
```mermaid
erDiagram
    HeaderConfig {
        string logoUrl
        string logoAlt
        string titleText
        string homeUrl
        number height
        string backgroundColor
        string textColor
    }
    
    NavigationItem {
        string id PK
        string label
        string url
        number order
        boolean isActive
    }
    
    HeaderConfig ||--o{ NavigationItem : contains
```
### Class Diagrams
```mermaid
classDiagram
    class Header {
        -string logoUrl
        -string logoAlt
        -string titleText
        -string homeUrl
        -NavigationItem[] navItems
        +render() JSX.Element
        +handleLogoClick() void
        +renderNavigation() JSX.Element
    }
    
    class NavigationItem {
        -string id
        -string label
        -string url
        -number order
        -boolean isActive
        +render() JSX.Element
    }
    
    Header "1" --> "*" NavigationItem : contains
```
### Sequence Diagrams
```mermaid
sequenceDiagram
    participant User
    participant Header
    participant Router
    participant HomePage

    User->>Header: Page loads
    Header->>Header: Render logo (32x32px)
    Header->>Header: Render title text (20px)
    Header->>Header: Apply dark theme (#24292f)
    Header-->>User: Display header (64px height)
    
    User->>Header: Click logo/title
    Header->>Router: Navigate to home
    Router->>HomePage: Load home page
    HomePage-->>User: Display home page with header
```
### Dataflow Diagrams
```mermaid
flowchart LR
    Config[Header Configuration] --> Header[Header Component]
    DesignSystem[Design System CSS Variables] --> Header
    LogoAsset[Logo Image Asset] --> Header
    
    Header --> HeaderDOM[Rendered Header DOM]
    
    HeaderDOM --> LogoElement[Logo 32x32px]
    HeaderDOM --> TitleElement[Title Text 20px]
    HeaderDOM --> NavElements[Navigation Items]
    
    User[User Interaction] --> HeaderDOM
    HeaderDOM --> Router[Router Navigation]
```
### State Diagrams
```mermaid
stateDiagram-v2
    [*] --> Initial
    Initial --> Processing
    Processing --> Complete
    Complete --> [*]

    %% Add more states and transitions here
```

