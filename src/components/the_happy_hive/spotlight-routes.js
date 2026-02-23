const express = require('express');
const router = express.Router();
const spotlightController = require('./spotlight-controller');

// Routes for spotlight component
router.get('/', spotlightController.getAllSpotlights);
router.get('/admin/all', spotlightController.getAllSpotlightsAdmin);
router.get('/type/:type', spotlightController.getSpotlightsByType);
router.get('/:id', spotlightController.getSpotlightById);
router.post('/', spotlightController.createSpotlight);
router.put('/:id', spotlightController.updateSpotlight);
router.delete('/:id', spotlightController.deleteSpotlight);

module.exports = router;
