# Reward Engine Monorepo

This workspace contains a NestJS monorepo for the Loyalty Management System.

## Structure

- `apps/loyalty-app` - legacy single-app example (can be removed).
- `apps/auth-service` - microservice handling shopkeeper registration and transaction events.
- `apps/loyalty-service` - microservice calculating points and handling loyalty logic.
- `libs/shared` - shared DTOs/interfaces used across services.


## Getting Started

```sh
npm install
npm run start --workspace=loyalty-app
```

The services use RxJS for reactive programming and are built with NestJS microservices.

### Running microservices

Each service can be started independently from the root:

```sh
# notification microservice (TCP port 4002)
npm run start:notification

# loyalty microservice (TCP port 4001)
npm run start:loyalty

# customer service HTTP 3001 + TCP 4003
npm run start:customer

# shopkeeper/auth service HTTP 3000 (calls loyalty service)
npm run start:auth
```

When `auth-service` posts to `/transaction`, it will forward the message to `loyalty-service` over TCP.

Example sequence (run each service in separate terminals):

```sh
npm run start:notification    # port 4002
npm run start:loyalty         # port 4001
npm run start:auth            # http port 3000
```

Then simulate a transaction:

```sh
curl -X POST http://localhost:3000/transaction \
  -H 'Content-Type: application/json' \
  -d '{"shopId":"shop_1","customerPhone":"9876543210","amount":250}'
```

You should see logs in the loyalty and notification services confirming points calculation and notification.

The shared DTOs live in `libs/shared` and are imported by relative path; you can convert this to a proper workspace library if desired.
