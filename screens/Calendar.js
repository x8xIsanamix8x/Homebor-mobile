import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, Text, Image, ImageBackground, Platform, Dimensions} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Badge, Icon, Avatar, Center, Stack, Box, AspectRatio} from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';

import * as Notificationapp from 'expo-notifications'

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
import ModalScreenCalendar from '../screens/AddneweventCalendar';
import Calendar2 from '../screens/TabCalendar';


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

    const token = (await Notificationapp.getExpoPushTokenAsync()).data;
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
            <Stack maxH="100%">
                {(Dimensions.get('window').width >= 414) && (
                  <View>
                    <Box maxH="80" overflow="hidden">
                      <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                          <Image source={{ uri: `http://homebor.com/${item.fp}` }} alt="image" />
                        </AspectRatio>
                        <Center rounded="md" bg="#232159" _dark={{
                            bg: "#982a72"
                          }} _text={{
                            color: "warmGray.50",
                            fontWeight: "700",
                            fontSize: "xs"
                          }} position="absolute" bottom="0" >
                            {this.state.connection_status && (
                              <View>
                                <Text style={globalStyles.drawerUser}>{item.name_h} {item.l_name_h} </Text>
                              </View>
                            )}
                        </Center>
                      </Box>
                    </Box>
                  </View>
                )}
                {(Dimensions.get('window').width < 414) && (
                  <View>
                    <ImageBackground source={require('../assets/img/backgrounds/banner.png')} style={globalStyles.DrawerbackgroundImage}>
                      {this.state.connection_status ? 
                        item.fp == 'NULL' && item.phome == 'NULL' ?
                          <Center>
                            <Avatar size="xl" bg="#232159" style={globalStyles.drawerImage}>{this.state.email.toUpperCase().charAt(0)}</Avatar>
                          </Center>
                        :
                          <Center maxH="80%">
                            <Avatar size="xl" bg="#232159" style={globalStyles.drawerImage} source={ item.fp == "NULL" ? {uri: `http://homebor.com/${item.phome}`} : {uri: `http://homebor.com/${item.fp}`}}>{this.state.email.toUpperCase().charAt(0)}</Avatar>
                          </Center>
                        :
                        <Center>
                          <Avatar size="xl" bg="#232159" style={globalStyles.drawerImage}>{this.state.email.toUpperCase().charAt(0)}</Avatar>
                        </Center>
                      }
                      {this.state.connection_status && (
                        <View>
                          <Text style={globalStyles.drawerUser}>{item.name_h} {item.l_name_h} </Text>
                          <Text style={globalStyles.drawerMail}>{item.mail_h} </Text>
                        </View>
                      )}
                    </ImageBackground>
                  </View>
                )}
                <DrawerItemList {...this.props}/>
            </Stack>
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
    
    return (
      
      <NativeBaseProvider>
        <Drawer.Navigator component={Drawers} initialRouteName={Calendar2} gestureEnabled={true} screenOptions={{
          drawerType: 'front',
          drawerStyle: {
              backgroundColor: '#232159',
              width: (Dimensions.get('window').width >= 414) ? '50%' : '70%',
            },
            backgroundColor: '#232159',
            drawerInactiveTintColor : '#fff',
            drawerInactiveBackgroundColor: '#232159',
            drawerActiveTintColor: '#fff', 
            drawerActiveBackgroundColor: '#982a72',
        }}  drawerContent={(props)=><CustomDrawerContentComponent {...props} />}>
          <Drawer.Screen name="Calendar2" component={Calendar2} options={{title: 'Calendar', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
            <Image source={require('../assets/img/drawerIcons/calendario.png')}
            style={globalStyles.DrawerIcons}/>
          ), drawerLabel: ({focused, size}) => (
            <View>
              <Text style={globalStyles.DrawerText}>Calendar</Text>
            </View>
          )}}/>
          
          <Drawer.Screen name="Rooms" component={Rooms} options={{title: 'Your Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerActiveTintColor: '#fff', drawerActiveBackgroundColor: '#982a72', inactiveTintColor: '#fff', drawerBackgroundColor: '#232159', drawerHeaderTitleAlign: 'center', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/cama-64.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Rooms</Text>
              </View>
            )}}/>
          <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/info-64.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Profile</Text>
              </View>
            )}}/>
          <Drawer.Screen name="Notification" component={Notification} options={{title: 'Notifications', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
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
              </View>
            ), headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/notification-64.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                {this.state.numnoti == 0 ?
                  <View>
                    <Text style={globalStyles.DrawerText}>Notifications</Text>
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
                    _text={globalStyles.DrawerTextNotification}
                    
                  >
                    {this.state.numnoti}
                  </Badge>
                  <Text style={globalStyles.DrawerText}>Notifications</Text>
                </View>
                }

              </View>
            )}}/>

          <Drawer.Screen name="Reports" component={Reports} options={{title: 'Reports', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/report.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Reports</Text>
              </View>
            )}}/>
          <Drawer.Screen name="EditRooms" component={EditRooms} options={{title: 'Edit Rooms', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/edit-rooms.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Edit Rooms</Text>
              </View>
            )}}/>
          <Drawer.Screen name="EditProperty" component={EditProperty} options={{title: 'Edit Property', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/edit-64.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Edit Property</Text>
              </View>
            )}}/>
          <Drawer.Screen name="Payments" component={Payments} options={{title: 'Payment History', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/payments-history.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Payments History</Text>
              </View>
            )}}/>
          <Drawer.Screen name="Vouches" component={Vouchers} options={{title: 'Vouchers', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/calendario-aplicacion-ver.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Vouchers</Text>
              </View>
            )}}/>
          <Drawer.Screen name="Disable" component={Disable} options={{title: 'Delete Account', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
              <Image source={require('../assets/img/drawerIcons/disable.png')}
              style={globalStyles.DrawerIcons}/>
            ), drawerLabel: ({focused, size}) => (
              <View>
                <Text style={globalStyles.DrawerText}>Delete Account</Text>
              </View>
            )}}/>
            {this.state.connection_status ? 
                (<Drawer.Screen name="Logout" component={Logout} options={{title: 'Log out', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
                  <Image source={require('../assets/img/drawerIcons/logout.png')}
                  style={globalStyles.DrawerIcons}/>
                ), drawerLabel: ({focused, size}) => (
                  <View>
                    <Text style={globalStyles.DrawerText}>Logout</Text>
                  </View>
                )}}/>)  :

                (<Drawer.Screen name="Logout" component={Logout} options={{title: 'Log out', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerIcon: ({focused, size}) => (
                  <Image source={require('../assets/img/drawerIcons/logout.png')}
                  style={globalStyles.DrawerIcons}/>
                ), drawerItemStyle: { height: 0 }}}/>)
          }
          <Drawer.Screen name="Studentnot" component={Studentnot}  options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
          <Drawer.Screen name="Studentinfo" component={Studentinfo} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
          <Drawer.Screen name="StudentInfofromEvents" component={StudentInfofromEvents} options={{title: 'Student Info', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
          <Drawer.Screen name="ReportFeedback" component={ReportFeedback} options={{title: 'Reports Feedback', headerStyle:{ backgroundColor: '#232159'}, headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
          <Drawer.Screen name="ReportInit" component={ReportInit} options={{title: 'Students List', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Reports')}}
                  title="Info"
                  color="#fff">
                  <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
                </TouchableOpacity>
              </View>
            ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="MyModal" component={ModalScreen} options={{title: 'Add New Event', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Calendar2')}}
                  title="Info"
                  color="#fff">
                  <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
                </TouchableOpacity>
              </View>
            ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
        <Drawer.Screen name="ModalUpdate" component={ModalUpdate} options={{title: 'Modify Event', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Calendar2')}}
                  title="Info"
                  color="#fff">
                  <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
                </TouchableOpacity>
              </View>
            ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
            <Drawer.Screen name="ModalScreenCalendar" component={ModalScreenCalendar} options={{title: 'Add New Event', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Calendar2')}}
                  title="Info"
                  color="#fff">
                  <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
                </TouchableOpacity>
              </View>
            ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
      </Drawer.Navigator>
    </NativeBaseProvider>
  )
  }
}