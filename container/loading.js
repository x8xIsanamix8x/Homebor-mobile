import React, {Component} from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Spinner } from 'native-base';
import globalStyles from '../styles/global';

import { AuthContext } from '../components/context';

export default class Loading extends Component {
  static contextType = AuthContext 
    componentDidMount(){
        setTimeout( async() => {
            let validationLogin = await AsyncStorage.getItem('userLogin')
              if(validationLogin){
                  validationLogin = JSON.parse(validationLogin)
                  if(validationLogin.perm){
                    if(validationLogin.disableUser == true){
                      this.context.signDisable()
                    } else {
                      if(validationLogin.userRoute != 'Register' || validationLogin.userRoute != 'Houseinformation' || validationLogin.userRoute != 'Roomregister'){
                        this.context.signIn()
                      } else {
                        this.context.signUp()
                        if(validationLogin.userRoute == 'Houseinformation'){
                          this.props.navigation.navigate('YourLocation')
                        }
                        if(validationLogin.userRoute == 'Roomregister'){
                          this.props.navigation.navigate('YourRoom')
                        }
                      }
                    }
                  }else{
                  this.props.navigation.navigate('Login')
              }
              }else{
                this.props.navigation.navigate('Login')
            }
        },3000)
        
    }
    
  render() {
  return (
    <NativeBaseProvider>
      <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
    </NativeBaseProvider>
  );
}
}