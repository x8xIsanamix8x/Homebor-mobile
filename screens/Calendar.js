import React, {Component, useState} from 'react'; 
import {View, TouchableOpacity, Text, Image, ImageBackground, Platform, Dimensions, Alert} from 'react-native'; 
import globalStyles from '../styles/global';
import { NativeBaseProvider, Badge, Icon, Avatar, Center, Stack, Box, AspectRatio, VStack, HStack} from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList, getDrawerStatusFromState } from '@react-navigation/drawer';
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
import RoomsReserves from '../screens/RoomsReserves'
import Calendar2 from '../screens/TabCalendar';
import YearCalendar from '../screens/YearCalendar';


const Drawer = createDrawerNavigator();

class CustomDrawerContentComponent extends Component{
  NetInfoSubscription = null;

  constructor(props){
		super(props);
      this.state = {
        email : '',
        perm : false,
        fetching : 0,
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

      if(this.state.connection_status) {
        let profile = await api.getDrawerdata(this.state.email,this.state.perm)
        this.setState({ info : profile.data, loading : false })

        //Data for cache
        let cache = await AsyncStorage.getItem('drawerProfileCache')
        cache = JSON.parse(cache)
        if(JSON.stringify(cache) !== JSON.stringify(profile)) {
            await AsyncStorage.setItem('drawerProfileCache',JSON.stringify(profile))
            
        }

        this.tokenProccess()
      } else {
        //Data for cache
        let cache = await AsyncStorage.getItem('drawerProfileCache')
        cache = JSON.parse(cache)
        if(cache != null) {
          let profile = cache
          this.setState({ info : profile.data, loading : false })
        }
      }
  
	  }

    tokenProccess = async () => {      
      
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

      return await fetch(`https://homebor.com/app/tokenvallapp.php?email=${email}&token=${tokenval}`, {
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

      return await fetch(`https://homebor.com/app/tokenapp.php?email=${email}&token=${tokenval}`, {
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
                {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                  <View>
                    <Box maxH="80" overflow="hidden">
                      <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                          {this.state.connection_status ? 
                            item.fp == 'NULL' && item.phome == 'NULL' ?
                              <View style={globalStyles.DrawerBannerView}>
                                <Image
                                  style={globalStyles.DrawerBannerImages}
                                  source={require('../assets/img/backgrounds/banner.png')}
                                  resizeMode="stretch"
                                />
                              </View>
                            :
                              <View style={globalStyles.DrawerBannerView}>
                                <Image
                                  style={globalStyles.DrawerBannerImages}
                                  source={ item.fp == "NULL" ? {uri: `http://homebor.com/${item.phome}`} : {uri: `http://homebor.com/${item.fp}`}}
                                  resizeMode="stretch"
                                />
                              </View>
                            :
                              <View style={globalStyles.DrawerBannerView}>
                                <Image
                                  style={globalStyles.DrawerBannerImages}
                                  source={require('../assets/img/backgrounds/banner.png')}
                                  resizeMode="stretch"
                                />
                              </View>
                          }
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
                {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
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

    if(this.state.connection_status) {
      let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
      this.setState({ numnoti : num_noti.data })

      //Data for cache
      let cache2 = await AsyncStorage.getItem('drawerNotificationCache')
      cache2 = JSON.parse(cache2)
      if(JSON.stringify(cache2) !== JSON.stringify(num_noti)) {
          await AsyncStorage.setItem('drawerNotificationCache',JSON.stringify(num_noti))
          
      }
    } else {
      //Data for cache
      let cache2 = await AsyncStorage.getItem('drawerNotificationCache')
      cache2 = JSON.parse(cache2)
      if(cache2 != null) {
        let num_noti = cache2
        this.setState({ numnoti : num_noti.data })
      }
    }

    this._onFocusListener = this.props.navigation.addListener('state', (e) => {e.data.state.type == 'drawer' ? this.onUpdate() : null})

  }

  onUpdate = async() => {
    if(this.state.connection_status) {
      let num_noti = await api.getnumNotifications(this.state.email,this.state.perm)
      this.setState({ numnoti : num_noti.data })

      this.cleanCacheSendInformation()
    }
    
  }

  //THIS BLOCK CORRESPONDS TO CLEAN THE CACHE AND SEND THE INFORMATION THAT THE USER CHANGED MEANWHILE DOESN'T HAVE INTERNET
  cleanCacheSendInformation = async() => {
    //THIS BLOCK IS FOR EDITROOM ARRAY
    let roomEditCache = await AsyncStorage.getItem('roomSendCache')
    roomEditCache = JSON.parse(roomEditCache)
    if(roomEditCache != null) {
       api.editRoominfoSendCache(roomEditCache.id,roomEditCache.email, roomEditCache.idm, roomEditCache.type1,roomEditCache.bed1,roomEditCache.date1,roomEditCache.bed1_2,roomEditCache.date1_2,roomEditCache.bed1_3,roomEditCache.date1_3,roomEditCache.food1,roomEditCache.aprox1,roomEditCache.type2,roomEditCache.bed2,roomEditCache.date2,roomEditCache.bed2_2,roomEditCache.date2_2,roomEditCache.bed2_3,roomEditCache.date2_3,roomEditCache.food2,roomEditCache.aprox2,roomEditCache.type3,roomEditCache.bed3,roomEditCache.date3,roomEditCache.bed3_2,roomEditCache.date3_2,roomEditCache.bed3_3,roomEditCache.date3_3,roomEditCache.food3,roomEditCache.aprox3,roomEditCache.type4,roomEditCache.bed4,roomEditCache.date4,roomEditCache.bed4_2,roomEditCache.date4_2,roomEditCache.bed4_3,roomEditCache.date4_3,roomEditCache.food4,roomEditCache.aprox4,roomEditCache.type5,roomEditCache.bed5,roomEditCache.date5,roomEditCache.bed5_2,roomEditCache.date5_2,roomEditCache.bed5_3,roomEditCache.date5_3,roomEditCache.food5,roomEditCache.aprox5,roomEditCache.type6,roomEditCache.bed6,roomEditCache.date6,roomEditCache.bed6_2,roomEditCache.date6_2,roomEditCache.bed6_3,roomEditCache.date6_3,roomEditCache.food6,roomEditCache.aprox6,roomEditCache.type7,roomEditCache.bed7,roomEditCache.date7,roomEditCache.bed7_2,roomEditCache.date7_2,roomEditCache.bed7_3,roomEditCache.date7_3,roomEditCache.food7,roomEditCache.aprox7,roomEditCache.type8,roomEditCache.bed8,roomEditCache.date8,roomEditCache.bed8_2,roomEditCache.date8_2,roomEditCache.bed8_3,roomEditCache.date8_3,roomEditCache.food8,roomEditCache.aprox8,roomEditCache.photo0)
    }

    //THIS BLOCK IS FOR DISABLE ROOMS FROM CACHE
    let roomdisable1Cache = await AsyncStorage.getItem('disableRoom1Cache')
    roomdisable1Cache = JSON.parse(roomdisable1Cache)
    if(roomdisable1Cache != null) {
       api.disableRoom1SendCache(roomdisable1Cache.id,roomdisable1Cache.email, roomdisable1Cache.idm, roomdisable1Cache.date1, roomdisable1Cache.date1_2, roomdisable1Cache.date1_3, roomdisable1Cache.disableroom1)
    }

    let roomdisable2Cache = await AsyncStorage.getItem('disableRoom2Cache')
    roomdisable2Cache = JSON.parse(roomdisable2Cache)
    if(roomdisable2Cache != null) {
       api.disableRoom2SendCache(roomdisable2Cache.id,roomdisable2Cache.email, roomdisable2Cache.idm, roomdisable2Cache.date2, roomdisable2Cache.date2_2, roomdisable2Cache.date2_3, roomdisable2Cache.disableroom2)
    }

    let roomdisable3Cache = await AsyncStorage.getItem('disableRoom3Cache')
    roomdisable3Cache = JSON.parse(roomdisable3Cache)
    if(roomdisable3Cache != null) {
       api.disableRoom3SendCache(roomdisable3Cache.id,roomdisable3Cache.email, roomdisable3Cache.idm, roomdisable3Cache.date3, roomdisable3Cache.date3_2, roomdisable3Cache.date3_3, roomdisable3Cache.disableroom3)
    }

    let roomdisable4Cache = await AsyncStorage.getItem('disableRoom4Cache')
    roomdisable4Cache = JSON.parse(roomdisable4Cache)
    if(roomdisable4Cache != null) {
       api.disableRoom4SendCache(roomdisable4Cache.id,roomdisable4Cache.email, roomdisable4Cache.idm, roomdisable4Cache.date4, roomdisable4Cache.date4_2, roomdisable4Cache.date4_3, roomdisable4Cache.disableroom4)
    }

    let roomdisable5Cache = await AsyncStorage.getItem('disableRoom5Cache')
    roomdisable5Cache = JSON.parse(roomdisable5Cache)
    if(roomdisable5Cache != null) {
       api.disableRoom5SendCache(roomdisable5Cache.id,roomdisable5Cache.email, roomdisable5Cache.idm, roomdisable5Cache.date5, roomdisable5Cache.date5_2, roomdisable5Cache.date5_3, roomdisable5Cache.disableroom5)
    }

    let roomdisable6Cache = await AsyncStorage.getItem('disableRoom6Cache')
    roomdisable6Cache = JSON.parse(roomdisable6Cache)
    if(roomdisable6Cache != null) {
      api.disableRoom6SendCache(roomdisable6Cache.id,roomdisable6Cache.email, roomdisable6Cache.idm, roomdisable6Cache.date6, roomdisable6Cache.date6_2, roomdisable6Cache.date6_3, roomdisable6Cache.disableroom6)
    }

    let roomdisable7Cache = await AsyncStorage.getItem('disableRoom7Cache')
    roomdisable7Cache = JSON.parse(roomdisable7Cache)
    if(roomdisable7Cache != null) {
       api.disableRoom7SendCache(roomdisable7Cache.id,roomdisable7Cache.email, roomdisable7Cache.idm, roomdisable7Cache.date7, roomdisable7Cache.date7_2, roomdisable7Cache.date7_3, roomdisable7Cache.disableroom7)
    }

    let roomdisable8Cache = await AsyncStorage.getItem('disableRoom8Cache')
    roomdisable8Cache = JSON.parse(roomdisable8Cache)
    if(roomdisable8Cache != null) {
       api.disableRoom8SendCache(roomdisable8Cache.id,roomdisable8Cache.email, roomdisable8Cache.idm, roomdisable8Cache.date8, roomdisable8Cache.date8_2, roomdisable8Cache.date8_3, roomdisable8Cache.disableroom8)
    }

    //THIS BLOCK IS FOR ACTIVE ROOMS FROM CACHE
    let roomactive1Cache = await AsyncStorage.getItem('activeRoom1Cache')
    roomactive1Cache = JSON.parse(roomactive1Cache)
    if(roomactive1Cache != null) {
      api.activeRoom1SendCache(roomactive1Cache.id,roomactive1Cache.email, roomactive1Cache.idm, roomactive1Cache.date1, roomactive1Cache.date1_2, roomactive1Cache.date1_3, roomactive1Cache.activeroom1)
    }

    let roomactive2Cache = await AsyncStorage.getItem('activeRoom2Cache')
    roomactive2Cache = JSON.parse(roomactive2Cache)
    if(roomactive2Cache != null) {
       api.activeRoom2SendCache(roomactive2Cache.id,roomactive2Cache.email, roomactive2Cache.idm, roomactive2Cache.date2, roomactive2Cache.date2_2, roomactive2Cache.date2_3, roomactive2Cache.activeroom2)
    }

    let roomactive3Cache = await AsyncStorage.getItem('activeRoom3Cache')
    roomactive3Cache = JSON.parse(roomactive3Cache)
    if(roomactive3Cache != null) {
       api.activeRoom3SendCache(roomactive3Cache.id,roomactive3Cache.email, roomactive3Cache.idm, roomactive3Cache.date3, roomactive3Cache.date3_2, roomactive3Cache.date3_3, roomactive3Cache.activeroom3)
    }

    let roomactive4Cache = await AsyncStorage.getItem('activeRoom4Cache')
    roomactive4Cache = JSON.parse(roomactive4Cache)
    if(roomactive4Cache != null) {
       api.activeRoom4SendCache(roomactive4Cache.id,roomactive4Cache.email, roomactive4Cache.idm, roomactive4Cache.date4, roomactive4Cache.date4_2, roomactive4Cache.date4_3, roomactive4Cache.activeroom4)
    }

    let roomactive5Cache = await AsyncStorage.getItem('activeRoom5Cache')
    roomactive5Cache = JSON.parse(roomactive5Cache)
    if(roomactive5Cache != null) {
      api.activeRoom5SendCache(roomactive5Cache.id,roomactive5Cache.email, roomactive5Cache.idm, roomactive5Cache.date5, roomactive5Cache.date5_2, roomactive5Cache.date5_3, roomactive5Cache.activeroom5)
    }

    let roomactive6Cache = await AsyncStorage.getItem('activeRoom6Cache')
    roomactive6Cache = JSON.parse(roomactive6Cache)
    if(roomactive6Cache != null) {
       api.activeRoom6SendCache(roomactive6Cache.id,roomactive6Cache.email, roomactive6Cache.idm, roomactive6Cache.date6, roomactive6Cache.date6_2, roomactive6Cache.date6_3, roomactive6Cache.activeroom6)
    }

    let roomactive7Cache = await AsyncStorage.getItem('activeRoom7Cache')
    roomactive7Cache = JSON.parse(roomactive7Cache)
    if(roomactive7Cache != null) {
      api.activeRoom7SendCache(roomactive7Cache.id,roomactive7Cache.email, roomactive7Cache.idm, roomactive7Cache.date7, roomactive7Cache.date7_2, roomactive7Cache.date7_3, roomactive7Cache.activeroom7)
    }

    let roomactive8Cache = await AsyncStorage.getItem('activeRoom8Cache')
    roomactive8Cache = JSON.parse(roomactive8Cache)
    if(roomactive8Cache != null) {
      api.activeRoom8SendCache(roomactive8Cache.id,roomactive8Cache.email, roomactive8Cache.idm, roomactive8Cache.date8, roomactive8Cache.date8_2, roomactive8Cache.date8_3, roomactive8Cache.activeroom8)
    }

    //Block for Room Photos
    let roomphoto1Cache = await AsyncStorage.getItem('imageRoom1Cache')
    roomphoto1Cache = JSON.parse(roomphoto1Cache)
    if(roomphoto1Cache != null) {
      api.photoRoom1cache(roomphoto1Cache.id, roomphoto1Cache.email, roomphoto1Cache.localUri1)
    }

    let roomphoto1_2Cache = await AsyncStorage.getItem('imageRoom1_2Cache')
    roomphoto1_2Cache = JSON.parse(roomphoto1_2Cache)
    if(roomphoto1_2Cache != null) {
      api.photoRoom1_2cache(roomphoto1_2Cache.id, roomphoto1_2Cache.email, roomphoto1_2Cache.localUri1_2)
    }

    let roomphoto1_3Cache = await AsyncStorage.getItem('imageRoom1_3Cache')
    roomphoto1_3Cache = JSON.parse(roomphoto1_3Cache)
    if(roomphoto1_3Cache != null) {
      api.photoRoom1_3cache(roomphoto1_3Cache.id, roomphoto1_3Cache.email, roomphoto1_3Cache.localUri1_3)
    }

    let roomphoto2Cache = await AsyncStorage.getItem('imageRoom2Cache')
    roomphoto2Cache = JSON.parse(roomphoto2Cache)
    if(roomphoto2Cache != null) {
      api.photoRoom2cache(roomphoto2Cache.id, roomphoto2Cache.email, roomphoto2Cache.localUri2)
    }

    let roomphoto2_2Cache = await AsyncStorage.getItem('imageRoom2_2Cache')
    roomphoto2_2Cache = JSON.parse(roomphoto2_2Cache)
    if(roomphoto2_2Cache != null) {
      api.photoRoom2_2cache(roomphoto2_2Cache.id, roomphoto2_2Cache.email, roomphoto2_2Cache.localUri2_2)
    }

    let roomphoto2_3Cache = await AsyncStorage.getItem('imageRoom2_3Cache')
    roomphoto2_3Cache = JSON.parse(roomphoto2_3Cache)
    if(roomphoto2_3Cache != null) {
      api.photoRoom2_3cache(roomphoto2_3Cache.id, roomphoto2_3Cache.email, roomphoto2_3Cache.localUri2_3)
    }

    let roomphoto3Cache = await AsyncStorage.getItem('imageRoom3Cache')
    roomphoto3Cache = JSON.parse(roomphoto3Cache)
    if(roomphoto3Cache != null) {
      api.photoRoom3cache(roomphoto3Cache.id, roomphoto3Cache.email, roomphoto3Cache.localUri3)
    }

    let roomphoto3_2Cache = await AsyncStorage.getItem('imageRoom3_2Cache')
    roomphoto3_2Cache = JSON.parse(roomphoto3_2Cache)
    if(roomphoto3_2Cache != null) {
      api.photoRoom3_2cache(roomphoto3_2Cache.id, roomphoto3_2Cache.email, roomphoto3_2Cache.localUri3_2)
    }

    let roomphoto3_3Cache = await AsyncStorage.getItem('imageRoom3_3Cache')
    roomphoto3_3Cache = JSON.parse(roomphoto3_3Cache)
    if(roomphoto3_3Cache != null) {
      api.photoRoom3_3cache(roomphoto3_3Cache.id, roomphoto3_3Cache.email, roomphoto3_3Cache.localUri3_3)
    }

    let roomphoto4Cache = await AsyncStorage.getItem('imageRoom4Cache')
    roomphoto4Cache = JSON.parse(roomphoto4Cache)
    if(roomphoto4Cache != null) {
      api.photoRoom4cache(roomphoto4Cache.id, roomphoto4Cache.email, roomphoto4Cache.localUri4)
    }

    let roomphoto4_2Cache = await AsyncStorage.getItem('imageRoom4_2Cache')
    roomphoto4_2Cache = JSON.parse(roomphoto4_2Cache)
    if(roomphoto4_2Cache != null) {
      api.photoRoom4_2cache(roomphoto4_2Cache.id, roomphoto4_2Cache.email, roomphoto4_2Cache.localUri4_2)
    }

    let roomphoto4_3Cache = await AsyncStorage.getItem('imageRoom4_3Cache')
    roomphoto4_3Cache = JSON.parse(roomphoto4_3Cache)
    if(roomphoto4_3Cache != null) {
      api.photoRoom4_3cache(roomphoto4_3Cache.id, roomphoto4_3Cache.email, roomphoto4_3Cache.localUri4_3)
    }

    let roomphoto5Cache = await AsyncStorage.getItem('imageRoom5Cache')
    roomphoto5Cache = JSON.parse(roomphoto5Cache)
    if(roomphoto5Cache != null) {
      api.photoRoom5cache(roomphoto5Cache.id, roomphoto5Cache.email, roomphoto5Cache.localUri5)
    }

    let roomphoto5_2Cache = await AsyncStorage.getItem('imageRoom5_2Cache')
    roomphoto5_2Cache = JSON.parse(roomphoto5_2Cache)
    if(roomphoto5_2Cache != null) {
      api.photoRoom5_2cache(roomphoto5_2Cache.id, roomphoto5_2Cache.email, roomphoto5_2Cache.localUri5_2)
    }

    let roomphoto5_3Cache = await AsyncStorage.getItem('imageRoom5_3Cache')
    roomphoto5_3Cache = JSON.parse(roomphoto5_3Cache)
    if(roomphoto5_3Cache != null) {
      api.photoRoom5_3cache(roomphoto5_3Cache.id, roomphoto5_3Cache.email, roomphoto5_3Cache.localUri5_3)
    }

    let roomphoto6Cache = await AsyncStorage.getItem('imageRoom6Cache')
    roomphoto6Cache = JSON.parse(roomphoto6Cache)
    if(roomphoto6Cache != null) {
      api.photoRoom6cache(roomphoto6Cache.id, roomphoto6Cache.email, roomphoto6Cache.localUri6)
    }

    let roomphoto6_2Cache = await AsyncStorage.getItem('imageRoom6_2Cache')
    roomphoto6_2Cache = JSON.parse(roomphoto6_2Cache)
    if(roomphoto6_2Cache != null) {
      api.photoRoom6_2cache(roomphoto6_2Cache.id, roomphoto6_2Cache.email, roomphoto6_2Cache.localUri6_2)
    }

    let roomphoto6_3Cache = await AsyncStorage.getItem('imageRoom6_3Cache')
    roomphoto6_3Cache = JSON.parse(roomphoto6_3Cache)
    if(roomphoto6_3Cache != null) {
      api.photoRoom6_3cache(roomphoto6_3Cache.id, roomphoto6_3Cache.email, roomphoto6_3Cache.localUri6_3)
    }

    let roomphoto7Cache = await AsyncStorage.getItem('imageRoom7Cache')
    roomphoto7Cache = JSON.parse(roomphoto7Cache)
    if(roomphoto7Cache != null) {
      api.photoRoom7cache(roomphoto7Cache.id, roomphoto7Cache.email, roomphoto7Cache.localUri7)
    }

    let roomphoto7_2Cache = await AsyncStorage.getItem('imageRoom7_2Cache')
    roomphoto7_2Cache = JSON.parse(roomphoto7_2Cache)
    if(roomphoto7_2Cache != null) {
      api.photoRoom7_2cache(roomphoto7_2Cache.id, roomphoto7_2Cache.email, roomphoto7_2Cache.localUri7_2)
    }

    let roomphoto7_3Cache = await AsyncStorage.getItem('imageRoom7_3Cache')
    roomphoto7_3Cache = JSON.parse(roomphoto7_3Cache)
    if(roomphoto7_3Cache != null) {
      api.photoRoom7_3cache(roomphoto7_3Cache.id, roomphoto7_3Cache.email, roomphoto7_3Cache.localUri7_3)
    }

    let roomphoto8Cache = await AsyncStorage.getItem('imageRoom8Cache')
    roomphoto8Cache = JSON.parse(roomphoto8Cache)
    if(roomphoto8Cache != null) {
      api.photoRoom8cache(roomphoto8Cache.id, roomphoto8Cache.email, roomphoto8Cache.localUri8)
    }

    let roomphoto8_2Cache = await AsyncStorage.getItem('imageRoom8_2Cache')
    roomphoto8_2Cache = JSON.parse(roomphoto8_2Cache)
    if(roomphoto8_2Cache != null) {
      api.photoRoom8_2cache(roomphoto8_2Cache.id, roomphoto8_2Cache.email, roomphoto8_2Cache.localUri8_2)
    }

    let roomphoto8_3Cache = await AsyncStorage.getItem('imageRoom8_3Cache')
    roomphoto8_3Cache = JSON.parse(roomphoto8_3Cache)
    if(roomphoto8_3Cache != null) {
      api.photoRoom8_3cache(roomphoto8_3Cache.id, roomphoto8_3Cache.email, roomphoto8_3Cache.localUri8_3)
    }

    
    
  }
  //THIS BLOCK CORRESPONDS TO CLEAN THE CACHE AND SEND THE INFORMATION THAT THE USER CHANGED MEANWHILE DOESN'T HAVE INTERNET
  


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
        <Drawer.Navigator name="Drawer" component={Drawers} initialRouteName={Calendar2} gestureEnabled={true} screenOptions={{
          drawerType: 'front',
          drawerStyle: {
              backgroundColor: '#232159',
              width: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '50%' : '70%' : (Dimensions.get('window').width >= 414) ? '50%' : '70%',
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
            <Drawer.Screen name="RoomsReserves" component={RoomsReserves} options={{title: 'Your Reserves', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
              <View>
                <TouchableOpacity
                  onPress={() => {this.props.navigation.navigate('Rooms')}}
                  title="Info"
                  color="#fff">
                  <Icon as={Ionicons} name="arrow-back" style={globalStyles.ReportInitIconsGoBack}>Go Back</Icon>
                </TouchableOpacity>
              </View>
            ), headerTintColor:'#fff', drawerItemStyle: { height: 0 }}}/>
            <Drawer.Screen name="YearCalendar" component={YearCalendar} options={{title: 'Calendar', headerStyle:{ backgroundColor: '#232159'}, headerRight: () => (
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