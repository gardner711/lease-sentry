# Support API

## Metadata

- **Name**: Support API
- **Type**: Enabler
- **ID**: ENB-606505
- **Approval**: Not Approved
- **Capability ID**: CAP-827120
- **Owner**: Product Team
- **Status**: In Draft
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
A webservice api
- Method POST
- path /support
- Accepts a support request

Saves the request in the "support" container in cosmos db
Sends an email with:
- the subject as the support request subject
- the body as the support request comment
- sends email with a configurable SMTP service with a configurable email address in the to line

## Functional Requirements

| ID | Name | Requirement | Priority | Status | Approval |
|----|------|-------------|----------|--------|----------|
| FR-606505-01 |  | Implement POST /support endpoint | High | Draft | Not Approved |
| FR-606505-02 |  | Accept support data: subject, comment, email | High | Draft | Not Approved |
| FR-606505-03 |  | Extract user id from bearer token if authenticated | High | Draft | Not Approved |
| FR-606505-04 |  | Include user details in stored support request | High | Draft | Not Approved |
| FR-606505-05 |  | Save support request to support container in cosmos | High | Draft | Not Approved |
| FR-606505-06 |  | Send notification email via SMTP service | High | Draft | Not Approved |
| FR-606505-07 |  | Validate subject options and required fields | High | Draft | Not Approved |
| FR-606505-08 |  | Return success/error responses | High | Draft | Not Approved |

## Non-Functional Requirements

| ID | Name | Type | Requirement | Priority | Status | Approval |
|----|------|------|-------------|----------|--------|----------|
| NFR-606505-01 |  |  | Secure handling of user data | High | Draft | Not Approved |
| NFR-606505-02 |  |  | Validate all inputs | High | Draft | Not Approved |
| NFR-606505-03 |  |  | Response time under 2 seconds | High | Draft | Not Approved |
| NFR-606505-04 |  |  | Atomic support request storage | High | Draft | Not Approved |
| NFR-606505-05 |  |  | Comprehensive error logging | Medium | Draft | Not Approved |
| NFR-606505-06 |  |  | Configurable SMTP settings | Medium | Draft | Not Approved |

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
    ENB_XXXXXX["ENB-606505<br/>[Enabler Name]<br/>📡"]

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

