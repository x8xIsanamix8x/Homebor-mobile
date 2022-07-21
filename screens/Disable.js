import React, {Component, useState} from 'react'; 
import { View, ScrollView, KeyboardAvoidingView, Image, RefreshControl, Alert, Dimensions } from 'react-native';
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Icon, Heading, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import NetInfo from "@react-native-community/netinfo";

export default class Disable extends Component {
    NetInfoSubscription = null;

    constructor(props){
		super(props);
		this.state = {
		  //Variables
		  email : '',
		  perm : false,
		  info : [],
          refreshing: false,

          //Internet Connection
          connection_status: false,
          connection_refreshStatus: false,
          clockrun : false,

          //LoadingFirstTime
          readyDisplay : false
		}
	  }
	
	  async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange )

		//Get users data
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		
        if(this.state.connection_status == true) {
		//Get user profile data
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false, connection_refreshStatus: false, idm: profile.data[0].id_m })
        this.setState({readyDisplay : true})
        } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }
        
		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		});
	  }

	  //Function to prepare the refresh on screen when pull up
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

		//Function to refresh the screen
        refresh = async() => {
			if(this.state.connection_status == true) {
                //Get user profile data
                let profile = await api.getProfile(this.state.email,this.state.perm)
                this.setState({ info : profile.data, loading : false, connection_refreshStatus: false, idm: profile.data[0].id_m })
                this.setState({readyDisplay : true})
            } else {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            }
          }
		
		//Function to disable user account
		disable = async () => {
			//If user don't submit the required files, this message will appear on screen
			if (!this.state.id || !this.state.reason) {
				Alert.alert("All fields are required to disable disable a user")
			}else{
			//Function to update the database to disable user account
			console.log(this.state.id,this.state.email,this.state.idm,this.state.reason)
			api.disableUser(this.state.id,this.state.email,this.state.idm,this.state.reason)
			this.props.navigation.navigate('Logout')
			}
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

          tryAgainNotConnection = () => {
            this.setState({clockrun : true})
            this.Clock()
          }
        
          componentWillUnmount(){
            this.NetInfoSubscription && this.NetInfoSubscription()
            clearTimeout(this.timerHandle)
            this.timerHandle = 0;
          }

  render() {
    
  return (
    <NativeBaseProvider>
        <View>
        {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
            <Center w="100%">
                
                    <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                        borderColor: "coolGray.500"
                        }} _light={{
                        borderColor: "coolGray.200"
                        }}>
                        <View style={globalStyles.skeletonMarginProfileText}>
                            <HStack space="2" alignItems="center">
                                <Skeleton size="5" rounded="full" />
                                <Skeleton h="3" flex="2" rounded="full" />
                            </HStack>
                        </View>
                        <Skeleton.Text px="5" />
                        <Skeleton.Text px="5" my="4" />
                        <Skeleton.Text px="5" my="4" />
                        <Skeleton.Text px="5" my="4" />
                        {Dimensions.get('window').width >= 414 && (
                            <View>
                                <Skeleton.Text px="5" my="4" />
                                <Skeleton.Text px="5" my="4" />
                            </View>
                            
                            
                        )}

                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                    </VStack>        
            </Center>
        </View>
        )}
        {this.state.readyDisplay == true && (
            <View>
            {this.state.connection_refreshStatus != false && (
                <View>
                    {this.state.refreshing == true && (
                        <View style={globalStyles.spinnerRefreshInternet}>
                            <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
                        </View>
                    )}
                    <Slide in={!this.state.clockrun ? false : true} placement="top">
                        {this.state.connection_status ?
                        <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
                        <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2}  justifyContent="center">
                            <Text color="emerald.600" fontWeight="medium">
                            <Text>You are connected</Text>
                            </Text>
                        </HStack>
                        </VStack>
                        </AlertNativeBase>
                        :
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
                        }
                    </Slide>

                    <View style={globalStyles.WelcomeImageMargin}>

                        <Image
                                                                                        
                            resizeMode="cover"
                            source={require('../assets/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet}
                        ></Image>

                    </View>

                    <View style={globalStyles.WelcomeTextandBoton}>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                    </View>

                    {this.state.connection_status ?
                        <View>
                            <Text onPress={this.onRefresh} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
                    : 
                        <View>
                            <Text onPress={this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
                    }

                </View>
                    )}

            {this.state.connection_refreshStatus == false && (
                <View>
                    <FlatList
                        data={this.state.info}
                        extraData={this.state.info}
                        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                        keyExtractor={item => `${item.info}`}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                            enabled={true}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            tintColor="purple"
                            colors={["purple","purple"]}
                        />
                        }
                        renderItem={({item}) => (
                            <View>
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

                                <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
                                    <ScrollView nestedScrollEnabled={true} >
                                        

                                        {/*Warning*/}
                                        <Heading size='xl' style={ globalStyles.disablebold2}> You are about to disable this account</Heading>
                                            <View style={globalStyles.messageDisable}>
                                                <View style={globalStyles.disablewarningView}>
                                                    <Text style={ globalStyles.disablewarning}>Once a propertie is disable the user will not login in Homebor until his user has been reactivated again. its files, all Information and events will be not removing of the data.{"\n"}</Text>
                                                </View>
                                            </View>

                                        {/*Fields*/}
                                            <View style={globalStyles.messageDisable2}>
                                                <Text style={ globalStyles.disablebold}>All Fields Required{"\n"}</Text>
                                            </View>

                                            <View style={globalStyles.contenido}>
                                                <View style={globalStyles.disableMargins}>

                                            {item.id_home == "NULL"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    
                                                                    <Text style={ globalStyles.disablewarning}>Please type the following to confirm: <Text style={ globalStyles.disablebold}>{item.id_home}</Text></Text>
                                                            }
                                            
                                                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} enabled style={ globalStyles.contenedor }>
                                                    <FormControl>
                                                        <Stack >
                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                <Input
                                                                                onChangeText={(id) => this.setState({id})}
                                                                                placeholder='ID'
                                                                                style={ globalStyles.inputedit}
                                                                            />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.hideContents}>
                                                                <Input 
                                                                                defaultValue={item.mail_h}
                                                                                onChangeText={ (email) => this.setState({email}) }
                                                                                style={ globalStyles.inputedit}
                                                                                />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.hideContents}>
                                                                <Input
                                                                                defaultValue={item.id_m}
                                                                                onChangeText={ (idm) => this.setState({idm}) }
                                                                                style={ globalStyles.inputedit}
                                                                                />
                                                            </Stack>

                                                            <Text style={ globalStyles.disablewarning}>Reason :</Text>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                                        placeholder='Tell us why'
                                                                                        onChangeText={(reason) => this.setState({reason})}
                                                                                        style={ globalStyles.inputedit}
                                                                                    />
                                                            </Stack>
                                                        </Stack>
                                                    </FormControl>

                                                    {this.state.connection_status ? <View>
                                                        <Button
                                                            bordered
                                                            success
                                                            square
                                                            block
                                                            style={globalStyles.boton}
                                                            onPress={this.disable}>
                                                                <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='user' style={globalStyles.botonTextoDisable}> Disable</Icon></Text>
                                                        </Button>

                                                    </View> : <View>
                                                        <Button
                                                            bordered
                                                            success
                                                            square
                                                            block
                                                            style={globalStyles.boton}
                                                            onPress={() => this.noInternetConnection()}>
                                                                <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='user' style={globalStyles.botonTextoDisable}> Disable</Icon></Text>
                                                        </Button>
                                                    </View> }

                                                    
                                                </KeyboardAvoidingView>
                                                </View>
                                            </View>
                                    </ScrollView>
                                    </KeyboardAwareScrollView>

                            
                            </View>
                        )}> 
                    </FlatList>
                </View>)}
                </View>)}
            </View>
    </NativeBaseProvider>
  );
}
}