import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ViewRow from '../components/ViewRow'
import Logo from '../utils/SVG/LogoCogniSvg'
import Database from '../components/DB'
import md5 from 'md5';
import { or } from 'react-native-reanimated';



export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.bancoDeDados();
    this.state = {
      autenticacao: 'Nao-Realizada', // 'Rejeitada' // 'Autorizada' //'Erro' // 'Processando'
      tipoUsuario: null,
      idEmpresaCliente: null,
      email: 'admin',
      senha: 'desenvolvedor'
    }

  };
  async bancoDeDados() {
    var BancoDeDados = new Database();
    await BancoDeDados.initDatabase();
    //await BancoDeDados.insetData();
    this.database = BancoDeDados.getDB();
  }

  onHandleChange(field, value) {
    this.setState({
      [field]: value
    });

  }

  componentDidUpdate() {
    if (this.state.autenticacao == 'Autorizada') {
      //Navega para a pagina que lista as empresas
      this.props.navigation.navigate('ListaClientesPage', { "tipoUsuario": this.state.tipoUsuario, "idEmpresaCliente": this.state.idEmpresaCliente })
    }
  }



  async tryLogin() {
    this.setState({ autenticacao: "Processando" });
    db = this.database;

    const email = this.state.email;
    const passwdEncrypted = md5(this.state.senha);

    query = require('../utils/initDatabaseSQL.json').checkUserQuery;

    await db.transaction(async connection => {
      res = await connection.execute(query, [email, passwdEncrypted]).catch((err) => { console.log(err); });
    });
    if (res.rows[0].userExists > 0) {

      this.setState({ autenticacao: "Autorizada", tipoUsuario: res.rows[0].tipo, idEmpresaCliente: res.rows[0].idEmpresaCliente });

    } else {
      this.setState({ autenticacao: "Rejeitada" });
    }

  }


  renderViews() {

    if ((this.state.autenticacao == 'Processando')) {
      return (
        <View style={estilo.indicadorDeAtividades} >
          <ActivityIndicator size='large' color='#3F19C9' />
          <Text style={estilo.aguarde}>Aguarde...</Text>
        </View>);
    }

    if (this.state.autenticacao == 'Rejeitada') {
      return (
        <View >
          <View style={estilo.botao}>
            <TouchableOpacity delayPressIn={0} onPress={() => this.tryLogin()} >
              <Text style={estilo.textButton} >Entrar</Text>
            </TouchableOpacity>
          </View>
          <Text style={estilo.loginIncorreto}>E-mail ou senha incorretos</Text>
        </View>);
    }

    if (this.state.autenticacao == 'Nao-Realizada') {
      return (
        <View style={estilo.botao}>
          <TouchableOpacity delayPressIn={0} onPress={() => this.tryLogin()} >
            <Text style={estilo.textButton} >Entrar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (this.state.autenticacao == 'Autorizada') {
      return (
        <View style={estilo.botao}>
          <TouchableOpacity delayPressIn={0} onPress={() => this.tryLogin()} >
            <Text style={estilo.textButton} >Entrar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View >
        <Text style={estilo.loginIncorreto}>Ocorreu um erro</Text>
      </View>);

  }

  render() {

    const { email, senha } = this.state;
    return (
      <View style={estilo.container}>
        <SafeAreaView >
          <ScrollView >
            <View style={estilo.logo}>
              <Logo />
            </View>
            <ViewRow>
              <Text style={estilo.label}>E-Mail:</Text>
              <TextInput
                value={email}
                placeholder='user@example.com'
                style={estilo.textEntry}
                placeholderTextColor='#857f7f'
                onChangeText={(texto) => this.onHandleChange('email', texto)}
              />

              <Text style={estilo.label}>Senha:</Text>
              <TextInput
                value={senha}
                placeholder='******'
                style={estilo.textEntry}
                secureTextEntry
                placeholderTextColor='#857f7f'
                onChangeText={(texto) => this.onHandleChange('senha', texto)}
              />

            </ViewRow>
            {
              this.renderViews()
            }
          </ScrollView>
        </SafeAreaView>
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
  textEntry: {

    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingRight: 10,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 6,
    backgroundColor: '#e3e1e1',
    color: '#252323',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,

  },
  label: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    color: '#252323',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    backgroundColor: '#e3e1e1',
  },
  botao: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#3F19C9',
    borderRadius: 7,
    padding: 20

  },
  logo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',


  },
  textButton: {
    alignSelf: 'center',
    color: '#F5F1ED'
  },
  loginIncorreto: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    color: 'red',
    flexGrow: 1,
    textAlign: 'center',

  },
  aguarde: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    color: '#3F19C9',
    flexGrow: 1,
    textAlign: 'center',

  },
  indicadorDeAtividades: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    padding: 20

  }


});

