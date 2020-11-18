import { Database } from "./Database";
import React from 'react';


export default class DB extends React.Component {
  constructor(props) {
    super(props);
    this.databaseName="cog";
  }

  async initDatabase() {
    //Esta funçao verifica o banco e cria toda a estrutura do banco

    db = new Database(this.databaseName);
    const sqls = require('../utils/initDatabaseSQL.json');

    //segmentos
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Segmentos'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Segmentos).catch((err) => { console.log(err); });//drop
        await connection.execute(sqls.createTable.Segmentos).catch((err) => { console.log(err); });;  //create
      });

    }

    //Perfil
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Perfil'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Perfil).catch((err) => { console.log(err); });;  //drop
        await connection.execute(sqls.createTable.Perfil).catch((err) => { console.log(err); });;  //create
      });

    }

    //Imagens
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Imagens'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Imagens).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Imagens).catch((err) => { console.log(err); });  //create
      });

    }

    //Enderecos
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Enderecos'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Enderecos).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Enderecos).catch((err) => { console.log(err); });  //create
      });

    }

    //Pessoas
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Pessoas'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Pessoas).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Pessoas).catch((err) => { console.log(err); });  //create
      });

    }

    //Usuarios
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Usuarios'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Usuarios).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Usuarios).catch((err) => { console.log(err); });  //create
      });

    }

    //Permissoes
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Permissoes'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Permissoes).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Permissoes).catch((err) => { console.log(err); });  //create
      });

    }

    //Empresas
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Empresas'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Empresas).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Empresas).catch((err) => { console.log(err); });  //create
      });

    }

    //Clientes
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'Clientes'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.Clientes).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.Clientes).catch((err) => { console.log(err); });  //create
      });

    }

    //PessoasDeEmpresasClientes
    await db.transaction(async connection => {
      res = await connection.execute("SELECT count(name) as count FROM sqlite_master WHERE type='table' AND name like 'PESSOAS_DE_EMPRESAS_CLIENTES'").catch((err) => { console.log(err); });
    });

    if (res.rows[0].count == 0) {

      await db.transaction(async connection => {
        await connection.execute(sqls.dropTable.PessoasDeEmpresasClientes).catch((err) => { console.log(err); });  //drop
        await connection.execute(sqls.createTable.PessoasDeEmpresasClientes).catch((err) => { console.log(err); });  //create
      });

    }
    await db.transaction(async connection => {
      res = await connection.execute("SELECT * FROM sqlite_master WHERE type='table' ").catch((err) => { console.log(err); });
    });
    console.log(res);


  }

  async insetData() {
    db = new Database(this.databaseName);
    const sqls = require('../utils/initDatabaseSQL.json');

    await db.transaction(async connection => {
      res = await connection.execute("SELECT * FROM sqlite_master WHERE type='table' ").catch((err) => { console.log(err); });
    });
    console.log(res);
    await db.transaction(async connection => {
      await connection.execute(sqls.insertDefaultData.Segmentos).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Perfil).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Imagens).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Enderecos).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Pessoas).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Usuarios).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Permissoes).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Empresas).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.Clientes).catch((err) => { console.log(err); }); // insert
      await connection.execute(sqls.insertDefaultData.PessoasDeEmpresasClientes).catch((err) => { console.log(err); }); // insert
    });

    await db.transaction(async connection => {
      res = await connection.execute("SELECT * FROM segmentos,perfil ").catch((err) => { console.log(err); });
    });
    console.log(res);
  }

  getDB() {
    db = new Database(this.databaseName);
    return (db);
  }

};