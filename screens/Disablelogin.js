import React, { Component} from 'react'
import { View, Alert } from 'react-native'
import { NativeBaseProvider, Text, Button, Heading, Icon, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';
import api from '../api/api';

import { FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../components/context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import NetInfo from "@react-native-community/netinfo";

export default class Disablelogin extends Component{
  static contextType = AuthContext 
  NetInfoSubscription = null;

	constructor(props){ 
		super(props); 
			this.state = { 
				name : '', 
				lastname : '', 
				email : '', 
				password : '',
				isPasswordHide: true, 
				id_m : 'NULL',
				terms : 'no',

				requiredFields : false,

                //Internet Connection
                connection_status: false,
                clockrun : false,
			} 
	}
	
	async componentDidMount(){
		this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange,)

        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
        console.log(userLogin)
	}

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    Clock = () => {
        this.timerHandle = setTimeout (() => {
        this.setState({clockrun : false});
        this.timerHandle = 0;
        }, 5000)
    }


    noInternetConnection = () => {
        Alert.alert('There is no internet connection, connect and try again.')
    }

    logout = async () => {
        await AsyncStorage.removeItem('userLogin')
        console.log(this.state.email)
        this.context.signOut() 
    }

    reactivateUser = async() => {
        let reactiveUserAccount = await api.reactiveUserAccount(this.state.email)
        console.log(reactiveUserAccount)
        if (reactiveUserAccount.status== 1){
            let userLogin = {
                email : this.state.email.toLowerCase(),
                perm : this.state.perm,
                disableUser: false,
            }
            AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
            this.context.signIn()
        }else{
            Alert.alert('It seems like there was an error, try again.')
        }
    }

    async componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;
    }

  render(){

  return (
    <NativeBaseProvider>
      
		<StatusBar style="light" translucent={true} />

        <Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
            <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2}  justifyContent="center">
                        <Text color="error.600" fontWeight="medium">
                            <AlertNativeBase.Icon />
                            <Text> No Internet Connection</Text>
                        </Text>
                    </HStack>
                </VStack>
            </AlertNativeBase>
        </Slide>

        
		<ScrollView nestedScrollEnabled={true} >
        
        <View style={{marginTop: '40%', marginLeft: '5%', marginRight: '5%'}}>
            <View >
                <Heading style={ globalStyles.tituloCongratulations2 }>Your user is in process to be delete</Heading>
            </View>


            <View >
                <Heading style={ globalStyles.tituloCongratulations }>Do you want to go out of this delete list and go to the app?</Heading>
            </View>
        </View>

        {this.state.connection_status ? <View>

              <Button
                    success
                    bordered
                    onPress={this.reactivateUser}
                    style={globalStyles.botonCongratulations}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    ><Icon as={FontAwesome} name='calendar' size={5} style={globalStyles.botonTextoDisable}></Icon> Yes</Text>
            </Button>
            </View> : <View>
            <Button
                    success
                    bordered
                    onPress={() => this.noInternetConnection()}
                    style={globalStyles.botonCongratulations}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    ><Icon as={FontAwesome} name='calendar' size={5} style={globalStyles.botonTextoDisable}></Icon> Yes</Text>
            </Button>
            </View>
            }

            {this.state.connection_status ? <View>
            
              <Button
                    variant="outline"
                    onPress={this.logout}
                    style={globalStyles.botonCongratulations3}
                    >

                    <Text
                            style={globalStyles.botonTextoBlack}
                            
                    > No <Icon as={FontAwesome} name='sign-out' style={globalStyles.botonTextoIconBlack}></Icon></Text>
              </Button>

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonCongratulations3}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > No <Icon as={FontAwesome} name='sign-out' style={globalStyles.botonTextoIconBlack}></Icon></Text>
              </Button> 

            </View>

        }
				 
	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}