import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, Platform, Text, Alert, TouchableHighlight, RefreshControl, Dimensions} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Icon, FormControl, Stack, Input, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Button } from 'native-base';
import Card from '../shared/card';
import { FlatList } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Picker} from '@react-native-picker/picker';

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class ModalUpdate extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
      //Variables
      email : '',
      perm : false,
      newE : 'No',
      info : [],
      refreshing: false,
      title : 'NULL', 
      roome : 'NULL',
      db1 : 'NULL', 
      db2 : 'NULL',
      update : 'Yes',
      delete : 'Yes',
          
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
      //Get student data from id noti
      let idnoti = await AsyncStorage.getItem('idnoti')
      idnoti = JSON.parse(idnoti) 
      this.setState({ idnoti : idnoti})

      //Get student data
      let room = await api.getRoomevents2(this.state.email, this.state.newE, this.state.idnoti)
      this.setState({ info : room.data, rooms: room.data[0].room, title : room.data[0].title, db1: room.data[0].start, db2: room.data[0].end, idm: room.data[0].id_m, roome : room.data[0].room_e, loading : false})

      const dateY3 = new Date();
      let YDAY3= dateY3.getMonth()<9 ? dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-${dateY3.getDate()}` : dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-${dateY3.getDate()}`
      this.setState({dateToday : YDAY3, readyDisplay : true})
    } else {
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
    }

        //Autorefresh when focus the screen
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
      this.setState({readyDisplay : false})
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
    if(this.state.db1 < this.state.dateToday){
      Alert.alert("You can't create an event started before today.")
    } else {
      if(this.state.db2 < this.state.dateToday){
        Alert.alert("You can't end your event before today.")
      } 
      else {
        if(this.state.db2 < this.state.db1){
          Alert.alert("You can't create and event that end in a date before the start.")
        } else {
          api.addNeweventEdit(this.state.title, this.state.roome, this.state.db1, this.state.db2, this.state.email, this.state.idm, this.state.newE,  this.state.idnoti, this.state.update)
          setTimeout(() => {
              this.props.navigation.navigate('Calendar2')
          }, 2000)
        }
      }
    }
  }

  modalalert = async () => {
    Alert.alert(
        'Do you want to delete this event?',
        'Important!, if this event is erased the action will not undone',
        [        
          {text: 'Yes', onPress: () => {console.log(this.state.idnoti)
            api.addNeweventDelete(this.state.idnoti)
            setTimeout(() => {
                this.props.navigation.navigate('Calendar2')
            }, 2000)}},
          {text: 'No', onPress: () => console.log('Cancel')},
        ],
        { cancelable: true }
      )
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
      
      //Get profile data
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    //Get student data from id noti
    let idnoti = await AsyncStorage.getItem('idnoti')
    idnoti = JSON.parse(idnoti)
    this.setState({ idnoti : idnoti})

    //Get student data
    let room = await api.getRoomevents2(this.state.email, this.state.newE, this.state.idnoti)
    this.setState({ info : room.data, rooms: room.data[0].room, title : room.data[0].title, db1: room.data[0].start, db2: room.data[0].end, idm: room.data[0].id_m, roome : room.data[0].room_e})

    const dateY3 = new Date();
    let YDAY3= dateY3.getMonth()<9 ? dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-${dateY3.getDate()}` : dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-${dateY3.getDate()}`
    this.setState({dateToday : YDAY3, loading : false, readyDisplay : true})

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
                            <View style={globalStyles.containerNewEvent}>
                              <Card>
                                <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Event Name</Text></FormControl.Label>
                                    <Input 
                                          defaultValue={item.title == 'NULL' ? '' : item.title}
                                          placeholder='e.g. Clean Room 1'
                                          onChangeText={ (title) => this.setState({title}) }
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
                                          selectedValue={this.state.roome == 'NULL' ? "room1" : this.state.roome}
                                          onValueChange={(roome) => this.setState({roome})}>
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
                                                  onPress={() => this.closedatepickerIOS()}>
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
                                                            onPress={() => this.closedatepickerIOS2()}>
                                                                <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                            </TouchableHighlight>
                                                        </Card>
                                                        </View>
                                            }

                                            <View>
                                              <Center alignItems="center" width="95%">
                                                <HStack space="10" alignItems="center">
                                                  <Center width="45%">
                                                    <Button
                                                    success
                                                    bordered
                                                    onPress={this.state.connection_status ? this.modalalert : this.noInternetConnection}
                                                    style={globalStyles.notifyModalCAddEvent2NativeBase}>
                                                      <Text style={globalStyles.botonTexto}> Delete </Text>
                                                    </Button>
                                                  </Center>
                                                  <Center width="45%">
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
                              </Card>
                            </View>
                          </View>
                        )} />
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
