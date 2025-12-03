# Data Schema for Lease Sentry

This document outlines the data model for the Lease Sentry application using Azure Cosmos DB. The design follows best practices for minimizing cross-partition queries, embedding related data, and using appropriate partition keys.

## Database: lease-sentry

### Container: accounts
- **Partition Key**: `/userId`
- **Description**: Stores user account information including subscriptions.
- **Document Structure**:
  ```json
  {
    "id": "unique-account-id",
    "userId": "oauth-user-id",
    "subscription": {
      "type": "free|starter|pro"
    }
  }
  ```
- **Rationale**: Separated from profile for independent updates and to avoid large items if profile data grows.

### Container: profiles
- **Partition Key**: `/userId`
- **Description**: Stores user profile data.
- **Document Structure**:
  ```json
  {
    "id": "unique-profile-id",
    "userId": "oauth-user-id",
    "firstName": "string",
    "lastName": "string",
    "state": "string",
    "email": "valid-email"
  }
  ```
- **Rationale**: Separated from account for modularity and to allow profile updates without affecting subscription data.

### Container: contracts
- **Partition Key**: `/userId`
- **Description**: Stores contract documents for each user. Supports querying contracts by user.
- **Document Structure**:
  ```json
  {
    "id": "unique-contract-id",
    "userId": "oauth-user-id",
    "score": 85, // optional, 1-100
    "upload": "2025-12-02T10:00:00Z", // ISO datetime
    "status": "processing|processed",
    "storage": "blob-url",
    "thumbnail": "blob-url"
  }
  ```
- **Rationale**: Contracts are user-specific, partition by userId for efficient queries. If contracts exceed 20GB per partition, consider HPK like `/userId/tenantId`.

### Container: support
- **Partition Key**: `/email`
- **Description**: Stores support requests. Partition by email to group requests per user/email.
- **Document Structure**:
  ```json
  {
    "id": "unique-support-id",
    "userId": "oauth-user-id", // optional
    "email": "valid-email",
    "subject": "string",
    "comment": "string",
    "timestamp": "2025-12-02T10:00:00Z"
  }
  ```
- **Rationale**: Email is required, allows partitioning by email. Anonymous requests are supported.

### Container: reviews
- **Partition Key**: `/email`
- **Description**: Stores user reviews. Partition by email for grouping.
- **Document Structure**:
  ```json
  {
    "id": "unique-review-id",
    "userId": "oauth-user-id", // optional
    "email": "valid-email",
    "rating": 5, // 1-5
    "comment": "string", // optional, <1000 chars
    "timestamp": "2025-12-02T10:00:00Z"
  }
  ```
- **Rationale**: Similar to support, partition by email. Allows anonymous reviews.

## General Notes
- All documents include an `id` field as the unique identifier.
- Use Request Units (RUs) monitoring to adjust throughput.
- For global distribution, enable multi-region writes if needed.
- Data types: Use strings for IDs, integers for scores/ratings, ISO strings for datetimes.
- Validation: Enforce required fields and formats at application level or via triggers.