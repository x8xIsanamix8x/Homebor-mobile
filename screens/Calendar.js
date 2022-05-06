import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, RefreshControl, Modal, Alert, TouchableHighlight, Button, Platform, Dimensions} from 'react-native'; 
import {Agenda} from 'react-native-calendars'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Badge, Icon, FormControl, Stack, Input } from 'native-base';
import Card from '../shared/card';

import { Ionicons } from '@expo/vector-icons';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';

import * as Notificationapp from 'expo-notifications'

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
import StudentInfofromEvents from '../screens/StudentInfofromEvents'
import Payments from '../screens/Payments'
import ModalScreen from '../screens/Addnewevent'
import ModalUpdate from '../screens/Updatevent'



const Drawer = createDrawerNavigator();

class CustomDrawerContentComponent extends Component{

  constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		  loading : true,
		  refreshing: false,
      
		}
	  }

	
	  async componentDidMount(){
      
    
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		//console.log(userLogin)
		let profile = await api.getDrawerdata(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false })
		console.log(this.state.info)

    const { status: existingStatus } = await Notificationapp.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
    const { status } = await Notificationapp.requestPermissionsAsync();
    finalStatus = status;
    }
    if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
    }
    const token = (await Notificationapp.getDevicePushTokenAsync()).data;
    console.log(token);
    this.setState({ expoPushToken: token });
  
  
  if (Platform.OS === 'android') {
    Notificationapp.setNotificationChannelAsync('get-notifications', {
    name: 'get-notifications',
    sound: 'kh.wav',
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


  render(){
      return(
       <FlatList
		data={this.state.info}
		keyExtractor={item => `${item.info}`}
		nestedScrollEnabled={true}
		renderItem={({item}) => (
      <View>
        <ImageBackground source={require('../assets/banner.png')} style={{width: '100%'}}>
          { item.fp == 'NULL' && item.phome == ' NULL' ?
          null :
          <View> 
            <View style={item.fp == "NULL" ? globalStyles.hide : globalStyles.show}>
            <Image
              source={{ uri: `http://homebor.com/${item.fp}` }}
              resizeMode="contain"
              style={item.fp == "NULL" ? globalStyles.hide : globalStyles.drawerImage}
              ></Image>
            </View>
            <View style={item.fp == "NULL" ? globalStyles.show : globalStyles.hide}>
            <Image
              source={{ uri: `http://homebor.com/${item.phome}` }}
              resizeMode="contain"
              style={item.fp == "NULL" ? globalStyles.drawerImage : globalStyles.hide}
              ></Image>
            </View>
          </View>
          }
              <Text style={globalStyles.drawerUser}>{item.name_h} {item.l_name_h} </Text>
              <Text style={globalStyles.drawerMail}>{item.mail_h} </Text>
            </ImageBackground>
        <DrawerItemList {...this.props}/>
      </View>
      )}
      >
    
      </FlatList>
      );
  }
};



export default class Drawers extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,
      notinum1 : -1,
    }
  }

  async componentDidMount(){
    this._onFocusListener = this.props.navigation.addListener('state', () => this.onUpdate())
    
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    //this.props.navigation.navigate('Login')
    

    let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
    this.setState({ numnoti : num_noti.data })
  }

  onUpdate = async() => {
    let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
    this.setState({ numnoti : num_noti.data })
  }


  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
    }

    refresh = async() => {
      let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
      this.setState({ numnoti : num_noti.data }) 
      //console.log('reload')
    }

    onLogout = async() => {
      this.setState({ numnoti: 0 }, () => { console.log('Nuevo NumNoti', this.state.numnoti) });
      this.setState({ notinum1: 0 }, () => { console.log('Nuevo Noti1', this.state.notinum1) });
      //console.log('Cancelar')
      console.log(this.state.numnoti)
      console.log(this.state.notinum1)
      this.props.navigation.navigate('Logout')
    }

    _Alert = async () => { 
      this.setState({ numnoti: 0 }, () => { console.log('Nuevo NumNoti', this.state.numnoti) });
      this.setState({ notinum1: 0 }, () => { console.log('Nuevo Noti1', this.state.notinum1) });
      //console.log('Cancelar')
      console.log(this.state.numnoti)
      console.log(this.state.notinum1)
      this.props.navigation.navigate('Logout')
  }

    
  render() {

    return (
      
      <Drawer.Navigator component={Drawers} gestureEnabled={true} screenOptions={{
        drawerType: 'front',
        drawerStyle: {
            backgroundColor: '#232159',
            width: (Dimensions.get('window').width >= 414) ? 480 : 240,
          },
          backgroundColor: '#232159',
          drawerInactiveTintColor : '#fff',
          drawerInactiveBackgroundColor: '#232159',
          drawerActiveTintColor: '#fff', 
          drawerActiveBackgroundColor: '#982a72',
      }} 
         
        drawerContent={(props)=><CustomDrawerContentComponent {...props} />}>
        <Drawer.Screen name="Calendar2" component={Calendar2} options={{title: 'Calendar', drawerLabel: 'Calendar', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/calendario.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Rooms" component={Rooms} options={{title: 'Your Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerActiveTintColor: '#fff', drawerActiveBackgroundColor: '#982a72', inactiveTintColor: '#fff', drawerBackgroundColor: '#232159', drawerHeaderTitleAlign: 'center', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/cama-64.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24}}/>
          )}}/>
        <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/info-64.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24}}/>
          )}}/>
        <Drawer.Screen name="Notification" component={Notification} options={{title: 'Notifications', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerRight: () => (
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
                <Icon as={Ionicons} name="trash" style={globalStyles.ReportInitIcons}>Delete All</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/notification-64.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24}}/>
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

        <Drawer.Screen name="Reports" component={Reports} options={{title: 'Reports', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/report.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="EditRooms" component={EditRooms} options={{title: 'Edit Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/edit-rooms.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="EditProperty" component={EditProperty} options={{title: 'Edit Property', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/edit-64.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
         <Drawer.Screen name="Payments" component={Payments} options={{title: 'Payment History', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/payments-history.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Disable" component={Disable} options={{title: 'Disable Account', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/disable.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Logout" component={Logout} options={{title: 'Log out', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/logout.png')}
            style={{height: (Dimensions.get('window').width >= 414) ? 48 : 24, width: (Dimensions.get('window').width >= 414) ? 48 : 24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Studentnot" component={Studentnot}  options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="Studentinfo" component={Studentinfo} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="StudentInfofromEvents" component={StudentInfofromEvents} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ReportFeedback" component={ReportFeedback} options={{title: 'Reports Feedback', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ReportInit" component={ReportInit} options={{title: 'Students List', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Reports')}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIcons}>Go Back</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
       <Drawer.Screen name="MyModal" component={ModalScreen} options={{title: 'Add New Event', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
       <Drawer.Screen name="ModalUpdate" component={ModalUpdate} options={{title: 'Modify Event', headerStyle:{ backgroundColor: '#232159'}, headerTitleStyle:{fontSize : (Platform.isPad === true) ? 22 : 18}, headerRight: () => (
            <NativeBaseProvider>
              <TouchableOpacity
                onPress={() => {this.props.navigation.navigate('Calendar2')}}
                title="Info"
                color="#fff">
                <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIcons}>Go Back</Icon>
              </TouchableOpacity>
            </NativeBaseProvider>
          ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
    </Drawer.Navigator>
  )
  }
}

//main class of this screen
class Calendar2 extends Component {
  

  constructor(props){
    var currentDate = new Date().getDate();
    super(props);
    this.state = {
      email : '',
      perm : false,
      items : {},
      refreshing : false,
      modalVisible : false, 
		  setModalVisible : false,
    }
  }

  async componentDidMount(){
    
    //Get profile data
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    //this.props.navigation.navigate('Login')

    //Get information for agenda cards
    let agenda = await api.getAgenda2(this.state.email,this.state.perm)
    this.setState({ items : agenda })
    //console.log(this.state.email)
    console.log(this.state.items)

    //Get data for dots in calendar
    let mday = await api.getAgenda(this.state.email,this.state.perm)
    this.setState({ mfirstd : mday.notification})
    
    //console.log(this.state.email)
    //console.log(this.state.mfirstd)
    //console.log(this.state.mlastd)
    

    let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data[0].mail_h})
		console.log(this.state.info)

    //console.log('object')
    //console.log(Object.keys(this.state.items))

    //this.setState ({ fechas : Object.keys(this.state.items)})
    //console.log('fechas')

    //Function to create dots dinamically

    //Refresh when is another event
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh();
		});

    //Variables of modal
		this.setState({modalVisible : false, setModalVisible : false})

    this.anotherFunc();
  }
  

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
    }

    refresh = async() => {
      

      let mday = await api.getAgenda(this.state.email,this.state.perm)
      this.setState({ mfirstd : mday.notification})

      

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
        this.setState({ marked : obj});

        

        let agenda = await api.getAgenda2(this.state.email,this.state.perm)
        this.setState({ items : agenda })

        setTimeout(() => {
          for (let i = -15; i < 365; i++) {
            var currentDate = new Date(); currentDate.setDate(currentDate.getDate() + i)
            const time = currentDate + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(currentDate);
            if (!this.state.items[strTime]) {
              this.state.items[strTime] = [];
              const numItems = 1;
              let mfirstd = this.state.mfirstd;
              if(mfirstd && this.state.mfirstd){
                  this.state.mfirstd.map((item) => { 
                  for (let j = 0; j < numItems; j++) {
                    if(strTime > item.start && strTime <= item.end){
                      this.state.items[strTime].push({
                        name: item.title,
                        room_e: item.room_e,
                        end: item.end,
                        start: item.start,
                        academy: item.academy,
                        agency: item.agency,
                        photo: item.photo,
                        mail_s : item.mail_s, 
                        id : item.id
                      })
                    }
                  }
                })
              }
            } else {
              this.state.items[strTime] = [];
              const numItems = 1;
              let mfirstd = this.state.mfirstd;
              if(mfirstd && this.state.mfirstd){
                  this.state.mfirstd.map((item) => { 
                  for (let j = 0; j < numItems; j++) {
                    if(strTime >= item.start && strTime <= item.end){
                      this.state.items[strTime].push({
                        name: item.title,
                        room_e: item.room_e,
                        end: item.end,
                        start: item.start,
                        academy: item.academy,
                        agency: item.agency,
                        photo: item.photo,
                        mail_s : item.mail_s, 
                        id : item.id
                      })
                    }
                  }
                })
              }

            }
          }
          const newItems = {};
          Object.keys(this.state.items).forEach(key => {
            newItems[key] = this.state.items[key];
          });
          this.setState({
            items: newItems   
          });
         // console.log(this.state.items)
        }, 3000);


        //Variables of modal
        this.setState({modalVisible : false, setModalVisible : false})
        
     // console.log('refresh')
      //console.log(this.state.items)
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
        this.setState({ marked : obj});
        //console.log('markeds')
        console.log(this.state.marked)
        
        
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

  //Open modal function
  modalopen = async() => {
    this.setState({modalVisible : true, setModalVisible : true})
  }

  //Close modal function
  modalclose = async() => {
  this.setState({modalVisible : false, setModalVisible : false})
  }
  
      
  
  render() {
    let modalVisible = this.state.modalVisible;
		let setModalVisible = this.state.setModalVisible;

    return (
      
      <Agenda
        items={this.state.items}
        extraData={this.state.items}  
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}     
        refreshControl={
            <RefreshControl
               enabled={true}
               refreshing={this.state.refreshing}
               onRefresh={this.onRefresh}
               tintColor="purple"
               colors={["purple","purple"]}
               size={RefreshControl.SIZE.LARGE}
           />
        }
        onDayPress={day => {
          console.log('selected day', day);
        }}
        
        onDayLongPress={day => {
          this.props.navigation.navigate('MyModal')
        }}

        markingType='multi-dot'
        
        markedDates={this.state.marked}
        
        
        
        // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
        


        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        //hideExtraDays={false}

        theme={{
          'stylesheet.agenda': {
            week: {
              marginTop: 3,
              marginBottom: 3,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}

        
        
      >
        <View>
        <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      }}>
      <View style={globalStyles.centeredViewModal}>
      <View style={globalStyles.modalView}>
          <Text style={globalStyles.titleModalR}>Report Details</Text>
          <FormControl>
              <Stack >
                  <Stack inlineLabel last style={globalStyles.input}>
                      <Input
                                  placeholder="Describe the problem. No special characters"
                                  multiline={true}
                                  numberOfLines={4} 
                                  onChangeText={ (des) => this.setState({des}) }
                                  
                              />
                  </Stack>
              </Stack>

          </FormControl>
          
              <TouchableHighlight
              style={{ ...globalStyles.cancelModalR }}
              onPress={() => this.modalclose()}>
              <Text style={globalStyles.textStyleModal}>Cancel</Text>
              </TouchableHighlight>
              
              <TouchableHighlight
              style={{ ...globalStyles.notifyModalR }}
              onPress={() => this.modalnotify()}>
              <Text style={globalStyles.textStyleModal}>Notify</Text>
              </TouchableHighlight>
      </View>
      </View>
      

    </Modal>
        </View>
      </Agenda>

      


      
    );
  }

  loadItems(day) {
   
    
    setTimeout(() => {
      for (let i = -15; i < 365; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = 1;
          let mfirstd = this.state.mfirstd;
          if(mfirstd && this.state.mfirstd){
             this.state.mfirstd.map((item) => { 
              for (let j = 0; j < numItems; j++) {
                if(strTime > item.start && strTime <= item.end){
                  this.state.items[strTime].push({
                    name: item.title,
                    room_e: item.room_e,
                    end: item.end,
                    start: item.start,
                    academy: item.academy,
                    agency: item.agency,
                    photo: item.photo,
                    mail_s : item.mail_s, 
                    id: item.id
                  })
                }
              }
            })
          }
        } else {
          this.state.items[strTime] = [];
          const numItems = 1;
          let mfirstd = this.state.mfirstd;
          if(mfirstd && this.state.mfirstd){
             this.state.mfirstd.map((item) => { 
              for (let j = 0; j < numItems; j++) {
                if(strTime >= item.start && strTime <= item.end){
                  this.state.items[strTime].push({
                    name: item.title,
                    room_e: item.room_e,
                    end: item.end,
                    start: item.start,
                    academy: item.academy,
                    agency: item.agency,
                    photo: item.photo,
                    mail_s : item.mail_s,
                    id: item.id
                  })
                }
              }
            })
          }}
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems   
      });
      //console.log(this.state.items)
    }, 3000);
  }

  renderItem(item) {
    
    return (

      
    <NativeBaseProvider>
      
      <View>
      
     
      <View>
        
        <Card>
          <View style={item.room_e == "room1" ? globalStyles.calendarColor1 : item.room_e == "room2" ? globalStyles.calendarColor2 : item.room_e == "room3" ? globalStyles.calendarColor3 : item.room_e == "room4" ? globalStyles.calendarColor4 : item.room_e == "room5" ? globalStyles.calendarColor5 : item.room_e == "room6" ? globalStyles.calendarColor6 : item.room_e == "room7" ? globalStyles.calendarColor7 : item.room_e == "room8" ? globalStyles.calendarColor8 : item.room_e == "room" ? globalStyles.calendarColorA : globalStyles.show}>
          
            <Image
              source={{ uri: item.photo }}
              resizeMode="cover"
              style={item.photo == "http://homebor.com/NULL" ? globalStyles.hideContents : globalStyles.imageCalendar}
            ></Image>
            {item.mail_s != "NULL" ? <TouchableOpacity
            onPress={() =>this.studentProfile(
              this.setState({idnoti : item.mail_s}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.mail_s))))}
            ><View style={item.mail_s != "NULL" ? {marginTop : (Platform.isPad === true) ? '-2%' : (Dimensions.get('window').width >= 414) ? '-2%' :'-9%'} : {marginTop : '4%'}}/>
            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 1</Text>
                    <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 2</Text>
                    <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 3</Text>
                    <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 4</Text>
                    <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 5</Text>
                    <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 6</Text>
                    <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 7</Text>
                    <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 8</Text>
                    <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Activity</Text>
                </View>
            </View>

            <View style={globalStyles.tableRowReport}>
              <View style={globalStyles.tableColumnTotalsCalendar}>
                  <Text style={ globalStyles.infosubtitleCalendarN}>{item.name}</Text>
              </View>
            </View>

            <View style={{marginBottom : '4%'}}/>
            

            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar}>Arrive :</Text>
                </View>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar}>Leave :</Text>
                </View>
            </View>

            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                </View>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                </View>
            </View>

            <View style={{marginBottom : '2%'}}/>

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
            

            <View style={{marginBottom : '4%'}}/>
            </TouchableOpacity>
            
            : 
            <TouchableOpacity
            onPress={() =>this._AlertCalendar(
              this.setState({idnoti : item.id}, () => AsyncStorage.setItem('idnoti',JSON.stringify(item.id), console.log(this.state.idnoti))))}
            >
            <View style={item.mail_s != "NULL" ? {marginTop : '-9%'} : {marginTop : '4%'}}/>
            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={ item.room_e == "room1" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 1</Text>
                    <Text style={ item.room_e == "room2" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 2</Text>
                    <Text style={ item.room_e == "room3" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 3</Text>
                    <Text style={ item.room_e == "room4" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 4</Text>
                    <Text style={ item.room_e == "room5" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 5</Text>
                    <Text style={ item.room_e == "room6" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 6</Text>
                    <Text style={ item.room_e == "room7" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 7</Text>
                    <Text style={ item.room_e == "room8" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Room 8</Text>
                    <Text style={ item.room_e == "room" ? globalStyles.infosubtitleCalendar : globalStyles.hideContents}>Activity</Text>
                </View>
            </View>

            <View style={globalStyles.tableRowReport}>
              <View style={globalStyles.tableColumnTotalsCalendar}>
                  <Text style={ globalStyles.infosubtitleCalendarN}>{item.name}</Text>
              </View>
            </View>

            <View style={{marginBottom : '4%'}}/>
            

            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar}>Arrive :</Text>
                </View>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar}>Leave :</Text>
                </View>
            </View>

            <View style={globalStyles.tableRowReport}>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.start}</Text>
                </View>
                <View style={globalStyles.tableColumnTotalsCalendar}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.end}</Text>
                </View>
            </View>

            <View style={{marginBottom : '2%'}}/>

            <View style={globalStyles.tableRowReport}>
                <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                    <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                </View>
            </View>

            <View style={globalStyles.tableRowReport}>
                <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.academy}</Text>
                </View>
            </View>

            <View style={{marginBottom : '2%'}}/>

            <View style={globalStyles.tableRowReport}>
                <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                    <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                </View>
            </View>
            <View style={globalStyles.tableRowReport}>
                <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                    <Text style={globalStyles.infosubtitleCalendar2}>{item.agency}</Text>
                </View>
            </View>
            <View style={{marginBottom : '4%'}}/>
            </TouchableOpacity>}
            
              
        
            </View>
            
        </Card>
    
      </View>
      
      
      </View>
    </NativeBaseProvider>
      
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <View style={{ borderBottomColor: '#C5C2C1', borderBottomWidth: 2, width: '95%', marginBottom: '5%'}}/>
          <Text>This is empty date!</Text>
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

const styles = StyleSheet.create({
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    emptyDate: {
      height: 1,
      flex: 1,
      paddingTop: 30
    }
  });