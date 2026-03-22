# Reward Engine Monorepo

This workspace contains a NestJS monorepo for the Loyalty Management System.

## Structure

- `apps/loyalty-app` - legacy single-app example (can be removed).
- `apps/auth-service` - microservice handling shopkeeper registration + emitting transaction events.
- `apps/loyalty-service` - microservice calculating points and handling loyalty logic (consumes events from auth-service via TCP).
- `apps/customer-service` - HTTP customer lookup + point query service (no reward logic).
- `apps/reward-service` - HTTP reward API (promo codes, transactions, pending sales, cashback, etc.)
- `apps/notification-service` - microservice that can send notifications (wired in the existing example flow).
- `libs/shared` - shared DTOs/interfaces used across services (used by loyalty-service and customer-service).


## Getting Started

```sh
npm install
npm run start --workspace=loyalty-app
```

The services use RxJS for reactive programming and are built with NestJS microservices.

### Running with Docker

To run the entire reward engine using Docker:

```sh
docker-compose up --build
```

This will build the monorepo and start all services in a single container, exposing ports:
- Auth Service: 3000
- Customer Service: 3001 (HTTP), 4003 (TCP)
- Reward Service: 3004 (HTTP), 4004 (TCP)
- Loyalty Service: 4001 (TCP)
- Notification Service: 4002 (TCP)

For development, you can also build the Docker image manually:

```sh
docker build -t reward-engine .
docker run -p 3000:3000 -p 3001:3001 -p 3004:3004 -p 4001:4001 -p 4002:4002 -p 4003:4003 -p 4004:4004 reward-engine
```

### Running microservices manually

Each service can be started independently from the root:

```sh
# notification microservice (TCP port 4002)
npm run start:notification

# loyalty microservice (TCP port 4001)
npm run start:loyalty

# customer service HTTP 3001 + TCP 4003
npm run start:customer

# reward API service HTTP 3004 + TCP 4004
npm run start:reward

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

## Reward API (Reward Service)

A fully modular reward API is implemented in `apps/reward-service/src/rewards` and is exposed over HTTP (port 3004). The implementation is intentionally kept modular with multiple controllers (customers, transactions, promo, pending sales, cashback) to follow clean microservice design patterns.

> Note: Admin endpoints (stores/brands/categories/events/vouchers) have been moved to `apps/customer-service` under `/admin`.

The reward service also emits a `transaction.created` event to the loyalty service (TCP port 4001) when a new sales entry is created.

The implementation uses `libs/shared/src/dtos` for shared DTO types, so the same types can be reused across packages without duplication.

### Features

- Customer registration, lookup, update, and search
- Reward balance querying / summary
- Sales entry ingestion + transaction listing + summaries
- Promo code listing / validation / application / claiming / generation
- Pending sale operations (add/update/list/fetch)
- Cashback workflows (block, commit, release, refund, transaction lookup)
- Promo code management (approve, cancel, reverse)
- Event enrollment, brand/store/category metadata, gift vouchers

### Key endpoints (HTTP, port 3004)

#### Health
- `GET /rewards/health` — service version/health

#### Customers
- `POST /rewards/customers` — register customer
- `PUT /rewards/customers/:id` — update customer
- `GET /rewards/customers/:id` — get customer details
- `GET /rewards/customers?q=...` — search customers (name/phone/id)
- `GET /rewards/customers/:id/balance` — reward balance summary

#### Transactions
- `POST /rewards/transactions/sales` — add sales entry (earns points)
- `GET /rewards/transactions/customer/:id` — list customer transactions
- `GET /rewards/transactions/customer/:id/profile` — customer transaction profile
- `GET /rewards/transactions/summary/external/:externalReference` — reward summary by external reference

#### Promo / offers
- `GET /rewards/promo/offers` — list active promo offers
- `POST /rewards/promo/offers/eligible` — list eligible offers
- `GET /rewards/promo/code/:code` — promo code details
- `POST /rewards/promo/code/validate` — validate promo code
- `POST /rewards/promo/cart/calculate` — calculate promo discount
- `POST /rewards/promo/cart/apply` — apply promo code to cart
- `DELETE /rewards/promo/cart/apply/:cartId` — remove applied promo code
- `POST /rewards/promo/cart/claim` — claim promo code
- `POST /rewards/promo/code/generate` — generate a promo code
- `POST /rewards/promo/code/cancel/:code` — cancel/reverse promo code
- `POST /rewards/promo/code/approve/:code` — approve promo code points

#### Pending sales
- `POST /rewards/pending-sales` — add pending sale
- `PUT /rewards/pending-sales` — update pending sale
- `GET /rewards/pending-sales` — list pending sales
- `GET /rewards/pending-sales/by-ref/:ref` — fetch pending sale by payment reference
- `GET /rewards/pending-sales/:id` — fetch pending sale by id

#### Cashback / blocked rewards
- `POST /rewards/cashback/block` — block reward balance for cashback hold
- `POST /rewards/cashback/block/commit/:customerId` — commit held balance (redeem)
- `POST /rewards/cashback/block/release/:customerId` — release held balance
- `GET /rewards/cashback/reference/:reference` — fetch cashback transaction by reference

#### Admin / metadata (customer-service)
> These admin endpoints live in `apps/customer-service` under `/admin`
- `POST /admin/stores` — add store location
- `POST /admin/brands` — add brand
- `POST /admin/categories` — add category
- `POST /admin/events/enroll` — enroll customer in event
- `GET /admin/vouchers/:customerId` — list gift vouchers
- `POST /admin/vouchers` — issue a gift voucher
- `POST /admin/vouchers/claim` — claim a gift voucher
- `GET /admin/partners` — list promo redemption partners

> Note: The current implementation is in-memory and resets on restart. It is intended as a scaffolding/demo implementation; you can extend it to use Prisma / MongoDB for persistence.

### Implementation notes (thinking)

1. **Microservice separation:** Customer service was stripped back to customer-focused behavior only. All reward-related endpoints were moved into a dedicated `reward-service` app.
2. **Shared data contract:** Reward DTOs are now stored in `libs/shared/src/dtos/rewards` and imported via `@shared/dtos` to keep behavior consistent across packages.
3. **Microservice flow:** Reward service emits `transaction.created` events over TCP to the loyalty service (port 4001), demonstrating a cross-service event flow.
4. **In-memory store:** The reward service uses in-memory `Map` instances for data persistence so it can run without a database.
5. **Command log:** The key commands executed during the refactor are included below.
6. **Next step:** You can replace in-memory stores with Prisma + Mongo persistence using the provided Prisma schemas.

### Commands executed during implementation

```sh
cd /Users/kumar/Desktop/reward-engine
# build often to validate types and Nest modules
npm run build --workspace=customer-service

# start the API server to test endpoints
npm run start --workspace=reward-service
```

### Commands run during implementation

```sh
cd /Users/kumar/Desktop/reward-engine
npm run build --workspace=reward-service
npm run start --workspace=reward-service
```

> The above commands were used during development to validate compile-time correctness and to manually exercise the new reward APIs via HTTP.
