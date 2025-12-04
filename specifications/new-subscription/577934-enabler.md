# New Profile Web Component

## Metadata

- **Name**: New Profile Web Component
- **Type**: Enabler
- **ID**: ENB-577934
- **Approval**: Approved
- **Capability ID**: CAP-329283
- **Owner**: Product Team
- **Status**: Ready for Implementation
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
Step four of a multi-step wizard:
- This step is independently navigable by a unique url (/newprofile).
- Adds the session id to the subscription request
- Enables the user to enter a First Name, Last Name, Email address (pre-populates with any email address from the login), State from a drop down of the 50 u.s. states

On submission, call the Subscription API passing it the subscription and profile request
On success, navigates to the Contracts Page (/contracts)

## Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| FR-577934-01 | Display profile creation page at /newprofile | Draft | High |
| FR-577934-02 | Add session id to subscription request | Draft | High |
| FR-577934-03 | Provide form for First Name input | Draft | High |
| FR-577934-04 | Provide form for Last Name input | Draft | High |
| FR-577934-05 | Provide form for Email input with pre-population | Draft | High |
| FR-577934-06 | Provide dropdown for State selection (50 US states) | Draft | High |
| FR-577934-07 | Validate all form inputs | Draft | High |
| FR-577934-08 | Call Subscription API with subscription and profile data | Draft | High |
| FR-577934-09 | Navigate to /contracts on successful submission | Draft | High |
| FR-577934-10 | Handle API errors and display to user | Draft | High |

## Non-Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| NFR-577934-01 | Pre-populate email from login if available | Draft | Medium |
| NFR-577934-02 | Responsive form design | Draft | High |
| NFR-577934-03 | Accessible form controls | Draft | High |
| NFR-577934-04 | Secure form submission | Draft | High |
| NFR-577934-05 | Page loads within 2 seconds | Draft | High |
| NFR-577934-06 | Client-side validation for better UX | Draft | Medium |
| NFR-577934-07 | Compatible with modern browsers | Draft | Medium |

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
    ENB_XXXXXX["ENB-577934<br/>[Enabler Name]<br/>📡"]

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

