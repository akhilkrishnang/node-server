# Node.js API Server

A modular, component-based Node.js API server built with Express.js. This architecture allows easy separation of concerns with multiple independent components handling different sets of APIs.

## Project Structure

```
src/
├── index.js                          # Main server entry point
└── components/
    └── the_happy_hive/               # First API component
        ├── routes.js                 # Route definitions
        ├── controller.js             # Request handlers
        └── service.js                # Business logic and data operations
```

## Components

### The Happy Hive (`the-happy-hive`)
First component providing APIs for managing items with CRUD operations.

#### Items Management Routes:
- `GET /api/happy-hive` - Get all items
- `GET /api/happy-hive/:id` - Get item by ID
- `POST /api/happy-hive` - Create new item
- `PUT /api/happy-hive/:id` - Update item
- `DELETE /api/happy-hive/:id` - Delete item

#### Spotlight Management Routes:
Manage announcements, accolades, and upcoming events (stored in `spotlight` table).

- `GET /api/spotlight` - Get all active (non-expired) spotlights
- `GET /api/spotlight/admin/all` - Get all spotlights including expired (admin only)
- `GET /api/spotlight/:id` - Get spotlight by ID
- `GET /api/spotlight/type/:type` - Get spotlights by type (e.g., `stork_visit`, `accolades`, `announcements`, `events`)
- `POST /api/spotlight` - Create new spotlight
- `PUT /api/spotlight/:id` - Update spotlight
- `DELETE /api/spotlight/:id` - Delete spotlight

**Spotlight Fields:**
- `description` (required) - Description of the spotlight
- `type` (required) - Type: `stork_visit`, `accolades`, `announcements`, `events`, etc.
- `expiry` (required) - Expiration date (YYYY-MM-DD format) - only non-expired spotlights are returned in public endpoints

## Setup

### Installation

```bash
npm install
```

### Database Setup

This project uses MySQL for data persistence. Follow the [Database Setup Guide](DATABASE_SETUP.md) to:
1. Create the database and tables
2. Configure environment variables
3. Load sample data

### Environment Variables

Create a `.env` file in the root directory with your configuration:
```
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=happy_hive
DB_CONNECTION_LIMIT=10
```

See [Database Setup Guide](DATABASE_SETUP.md) for detailed configuration instructions.

## Running the Server

### Prerequisites
- Ensure MySQL is running and database is configured
- Update `.env` with correct database credentials

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` and verify database connectivity.

**Note:** In production mode, the server will exit if database connection fails.

### Health Check
```bash
curl http://localhost:3000/health
```

Response:
```json
{ "status": "API Server is running", "environment": "development" }
```

## Adding New Components

To add a new API component:

1. Create a new folder under `src/components/your-component-name`
2. Create three files:
   - `routes.js` - Define the routes for your component
   - `controller.js` - Handle incoming requests
   - `service.js` - Implement business logic
3. Import and register the routes in `src/index.js`:
   ```javascript
   const yourComponentRouter = require('./components/your-component-name/routes');
   app.use('/api/your-component', yourComponentRouter);
   ```

## Architecture

This project follows a three-layer architecture:

- **Routes Layer**: Defines API endpoints and maps them to controllers
- **Controller Layer**: Handles HTTP requests/responses and validation
- **Service Layer**: Contains business logic and database operations
- **Config Layer**: Manages database connections and environment setup

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable CORS for cross-origin requests
- **dotenv**: Load environment variables from .env file
- **mysql2**: MySQL database driver with promise support

## Database

This API uses MySQL for data persistence. Key features:

- **Connection pooling**: Configurable connection pool for optimal performance
- **Parameterized queries**: Protection against SQL injection
- **Automatic timestamps**: created_at and updated_at fields on all records
- **Indexes**: Performance optimization on frequently searched columns

Refer to [Database Setup Guide](DATABASE_SETUP.md) for detailed information.

## Development

The project uses `node --watch` for development to automatically restart the server on file changes.

## License

MIT
