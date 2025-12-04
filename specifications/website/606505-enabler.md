# Support API

## Metadata

- **Name**: Support API
- **Type**: Enabler
- **ID**: ENB-606505
- **Approval**: Approved
- **Capability ID**: CAP-827120
- **Owner**: Product Team
- **Status**: Ready for Implementation
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
| FR-606505-01 |  | Implement POST /support endpoint | High | Ready for Implementation | Approved |
| FR-606505-02 |  | Accept support data: subject, comment, email | High | Ready for Implementation | Approved |
| FR-606505-03 |  | Extract user id from JWT if authenticated | High | Ready for Implementation | Approved |
| FR-606505-04 |  | Include user details in stored support request | High | Ready for Implementation | Approved |
| FR-606505-05 |  | Save support request to support container in cosmos | High | Ready for Implementation | Approved |
| FR-606505-06 |  | Send notification email via SMTP service | High | Ready for Implementation | Approved |
| FR-606505-07 |  | Validate subject options and required fields | High | Ready for Implementation | Approved |
| FR-606505-08 |  | Return success/error responses | High | Ready for Implementation | Approved |

## Non-Functional Requirements

| ID | Name | Type | Requirement | Priority | Status | Approval |
|----|------|------|-------------|----------|--------|----------|
| NFR-606505-01 |  |  | Secure handling of user data | High | Ready for Implementation | Approved |
| NFR-606505-02 |  |  | Validate all inputs | High | Ready for Implementation | Approved |
| NFR-606505-03 |  |  | Response time under 2 seconds | High | Ready for Implementation | Approved |
| NFR-606505-04 |  |  | Atomic support request storage | High | Ready for Implementation | Approved |
| NFR-606505-05 |  |  | Comprehensive error logging | Medium | Ready for Implementation | Approved |
| NFR-606505-06 |  |  | Configurable SMTP settings | Medium | Ready for Implementation | Approved |

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
