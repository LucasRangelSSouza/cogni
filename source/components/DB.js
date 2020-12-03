import { Database } from "./Database";
import React from 'react';

export default class DB extends React.Component {
  constructor(props) {
    super(props);
    this.databaseName = "SqCogni5";
  }
  async initDatabase() {
    //Esta funçao verifica o banco e cria toda a estrutura do banco

    db = new Database(this.databaseName);
    const sqls = require('../utils/initDatabaseSQL.json');
    var tables = sqls.listTables;
    
    await db.transaction(async connection => {
      await connection.execute(sqls.disableFk).catch((err) => { console.log(err); });
    });

    for (var table of tables) {
      
     // console.log('-----------------------------Table: ',table,'-----------------------------\n\n');
      
      await db.transaction(async connection => {
        res = await connection.execute(sqls.checkTableExists,[table]).catch((err) => { console.log(err); });
      });
     
      //console.log('Table Exsists: ',res);
      if (res.rows[0].count < 1) {
        await db.transaction(async connection => {
          //console.log('Droping');
          await connection.execute(sqls.dropTable[table]).catch((err) => { console.log(err); });//drop
          //console.log('Creating');
          await connection.execute(sqls.createTable[table]).catch((err) => { console.log(err); });;  //create
          //console.log('Insrting');
          await connection.execute(sqls.insertDefaultData[table]).catch((err) => { console.log(err); }); // insert default data
          //console.log('Ok Dude');
        });

        // await db.transaction(async connection => {
        //   res = await connection.execute("SELECT * FROM "+table+";").catch((err) => { console.log(err); });
        // });
        // console.log('Select todos: ',res);
      }    
    }
    await db.transaction(async connection => {
      await connection.execute(sqls.enableFk).catch((err) => { console.log(err); });
    });

    // ----------Remover ----------
    await db.transaction(async connection => {
      res = await connection.execute("SELECT * FROM sqlite_master WHERE type='table' ").catch((err) => { console.log(err); });
    });
    console.log(res);

    await db.transaction(async connection => {
      res = await connection.execute("SELECT COUNT(USUARIOS.ID) AS userExists, PERFIL.ID AS idPerfil, PESSOAS_DE_CLIENTES.CLIENTE_ID AS idCliente, PESSOAS_DE_EMPRESAS.EMPRESA_ID AS idEmpresa FROM USUARIOS INNER JOIN PERFIS_DE_USUARIOS ON USUARIOS.ID = PERFIS_DE_USUARIOS.USUARIO_ID INNER JOIN PERFIL ON PERFIS_DE_USUARIOS.PERFIL_ID = PERFIL.ID LEFT JOIN PESSOAS_DE_CLIENTES ON USUARIOS.PESSOA_ID = PESSOAS_DE_CLIENTES.PESSOA_ID LEFT JOIN PESSOAS_DE_EMPRESAS ON USUARIOS.PESSOA_ID = PESSOAS_DE_EMPRESAS.PESSOA_ID WHERE USUARIOS.USUARIO LIKE 'tec-empresa@example.com' AND USUARIOS.SENHA LIKE '75f33e6eebce7012b8c74a889fa8a7ed' ;").catch((err) => { console.log(err); });
    });
    console.log(res);
    // ----------Remover ----------
  
  }

  getDB() {
    db = new Database(this.databaseName);
    return (db);
  }

};