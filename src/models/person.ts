import { Client } from "../database";

export type Person = {
  id: Number;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  profession: string;
};
// Person Model
// Each row is an instance of the person model
export class PersonStore {
  //READ RESTful route
  async index(): Promise<Person[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM persons";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get persons, Error: ${error}`);
    }
  }
  async show(id: string): Promise<Person> {
    try {
      const sql = "SELECT * FROM persons WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find person ${id}. Error: ${err}`);
    }
  }

  async create(p: Person): Promise<Person> {
    try {
      const sql =
        "INSERT INTO persons (firstName, lastName, age, city, profession) VALUES($1, $2, $3, $4, $5) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [
        p.firstName,
        p.lastName,
        p.age,
        p.city,
        p.profession,
      ]);
      const person = result.rows[0];
      conn.release();

      return person;
    } catch (err) {
      throw new Error(`Could not add new person ${firstName}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Person> {
    try {
      const sql = "DELETE FROM persons WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      const person = result.rows[0];
      conn.release();

      return person;
    } catch (err) {
      throw new Error(`Could not delete person ${id}. Error: ${err}`);
    }
  }
}
