import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, RefreshControl, Alert} from 'react-native'; 
import {Agenda} from 'react-native-calendars'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Box, Container, Badge } from 'native-base';
import Card from '../shared/card';


import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
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
import EditProperty from '../screens/EditProperty';


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
    const token = (await Notificationapp.getExpoPushTokenAsync()).data;
    console.log(token);
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
        <DrawerItemList {...this.props} />
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
    }
  }

  async componentDidMount(){
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    //this.props.navigation.navigate('Login')

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
      console.log('hola')
      this.props.navigation.navigate('Notification')
    }
  render() {
    return (
      <Drawer.Navigator screenOptions={{
        drawerType: 'front',
        drawerStyle: {
            backgroundColor: '#232159',
            width: 240,
          },
          backgroundColor: '#232159',
          drawerInactiveTintColor : '#fff',
          drawerInactiveBackgroundColor: '#232159',
          drawerActiveTintColor: '#fff', 
          drawerActiveBackgroundColor: '#982a72'
      }} drawerContent={(props)=><CustomDrawerContentComponent {...props} />}>
        <Drawer.Screen name="Calendar2" component={Calendar} options={{title: 'Calendar', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
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
        <Drawer.Screen name="Notification" component={Notification} options={{title: 'Notifications', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/notification-64.png')}
            style={{height:24, width:24}}/>
          ), drawerLabel: ({focused, size}) => (
            <NativeBaseProvider>
              <TouchableOpacity onPress={ () =>this.onRefresh()}> 
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
              </TouchableOpacity>
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
        <Drawer.Screen name="Disable" component={Disable} options={{title: 'Disable Account', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/disable.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Logout" component={Logout} options={{title: 'Log Out', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/logout.png')}
            style={{height:24, width:24, borderRadius : 50}}/>
          )}}/>
        <Drawer.Screen name="Studentnot" component={Studentnot}  options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="Studentinfo" component={Studentinfo} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ReportFeedback" component={ReportFeedback} options={{title: 'Reports Feedback', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
    </Drawer.Navigator>
  )
  }
}

//main class of this screen
class Calendar extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      email : '',
      perm : false,
      items : {},
      refreshing : false,
    }
  }

  async componentDidMount(){
    //Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			console.log('Calendar')
		  });
    
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    //this.props.navigation.navigate('Login')

    let agenda = await api.getAgenda2(this.state.email,this.state.perm)
    this.setState({ items : agenda })
    //console.log(this.state.email)
    console.log(this.state.items)

    let mday = await api.getAgenda(this.state.email,this.state.perm)
    this.setState({ mfirstd : mday.notification[0].start, mlastd : mday.notification[0].end})
    
    //console.log(this.state.email)
    console.log(this.state.mfirstd)
    console.log(this.state.mlastd)
    

    let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data[0].mail_h})
		console.log(this.state.info)

    console.log('object')
    console.log(Object.keys(this.state.items))

    this.setState ({ fechas : Object.keys(this.state.items)})
    console.log('fechas')

  

    //let fechas2 = Object.keys(this.state.fechas).forEach(el => console.log(Object.values(this.state.fechas)[el]))
    
  }


  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
    }

  async getAgenda(){
      let agenda = await api.getAgenda2(this.state.email,this.state.perm)
      this.setState({ items : agenda })
      this.getAgenda()
  }

    refresh = async() => {
      let agenda = await api.getAgenda2(this.state.email,this.state.perm)
      this.setState({ items : agenda, loading : false})
      console.log('refresh')
      console.log(this.state.items)
      }

      
      


      //todo esto corresponde a la practica con el fucking calendario
  
      
  
  render() {

    let mfirstd = this.state.mfirstd;
    let mlastd = this.state.mlastd;


    const mark = {
      
			[`${mfirstd}`]: {
        periods: [
          {startingDay: true, endingDay: false, color: '#5f9ea0'},
        ]
      },
      
      [`${mlastd}`]: {
        periods: [
          {startingDay: false, endingDay: true, color: '#5f9ea0'},
        ]
      },
		};

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
        
        markingType='multi-period'
        markedDates={ mark }
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
        
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
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
    }, 1000);
  }

  renderItem(item) {
    return (
      
    <NativeBaseProvider>
      <View>
      {item.start == null ? 
      <View style={styles.emptyDate}>
      </View> :
      <View>
        
        <Card>
          <View style={item.room_e == "room1" ? globalStyles.calendarColor1 : item.room_e == "room2" ? globalStyles.calendarColor2 : item.room_e == "room3" ? globalStyles.calendarColor3 : item.room_e == "room4" ? globalStyles.calendarColor4 : item.room_e == "room5" ? globalStyles.calendarColor5 : item.room_e == "room6" ? globalStyles.calendarColor6 : item.room_e == "room7" ? globalStyles.calendarColor7 : item.room_e == "room8" ? globalStyles.calendarColor8 : item.room_e == "room" ? globalStyles.calendarColorA : globalStyles.show}>
            <Image
              source={{ uri: `http://homebor.com/${item.photo}` }}
              resizeMode="contain"
              style={item.photo == "NULL" ? globalStyles.hideContents : globalStyles.imageCalendar}
            ></Image>
            <TouchableOpacity
            
            onPress={() => Alert.alert(item.name)}
            >
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
                    <Text style={ globalStyles.infosubtitleCalendar}>{item.name}</Text>
                </View>
              </View>
              

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
                      <Text style={globalStyles.infosubtitleCalendar}>{item.start}</Text>
                  </View>
                  <View style={globalStyles.tableColumnTotalsCalendar}>
                      <Text style={globalStyles.infosubtitleCalendar}>{item.end}</Text>
                  </View>
              </View>

              <View style={globalStyles.tableRowReport}>
                  <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                      <Text style={globalStyles.infosubtitleCalendar}>Agency :</Text>
                  </View>
                  <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                      <Text style={globalStyles.infosubtitleCalendar}>Academy :</Text>
                  </View>
              </View>

              <View style={globalStyles.tableRowReport}>
                  <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                      <Text style={globalStyles.infosubtitleCalendar}>{item.agency}</Text>
                  </View>
                  <View style={item.mail_s != "NULL" ? globalStyles.tableColumnTotalsCalendar : globalStyles.hideContents}>
                      <Text style={globalStyles.infosubtitleCalendar}>{item.academy}</Text>
                  </View>
              </View>
              <View style={{marginBottom : '4%'}}/>
              </TouchableOpacity>
        
            </View>
            
        </Card>
    
      </View>
      
      }
      </View>
    </NativeBaseProvider>
      
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
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