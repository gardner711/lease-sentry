# Initial Log In Web Component

## Metadata

- **Name**: Initial Log In Web Component
- **Type**: Enabler
- **ID**: ENB-925037
- **Approval**: Not Approved
- **Capability ID**: CAP-398937
- **Owner**: Product Team
- **Status**: In Draft
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
This web component enables the free subscription express login workflow:
- This page is independently navigable by a unique url (/freelogin).
- Displays the log in options from Azure App Service Authentication (Easy Auth)
- Integrates with Azure App Service Authentication (Easy Auth)

On successful log in:
- Create a subscription request and add the free subscription type
- Create a profile and, if available, pre-populate the email, first name, and last name from the log in response
- Call the Subscription API passing it the subscription and profile request
On successful subscription submission, navigate to the Contracts Page (/contracts)

## Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| FR-925037-01 | Display login page at /freelogin | Draft | High |
| FR-925037-02 | Show login options from Azure Easy Auth | Draft | High |
| FR-925037-03 | Integrate with Azure App Service Authentication | Draft | High |
| FR-925037-04 | Create subscription request with free type on login success | Draft | High |
| FR-925037-05 | Create profile request with pre-populated data from login | Draft | High |
| FR-925037-06 | Pre-populate email, first name, last name if available | Draft | Medium |
| FR-925037-07 | Call Subscription API with subscription and profile requests | Draft | High |
| FR-925037-08 | Navigate to /contracts on successful submission | Draft | High |
| FR-925037-09 | Handle login failures and display errors | Draft | High |
| FR-925037-10 | Ensure page is independently navigable | Draft | Medium |

## Non-Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| NFR-925037-01 | Secure authentication handling | Draft | High |
| NFR-925037-02 | Responsive design for login options | Draft | High |
| NFR-925037-03 | Accessible login interface | Draft | High |
| NFR-925037-04 | Page loads within 2 seconds | Draft | High |
| NFR-925037-05 | Pre-population improves user experience | Draft | Medium |
| NFR-925037-06 | Compatible with Azure Easy Auth providers | Draft | High |
| NFR-925037-07 | Error logging for debugging | Draft | Medium |

## Dependencies

### Internal Upstream Dependency

| Enabler ID | Description |
|------------|-------------|
| | |

### Internal Downstream Impact

| Enabler ID | Description |
|------------|-------------|
| | |

### External Dependencies

**External Upstream Dependencies**: None identified.

**External Downstream Impact**: None identified.

## Technical Specifications (Template)

### Enabler Dependency Flow Diagram
```mermaid
flowchart TD
    ENB_XXXXXX["ENB-925037<br/>[Enabler Name]<br/>📡"]

    %% Add your dependency flows here

    classDef enabler fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    class ENB_XXXXXX enabler
```
### API Technical Specifications (if applicable)

| API Type | Operation | Channel / Endpoint | Description | Request / Publish Payload | Response / Subscribe Data |
|----------|-----------|---------------------|-------------|----------------------------|----------------------------|
| | | | | | |

### Data Models
```mermaid
erDiagram
    Entity {
        string id PK
        string name
        string description
    }

    %% Add relationships and more entities here
```
### Class Diagrams
```mermaid
classDiagram
    class ENB_XXXXXX_Class {
        +String property
        +method() void
    }

    %% Add more classes and relationships here
```
### Sequence Diagrams
```mermaid
sequenceDiagram
    participant A as Actor
    participant S as System

    A->>S: Request
    S-->>A: Response

    %% Add more interactions here
```
### Dataflow Diagrams
```mermaid
flowchart TD
    Input[Input Data] --> Process[Process]
    Process --> Output[Output Data]

    %% Add your dataflow diagrams here
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

