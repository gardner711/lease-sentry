# API Schema

## Metadata

- **Name**: API Schema
- **Type**: Enabler
- **ID**: ENB-352820
- **Approval**: Approved
- **Capability ID**: CAP-847291
- **Owner**: Product Team
- **Status**: **IMPLEMENTED**
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
Follow the API Schema found in references\api-schema.yaml and the data schema in references\data-schema.md

## Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| FR-352820-01 | Implement POST /subscription (unauth), GET /subscription (auth), PUT /subscription (auth), DELETE /subscription (auth) as per api-schema.yaml | **IMPLEMENTED** | High |
| FR-352820-02 | Implement PUT /profile (auth), GET /profile (auth) endpoints | **IMPLEMENTED** | High |
| FR-352820-03 | Implement POST /support (unauth) endpoint | **IMPLEMENTED** | Medium |
| FR-352820-04 | Implement POST /review (auth) endpoint | **IMPLEMENTED** | Medium |
| FR-352820-05 | Implement POST /contract (auth), GET /contract (auth with paging/sorting/filtering), GET /contract/{id} (auth), GET /contract/recent (auth), DELETE /contract (auth) | **IMPLEMENTED** | High |
| FR-352820-06 | Implement POST /checkoutsession (auth) endpoint for Stripe checkout sessions | **IMPLEMENTED** | High |
| FR-352820-07 | Enforce authentication for required endpoints using JWTs | **IMPLEMENTED** | High |
| FR-352820-08 | Validate all request payloads against the schemas in data-schema.md | **IMPLEMENTED** | High |
| FR-352820-09 | Store and retrieve data using Azure Cosmos DB as defined in data-schema.md | **IMPLEMENTED** | High |
| FR-352820-10 | Return appropriate HTTP status codes and error messages for invalid requests | **IMPLEMENTED** | High |
| FR-352820-11 | Ensure responses match the OpenAPI schema definitions | **IMPLEMENTED** | High |
| FR-352820-12 | Log all requests and responses for monitoring and debugging | **IMPLEMENTED** | Medium |

## Non-Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| NFR-352820-01 | API responses should be under 500ms for simple operations | **IMPLEMENTED** | High |
| NFR-352820-02 | Handle at least 1000 requests per minute | **IMPLEMENTED** | High |
| NFR-352820-03 | Implement HTTPS, input sanitization, and protect against common vulnerabilities (OWASP Top 10) | **IMPLEMENTED** | High |
| NFR-352820-04 | Scale horizontally to handle increased load using Azure App Service or Kubernetes | **IMPLEMENTED** | Medium |
| NFR-352820-05 | Achieve 99.9% uptime with proper error handling and retries | **IMPLEMENTED** | High |
| NFR-352820-06 | Code should be modular, well-documented, and follow REST API best practices | **IMPLEMENTED** | Medium |
| NFR-352820-07 | Compatible with the API client (ENB-335470) and follow OpenAPI spec | **IMPLEMENTED** | High |
| NFR-352820-08 | Provide metrics, logs, and traces for monitoring with Azure Application Insights | **IMPLEMENTED** | Medium |

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
    ENB_XXXXXX["ENB-352820<br/>[Enabler Name]<br/>📡"]

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

