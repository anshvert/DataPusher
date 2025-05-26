# Data Pusher

A Node.js Express application for receiving and forwarding data to account-specific webhook destinations.

1. Install dependencies:
    ```bash
    npm install
    ```

2. Start the server:
    ```bash
    npm run start
    ```
   
## API Endpoints

### Accounts
- POST /accounts/create: Create an account.
- GET /accounts/:id: Get account details.
- PUT /accounts/:id: Update an account.
- DELETE /accounts/:id: Delete an account (cascades to destinations).
- GET /accounts/:id/destinations: Get destinations for an account.


### Destinations
- POST /destinations/create: Create a destination.
- GET /destinations/:id: Get destination details.
- PUT /destinations/:id: Update a destination.
- DELETE /destinations/:id: Delete a destination.

### Data Handler
- POST /server/incoming_data: Receive and forward JSON data to destinations.

## Sample APIs
**See the samples/ directory for example API requests.**
