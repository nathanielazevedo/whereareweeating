# Chicken Tinder API

## Deploy to Railway

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- MongoDB connection string

### Deployment Steps

1. **Install Railway CLI** (optional):
   ```bash
   npm i -g @railway/cli
   ```

2. **Deploy via Railway Dashboard**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository
   - Set root directory to `apps/api`
   - Railway will automatically detect and use the Dockerfile

3. **Environment Variables**:
   Set these in Railway Dashboard under Variables:
   ```
   MONGO=your_mongodb_connection_string
   PORT=6001
   NODE_ENV=production
   ```

4. **Deploy**:
   - Railway will automatically:
     - Install dependencies
     - Run `npm run build`
     - Start with `npm run start`

### Manual Deploy with CLI

```bash
cd apps/api
railway login
railway init
railway up
railway variables set MONGO="your_mongodb_connection_string"
```

### Configuration Files

- `railway.json` - Railway deployment config
- `nixpacks.toml` - Nixpacks configuration (specifies pnpm, Node.js 24)
- `.railwayignore` - Files to exclude from deployment
- `package.json` - Node.js version specified in `engines`

### Build Process

Railway uses Nixpacks to:
1. Install Node.js 22 and pnpm
2. Install dependencies with `pnpm install --frozen-lockfile`
3. Run build command: `pnpm run build`
4. Start server: `pnpm run start`

### Monitoring

View logs in Railway Dashboard:
- Build logs
- Deploy logs
- Application logs
