import React, { Component} from 'react'
import { View, Image, Alert, TouchableOpacity } from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';



import api from '../api/api';
import globalStyles from '../styles/global';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FontAwesome } from '@expo/vector-icons';




export default class Login extends Component {
  constructor(props){
		super(props);
		this.state={
			email : '',
			password : '',
			refreshing: false,
      isPasswordHide: true
      
		}
	}

	//If user is login then the first page would be Calendar
	async componentDidMount(){
		let validationLogin = await AsyncStorage.getItem('userLogin')
		if(validationLogin){
			validationLogin = JSON.parse(validationLogin)
			if(validationLogin.perm){
				this.props.navigation.navigate('Calemdar')
			}else{
				this.props.navigation.navigate('Login')
			}
		}
		
	}

	register = () => {

		this.props.navigation.navigate('CrearCuenta')
	}

  forgot = () => {

		this.props.navigation.navigate('RecoverPassword')
	}

	navegar = async (param) => {
    if (this.state.email == '' || this.state.password == '') {
      Alert.alert('All fields are required') 
    }else {
      if(param=="load"){
        let valLog = await api.valLog(this.state.email,this.state.password)
        if (valLog.status==1){
          let userLogin = {
            email : this.state.email,
            perm : true
          }
          AsyncStorage.setItem('userLogin',JSON.stringify(userLogin))
          this.props.navigation.navigate(param)
          console.log(userLogin)
        }else{
          Alert.alert('Seems like user or password are incorrect')
        }
      }else{
        this.props.navigation.navigate(param)
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
  render() {
  return (
    
    <NativeBaseProvider>      
      <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
        <ScrollView>
        
          <View style={globalStyles.viewbannerLogin}>
          
            <Image 
              style={ globalStyles.banner}
              resizeMode="cover"
              source={require('../assets/homebor-banner.2-4.png')}
            />
           
          </View>
         

          <View style={globalStyles.viewLogoLogin}>
        
            
            <Image 
              style={globalStyles.homebor }
              source={require('../assets/homebor1900.png')}
              />
          </View>
         

          <View style={ globalStyles.contenidoLogin } >
          <FormControl>

        <Stack >
          <Stack inlineLabel last style={globalStyles.input}>
            <Input
                style={globalStyles.inputLogin}
                size="xl"
                variant="underlined"
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}
              />
          </Stack>
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
                value={this.state.password}
                secureTextEntry={this.state.isPasswordHide}
              />
          </Stack>
          <Text 
                  onPress={ this.forgot }
                  style={globalStyles.createaccountForgotPassword}>Forgot Password?</Text>
        </Stack>
      </FormControl>

      <Button
                  bordered
                  success
                  square
                  block
                  style={globalStyles.boton}
                  onPress={() => this.navegar('load')}

                >
                  <Text
                    style={globalStyles.botonTexto}
                  > Login </Text>
                </Button>

                <Text 
                  onPress={ this.register }
                  style={globalStyles.createaccount}> Create Account </Text>


                
                  
                
          </View>
        </ScrollView>
        
      </KeyboardAwareScrollView>
      
    
    </NativeBaseProvider>
   
  );
}
}