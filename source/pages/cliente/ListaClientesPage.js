import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import CardClientes from '../../components/clientes/CardClientes'
import Database from '../../components/DB'
import AddSvg from "../../utils/SVG/AddSvg"
import md5 from 'md5';





export default class ListaClientesPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      estado: 'Carregando', //'Carregado', 'goCadastrarClientes' //
      tipoUsuario: this.props.navigation.state.params.tipoUsuario,
      idEmpresaCliente: this.props.navigation.state.params.idEmpresaCliente,
      perfilUsuario: this.props.navigation.state.params.userPerfil,
      search: ''
    }
    this.arrayholder = [];

  };

  onHandleChange(campo, content){
    this.setState({
      [campo]: content
    });
  }

  componentDidMount() {
    this.findClients();
  }

  componentDidUpdate(){
    if(this.state.estado == 'goCadastrarClientes'){
      this.goCadastrarClientes();
    }
  }
  async goCadastrarClientes(){
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    
    idPerfil = this.state.perfilUsuario;
    query = require('../../utils/initDatabaseSQL.json').checkPermission;

    await db.transaction(async connection => {
      res = await connection.execute(query,[idPerfil,'CRIAR CLIENTE']).catch((err) => {console.log(err);});
    });

    if(res.rows[0].hasPermission=='1'){
      this.setState({estado:'Carregado'});
      this.props.navigation.navigate('CadastrarClientesPage', { "tipoUsuario": this.state.tipoUsuario, "idEmpresaCliente": this.state.idEmpresaCliente, "userPerfil": this.state.userPerfil })
    }else{
      this.setState({estado:'Carregado'});
      Alert.alert(
        "Permissão negada",
        "O seu usuario não tem permissão para cadastrar um cliente, por favor contate um administrador",
        [
          { text: "OK"}
        ],
        { cancelable: true }
      );
    }
    
  }

  onClickAdd(){
    this.setState({estado:'goCadastrarClientes'});
  }
  
  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.nomeFantasia.toUpperCase()}   
      ${item.nomeFantasia.toUpperCase()} ${item.nomeFantasia.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ clientes: newData });  
  };


  async findClients(){
    
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    
    idEmpresaCliente = this.state.idEmpresaCliente;

    if (this.state.tipoUsuario == 'EMPRESA') {

      query = require('../../utils/initDatabaseSQL.json').selectTodosClientesDeUmaEmpresa;

      await db.transaction(async connection => {
        res = await connection.execute(query,[idEmpresaCliente,idEmpresaCliente]).catch((err) => {console.log(err);});
      });
    }
  
    if (this.state.tipoUsuario == 'CLIENTE') {
      query = require('../../utils/initDatabaseSQL.json').querySelectClienteFiliais;

      await db.transaction(async connection => {
        res = await connection.execute(query, [idEmpresaCliente, idEmpresaCliente]).catch((err) => { console.log(err); });
      });
    }
    this.arrayholder = res.rows;
    this.setState({ estado: "Carregado", clientes: res.rows});

  }



  renderViews() {
    if (this.state.estado == 'Carregando' || this.state.estado == 'goCadastrarClientes') {
      return (
        <View style={estilo.loading} >
          <ActivityIndicator size='large' color='#3F19C9' />
        </View>);
    }

    if (this.state.estado == 'Carregado') {
      return (
        <View style={estilo.container}>
          <View style={estilo.searchArea}>
          <TextInput style={estilo.textEntry}        
            placeholder="Digite o nome fantasia do cliente."
            onChangeText={text => this.searchFilterFunction(text)}         
          /> 
          </View>
          <FlatList
            data ={this.state.clientes.sort((a,b)=> a.nomeFantasia.localeCompare(b.nomeFantasia))}//this.state.clientes.sort((a,b)=> a.nomeFantasia.localeCompare(b.nomeFantasia))
            renderItem={({item})=>(
              <CardClientes 
                cliente={item}
                onPress={this.props.navigation}/>
            )}
            keyExtractor={item=> md5(item.idCliente)}
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
    flex: 1
  },
  searchArea:{
    flexDirection: "column"
  },
  textEntry:{
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3'
  }


});

