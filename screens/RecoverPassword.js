import React, { Component} from 'react';
import { View, Alert, ImageBackground, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { NativeBaseProvider, Text, Input, Stack, FormControl, Button, Heading, Box, Icon, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import globalStyles from '../styles/global';

import { FontAwesome } from '@expo/vector-icons';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NetInfo from "@react-native-community/netinfo";



export default class RecoverPassword extends Component{
    NetInfoSubscription = null;

	constructor(props){ 
		super(props); 
			this.state = { 
				email : '', 
				password : '',
				isPasswordHide: true, 
                isPasswordHide2: true, 

                status : 1,
                requiredFields : false,

                //Internet Connection
                connection_status: false,
                clockrun : false,
			} 
	}

    async componentDidMount(){
		 //Refresh when is another event
         this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});

        this.NetInfoSubscription = NetInfo.addEventListener(
            this._handleConnectivityChange,
          )
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

    onRefresh = async () => {
        this.setState({ email: '', password: '', password2: '', status: 1})
    }
	
    valEmail = async () => {
        if (this.state.email == ''){
			Alert.alert('All fields are required')
            this.setState({requiredFields : true})
		} else {
            let email = this.state.email

            return await fetch(`https://homebor.com/recoverPasswordapp.php?email=${email}`, {
					method: 'POST',
					header: {
						'Content-Type': 'multipart/form-data'
					},
				}).then(res => res.json())
					.catch(error => console.error('Error', error))
					.then(response => {
					if (response.status == 1) {
						Alert.alert(`Email sended.`)
					}
					else {
                        Alert.alert(`We sorry, this user is not registered to any user.`)
					}
					});
        }
    }


      noInternetConnection = () => {
        Alert.alert('There is no internet connection, connect and try again.')
      }

      componentWillUnmount(){
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


            <View style={globalStyles.BackgroundNoti}>
            <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>

            <ScrollView>
            <View style={globalStyles.viewCrearCuenta}>
            
            <Box style={ globalStyles.contenedor }>
            
        <View style={ globalStyles.contenidoCrearCuenta}>
        
            <View>
                <Text style={ globalStyles.ReportsTextDate}>Please enter your email and we will send you instructions on how to reset your password.</Text>
                    <FormControl style={globalStyles.formcontrolCrearCuenta} isInvalid={this.state.requiredFields == true && this.state.email == '' && true}>
                        <Stack >
                            <Stack inlineLabel last style={globalStyles.input}>
                                <Input
                                size="xl"
                                style={globalStyles.inputCrearCuenta}
                                placeholder="Email"
                                variant="underlined"
                                placeholderTextColor={this.state.requiredFields == true && "#D81606"}
                                onChangeText={ (email) => this.setState({email}) }
                                />
                            </Stack>
                        </Stack>

                        <FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
                                This field is required and is empty.
                        </FormControl.ErrorMessage>	
                    </FormControl>

            
                    {this.state.connection_status ? <View>
                    <Button 
                        success
                        bordered
                        onPress={this.valEmail}
                        style={globalStyles.botonCrearCuenta}>
                    <Text 
                    onPress={ this.valEmail }
                    style={globalStyles.createaccountButton}> Reset Password </Text>
                    </Button>
                    </View> :<View>
                        
                         <Button 
                        success
                        bordered
                        onPress={() => this.noInternetConnection()}
                        style={globalStyles.botonCrearCuenta}>
                            <Text 
                            onPress={() => this.noInternetConnection()}
                            style={globalStyles.createaccountButton}> Reset Password </Text>
                        </Button>
                    </View>
                }

            </View> 
                    

        </View>
        
        </Box>
        </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        </View>
        
        </NativeBaseProvider>
    );
    }
    }