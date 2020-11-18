import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import CardClientes from '../../components/clientes/CardClientes'
import Database from '../../components/DB'





export default class ListaClientesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      estado: 'Carregando', //'Carregado'
      tipoUsuario: this.props.navigation.state.params.tipoUsuario,
      idEmpresaCliente: this.props.navigation.state.params.idEmpresaCliente
    }

  };


  componentDidMount() {
    this.findClients();
  }


  async findClients(){
    
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    
    idEmpresaCliente = this.state.idEmpresaCliente;

    if (this.state.tipoUsuario == 'empresarial') {

      query = require('../../utils/initDatabaseSQL.json').querySelectTodosClientesDeUmaEmpresa;

      await db.transaction(async connection => {
        res = await connection.execute(query,[idEmpresaCliente]).catch((err) => {console.log(err);});
      });
    
      this.setState({ estado: "Carregado", clientes: res.rows });


    }
  
    if (this.state.tipoUsuario == 'cliente') {
      query = require('../../utils/initDatabaseSQL.json').querySelectClienteFiliais;

      await db.transaction(async connection => {
        res = await connection.execute(query, [idEmpresaCliente, idEmpresaCliente]).catch((err) => { console.log(err); });
      });
      console.log('Res em transation cliente', res);
      this.setState({ estado: "Carregado", clientes: res.rows });
      console.log(this.state.clientes);
    }

  }



  renderViews() {
    if (this.state.estado == 'Carregando') {
      return (
        <View style={estilo.indicadorDeAtividades} >
          <ActivityIndicator size='large' color='#3F19C9' />
          <Text style={estilo.aguarde}>Aguarde...</Text>
        </View>);
    }

    if (this.state.estado == 'Carregado') {
      return (
        <View style={estilo.container}>
          
          <FlatList
            data ={this.state.clientes.sort((a,b)=> a.NOME_FANTASIA.localeCompare(b.NOME_FANTASIA))}
            renderItem={({item})=>(
              <CardClientes 
                cliente={item}
                onPress={this.props.navigation}/>
            )}
            keyExtractor={item=>item.ID_CLIENTE}
          />
          <TouchableOpacity  
            style={estilo.addButton}
            activeOpacity={0.7}
          />
        </View>
      );
    }

  }

  render() {
    return (
        <View style={estilo.container}>
          {this.renderViews()}
        </View>
    );
  }

}

const estilo = StyleSheet.create({
  container: {
    backgroundColor: '#F5F1ED',
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  cliente: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#e3e1e1',
    color: '#252323',
    borderRadius: 5,
    flexDirection: 'column'

  },
  nomeCliente: {
    flex: 1,
    textAlign: 'center'
  },
  rowOptions: {
    flexDirection: 'row'

  },
  info: {
    flex: 1

  },
  produtos: {
    flex: 1

  },

  addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 30,
    backgroundColor:'#3F19C9',
    borderRadius:25,


  }

});

