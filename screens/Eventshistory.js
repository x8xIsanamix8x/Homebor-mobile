import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Text, Alert, Dimensions, FlatList, RefreshControl} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Slide, Alert as AlertNativeBase,  AspectRatio, Image, VStack, HStack, Heading, Skeleton, Center, Spinner, Stack } from 'native-base';
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
      today: new Date(),

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

        let obj = nextDay2.reduce((r, o) => {
          var p = o.end.split("-");                             // get the parts: year, month and day
          var week = Math.floor(p.pop() / 7) + 1;                // calculate the week number (Math.floor(day / 7) + 1) and remove day from the parts array (p.pop())
          var month = p.reduce((o, p) => o[p] = o[p] || {}, r);  // get the month object (first, get the year object (if not create one), then get the month object (if not create one)
          if(month[week]) month[week].push(o);                   // if there is an array for this week in the month object, then push this object o into that array
          else month[week] = [o];                                // otherwise create a new array for this week that initially contains the object o
          return r;
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

        let obj = nextDay2.reduce((r, o) => {
            var p = o.end.split("-");                             // get the parts: year, month and day
            var week = Math.floor(p.pop() / 7) + 1;                // calculate the week number (Math.floor(day / 7) + 1) and remove day from the parts array (p.pop())
            var month = p.reduce((o, p) => o[p] = o[p] || {}, r);  // get the month object (first, get the year object (if not create one), then get the month object (if not create one)
            if(month[week]) month[week].push(o);                   // if there is an array for this week in the month object, then push this object o into that array
            else month[week] = [o];                                // otherwise create a new array for this week that initially contains the object o
            return r;
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
                        {(!this.state.mfirstd || this.state.noEvents < 1) ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="contain" alt="Empty" source={require('../assets/img/empty/vacios-homebor--sin-historial-reserva.png')} style={globalStyles.imageNotInternet}/></View></View> : Object.keys(this.state.marked).reverse().map(year => (
                            <View key={year}>
                              {this.state.today.getFullYear() == year && (<Heading size='md' px="3" py="3">This year {year}</Heading>)}
                              {(this.state.today.getFullYear() + 1) == year && (<Heading size='md' px="3" py="3">Next year {year}</Heading>)}
                              {(this.state.today.getFullYear() - 1) == year && (<Heading size='md' px="3" py="3">Previous year {year}</Heading>)}
                              {(this.state.today.getFullYear() - 1) != year && (this.state.today.getFullYear() + 1) != year && this.state.today.getFullYear() != year && (<Heading size='md' px="3" py="3">{year}</Heading>)}
                              {Object.keys(this.state.marked[year]).sort((first, second) => {return first > second ? 1 : -1;}).reverse().map(month => (
                                <View key={month}>
                                  {this.state.today.getFullYear() == year && this.state.today.getMonth() == month ? (<Heading size='sm' px="3">This month</Heading>)
                                    :
                                    <View>
                                      {month === '01' && (<Heading size='sm' px="3">January</Heading>)}
                                      {month === '02' && (<Heading size='sm' px="3">February</Heading>)}
                                      {month === '03' && (<Heading size='sm' px="3">March</Heading>)}
                                      {month === '04' && (<Heading size='sm' px="3">April</Heading>)}
                                      {month === '05' && (<Heading size='sm' px="3">May</Heading>)}
                                      {month === '06' && (<Heading size='sm' px="3">June</Heading>)}
                                      {month === '07' && (<Heading size='sm' px="3">July</Heading>)}
                                      {month === '08' && (<Heading size='sm' px="3">August</Heading>)}
                                      {month === '09' && (<Heading size='sm' px="3">September</Heading>)}
                                      {month === '10' && (<Heading size='sm' px="3">October</Heading>)}
                                      {month === '11' && (<Heading size='sm' px="3">November</Heading>)}
                                      {month === '12' && (<Heading size='sm' px="3">December</Heading>)}
                                    </View>
                                  }
                                  {Object.keys(this.state.marked[year][month]).map(id => (
                                    <View key={id}>
                                      {this.state.marked[year][month][id].map(item => (
                                        <View key={item.id}>

                                          <View style={globalStyles.MargintopCalendar}>
                                            
                                            <View>
                                              <View>
            
                                                <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                                  {item.mail_s != "NULL" ? 
                                                    <TouchableOpacity onPress={() =>this.studentProfile(this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}>
                                                        <Stack w="100%" py="5" px="3">
                                                          <HStack w="100%" space={6} rounded="md" style={globalStyles.cardCalendarEvents2} bg={item.room_e == "room1" ? "#232159" : item.room_e == "room2" ? "#982A72" : item.room_e == "room3" ? "#394893" : item.room_e == "room4" ? "#A54483" : item.room_e == "room5" ? "#5D418D" : item.room_e == "room6" ? "#392B84" : item.room_e == "room7" ? "#232159" : item.room_e == "room8" ? "#B15391" : "#C471CF"} px="3" py="5">
                                                            <Stack width="35%">
                                                              <View>
                                                                {item.photo != 'http://homebor.com/NULL' && (
                                                                    <AspectRatio w="100%" ratio={4 / 4} >
                                                                      <View style={globalStyles.ProfileBannerView}>
                                                                        <Image
                                                                        borderRadius={10}
                                                                        style={globalStyles.ProfileBannerImages}
                                                                        source={{ uri: item.photo }}
                                                                        resizeMode="stretch"
                                                                        alt="Student Photo"
                                                                        />
                                                                      </View>
                                                                    </AspectRatio>
                                                                )}
                                                                {item.photo == 'http://homebor.com/NULL' && (
                                                                  <AspectRatio w="100%" ratio={4 / 3} >
                                                                    <View style={globalStyles.ProfileBannerView}>
                                                                      <Image
                                                                      borderRadius={10}
                                                                      style={globalStyles.ProfileBannerImages}
                                                                      source={require('../assets/img/empty/vacios-homebor-estudiante.png')}
                                                                      resizeMode="stretch"
                                                                      alt="Student Photo"
                                                                      />
                                                                    </View>
                                                                  </AspectRatio>
                                                                )}
                                                              </View>
                                                            </Stack>
                                                            <Stack width="60%">
                                                              {item.title != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.title}</Text>)}
            
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}
            
                                                              {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                              {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                              {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
            
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Finished Stay</Text>)}
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                              {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}
            
                                                              {item.agency != 'NULL' && (<Text><Text style={globalStyles.infosubtitleCalendar4}>Agency: </Text><Text style={globalStyles.infosubtitleCalendar3}>{item.agency}</Text></Text>)}
                                                            </Stack>
                                                          </HStack>
                                                        </Stack>
                                                    </TouchableOpacity>
                                                  
                                                  
                                                  :
            
                                                    <View>
                                                      <Stack w="100%" py="5" px="3">
                                                        <HStack w="100%" space={6} rounded="md" style={globalStyles.cardCalendarEvents2} bg={item.room_e == "room1" ? "#232159" : item.room_e == "room2" ? "#982A72" : item.room_e == "room3" ? "#394893" : item.room_e == "room4" ? "#A54483" : item.room_e == "room5" ? "#5D418D" : item.room_e == "room6" ? "#392B84" : item.room_e == "room7" ? "#232159" : item.room_e == "room8" ? "#B15391" : "#C471CF"} px="3" py="5">
                                                          <Stack width="35%">
                                                            <View>
                                                              <AspectRatio w="100%" ratio={4 / 4} >
                                                                <View style={globalStyles.ProfileBannerView}>
                                                                  <Image
                                                                  borderRadius={10}
                                                                  style={globalStyles.ProfileBannerImages}
                                                                  source={require('../assets/img/empty/icon-event.png')}
                                                                  resizeMode="stretch"
                                                                  alt="Event Photo"
                                                                  />
                                                                </View>
                                                              </AspectRatio>
                                                            </View>
                                                          </Stack>
                                                          <Stack width="60%">
                                                            {item.title != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.title}</Text>)}
            
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}
            
                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && item.end != 'NULL' && this.state.today < new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
            
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Finished Stay</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && this.state.today > new Date(item.end) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}
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
                                      ))}
                                    </View>
                                  ))}
                                </View>
                              ))}
                            </View>
                          ))}
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