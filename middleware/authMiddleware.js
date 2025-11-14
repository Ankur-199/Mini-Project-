// Middleware to check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  req.session.error = 'Please login to access this page';
  res.redirect('/auth/login');
};

// Middleware to check if user is not authenticated (for login/signup pages)
exports.isNotAuthenticated = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next();
  }
  res.redirect('/');
};

