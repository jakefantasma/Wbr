const metodos_gestor = require("./gestor");
const { DbBase } = metodos_gestor();
class BlackList extends DbBase {
  constructor(file, name_db) {
    super(file, name_db);
  }
  define() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS ${this.name_db} (id INTEGER PRIMARY KEY, dominio TEXT,  redirect TEXT, active INTEGER)`
      )
      .run();
  }
  add(Obj) {
    console.log(Object.values(Obj));
    let tmp = this.db.prepare(
      `INSERT INTO ${this.name_db} (dominio, redirect, active) VALUES (@dominio, @redirect, @active)`
    );
    tmp.run(Obj);
  }
  LookByDomain(url) {
    const match = url.match(/^https?:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
    const domain = match ? match[1] : null;
    let tmp = this.db
      .prepare(`SELECT * FROM ${this.name_db} WHERE dominio = ?`)
      .get(domain);
    return tmp;
  }
}
module.exports = () => {
  return { BlackList };
};
