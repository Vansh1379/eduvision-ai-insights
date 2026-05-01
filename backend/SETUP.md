# Backend Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL` - PostgreSQL connection string
   - `CLERK_SECRET_KEY` - From Clerk Dashboard > API Keys
   - `GEMINI_API_KEY` - From Google AI Studio
   - `FRONTEND_URL` - Your frontend URL (default: http://localhost:5173)

3. **Initialize database:**
   ```bash
   # Generate Prisma Client
   npm run prisma:generate
   
   # Create database and run migrations
   npm run prisma:migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Database Setup

### PostgreSQL Installation

**macOS (using Homebrew):**
```bash
brew install postgresql@14
brew services start postgresql@14
createdb eduvision
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo -u postgres createdb eduvision
```

**Windows:**
Download and install from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)

### Connection String Format

```
postgresql://username:password@localhost:5432/eduvision?schema=public
```

Example:
```
postgresql://postgres:mypassword@localhost:5432/eduvision?schema=public
```

## Clerk Setup

1. Create an account at [clerk.com](https://clerk.com)
2. Create a new application
3. Go to **API Keys** in the dashboard
4. Copy the **Secret Key** (starts with `sk_test_` or `sk_live_`)
5. Add it to your `.env` file as `CLERK_SECRET_KEY`

## Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

## Testing the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Authenticated Request Example

You'll need a Clerk session token from your frontend. The frontend should send it in the Authorization header:

```bash
curl -H "Authorization: Bearer <clerk_session_token>" \
     http://localhost:3001/api/students/dashboard
```

## Common Issues

### Database Connection Error
- Ensure PostgreSQL is running
- Check your `DATABASE_URL` in `.env`
- Verify database exists: `psql -l` (should list `eduvision`)

### Prisma Client Not Generated
```bash
npm run prisma:generate
```

### Migration Issues
```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate reset

# Or create a new migration
npm run prisma:migrate dev --name your_migration_name
```

### Clerk Authentication Fails
- Verify `CLERK_SECRET_KEY` is correct
- Ensure you're using the secret key (not publishable key)
- Check that the token format is correct (Bearer token)

## Development Tips

- Use Prisma Studio to view/edit data:
  ```bash
  npm run prisma:studio
  ```
  Opens at `http://localhost:5555`

- Check logs for detailed error messages
- Use Postman or Insomnia to test API endpoints
- Enable query logging in Prisma for debugging (already enabled in dev mode)

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Build the project:
   ```bash
   npm run build
   ```
3. Run migrations on production database:
   ```bash
   npm run prisma:migrate deploy
   ```
4. Start the server:
   ```bash
   npm start
   ```

## File Uploads

Uploaded files are stored in the `uploads/` directory. Make sure:
- The directory exists and is writable
- Configure `MAX_FILE_SIZE` in `.env` (default: 10MB)
- For production, consider using cloud storage (S3, Cloudinary, etc.)

