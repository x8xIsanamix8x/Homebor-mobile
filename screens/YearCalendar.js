import React, {Component, useState} from 'react'; 
import {View, Text, Image, RefreshControl, Alert,} from 'react-native'; 
import {CalendarList} from 'react-native-calendars';
import globalStyles from '../styles/global';
import { NativeBaseProvider, Heading, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Spinner } from 'native-base';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class YearCalendar extends Component {
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

  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange,)
    
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
      this.setState({ mfirstd : mday.notification})
      

      let profile = await api.getProfile(this.state.email,this.state.perm)
      this.setState({ info : profile.data[0].mail_h})

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
        this.setState({ mfirstd : mday.notification, connection_refreshStatus: false})

        

          let nextDay = this.state.mfirstd
          let obj = nextDay.reduce((acc, dt) => {
      
            const dateAcc = acc[dt.start]
            const dateAcc2 = acc[dt.end]
          
            if (!dateAcc) {
              acc[dt.start] = {
                periods: [{ startingDay: true, endingDay: false, color : dt.color}]
              }
            } else {
              acc[dt.start].periods.push({ startingDay: true, endingDay: false, color : dt.color})
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
                  periods: [{ startingDay: false, endingDay: false, color : dt.color}]
                }
              } else {
                acc[food].periods.push({ startingDay: false, endingDay: false, color : dt.color})
              }

              
          });

          if (!dateAcc2) {
            acc[dt.end] = {
              periods: [{ startingDay: false, endingDay: true, color : dt.color}]
            }
          } else {
            acc[dt.end].periods.push({ startingDay: false, endingDay: true, color : dt.color})
          }

          return acc
        }, {});
        this.setState({ marked : obj, readyDisplay : true});

        

        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda })
    } else {
      this.setState({connection_refreshStatus: true, readyDisplay : true})
    }
  }

  anotherFunc = () => {
    let nextDay = this.state.mfirstd
    let obj = nextDay.reduce((acc, dt) => {
  
      const dateAcc = acc[dt.start]
      const dateAcc2 = acc[dt.end]

      
      
    
      if (!dateAcc) {
        acc[dt.start] = {
          periods: [{ startingDay: true, endingDay: false, color : dt.color}]
        }
      } else {
        acc[dt.start].periods.push({ startingDay: true, endingDay: false, color : dt.color})
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
            periods: [{ startingDay: false, endingDay: false, color : dt.color}]
          }
        } else {
          acc[food].periods.push({ startingDay: false, endingDay: false, color : dt.color})
        }

        
      });

      if (!dateAcc2) {
        acc[dt.end] = {
          periods: [{ startingDay: false, endingDay: true, color : dt.color}]
        }
      } else {
        acc[dt.end].periods.push({ startingDay: false, endingDay: true, color : dt.color})
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
          {text: 'Yes', onPress: () => this.props.navigation.navigate('ModalUpdate')},
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
            <View style={globalStyles.skeletonMarginTop}>
              <Center w="100%">
                  <VStack w="90%" h="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }}>
                      <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                      <Skeleton h="100%"/>
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

                    <View style={globalStyles.cardCalendar2}>
                      <View style={globalStyles.cardContentCalendar2}>
                        <CalendarList
                          items={this.state.items}
                          extraData={this.state.items}  
                          selected={new Date}
                          rowHasChanged={this.rowHasChanged.bind(this)}     
                          refreshControl={
                              <RefreshControl
                                enabled={true}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                                tintColor="purple"
                                colors={["purple","purple"]}
                                
                            />
                          }
                          onDayPress={day => {
                            console.log('selected day', day);
                          }}
                          
                          onDayLongPress={day => {
                            this.props.navigation.navigate('MyModal')
                          }}
              
                          markingType='multi-period'
                          
                          markedDates={this.state.marked}
              
                          hideExtraDays={false}
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
                        >
                        </CalendarList>
                      </View>
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

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}