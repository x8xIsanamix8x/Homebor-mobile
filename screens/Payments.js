import React, { Component, useState} from 'react';
import { View, Image, ImageBackground, RefreshControl, TouchableHighlight, Alert, Platform, Dimensions } from 'react-native';
import { NativeBaseProvider, Text, Spinner, Heading, Icon, Input, Stack, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';

import globalStyles from '../styles/global';

import NetInfo from "@react-native-community/netinfo";

export default class Payments extends Component {
  NetInfoSubscription = null;

  constructor(props) {
    super(props);
      this.state = {
        //Variables
        email : '',
        perm : false,
        info : [],
        refreshing: false,
        filterP : 'No',
        db1 : '',
        db2 : '',
        marked : [],

        payment1 : -1,
        payments1 : 0,

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
        
    //Get profile
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})


    if(this.state.connection_status == true) {
      //Get Reports list
      let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
      this.setState({ info : reportslist, payments : reportslist[0].reportslist})
      this.anotherFunc();
    
    }else{
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
    }

    //Refresh function when open this screen
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
      this.onActive()
      this.onRefresh()
    });

    this._onFocusListener = this.props.navigation.addListener('blur', () => {
      this.onRelease()
    });
  }

  anotherFunc = () => {
    if(this.state.payments != undefined){
      let nextDay2 = this.state.payments
      let obj = nextDay2.reduce((acc, dt) => {

      const dateAcc = acc[dt.date]
          
      if (!dateAcc) {
          acc[dt.date] = {
              paymentsinfo: [{ 
                date: dt.date, 
                date_p : dt.date_p,
                end : dt.end,
                id_p : dt.id_p,
                l_name_s : dt.l_name_s,
                name_s : dt.name_s,
                photo_s : dt.photo_s,
                price : dt.price,
                room_p : dt.room_p,
                start : dt.start,
                status_p : dt.status_p,
                week : dt.week,
              }]
          }
      } else {
        acc[dt.date].paymentsinfo.push({ date: dt.date, date_p : dt.date_p, end : dt.end, id_p : dt.id_p, l_name_s : dt.l_name_s, name_s : dt.name_s, photo_s : dt.photo_s, price : dt.price, room_p : dt.room_p, start : dt.start, status_p : dt.status_p, week : dt.week,})
      }

      return acc }, {});
      this.setState({ marked : obj, readyDisplay : true, loading : false, connection_refreshStatus: false});

    } else {
      this.setState({readyDisplay : true, loading : false, connection_refreshStatus: false});
    }
    
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.state.payment1 !== this.state.payments1){
      if(this.state.connection_status == true) {
          if (prevState.info !== this.state.info) {
            if(this.state.filterP == 'No'){
              let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
              this.setState({ info : reportslist, loading : false, payments : reportslist[0].reportslist})
              this.anotherFunc();
            }else {
              let reportslist = await api.getPaymentsFilterlist(this.state.email, this.state.filterP, this.state.db1, this.state.db2)
              this.setState({ info : reportslist, loading : false, readyDisplay : true,})
            }
          }   
        }
    }
  }

  //Function to run or stop the component did update
  onActive = () => { this.setState({ payment1 : -1, payments1 : 0 }) }
        
  onRelease = () => { this.setState({ payment1 : 0, payments1 : 0 }) }

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
      this.setState({ filterP : 'No', db1 : '' , db2 : ''});
      
      //Get Reports list
      let reportslist = await api.getPaymentslist(this.state.email, this.state.filterP)
      this.setState({ info : reportslist, loading : false, connection_refreshStatus: false, payments : reportslist[0].reportslist})

      this.anotherFunc();
    } else {
      this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
    }
  }

  //Function to get date for the filter
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

  //Function to call the filter
  filterpayments = async () => {
    if (this.state.db1 == '' || this.state.db2 == '') {
      Alert.alert('All fields are required')
    }else {
      this.setState({ refreshing: true, filterP : 'Yes' });
        this.refreshfilter().then(() => {
            this.setState({ refreshing: false, filterP : 'Yes'});
        });
    }
  }

  refreshfilter = async() => {
    if(this.state.connection_status == true) {
    this.setState({ filterP : 'Yes' });
    
    //Get Reports list
    let reportslist = await api.getPaymentsFilterlist(this.state.email, this.state.filterP, this.state.db1, this.state.db2)
    this.setState({ info : reportslist, loading : false, payments : reportslist[0].reportslist, connection_refreshStatus: false})
    

    this.anotherFunc();
    } else {
      this.setState({connection_refreshStatus: true, loading : false})
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
            <View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <VStack flex="3" space="4">
                            <Skeleton startColor="indigo.300" />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                          <VStack flex="3" space="4">
                              <Skeleton.Text />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <VStack flex="3" space="4">
                            <Skeleton startColor="indigo.300" />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                          <VStack flex="3" space="4">
                              <Skeleton.Text />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                          <VStack flex="3" space="4">
                              <Skeleton.Text />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              {Dimensions.get('window').width >= 414 && (
                <View>
                  <View style={globalStyles.skeletonMarginTop}>
                      <Center w="100%">
                          <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                          borderColor: "coolGray.500"
                          }} _light={{
                          borderColor: "coolGray.200"
                          }} p="4">
                              <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                              <VStack flex="3" space="4">
                                  <Skeleton.Text />
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
                            <Text color="esmerald.600" fontWeight="medium">You are connected</Text>
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
                      style={globalStyles.imageNotInternet}
                    />
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
                      resizeMode="cover"
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
                  <ImageBackground source={require('../assets/img/backgrounds/payments.jpg')} style={globalStyles.ImageBackgroundNoti}>
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

                      <View>
                        <View style={globalStyles.PaymentHistoryDates}>
                          <Stack  style={globalStyles.stackLeftPayments}>
                            <Input
                                isReadOnly={true}
                                InputLeftElement={
                                    <TouchableOpacity
                                    style={globalStyles.PaymentHistoryRLelements}
                                    onPress={this.datepicker}>
                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                    </TouchableOpacity>
                                }
                                variant="rounded"
                                size="md"
                                w="43%"
                                style={globalStyles.ReportFeedbackInput3}
                                placeholder="From"
                                value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                onChangeText={ (db1) => this.setState({db1}) }
                            />
                          </Stack>

                          <Stack  style={globalStyles.stackRightPayments}>
                            <Input
                                isReadOnly={true}
                                InputRightElement={
                                    <TouchableOpacity
                                    style={globalStyles.PaymentHistoryRLelements}
                                    onPress={this.datepicker2}>
                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                    </TouchableOpacity>
                                }
                                variant="rounded"
                                size="md"
                                w="43%"
                                style={globalStyles.ReportFeedbackInput3}
                                placeholder="To"
                                value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                onChangeText={ (db2) => this.setState({db2}) }
                            />
                          </Stack>

                          <Stack  style={globalStyles.stackSearchPayments}>

                            {this.state.connection_status ? 
                              <View>
                                <TouchableOpacity
                                    onPress={() => this.filterpayments()}>
                                    <Image                     
                                        resizeMode="cover"
                                        source={require('../assets/img/Icons/buscador.png')}
                                        style={globalStyles.PaymentHistorySearchelements}
                                    />
                                </TouchableOpacity>
                              </View> 
                            :
                              <View>
                                <TouchableOpacity
                                    onPress={() => this.noInternetConnection()}>
                                    <Image                     
                                        resizeMode="cover"
                                        source={require('../assets/img/Icons/buscador.png')}
                                        style={globalStyles.PaymentHistorySearchelements}
                                    />
                                </TouchableOpacity>
                              </View>
                            }

                          </Stack>
                        </View>
                        { show && Platform.OS != 'ios' && 
                          <DateTimePicker 
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate} />
                        }
                        { show && Platform.OS === 'ios' && 
                          <View>
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
                        { show2 && Platform.OS != 'ios' && 
                          <DateTimePicker 
                            value={date2}
                            mode={mode2}
                            is24Hour={true}
                            display="default"
                            onChange={this.setDate2} />
                        }
                        { show2 && Platform.OS === 'ios' && 
                          <View>
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
                      </View>

                      
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
                          <View style={globalStyles.BottomMarginFlatlist}>
                            {Object.keys(this.state.marked).length == 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have payments on this dates</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="cover" source={require('../assets/img/empty/vacios-homebor-pagos.png')} style={globalStyles.imageNotInternet}/></View></View> : Object.keys(this.state.marked).map(date => (
                              <View key={date} style={globalStyles.ReportFeedbackMargins}>
                                <Card>
                                  <View style={globalStyles.inlineData}>
                                      <Text style={globalStyles.infosubtitle}>{date}</Text>
                                  </View>
                                </Card>

                                <View>
                                  {this.state.marked[date].paymentsinfo.map(reportslist => 
                                    <View key={reportslist.id_p}>
                                      <Card>
                                        <HStack>
                                          <Center>
                                            <Avatar size="lg" bg="#232159" style={{borderWidth: 2, backgroundColor : '#fff'}} source={ reportslist.photo_s != "NULL" && { uri: `http://homebor.com/${reportslist.photo_s}` }}>{reportslist.name_s.toUpperCase().charAt(0)}</Avatar>
                                          </Center>
                                            <Center ml='5%' mr='5%' w='40%'>
                                              <VStack>
                                                <Text style={globalStyles.ReportInitBoldText}>{reportslist.name_s} {reportslist.l_name_s}</Text>
                                                <HStack>
                                                  <Text style={globalStyles.ReportInitBoldText}>Room: </Text>
                                                  {reportslist.room_p == 'room1' ? <Text style={globalStyles.PaymentText}>1</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room2' ? <Text style={globalStyles.PaymentText}>2</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room3' ? <Text style={globalStyles.PaymentText}>3</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room4' ? <Text style={globalStyles.PaymentText}>4</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room5' ? <Text style={globalStyles.PaymentText}>5</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room6' ? <Text style={globalStyles.PaymentText}>6</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room7' ? <Text style={globalStyles.PaymentText}>7</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                  {reportslist.room_p == 'room8' ? <Text style={globalStyles.PaymentText}>8</Text> : <Text style={globalStyles.hideContents}></Text>}
                                                </HStack>
                                                <HStack>
                                                  <Text style={globalStyles.ReportInitBoldText}>Weeks: </Text>
                                                  <Text style={globalStyles.PaymentText}>{reportslist.week}</Text>
                                                </HStack>
                                              </VStack>
                                            </Center>
                                            <Center w='30%'>
                                              <VStack>
                                                <Text style={globalStyles.ReportInitBoldText}>CAD$ {reportslist.price}</Text>
                                                <Text style={globalStyles.ReportInitBoldText}>{reportslist.status_p}</Text>
                                              </VStack>
                                            </Center>
                                        </HStack>
                                      </Card>
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