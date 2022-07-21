import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, ScrollView, StyleSheet, Text, Image, ImageBackground, RefreshControl, Modal, Alert, TouchableHighlight, Button, Platform, Dimensions, InteractionManager} from 'react-native'; 
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import globalStyles from '../styles/global';
import { NativeBaseProvider, Badge, Heading, Icon, FormControl, Stack, Input, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Spinner } from 'native-base';
import Card from '../shared/card';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';

import * as Notificationapp from 'expo-notifications'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

import Rooms from '../screens/RoomsPreview';
import Profile from '../screens/Profile';
import Notification from '../screens/Notifications';
import Reports from '../screens/Report';
import EditRooms from '../screens/EditRooms';
import Disable from '../screens/Disable';
import Logout from '../screens/Logout';
import Studentnot from '../screens/Studentnot';
import Studentinfo from './StudentInfo';
import ReportFeedback from '../screens/ReportFeedback';
import ReportInit from '../screens/ReportInit';
import EditProperty from '../screens/EditProperty';
import StudentInfofromEvents from '../screens/StudentInfofromEvents';
import Payments from '../screens/Payments';
import ModalScreen from '../screens/Addnewevent';
import ModalUpdate from '../screens/Updatevent';
import Vouchers from '../screens/Vouchers';
import Eventshistory from '../screens/Eventshistory'
import YourEvents from '../screens/YourEvents'

const Drawer = createDrawerNavigator();

class CustomDrawerContentComponent extends Component{
  NetInfoSubscription = null;

  constructor(props){
		super(props);
      this.state = {
        email : '',
        perm : false,
        info : [],
        loading : true,
        refreshing: false,

        //Internet Connection
        connection_status: false,
      }
	  }

	
	  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange )
    
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		
		let profile = await api.getDrawerdata(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false })
    

    const { status: existingStatus } = await Notificationapp.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
    const { status } = await Notificationapp.requestPermissionsAsync();
    finalStatus = status;
    }
    if (finalStatus !== 'granted') {
    alert('It seems that you have not granted notifications permission, to be able to send you notifications change this in the settings of your device');
    return;
    }

    const token = (await Notificationapp.getDevicePushTokenAsync()).data;
    this.setState({ expoPushToken: token });
  
  
  if (Platform.OS === 'android') {
    Notificationapp.setNotificationChannelAsync('get-notifications', {
    name: 'get-notifications',
    importance: Notificationapp.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    });
    
  }

  Notificationapp.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  //Api of user duplicated validation
  let email = this.state.email
	let tokenval = this.state.expoPushToken

  return await fetch(`https://homebor.com/tokenvallapp.php?email=${email}&token=${tokenval}`, {
    method: 'POST',
    header: {
        'Content-Type': 'multipart/form-data'
    },
      }).then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          if (response.status == 1) {
    console.log('this token is registred')
          }
          else {
    this.registerToken()
          }
    });
  
	  }

    registerToken = async () => { 
      //Api of register
      let email = this.state.email
      let tokenval = this.state.expoPushToken

		return await fetch(`https://homebor.com/tokenapp.php?email=${email}&token=${tokenval}`, {
				method: 'POST',
				header: {
					'Content-Type': 'multipart/form-data'
				},
			  }).then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
				  if (response.status == 1) {
					console.log('Register Token Successfully')
				  }
				  else {
					console.log('Error on Register token')
				  }
				});
    }

    _handleConnectivityChange = (state) => {
      this.setState({ connection_status: state.isConnected});
    }
  
    componentWillUnmount(){
      this.NetInfoSubscription && this.NetInfoSubscription()
    }


  render(){
      return(
      <NativeBaseProvider>
       <FlatList
          data={this.state.info}
          keyExtractor={item => `${item.info}`}
          nestedScrollEnabled={true}
          renderItem={({item}) => (
            <View>
              <ImageBackground source={require('../assets/banner.png')} style={{width: '100%'}}>
                {this.state.connection_status ? 
                  item.fp == 'NULL' && item.phome == 'NULL' ?
                    <View>
                      <Avatar size="2xl" bg="#232159" style={globalStyles.drawerImage}>{this.state.email.toUpperCase().charAt(0)}
                      </Avatar>
                    </View>
                  :
                    <View>
                      <Avatar size="2xl" bg="#232159" style={globalStyles.drawerImage} source={ item.fp == "NULL" ? {uri: `http://homebor.com/${item.phome}`} : {uri: `http://homebor.com/${item.fp}`}}>{this.state.email.toUpperCase().charAt(0)}
                      </Avatar>
                    </View>
                  :
                  <View>
                    <Avatar size="2xl" bg="#232159" style={globalStyles.drawerImage}>{this.state.email.toUpperCase().charAt(0)}
                    </Avatar>
                  </View>
                }
                {this.state.connection_status && (
                  <View>
                    <Text style={globalStyles.drawerUser}>{item.name_h} {item.l_name_h} </Text>
                    <Text style={globalStyles.drawerMail}>{item.mail_h} </Text>
                  </View>
                )}
                  </ImageBackground>
              <DrawerItemList {...this.props}/>
            </View>
          )}
        >
        </FlatList>
      </NativeBaseProvider>
      );
  }
};



export default class Drawers extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,

      notinum1 : -1,
      num_noti : 0,
      numnoti : 0,

      //Internet Connection
      connection_status: false,
      clockrun : false,
    }
  }

  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange )
    
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    
    let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
    this.setState({ numnoti : num_noti.data })

    this._onFocusListener = this.props.navigation.addListener('state', (e) => {e.data.state.type == 'drawer' ? this.onUpdate() : null})
  }

  onUpdate = async() => {
    if(this.state.connection_status) {
      let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
      this.setState({ numnoti : num_noti.data })
    }
    
  }
  


  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
    }

    refresh = async() => {
      if(this.state.connection_status == true) {
        let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
        this.setState({ numnoti : num_noti.data }) 
      }
    }

    _handleConnectivityChange = (state) => {
      this.setState({ connection_status: state.isConnected});
    }
  
    componentWillUnmount(){
      this.NetInfoSubscription && this.NetInfoSubscription()
    }
    

    
  render() {

    const useInitialRender = () => {
      const [isInitialRender, setIsInitialRender] = React.useState(false)
  
      if (!isInitialRender) {
          setTimeout(() => setIsInitialRender(true), 1)
          return true
      }
      return false
  }
  

    
    return (
      
      <Drawer.Navigator component={Drawers} gestureEnabled={true} screenOptions={{
        drawerType: 'front',
        drawerStyle: {
            backgroundColor: '#232159',
            width: '60%',
          },
          backgroundColor: '#232159',
          drawerInactiveTintColor : '#fff',
          drawerInactiveBackgroundColor: '#232159',
          drawerActiveTintColor: '#fff', 
          drawerActiveBackgroundColor: '#982a72'
      }} drawerContent={(props)=><CustomDrawerContentComponent {...props} />}>
        <Drawer.Screen name="Calendar2" component={Calendar2} options={{title: 'Calendar', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/calendario.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Rooms" component={Rooms} options={{title: 'Your Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerActiveTintColor: '#fff', drawerActiveBackgroundColor: '#982a72', inactiveTintColor: '#fff', drawerBackgroundColor: '#232159', drawerHeaderTitleAlign: 'center', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/cama-64.png')}
            style={{height:24, width:24}}/>
          )}}/>
        <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/info-64.png')}
            style={{height:24, width:24}}/>
          )}}/>
        <Drawer.Screen name="Notification" component={Notification} options={{title: 'Notifications', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => { Alert.alert(
                  'Do you want to delete your notifications?',
                  'Important!, the confirmed or rejected students notifications would not be delete',
                  [        
                    {text: 'Yes', onPress: () => {console.log(this.state.email)
                      api.DeleteNoti(this.state.email)
                      this.onRefresh()}},
                    {text: 'No', onPress: () => console.log('Cancel')},
                  ],
                  { cancelable: true }
                )}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="trash" style={globalStyles.ReportInitIconsGoBack}>Delete All</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/notification-64.png')}
            style={{height:24, width:24}}/>
          ), drawerLabel: ({focused, size}) => (
            <NativeBaseProvider>
              {this.state.numnoti == 0 ?
                <View>
                  <Text style={{fontSize: 14, color: '#fff'}}>Notifications</Text>
                </View> 
                :
                <View> 
                  <Badge // bg="red.400"
                  colorScheme="danger"
                  rounded="999px"
                  mb={-5}
                  mr={-5}
                  zIndex={1}
                  variant="solid"
                  alignSelf="flex-end"
                  _text={{
                    fontSize: 12,
                  }}
                  
                >
                  {this.state.numnoti}
                </Badge>
                <Text style={{fontSize: 14, color: '#fff'}}>Notifications</Text>
              </View>
              }

            </NativeBaseProvider>
          )}}/>

        <Drawer.Screen name="Reports" component={Reports} options={{title: 'Reports', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/report.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="EditRooms" component={EditRooms} options={{title: 'Edit Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/edit-rooms.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="EditProperty" component={EditProperty} options={{title: 'Edit Property', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/edit-64.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
         <Drawer.Screen name="Payments" component={Payments} options={{title: 'Payment History', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/payments-history.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Vouches" component={Vouchers} options={{title: 'Vouchers', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/calendario-aplicacion-ver.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Disable" component={Disable} options={{title: 'Disable Account', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/disable.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
          {this.state.connection_status ? 
              (<Drawer.Screen name="Logout" component={Logout} options={{title: 'Log out', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
                <Image source={require('../assets/logout.png')}
                style={{height:24, width:24, borderRadius : 50}}/>
              )}}/>)  :

              (<Drawer.Screen name="Logout" component={Logout} options={{title: 'Log out', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
                <Image source={require('../assets/logout.png')}
                style={{height:24, width:24, borderRadius : 50}}/>
              ), drawerItemStyle: { height: 0 }}}/>)
        }
        <Drawer.Screen name="Studentnot" component={Studentnot}  options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="Studentinfo" component={Studentinfo} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="StudentInfofromEvents" component={StudentInfofromEvents} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ReportFeedback" component={ReportFeedback} options={{title: 'Reports Feedback', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ReportInit" component={ReportInit} options={{title: 'Students List', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Reports')}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
       <Drawer.Screen name="MyModal" component={ModalScreen} options={{title: 'Add New Event', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Calendar2')}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
       <Drawer.Screen name="ModalUpdate" component={ModalUpdate} options={{title: 'Modify Event', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Calendar2')}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
    </Drawer.Navigator>
  )
  }
}

//main class of this screen
const Tabs = createBottomTabNavigator();

function Calendar2() {
  return(

    
    <Tabs.Navigator screenOptions={{
      lazy : true,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#f9f9f9',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderLeftWidth: 0.2,
        borderRightWidth: 0.2,
        overflow: 'hidden',
      }
    }}>

      <Tabs.Screen name="Events" component={YourEvents} options={{title: 'Your Events', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/calendario-aplicacion-blanco1.png')
        : require('../assets/calendario-aplicacion-blanco1.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="AddEvent" component={ModalScreen} options={{title: 'Add Event', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/calendario-aplicacion-agregar.png')
        : require('../assets/calendario-aplicacion-agregar.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="YearCalendar" component={YearCalendar} options={{title: 'Calendar', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/calendario-aplicacion-anual-blanco.png')
        : require('../assets/calendario-aplicacion-anual-blanco.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="Eventshistory" component={Eventshistory} options={{title: 'Events History', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/calendario-aplicacion-ver.png')
        : require('../assets/calendario-aplicacion-ver.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

        
      
    </Tabs.Navigator>
    

)
}

class YearCalendar extends Component {
  

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
      clockrun : false,
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
      this.setState({ items : agenda })

      //Get data for dots in calendar
      let mday = await api.getAgenda(this.state.email,this.state.perm)
      this.setState({ mfirstd : mday.notification})
      

      let profile = await api.getProfile(this.state.email,this.state.perm)
      this.setState({ info : profile.data[0].mail_h})

      this.anotherFunc();
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
          this.setState({ mfirstd : mday.notification})

          

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
          this.setState({ marked : obj});

          

          let agenda = await api.getAgenda2(this.state.email,this.state.perm)
          this.setState({ items : agenda })
        }
      }

      studentProfile = async () => {
        let idnoti = await AsyncStorage.getItem('idnoti')
        idnoti = JSON.parse(idnoti)
        this.setState({ idnoti : idnoti})
  
        this.props.navigation.navigate('StudentInfofromEvents')
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
        this.setState({ marked : obj});
        
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
    
    return (
      
      <View>
        <StatusBar style="light" translucent={true} />
      <View style={globalStyles.cardCalendar2}>
          <View style={globalStyles.cardContentCalendar}>
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
