import mysql from 'mysql2';
import dotenv from 'dotenv'; // .env 파일 로드
dotenv.config();

// createPool()로 연결 풀을 만들고 promise() 메서드를 호출해 promise API로 변경
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise();  // promise() 메서드 호출

// DB 연결 확인용 코드
async function testDBConnection() {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Database connection successful", rows);
    } catch (error) {
        console.error("Error connecting to database", error);
    }
}

testDBConnection();

export default pool;  // ES 모듈 방식으로 내보내기
