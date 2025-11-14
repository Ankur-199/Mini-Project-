# TravelSmart - Travel Management System

A comprehensive travel management system built with Node.js, Express, MongoDB, and EJS following MVC architecture.

## Features

- ✅ **User Authentication** - Sign up, login, and logout functionality
- ✅ **Session Management** - Secure session-based authentication
- ✅ **CRUD Operations** - Create, Read, Update, Delete travels
- ✅ **User-Specific Data** - Each user can only see and manage their own travels
- ✅ **MVC Architecture** - Clean and organized code structure
- ✅ **MongoDB Integration** - Persistent data storage
- ✅ **Bootstrap UI** - Modern and responsive design
- ✅ **Travel Management** - Track destinations, dates, budgets, and status
- ✅ **Dashboard** - View statistics and upcoming travels
- ✅ **Password Security** - Bcrypt password hashing

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Frontend**: EJS, Bootstrap 5, HTML, CSS, JavaScript
- **Authentication**: Express Session, Bcryptjs
- **Architecture**: MVC (Model-View-Controller)

## Project Structure

```
travelsmart-mini-project/
├── models/              # Database models
│   ├── User.js          # User model for authentication
│   └── Travel.js        # Travel model
├── views/               # EJS templates
│   ├── partials/        # Reusable components
│   ├── auth/            # Authentication views
│   │   ├── login.ejs
│   │   └── signup.ejs
│   ├── travels/         # Travel-related views
│   ├── index.ejs
│   └── error.ejs
├── controllers/         # Business logic
│   ├── authController.js
│   ├── indexController.js
│   └── travelController.js
├── routes/              # Route definitions
│   ├── auth.js          # Authentication routes
│   ├── index.js
│   └── travels.js
├── middleware/          # Custom middleware
│   └── authMiddleware.js
├── public/              # Static files
│   ├── css/
│   └── js/
├── server.js            # Main server file
├── package.json
└── README.md
```

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your configuration:
     - `MONGODB_URI`: Your MongoDB connection string (required)
     - `SESSION_SECRET`: A strong random string for session security (required)
     - `PORT`: Server port (default: 3000)
     - `NODE_ENV`: Environment mode (development/production)
   
   **Important**: Never commit the `.env` file to version control! It contains sensitive information.

4. **Start the server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## Usage

### Authentication

#### Sign Up
1. Click "Sign Up" from the navigation or home page
2. Fill in the registration form:
   - Username (required, 3-30 characters)
   - Email (required, must be valid email)
   - Full Name (optional)
   - Password (required, minimum 6 characters)
   - Confirm Password (required, must match password)
3. Click "Create Account"
4. You'll be automatically logged in after signup

#### Login
1. Click "Login" from the navigation
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the home page

#### Logout
1. Click on your username in the navigation bar
2. Select "Logout" from the dropdown menu

### Travel Management

#### Adding a Travel
1. **Must be logged in** - Login or sign up first
2. Click "Add New Travel" from the navigation or home page
3. Fill in the travel details:
   - Destination (required)
   - Description (required)
   - Start Date (required)
   - End Date (required)
   - Number of Travelers (required)
   - Budget (required)
   - Status (required)
   - Notes (optional)
4. Click "Add Travel"

#### Viewing Travels
- View all your travels from the "All Travels" page
- Click on any travel to see detailed information
- **Note**: You can only see your own travels

#### Editing a Travel
1. Navigate to the travel details page
2. Click "Edit Travel"
3. Modify the information
4. Click "Update Travel"

#### Deleting a Travel
1. From the travel details page or list page
2. Click "Delete" button
3. Confirm the deletion

## Database Schema

### User Model
- `username` (String, required, unique, 3-30 characters)
- `email` (String, required, unique, valid email format)
- `password` (String, required, hashed with bcrypt, min: 6 characters)
- `fullName` (String, optional)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

### Travel Model
- `user` (ObjectId, required, reference to User)
- `destination` (String, required)
- `description` (String, required)
- `startDate` (Date, required)
- `endDate` (Date, required)
- `budget` (Number, required, min: 0)
- `status` (Enum: Planning, Booked, In Progress, Completed, Cancelled)
- `travelers` (Number, required, min: 1)
- `notes` (String, optional)
- `createdAt` (Date, auto)
- `updatedAt` (Date, auto)

## API Routes

### Public Routes
- `GET /` - Home page
- `GET /auth/signup` - Show signup form
- `POST /auth/signup` - Create new user account
- `GET /auth/login` - Show login form
- `POST /auth/login` - Authenticate user
- `GET /auth/logout` - Logout user

### Protected Routes (Require Authentication)
- `GET /travels` - List all user's travels
- `GET /travels/new` - Show create form
- `POST /travels` - Create new travel
- `GET /travels/:id` - Show travel details
- `GET /travels/:id/edit` - Show edit form
- `PUT /travels/:id` - Update travel
- `DELETE /travels/:id` - Delete travel

**Note**: All travel routes are protected and users can only access their own travels.

## Development

### Running in Development Mode
```bash
npm run dev
```
This uses nodemon for automatic server restart on file changes.

## License

ISC

## Author

TravelSmart Mini Project

