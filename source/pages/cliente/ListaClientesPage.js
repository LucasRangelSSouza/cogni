import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import CardClientes from '../../components/clientes/CardClientes'
import Database from '../../components/DB'
import AddSvg from "../../utils/SVG/AddSvg"





export default class ListaClientesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      clientsToShow:[],
      estado: 'Carregando', //'Carregado'
      tipoUsuario: this.props.navigation.state.params.tipoUsuario,
      idEmpresaCliente: this.props.navigation.state.params.idEmpresaCliente,
      perfilUsuario: this.props.navigation.state.params.userPerfil,
      search: ''
    }

  };

  onHandleChange(campo, content){
    this.setState({
      [campo]: content
    });
    this.setState({ clientsToShow: this.state.clientes.filter(cliente=>cliente.NOME_FANTASIA.indexOf(this.state.search)!=-1)});
  }

  componentDidMount() {
    this.findClients();
  }

  componentDidUpdate() {
    if(this.state.search!==''){
      this.setState({ clientsToShow: this.state.clientes});
    }
  }


  async findClients(){
    
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    
    idEmpresaCliente = this.state.idEmpresaCliente;

    if (this.state.tipoUsuario == 'EMPRESA') {

      query = require('../../utils/initDatabaseSQL.json').selectTodosClientesDeUmaEmpresa;

      await db.transaction(async connection => {
        res = await connection.execute(query,[idEmpresaCliente,idEmpresaCliente]).catch((err) => {console.log(err);});
      });
    
      this.setState({ estado: "Carregado", clientes: res.rows,clientsToShow: res.rows});


    }
  
    if (this.state.tipoUsuario == 'CLIENTE') {
      query = require('../../utils/initDatabaseSQL.json').querySelectClienteFiliais;

      await db.transaction(async connection => {
        res = await connection.execute(query, [idEmpresaCliente, idEmpresaCliente]).catch((err) => { console.log(err); });
      });
      this.setState({ estado: "Carregado", clientes: res.rows, clientsToShow:res.rows});

    }

  }



  renderViews() {
    if (this.state.estado == 'Carregando') {
      return (
        <View style={estilo.loading} >
          <ActivityIndicator size='large' color='#3F19C9' />
          <Text style={estilo.aguarde}>Aguarde...</Text>
        </View>);
    }

    if (this.state.estado == 'Carregado') {
      return (
        <View style={estilo.container}>
          <View style={estilo.searchArea}>
            <TextInput
            value={this.state.search}
            placeholder='Pesquise um cliente'
            style={estilo.textEntry}
            placeholderTextColor='#857f7f'
            onChangeText={(texto) => this.onHandleChange('search', texto)}
            />
          </View>
          <FlatList
            data ={this.state.clientsToShow.sort((a,b)=> a.NOME_FANTASIA.localeCompare(b.NOME_FANTASIA))}
            renderItem={({item})=>(
              <CardClientes 
                cliente={item}
                onPress={this.props.navigation}/>
            )}
            keyExtractor={item=>item.ID_CLIENTE}
          />
          <TouchableOpacity style={estilo.addButton} activeOpacity={0.7} onPress={()=>{this.onClickAdd()}}>
              <AddSvg/>
          </TouchableOpacity>
            
        </View>
      );
    }

  }

  render() {
    return (
        <SafeAreaView style={estilo.container}>
          {this.renderViews()}
        </SafeAreaView>
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
  },

  loading:{
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
  },
  searchArea:{
    flexDirection: "column"
  },
  textEntry:{
    borderRadius: 10
  }


});

