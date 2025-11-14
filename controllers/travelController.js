const Travel = require('../models/Travel');

// Get all travels
exports.getAllTravels = async (req, res) => {
  try {
    const travels = await Travel.find({ user: req.session.user.id }).sort({ createdAt: -1 });
    res.render('travels/index', { 
      title: 'All Travels',
      travels 
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to fetch travels: ' + error.message
    });
  }
};

// Get single travel
exports.getTravel = async (req, res) => {
  try {
    const travel = await Travel.findOne({ 
      _id: req.params.id, 
      user: req.session.user.id 
    });
    if (!travel) {
      return res.status(404).render('error', {
        title: '404 - Not Found',
        message: 'Travel not found'
      });
    }
    res.render('travels/show', {
      title: travel.destination,
      travel
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to fetch travel: ' + error.message
    });
  }
};

// Show create form
exports.showCreateForm = (req, res) => {
  res.render('travels/new', {
    title: 'Add New Travel'
  });
};

// Create new travel
exports.createTravel = async (req, res) => {
  try {
    const travelData = {
      ...req.body,
      user: req.session.user.id
    };
    const travel = new Travel(travelData);
    await travel.save();
    req.session.success = 'Travel added successfully!';
    res.redirect('/travels');
  } catch (error) {
    res.render('travels/new', {
      title: 'Add New Travel',
      error: error.message,
      travel: req.body
    });
  }
};

// Show edit form
exports.showEditForm = async (req, res) => {
  try {
    const travel = await Travel.findOne({ 
      _id: req.params.id, 
      user: req.session.user.id 
    });
    if (!travel) {
      return res.status(404).render('error', {
        title: '404 - Not Found',
        message: 'Travel not found'
      });
    }
    res.render('travels/edit', {
      title: 'Edit Travel',
      travel
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to fetch travel: ' + error.message
    });
  }
};

// Update travel
exports.updateTravel = async (req, res) => {
  try {
    const travel = await Travel.findOneAndUpdate(
      { _id: req.params.id, user: req.session.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!travel) {
      return res.status(404).render('error', {
        title: '404 - Not Found',
        message: 'Travel not found'
      });
    }
    req.session.success = 'Travel updated successfully!';
    res.redirect(`/travels/${travel._id}`);
  } catch (error) {
    const travel = await Travel.findOne({ 
      _id: req.params.id, 
      user: req.session.user.id 
    });
    res.render('travels/edit', {
      title: 'Edit Travel',
      travel,
      error: error.message
    });
  }
};

// Delete travel
exports.deleteTravel = async (req, res) => {
  try {
    const travel = await Travel.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.session.user.id 
    });
    if (!travel) {
      return res.status(404).render('error', {
        title: '404 - Not Found',
        message: 'Travel not found'
      });
    }
    req.session.success = 'Travel deleted successfully!';
    res.redirect('/travels');
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to delete travel: ' + error.message
    });
  }
};

