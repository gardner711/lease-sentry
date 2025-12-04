# Subscription Configurations

## Metadata

- **Name**: Subscription Configurations
- **Type**: Enabler
- **ID**: ENB-828574
- **Approval**: Approved
- **Capability ID**: CAP-081697
- **Owner**: Product Team
- **Status**: Ready for Implementation
- **Priority**: High
- **Analysis Review**: Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
Each subscription will have a unique set of Stripe id's that will be required when calling into the Stripe integration per environment (dev, test, production).
- enforce payment available on both the website and webserver that when false bypasses the need to make a payment from Stripe
- secret key: starts with sk_ and is available on the webserver
- public key: starts with pk_ and is available on the website
- starter price id: for the starter subscription type, starts with price_ and is available on the website
- pro price id: for the pro subscription type, starts with price_ and is available on the website
- The free subscription type does not integrate with Strip and has no pricing information


## Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| FR-828574-01 | Store Stripe secret key per environment with sk_ prefix | Draft | High |
| FR-828574-02 | Store Stripe public key per environment with pk_ prefix | Draft | High |
| FR-828574-03 | Store starter subscription price ID per environment with price_ prefix | Draft | High |
| FR-828574-04 | Store pro subscription price ID per environment with price_ prefix | Draft | High |
| FR-828574-05 | Implement payment available flag to bypass Stripe integration | Draft | High |
| FR-828574-06 | Provide secret key access to webserver components only | Draft | High |
| FR-828574-07 | Provide public key access to website components only | Draft | High |
| FR-828574-08 | Provide price IDs access to website components only | Draft | High |
| FR-828574-09 | Support environment-specific configurations (dev/test/production) | Draft | High |
| FR-828574-10 | Handle free subscription without Stripe integration | Draft | Medium |
| FR-828574-11 | Validate Stripe key formats and prefixes | Draft | High |
| FR-828574-12 | Enforce payment bypass when payment available flag is false | Draft | High |

## Non-Functional Requirements

| ID | Requirement | Status | Priority |
|----|------------|--------|----------|
| NFR-828574-01 | Secure storage and access control for Stripe secret keys | Draft | High |
| NFR-828574-02 | Environment isolation for configuration data | Draft | High |
| NFR-828574-03 | Fast configuration retrieval for payment processing | Draft | High |
| NFR-828574-04 | Comprehensive validation of Stripe configuration values | Draft | High |
| NFR-828574-05 | Audit logging for configuration changes | Draft | Medium |
| NFR-828574-06 | Configuration versioning and rollback capability | Draft | Medium |
| NFR-828574-07 | PCI DSS compliance for payment configuration handling | Draft | High |

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
    ENB_XXXXXX["ENB-828574<br/>[Enabler Name]<br/>📡"]

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

