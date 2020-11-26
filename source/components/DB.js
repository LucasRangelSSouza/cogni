import { Database } from "./Database";
import React from 'react';

export default class DB extends React.Component {
  constructor(props) {
    super(props);
    this.databaseName = "cogniDB";
  }
  async initDatabase() {
    //Esta funçao verifica o banco e cria toda a estrutura do banco

    db = new Database(this.databaseName);
    const sqls = require('../utils/initDatabaseSQL.json');
    var tables = sqls.listTables;
    for (var table of tables) {
      await db.transaction(async connection => {
        res = await connection.execute(sqls.checkTableExists,[table]).catch((err) => { console.log(err); });
      });
      if (res.rows[0].count == 0) {
        await db.transaction(async connection => {
          await connection.execute(sqls.dropTable[table]).catch((err) => { console.log(err); });//drop
          await connection.execute(sqls.createTable[table]).catch((err) => { console.log(err); });;  //create
          await connection.execute(sqls.insertDefaultData[table]).catch((err) => { console.log(err); }); // insert
        });
      }    
    }
    await db.transaction(async connection => {
      res = await connection.execute("SELECT * FROM sqlite_master WHERE type='table' ").catch((err) => { console.log(err); });
    });
    console.log(res);
  }

  getDB() {
    db = new Database(this.databaseName);
    return (db);
  }

};