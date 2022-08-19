import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, Platform, ScrollView, Text, Alert, Image, TouchableHighlight, RefreshControl, Dimensions} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Icon, FormControl, Heading, Stack, Input, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Button } from 'native-base';
import Card from '../shared/card';

import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import {Picker} from '@react-native-picker/picker';

import NetInfo from "@react-native-community/netinfo";

export default class ModalScreenCalendar extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
          //Variables
      email : '',
      perm : false,
      newE : 'Yes',
      info : [],
      refreshing: false,
      title : 'NULL', 
      roome : 'NULL',
      db1 : 'NULL', 
      db2 : 'NULL',
          
      //Calendars DATE PICKERS
      date: new Date(),
      mode: 'date',
      show: false,
      date2: new Date(),
      mode2: 'date2',
      show2: false,

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
        
    //Get profile data
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    if(this.state.connection_status == true) {
      //Get student data
      let room = await api.getRoomevents(this.state.email, this.state.newE)
      this.setState({ info : room.data, connection_refreshStatus: false, rooms: room.data[0].room, idm : room.data[0].id_m, loading : false, readyDisplay : true})

      //Get date from calendar
      let idnoti = await AsyncStorage.getItem('idnoti')
      idnoti = JSON.parse(idnoti)
      this.setState({ idnoti : idnoti, db1: this.state.idnoti})
      this.setState({ db1: this.state.idnoti})

    }else{
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
    }

    //Autorefresh when focus the screen
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
      this.onRefresh()
    });

  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });

    const dateY = new Date(date.setDate(date.getDate()));
    let YDAY= dateY.getMonth()<9 ? dateY.getDate()<=9 ? `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-${dateY.getDate()}` : dateY.getDate()<=9 ? `${dateY.getFullYear()}-${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-${dateY.getMonth() + 1}-${dateY.getDate()}`
    this.setState({db1 : YDAY})
    
  }

  closedatepickerIOS = () => {
    this.setState({
      show: Platform.OS === 'ios' ? false : false,
    });

  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  setDate2 = (event, date2) => {
    date2 = date2 || this.state.date2;

    this.setState({
      show2: Platform.OS === 'ios' ? true : false,
      date2,
    });

    const dateY2 = new Date(date2.setDate(date2.getDate()));
    let YDAY2= dateY2.getMonth()<9 ? dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-${dateY2.getDate()}` : dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-${dateY2.getDate()}`
    this.setState({db2 : YDAY2})
    
  }

  closedatepickerIOS2 = () => {
    this.setState({
      show2: Platform.OS === 'ios' ? false : false,
    });

  }

  show2 = mode2 => {
    this.setState({
      show2: true,
      mode2,
    });
  }

  datepicker2 = () => {
    this.show2('date');
  }

  modalsave = async () => {
    if(this.state.title ==  'NULL' || this.state.roome == 'NULL' || this.state.db1 == 'NULL' || this.state.db2 == 'NULL'){
      Alert.alert('All fields are required')
    } else {
      if(this.state.db1 < this.state.dateToday){
        Alert.alert("You can't create an event started before today.")
      } else {
        if(this.state.db2 < this.state.dateToday){
          Alert.alert("You can't end your event before today.")
        } 
        else {
          if(this.state.db2 < this.state.db1){
            Alert.alert("You can't create and event that end in a date before the start.")
          } 
          else {
            api.addNewevent(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE)
            setTimeout(() => {
                this.props.navigation.navigate('Calendar2', { screen: 'Events' })
            }, 2000)
          }
        }
      }
    }
  }

  goback = async () => {
      setTimeout(() => {
        this.props.navigation.navigate('Calendar2', { screen: 'Events' })
      }, 1000)
  }

  //Refresh call function
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
  }

  //Refresh function
  refresh = async() => {
    if(this.state.connection_status == true) {
      //Get student data
      let room = await api.getRoomevents(this.state.email, this.state.newE)
      this.setState({ info : room.data, connection_refreshStatus: false, rooms: room.data[0].room, idm : room.data[0].id_m, roome : 'NULL', title : 'NULL', db2 : 'NULL'})

      //Get date from calendar
      let idnoti = await AsyncStorage.getItem('idnoti')
      idnoti = JSON.parse(idnoti)
      this.setState({ idnoti : idnoti})
      this.setState({ db1: this.state.idnoti, loading : false, readyDisplay : true})
    } else {
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
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

    let { show, date, mode } = this.state;
    let { show2, date2, mode2 } = this.state; 

    return (
      <NativeBaseProvider>
        <StatusBar style="light" translucent={true} />
        <View>
          {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
              <Center w="100%">
                <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                  <VStack w="90%" space={8} rounded="md" p="4">
                    <Skeleton.Text px="5" />
                    <Skeleton.Text px="5" />
                    <Skeleton.Text px="5" />
                    <Skeleton.Text px="5" />
                    {Dimensions.get('window').width >= 414 && (
                        <Skeleton.Text px="5" />                                
                    )}
                  </VStack>
                  <HStack w="80%" space={2} rounded="md" >
                    <Skeleton mb="3" w="50%" rounded="20" startColor="indigo.200" />
                    <Skeleton mb="3" w="50%" rounded="20" startColor="purple.200" />
                  </HStack>
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
                      resizeMode="cover"
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

                      <ScrollView 
                        nestedScrollEnabled={true} 
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false}
                        refreshControl={
                          <RefreshControl
                            enabled={true}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            tintColor="purple"
                            colors={["purple","purple"]}
                            
                        />
                      }>
                        <View style={globalStyles.containerNewEvent}>
                          <Card>
                            <Stack inlineLabel last style={globalStyles.input}>
                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Event Name</Text></FormControl.Label>
                                <Input 
                                      placeholder='e.g. Clean Room 1'
                                      onChangeText={ (title) => this.setState({title}) }
                                      value={this.state.title == 'NULL' ? '' : this.state.title}
                                      style={ globalStyles.inputedit}
                                  />
                            </Stack>
                            <Stack inlineLabel last style={globalStyles.input}>
                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Room</Text></FormControl.Label>
                            </Stack> 
                                <View style={globalStyles.pickerviewModalRAddEvent8}>
                                  <Picker
                                      style={globalStyles.pickerModalR}
                                      itemStyle={{height: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 150 : 100 : 100, fontSize: (Platform.OS === 'ios') ? (Platform.isPad === true) ? 22 : 18 : 18}}
                                      selectedValue={this.state.roome == 'NULL' ? "NULL" : this.state.roome}
                                      onValueChange={(roome) => this.setState({roome})}>
                                          <Picker.Item label="Select" value="NULL" />
                                          {this.state.rooms >= 1 && (<Picker.Item style={this.state.rooms >= 1 ? globalStyles.show : globalStyles.hideContents} label="Room 1" value="room1" />)}
                                          {this.state.rooms >= 2 && (<Picker.Item style={this.state.rooms >= 2 ? globalStyles.show : globalStyles.hideContents} label="Room 2" value="room2" />)}
                                          {this.state.rooms >= 3 && (<Picker.Item style={this.state.rooms >= 3 ? globalStyles.show : globalStyles.hideContents} label="Room 3" value="room3" />)}
                                          {this.state.rooms >= 4 && (<Picker.Item style={this.state.rooms >= 4 ? globalStyles.show : globalStyles.hideContents} label="Room 4" value="room4" />)}
                                          {this.state.rooms >= 5 && (<Picker.Item style={this.state.rooms >= 5 ? globalStyles.show : globalStyles.hideContents} label="Room 5" value="room5" />)}
                                          {this.state.rooms >= 6 && (<Picker.Item style={this.state.rooms >= 6 ? globalStyles.show : globalStyles.hideContents} label="Room 6" value="room6" />)}
                                          {this.state.rooms >= 7 && (<Picker.Item style={this.state.rooms >= 7 ? globalStyles.show : globalStyles.hideContents} label="Room 7" value="room7" />)}
                                          {this.state.rooms >= 8 && (<Picker.Item style={this.state.rooms >= 8 ? globalStyles.show : globalStyles.hideContents} label="Room 8" value="room8" />)}
                                          <Picker.Item label="Other Activity" value="room" /> 
                                  </Picker> 
                                </View>
                            <Stack inlineLabel last style={globalStyles.input}>
                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Init Date</Text></FormControl.Label>
                                <Input
                                    isReadOnly={true}
                                    InputRightElement={
                                        <TouchableOpacity
                                        style={globalStyles.PaymentHistoryRLelements}
                                        onPress={this.datepicker}>
                                        <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                        </TouchableOpacity>
                                    }
                                    size="md"
                                    style={globalStyles.ReportFeedbackInput3}
                                    value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                    onChangeText={ (db1) => this.setState({db1}) }
                                />
                            </Stack>
                              { show && Platform.OS != 'ios' && <DateTimePicker 
                                  value={date}
                                  mode={mode}
                                  is24Hour={true}
                                  display="default"
                                  onChange={this.setDate} />
                              }
                              { show && Platform.OS === 'ios' && 
                                <View style={globalStyles.viewCalendarAddNewEvent}>
                                  <Card style={globalStyles.shadowbox}>
                                      <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                      <DateTimePicker
                                          textColor="black"
                                          value={date}
                                          mode={mode}
                                          is24Hour={true}
                                          display="spinner"
                                          onChange={this.setDate} />

                                      <TouchableHighlight
                                      style={globalStyles.StudentopenButtonReply}
                                      onPress={this.closedatepickerIOS}>
                                          <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                      </TouchableHighlight>
                                  </Card>
                                </View>
                              }
                            <Stack inlineLabel last style={globalStyles.input}>
                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>End Date</Text></FormControl.Label>
                              <Input
                                  isReadOnly={true}
                                  InputRightElement={
                                      <TouchableOpacity
                                      style={globalStyles.PaymentHistoryRLelements}
                                      onPress={this.datepicker2}>
                                      <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                      </TouchableOpacity>
                                  }
                                  size="md"
                                  style={globalStyles.ReportFeedbackInput3}
                                  value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                  onChangeText={ (db2) => this.setState({db2}) }
                              />
                            </Stack>
                            <View style={globalStyles.PaymentHistoryDates}>   
                                <Stack  style={globalStyles.hideWidthAddnewevet}>
                                    
                                </Stack>
                                <Stack  style={globalStyles.hideWidthAddnewevet2}>
                                    
                                </Stack>
                              </View>
                                { show2 && Platform.OS != 'ios' && <DateTimePicker 
                                    value={date2}
                                    mode={mode2}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.setDate2} />
                                }
                                { show2 && Platform.OS === 'ios' && 
                                            <View style={globalStyles.viewCalendarAddNewEvent}>
                                            <Card style={globalStyles.shadowbox}>   
                                                <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                <DateTimePicker
                                                    textColor="black"
                                                    value={date2}
                                                    mode={mode2}
                                                    is24Hour={true}
                                                    display="spinner"
                                                    onChange={this.setDate2} />

                                                <TouchableHighlight
                                                style={globalStyles.StudentopenButtonReply}
                                                onPress={this.closedatepickerIOS2}>
                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                </TouchableHighlight>
                                            </Card>
                                            </View>
                                }
                              <View style={(Platform.OS === 'ios') ? {marginTop: '5%'} : {marginTop: '5%'}}/>

                                <View>
                                  <Center alignItems="center" width="95%">
                                    <HStack space="10" alignItems="center">
                                      <Center width="42%">
                                        <Button
                                        success
                                        bordered
                                        onPress={this.goback}
                                        style={globalStyles.notifyModalCAddEvent2NativeBase}>
                                          <Text style={globalStyles.botonTexto}> Close </Text>
                                        </Button>
                                      </Center>
                                      <Center width="42%">
                                        <Button
                                        success
                                        bordered
                                        onPress={this.state.connection_status ? this.modalsave : this.noInternetConnection}
                                        style={globalStyles.notifyModalRAddEvent2NativeBase}>
                                          <Text style={globalStyles.botonTexto}> Save </Text>
                                        </Button>
                                      </Center>
                                    </HStack>
                                  </Center>								
                                </View>
                              
                              
                              <View style={(Platform.OS === 'ios') ? {marginBottom: '2%'} : {marginBottom: '10%'}}/>
                          </Card>
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
}