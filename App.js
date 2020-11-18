import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import LoginPage from './source/pages/LoginPage';
import ListaClientesPage from './source/pages/cliente/ListaClientesPage';
import {Text} from 'react-native';

const AppNavigator = createStackNavigator({

  
  'Login':{
    screen: LoginPage
  },
  
  'ListaClientesPage':{
    screen: ListaClientesPage,
    navigationOptions:{
      title: "Clientes",
        headerTitleStyle:{ 
          fontSize: 25,
          color: '#252323',
          fontWeight: 'bold',
        },     
      }
    },


} , {

    defaultNavigationOptions: {
      title: 'COGNI',
      headerTintColor: '#252323',
      headerStyle:{
        backgroundColor: '#F5F1ED',
        borderBottomColor: '#F5F1ED'
      },
      headerTitleStyle:{
        fontSize: 25,
        color: '#252323',
        fontWeight: 'bold'
      },
      headerTitleAlign: 'center'
    }
  });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;