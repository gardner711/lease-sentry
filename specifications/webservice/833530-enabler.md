# Azure Event Grid Integration

## Metadata

- **Name**: Azure Event Grid Integration
- **Type**: Enabler
- **ID**: ENB-833530
- **Approval**: Approved
- **Capability ID**: CAP-833529
- **Owner**: Development Team
- **Status**: Ready for Implementation
- **Priority**: High
- **Analysis Review**: Not Required
- **Code Review**: Not Required

## Technical Overview
### Purpose
Integrate Azure Event Grid for publishing and subscribing to event-driven messages across the application. Support topic-based pub/sub patterns, event schemas, dead-letter queues, and retry policies with environment-specific configuration for connection endpoints and authentication.

## Functional Requirements

| ID | Name | Requirement | Priority | Status | Approval |
|----|------|-------------|----------|--------|----------|
| FR-833531 | Event Publishing | Publish events to Event Grid topics with custom event schemas and metadata | Must Have | Ready for Implementation | Approved |
| FR-833532 | Event Subscription | Subscribe to Event Grid events with webhook or Event Hub endpoints | Must Have | Ready for Implementation | Approved |
| FR-833533 | Event Filtering | Filter events by subject, event type, and custom data properties | Must Have | Ready for Implementation | Approved |
| FR-833534 | Retry Configuration | Configure retry policies including maximum attempts, backoff intervals, and expiration time | Must Have | Ready for Implementation | Approved |
| FR-833535 | Dead-Letter Queue | Route failed events to dead-letter destination (Blob Storage or Storage Queue) | Must Have | Ready for Implementation | Approved |
| FR-833536 | Event Schema Validation | Validate events against Event Grid schema or CloudEvents schema | Must Have | Ready for Implementation | Approved |
| FR-833537 | Environment Configuration | Configure Event Grid endpoints, topics, and authentication per environment (dev, test, prod) | Must Have | Ready for Implementation | Approved |
| FR-833538 | Authentication | Support managed identity, SAS tokens, and access keys for authentication | Must Have | Ready for Implementation | Approved |
| FR-833539 | Custom Topics | Create and manage custom Event Grid topics for domain-specific events | Must Have | Ready for Implementation | Approved |
| FR-833540 | Event Tracing | Track event delivery status and correlation IDs for distributed tracing | Must Have | Ready for Implementation | Approved |

## Non-Functional Requirements

| ID | Name | Type | Requirement | Priority | Status | Approval |
|----|------|------|-------------|----------|--------|----------|
| NFR-833541 | Event Delivery Latency | Deliver events to subscribers within 5 seconds under normal conditions | Must Have | Ready for Implementation | Approved |
| NFR-833542 | Throughput | Support publishing up to 5,000 events per second per topic | High | Ready for Implementation | Approved |
| NFR-833543 | Reliability | Guarantee at-least-once delivery with 99.99% delivery success rate | Must Have | Ready for Implementation | Approved |
| NFR-833544 | Security | Encrypt all events in transit using TLS 1.2+ and support RBAC for topic access | Must Have | Ready for Implementation | Approved |
| NFR-833545 | Monitoring | Integrate with Application Insights to track event metrics and failures | Must Have | Ready for Implementation | Approved |
| NFR-833546 | Scalability | Auto-scale to handle event bursts up to 10,000 events per second | High | Ready for Implementation | Approved |

## Dependencies

### Internal Upstream Dependency

| Enabler ID | Description |
|------------|-------------|
| ENB-847341 | Environment Configuration provides Event Grid connection strings and endpoints |

### Internal Downstream Impact

| Enabler ID | Description |
|------------|-------------|
| ENB-847292 | RESTful API may publish events when resources change |

### External Dependencies

**External Upstream Dependencies**: Azure Event Grid service, Azure Active Directory for managed identity

**External Downstream Impact**: Event subscribers (Azure Functions, Logic Apps, webhooks)

## Technical Specifications

### Enabler Dependency Flow Diagram
```mermaid
flowchart TD
    ENB_833530["ENB-833530<br/>Azure Event Grid Integration<br/>📡"]
    
    CONFIG["Environment Config<br/>Connection Strings<br/>⚙️"]
    AUTH["Authentication<br/>Managed Identity / SAS<br/>🔐"]
    
    CONFIG --> ENB_833530
    AUTH --> ENB_833530
    
    PUBLISHER["Event Publisher<br/>Publish Events<br/>📤"]
    SUBSCRIBER["Event Subscriber<br/>Subscribe to Events<br/>📥"]
    FILTER["Event Filter<br/>Subject/Type Filtering<br/>🔍"]
    
    ENB_833530 --> PUBLISHER
    ENB_833530 --> SUBSCRIBER
    ENB_833530 --> FILTER
    
    TOPICS["Event Grid Topics<br/>Custom Topics<br/>📋"]
    SUBSCRIPTIONS["Event Subscriptions<br/>Webhook/EventHub<br/>🔔"]
    
    PUBLISHER --> TOPICS
    TOPICS --> SUBSCRIPTIONS
    SUBSCRIPTIONS --> SUBSCRIBER
    
    RETRY["Retry Policy<br/>Exponential Backoff<br/>🔄"]
    DEADLETTER["Dead-Letter Queue<br/>Blob Storage<br/>💀"]
    
    SUBSCRIPTIONS --> RETRY
    RETRY --> DEADLETTER
    
    MONITORING["Application Insights<br/>Event Metrics<br/>📊"]
    ENB_833530 --> MONITORING

    classDef enabler fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef config fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef core fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef infra fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class ENB_833530 enabler
    class CONFIG,AUTH config
    class PUBLISHER,SUBSCRIBER,FILTER,TOPICS,SUBSCRIPTIONS core
    class RETRY,DEADLETTER,MONITORING infra
```

### API Technical Specifications

| API Type | Operation | Channel / Endpoint | Description | Request / Publish Payload | Response / Subscribe Data |
|----------|-----------|---------------------|-------------|----------------------------|----------------------------|
| REST | POST | https://{topic}.{region}.eventgrid.azure.net/api/events | Publish events to topic | Event array with schema | HTTP 200 OK |
| REST | GET | /subscriptions/{id}/providers/Microsoft.EventGrid/topics | List Event Grid topics | - | Topic list |
| REST | PUT | /subscriptions/{id}/providers/Microsoft.EventGrid/eventSubscriptions/{name} | Create event subscription | Subscription config | Subscription details |
| Webhook | POST | {subscriber-endpoint} | Deliver event to subscriber | Event data | HTTP 200 OK |
| SDK | Method | eventGridClient.publishEvents() | Publish using Node.js SDK | Event objects | Promise<void> |

### Data Models
```mermaid
erDiagram
    EventGridTopic {
        string id
        string name
        string endpoint
        string location
        object accessKeys
    }
    
    EventSubscription {
        string id
        string name
        string topicName
        string destination
        object filter
        object retryPolicy
        string deadLetterDestination
    }
    
    Event {
        string id
        string eventType
        string subject
        datetime eventTime
        string dataVersion
        object data
    }
    
    RetryPolicy {
        number maxDeliveryAttempts
        number eventTimeToLiveInMinutes
    }
    
    EventFilter {
        array subjectBeginsWith
        array subjectEndsWith
        array includedEventTypes
        boolean isSubjectCaseSensitive
    }
    
    DeadLetterDestination {
        string resourceId
        string endpointType
    }
    
    EventGridTopic ||--o{ EventSubscription : has
    EventSubscription ||--|| EventFilter : uses
    EventSubscription ||--|| RetryPolicy : uses
    EventSubscription ||--o| DeadLetterDestination : routes-to
    EventGridTopic ||--o{ Event : publishes
```

### Class Diagrams
```mermaid
classDiagram
    class EventGridClient {
        -string endpoint
        -TokenCredential credential
        +publishEvents(events) Promise~void~
        +publishCloudEvents(events) Promise~void~
        +publishCustomEvents(events) Promise~void~
    }
    
    class EventPublisher {
        -EventGridClient client
        +publish(eventType, subject, data) Promise~void~
        +publishBatch(events) Promise~void~
        +validateSchema(event) boolean
    }
    
    class EventSubscriber {
        -string webhookUrl
        +handleEvent(event) Promise~void~
        +validateEvent(event) boolean
        +acknowledgeEvent(eventId) void
    }
    
    class EventGridConfig {
        -string topicEndpoint
        -string topicKey
        +getConnectionString() string
        +getManagedIdentity() TokenCredential
        +getTopicEndpoint(env) string
    }
    
    class RetryHandler {
        -RetryPolicy policy
        +shouldRetry(attempt) boolean
        +getBackoffDelay(attempt) number
        +handleFailure(event) void
    }
    
    class DeadLetterHandler {
        -string blobStorageUrl
        +storeFailedEvent(event) Promise~void~
        +getFailedEvents() Promise~Event[]~
        +replayEvent(eventId) Promise~void~
    }
    
    EventPublisher --> EventGridClient
    EventPublisher --> EventGridConfig
    EventSubscriber --> RetryHandler
    EventSubscriber --> DeadLetterHandler
    RetryHandler --> DeadLetterHandler
```

### Sequence Diagrams
```mermaid
sequenceDiagram
    participant App as Application
    participant Pub as Event Publisher
    participant EG as Event Grid
    participant Sub as Event Subscription
    participant Webhook as Webhook Endpoint
    participant DLQ as Dead-Letter Queue
    
    App->>Pub: Publish event
    Pub->>Pub: Validate event schema
    Pub->>EG: POST /api/events
    EG-->>Pub: 200 OK
    
    EG->>Sub: Route event to subscription
    Sub->>Sub: Apply filters
    
    alt Event matches filter
        Sub->>Webhook: POST event data
        
        alt Webhook responds 200
            Webhook-->>Sub: 200 OK
            Sub-->>EG: Delivery successful
        else Webhook fails
            Webhook-->>Sub: 500 Error
            Sub->>Sub: Retry with backoff
            Sub->>Webhook: POST event data (retry)
            
            alt Retry succeeds
                Webhook-->>Sub: 200 OK
            else All retries exhausted
                Sub->>DLQ: Store in dead-letter
                DLQ-->>Sub: Stored
            end
        end
    else Event filtered out
        Sub->>Sub: Discard event
    end
```

### Dataflow Diagrams
```mermaid
flowchart TD
    Source[Event Source<br/>Application Logic] --> Validate[Validate Event Schema]
    
    Validate --> Format[Format Event<br/>Event Grid Schema]
    Format --> Publish[Publish to Topic]
    
    Publish --> Topic[Event Grid Topic]
    Topic --> Router[Event Router]
    
    Router --> Filter1[Subscription Filter 1]
    Router --> Filter2[Subscription Filter 2]
    Router --> FilterN[Subscription Filter N]
    
    Filter1 --> Match1{Matches?}
    Match1 -->|Yes| Deliver1[Deliver to Webhook 1]
    Match1 -->|No| Drop1[Drop Event]
    
    Deliver1 --> Retry1{Success?}
    Retry1 -->|Yes| Success[Acknowledge]
    Retry1 -->|No| RetryLogic[Retry with Backoff]
    
    RetryLogic --> Attempts{Max Attempts?}
    Attempts -->|No| Deliver1
    Attempts -->|Yes| DeadLetter[Dead-Letter Queue<br/>Blob Storage]
    
    Success --> Metrics[Application Insights]
    DeadLetter --> Metrics
```

### State Diagrams
```mermaid
stateDiagram-v2
    [*] --> EventCreated: Create event
    EventCreated --> Validating: Validate schema
    
    Validating --> ValidationFailed: Invalid schema
    Validating --> ReadyToPublish: Valid schema
    
    ValidationFailed --> [*]
    
    ReadyToPublish --> Publishing: Publish to Event Grid
    Publishing --> Published: Event accepted
    Publishing --> PublishFailed: Publish error
    
    PublishFailed --> [*]
    
    Published --> Routing: Route to subscriptions
    Routing --> Filtering: Apply filters
    
    Filtering --> Matched: Matches filter
    Filtering --> Dropped: No match
    
    Dropped --> [*]
    
    Matched --> Delivering: Deliver to endpoint
    Delivering --> Delivered: Endpoint responds 200
    Delivering --> DeliveryFailed: Endpoint error
    
    DeliveryFailed --> Retrying: Retry with backoff
    Retrying --> Delivering: Retry attempt
    Retrying --> MaxRetriesReached: All retries failed
    
    MaxRetriesReached --> DeadLettered: Store in DLQ
    DeadLettered --> [*]
    
    Delivered --> [*]
    
    note right of Retrying
        Exponential backoff:
        1st: 30s, 2nd: 1m, 
        3rd: 10m, etc.
    end note
```

## Configuration Examples

### Event Grid Topic Configuration
```typescript
interface EventGridConfig {
  endpoint: string;
  accessKey: string;
  topicName: string;
  retryPolicy: {
    maxDeliveryAttempts: number;
    eventTimeToLiveInMinutes: number;
  };
  deadLetterDestination: {
    endpointType: 'StorageBlob';
    blobContainerUrl: string;
  };
}

// Environment-specific configuration
const config: Record<string, EventGridConfig> = {
  development: {
    endpoint: process.env.EVENTGRID_ENDPOINT_DEV,
    accessKey: process.env.EVENTGRID_KEY_DEV,
    topicName: 'lease-sentry-dev',
    retryPolicy: {
      maxDeliveryAttempts: 5,
      eventTimeToLiveInMinutes: 1440
    },
    deadLetterDestination: {
      endpointType: 'StorageBlob',
      blobContainerUrl: process.env.DEADLETTER_BLOB_DEV
    }
  },
  production: {
    endpoint: process.env.EVENTGRID_ENDPOINT_PROD,
    accessKey: process.env.EVENTGRID_KEY_PROD,
    topicName: 'lease-sentry-prod',
    retryPolicy: {
      maxDeliveryAttempts: 10,
      eventTimeToLiveInMinutes: 2880
    },
    deadLetterDestination: {
      endpointType: 'StorageBlob',
      blobContainerUrl: process.env.DEADLETTER_BLOB_PROD
    }
  }
};
```

### Event Publishing Example
```typescript
import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";

const client = new EventGridPublisherClient(
  config.endpoint,
  "EventGrid",
  new AzureKeyCredential(config.accessKey)
);

const event = {
  id: uuidv4(),
  eventType: "LeaseSentry.Lease.Created",
  subject: "/leases/12345",
  eventTime: new Date(),
  dataVersion: "1.0",
  data: {
    leaseId: "12345",
    propertyId: "PROP-789",
    tenantId: "TENANT-456",
    startDate: "2025-01-01",
    endDate: "2026-01-01"
  }
};

await client.send([event]);
```
