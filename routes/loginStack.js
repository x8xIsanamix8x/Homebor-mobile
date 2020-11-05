import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta';
import Nav from './nav';

const screens = {
    Login: {
        screen: Login,
        navigationOptions: {
            title:"Login",
              headerShown:false
        }
    },
    CrearCuenta: {
        screen: CrearCuenta,
        navigationOptions: {
            title:"Register",
              headerStyle:{
                backgroundColor: '#232159'
              },
            headerTintColor:'#fff'
        }
    },
    Nav: {
      screen: Nav,
      navigationOptions: {
        title:"Nav"
      }
    }
}

const LoginStack = createStackNavigator(screens);

export default createAppContainer (LoginStack);