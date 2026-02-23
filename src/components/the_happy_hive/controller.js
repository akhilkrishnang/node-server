const service = require('./service');

const controller = {
  getAllItems: async (req, res) => {
    try {
      const items = await service.getAllItems();
      res.json({ success: true, data: items });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getItemById: async (req, res) => {
    try {
      const item = await service.getItemById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  createItem: async (req, res) => {
    try {
      const item = await service.createItem(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const item = await service.updateItem(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }
      res.json({ success: true, data: item });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const success = await service.deleteItem(req.params.id);
      if (!success) {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }
      res.json({ success: true, message: 'Item deleted' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = controller;
