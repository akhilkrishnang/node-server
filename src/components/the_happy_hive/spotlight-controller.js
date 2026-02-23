const spotlightService = require('./spotlight-service');

const spotlightController = {
  getAllSpotlights: async (req, res) => {
    try {
      const spotlights = await spotlightService.getAllSpotlights();
      res.json({ success: true, data: spotlights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getAllSpotlightsAdmin: async (req, res) => {
    try {
      // Admin endpoint that shows all spotlights including expired ones
      const spotlights = await spotlightService.getAllSpotlightsIncludingExpired();
      res.json({ success: true, data: spotlights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getSpotlightById: async (req, res) => {
    try {
      const spotlight = await spotlightService.getSpotlightById(req.params.id);
      if (!spotlight) {
        return res.status(404).json({ success: false, error: 'Spotlight not found' });
      }
      res.json({ success: true, data: spotlight });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getSpotlightsByType: async (req, res) => {
    try {
      if (!req.params.type) {
        return res.status(400).json({ success: false, error: 'Type parameter is required' });
      }
      const spotlights = await spotlightService.getSpotlightsByType(req.params.type);
      res.json({ success: true, data: spotlights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createSpotlight: async (req, res) => {
    try {
      const spotlight = await spotlightService.createSpotlight(req.body);
      res.status(201).json({ success: true, data: spotlight });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  updateSpotlight: async (req, res) => {
    try {
      const spotlight = await spotlightService.updateSpotlight(req.params.id, req.body);
      if (!spotlight) {
        return res.status(404).json({ success: false, error: 'Spotlight not found' });
      }
      res.json({ success: true, data: spotlight });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteSpotlight: async (req, res) => {
    try {
      const success = await spotlightService.deleteSpotlight(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, error: 'Spotlight not found' });
      }
      res.json({ success: true, message: 'Spotlight deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = spotlightController;
