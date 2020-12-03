import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Database from '../../components/DB'
import AddSvg from "../../utils/SVG/AddSvg"


export default class InfoClientes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cliente: {},
      estado: 'carregando', //'carregado' // 'goEditar'
      idCliente: this.props.navigation.state.params.idCliente,
      perfilUsuario: this.props.navigation.state.params.perfilUsuario
    }
    this.findClient();
  };

  componentDidMount() {
    this.findClient();
  }

  async findClient() {
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();
    console.log(idCliente);
    idCliente = this.state.idCliente;
    query = require('../../utils/initDatabaseSQL.json').clientDetails;

    await db.transaction(async connection => {
      res = await connection.execute(query, [idCliente]).catch((err) => { console.log(err); });
    });
    console.log(res);
    this.setState({ cliente: res.rows[0], estado: 'carregado' });
  }

  async editCliente() {
    var BancoDeDados = new Database();
    db = BancoDeDados.getDB();

    idPerfil = this.state.perfilUsuario;
    query = require('../../utils/initDatabaseSQL.json').checkPermission;

    await db.transaction(async connection => {
      res = await connection.execute(query, [idPerfil, 'EDITAR CLIENTE']).catch((err) => { console.log(err); });
    });

    if (res.rows[0].hasPermission == '0') {
      this.setState({ estado: 'Carregado' });
      this.props.navigation.navigate('CadastraClientesPage', { "tipoUsuario": this.state.tipoUsuario, "idEmpresaCliente": this.state.idEmpresaCliente, "userPerfil": this.state.userPerfil })
    } else {
      this.setState({ estado: 'Carregado' });
      Alert.alert(
        "Permissão negada",
        "O seu usuario não tem permissão para editar um cliente, por favor contate um administrador",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );
    }

  }

  onClickSave() {
    this.setState({ estado: 'Editando' });
    console.log('Editar Cliente cliente')
    //this.editCliente();
  }




  renderViews() {

    if (this.state.estado == 'carregado') {
      return (
        <View style={estilo.container}>
          <View style={estilo.containerImg}>
            <Image style={estilo.avatar} source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQF5f-JLoNFM1g/profile-displayphoto-shrink_200_200/0?e=1612396800&v=beta&t=pfbBEsvAGE-p83oktyscFHmnp3M1lGTaWnYGgiTsqcg' }} />
            <Text>{this.state.cliente.nomeFantasia}</Text>
          </View>
          <TouchableOpacity style={estilo.saveButton} activeOpacity={0.7} onPress={() => { this.onClickSave() }}>
            <Text style={estilo.textButton}>Editar</Text>
          </TouchableOpacity>

        </View>
      );
    }

    if (this.state.estado == 'carregando') {
      return (
        <View style={estilo.loading} >
          <ActivityIndicator size='large' color='#3F19C9' />
        </View>);
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

  loading: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1
  },
  textButton: {
    alignSelf: 'center',
    color: '#F5F1ED'
  },
  containerImg: {
    padding: 15,
    alignSelf: 'center',
  },

  avatar: {
    aspectRatio: 1,
    width: 150,
    height: 150,
    borderRadius: 110

  }


});

