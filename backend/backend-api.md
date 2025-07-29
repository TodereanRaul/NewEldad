# EldadApp Backend API Documentation

## Base URL
```
http://localhost:8080
```

## API Version
All endpoints use version 1 (`/api/v1/`)

---

## Authentication Endpoints

### Base Path: `/api/v1/auth`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/register` | Register a new user | `RegisterRequest` | `AuthenticationResponse` |
| POST | `/authenticate` | Authenticate existing user | `AuthenticationRequest` | `AuthenticationResponse` |

---

## Ajutorare (Help) Endpoints

### Base Path: `/api/v1/ajutorare`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/` | Get all ajutorare records | - | `List<EldadAjutorareDto>` |
| GET | `/{id}` | Get ajutorare by ID | - | `EldadAjutorareDto` |
| POST | `/` | Create new ajutorare | `EldadAjutorareDto` | `EldadAjutorareDto` |
| PUT | `/{id}` | Update ajutorare by ID | `EldadAjutorareDto` | `EldadAjutorareDto` |
| DELETE | `/{id}` | Delete ajutorare by ID | - | `204 No Content` |

**Path Parameters:**
- `{id}`: UUID of the ajutorare record

---

## Media Endpoints

### Base Path: `/api/v1/media`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/test` | Test endpoint | - | `TestResponse` |
| GET | `/` | Get all media | - | `List<EldadMediaDto>` |
| GET | `/findAll/{type}` | Get all media by type | - | `List<EldadMediaDto>` |
| GET | `/{ytId}` | Get media by YouTube ID | - | `EldadMediaDto` |
| POST | `/` | Create new media | `EldadMediaDto` | `EldadMediaDto` |
| PUT | `/{ytId}` | Update media by YouTube ID | `EldadMediaDto` | `EldadMediaDto` |
| DELETE | `/{ytId}` | Delete media by YouTube ID | - | `204 No Content` |
| POST | `/{ytVideoCode}/recommendations` | Add recommendation to media | `String` | `EldadMediaDto` |

**Path Parameters:**
- `{type}`: Media type (enum value)
- `{ytId}`: YouTube video ID
- `{ytVideoCode}`: YouTube video code for recommendations

---

## Payment Endpoints

### Base Path: `/api/v1/payment`

| Method | Endpoint | Description | Query Parameters | Response |
|--------|----------|-------------|------------------|----------|
| POST | `/create` | Create PayPal payment | `method`, `amount`, `currency`, `description` | `String` (approval URL) |
| GET | `/success` | Payment success callback | `paymentId`, `PayerID` | `String` |
| GET | `/cancel` | Payment cancellation | - | `String` |
| GET | `/error` | Payment error | - | `String` |

**Query Parameters for `/create`:**
- `method`: Payment method
- `amount`: Payment amount
- `currency`: Currency code
- `description`: Payment description

**Query Parameters for `/success`:**
- `paymentId`: PayPal payment ID
- `PayerID`: PayPal payer ID

---

## Data Models

### EldadAjutorareDto
```json
{
  "id": "UUID",
  "title": "String",
  "description": "String",
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### EldadMediaDto
```json
{
  "ytId": "String",
  "title": "String",
  "description": "String",
  "type": "EldadMediaType",
  "recommendations": ["String"],
  "createdAt": "LocalDateTime",
  "updatedAt": "LocalDateTime"
}
```

### AuthenticationRequest
```json
{
  "email": "String",
  "password": "String"
}
```

### RegisterRequest
```json
{
  "firstname": "String",
  "lastname": "String",
  "email": "String",
  "password": "String"
}
```

### AuthenticationResponse
```json
{
  "token": "String"
}
```

### TestResponse
```json
{
  "text": "String"
}
```

---

## Media Types

The following media types are supported:
- `VIDEO`
- `AUDIO`
- `IMAGE`
- `DOCUMENT`

---

## Error Responses

### 404 Not Found
Returned when a resource is not found:
```json
{
  "error": "Resource not found"
}
```

### 400 Bad Request
Returned for invalid requests:
```json
{
  "error": "Invalid request parameters"
}
```

### 500 Internal Server Error
Returned for server errors:
```json
{
  "error": "Internal server error"
}
```

---

## Security

- Authentication endpoints are publicly accessible
- All other endpoints require JWT authentication
- JWT token should be included in the Authorization header: `Bearer <token>`

---

## Database Configuration

- **Database**: PostgreSQL
- **Host**: localhost:5432
- **Database Name**: eldad
- **Username**: eldaduser

---

## Payment Configuration

### PayPal
- **Mode**: Sandbox (for testing)
- **Client ID**: Configured in application.yml
- **Client Secret**: Configured in application.yml

### Stripe
- **Secret Key**: Configured in application.yml
- **Publishable Key**: Configured in application.yml

---

## Notes

1. All endpoints return JSON responses
2. UUIDs are used for ajutorare records
3. YouTube IDs are used for media records
4. The application uses Spring Boot with JPA/Hibernate
5. CORS is configured for cross-origin requests
6. Global exception handling is implemented 