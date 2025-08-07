# Deployment Instructions for Loan Prediction App

## Backend Deployment (Vercel)

1. **Navigate to backend directory:**
   ```bash
   cd loan_application_backend
   ```

2. **Install Vercel CLI if not installed:**
   ```bash
   npm install -g vercel
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy to production:**
   ```bash
   vercel --prod
   ```

5. **Set Environment Variables in Vercel Dashboard:**
   - Go to your Vercel dashboard
   - Select your backend project
   - Go to Settings > Environment Variables
   - Add these variables:
     ```
     MONGODB_URI=mongodb+srv://sakshamjais100:bFsow9IgUPoMknGy@loan-data.zqomtmk.mongodb.net/loan-prediction
     JWT_SECRET=e3ff5f077839c1331b1d893a728246685cb7dba9e3a77bffe7d52eaccf660988
     PORT=3000
     ```

## Frontend Deployment (Vercel)

1. **Navigate to frontend directory:**
   ```bash
   cd loan_application_frontend
   ```

2. **Deploy to production:**
   ```bash
   vercel --prod
   ```

## Post-Deployment Steps

1. **Update CORS in server.js if needed:**
   - Add your frontend production URL to the CORS origins array

2. **Test all endpoints:**
   - User signup/login
   - Employee login
   - Employee dashboard data fetching
   - User prediction functionality

3. **Create test accounts in production:**
   - Create test employee accounts using `create-test-employees.js`
   - Create test user accounts through the signup form

## Optional Post-Deployment Tasks

1. **Import initial loan data (if needed):**
   ```bash
   cd loan_application_backend
   node importCsvToMongo.js
   ```

2. **Create test employee accounts:**
   ```bash
   cd loan_application_backend
   node create-test-employees.js
   ```

## Important Notes

- The app automatically detects localhost vs production environment
- JWT tokens are included in both user and employee login responses
- MongoDB Atlas database is shared between local and production
- All authentication flows work the same in production
- Unnecessary test files have been removed for production deployment

## Files Included in Production

### Backend Files:
- `server.js` - Main server file
- `package.json` - Dependencies
- `vercel.json` - Vercel deployment configuration
- `controller/` - API controllers (user, employee, data)
- `models/` - Database models
- `auth/` - Authentication middleware
- `.env` - Environment variables (set in Vercel dashboard)
- `create-test-employees.js` - Script to create test employees in production
- `importCsvToMongo.js` & `Loan.csv` - Data import scripts (optional)

### Frontend Files:
- `src/` - React application source
- `components/` - React components
- `public/` - Static assets
- `package.json` - Dependencies
- `vite.config.js` - Vite configuration
- `index.html` - Main HTML file

### Removed Files:
- `test-connection.js` - Development testing file
- `test-api.js` - Development testing file
- `loan_application_frontend/README.md` - Default React README

## URLs After Deployment

- Backend: https://your-backend-domain.vercel.app
- Frontend: https://your-frontend-domain.vercel.app

## Troubleshooting

If you encounter CORS errors:
1. Check that your frontend URL is added to CORS origins in server.js
2. Redeploy the backend after updating CORS settings

If authentication doesn't work:
1. Verify environment variables are set in Vercel dashboard
2. Check that JWT_SECRET is exactly the same as local environment
3. Ensure MONGODB_URI points to the correct database
