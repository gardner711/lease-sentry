# Lease Sentry Web Service

RESTful API for the Lease Sentry lease management system.

## Features

- ✅ **Node.js v20+ with TypeScript** - Modern JavaScript with type safety
- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Swagger/OpenAPI Documentation** - Interactive API documentation
- ✅ **Health Checks** - Liveness, readiness, and detailed health endpoints
- ✅ **Application Insights** - Azure Application Insights integration
- ✅ **Azure Services** - Cosmos DB, Event Grid, Blob Storage, AI Search
- ✅ **Structured Logging** - JSON logging with Pino
- ✅ **Zero Lint Tolerance** - ESLint + Prettier with strict rules
- ✅ **90%+ Test Coverage** - Comprehensive unit and integration tests
- ✅ **Docker Support** - Multi-stage builds with health checks
- ✅ **Environment Configuration** - Support for dev, test, prod environments

## Prerequisites

- Node.js >= 20.0.0
- npm or pnpm
- Docker (optional, for containerized deployment)

## Installation

```bash
cd webservice
npm install
```

## Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:

- `PORT` - Server port (default: 4100)
- `JWT_SECRET` - Secret for JWT signing
- `JWT_REFRESH_SECRET` - Secret for refresh token signing
- `COSMOS_ENDPOINT` - Azure Cosmos DB endpoint
- `COSMOS_KEY` - Azure Cosmos DB key
- `EVENTGRID_TOPIC_ENDPOINT` - Azure Event Grid topic endpoint
- `EVENTGRID_ACCESS_KEY` - Azure Event Grid access key
- `AZURE_STORAGE_CONNECTION_STRING` - Azure Blob Storage connection string
- `AZURE_SEARCH_ENDPOINT` - Azure AI Search endpoint
- `AZURE_SEARCH_API_KEY` - Azure AI Search API key
- `APPINSIGHTS_INSTRUMENTATIONKEY` - Application Insights key (optional)

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Code Quality

```bash
# Lint code (zero errors/warnings enforced)
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck
```

## Docker

```bash
# Build Docker image
npm run docker:build

# Run with Docker Compose (production)
docker-compose up

# Run with Docker Compose (development)
docker-compose -f docker-compose.dev.yml up

# Run with Docker Compose (test)
docker-compose -f docker-compose.test.yml up

# Stop containers
npm run docker:stop
```

## API Documentation

Once the server is running, access the interactive API documentation:

- Swagger UI: `http://localhost:4100/api-docs`
- OpenAPI JSON: `http://localhost:4100/api-docs/openapi.json`

## Health Checks

- Liveness: `GET /health/live` - Service is running
- Readiness: `GET /health/ready` - Service can accept traffic
- Detailed: `GET /health` - Detailed component health
- Startup: `GET /health/startup` - Service has started

## Architecture

### Folder Structure

```
webservice/
├── src/
│   ├── config/          # Configuration and environment
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic and Azure services
│   ├── models/          # Data models
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   ├── app.ts           # Express application
│   └── index.ts         # Entry point
├── tests/
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
├── scripts/             # Build and deployment scripts
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose (production)
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── jest.config.js       # Jest configuration
└── package.json         # Dependencies and scripts
```

### Technology Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Express.js
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator, Zod
- **Documentation**: Swagger/OpenAPI
- **Logging**: Pino
- **Testing**: Jest, Supertest
- **Linting**: ESLint + Prettier (Airbnb style)
- **Azure Services**: Cosmos DB, Event Grid, Blob Storage, AI Search, Application Insights

## Security

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **HPP** - HTTP Parameter Pollution protection
- **JWT** - Token-based authentication
- **Input Validation** - express-validator
- **Non-root Docker user** - Security best practices

## Standards Compliance

This implementation follows:

- ✅ **ENB-227929** - Folder Structure - All code in `webservice/` subfolder
- ✅ **ENB-449229** - Environment Configuration - Docker Compose for dev/test/prod
- ✅ **ENB-847346** - Node.js v20+ with Express and TypeScript
- ✅ **ENB-558144** - Linter - Zero errors/warnings policy
- ✅ **ENB-449256** - Containerization - Multi-stage Docker builds, unique port 4100
- ✅ **ENB-449234** - Logging - Structured JSON logging with Pino
- ✅ **ENB-328984** - Application Insights - Full telemetry integration
- ✅ **ENB-847292** - RESTful API - No demo code, infrastructure only
- ✅ **ENB-847294** - Swagger Documentation - Always implemented
- ✅ **ENB-847295** - Health Checks - Live, ready, detailed, startup
- ✅ **ENB-847328** - JWT Authentication - Login, refresh, logout, verify
- ✅ **ENB-847348** - Unit Testing - 90%+ code coverage
- ✅ **ENB-833530** - Event Grid Integration
- ✅ **ENB-833550** - Blob Storage Integration
- ✅ **ENB-833570** - Cosmos DB Integration
- ✅ **ENB-833590** - AI Search Integration

## License

MIT
