import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, Alert, RefreshControl, Dimensions } from 'react-native'
import { NativeBaseProvider, Heading, Text, Spinner, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';


import globalStyles from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";


export default class Notification extends Component {
    NetInfoSubscription = null;

    constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
          refreshing: false,

          report1 : -1,
          reports1 : 0,

          //Internet Connection
          connection_status: false,
          connection_refreshStatus: false,
          clockrun : false,

          //LoadingFirstTime
          readyDisplay : false
		}
	  }

	  async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange)

		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        if(this.state.connection_status == true) {
            let notifications = await api.getNotifications(this.state.email,this.state.perm)
            this.setState({ info : notifications, loading : false, connection_refreshStatus: false, readyDisplay : true})
        } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onActive()
			this.onRefresh()
		  });
         
        this._onFocusListener = this.props.navigation.addListener('blur', () => {
            this.onRelease()
        });
			
	  }

      async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1) {
            if(this.state.connection_status == true){
                if (prevState.info !== this.state.info) {
                    let notifications = await api.getNotifications(this.state.email,this.state.perm)
                    this.setState({ info : notifications, readyDisplay : true })
                }
            }
        }
      }

      onActive = () => { this.setState({ report1 : -1, reports1 : 0 })}
        
      onRelease = () => { this.setState({ report1 : 0, reports1 : 0 });}

	  
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        refresh = async() => {
            if(this.state.connection_status == true) {
                let notifications = await api.getNotifications(this.state.email,this.state.perm)
                this.setState({ info : notifications, loading : false, connection_refreshStatus: false, readyDisplay : true})
            } else {
                this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
            }
          }

		  edit = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

            if (this.state.connection_status) {
                this.props.navigation.navigate('Studentnot')
            } else {
                Alert.alert('There is no internet connection, connect and try again.')
            }
		}

		edit2  = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

            if (this.state.connection_status) {
                this.props.navigation.navigate('Studentinfo')
            } else {
                Alert.alert('There is no internet connection, connect and try again.')
            }
			
		}

		report = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

			api.markviewNotification(this.state.idnoti)

            if (this.state.connection_status) {
                this.props.navigation.navigate('Reports')
            } else {
                Alert.alert('There is no internet connection, connect and try again.')
            }
			
		}

		report2 = async () => {
			let idnoti = await AsyncStorage.getItem('idnoti')
			idnoti = JSON.parse(idnoti)
			this.setState({ idnoti : idnoti})

            if (this.state.connection_status) {
                this.props.navigation.navigate('Reports')
            } else {
                Alert.alert('There is no internet connection, connect and try again.')
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
        {this.state.readyDisplay == false && (
            <View>
                <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                        }} _light={{
                        borderColor: "coolGray.200"
                        }} p="4">
                            <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                <Center>
                                    <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                                </Center>
                            </VStack>
                        </HStack>
                    </Center>
                </View>

                <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                        }} _light={{
                        borderColor: "coolGray.200"
                        }} p="4">
                            {Dimensions.get('window').width >= 414 ?
                                
                                <Skeleton flex="1" h="100" mt="10" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                                :

                                <Skeleton flex="1" h="70" mt="10" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                            }      
                            <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                <Skeleton.Text />
                                <HStack space="2" alignItems="center">
                                    <Skeleton size="5" rounded="full" />
                                    <Skeleton h="3" flex="2" rounded="full" />
                                    <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                </HStack>
                            </VStack>
                        </HStack>
                    </Center>
                </View>

                <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                        }} _light={{
                        borderColor: "coolGray.200"
                        }} p="4">
                            <VStack flex="3" space="4">
                                <Skeleton startColor="indigo.300" />
                                <Center>
                                    <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                                </Center>
                            </VStack>
                        </HStack>
                    </Center>
                </View>

                {Dimensions.get('window').width >= 414 &&(
                    <View>
                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                                borderColor: "coolGray.500"
                                }} _light={{
                                borderColor: "coolGray.200"
                                }} p="4">
                                    <VStack flex="3" space="4">
                                        <Skeleton startColor="indigo.300" />
                                        <Center>
                                            <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                                        </Center>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>

                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                                borderColor: "coolGray.500"
                                }} _light={{
                                borderColor: "coolGray.200"
                                }} p="4">
                                    <VStack flex="3" space="4">
                                        <Skeleton startColor="indigo.300" />
                                        <Center>
                                            <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                                        </Center>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>

                    </View>
                )}
            </View>
            )}
        {this.state.readyDisplay == true && (
            <View>
                <StatusBar style="light" translucent={true} />
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
                    <View style={globalStyles.container}>
                        <ImageBackground source={require('../assets/img/backgroundNotification.png')} style={globalStyles.ImageBackgroundNoti}>
                            <View>
                                    <View>
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
                                                        <ScrollView nestedScrollEnabled={true}>
                                                            {!item.notification ? <View><Card><Text style={globalStyles.NotiDont}>You don't have notification request</Text></Card></View> : item.notification.map((notification) => 
                                                                        <View key={notification.id} style={globalStyles.NotificationMarginBottom} >

                                                                            {/*Student Request new Notification */}
                                                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title != 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit(
                                                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    
                                                                                        <ImageBackground source={require('../assets/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                        <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                        <Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
                                                                                                        <Text style={globalStyles.textreporttitle}> wants to reserve</Text> 
                                                                                                        <Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Card>
                                                                                                            <View style={globalStyles.inlineData}>
                                                                                                                <Text style={globalStyles.infosubtitle}>Arriving Date: </Text> 
                                                                                                                <Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text>
                                                                                                            </View>
                                                                                                            <View style={globalStyles.inlineData}>
                                                                                                                <Text style={globalStyles.infosubtitle}>Leaving Date: </Text> 
                                                                                                                <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text>
                                                                                                            </View>
                                                                                                            <View style={globalStyles.inlineData}>
                                                                                                                <Text style={globalStyles.infosubtitle}>From: </Text> 
                                                                                                                <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.agency}</Text>
                                                                                                            </View>
                                                                                                    </Card>
                                                                                                </View>
                                                                                                <Image
                                                                                                
                                                                                                    resizeMode="cover"
                                                                                                    source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                    style={ globalStyles.imageNoti }
                                                                                                ></Image>
                                                                                            
                                                                                        </ImageBackground>
                                                                                        
                                                                                    
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            
                                                                            {/*Report new Notification */}
                                                                            <View style={notification.confirmed == 0 && notification.report_s != 'NULL' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id} onPress={ () =>this.report(
                                                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                        <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                            
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*Student Request old Notification */}
                                                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s == 'NULL' && notification.title != 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineData}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
                                                                                                        <Text style={globalStyles.textreporttitle}> was accepted to</Text> 
                                                                                                        <Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Card>
                                                                                                        <View style={globalStyles.inlineData}>
                                                                                                            <Text style={globalStyles.infosubtitle}>Arriving Date: </Text> 
                                                                                                            <Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text>
                                                                                                        </View>
                                                                                                        <View style={globalStyles.inlineData}>
                                                                                                            <Text style={globalStyles.infosubtitle}>Leaving Date: </Text> 
                                                                                                            <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text>
                                                                                                        </View>
                                                                                                        <View style={globalStyles.inlineData}>
                                                                                                            <Text style={globalStyles.infosubtitle}>From: </Text> 
                                                                                                            <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.agency}</Text>
                                                                                                        </View>
                                                                                                    </Card>
                                                                                                </View>
                                                                                                <Image
                                                                                                    source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                    resizeMode="cover"
                                                                                                    style={ globalStyles.imageNoti }
                                                                                                ></Image>
                                                                                        
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                                    
                                                                            {/*Report old Notification */}
                                                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} onPress={ () =>this.report2(
                                                                                    this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                            
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*3 weeks new student reminder*/}
                                                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3w' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                            
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                            
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*3 weeks student old reminder*/}
                                                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3w' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                        
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*15th day new student reminder*/}
                                                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 15d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                        
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*15th day student old reminder*/}
                                                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                            
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*3 day new student reminder*/}
                                                                            <View style={notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                        
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            {/*3 day student old reminder*/}
                                                                            <View style={notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && notification.title == 'Student Arrival 3d' ? globalStyles.show : globalStyles.hideContents}>
                                                                                <TouchableOpacity key={notification.id_s} > 
                                                                                        <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineNotification}>
                                                                                                    <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                        <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> </Text>
                                                                                                        <Text style={globalStyles.textreporttitle}>reminds you that {notification.des}, will arrive on {notification.start}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                                <View style={globalStyles.notiDate}>
                                                                                                    <Image
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                        resizeMode="cover"
                                                                                                        style={ globalStyles.imageNoti2 }
                                                                                                    ></Image>
                                                                                                </View>
                                                                                        
                                                                                        </ImageBackground>
                                                                                </TouchableOpacity>
                                                                            </View>

                                                                            

                                                                            {/*Student Rejected */}
                                                                            <View style={notification.confirmed != 0 && notification.status == 'Rejected' ? globalStyles.show : globalStyles.hideContents}>
                                                                                    <ImageBackground source={require('../assets/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                    
                                                                                            <Card>
                                                                                                <View style={globalStyles.inlineNotification}>
                                                                                                <MaterialIcons name="notifications" size={18} color="black" />
                                                                                                    <Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text> 
                                                                                                    <Text style={globalStyles.textreporttitle}> was rejected from</Text> 
                                                                                                    <Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text>
                                                                                                </View>
                                                                                            </Card>
                                                                                            <View style={globalStyles.notiDate}>
                                                                                                <Card>
                                                                                                    <View style={globalStyles.inlineData}>
                                                                                                        <Text style={globalStyles.infosubtitle}>Arriving Date:</Text> 
                                                                                                        <Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text>
                                                                                                    </View>
                                                                                                    <View style={globalStyles.inlineData}>
                                                                                                        <Text style={globalStyles.infosubtitle}>Leaving Date:</Text> 
                                                                                                        <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text>
                                                                                                    </View>
                                                                                                    <View style={globalStyles.inlineData}>
                                                                                                        <Text style={globalStyles.infosubtitle}>From:</Text> 
                                                                                                        <Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.agency}</Text>
                                                                                                    </View>
                                                                                                </Card>
                                                                                            </View>
                                                                                            <Image
                                                                                                source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                resizeMode="cover"
                                                                                                style={ globalStyles.imageNoti }
                                                                                            ></Image>
                                                                                    
                                                                                    </ImageBackground>
                                                                            </View>

                                                                        </View>

                                                                        
                                                            )} 
                                                                    

                                                        </ScrollView>
                                                        
                                                            

                                                )}> 
                                            </FlatList>
                                        </View>
                                    
                                    
                                    </View>
                        </ImageBackground>
                    </View>
                    )}
                </View>)}
    </NativeBaseProvider>
    
  );
}
}