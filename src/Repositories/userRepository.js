import connection from "../database";

export async function create(name, email, hashedPassword){
    const newUser = await connection.query(
      `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)
      RETURNING *`,
      [name, email, hashedPassword]
    );
    return newUser.rows[0];
}

export async function getItByEmail(email){
  const existingUserWithGivenEmail = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );
  return existingUserWithGivenEmail.rows[0];
}