import React, {Component} from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Spinner } from 'native-base';
import globalStyles from '../styles/global';

export default class Loading extends Component {
    componentDidMount(){
        setTimeout( async() => {
            let validationLogin = await AsyncStorage.getItem('userLogin')
            if(validationLogin){
                validationLogin = JSON.parse(validationLogin)
                if(validationLogin.perm){
                    console.log(validationLogin)
                this.props.navigation.navigate('Calemdar')
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