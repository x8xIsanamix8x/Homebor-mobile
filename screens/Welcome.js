import React, { Component} from 'react'
import { View, Alert, Image } from 'react-native'
import { NativeBaseProvider, Text, Button, Heading, Box, Icon, Progress, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import globalStyles from '../styles/global';

import { FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../components/context';

import NetInfo from "@react-native-community/netinfo";

export class Welcome extends Component{
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

  Welcomebutton = () => {
    this.props.navigation.navigate('Requiredfields')
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

		<ScrollView nestedScrollEnabled={true} >

        <View style={globalStyles.WelcomeImageMargin}>
		
            <Image
                                                                            
                resizeMode="cover"
                source={require('../assets/img/onboarding/welcome.png')}
                style={globalStyles.imageWelcome}
            ></Image>

        </View>

        <View style={globalStyles.WelcomeTextandBoton}>
            <Heading size='xl'style={ globalStyles.tituloWelcome }>Welcome to Homebor, tell us about you.</Heading>

            <View style={globalStyles.TellusProgress}>
              <Progress size="xl" colorScheme="emerald" value={15}>15%</Progress>
            </View>
        </View>

        {this.state.connection_status ? <View>
            
            <Button
                    success
                    bordered
                    onPress={this.Welcomebutton}
                    style={globalStyles.botonWelcome}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
            </Button> 

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonWelcome}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View>

        }

	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}

export class Welcome2 extends Component{
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

  YourLocationbutton = () => {
    this.props.navigation.navigate('Location')
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

		<ScrollView nestedScrollEnabled={true} >

        <View style={globalStyles.WelcomeImageMargin}>
		
            <Image
                                                                            
                resizeMode="cover"
                source={require('../assets/img/onboarding/YourLocation.png')}
                style={globalStyles.imageTellus}
            ></Image>

        </View>

        <View style={globalStyles.TellusTextandBoton}>
            
            <Heading size='xl' style={ globalStyles.tituloWelcome }>Tell us about your location and your preference.</Heading>
            <View style={globalStyles.TellusProgress}>
              <Progress size="xl" colorScheme="emerald" value={30}>30%</Progress>
            </View>
        </View>  

          {this.state.connection_status ? <View>
            
            <Button
                    success
                    bordered
                    onPress={this.YourLocationbutton}
                    style={globalStyles.botonWelcome}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
            </Button>

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonWelcome}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View>

        } 
        
	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}

export class Welcome3 extends Component{
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

  YourRoombutton = () => {
    this.props.navigation.navigate('Roomregister')
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

		<ScrollView nestedScrollEnabled={true} >

        <View style={globalStyles.WelcomeImageMargin}>
		
            <Image
                                                                            
                resizeMode="cover"
                source={require('../assets/img/onboarding/Yourroom.png')}
                style={globalStyles.imageYourroom}
            ></Image>

        </View>

        <View style={globalStyles.YourroomTextandBoton}>
            
            <Heading size='xl' style={ globalStyles.tituloWelcome }>Describe the student rooms.</Heading>
            <View style={globalStyles.TellusProgress}>
              <Progress size="xl" colorScheme="emerald" value={45}>45%</Progress>
            </View>
        </View>    

          {this.state.connection_status ? <View>
            
            <Button
                    success
                    bordered
                    onPress={this.YourRoombutton}
                    style={globalStyles.botonWelcome}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
            </Button>

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonWelcome}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View>

        } 
        
	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}

export class Welcome4 extends Component{
  NetInfoSubscription = null;
  static contextType = AuthContext 

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

  Congratulationsbutton = () => {
    this.context.signIn()
  }

  Continuebutton = () => {
    this.props.navigation.navigate('Galleryhouse')
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

		<ScrollView nestedScrollEnabled={true} >

        <View style={globalStyles.CongratulationsTextUp}>
            <Heading style={ globalStyles.tituloCongratulations2 }>Congratulations! You have the minimum requirements.</Heading>
        </View>

        <View style={globalStyles.WelcomeImageMargin}>
		
            <Image
                                                                            
                resizeMode="cover"
                source={require('../assets/img/onboarding/congratulations.png')}
                style={globalStyles.imageCongratulations}
            ></Image>

        </View>

        <View style={globalStyles.CongratulationsTextandBoton}>
            <Heading style={ globalStyles.tituloCongratulations }>You can continue filling in more details of your profile or go to manage your homestay.</Heading>
            <View style={globalStyles.TellusProgress}>
              <Progress size="xl" colorScheme="emerald" value={60}>60%</Progress>
            </View>
        </View>

        {this.state.connection_status ? <View>

              <Button
                    success
                    bordered
                    onPress={this.Congratulationsbutton}
                    style={globalStyles.botonCongratulations}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    ><Icon as={FontAwesome} name='calendar' size={5} style={globalStyles.botonTextoDisable}></Icon> Go to App</Text>
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
                            
                    ><Icon as={FontAwesome} name='calendar' size={5} style={globalStyles.botonTextoDisable}></Icon> Go to App</Text>
            </Button>
            </View>
            }

            {this.state.connection_status ? <View>
            
              <Button
                    variant="outline"
                    onPress={this.Continuebutton}
                    style={globalStyles.botonCongratulations2}
                    >

                    <Text
                            style={globalStyles.botonTextoBlack}
                            
                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoIconBlack}></Icon></Text>
              </Button>

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonWelcome}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View>

        }
				 
	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}

export class Welcome5 extends Component{
  NetInfoSubscription = null;
  static contextType = AuthContext 

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

  Endbutton = () => {
    this.context.signIn()
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

		<ScrollView nestedScrollEnabled={true} >

        <View style={globalStyles.WelcomeImageMargin}>
		
            <Image
                                                                            
                resizeMode="cover"
                source={require('../assets/img/onboarding/endregister.png')}
                style={globalStyles.imageEndregister}
            ></Image>

        </View>

        <View style={globalStyles.YourroomTextandBoton}>
            
            <Heading size='xl' style={ globalStyles.tituloWelcome }>Congratulations! You have completed your registration.</Heading>
            <View style={globalStyles.TellusProgress}>
              <Progress size="xl" colorScheme="emerald" value={100}>100%</Progress>
            </View>
        </View>

            {this.state.connection_status ? <View>
            
              <Button
                    success
                    bordered
                    onPress={this.Endbutton}
                    style={globalStyles.botonWelcome}
                    >

                    <Text
                            style={globalStyles.botonTexto}
                            
                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View> : <View>

              <Button
                      success
                      bordered
                      onPress={() => this.noInternetConnection()}
                      style={globalStyles.botonWelcome}
                      >

                      <Text
                              style={globalStyles.botonTexto}
                              
                      > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
              </Button> 

            </View>

        }	 

	  </ScrollView>
	 
    </NativeBaseProvider>
  );
}
}