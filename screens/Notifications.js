import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, Alert, RefreshControl, Dimensions, Platform } from 'react-native'
import { NativeBaseProvider, Heading, Text, Spinner, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Stack } from 'native-base';
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

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            perm : false,
            refreshing: false,
            marked : [],

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
            this.setState({ info : notifications, notifyUser : notifications[0].notification, loading : false, connection_refreshStatus: false, readyDisplay : true})

            this.anotherFunc();
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
                    this.anotherFunc()
                }
            }
        }
    }

    //Function to create an array to order the vouchers by dates
    anotherFunc = () => { 
        if(this.state.notifyUser != undefined){
            let nextDay2 = this.state.notifyUser
            let obj = nextDay2.reduce((acc, dt) => {
        
            const dateAcc = acc[dt.dateNoti]
                


            if (!dateAcc) {
                acc[dt.dateNoti] = {
                    notinfo: [{ 
                        agency: dt.agency, 
                        confirmed : dt.confirmed, 
                        end : dt.end,
                        id : dt.id,
                        photo : dt.photo,
                        photo_m : dt.photo_m,
                        report_s : dt.report_s,
                        room : dt.room,
                        start : dt.start,
                        status : dt.status,
                        title : dt.title,
                        user_i : dt.user_i,
                        user_i_l : dt.user_i_l,
                        des : dt.des
                    }]
                }
            } else {
                acc[dt.dateNoti].notinfo.push({ agency: dt.agency, confirmed : dt.confirmed, end : dt.end, id : dt.id, photo : dt.photo, photo_m : dt.photo_m, report_s : dt.report_s, room : dt.room, start : dt.start, status : dt.status, title : dt.title, user_i : dt.user_i, user_i_l : dt.user_i_l, des: dt.des})
            }


            return acc }, {});
            
            this.setState({ marked : obj});
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
            this.setState({ info : notifications, notifyUser : notifications[0].notification, loading : false, connection_refreshStatus: false, readyDisplay : true})

            this.anotherFunc();
        } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }
    }

    edit = async () => {
        let idnoti = await AsyncStorage.getItem('idnoti')
        idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})

        if (this.state.connection_status) {
            this.props.navigation.navigate('Studentinfo')
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
        return(
            <NativeBaseProvider>
                <StatusBar style="light" translucent={true} />
                <View>
                {this.state.readyDisplay == false && (
                    <View>
                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
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
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
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
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <VStack flex="3" space="4">
                                        <Skeleton startColor="indigo.300" />
                                        <Center>
                                            <Skeleton borderWidth={1} borderColor="coolGray.200" endColor="warmGray.50" size="20" rounded="full" mt="-2" />
                                        </Center>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>
        
                        {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                            <View>
                                <View style={globalStyles.skeletonMarginTop}>
                                    <Center w="100%">
                                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
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
                                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
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
                    {this.state.connection_refreshStatus != false && (
                        <View>

                        <Slide in={!this.state.clockrun ? false : true} placement="top">
                            {this.state.connection_status ?
                            <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
                                <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2}  justifyContent="center">
                                    <Text color="emerald.600" fontWeight="medium">You are connected</Text>
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
                            resizeMode="contain"
                            source={require('../assets/img/empty/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet} />
                        </View>

                        <View style={globalStyles.WelcomeTextandBoton}>
                            <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                            <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                        </View>

                        <View>
                            <Text onPress={this.state.connection_status ? this.onRefresh : this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
                        </View>
                    )}

                    {this.state.connection_refreshStatus == false && (
                        <View style={globalStyles.container}>
                            <ImageBackground source={require('../assets/img/backgrounds/backgroundNotification.png')} style={globalStyles.ImageBackgroundNoti}>
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
                                        renderItem={({}) => (
                                            <View>
                                               {Object.keys(this.state.marked).length == 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have notification request</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="contain" source={require('../assets/img/empty/nonotification.png')} style={globalStyles.imageNotInternet}/></View></View> : Object.keys(this.state.marked).map(date => (
                                                    <View key={date} style={globalStyles.ReportFeedbackMargins}>
                                                        <Card>
                                                            <View style={globalStyles.inlineData}>
                                                                <Text style={globalStyles.infosubtitle}>{date}</Text>
                                                            </View>
                                                        </Card>

                                                        <View>
                                                            {this.state.marked[date].notinfo.map(notification => 
                                                                <View key={notification.id} style={globalStyles.NotificationMarginBottom}>
                                                                    {/*Student Request new Notification */}
                                                                    {notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Reservation Request' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}>
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        <Center bg="#ffffff" rounded="md" py="3" mb="5%">
                                                                                            <HStack width="90%">
                                                                                                <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                <Text><Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text><Text style={globalStyles.textreporttitle}> wants to reserve</Text><Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text></Text>
                                                                                            </HStack>
                                                                                        </Center>
                                                                                        <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                            <HStack space="2" alignItems="center">
                                                                                                <Center>
                                                                                                    <Image
                                                                                                        resizeMode="cover"
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                        style={ globalStyles.imageNoti }
                                                                                                    ></Image>
                                                                                                </Center>
                                                                                                <Center width="70%" bg="#ffffff" px="1" py="3" rounded="md" _text={{color: 'white'}} shadow="1">
                                                                                                    <VStack width="90%">
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Arriving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Leaving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>From: </Text><Text style={globalStyles.textreporttitle}>{!notification.agency ? null : notification.agency}</Text></Text>
                                                                                                        </HStack>
                                                                                                    </VStack>
                                                                                                </Center> 
                                                                                            </HStack>
                                                                                        </Stack>

                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                                    

                                                                    {/*Report new Notification */}
                                                                    {notification.confirmed == 0 && notification.report_s != 'NULL' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id} onPress={ () =>this.report(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                            resizeMode="cover"
                                                                                                            style={globalStyles.AvatarReportList}
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*Student Request old Notification */}
                                                                    {notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s == 'NULL' && notification.title == 'Reservation Request' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        <Center bg="#ffffff" rounded="md" py="3" mb="5%">
                                                                                            <HStack width="90%">
                                                                                                <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                <Text><Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text><Text style={globalStyles.textreporttitle}> wants to reserve</Text><Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text></Text>
                                                                                            </HStack>
                                                                                        </Center>
                                                                                        <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                            <HStack space="2" alignItems="center">
                                                                                                <Center>
                                                                                                    <Image
                                                                                                        resizeMode="cover"
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                        style={ globalStyles.imageNoti }
                                                                                                    ></Image>
                                                                                                </Center>
                                                                                                <Center width="70%" bg="#ffffff" px="1" py="3" rounded="md" _text={{color: 'white'}} shadow="1">
                                                                                                    <VStack width="90%">
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Arriving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Leaving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>From: </Text><Text style={globalStyles.textreporttitle}>{!notification.agency ? null : notification.agency}</Text></Text>
                                                                                                        </HStack>
                                                                                                    </VStack>
                                                                                                </Center> 
                                                                                            </HStack>
                                                                                        </Stack>

                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*Report old Notification */}
                                                                    {notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s != 'NULL' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id} onPress={ () =>this.report(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo_m}` }}
                                                                                                            resizeMode="cover"
                                                                                                            style={globalStyles.AvatarReportList}
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>{!notification.agency ? null : notification.agency}</Text> has responded to your report. Click to see the details</Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*3 weeks new student reminder*/}
                                                                    {notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3w' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*3 weeks old student reminder*/}
                                                                    {notification.confirmed != 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3w' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*15th day new student reminder*/}
                                                                    {notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 15d' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*15th day old student reminder*/}
                                                                    {notification.confirmed != 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 15d' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*3 day new student reminder*/}
                                                                    {notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3d' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*3 day old student reminder*/}
                                                                    {notification.confirmed != 0 && notification.report_s == 'NULL' && notification.title == 'Student Arrival 3d' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>

                                                                                            <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                                <HStack space="2" alignItems="center">
                                                                                                    <Center>
                                                                                                        <Image
                                                                                                            resizeMode="cover"
                                                                                                            source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                            style={ globalStyles.imageNoti }
                                                                                                        ></Image>   
                                                                                                    </Center>
                                                                                                    <Center width="70%" bg="#ffffff" px="3" py="3" rounded="md" shadow="1">
                                                                                                        <VStack width="80%">
                                                                                                                <HStack>
                                                                                                                    <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                                    <Text style={globalStyles.textreporttitle}><Text style={globalStyles.infosubtitle}>Homebor</Text> reminds you that {!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l} will arrive on <Text style={globalStyles.infosubtitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                                </HStack>
                                                                                                            </VStack>
                                                                                                    </Center>
                                                                                                    
                                                                                                </HStack>
                                                                                            </Stack>
                                                                                        
                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}

                                                                    {/*Student Request old Notification */}
                                                                    {notification.confirmed != 0 && notification.status == 'Rejected' && notification.title == 'Reservation Request' && (
                                                                        <View>
                                                                            <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                <Center bg="#ffffff" rounded="md" py="3" mb="5%">
                                                                                    <HStack width="90%">
                                                                                        <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text><Text style={globalStyles.textreporttitle}> wants to reserve</Text><Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text></Text>
                                                                                    </HStack>
                                                                                </Center>
                                                                                <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                    <HStack space="2" alignItems="center">
                                                                                        <Center>
                                                                                            <Image
                                                                                                resizeMode="cover"
                                                                                                source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                style={ globalStyles.imageNoti }
                                                                                            ></Image>
                                                                                        </Center>
                                                                                        <Center width="70%" bg="#ffffff" px="1" py="3" rounded="md" _text={{color: 'white'}} shadow="1">
                                                                                            <VStack width="90%">
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>Arriving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                </HStack>
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>Leaving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text></Text>
                                                                                                </HStack>
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>From: </Text><Text style={globalStyles.textreporttitle}>{!notification.agency ? null : notification.agency}</Text></Text>
                                                                                                </HStack>
                                                                                            </VStack>
                                                                                        </Center> 
                                                                                    </HStack>
                                                                                </Stack>

                                                                            </ImageBackground>
                                                                        </View>
                                                                    )}

                                                                    {/*Agency assigment Student*/}
                                                                    {notification.confirmed == 0 && notification.report_s == 'NULL' && notification.title == 'Reservation Provider' && (
                                                                        <View>
                                                                            <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                <Center bg="#ffffff" rounded="md" py="3" mb="5%">
                                                                                    <HStack width="90%">
                                                                                        <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                        <Text><Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text><Text style={globalStyles.textreporttitle}> has assigned to</Text><Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text></Text>
                                                                                    </HStack>
                                                                                </Center>
                                                                                <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                    <HStack space="2" alignItems="center">
                                                                                        <Center>
                                                                                            <Image
                                                                                                resizeMode="cover"
                                                                                                source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                style={ globalStyles.imageNoti }
                                                                                            ></Image>
                                                                                        </Center>
                                                                                        <Center width="70%" bg="#ffffff" px="1" py="3" rounded="md" _text={{color: 'white'}} shadow="1">
                                                                                            <VStack width="90%">
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>Student: </Text><Text style={globalStyles.textreporttitle}>{!notification.des ? null : notification.des}</Text></Text>
                                                                                                </HStack>
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>Arriving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                </HStack>
                                                                                                <HStack width="100%">
                                                                                                    <Text><Text style={globalStyles.infosubtitle}>Leaving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text></Text>
                                                                                                </HStack>
                                                                                            </VStack>
                                                                                        </Center> 
                                                                                    </HStack>
                                                                                </Stack>

                                                                            </ImageBackground>
                                                                        </View>
                                                                    )}

                                                                    {/*Agency assigment Student old Notification */}
                                                                    {notification.confirmed != 0 && notification.status != 'Rejected' && notification.report_s == 'NULL' && notification.title == 'Reservation Provider' && (
                                                                        <View>
                                                                            <TouchableOpacity key={notification.id_s} onPress={ () =>this.edit2(
                                                                                this.setState({idnoti : notification.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(notification.id))))}> 
                                                                                    <ImageBackground source={require('../assets/img/backgrounds/fondo-sobre-abierto.png')} style={notification.confirmed != 0 ? globalStyles.itemNoti : globalStyles.itemNotiactive}>
                                                                                        <Center bg="#ffffff" rounded="md" py="3" mb="5%">
                                                                                            <HStack width="90%">
                                                                                                <MaterialIcons name="notifications" size={18} color="black" /> 
                                                                                                <Text><Text style={globalStyles.infosubtitle}>{!notification.user_i ? null : notification.user_i} {!notification.user_i_l ? null : notification.user_i_l}</Text><Text style={globalStyles.textreporttitle}> wants to reserve</Text><Text style={globalStyles.infosubtitle}> Room {!notification.room ? null : notification.room}</Text></Text>
                                                                                            </HStack>
                                                                                        </Center>
                                                                                        <Stack space="2" width="100%" alignItems="center" ml="3%">
                                                                                            <HStack space="2" alignItems="center">
                                                                                                <Center>
                                                                                                    <Image
                                                                                                        resizeMode="cover"
                                                                                                        source={{ uri: `http://homebor.com/${notification.photo}` }}
                                                                                                        style={ globalStyles.imageNoti }
                                                                                                    ></Image>
                                                                                                </Center>
                                                                                                <Center width="70%" bg="#ffffff" px="1" py="3" rounded="md" _text={{color: 'white'}} shadow="1">
                                                                                                    <VStack width="90%">
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Arriving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.start ? null : notification.start}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>Leaving Date: </Text><Text style={globalStyles.textreporttitle}>{!notification.end ? null : notification.end}</Text></Text>
                                                                                                        </HStack>
                                                                                                        <HStack width="100%">
                                                                                                            <Text><Text style={globalStyles.infosubtitle}>From: </Text><Text style={globalStyles.textreporttitle}>{!notification.agency ? null : notification.agency}</Text></Text>
                                                                                                        </HStack>
                                                                                                    </VStack>
                                                                                                </Center> 
                                                                                            </HStack>
                                                                                        </Stack>

                                                                                    </ImageBackground>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )}
                                                                    

                                                                </View>
                                                            )}
                                                        </View>
                                                            
                                                    </View>
                                               ))}
                                            </View>
                                        )}
                                    />

                                
                                </View>
                            </ImageBackground>
                        </View>
                    )}
                    </View>
                )}
                </View>
            </NativeBaseProvider>
        )
    }
}