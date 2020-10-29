import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { registerRootComponent } from 'expo';

import Login from '../screens/Login';
import CrearCuenta from '../screens/CrearCuenta';
import Calendar from '../screens/Calendar';

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
}

const LoginStack = createStackNavigator(screens);

export default LoginStack;