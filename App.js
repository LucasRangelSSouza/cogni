import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import LoginPage from './source/pages/LoginPage'


const AppNavigator = createStackNavigator({

  
  'Login':{
    screen: LoginPage
  }


} , {

    defaultNavigationOptions: {
      title: 'COGNI',
      headerTintColor: '#252323',
      headerStyle:{
        backgroundColor: '#F5F1ED',
        borderBottomColor: 'F5F1ED'
      },
      headerTitleStyle:{
        fontSize: 25,
        color: '#252323',
        flexGrow: 1,
        textAlign: 'center',
        fontWeight: 'bold'
      }
    }
  });
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;