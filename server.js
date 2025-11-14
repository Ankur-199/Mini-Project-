const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in .env file');
  console.error('Please create a .env file with your MongoDB connection string.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Middleware
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Session Configuration
const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
  console.warn('⚠️  Warning: SESSION_SECRET is not defined in .env file');
  console.warn('Using default secret. Please set a strong secret for production!');
}

app.use(session({
  secret: SESSION_SECRET || 'travelsmart-secret-key-2024-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    httpOnly: true // Prevent XSS attacks
  }
}));

// Make user available to all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.error = req.session.error || null;
  res.locals.success = req.session.success || null;
  req.session.error = null;
  req.session.success = null;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travels');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/travels', travelRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('error', { 
    title: '404 - Page Not Found',
    message: 'The page you are looking for does not exist.' 
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

