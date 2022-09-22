import React, {Component, useState} from 'react'; 
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Spinner} from 'native-base'
import globalStyles from '../styles/global';
import * as Notificationapp from 'expo-notifications'
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../components/context';

export default class Logout extends Component {
  static contextType = AuthContext 

  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,
      info : [],
      loading : true,
      refreshing: false,
    }
    }

    async componentDidMount(){
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        this.setState({ numnoti: 0 }, () => { console.log('Nuevo NumNoti', this.state.numnoti) });
        this.setState({ notinum1: 0 }, () => { console.log('Nuevo Noti1', this.state.notinum1) });

        const token = (await Notificationapp.getDevicePushTokenAsync()).data;
        console.log(token);
        this.setState({ expoPushToken: token });

        let email = this.state.email
	      let tokenval = this.state.expoPushToken

        await fetch(`https://homebor.com/app/tokenvallapp.php?email=${email}&token=${tokenval}`, {
        method: 'POST',
        header: {
            'Content-Type': 'multipart/form-data'
        },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                this.unregisterToken()     
              }
              else {
                console.log('this token is unregistred')
              }
        });

        console.log(this.state.email)

        this.componentWillUnmount()   

        this.context.signOut() // consume the context values or functions
        }

        unregisterToken = async () => { 
          //Api of register
          let email = this.state.email
          let tokenval = this.state.expoPushToken
    
        return await fetch(`https://homebor.com/app/deltokenapp.php?email=${email}&token=${tokenval}`, {
            method: 'POST',
            header: {
              'Content-Type': 'multipart/form-data'
            },
            }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              console.log('Register Token Successfully')
              }
              else {
              console.log('Error on Register token')
              }
            });
        }
    
        async componentWillUnmount(){
            await AsyncStorage.removeItem('userLogin')
            await AsyncStorage.removeItem('idnoti')
            await AsyncStorage.removeItem('idnoti2')
        }


	render() {
    
  return (
    <NativeBaseProvider>
      <StatusBar style="light" translucent={true} />
        <View style={globalStyles.contenido}>
                <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
            </View>              
    </NativeBaseProvider>
  );
}
}