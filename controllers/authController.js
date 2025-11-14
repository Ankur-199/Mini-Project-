const User = require('../models/User');

// Show signup form
exports.showSignup = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/signup', {
    title: 'Sign Up'
  });
};

// Handle signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, fullName } = req.body;

    // Validation
    if (!username || !email || !password) {
      req.session.error = 'All fields are required';
      return res.redirect('/auth/signup');
    }

    if (password !== confirmPassword) {
      req.session.error = 'Passwords do not match';
      return res.redirect('/auth/signup');
    }

    if (password.length < 6) {
      req.session.error = 'Password must be at least 6 characters';
      return res.redirect('/auth/signup');
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      req.session.error = 'Username or email already exists';
      return res.redirect('/auth/signup');
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      fullName: fullName || ''
    });

    await user.save();

    // Set session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName
    };

    req.session.success = 'Account created successfully! Welcome to TravelSmart!';
    res.redirect('/');
  } catch (error) {
    req.session.error = error.message || 'Error creating account. Please try again.';
    res.redirect('/auth/signup');
  }
};

// Show login form
exports.showLogin = (req, res) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  res.render('auth/login', {
    title: 'Login'
  });
};

// Handle login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.error = 'Email and password are required';
      return res.redirect('/auth/login');
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      req.session.error = 'Invalid email or password';
      return res.redirect('/auth/login');
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.session.error = 'Invalid email or password';
      return res.redirect('/auth/login');
    }

    // Set session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName
    };

    req.session.success = `Welcome back, ${user.username}!`;
    res.redirect('/');
  } catch (error) {
    req.session.error = error.message || 'Error logging in. Please try again.';
    res.redirect('/auth/login');
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
};

