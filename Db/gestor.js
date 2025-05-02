const Database = require("better-sqlite3");
let db = null;
//change for json object an trasform data for simple gestion
///we transfor the data here
class DbBase {
  constructor(file, name_db) {
    this.name_db = name_db;
    this.db = new Database(`${file}.sqlite` /**{ verbose: console.log } */);
    this.define();
  }
  define() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.name_db} (id INTEGER PRIMARY KEY, valor TEXT)`
      )
      .run();
  }
  add(data) {
    this.db
      .prepare(`INSERT INTO ${this.name_db} (jsonValue) VALUES (?)`)
      .run(`${JSON.stringify(data)}`);
  }
  removeByIndex(id) {
    return null;
  }
  exist(id) {
    return null;
  }
  getoneById(id) {
    let data = this.db
      .prepare(`SELECT * FROM ${this.name_db} WHERE id = ${id}`)
      .get();

    return data;
  }
  getall() {
    let data = this.db.prepare(`SELECT * FROM ${this.name_db}`).all();
    return data;
  }
}
//extendemos y modificamos
class ListByString extends DbBase {
  constructor(file, name_db) {
    super(file, name_db);
  }
  define() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.name_db} (id INTEGER PRIMARY KEY, slot_1 TEXT)`
      )
      .run();
  }
  add(data) {
    this.db
      .prepare(`INSERT INTO ${this.name_db} (slot_1) VALUES (?)`)
      .run(`${data}`);
  }
}
//extendemos y modificamos
class ListByJson extends DbBase {
  constructor(file, name_db) {
    super(file, name_db);
  }
  define() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.name_db} (id INTEGER PRIMARY KEY, valor TEXT)`
      )
      .run();
  }
  add(data) {
    this.db
      .prepare(`INSERT INTO ${this.name_db} (valor) VALUES (?)`)
      .run(`${JSON.stringify(data)}`);
  }
  getall() {
    let data = this.db.prepare(`SELECT * FROM ${this.name_db}`).all();
    data = data.reduce((col, el) => {
      console.log(el);
      col.push({ ...el, json: JSON.parse(el.valor) });
      return col;
    }, []);
    return data;
  }
}

//estructuras predefinidas

module.exports = () => {
  return { DbBase, ListByString, ListByJson };
};
//need add methods to valid if existe
//remove elemente and adjust order
//set name for setting page or opcion, divide and try to package by pgk

//todo agregar metodos para retornar la cantidad total sin obtener toda la coleccion
