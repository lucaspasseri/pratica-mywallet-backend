import connection from "../database";

export async function newEvent(userId, value, type){
    const newEvent = await connection.query(
      `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)
      RETURNING *`,
      [userId, value, type]
    );
  
      return newEvent.rows[0];
}