const Travel = require('../models/Travel');

// Home page
exports.getHome = async (req, res) => {
  try {
    // If user is logged in, show their travels
    if (req.session && req.session.user) {
      const userId = req.session.user.id;
      const totalTravels = await Travel.countDocuments({ user: userId });
      const upcomingTravels = await Travel.find({
        user: userId,
        startDate: { $gte: new Date() },
        status: { $ne: 'Cancelled' }
      }).sort({ startDate: 1 }).limit(5);
      
      const recentTravels = await Travel.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5);

      return res.render('index', {
        title: 'TravelSmart - Home',
        totalTravels,
        upcomingTravels,
        recentTravels,
        isAuthenticated: true
      });
    }

    // If not logged in, show welcome page
    res.render('index', {
      title: 'TravelSmart - Home',
      isAuthenticated: false
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load home page: ' + error.message
    });
  }
};

