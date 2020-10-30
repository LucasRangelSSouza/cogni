import React from 'react';
import { StyleSheet, Text, View, TextInput,SafeAreaView, ScrollView ,TouchableOpacity} from 'react-native';
import ViewRow from '../components/ViewRow'
import Logo from '../components/Logo'


export default class LoginPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      autenticado: false,
      email:'',
      senha:''
    }

  };

  onHandleChange(field,value){
    this.setState({
      [field]: value
     });

  }

  tryLogin(){
    console.log('Tentativa de Login');
  }

  render() {   
    
    const {email,senha} = this.state;
    return (
      <View style={estilo.container}>
            <SafeAreaView >
                <ScrollView >
                    <View style={estilo.logo}>
                        <Logo/>
                    </View>
                    <ViewRow>
                    <Text style={estilo.label}>E-Mail:</Text>
                    <TextInput
                        value={email}
                        placeholder='user@example.com'
                        style={estilo.textEntry}
                        placeholderTextColor='#857f7f'
                        onChangeText={(texto)=>this.onHandleChange('email',texto)}
                    />

                    <Text style={estilo.label}>Senha:</Text>
                    <TextInput
                        value={senha}
                        placeholder='******'
                        style={estilo.textEntry}
                        secureTextEntry
                        placeholderTextColor='#857f7f'
                        onChangeText={(texto)=>this.onHandleChange('senha',texto)}
                    />

                    </ViewRow>
                    <View style={estilo.botao}>
                        <TouchableOpacity onPress={()=>this.tryLogin()}>
                                <Text  style={estilo.textButton} >Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
      </View>
    );
  }

}

const estilo = StyleSheet.create({
  container:{
    backgroundColor: '#F5F1ED',
    display: 'flex',
    justifyContent: 'flex-start',
    flex: 1,
  },
  textEntry:{
    
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    paddingRight: 10,
    paddingLeft: 20, 
    paddingTop: 5,
    paddingBottom: 6, 
    backgroundColor: '#e3e1e1' ,
    color: '#252323',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,

  },
  label:{
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    color:'#252323',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    paddingRight: 10,
    paddingLeft: 10, 
    paddingTop: 5,
    backgroundColor: '#e3e1e1' ,
  },
  botao:{
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#3F19C9',
    borderRadius: 7,
    padding: 20

  },
  logo:{
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      
      
  },
  textButton: {
        alignSelf: 'center',
        color: '#F5F1ED'  
  }


}); 

