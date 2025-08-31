import mysql from "mysql2/promise";
import dotenv from 'dotenv'
dotenv.config()

const connectionString =process.env.MYSQL_URL

const url = new URL(connectionString);

 const pool = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: parseInt(url.port),
  connectionLimit: 10,
  ssl: { rejectUnauthorized: false },
  queueLimit: 0,
  connectTimeout: 20000,
  enableKeepAlive: true, 
  keepAliveInitialDelay: 10000 
});


// Test connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log(" Database connected successfully");
    connection.release();
  } catch (error) {
    console.error(" Database connection failed:", error.message);
  }
};

setInterval(async () => {
  try {
    await pool.query("SELECT 1");
    console.log(" DB keep-alive ping");
  } catch (err) {
    console.error(" Ping failed:", err);
  }
}, 60000);


export default pool;
