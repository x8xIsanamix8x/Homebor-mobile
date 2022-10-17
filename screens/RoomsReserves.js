import React, {Component, useState} from 'react'; 
import { View, Image, Text, RefreshControl, Dimensions, Platform, Alert } from 'react-native';
import { NativeBaseProvider, Heading, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Divider, Box, AspectRatio, Stack } from 'native-base';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import NetInfo from "@react-native-community/netinfo";

export default class RoomsReserves extends Component {
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
            readyDisplay : false, 
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange,)
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})

        //Get student data from id noti
        let idnoti2 = await AsyncStorage.getItem('idnoti2')
		idnoti2 = JSON.parse(idnoti2)
        this.setState({ idnoti2 : idnoti2})
    
        if(this.state.connection_status == true) {
    
            //Get user profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false, connection_refreshStatus: false, room1: profile[0].room1, room2: profile[0].room2, room3: profile[0].room3, room4: profile[0].room4, room5: profile[0].room5, room6: profile[0].room6, room7: profile[0].room7, room8: profile[0].room8, date1: profile[0].data.date1, date1_2: profile[0].data.date1_2, date1_3: profile[0].data.date1_3, date2: profile[0].data.date2, date2_2: profile[0].data.date2_2, date2_3: profile[0].data.date2_3, date3: profile[0].data.date3, date3_2: profile[0].data.date3_2, date3_3: profile[0].data.date3_3, date4: profile[0].data.date4, date4_2: profile[0].data.date4_2, date4_3: profile[0].data.date4_3, date5: profile[0].data.date5, date5_2: profile[0].data.date5_2, date5_3: profile[0].data.date5_3, date6: profile[0].data.date6, date6_2: profile[0].data.date6_2, date6_3: profile[0].data.date6_3, date7: profile[0].data.date7, date7_2: profile[0].data.date7_2, date7_3: profile[0].data.date7_3, date8: profile[0].data.date8, date8_2: profile[0].data.date8_2, date8_3: profile[0].data.date8_3})

            let dateDocp = new Date()
            let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`
            this.setState({XDAY : XDAYp})

            //Colors for Room Frame and Rooms for Filter
            if(this.state.idnoti2 == 1) {

                this.setState({colorRoom: "#232159"})
                if(this.state.room1 != undefined) {

                    let activeRoom = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room1.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date1, status2 : this.state.date1_2, status3 : this.state.date1_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }

                
            }
            if(this.state.idnoti2 == 2) {

                this.setState({colorRoom: "#982A72"})
                if(this.state.room2 != undefined) {

                    let activeRoom = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room2.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date2, status2 : this.state.date2_2, status3 : this.state.date2_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 3) {

                this.setState({colorRoom: "#394893"})
                if(this.state.room3 != undefined) {

                    let activeRoom = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room3.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date3, status2 : this.state.date3_2, status3 : this.state.date3_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 4) {

                this.setState({colorRoom: "#A54483"})
                if(this.state.room4 != undefined) {

                    let activeRoom = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room4.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date4, status2 : this.state.date4_2, status3 : this.state.date4_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 5) {

                this.setState({colorRoom: "#5D418D"})
                if(this.state.room5 != undefined) {
                    
                    let activeRoom = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room5.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date5, status2 : this.state.date5_2, status3 : this.state.date5_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 6) {

                this.setState({colorRoom: "#392B84"})
                if(this.state.room6 != undefined) {

                    
                    let activeRoom = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room6.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date6, status2 : this.state.date6_2, status3 : this.state.date6_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 7) {

                this.setState({colorRoom: "#B15391"})
                if(this.state.room7 != undefined) {

                    
                    let activeRoom = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room7.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date7, status2 : this.state.date7_2, status3 : this.state.date7_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 8) {

                this.setState({colorRoom: "#B15391"})
                if(this.state.room8 != undefined) {

                    
                    let activeRoom = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room8.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date8, status2 : this.state.date8_2, status3 : this.state.date8_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }

            this.setState({readyDisplay : true})

        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Refresh function when open this screen
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onRefresh()
        });
    }

    //Function call for refresh
    onRefresh = () => {
    this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
    }

    //Function refresh
    refresh = async() => {
        if(this.state.connection_status == true) {
            //Get user profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false, connection_refreshStatus: false, room1: profile[0].room1, room2: profile[0].room2, room3: profile[0].room3, room4: profile[0].room4, room5: profile[0].room5, room6: profile[0].room6, room7: profile[0].room7, room8: profile[0].room8, date1: profile[0].data.date1, date1_2: profile[0].data.date1_2, date1_3: profile[0].data.date1_3, date2: profile[0].data.date2, date2_2: profile[0].data.date2_2, date2_3: profile[0].data.date2_3, date3: profile[0].data.date3, date3_2: profile[0].data.date3_2, date3_3: profile[0].data.date3_3, date4: profile[0].data.date4, date4_2: profile[0].data.date4_2, date4_3: profile[0].data.date4_3, date5: profile[0].data.date5, date5_2: profile[0].data.date5_2, date5_3: profile[0].data.date5_3, date6: profile[0].data.date6, date6_2: profile[0].data.date6_2, date6_3: profile[0].data.date6_3, date7: profile[0].data.date7, date7_2: profile[0].data.date7_2, date7_3: profile[0].data.date7_3, date8: profile[0].data.date8, date8_2: profile[0].data.date8_2, date8_3: profile[0].data.date8_3})

            let idnoti2 = await AsyncStorage.getItem('idnoti2')
            idnoti2 = JSON.parse(idnoti2)
            this.setState({ idnoti2 : idnoti2})

            let dateDocp = new Date()
            let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`
            this.setState({XDAY : XDAYp})

            //Colors for Room Frame and Rooms for Filter
            if(this.state.idnoti2 == 1) {

                this.setState({colorRoom: "#232159"})
                if(this.state.room1 != undefined) {

                    let activeRoom = this.state.room1.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room1.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date1, status2 : this.state.date1_2, status3 : this.state.date1_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }

                
            }
            if(this.state.idnoti2 == 2) {

                this.setState({colorRoom: "#982A72"})
                if(this.state.room2 != undefined) {

                    let activeRoom = this.state.room2.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room2.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date2, status2 : this.state.date2_2, status3 : this.state.date2_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 3) {

                this.setState({colorRoom: "#394893"})
                if(this.state.room3 != undefined) {

                    let activeRoom = this.state.room3.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room3.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date3, status2 : this.state.date3_2, status3 : this.state.date3_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 4) {

                this.setState({colorRoom: "#A54483"})
                if(this.state.room4 != undefined) {

                    let activeRoom = this.state.room4.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room4.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date4, status2 : this.state.date4_2, status3 : this.state.date4_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 5) {

                this.setState({colorRoom: "#5D418D"})
                if(this.state.room5 != undefined) {
                    
                    let activeRoom = this.state.room5.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room5.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date5, status2 : this.state.date5_2, status3 : this.state.date5_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 6) {

                this.setState({colorRoom: "#392B84"})
                if(this.state.room6 != undefined) {

                    
                    let activeRoom = this.state.room6.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room6.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date6, status2 : this.state.date6_2, status3 : this.state.date6_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 7) {

                this.setState({colorRoom: "#B15391"})
                if(this.state.room7 != undefined) {

                    
                    let activeRoom = this.state.room7.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room7.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date7, status2 : this.state.date7_2, status3 : this.state.date7_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }
            if(this.state.idnoti2 == 8) {

                this.setState({colorRoom: "#B15391"})
                if(this.state.room8 != undefined) {

                    
                    let activeRoom = this.state.room8.filter(item => item.start <= this.state.XDAY && item.end >= this.state.XDAY)
                    this.setState({activeEvents : activeRoom})

                    let commingRoom = this.state.room8.filter(item => item.start > this.state.XDAY && item.end > this.state.XDAY)
                    this.setState({commingEvents : commingRoom})

                    this.setState({status1 : this.state.date8, status2 : this.state.date8_2, status3 : this.state.date8_3})

                } else {
                    this.setState({activeEvents : '', commingEvents : '', status1 : '', status2 : '', status3 : ''})
                }
            }

            this.setState({readyDisplay : true, loading : false,})
            
        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

    }

    studentProfile = async () => {
        let idnoti = await AsyncStorage.getItem('idnoti')
        idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})
    
        if (this.state.connection_status) {
          this.props.navigation.navigate('StudentInfofromEvents')
        } else {
          Alert.alert('There is no internet connection, connect and try again.')
        }
    }

    _AlertCalendar = async () => { 
        Alert.alert(
            'Modify Event',
            'Do you want to modify this event?',
            [        
              {text: 'Yes', onPress: () => this.GotoUpload()},
              {text: 'No', onPress: () => {}},
            ],
            {
              type: 'secure-text',
              cancelable: false,
              defaultValue: 'test',
              placeholder: 'placeholder'
          },
            { cancelable: false }
          )
    }

    GotoUpload = () => {
      if (this.state.connection_status) {
        this.props.navigation.navigate('ModalUpdate')
      } else {
        Alert.alert('There is no internet connection, connect and try again.')
      }
  }

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    tryAgainNotConnection = () => {
        this.setState({clockrun : true})
        this.Clock()
    }
    
    Clock = () => {
        this.timerHandle = setTimeout (() => {
          this.setState({clockrun : false});
          this.timerHandle = 0;
        }, 5000)
    }
    
    componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;  
    }

    render() {
        return (
            <NativeBaseProvider bg="primary.400">
                <StatusBar style="light" translucent={true} />
                    <View>
                    {this.state.readyDisplay == false && (
                        <View>
                            <View style={globalStyles.skeletonMarginTop}>
                                <Center w="100%">
                                    <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                        <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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
                                        <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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
                                        <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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

                            {Dimensions.get('window').width >= 414 &&(
                                <View>
                                    <View style={globalStyles.skeletonMarginTop}>
                                        <Center w="100%">
                                            <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                                <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
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

                                </View>
                            )}
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
                                                <Stack py="5">

                                                    {/*Banner*/}
                                                    <Stack mb="3%">
                                                        
                                                        <Center mt="3%" w="100%" px="2" shadow="5">
                                                            <Box maxW="95%" overflow="hidden" borderRadius="md" >
                                                                <View>
                                                                    <AspectRatio w="100%" ratio={16 / 9}>
                                                                        <View>
                                                                            {/*Photo Room 1*/}
                                                                            {this.state.idnoti2 == 1 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom1 == "NULL" && item.data.proom1_2 == "NULL" && item.data.proom1_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 2*/}
                                                                            {this.state.idnoti2 == 2 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom2 == "NULL" && item.data.proom2_2 == "NULL" && item.data.proom2_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 3*/}
                                                                            {this.state.idnoti2 == 3 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom3 == "NULL" && item.data.proom3_2 == "NULL" && item.data.proom3_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 4*/}
                                                                            {this.state.idnoti2 == 4 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom4 == "NULL" && item.data.proom4_2 == "NULL" && item.data.proom4_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 5*/}
                                                                            {this.state.idnoti2 == 5 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom5 == "NULL" && item.data.proom5_2 == "NULL" && item.data.proom5_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 6*/}
                                                                            {this.state.idnoti2 == 6 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom6 == "NULL" && item.data.proom6_2 == "NULL" && item.data.proom6_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 7*/}
                                                                            {this.state.idnoti2 == 7 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom7 == "NULL" && item.data.proom7_2 == "NULL" && item.data.proom7_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                            {/*Photo Room 8*/}
                                                                            {this.state.idnoti2 == 8 && (
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom8 == "NULL" && item.data.proom8_2 == "NULL" && item.data.proom8_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            )}
                                                                        </View>
                                                                    </AspectRatio>
                                                                    <Center bg={this.state.colorRoom} position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="75%" maxW="25%">
                                                                            <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room {this.state.idnoti2}</Heading>
                                                                    </Center>
                                                                    {(this.state.status1 == 'Disable' || this.state.status2 == 'Disable' || this.state.status3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="2%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                    )}
                                                                </View>
                                                            </Box>
                                                        </Center>

                                                         {/*Active Section*/}
                                                        <Stack py="3" px="5">
                                                            <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>Active</Heading>
                                                        </Stack>

                                                        {this.state.activeEvents.length <= 0 ? <Stack py="5"><Center><Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'}>No events active</Heading></Center></Stack> : this.state.activeEvents.map(active => (
                                                            <Stack py="3" px="4" key={active.id_e}>
                                                                <TouchableOpacity onPress={()=> (active.mail_s != "NULL" ? this.studentProfile(this.setState({idnoti : active.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(active.mail_s)))) : this._AlertCalendar(this.setState({idnoti : active.id_e}, () => AsyncStorage.setItem('idnoti',JSON.stringify(active.id_e)))))}>
                                                                    <View style={globalStyles.CardRoomsReserves}>
                                                                        <View style={globalStyles.cardContentCalendar}>
                                                                            <Stack space="2" alignItems="center">
                                                                                <HStack space="2" w="100%" alignItems="center">
                                                                                    <Center w="40%" rounded="md" >
                                                                                        <Box maxW="95%" rounded="md" overflow="hidden" borderRadius="md">
                                                                                            <View>
                                                                                                <AspectRatio w="100%" ratio={7 / 8}>
                                                                                                    <View>
                                                                                                        {active.mail_s != "NULL" && active.photo_s != "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={{ uri: `http://homebor.com/${active.photo_s}` }}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}
                                                                                                        {active.mail_s != "NULL" && active.photo_s == "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={require('../assets/img/empty/vacios-homebor-estudiante.png')}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}
                                                                                                        {active.mail_s == "NULL" && active.photo_s == "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={require('../assets/img/empty/icon-event.png')}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}   
                                                                                                    </View>
                                                                                                </AspectRatio>
                                                                                            </View>
                                                                                        </Box>
                                                                                    </Center>
                                                                                    <Center w="60%" >
                                                                                        {active.title != "NULL" && (
                                                                                            <VStack py="2" w="100%">
                                                                                                <Center> 
                                                                                                    <Text style={globalStyles.titleRoomsReserves}>{active.title}</Text>
                                                                                                </Center>
                                                                                                <Center>
                                                                                                    <Divider mt="6%" w="90%" bg="gray.500"/>
                                                                                                </Center>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {active.bed != 'NULL' && (
                                                                                            <VStack py="1" maxW="60%" mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "-5%" : (Dimensions.get('window').width >= 414) ? "5%" : "-5%"}>
                                                                                                <HStack w="100%" space="2" alignItems="center">
                                                                                                    <Center size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "16" : "8" : (Dimensions.get('window').width >= 414) ? "16" : "8"}>
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.roomPreviewicon}
                                                                                                        ></Image>
                                                                                                    </Center>
                                                                                                    <Center>
                                                                                                        {/*Beds Room 1*/}
                                                                                                        {active.bed == 'A' && item.data.bed1 != 'NULL' && this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed1_2 != 'NULL' && this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed1_3 != 'NULL' &&this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 2*/}
                                                                                                        {active.bed == 'A' && item.data.bed2 != 'NULL' && this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed2_2 != 'NULL' && this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed2_3 != 'NULL' &&this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 3*/}
                                                                                                        {active.bed == 'A' && item.data.bed3 != 'NULL' && this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed3_2 != 'NULL' && this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed3_3 != 'NULL' &&this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 4*/}
                                                                                                        {active.bed == 'A' && item.data.bed4 != 'NULL' && this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed4_2 != 'NULL' && this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed4_3 != 'NULL' &&this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 5*/}
                                                                                                        {active.bed == 'A' && item.data.bed5 != 'NULL' && this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed5_2 != 'NULL' && this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed5_3 != 'NULL' &&this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 6*/}
                                                                                                        {active.bed == 'A' && item.data.bed6 != 'NULL' && this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed6_2 != 'NULL' && this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed6_3 != 'NULL' &&this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 7*/}
                                                                                                        {active.bed == 'A' && item.data.bed7 != 'NULL' && this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed7_2 != 'NULL' && this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed7_3 != 'NULL' &&this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 8*/}
                                                                                                        {active.bed == 'A' && item.data.bed8 != 'NULL' && this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'B' && item.data.bed8_2 != 'NULL' && this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8_2}</Text>
                                                                                                        )}
                                                                                                        {active.bed == 'C' && item.data.bed8_3 != 'NULL' &&this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8_3}</Text>
                                                                                                        )}
                                                                                                    </Center>
                                                                                                </HStack>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {active.start != "NULL" && (
                                                                                            <VStack py="1">
                                                                                                <Text><Text style={globalStyles.subtitleRoomsReserves}>First Date: </Text><Text style={globalStyles.textRoomsReserves}>{active.start}</Text></Text>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {active.end != "NULL" && (
                                                                                            <VStack py="1">
                                                                                                <Text><Text style={globalStyles.subtitleRoomsReserves}>Last Date: </Text><Text style={globalStyles.textRoomsReserves}>{active.end}</Text></Text>
                                                                                            </VStack>
                                                                                        )}
                                                                                        
                                                                                    </Center>
                                                                                </HStack>
                                                                            </Stack>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </Stack>
                                                        ))}

                                                        {/*For Comming Section*/}
                                                        <Stack py="3" px="5">
                                                            <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>For comming</Heading>
                                                        </Stack>

                                                        {this.state.commingEvents.length <= 0 ? <Stack mt="10%"><Center><Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'}>No events for comming</Heading></Center></Stack> : this.state.commingEvents.map(comming => (
                                                            <Stack py="3" px="4" key={comming.id_e}>
                                                                <TouchableOpacity onPress={()=> (comming.mail_s != "NULL" ? this.studentProfile(this.setState({idnoti : comming.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(comming.mail_s)))) : this._AlertCalendar(this.setState({idnoti : comming.id_e}, () => AsyncStorage.setItem('idnoti',JSON.stringify(comming.id_e)))))}>
                                                                    <View style={globalStyles.CardRoomsReserves}>
                                                                        <View style={globalStyles.cardContentCalendar}>
                                                                            <Stack space="2" alignItems="center">
                                                                                <HStack space="2" w="100%" alignItems="center">
                                                                                    <Center w="40%" rounded="md" >
                                                                                        <Box maxW="95%" rounded="md" overflow="hidden" borderRadius="md">
                                                                                            <View>
                                                                                                <AspectRatio w="100%" ratio={7 / 8}>
                                                                                                    <View>
                                                                                                        {comming.mail_s != "NULL" && comming.photo_s != "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={{ uri: `http://homebor.com/${comming.photo_s}` }}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}
                                                                                                        {comming.mail_s != "NULL" && comming.photo_s == "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={require('../assets/img/empty/vacios-homebor-estudiante.png')}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}
                                                                                                        {comming.mail_s == "NULL" && comming.photo_s == "NULL" && (
                                                                                                            <Image
                                                                                                                style={globalStyles.ProfileBannerImages}
                                                                                                                source={require('../assets/img/empty/icon-event.png')}
                                                                                                                resizeMode="stretch"
                                                                                                            /> 
                                                                                                        )}   
                                                                                                    </View>
                                                                                                </AspectRatio>
                                                                                            </View>
                                                                                        </Box>
                                                                                    </Center>
                                                                                    <Center w="60%" >
                                                                                        {comming.title != "NULL" && (
                                                                                            <VStack py="2" w="100%">
                                                                                                <Center>
                                                                                                    <Text style={globalStyles.titleRoomsReserves}>{comming.title}</Text>
                                                                                                </Center> 
                                                                                                <Center>
                                                                                                    <Divider mt="6%" w="90%" bg="gray.500"/>
                                                                                                </Center>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {comming.bed != 'NULL' && (
                                                                                            <VStack py="1" maxW="60%" mt="-5%">
                                                                                                <HStack w="100%" space="2" alignItems="center">
                                                                                                    <Center size="8">
                                                                                                        <Image
                                                                                                            source={require("../assets/img/roomIcon/cama-16.png")}
                                                                                                            resizeMode="contain"
                                                                                                            style={globalStyles.roomPreviewicon}
                                                                                                        ></Image>
                                                                                                    </Center>
                                                                                                    <Center>
                                                                                                        {/*Beds Room 1*/}
                                                                                                        {comming.bed == 'A' && item.data.bed1 != 'NULL' && this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed1_2 != 'NULL' && this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed1_3 != 'NULL' &&this.state.idnoti2 == 1 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed1_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed1_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 2*/}
                                                                                                        {comming.bed == 'A' && item.data.bed2 != 'NULL' && this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed2_2 != 'NULL' && this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed2_3 != 'NULL' &&this.state.idnoti2 == 2 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed2_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed2_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 3*/}
                                                                                                        {comming.bed == 'A' && item.data.bed3 != 'NULL' && this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed3_2 != 'NULL' && this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed3_3 != 'NULL' &&this.state.idnoti2 == 3 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed3_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed3_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 4*/}
                                                                                                        {comming.bed == 'A' && item.data.bed4 != 'NULL' && this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed4_2 != 'NULL' && this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed4_3 != 'NULL' &&this.state.idnoti2 == 4 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed4_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed4_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 5*/}
                                                                                                        {comming.bed == 'A' && item.data.bed5 != 'NULL' && this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed5_2 != 'NULL' && this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed5_3 != 'NULL' &&this.state.idnoti2 == 5 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed5_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed5_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 6*/}
                                                                                                        {comming.bed == 'A' && item.data.bed6 != 'NULL' && this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed6_2 != 'NULL' && this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed6_3 != 'NULL' &&this.state.idnoti2 == 6 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed6_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed6_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 7*/}
                                                                                                        {comming.bed == 'A' && item.data.bed7 != 'NULL' && this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed7_2 != 'NULL' && this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed7_3 != 'NULL' &&this.state.idnoti2 == 7 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed7_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed7_3}</Text>
                                                                                                        )}

                                                                                                        {/*Beds Room 8*/}
                                                                                                        {comming.bed == 'A' && item.data.bed8 != 'NULL' && this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'B' && item.data.bed8_2 != 'NULL' && this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8_2 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8_2}</Text>
                                                                                                        )}
                                                                                                        {comming.bed == 'C' && item.data.bed8_3 != 'NULL' &&this.state.idnoti2 == 8 && (
                                                                                                            <Text style={globalStyles.textRoomsReserves}>{item.data.bed8_3 == 'Bunk-bed' ? "Bunk Bed" : item.data.bed8_3}</Text>
                                                                                                        )}
                                                                                                    </Center>
                                                                                                </HStack>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {comming.start != "NULL" && (
                                                                                            <VStack py="1">
                                                                                                <Text><Text style={globalStyles.subtitleRoomsReserves}>First Date: </Text><Text style={globalStyles.textRoomsReserves}>{comming.start}</Text></Text>
                                                                                            </VStack>
                                                                                        )}
                                                                                        {comming.end != "NULL" && (
                                                                                            <VStack py="1">
                                                                                                <Text><Text style={globalStyles.subtitleRoomsReserves}>Last Date: </Text><Text style={globalStyles.textRoomsReserves}>{comming.end}</Text></Text>
                                                                                            </VStack>
                                                                                        )}
                                                                                        
                                                                                    </Center>
                                                                                </HStack>
                                                                            </Stack>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </Stack>
                                                        ))}
                                                        
                                                        
                                                    </Stack>
                                                    
                                                </Stack>
                                            )}/>
                                    </View>
                                </View>
                        )}
                        </View>
                    )}
                    </View>
			</NativeBaseProvider>
        )
    }

}