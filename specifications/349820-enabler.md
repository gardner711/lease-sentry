# Recent Contracts API

## Metadata

- **Name**: Recent Contracts API
- **Type**: Enabler
- **ID**: ENB-349820
- **Approval**: Not Approved
- **Capability ID**: CAP-574476
- **Owner**: Product Team
- **Status**: In Draft
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
A webservice API that gets a list of the top 10 most recent contracts
- GET method
- /contract/recent path
- Returns an array of contract documents

Gets the top 10 most recent contracts from the "contract" container in cosmos db
Orders the list by upload datetime descending

## Functional Requirements

| ID | Name | Requirement | Priority | Status | Approval |
|----|------|-------------|----------|--------|----------|
| FR-349820-01 |  | Implement GET /contract/recent endpoint | High | Draft | Not Approved |
| FR-349820-02 |  | Query top 10 contracts by upload datetime descending | High | Draft | Not Approved |
| FR-349820-03 |  | Return array of contract documents | High | Draft | Not Approved |
| FR-349820-04 |  | Extract user id from bearer token | High | Draft | Not Approved |
| FR-349820-05 |  | Filter contracts by user id | High | Draft | Not Approved |
| FR-349820-06 |  | Handle cases with less than 10 contracts | Medium | Draft | Not Approved |
| FR-349820-07 |  | Return appropriate response format | High | Draft | Not Approved |

## Non-Functional Requirements

| ID | Name | Type | Requirement | Priority | Status | Approval |
|----|------|------|-------------|----------|--------|----------|
| NFR-349820-01 |  |  | Response time under 1 second | High | Draft | Not Approved |
| NFR-349820-02 |  |  | Secure token handling | High | Draft | Not Approved |
| NFR-349820-03 |  |  | Efficient cosmos query | High | Draft | Not Approved |
| NFR-349820-04 |  |  | Handle high request volume | Medium | Draft | Not Approved |
| NFR-349820-05 |  |  | Comprehensive error logging | Medium | Draft | Not Approved |

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
    ENB_XXXXXX["ENB-349820<br/>[Enabler Name]<br/>📡"]

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

