import React, { Component} from 'react';
import { View, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Box, AspectRatio, Center, Heading } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

import api from '../api/api';
import globalStyles from '../styles/global';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../components/context';

import NetInfo from "@react-native-community/netinfo";

export default class Login extends Component {

  NetInfoSubscription = null;

  static contextType = AuthContext 

  constructor(props){
    super(props);
    this.state={
        email : '',
        password : '',
        refreshing: false,
        isPasswordHide: true,

        requiredFields : false,
        connection_status: false,
        clockrun : false,

        //Fields
        requiredFields : false,
    }
  }

  //If user is login then the first page would be Calendar
  async componentDidMount(){
  this.NetInfoSubscription = NetInfo.addEventListener(
    this._handleConnectivityChange,
  )
  
      let validationLogin = await AsyncStorage.getItem('userLogin')
      if(validationLogin){
          validationLogin = JSON.parse(validationLogin)
          if(validationLogin.perm){
              this.context.signIn()
          }else{
              this.props.navigation.navigate('Login')
          }
      }
      
  }

  _handleConnectivityChange = (state) => {
    this.setState({ connection_status: state.isConnected, clockrun : true });
    this.Clock()
  }

  Clock = () => {
    this.timerHandle = setTimeout (() => {
      this.ClockrunStop()
      this.timerHandle = 0;
    }, 5000)
  }

  ClockrunStop = () => {
    this.setState({clockrun : false});
  }

  componentWillUnmount(){
    this.NetInfoSubscription && this.NetInfoSubscription()
    clearTimeout(this.timerHandle)
    this.timerHandle = 0;
  }

  register = () => {
    this.props.navigation.navigate('CrearCuenta')
  }

  forgot = () => {
    this.props.navigation.navigate('RecoverPassword')
  }

  orderNowHandler = async () => {
    if (this.state.email == '' || this.state.password == '') {
      this.setState({requiredFields : true})
      Alert.alert('All fields are required') 
    }else {
      let Login = await api.Login(this.state.email,this.state.password)
      if (Login.status==1){
        let userLogin = {
          email : this.state.email.toLowerCase(),
          perm : true,
          disableUser: false,
        }

        AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
        this.context.signIn() // consume the context values or functions

      }else{
        let valLog = await api.valLog(this.state.email,this.state.password)
        if (valLog.status==1){
        let userLogin = {
          email : this.state.email.toLowerCase(),
          perm : true,
          disableUser: true,
        }

        AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
        this.context.signDisable()

        }else {
          Alert.alert('Seems like user or password are incorrect')
        }
      }
    }
  }

  onChangeText = text => {
    this.setState({
      password: text
    });
  };

  changePasswordVisibility = () => {
    this.setState({
      isPasswordHide: !this.state.isPasswordHide
    });
  };

  noInternetConnection = () => {
    Alert.alert('There is no internet connection, connect and try again.')
  }

  render() {
    return (
      <NativeBaseProvider>
        <StatusBar style="dark" translucent={true} />
          <Stack maxH={Dimensions.get('window').height}>

            <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>


              <Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
                <AlertNativeBase style={{marginTop: '12%', marginLeft: '10%', marginRight: '10%'}}  justifyContent="center" status="error">
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


              <ScrollView>
                
              <View style={globalStyles.viewbannerLogin}>
          
                  <Image 
                    style={ globalStyles.banner}
                    resizeMode="contain"
                    source={require('../assets/img/login/homebor-banner.2-7_.png')}
                  />
                
                </View>
              

                  <View style={ globalStyles.contenidoLogin }>
                  <FormControl>

                    <Stack >
                      <FormControl isInvalid={this.state.requiredFields == true && this.state.email == '' && true}>
                        <Stack inlineLabel last style={globalStyles.input}>
                          <Input
                              style={globalStyles.inputLogin}
                              size="xl"
                              variant="underlined"
                              placeholder="Email"
                              placeholderTextColor={this.state.requiredFields == true ? "#D81606" : "#979797"}
                              onChangeText={(email) => this.setState({email})}
                            />
                        </Stack>
                        <FormControl.ErrorMessage style={globalStyles.errormessageEmailLogin}>
                                  This field is required and is empty.
                        </FormControl.ErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={this.state.requiredFields == true && this.state.password == '' && true}>
                        <Stack inlineLabel last style={globalStyles.input}>
                            <Input
                              style={
                                this.state.isPasswordHide
                                ? globalStyles.inputLogin
                                : [{ color: "#000"}]
                              }
                              InputRightElement={
                                <TouchableOpacity
                                style={globalStyles.ReportFeedbackLLogin}
                                onPress={()=>this.changePasswordVisibility()}>
                                  {this.state.isPasswordHide ?  <Icon as={FontAwesome} name="eye" size="8" style={globalStyles.ReportFeedbackIcons} /> :  <Icon as={FontAwesome} name="eye-slash" size="8" style={globalStyles.ReportFeedbackIcons} />}
                                </TouchableOpacity>
                                }
                              size="xl"
                              variant="underlined"
                              onChangeText={this.onChangeText}
                              placeholder="Password"
                              placeholderTextColor={this.state.requiredFields == true ? "#D81606" : "#979797"}
                              value={this.state.password}
                              secureTextEntry={this.state.isPasswordHide}
                            />
                        </Stack>
                        <FormControl.ErrorMessage style={globalStyles.errormessagePasswordLogin}>
                                  This field is required and is empty.
                        </FormControl.ErrorMessage>
                      </FormControl>
                      <Text 
                              onPress={ this.forgot }
                              style={globalStyles.createaccountForgotPassword}>Forgot Password?</Text>
                    </Stack>

                  </FormControl>

                  <View>
                    <Button
                      bordered
                      success
                      square
                      block
                      style={globalStyles.boton}
                      onPress={this.state.connection_status ? this.orderNowHandler : this.noInternetConnection}>
                          <Text style={globalStyles.botonTexto}> Login </Text>
                    </Button>
                  </View>

                  <Text onPress={ this.register } style={globalStyles.createaccount}> Create Account </Text>

                  </View>

              </ScrollView>
            </KeyboardAwareScrollView>
          </Stack>
      </NativeBaseProvider>
    )
  }
}