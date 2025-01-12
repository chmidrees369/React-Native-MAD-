import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("admissions.db");

export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS admissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        fatherName TEXT,
        dob TEXT,
        placeOfBirth TEXT,
        nationality TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        gender TEXT,
        qualification TEXT,
        program TEXT,
        campus TEXT,
        shift TEXT
      );`,
      [],
      () => console.log("Table created successfully."),
      (_, error) => console.error("Error creating table:", error)
    );
  });
};
