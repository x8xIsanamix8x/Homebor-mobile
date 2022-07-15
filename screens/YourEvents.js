import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Text, Image, RefreshControl, Alert, Dimensions} from 'react-native'; 
import {Calendar} from 'react-native-calendars';
import globalStyles from '../styles/global';
import { NativeBaseProvider, Heading, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Spinner } from 'native-base';
import Card from '../shared/card';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";


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

      //Function to create dots dinamically
      this.anotherFunc();
      } else {
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
      }

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

        if(!dateAcc3){
          if(DaySelected != dt.start){
            if(DaySelected != dt.end){
              if(DaySelected != food){
                acc[DaySelected] = {
                  selected: true, 
                  selectedColor: '#827FC4',
                  dots: [{ color : null}]
                }
              }
            }
          }
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
        
    render() {
      
      return (
        <NativeBaseProvider>
          <View>
            {this.state.readyDisplay == false && (
                <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                        <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
                          borderColor: "coolGray.500"
                          }} _light={{
                          borderColor: "coolGray.200"
                          }}>
                            <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                            <Skeleton h="40" />
                        </VStack>
                    </Center>
                  
                  <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                          borderColor: "coolGray.500"
                          }} _light={{
                          borderColor: "coolGray.200"
                          }} p="4">
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
                          <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }} p="4">
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
              <View>
                {this.state.readyDisplay == true && (
                  <View>
                     <View style={globalStyles.cardCalendar}>
                        <View style={globalStyles.cardContentCalendar}>
                            <Calendar
                              items={this.state.items}
                              extraData={this.state.items}  
                              selected={new Date}
                              rowHasChanged={this.rowHasChanged.bind(this)}   
                              enableSwipeMonths={true}  
                              refreshControl={
                                  <RefreshControl
                                    enabled={true}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                    tintColor="purple"
                                    colors={["purple","purple"]}
                                    
                                />
                              }
                              onDayPress={async (day) => this.filterEvents( await this.setState({BackgroundDay:  day.dateString}))}
                              

                              onDayLongPress={day => {
                                this.props.navigation.navigate('MyModal')
                              }}
            
                              markingType='multi-dot'
                              
                              markedDates={this.state.marked}
                              
                              hideExtraDays={false}
                              style={globalStyles.calendarStyle}
                              theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#F4FBFE',
                                textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#00adf5',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#ffffff',
                                todayBackgroundColor: '#CF589D',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#00adf5',
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
                                textDayHeaderFontSize: 16
                              }}
                            />
                        </View>
                      </View>

                      <View style={globalStyles.YoureventsHeight}>
                        <ScrollView nestedScrollEnabled={true}>
                          <NativeBaseProvider>
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

                                      <View>
                                          <View style={globalStyles.NoEventsCalendar}>
                                            <Image style={globalStyles.imageNoInternetCalendar} source={require('../assets/vacios-homebor-antena.png')}/>
                                          </View>
                                          <Heading size='sm'style={ globalStyles.NoInternetCalendar }>There is not internet connection.</Heading>
                                          {this.state.connection_status ?
                                                <View>
                                                    <Text onPress={this.onRefresh} style={globalStyles.TryAgainCalendarnoInternet}> Try Again </Text>
                                                </View>
                                            : 
                                                <View>
                                                    <Text onPress={this.tryAgainNotConnection} style={globalStyles.TryAgainCalendarnoInternet}> Try Again </Text>
                                                </View>
                                          }
                                      </View>
                                  </View>
                                )}

                                <View>
                                  {this.state.connection_refreshStatus == false && (
                                    <View>

                                      {/*Filtro Realizado */}  
                                      <View>
                                        {this.state.filterEvents == true && (
                                          <View>
                                            {this.state.filterEventsShow.length === 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text><View style={globalStyles.NoEventsCalendar}><Image style={globalStyles.imageNoEventsCalendar} source={require('../assets/vacios-homebor-calendario.png')}/></View></Card></View> : this.state.filterEventsShow.map((item) => 
                                             
                                                
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

                                                  <View style={globalStyles.MargintopCalendar}>
                                      
                                                    
                                                      <View>
                                                        
                                                        <Card>
                                                          <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                                          {item.mail_s != "NULL" ? <TouchableOpacity
                                                            onPress={() =>this.studentProfile(
                                                              this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}
                                                            >
                                                          <View style={{backgroundColor: '#232159', marginLeft: '-50%'}} />
                                                            <View style={globalStyles.PaymentHistoryDates}>
                                                            <View style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1 : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2 : item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3 : item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4 : item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5 : item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6 : item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7 : item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8 : item.room_e == "room" ? globalStyles.cardNewEventDesingColorA : globalStyles.show}>
                                                              <View style={globalStyles.cardContent2}>
                                                              <Image
                                                                  source={{ uri: item.photo }}
                                                                  resizeMode="cover"
                                                                  style={item.photo == "http://homebor.com/NULL" ? globalStyles.hideContents : globalStyles.imageCalendarNewDesing}
                                                                ></Image>
                                                                <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                    <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                                    <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                                    <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                                    <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                                    <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                                    <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                                    <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                                    <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                                    <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                                    <Text style={ globalStyles.infosubtitleCalendarNNewDesing}>{item.title}</Text>
                                                                </View>
                                                              </View>
                                                            </View>
                                                            
                                                              
                                                              <View style={globalStyles.calendarStudentArriveview}>
                                                                <View style={globalStyles.cardContent3}>
                                                                  <Text style={globalStyles.infosubtitleCalendar}>Arrive :</Text>
                                                                  <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                                                                </View>
                                                              </View>
                                                              <View style={globalStyles.calendarStudentLeaveview}>
                                                                <View style={globalStyles.cardContent4}>
                                                                  <Text style={globalStyles.infosubtitleCalendar}>Leave :</Text>
                                                                  <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                                                                </View>
                                                              </View>
                                                            
                                                            
                                                            
                                                            </View>
                                                            
                                                  
                                                            
                                                            <View style={globalStyles.calendarAcademyAgencyview}>
                                                              {(Dimensions.get('window').width >= 414) ? 
                                                                <View>
                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                                                                      </View>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                                                                      </View>
                                                                  </View>

                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar2}>{item.academy}</Text>
                                                                      </View>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar2}>{item.agency}</Text>
                                                                      </View>
                                                                  </View>
                                                                </View> 
                                                                : 
                                                                <View>
                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar2}>{item.academy}</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar2}>{item.agency}</Text>
                                                                        </View>
                                                                    </View>
                                                                  
                                                                </View>}
                                                          </View>
                                                            

                                                            <View/>
                                                            </TouchableOpacity>
                                                            
                                                            
                                                            : 
                                                            <TouchableOpacity
                                                            onPress={this.state.XDAY < item.end ? () =>this._AlertCalendar(
                                                              this.setState({idnoti : item.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.id), console.log(this.state.idnoti)))) : () => Alert.alert('This event passed, you can not modify this.')}
                                                            >
                                                            <View style={{backgroundColor: '#232159', marginLeft: '-50%'}} />
                                                            <View style={globalStyles.PaymentHistoryDates}>
                                                            <View style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1createevent : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2createevent : item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3createevent : item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4createevent : item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5createevent : item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6createevent : item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7createevent : item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8createevent : item.room_e == "room" ? globalStyles.cardNewEventDesingColorAcreateevent : globalStyles.show}>
                                                              <View style={globalStyles.cardContent2}>
                                                              <Image
                                                                  source={require('../assets/icon-event.png')}
                                                                  resizeMode="cover"
                                                                  style={globalStyles.imageCalendarNewDesing2}
                                                                ></Image>
                                                                <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                    <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                                    <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                                    <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                                    <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                                    <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                                    <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                                    <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                                    <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                                    <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                                </View>
                                                              </View>
                                                            </View>
                                                            
                                                              
                                                              <View style={globalStyles.calendarStudentArriveview}>
                                                                <View style={globalStyles.cardContent3}>
                                                                  <Text style={globalStyles.infosubtitleCalendar}>Start :</Text>
                                                                  <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                                                                </View>
                                                              </View>
                                                              <View style={globalStyles.calendarStudentLeaveview}>
                                                                <View style={globalStyles.cardContent4}>
                                                                  <Text style={globalStyles.infosubtitleCalendar}>End :</Text>
                                                                  <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                                                                </View>
                                                              </View>
                                                            
                                                            
                                                            
                                                            </View>
                                                            
                                                  
                                                            
                                                            <View style={globalStyles.calendarAcademyAgencyview2}>
                                                              
                                                                <View>
                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar}>Title :</Text>
                                                                        </View>
                                                                    </View>

                                                                    <View style={globalStyles.tableRowReport}>
                                                                        <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                            <Text style={globalStyles.infosubtitleCalendar2}>{item.title}</Text>
                                                                        </View>
                                                                    </View>
                                                                  
                                                                </View>
                                                          </View>
                                                            

                                                            <View/>


                                                            </TouchableOpacity>}
                                                            
                                                              
                                                        
                                                            </View>
                                                            
                                                        </Card>
                                                        
                                    
                                                    </View>
                                      
                                      
                                                  </View>

                                                </View>
                                                  
                                              
                                            )}
                                          </View>
                                        )}
                                      </View>

                                      {/*No se ha hecho Filtro en esta seccion*/}
                                        <View>
                                        {this.state.filterEvents == false && (
                                          <View>
                                            {!this.state.activeEvent ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any event</Text><View style={globalStyles.NoEventsCalendar}><Image style={globalStyles.imageNoEventsCalendar} source={require('../assets/vacios-homebor-calendario.png')}/></View></Card></View> : this.state.activeEvent.map((item) => 
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
                                                      <Card>
                                                        <View style={item.room_e == "room1" ? globalStyles.calendarColor1NewDesing : item.room_e == "room2" ? globalStyles.calendarColor2NewDesing : item.room_e == "room3" ? globalStyles.calendarColor3NewDesing : item.room_e == "room4" ? globalStyles.calendarColor4NewDesing : item.room_e == "room5" ? globalStyles.calendarColor5NewDesing : item.room_e == "room6" ? globalStyles.calendarColor6NewDesing : item.room_e == "room7" ? globalStyles.calendarColor7NewDesing : item.room_e == "room8" ? globalStyles.calendarColor8NewDesing : item.room_e == "room" ? globalStyles.calendarColorANewDesing : globalStyles.show}>
                                                        {item.mail_s != "NULL" ? <TouchableOpacity
                                                          onPress={() =>this.studentProfile(
                                                            this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}
                                                          >
                                                        <View style={{backgroundColor: '#232159', marginLeft: '-50%'}} />
                                                          <View style={globalStyles.PaymentHistoryDates}>
                                                          <View style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1 : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2 : item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3 : item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4 : item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5 : item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6 : item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7 : item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8 : item.room_e == "room" ? globalStyles.cardNewEventDesingColorA : globalStyles.show}>
                                                            <View style={globalStyles.cardContent2}>
                                                            <Image
                                                                source={{ uri: item.photo }}
                                                                resizeMode="cover"
                                                                style={item.photo == "http://homebor.com/NULL" ? globalStyles.hideContents : globalStyles.imageCalendarNewDesing}
                                                              ></Image>
                                                              <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                  <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                                  <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                                  <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                                  <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                                  <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                                  <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                                  <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                                  <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                                  <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                                  <Text style={ globalStyles.infosubtitleCalendarNNewDesing}>{item.title}</Text>
                                                              </View>
                                                            </View>
                                                          </View>
                                                          
                                                            
                                                            <View style={globalStyles.calendarStudentArriveview}>
                                                              <View style={globalStyles.cardContent3}>
                                                                <Text style={globalStyles.infosubtitleCalendar}>Arrive :</Text>
                                                                <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                                                              </View>
                                                            </View>
                                                            <View style={globalStyles.calendarStudentLeaveview}>
                                                              <View style={globalStyles.cardContent4}>
                                                                <Text style={globalStyles.infosubtitleCalendar}>Leave :</Text>
                                                                <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                                                              </View>
                                                            </View>
                                                          
                                                          
                                                          
                                                          </View>
                                                          
                                                
                                                          
                                                          <View style={globalStyles.calendarAcademyAgencyview}>
                                                            {(Dimensions.get('window').width >= 414) ? 
                                                              <View>
                                                                <View style={globalStyles.tableRowReport}>
                                                                    <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                        <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                                                                    </View>
                                                                    <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                        <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                                                                    </View>
                                                                </View>

                                                                <View style={globalStyles.tableRowReport}>
                                                                    <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                        <Text style={globalStyles.infosubtitleCalendar2}>{item.academy}</Text>
                                                                    </View>
                                                                    <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                        <Text style={globalStyles.infosubtitleCalendar2}>{item.agency}</Text>
                                                                    </View>
                                                                </View>
                                                              </View> 
                                                              : 
                                                              <View>
                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                                                                      </View>
                                                                  </View>

                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar2}>{item.academy}</Text>
                                                                      </View>
                                                                  </View>

                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                                                                      </View>
                                                                  </View>

                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar2}>{item.agency}</Text>
                                                                      </View>
                                                                  </View>
                                                                
                                                              </View>}
                                                        </View>
                                                          

                                                          <View/>
                                                          </TouchableOpacity>
                                                          
                                                          
                                                          : 
                                                          <TouchableOpacity
                                                          onPress={() =>this._AlertCalendar(
                                                            this.setState({idnoti : item.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.id), console.log(this.state.idnoti))))}
                                                          >
                                                          <View style={{backgroundColor: '#232159', marginLeft: '-50%'}} />
                                                          <View style={globalStyles.PaymentHistoryDates}>
                                                          <View style={item.room_e == "room1" ? globalStyles.cardNewEventDesingColor1createevent : item.room_e == "room2" ? globalStyles.cardNewEventDesingColor2createevent : item.room_e == "room3" ? globalStyles.cardNewEventDesingColor3createevent : item.room_e == "room4" ? globalStyles.cardNewEventDesingColor4createevent : item.room_e == "room5" ? globalStyles.cardNewEventDesingColor5createevent : item.room_e == "room6" ? globalStyles.cardNewEventDesingColor6createevent : item.room_e == "room7" ? globalStyles.cardNewEventDesingColor7createevent : item.room_e == "room8" ? globalStyles.cardNewEventDesingColor8createevent : item.room_e == "room" ? globalStyles.cardNewEventDesingColorAcreateevent : globalStyles.show}>
                                                            <View style={globalStyles.cardContent2}>
                                                            <Image
                                                                source={require('../assets/icon-event.png')}
                                                                resizeMode="cover"
                                                                style={globalStyles.imageCalendarNewDesing2}
                                                              ></Image>
                                                              <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                  <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 1</Text>
                                                                  <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 2</Text>
                                                                  <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 3</Text>
                                                                  <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 4</Text>
                                                                  <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 5</Text>
                                                                  <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 6</Text>
                                                                  <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 7</Text>
                                                                  <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Room 8</Text>
                                                                  <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendarNewDesing : globalStyles.hideContents}>Activity</Text>
                                                              </View>
                                                            </View>
                                                          </View>
                                                          
                                                            
                                                            <View style={globalStyles.calendarStudentArriveview}>
                                                              <View style={globalStyles.cardContent3}>
                                                                <Text style={globalStyles.infosubtitleCalendar}>Start :</Text>
                                                                <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                                                              </View>
                                                            </View>
                                                            <View style={globalStyles.calendarStudentLeaveview}>
                                                              <View style={globalStyles.cardContent4}>
                                                                <Text style={globalStyles.infosubtitleCalendar}>End :</Text>
                                                                <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                                                              </View>
                                                            </View>
                                                          
                                                          
                                                          
                                                          </View>
                                                          
                                                
                                                          
                                                          <View style={globalStyles.calendarAcademyAgencyview2}>
                                                            
                                                              <View>
                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar}>Title :</Text>
                                                                      </View>
                                                                  </View>

                                                                  <View style={globalStyles.tableRowReport}>
                                                                      <View style={globalStyles.tableColumnTotalsCalendar}>
                                                                          <Text style={globalStyles.infosubtitleCalendar2}>{item.title}</Text>
                                                                      </View>
                                                                  </View>
                                                                
                                                              </View>
                                                        </View>
                                                          

                                                          <View/>


                                                          </TouchableOpacity>}
                                                          
                                                            
                                                      
                                                          </View>
                                                          
                                                      </Card>
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
                                  )}
                                </View>

                              </View>
                          </NativeBaseProvider>
                        </ScrollView>
                      </View>
                </View>
                )}
              </View>
          </View>
        </NativeBaseProvider>
        
      );
    }
  
    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }
  
    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  }