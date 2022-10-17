import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Text, Image, Alert, Dimensions, FlatList, RefreshControl} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Slide, Alert as AlertNativeBase, VStack, HStack, Heading, Skeleton, Center, Spinner, Stack } from 'native-base';
import Card from '../shared/card';


import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class Eventshistory extends Component {
  NetInfoSubscription = null;

  constructor(props){
    var currentDate = new Date().getDate();
    super(props);
    this.state = {
      email : '',
      perm : false,
      items : {},
      refreshing : false,

      //Internet Connection
      connection_status: false,
      connection_refreshStatus: false,
      clockrun : false,

      //LoadingFirstTime
      readyDisplay : false
    }
  }

  async componentDidMount() {
    this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange)

    //Get profile data
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    //this.props.navigation.navigate('Login')
  
    if(this.state.connection_status == true) {
        //Get information for agenda cards
        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda, connection_refreshStatus: false })
    
        //Get data for dots in calendar
        let mday = await api.getAgenda(this.state.email,this.state.perm)
        this.setState({ mfirstd : mday.notification, noEvents: mday.notification[0].id})
    
        let profile = await api.getProfile(this.state.email,this.state.perm)
        this.setState({ info : profile.data[0].mail_h})
    
        //Function to create dots dinamically
        this.anotherFunc();
    } else {
        this.setState({connection_refreshStatus: true, readyDisplay : true})
    }
  
    //Refresh when is another event
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.onRefresh();
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
  }

  refresh = async() => {
        
    if(this.state.connection_status == true) {
      let mday = await api.getAgenda(this.state.email,this.state.perm)
      this.setState({ mfirstd : mday.notification, connection_refreshStatus: false, noEvents: mday.notification[0].id})

      

        let nextDay2 = this.state.mfirstd
        let obj = nextDay2.reduce((acc, dt) => {
    
          const dateAcc = acc[dt.start]
          const dateAcc2 = acc[dt.end]
        
          if (!dateAcc) {
            acc[dt.start] = {
              dots: [{ color : dt.color}]
            }
          } else {
            acc[dt.start].dots.push({ color : dt.color})
          }

          var startdate = new Date(dt.start); startdate.setDate(startdate.getDate() + 2)
          var lastdate = new Date(dt.end); 
          let datesCollection = [] 


          for (var d = new Date(startdate); d <= lastdate; d.setDate(d.getDate() + 1)) {
            datesCollection.push(d.getMonth()<9 ? d.getDate()<=9 ? `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}` : `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}` : d.getDate()<=9 ? `${d.getFullYear()}-${d.getMonth() + 1}-0${d.getDate()}` : `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
          }



          datesCollection.forEach((food, index) => {


            if (!acc[food]) {
              acc[food] = {
                dots: [{ color : dt.color}]
              }
            } else {
              acc[food].dots.push({ color : dt.color})
            }

            
          });

          if (!dateAcc2) {
            acc[dt.end] = {
              dots: [{ color : dt.color}]
            }
          } else {
            acc[dt.end].dots.push({ color : dt.color})
          }

          return acc
        }, {});
        this.setState({ marked : obj, readyDisplay : true, loading : false});

        

        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda })
        } else {
          this.setState({connection_refreshStatus: true, readyDisplay : true, loading : false})
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
      

      anotherFunc = () => {
        let nextDay2 = this.state.mfirstd
        let obj = nextDay2.reduce((acc, dt) => {
    
          const dateAcc = acc[dt.start]
          const dateAcc2 = acc[dt.end]
          
        
          if (!dateAcc) {
            acc[dt.start] = {
              dots: [{ color : dt.color}]
            }
          } else {
            acc[dt.start].dots.push({ color : dt.color})
          }

          var startdate = new Date(dt.start); startdate.setDate(startdate.getDate() + 2)
          var lastdate = new Date(dt.end); 
          let datesCollection = [] 


          for (var d = new Date(startdate); d <= lastdate; d.setDate(d.getDate() + 1)) {
            datesCollection.push(d.getMonth()<9 ? d.getDate()<=9 ? `${d.getFullYear()}-0${d.getMonth() + 1}-0${d.getDate()}` : `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}` : d.getDate()<=9 ? `${d.getFullYear()}-${d.getMonth() + 1}-0${d.getDate()}` : `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
          }



          datesCollection.forEach((food, index) => {


            if (!acc[food]) {
              acc[food] = {
                dots: [{ color : dt.color}]
              }
            } else {
              acc[food].dots.push({ color : dt.color})
            }

            
          });

          if (!dateAcc2) {
            acc[dt.end] = {
              dots: [{ color : dt.color}]
            }
          } else {
            acc[dt.end].dots.push({ color : dt.color})
          }

          return acc
        }, {});
        this.setState({ marked : obj, readyDisplay : true});
  
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

                    <View style={globalStyles.YoureventsHeight2}>
                      <ScrollView 
                        nestedScrollEnabled={true} 
                        refreshControl={
                          <RefreshControl
                          enabled={true}
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh}
                          tintColor="purple"
                          colors={["purple","purple"]}
                          />
                      }>
                        <View>
                          {(!this.state.mfirstd || this.state.noEvents < 1) ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="contain" source={require('../assets/img/empty/vacios-homebor--sin-historial-reserva.png')} style={globalStyles.imageNotInternet}/></View></View> : this.state.mfirstd.map((item) => 
                            <View key={item.id}>

                              <View style={globalStyles.MargintopCalendar}>
                                
                                <View>
                                  <View>

                                    <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                      {item.mail_s != "NULL" ? 
                                        <TouchableOpacity onPress={() =>this.studentProfile(this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}>
                                            <Stack w="100%" py="5" px="3">
                                              <HStack w="100%" space={2} rounded="md" style={globalStyles.cardCalendarEvents}>
                                                <Stack flex="1" maxW="35%" rounded="md" style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1 : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2 :  item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3 :  item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4 :  item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5 :  item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6 :  item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7 :  item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8 : globalStyles.cardNewEventDesingColorA}>
                                                  <VStack py="5">
                                                    <Center>
                                                      {item.photo != 'http://homebor.com/NULL' && (
                                                        <Image
                                                        source={{ uri: item.photo }}
                                                        resizeMode="cover"
                                                        style={globalStyles.imageCalendarNewDesing2}
                                                        ></Image>
                                                      )}
                                                       {item.photo == 'http://homebor.com/NULL' && (
                                                        <Image
                                                        source={require('../assets/img/empty/vacios-homebor-estudiante.png')}
                                                        resizeMode="cover"
                                                        style={globalStyles.imageCalendarNewDesing2}
                                                        ></Image>
                                                      )}
                                                    </Center>
                                                  </VStack>
                                                  <VStack py="2">
                                                    <Center>
                                                      <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                      <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                      <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                      <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                      <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                      <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                      <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                      <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                      <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                      <Text style={item.title != "NULL" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>{item.title}</Text>
                                                      </Center>
                                                  </VStack>
                                                </Stack>
                                                <Stack h="auto" w="50%" rounded="md" ml="5%" mt="8%">

                                                    <HStack space="2" alignItems="center" w="100%">
                                                      <Center w="50%" rounded="md">
                                                        <Text style={globalStyles.infosubtitleCalendar}>Start :</Text>
                                                        <Text style={item.start != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.start}</Text>
                                                      </Center>
                                                      <Center w="50%" rounded="md">
                                                        <Text style={globalStyles.infosubtitleCalendar}>End :</Text>
                                                        <Text style={item.end != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.end}</Text>
                                                      </Center>
                                                    </HStack>

                                                  <VStack w="100%" mt="10%">
                                                    <Center>
                                                      <Stack>
                                                        <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                                                        <Text style={item.academy != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.academy}</Text>
                                                      </Stack>
                                                    </Center>
                                                    <Center>
                                                      <Stack>
                                                        <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                                                        <Text style={item.agency != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.agency}</Text>
                                                      </Stack>
                                                    </Center>
                                                  </VStack>
                                                </Stack>
                                                
                                              </HStack>
                                            </Stack>
                                        </TouchableOpacity>
                                      
                                      
                                      :

                                        <View>
                                          <Stack w="100%" py="5" px="3">
                                              <HStack w="100%" space={2} rounded="md" style={globalStyles.cardCalendarEvents}>
                                                <Stack flex="1" maxW="35%" rounded="md" style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1 : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2 :  item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3 :  item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4 :  item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5 :  item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6 :  item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7 :  item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8 : globalStyles.cardNewEventDesingColorA}>
                                                  <VStack py="5">
                                                    <Center>
                                                      <Image
                                                        source={require('../assets/img/empty/icon-event.png')}
                                                        resizeMode="cover"
                                                        style={globalStyles.imageCalendarNewDesing2}
                                                      ></Image>
                                                    </Center>
                                                  </VStack>
                                                  <VStack py="2">
                                                    <Center>
                                                      <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                      <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                      <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                      <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                      <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                      <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                      <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                      <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                      <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                     </Center>
                                                  </VStack>
                                                </Stack>
                                                <Stack h="auto" w="50%" rounded="md" ml="5%" mt="8%">

                                                    <HStack space="2" alignItems="center" w="100%">
                                                      <Center w="50%" rounded="md">
                                                        <Text style={globalStyles.infosubtitleCalendar}>Start :</Text>
                                                        <Text style={item.start != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.start}</Text>
                                                      </Center>
                                                      <Center w="50%" rounded="md">
                                                        <Text style={globalStyles.infosubtitleCalendar}>End :</Text>
                                                        <Text style={item.end != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.end}</Text>
                                                      </Center>
                                                    </HStack>

                                                  <VStack w="100%" mt="10%">
                                                    <Center>
                                                      <Stack>
                                                        <Text style={globalStyles.infosubtitleCalendar}>Tilte :</Text>
                                                        <Text style={item.title != "NULL" ? globalStyles.infosubtitleCalendar2 : globalStyles.hideContents}>{item.title}</Text>
                                                      </Stack>
                                                    </Center>
                                                  </VStack>
                                                </Stack>
                                                
                                              </HStack>
                                            </Stack>


                                          <View/>

                                        </View>
                                      }
                                      
                                        
                                  
                                    </View>
                                      
                                  </View>
                              
                                </View>
                                
                                
                              </View>
                                
                              
                            </View>
                          )}
                          
                        </View>
                      </ScrollView>
                    </View>
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