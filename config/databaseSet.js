const mysql = require('mysql2');
require('dotenv').config(); // .env 파일 로드


// createPool()로 연결 풀을 만들고 promise() 메서드를 호출해 promise API로 변경
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise();  // promise() 메서드 호출



// 쿼리 실행 예시 (비동기 방식으로)
async function testQuery() {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    console.log('쿼리 결과:', rows);
  } catch (err) {
    console.error("쿼리 실행 오류:", err);
  }
}

testQuery();

module.exports = pool;
