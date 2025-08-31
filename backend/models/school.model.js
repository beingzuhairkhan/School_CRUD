import pool from "../config/database.js";

class School {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        contact VARCHAR(15) NOT NULL,
        image VARCHAR(500),
        email_id VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await pool.execute(query);
      console.log(" Schools table created/verified");
    } catch (error) {
      console.error(" Error creating schools table:", error);
      throw error;
    }
  }

  static async create(schoolData) {
    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      schoolData.name,
      schoolData.address,
      schoolData.city,
      schoolData.state,
      schoolData.contact,
      schoolData.image,
      schoolData.email_id,
    ];


    try {
      const [result] = await pool.execute(query, values);
      return result;
    } catch (error) {
      console.error("Error creating school:", error);
      throw error;
    }
  }

  static async findAll() {
    const query = "SELECT * FROM schools ORDER BY created_at DESC";
    
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw error;
    }
  }

 

  static async search(searchTerm) {
    const query = `
      SELECT * FROM schools 
      WHERE name LIKE ? OR city LIKE ? OR state LIKE ?
      ORDER BY created_at DESC
    `;
    
    const searchPattern = `%${searchTerm}%`;
    
    try {
      const [rows] = await pool.execute(query, [
        searchPattern,
        searchPattern,
        searchPattern,
      ]);
      return rows;
    } catch (error) {
      console.error("Error searching schools:", error);
      throw error;
    }
  }
}

export default School;
