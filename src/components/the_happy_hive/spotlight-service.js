const { pool } = require('../../config/database');

const spotlightService = {
  getAllSpotlights: async () => {
    try {
      const connection = await pool.getConnection();
      // Only fetch non-expired spotlights
      const query = `
        SELECT id, description, type, expiry, created_at, updated_at 
        FROM spotlight 
        WHERE expiry >= CURDATE() 
        ORDER BY created_at DESC
      `;
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch spotlights: ${error.message}`);
    }
  },

  getAllSpotlightsIncludingExpired: async () => {
    try {
      const connection = await pool.getConnection();
      // Fetch all spotlights including expired ones
      const query = `
        SELECT id, description, type, expiry, created_at, updated_at 
        FROM spotlight 
        ORDER BY created_at DESC
      `;
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch spotlights: ${error.message}`);
    }
  },

  getSpotlightById: async (id) => {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT id, description, type, expiry, created_at, updated_at FROM spotlight WHERE id = ?';
      const [rows] = await connection.query(query, [id]);
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to fetch spotlight: ${error.message}`);
    }
  },

  getSpotlightsByType: async (type) => {
    try {
      const connection = await pool.getConnection();
      // Fetch by type and only non-expired
      const query = `
        SELECT id, description, type, expiry, created_at, updated_at 
        FROM spotlight 
        WHERE type = ? AND expiry >= CURDATE() 
        ORDER BY created_at DESC
      `;
      const [rows] = await connection.query(query, [type]);
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch spotlights by type: ${error.message}`);
    }
  },

  createSpotlight: async (data) => {
    try {
      if (!data.description || !data.type || !data.expiry) {
        throw new Error('description, type, and expiry are required');
      }

      const connection = await pool.getConnection();
      const query = 'INSERT INTO spotlight (description, type, expiry) VALUES (?, ?, ?)';
      const [result] = await connection.query(query, [
        data.description,
        data.type,
        data.expiry
      ]);

      // Fetch and return the created spotlight
      const insertedSpotlight = await spotlightService.getSpotlightById(result.insertId);
      connection.release();
      return insertedSpotlight;
    } catch (error) {
      throw new Error(`Failed to create spotlight: ${error.message}`);
    }
  },

  updateSpotlight: async (id, data) => {
    try {
      const connection = await pool.getConnection();

      // Check if spotlight exists
      const existingSpotlight = await spotlightService.getSpotlightById(id);
      if (!existingSpotlight) {
        connection.release();
        return null;
      }

      // Build update query dynamically
      const allowedFields = ['description', 'type', 'expiry'];
      const updateFields = [];
      const values = [];

      for (const field of allowedFields) {
        if (data.hasOwnProperty(field)) {
          updateFields.push(`${field} = ?`);
          values.push(data[field] || null);
        }
      }

      if (updateFields.length === 0) {
        connection.release();
        return existingSpotlight;
      }

      values.push(id);
      const query = `UPDATE spotlight SET ${updateFields.join(', ')} WHERE id = ?`;
      await connection.query(query, values);

      // Fetch and return the updated spotlight
      const updatedSpotlight = await spotlightService.getSpotlightById(id);
      connection.release();
      return updatedSpotlight;
    } catch (error) {
      throw new Error(`Failed to update spotlight: ${error.message}`);
    }
  },

  deleteSpotlight: async (id) => {
    try {
      const connection = await pool.getConnection();

      // Check if spotlight exists
      const existingSpotlight = await spotlightService.getSpotlightById(id);
      if (!existingSpotlight) {
        connection.release();
        return false;
      }

      const query = 'DELETE FROM spotlight WHERE id = ?';
      await connection.query(query, [id]);
      connection.release();
      return true;
    } catch (error) {
      throw new Error(`Failed to delete spotlight: ${error.message}`);
    }
  }
};

module.exports = spotlightService;
