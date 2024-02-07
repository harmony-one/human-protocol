# KV Service Worker

This Cloudflare Worker serves as a middleware to handle various HTTP requests and interact with a key-value store provided by Cloudflare Workers KV. The service enables the management of user interests, actions, and other related data.

## Features

- **Middleware Handling**: The service applies middleware functions such as CORS handling and request parameter/content parsing.
- **Data Management**: It provides endpoints for managing user interests, actions, and other related data.
- **Error Handling**: Proper error handling is implemented for different scenarios, including 404 responses for unknown routes.

Certainly! Here are examples added to the Endpoints section:

## Endpoints

### `GET /all-keys`

- **Description**: Returns a list of keys stored in the key-value store.
- **Example**:
  ```http
  GET /all-keys
  ```

### `GET /actions`

- **Description**: Retrieves a list of actions, optionally filtered by topic.
- **Query Parameters**:
  - `limit` (optional): Specifies the maximum number of actions to retrieve (default: 1000).
  - `topic` (optional): Filters actions based on the specified topic.
- **Example**:
  ```http
  GET /actions?limit=10&topic=technology
  ```

### `POST /interests`

- **Description**: Increments the count of user interests.
- **Request Body**:
  - `id`: The identifier of the user whose interest count needs to be incremented.
- **Example**:
  ```http
  POST /interests
  Content-Type: application/json

  {
    "id": "harmony"
  }
  ```

### `GET /interests/:id`

- **Description**: Retrieves the count of interests for a specific user.
- **Path Parameters**:
  - `id`: The unique identifier of the user.
- **Example**:
  ```http
  GET /interests/harmony
  ```

### `POST /users`

- **Description**: Stores user data along with their associated topics.
- **Request Body**:
  - `id`: The unique identifier of the user.
  - `topics`: An array of topics associated with the user.
- **Example**:
  ```http
  POST /users
  Content-Type: application/json

  {
    "id": "user123",
    "topics": ["science", "technology"]
  }
  ```

### `GET /users/:id`

- **Description**: Retrieves user data based on the provided ID.
- **Path Parameters**:
  - `id`: The unique identifier of the user.
- **Example**:
  ```http
  GET /users/user123
  ```

### `POST /actions`

- **Description**: Records user actions along with relevant details like user, payload, and topic.
- **Request Body**:
  - `id`: The unique identifier of the action.
  - `user`: The user associated with the action.
  - `payload`: The payload or details of the action.
  - `topic`: The topic related to the action.
- **Example**:
  ```http
  POST /actions
  Content-Type: application/json

  {
    "id": "action123",
    "user": "user123",
    "payload": "clicked_button",
    "topic": "technology"
  }
  ```

### `GET /actions/:id`

- **Description**: Retrieves details of a specific action by its ID.
- **Path Parameters**:
  - `id`: The unique identifier of the action.
- **Example**:
  ```http
  GET /actions/action123
  ```

These examples illustrate how to interact with each endpoint, including the structure of the request and the expected response.

## Usage

To utilize the service, you can make HTTP requests to the deployed Cloudflare Worker endpoint, passing necessary parameters as required by each endpoint.

### Examples

#### Fetching all keys:

```bash
GET <worker_url>/all-keys
```

#### Posting user interests:

```bash
POST <worker_url>/interests
{
  "id": "user_id_here"
}
```

#### Retrieving user data:

```bash
GET <worker_url>/users/:id
```

Replace `<worker_url>` with the URL where the Cloudflare Worker is deployed and `:id` with the specific user ID.

## Deployment

To deploy this Cloudflare Worker, follow these steps:

1. Ensure you have the Cloudflare Workers CLI installed.
2. Run `wrangler init` to initialize a new project.
3. Replace the contents of `src/index.ts` with the provided service worker code.
4. Add your Cloudflare Workers KV namespace ID and other necessary configurations to `wrangler.toml`.
5. Run `wrangler publish` to deploy the worker to your Cloudflare account.

## Dependencies

This service worker depends on the `itty-router` package for routing HTTP requests and includes a custom CORS helper for handling CORS headers.

## Contributions

Contributions to this service worker are welcome. Feel free to fork the repository, make your changes, and submit a pull request.

## License

This Cloudflare Worker is licensed under the [MIT License](LICENSE). Feel free to modify and distribute it according to the terms of the license.
