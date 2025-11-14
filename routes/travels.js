const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// All routes for travels (protected)
router.get('/', isAuthenticated, travelController.getAllTravels);
router.get('/new', isAuthenticated, travelController.showCreateForm);
router.post('/', isAuthenticated, travelController.createTravel);
router.get('/:id', isAuthenticated, travelController.getTravel);
router.get('/:id/edit', isAuthenticated, travelController.showEditForm);
router.put('/:id', isAuthenticated, travelController.updateTravel);
router.delete('/:id', isAuthenticated, travelController.deleteTravel);

module.exports = router;

