import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Text, RefreshControl, Alert, Dimensions, Platform} from 'react-native'; 
import {Calendar} from 'react-native-calendars';
import globalStyles from '../styles/global';
import { NativeBaseProvider, Heading, AspectRatio, Image, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Spinner, Stack, Icon, Circle } from 'native-base';
import Card from '../shared/card';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

import { FlatList } from 'react-native-gesture-handler';


export default class YourEvents extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,
      items : {},
      refreshing : false,
      filterEvents: false,
      today: new Date(),
  
      //Internet Connection
      connection_status: false,
      connection_refreshStatus: false,
      clockrun : false,

      //LoadingFirstTime
      readyDisplay : false
    }
  }


  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange) 


    this._onFocusListener =this.props.navigation.addListener('focus', async () => {
      //Get profile data
      let userLogin = await AsyncStorage.getItem('userLogin')
      userLogin = JSON.parse(userLogin)
      this.setState({ email : userLogin.email, perm : userLogin.perm})
      //this.props.navigation.navigate('Login')

      if(this.state.connection_status == true) {
        //Get information for agenda cards
        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda,  connection_refreshStatus: false, filterEvents: false})

        //Get data for dots in calendar
        let mday = await api.getAgenda(this.state.email,this.state.perm)
        this.setState({ mfirstd : mday.notification})

        let avalible = await api.getAgendaAvalible(this.state.email,this.state.perm)
        this.setState({ activeEvent : avalible.notification})

        console.log("width", Dimensions.get('window').width)

        //Function to create dots dinamically
        this.anotherFunc();
      } else {
        this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
      }

    });

    this._onFocusListener = this.props.navigation.addListener('blur', () => {
      this.componentWillUnmount()
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
        //Get information for agenda cards
        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda,  connection_refreshStatus: false, filterEvents: false})
  
        //Get data for dots in calendar
        let mday = await api.getAgenda(this.state.email,this.state.perm)
        this.setState({ mfirstd : mday.notification})
  
        //Function to create dots dinamically
        this.anotherFunc();
        } else {
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
       

    anotherFunc = () => {
        
          let nextDay = this.state.mfirstd
          let obj = nextDay.reduce((acc, dt) => {
    
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
    if(!this.state.connection_status){
      this.Clock()
    }  
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

  noInternetConnection = () => {
    Alert.alert('There is no internet connection, connect and try again.')
  }

  tryAgainNotConnection = () => {
    this.setState({clockrun : true})
    this.Clock()
  }

  componentWillUnmount(){
    this.NetInfoSubscription && this.NetInfoSubscription()
    if (this.timerHandle) {
      clearTimeout(this.timerHandle)
      this.timerHandle = 0;  
    }
  }

  filterEvents = async () => {

    let nextDay = this.state.mfirstd
    let DaySelected = this.state.BackgroundDay
    let obj = nextDay.reduce((acc, dt) => {

    const dateAcc = acc[dt.start]
    const dateAcc2 = acc[dt.end]
    const dateAcc3 = acc[DaySelected]
    
  
    if (!dateAcc) {
      if(DaySelected != dt.start){
        acc[dt.start] = {
          dots: [{ color : dt.color}]
        }
      } else {
        acc[dt.start] = {
          selected: true, 
          selectedColor: '#827FC4',
          dots: [{ color : dt.color}]
        }
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
        if(DaySelected != food){
          acc[food] = {
            dots: [{ color : dt.color}]
          }
        } else {
          acc[food] = {
            selected: true, 
            selectedColor: '#827FC4',
            dots: [{ color : dt.color}]
          }
        }
      } else {
          acc[food].dots.push({ color : dt.color})
      }

     

    });

    if (!dateAcc2) {
      if(DaySelected != dt.end){
        acc[dt.end] = {
          dots: [{ color : dt.color}]
        }
      } else {
        acc[dt.end] = {
          selected: true, 
          selectedColor: '#827FC4',
          dots: [{ color : dt.color}]
        }
      }
    } else {
        acc[dt.end].dots.push({ color : dt.color})
    }
    
    return acc
  }, {});

  let filterEventsYear = this.state.mfirstd.filter(item => item.start <= this.state.BackgroundDay && item.end >= this.state.BackgroundDay)
  let dateDocp = new Date()
  let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`
  this.setState({filterEventsShow : filterEventsYear, XDAY : XDAYp}) 
  this.setState({ marked : obj, readyDisplay : true, filterEvents: true});
  }

  CreateEvents = async () => {
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})
    
    this.props.navigation.navigate('ModalScreenCalendar')
  }

  render() {
    return(
      <NativeBaseProvider>
        <StatusBar style="light" translucent={true} />
          <View>
            {this.state.readyDisplay == false && (
              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                          <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                          <Skeleton h="40" />
                      </VStack>
                  </Center>
                
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

                {Dimensions.get('window').width >= 414 && (
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

                )}
              </View>
            )}

            {this.state.readyDisplay == true && (
              <View>
                {this.state.connection_refreshStatus === true && (
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

                      

                      

                      <View >
                        
                        
                        <ScrollView nestedScrollEnabled={true}  stickyHeaderIndices={(Dimensions.get('window').width > 320) && [0]}>
                          <View>
                            <View style={{backgroundColor: '#F2F2F2'}}>
                              <View style={globalStyles.cardContentCalendar}>
                                  <Calendar
                                    items={this.state.items}
                                    extraData={this.state.items}  
                                    selected={new Date}
                                    rowHasChanged={this.rowHasChanged.bind(this)}   
                                    enableSwipeMonths={true}  
                                    onDayPress={async (day) => this.filterEvents( await this.setState({BackgroundDay:  day.dateString}))}
                                    onDayLongPress={ (day) =>this.CreateEvents(this.setState({idnoti : day.dateString}, () => AsyncStorage.setItem('idnoti',JSON.stringify(day.dateString))))}
                                    markingType='multi-dot'
                                    markedDates={this.state.marked}
                                    monthFormat={`MMMM yyyy`}
                                    
                                    
                                    hideExtraDays={false}
                                    style={{
                                      borderRadius: 8,
                                      elevation: 3,
                                      backgroundColor: '#fff',
                                      shadowOffset: { width:1, height:1 },
                                      shadowColor: '#333',
                                      shadowOpacity: 0.3,
                                      shadowRadius: 2,
                                    }}
                                    theme={{
                                      backgroundColor: '#ffffff',
                                      calendarBackground: '#F4FBFE',
                                      calendarBorder: '#b6c1cd',
                                      textSectionTitleColor: '#b6c1cd',
                                      textSectionTitleDisabledColor: '#d9e1e8',
                                      selectedDayBackgroundColor: '#00adf5',
                                      selectedDayTextColor: '#ffffff',
                                      todayTextColor: '#ffffff',
                                      todayBackgroundColor: '#5F9DFF',
                                    
                                      dayTextColor: '#2d4150',
                                      textDisabledColor: '#d9e1e8',
                                      dotColor: '#00adf5',
                                      todayHeight: "100%",
                                      selectedDotColor: '#ffffff',
                                      arrowColor: 'black',
                                      disabledArrowColor: '#d9e1e8',
                                      monthTextColor: '#232159',
                                      indicatorColor: 'blue',
                                      textDayFontWeight: '300',
                                      textMonthFontWeight: 'bold',
                                      textDayHeaderFontWeight: '300',
                                      textDayFontSize: 16,
                                      textMonthFontSize: 16,
                                      textDayHeaderFontSize: 14,
                                      calendarHeight:100,
                                      
                                      'stylesheet.calendar.header': {
                                        header: {
                                          backgroundColor: '#4284FB',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          paddingVertical: 15,
                                          borderTopLeftRadius: 8,
                                          borderTopRightRadius: 8,
                                        },
                                        monthText: {
                                          color: '#fff',
                                          fontWeight: '700',
                                          fontSize: 16,
                                        },
                                        dayHeader: {
                                          textAlign: 'center',
                                          fontWeight: 'bold',
                                          color: 'white',
                                          fontSize: 14,
                                          padding: Platform.OS === 'ios' ? (Platform.isPad === true) ? '4%' : "3%" : (Dimensions.get('window').width >= 414) ? '4%' : "3%",
                                        },
                                        week: {
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                          backgroundColor: '#4284FB',
                                        },
                                        partialWeek: {
                                          backgroundColor: 'gray'
                                        },
                                        
                                      },
                                      'stylesheet.calendar.main': {
                                        container: {
                                            paddingHorizontal: 0,
                                        },
                                        monthView: {
                                            borderBottomLeftRadius: 8,
                                            borderBottomRightRadius: 8
                                        },

                                    },
                                
                                    }}
                                  />
                              </View>

                              <View>
                                <Center rounded="md" mb="2%">          
                                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate('YearCalendar')}}>
                                      <Circle size="40px" bg="#D9D9D9">
                                        <FontAwesome name='angle-double-down' style={{fontSize: 28}}></FontAwesome>
                                      </Circle>
                                    </TouchableOpacity>
                                </Center>
                              </View>
                            </View>
                          </View>
                          <View>
                            <View>

                              {/*Filtro Realizado */}  
                              <View>
                                {this.state.filterEvents == true && (
                                  <View>
                                    {this.state.filterEventsShow.length === 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text><View style={globalStyles.NoEventsCalendar}><Image style={globalStyles.imageNoEventsCalendar} source={require('../assets/img/empty/vacios-homebor-calendario.png')}/></View></Card></View> : this.state.filterEventsShow.map((item) => 
                                      
                                        
                                        <View key={this.state.BackgroundDay+item.id}>
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

                                          <StatusBar style="light" translucent={true} />

                                          <View>
                              
                                            
                                              <View>
                                                
                                                <View>
                                                  <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                                  {item.mail_s != "NULL" ? 
                                                  
                                                  <TouchableOpacity
                                                    onPress={() =>this.studentProfile(
                                                      this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}
                                                    >

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
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}

                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
                                                          {item.agency != 'NULL' && (<Text><Text style={globalStyles.infosubtitleCalendar4}>Agency: </Text><Text style={globalStyles.infosubtitleCalendar3}>{item.agency}</Text></Text>)}
                                                        </Stack>
                                                      </HStack>
                                                    </Stack>
                                                  
                                                  </TouchableOpacity>
                                                    
                                                    
                                                    : 
                                                    <TouchableOpacity
                                                    onPress={this.state.XDAY < item.end ? () =>this._AlertCalendar(
                                                      this.setState({idnoti : item.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.id), console.log(this.state.idnoti)))) : () => Alert.alert('This event passed, you can not modify this.')}
                                                    >
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
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                            {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}

                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                            {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
                                                          </Stack>
                                                        </HStack>
                                                      </Stack>

                                                    </TouchableOpacity>}
                                                    
                                                      
                                                
                                                    </View>
                                                    
                                                </View>
                                                
                            
                                            </View>
                              
                              
                                          </View>

                                        </View>
                                          
                                      
                                    )}
                                  </View>
                                )}
                              </View>

                              {/*No se ha hecho Filtro en esta seccion*/}
                                <View style={globalStyles.CalendarEventsMarginBottoms}>
                                {this.state.filterEvents == false && (
                                  <View>
                                    {!this.state.activeEvent ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text><View style={globalStyles.NoEventsCalendar}><Image style={globalStyles.imageNoEventsCalendar} source={require('../assets/img/empty/vacios-homebor-calendario.png')}/></View></Card></View> : this.state.activeEvent.map((item) => 
                                      <View key={item.id}>
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

                                        <StatusBar style="light" translucent={true} />

                                        <View style={globalStyles.MargintopCalendar}>
                            
                                          
                                            <View>

                                              {item.status == 'Active' ? 
                                              <View>
                                                <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                                {item.mail_s != "NULL" ? 
                                                
                                                <TouchableOpacity
                                                  onPress={() =>this.studentProfile(
                                                    this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}
                                                  >
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
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}

                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
                                                          {item.agency != 'NULL' && (<Text><Text style={globalStyles.infosubtitleCalendar4}>Agency: </Text><Text style={globalStyles.infosubtitleCalendar3}>{item.agency}</Text></Text>)}
                                                        </Stack>
                                                      </HStack>
                                                    </Stack>
                                                  </TouchableOpacity>
                                                  
                                                  
                                                  : 
                                                  <TouchableOpacity
                                                  onPress={() =>this._AlertCalendar(
                                                    this.setState({idnoti : item.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.id), console.log(this.state.idnoti))))}
                                                  >

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
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>In Stay</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay end on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today > new Date(item.start) && item.end != 'NULL' && (<Text style={globalStyles.infosubtitleCalendar3}>{item.end}</Text>)}

                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>For comming</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar4}>Your stay start on:</Text>)}
                                                          {item.start != 'NULL' && this.state.today < new Date(item.start) && (<Text style={globalStyles.infosubtitleCalendar3}>{item.start}</Text>)}
                                                        </Stack>
                                                      </HStack>
                                                    </Stack>

                                                  </TouchableOpacity>}
                                                  
                                                    
                                              
                                                  </View>
                                                  
                                              </View>
                                              : <View></View> 
                                            }
                          
                                          </View>
                            
                            
                                        </View>
                                        
                                      
                                      </View>
                                    )}
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </ScrollView>
                      </View>
                    </View>
                )}
              </View>
            )}
          
        </View>
      </NativeBaseProvider>
    )
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}