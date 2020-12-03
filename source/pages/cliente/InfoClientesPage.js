import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator,Alert } from 'react-native';
import Database from '../../components/DB'
import AddSvg from "../../utils/SVG/AddSvg"


export default class InfoClientes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      clientes: [],
      estado: 'Aguardando', //'Salvando'
      tipoUsuario: this.props.navigation.state.params.tipoUsuario,
      idEmpresaCliente: this.props.navigation.state.params.idEmpresaCliente,
      perfilUsuario: this.props.navigation.state.params.userPerfil,
      search: ''
    }
    this.arrayholder = [];

  };

 componentDidUpdate(){

 }
  
  async editCliente(){
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    
    idPerfil = this.state.perfilUsuario;
    query = require('../../utils/initDatabaseSQL.json').checkPermission;

    await db.transaction(async connection => {
      res = await connection.execute(query,[idPerfil,'CRIAR CLIENTE']).catch((err) => {console.log(err);});
    });

    if(res.rows[0].hasPermission=='0'){
      this.setState({estado:'Carregado'});
      this.props.navigation.navigate('CadastraClientesPage', { "tipoUsuario": this.state.tipoUsuario, "idEmpresaCliente": this.state.idEmpresaCliente, "userPerfil": this.state.userPerfil })
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

  onClickSave(){
    this.setState({estado:'Editando'});
    console.log('Editar Cliente cliente')
    //this.editCliente();
  }
  
 


  renderViews() {
   
    if (this.state.estado == 'Aguardando') {
      return (
        <View style={estilo.container}>
            <Text>Informaçoes do cliente</Text>
          <TouchableOpacity style={estilo.saveButton} activeOpacity={0.7} onPress={()=>{this.onClickSave()}}>
              <Text style={estilo.textButton}>Editar</Text>
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
  saveButton: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#3F19C9',
    borderRadius: 7,
    padding: 20
  },

  loading:{
    display: 'flex',
    justifyContent: 'center',
    flex: 1
  },
  textButton: {
    alignSelf: 'center',
    color: '#F5F1ED'
  },


});

