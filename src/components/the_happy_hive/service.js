const { pool } = require('../../config/database');

const service = {
  getAllItems: async () => {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT id, name, dept, about, dob, dp_id, created_at, updated_at FROM hive ORDER BY created_at DESC';
      const [rows] = await connection.query(query);
      connection.release();
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch items: ${error.message}`);
    }
  },

  getItemById: async (id) => {
    try {
      const connection = await pool.getConnection();
      const query = 'SELECT id, name, dept, about, dob, dp_id, created_at, updated_at FROM hive WHERE id = ?';
      const [rows] = await connection.query(query, [id]);
      connection.release();
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to fetch item: ${error.message}`);
    }
  },

  createItem: async (data) => {
    try {
      if (!data.name) {
        throw new Error('Name is required');
      }

      const connection = await pool.getConnection();
      const query = 'INSERT INTO hive (name, dept, about, dob, dp_id) VALUES (?, ?, ?, ?, ?)';
      const [result] = await connection.query(query, [
        data.name,
        data.dept || null,
        data.about || null,
        data.dob || null,
        data.dp_id || null
      ]);
      
      // Fetch and return the created item
      const insertedItem = await service.getItemById(result.insertId);
      connection.release();
      return insertedItem;
    } catch (error) {
      throw new Error(`Failed to create item: ${error.message}`);
    }
  },

  updateItem: async (id, data) => {
    try {
      const connection = await pool.getConnection();
      
      // Check if item exists
      const existingItem = await service.getItemById(id);
      if (!existingItem) {
        connection.release();
        return null;
      }

      // Build update query dynamically
      const allowedFields = ['name', 'dept', 'about', 'dob', 'dp_id'];
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
        return existingItem;
      }

      values.push(id);
      const query = `UPDATE hive SET ${updateFields.join(', ')} WHERE id = ?`;
      await connection.query(query, values);

      // Fetch and return the updated item
      const updatedItem = await service.getItemById(id);
      connection.release();
      return updatedItem;
    } catch (error) {
      throw new Error(`Failed to update item: ${error.message}`);
    }
  },

  deleteItem: async (id) => {
    try {
      const connection = await pool.getConnection();
      
      // Check if item exists
      const existingItem = await service.getItemById(id);
      if (!existingItem) {
        connection.release();
        return false;
      }

      const query = 'DELETE FROM hive WHERE id = ?';
      await connection.query(query, [id]);
      connection.release();
      return true;
    } catch (error) {
      throw new Error(`Failed to delete item: ${error.message}`);
    }
  }
};

module.exports = service;
