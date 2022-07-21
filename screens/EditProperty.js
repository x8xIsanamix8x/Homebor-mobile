import React, {Component, useState, useEffect} from 'react';
import { View, ScrollView, Image, Platform, Alert, TouchableHighlight, Dimensions} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Spinner, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { Camera } from 'expo-camera';
import Constants from 'expo-constants'


import globalStyles from '../styles/global';
import Card from '../shared/card';

import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';

import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';

import api from '../api/api';

import NetInfo from "@react-native-community/netinfo";

const Tabs = createBottomTabNavigator();

export default function EditProperty() {
  return(

    <Tabs.Navigator screenOptions={{
      lazy : true,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'gray',
      tabBarInactiveBackgroundColor : '#232159', 
      tabBarStyle: {
        backgroundColor: '#232159',  
      },
      
    }}>
      <Tabs.Screen name="EditBasic" component={BasicEdit} options={{title: 'Basic Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/disponibilidad-16.png')
        : require('../assets/disponibilidad-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditGallery" component={GalleryEdit} options={{title: 'Gallery', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/gallery-16.png')
        : require('../assets/gallery-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditAdditional" component={AdditionalEdit} options={{title: 'Additional Info', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/additional-16.png')
        : require('../assets/additional-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      <Tabs.Screen name="EditFamily" component={FamilyEdit} options={{title: 'My Family', headerShown: false, tabBarIcon: ({ focused }) => { const image = focused
        ? require('../assets/family-16.png')
        : require('../assets/family-16.png')
        return (
            <Image
                source={image}
                resizeMode="contain"
                style={globalStyles.tabicon}/>
        )}}}/>

      
      
    </Tabs.Navigator>

)
}


class BasicEdit extends Component {
    NetInfoSubscription = null;
  
    constructor(props){ 
		super(props); 
			this.state = {
                //Profile Variables 
                email : '',
                perm : false,
                info : [],

                itemVegetarian : false,
                itemHalal : false,
                itemKosher : false,
                itemLactose : false,
                itemGluten : false,
                itemPork : false,
                itemNone : false,
                itemDog : false,
                itemCat : false,
                itemOther : false,

                //Calendars DATE PICKERS
                date: new Date(),
                mode: 'date',
                show: false,

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

      //Get user 
      let userLogin = await AsyncStorage.getItem('userLogin')
      userLogin = JSON.parse(userLogin)
      this.setState({ email : userLogin.email, perm : userLogin.perm})
      
      if(this.state.connection_status == true) {
        //Get user profile data
        let profile = await api.getBasicdata(this.state.email,this.state.perm)
        this.setState({ info : profile.data, connection_refreshStatus: false, hname : profile.data[0].h_name, num : profile.data[0].num, h_type : profile.data[0].h_type, m_city : profile.data[0].m_city, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, id : profile.data[0].id_home, idm : profile.data[0].id_m, smoke2 : profile.data[0].smoke, y_service : profile.data[0].y_service, m_service : profile.data[0].m_service, vegetarians : profile.data[0].vegetarians, halal : profile.data[0].halal, kosher : profile.data[0].kosher, lactose : profile.data[0].lactose, gluten : profile.data[0].gluten, pork : profile.data[0].pork, none : profile.data[0].none, pet : profile.data[0].pet, type_pet : profile.data[0].type_pet, dog : profile.data[0].dog, cat : profile.data[0].cat, other : profile.data[0].other, pet_num: profile.data[0].pet_num, HouseLName : profile.data[0].l_name_h.toUpperCase(), HouseName : profile.data[0].name_h.toLowerCase()})

        //Checkboxes conditions
        if (this.state.dog == 'yes') {
          this.setState({itemDog : true})
          } else {
              this.setState({itemDog : false}) 
          }
        if (this.state.cat == 'yes') {
              this.setState({itemCat : true})
          } else {
              this.setState({itemCat : false}) 
          }
        if (this.state.other == 'yes') {
              this.setState({itemOther : true})
          } else {
              this.setState({itemOther : false}) 
          }
          if (this.state.vegetarians == 'yes') {
            this.setState({itemVegetarian : true})
          } else {
              this.setState({itemVegetarian : false}) 
          }
          if (this.state.halal == 'yes') {
              this.setState({itemHalal : true})
          } else {
              this.setState({itemHalal : false}) 
          }
          if (this.state.kosher == 'yes') {
              this.setState({itemKosher : true})
          } else {
              this.setState({itemKosher : false}) 
          }
          if (this.state.lactose == 'yes') {
              this.setState({itemLactose : true})
          } else {
              this.setState({itemLactose : false}) 
          }
          if (this.state.gluten == 'yes') {
              this.setState({itemGluten : true})
          } else {
              this.setState({itemGluten : false}) 
          }
          if (this.state.pork == 'yes') {
              this.setState({itemPork : true})
          } else {
              this.setState({itemPork : false}) 
          }
          if (this.state.none == 'yes') {
              this.setState({itemNone : true})
          } else {
              this.setState({itemNone : false}) 
          }
          this.setState({readyDisplay : true})
        } else {
          this.setState({connection_refreshStatus: true, readyDisplay : true})
        }

        this._onFocusListener = this.props.navigation.addListener('focus', () => {
          this.refresh()
          });
    }

    //Register to database Function asyncronus
    registerbasici = async () => {
        //console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.h_type,this.state.m_city,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.smoke2, this.state.y_service, this.state.m_service,this.state.itemVegetarian,this.state.itemHalal,this.state.itemKosher,this.state.itemLactose,this.state.itemGluten,this.state.itemPork,this.state.itemNone,this.state.pet, this.state.pet_num, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.type_pet, this.state.idm)
        api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.h_type,this.state.m_city,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.smoke2, this.state.y_service, this.state.m_service,this.state.itemVegetarian,this.state.itemHalal,this.state.itemKosher,this.state.itemLactose,this.state.itemGluten,this.state.itemPork,this.state.itemNone,this.state.pet, this.state.pet_num, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.type_pet, this.state.idm)
    };

    refresh = async() => {
      if(this.state.connection_status == true) {
          this.setState({connection_refreshStatus: false, readyDisplay : true})
      } else {
          this.setState({connection_refreshStatus: true, readyDisplay : true})
      }
    }

    setDate = (event, date) => {
      date = date || this.state.date;
    
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        date,
      });
    
      const dateY = new Date(date.setDate(date.getDate()));
      let YDAY= dateY.getMonth()<9 ? dateY.getDate()<=9 ? `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-0${dateY.getMonth() + 1}-${dateY.getDate()}` : dateY.getDate()<=9 ? `${dateY.getFullYear()}-${dateY.getMonth() + 1}-0${dateY.getDate()}` : `${dateY.getFullYear()}-${dateY.getMonth() + 1}-${dateY.getDate()}`
      this.setState({y_service : YDAY})
      
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

	render(){

        //Variables to get file from frontend
        let { show, date, mode } = this.state;
    
    return (
      <NativeBaseProvider>
        {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }}>
                        <View style={globalStyles.skeletonMarginProfileText}>
                            <HStack space="2" alignItems="center">
                                <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                            </HStack>
                        </View>
                        <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }}>
                            <View style={globalStyles.skeletonMarginProfileText}>
                                <HStack space="2" alignItems="center">
                                    <Skeleton size="5" rounded="full" />
                                    <Skeleton h="3" flex="2" rounded="full" />
                                </HStack>
                            </View>
                            <Skeleton.Text px="5" />
                            <Skeleton.Text px="5" my="4" />
                            <Skeleton.Text px="5" my="4" />
                        </VStack>
                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
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

                    <View style={globalStyles.WelcomeImageMargin}>

                        <Image
                                                                                        
                            resizeMode="cover"
                            source={require('../assets/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet}
                        ></Image>

                    </View>

                    <View style={globalStyles.WelcomeTextandBoton}>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                    </View>

                    {this.state.connection_status ?
                        <View>
                            <Text onPress={this.onRefresh} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                        </View>
                    : 
                        <View>
                            <Text onPress={this.tryAgainNotConnection} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                        </View>
                    }

                </View>
                )}

              {this.state.connection_refreshStatus == false && (
                <View>
                  <FlatList
                      data={this.state.info}
                      extraData={this.state.info}
                      keyExtractor={item => `${item.info}`}
                      ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                      nestedScrollEnabled={true}
                      bounces={false}
                      renderItem={({item}) => (
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

                            <StatusBar style="light" translucent={true} />
                            <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                              <ScrollView 
                                nestedScrollEnabled={true} 
                                alwaysBounceHorizontal={false}
                                alwaysBounceVertical={false}
                                bounces={false}>
                                  <View style={ globalStyles.contenido } >
                                    <View style={globalStyles.marginTopRequiredFields}>
                                      <Heading size='xl'style={ globalStyles.titulo }>Basic Information</Heading>
                                    </View>

                                      <FormControl>
                                        {/*House Information*/}
                                        <Card>
                                          <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets}>House Information</Heading>
                                              
                                              <Image source={require("../assets/disponibilidad-16.png")}
                                                      resizeMode="contain"
                                                      style={globalStyles.editicon}/>
                                          </View>
              
                                          <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>House Name</Text></FormControl.Label>
                                                <Input 
                                                      defaultValue={`${this.state.HouseLName}, ${this.state.HouseName}`}
                                                      placeholder="e.g. John Smith Residence"
                                                      style={ globalStyles.inputedit}
                                                      variant="filled"
                                                      isReadOnly
                                                  />
                                            </Stack>
              
              
                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Phone Number</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.num == 'NULL' ? '' : item.num}
                                                    onChangeText={ (num) => this.setState({num}) }
                                                    placeholder="e.g. 55575846"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>
                                          </Stack>

                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Type of Residence</Text></FormControl.Label>

                                                    
                                          <View style={globalStyles.editMargintop}>
                                              <Picker
                                                  style={globalStyles.pickerBasicinfoResidence}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  selectedValue={this.state.h_type == 'NULL' ? "Select"  : this.state.h_type}
                                                  onValueChange={(h_type) => this.setState({h_type})}>
                                                      <Picker.Item label="Select" value="NULL" />
                                                      <Picker.Item label="House" value="House" /> 
                                                      <Picker.Item label="Apartment" value="Apartment" />
                                                      <Picker.Item label="Condominium" value="Condominium" />
                                              </Picker>
                                          </View>
              
                                        </Card>
              
                                        {/*Location*/}
                                        <Card>

                                          
                                          <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Location</Heading>
                                              
                                              <Image source={require("../assets/location-16.png")}
                                                                  resizeMode="contain"
                                                                  style={globalStyles.editiconLoc}/>
                                          </View>

                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Main City</Text></FormControl.Label>
                                                    
                                          <View style={globalStyles.editMargintop}>
                                              <Picker
                                                  style={globalStyles.pickerBasicinfo}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  selectedValue={this.state.m_city == 'NULL' ? "Select"  : this.state.m_city}
                                                  onValueChange={(m_city) => this.setState({m_city})}>
                                                      <Picker.Item label="Select" value="NULL" />
                                                      <Picker.Item label="Toronto" value="Toronto" /> 
                                                      <Picker.Item label="Montreal" value="Montreal" />
                                                      <Picker.Item label="Ottawa" value="Ottawa" />
                                                      <Picker.Item label="Quebec" value="Quebec" />
                                                      <Picker.Item label="Calgary" value="Calgary" />
                                                      <Picker.Item label="Vancouver" value="Vancouver" />
                                                      <Picker.Item label="Victoria" value="Victoria" />
                                              </Picker>
                                          </View>
              
                                          <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Address</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                                    onChangeText={ (dir) => this.setState({dir}) }
                                                    placeholder="e.g. Av, Street, etc."
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>
              
              
                                            <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>City</Text></FormControl.Label>
                                                <Input 
                                                      defaultValue={item.city == 'NULL' ? '' : item.city}
                                                      onChangeText={ (cities) => this.setState({cities}) }
                                                      placeholder="e.g. Davenport"
                                                      style={ globalStyles.inputedit}
                                                  />
                                            </Stack>
              
                                            <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>State</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.state == 'NULL' ? '' : item.state}
                                                    onChangeText={ (states) => this.setState({states}) }
                                                    placeholder="e.g. Ontario"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>
              
                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Postal Code</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.p_code == 'NULL' ? '' : item.p_code}
                                                    onChangeText={ (p_code) => this.setState({p_code}) }
                                                    placeholder="No Special Characters"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>
                                          </Stack>
              
                                        </Card>
                                        
                                        {/*Preference */}
                                        <Card>
                                        <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Your Preference</Heading>
                                              
                                              <Image source={require("../assets/disponibilidad-16.png")}
                                                      resizeMode="contain"
                                                      style={globalStyles.editicon}/>
                                          </View>
                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Smoker Politics</Text></FormControl.Label>

                                            <View style={globalStyles.editMargintop}>
                                              <Picker
                                                  style={globalStyles.pickerSmokerEdit} 
                                                  selectedValue={this.state.smoke2}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  onValueChange={(smoke2) => this.setState({smoke2})}>
                                                      <Picker.Item label="Select" value="NULL" />
                                                      <Picker.Item label="Outside-Ok" value="Outside-OK" /> 
                                                      <Picker.Item label="Inside-Ok" value="Inside-OK" />
                                                      <Picker.Item label="Strictly Non-Smoking" value="Strictly Non-Smoking" />
                                              </Picker>
                                            </View>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Since when have you been Homestay?</Text></FormControl.Label>
                                            <View>
                                                    <View>
                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                        <Input
                                                            isReadOnly={true}
                                                            InputRightElement={
                                                                <TouchableOpacity
                                                                style={globalStyles.DatesinputRLelements}
                                                                onPress={this.datepicker}>
                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                </TouchableOpacity>
                                                            }
                                                            style={ globalStyles.inputedit}
                                                            placeholder="Message"
                                                            value={this.state.y_service == 'NULL' ? '' : this.state.y_service}
                                                            onChangeText={ (y_service) => this.setState({y_service}) }
                                                        />
                                                    </Stack> 

                                                    </View>
                                                        { show && Platform.OS != 'ios' && <DateTimePicker 
                                                                    value={date}
                                                                    mode={mode}
                                                                    is24Hour={true}
                                                                    display="default"
                                                                    onChange={this.setDate} />
                                                        }
                                                        { show && Platform.OS === 'ios' && 
                                                                <View>
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
                                                                </View>
                                                        }
                                            </View>
                                          </Stack>  

                                            <FormControl.Label style={ globalStyles.infotitle}>Do you want to offer food services?</FormControl.Label>

                                                        
                                                      <View style={globalStyles.editMargintop}>
                                                          <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              selectedValue={this.state.m_service == 'NULL' ? "Select"  : this.state.m_service}
                                                              onValueChange={(m_service) => this.setState({m_service})}>
                                                                  <Picker.Item label="-- Select --" value="NULL" />
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                          </Picker>
                                                      </View>

                                                      {this.state.m_service == 'Yes' && (
                                                        <View>
                                                            <FormControl.Label style={ globalStyles.infotitle}>Special Diet</FormControl.Label>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                              <Checkbox  value={this.state.itemVegetarian} onValueChange={(itemVegetarian) => this.setState({itemVegetarian})} color={this.state.itemVegetarian ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                              <Text style={globalStyles.labelSelectEdit}>Vegetarian</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemHalal} onValueChange={(itemHalal) => this.setState({itemHalal})} color={this.state.itemHalal ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>Halal (Muslims)</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemKosher} onValueChange={(itemKosher) => this.setState({itemKosher})} color={this.state.itemKosher ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>Kosher (Jews)</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemLactose} onValueChange={(itemLactose) => this.setState({itemLactose})} color={this.state.itemLactose ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>Lactose Intolerant</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemGluten} onValueChange={(itemGluten) => this.setState({itemGluten})} color={this.state.itemGluten ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>Gluten Free Diet</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemPork} onValueChange={(itemPork) => this.setState({itemPork})} color={this.state.itemPork ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>No Pork</Text>
                                                            </View>

                                                            <View style={globalStyles.editSelectsSquare}>
                                                                <Checkbox  value={this.state.itemNone} onValueChange={(itemNone) => this.setState({itemNone})} color={this.state.itemNone ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                                <Text style={globalStyles.labelSelectEdit}>None</Text>
                                                            </View>
                                                        </View>
                                                      )}

                                                <FormControl.Label style={ globalStyles.infotitle}>Do you have pets?</FormControl.Label>

                                                            
                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          selectedValue={this.state.pet == 'NULL' ? "Select"  : this.state.pet}
                                                          onValueChange={(pet) => this.setState({pet})}>
                                                              <Picker.Item label="-- Select --" value="NULL" />
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                      </Picker>
                                                  </View>

                                                  {this.state.pet == 'Yes' && 
                                                    <View>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                        <FormControl.Label style={ globalStyles.infotitle}>How many pets?</FormControl.Label>
                                                            <View style={globalStyles.editMargintop}>
                                                              <Picker
                                                                  style={globalStyles.pickerBasicinfo}
                                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                  selectedValue={this.state.pet_num == 'NULL' ? "Select"  : this.state.pet_num}
                                                                  onValueChange={ (pet_num) => this.setState({pet_num}) }>
                                                                      <Picker.Item label="-- Select --" value="NULL" />
                                                                      <Picker.Item label="1" value="1" /> 
                                                                      <Picker.Item label="2" value="2" />
                                                                      <Picker.Item label="3" value="3" />
                                                                      <Picker.Item label="4" value="4" />
                                                                      <Picker.Item label="5" value="5" />
                                                                      <Picker.Item label="6" value="6" />
                                                                      <Picker.Item label="7" value="7" />
                                                                      <Picker.Item label="8" value="8" />
                                                                      <Picker.Item label="9" value="9" />
                                                              </Picker>
                                                            </View>
                                                  
                                                      </Stack>

                                                      <FormControl.Label style={ globalStyles.infotitle}>What kind of pets?</FormControl.Label>

                                                        <View style={globalStyles.editSelectsSquare}>
                                                            <Checkbox  value={this.state.itemDog} onValueChange={(itemDog) => this.setState({itemDog})} color={this.state.itemDog ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                            <Text style={globalStyles.labelSelectEdit}>Dogs</Text>
                                                        </View>

                                                        <View style={globalStyles.editSelectsSquare}>
                                                            <Checkbox  value={this.state.itemCat} onValueChange={(itemCat) => this.setState({itemCat})} color={this.state.itemCat ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                            <Text style={globalStyles.labelSelectEdit}>Cats</Text>
                                                        </View>

                                                        <View style={globalStyles.editSelectsSquare}>
                                                            <Checkbox  value={this.state.itemOther} onValueChange={(itemOther) => this.setState({itemOther})} color={this.state.itemOther ? '#B70B7B' : undefined} style={{borderColor: "black", size: "5%"}} aria-label="Close"/>
                                                            <Text style={globalStyles.labelSelectEdit}>Others</Text>
                                                        </View>
                                                        
                                                        {this.state.itemOther == true &&
                                                          <View>
                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                              <FormControl.Label style={ globalStyles.infotitle}>Specify</FormControl.Label>
                                                                <Input 
                                                                    defaultValue={item.type_pet == 'NULL' ? '' : item.type_pet}
                                                                    onChangeText={ (type_pet) => this.setState({type_pet}) }
                                                                    placeholder="e.g. Birds"
                                                                    style={ globalStyles.inputedit}
                                                                />
                                                            </Stack>
                                                          </View>
                                                      }
                                                          
                                                    </View>
                                                  }

                                        </Card>
                                      </FormControl>

                                      {this.state.connection_status ?
                                          <View>

                                            <Button
                                            success
                                            bordered
                                            onPress={this.registerbasici}
                                            style={globalStyles.botonedit}
                                            >

                                            <Text style={globalStyles.botonTexto}> Update </Text>

                                            </Button>
                                            
                                          </View> 
                                            :
                                            <View>
                                              <Button
                                                  success
                                                  bordered
                                                  onPress={this.noInternetConnection}
                                                  style={globalStyles.botonedit}
                                                  >

                                                  <Text style={globalStyles.botonTexto}> Update </Text>

                                              </Button>
                                          </View> 
                                      }
                                      
                                  </View>
                              </ScrollView>
                              </KeyboardAwareScrollView>
                          
                          </View>
                      )}> 
                  </FlatList>
                </View>
                )}
            </View>)}
      </NativeBaseProvider>
    );
  }
  }

class GalleryEdit extends Component {
  NetInfoSubscription = null;
  
  constructor(props){ 
		super(props); 
			this.state = {
                //User Variables 
                email : '',
                perm : false,
                info : [],

                //Default Image
                imagehome: require('../assets/vacios-homebor-casa.png'),
                imageliving: require('../assets/vacios-homebor-sala.png'),
                imagefamily: require('../assets/vacios-homebor-familia.png'),
                imagekitchen: require('../assets/vacios-homebor-cocina.png'),
                imagedining: require('../assets/vacios-homebor-comedor.png'),
                imagecommon1: require('../assets/vacios-homebor-areas-recreativas.png'),
                imagecommon2: require('../assets/vacios-homebor-areas-recreativas.png'),
                imagebath1: require('../assets/vacios-homebor-bath.png'),
                imagebath2: require('../assets/vacios-homebor-bath.png'),
                imagebath3: require('../assets/vacios-homebor-bath.png'),
                imagebath4: require('../assets/vacios-homebor-bath.png'),

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

      //Get user 
      let userLogin = await AsyncStorage.getItem('userLogin')
      userLogin = JSON.parse(userLogin)
      this.setState({ email : userLogin.email, perm : userLogin.perm})
      console.log(userLogin)
      
      if(this.state.connection_status == true) {
        //Get photos from profile user
        let profile = await api.getGalleryPhotos(this.state.email,this.state.perm)
        this.setState({ info : profile.data, connection_refreshStatus: false, id: profile.data[0].id_home, idm: profile.data[0].id_m, photo0: 'Yes', photo1: 'Yes', photo2: 'Yes', photo3: 'Yes', photo4: 'Yes', photo5: 'Yes', photo6: 'Yes', photo7: 'Yes', photo8: 'Yes', photo9: 'Yes', photo10: 'Yes', photo11: 'Yes', readyDisplay : true})
      } else {
        this.setState({connection_refreshStatus: true, readyDisplay : true})
      }

      //Permissions function call to access to the gallery of phone 
      this.getPermissionAsync();

      this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.refresh()
        });

    };

    //Permissions function to access to the gallery of phone 
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.');
                
            }
        }
    }

    refresh = async() => {
      if(this.state.connection_status == true) {
          this.setState({connection_refreshStatus: false, readyDisplay : true})
      } else {
          this.setState({connection_refreshStatus: true, readyDisplay : true})
      }
    }

    //This group of functions is used to ask to user which way prefer to catch the images, from the gallery or from the camera
    _Alerthome = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera(),},
              {text: 'Folder', onPress: () => this._pickImage()},
            ],
            { cancelable: true }
          )
    }

    _Alertliving = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera2(),},
              {text: 'Folder', onPress: () => this._pickImage2()},
            ],
            { cancelable: true }
          )
    }

    _Alertfamily = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera3(),},
              {text: 'Folder', onPress: () => this._pickImage3()},
            ],
            { cancelable: true }
          )
    }

    _Alertkitchen = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera4(),},
              {text: 'Folder', onPress: () => this._pickImage4()},
            ],
            { cancelable: true }
          )
    }

    _Alertdining = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera5(),},
              {text: 'Folder', onPress: () => this._pickImage5()},
            ],
            { cancelable: true }
          )
    }

    _Alertcommon1 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera6(),},
              {text: 'Folder', onPress: () => this._pickImage6()},
            ],
            { cancelable: true }
          )
    }

    _Alertcommon2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera7(),},
              {text: 'Folder', onPress: () => this._pickImage7()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath1 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera8(),},
              {text: 'Folder', onPress: () => this._pickImage8()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath2 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera9(),},
              {text: 'Folder', onPress: () => this._pickImage9()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath3 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera10(),},
              {text: 'Folder', onPress: () => this._pickImage10()},
            ],
            { cancelable: true }
          )
    }

    _Alertbath4 = async () => { 
        Alert.alert(
            'Important!',
            'We recommend to use images from the folder for more speed and integrity on the file update',
            [        
              {text: 'Camera', onPress: () => this._pickImageCamera11(),},
              {text: 'Folder', onPress: () => this._pickImage11()},
            ],
            { cancelable: true }
          )
    }


    //_pickImageCamera is a group of functions to catch the images from the camera.
    //_pickImage is a group of functions to catch the images from the gallery folder.
    _pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 imagehome: result.uri
             });


        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 imagehome: result.uri
             });


        }
    }

    _pickImage2 = async () => {
        let result2 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                imageliving: result2.uri
             });


        }
    }

    _pickImageCamera2 = async () => {
        let result2 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                imageliving: result2.uri
             });


        }
    }

    _pickImage3 = async () => {
        let result3 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3);

        if(!result3.cancelled) {
            this.setState({
                imagefamily: result3.uri
             });


        }
    }

    _pickImageCamera3 = async () => {
        let result3 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result3);

        if(!result3.cancelled) {
            this.setState({
                imagefamily: result3.uri
             });


        }
    }

    _pickImage4 = async () => {
        let result4 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4);

        if(!result4.cancelled) {
            this.setState({
                imagekitchen: result4.uri
             });


        }
    }

    _pickImageCamera4 = async () => {
        let result4 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result4);

        if(!result4.cancelled) {
            this.setState({
                imagekitchen: result4.uri
             });


        }
    }

    _pickImage5 = async () => {
        let result5 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5);

        if(!result5.cancelled) {
            this.setState({
                imagedining: result5.uri
             });


        }
    }

    _pickImageCamera5 = async () => {
        let result5 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result5);

        if(!result5.cancelled) {
            this.setState({
                imagedining: result5.uri
             });


        }
    }

    _pickImage6 = async () => {
        let result6 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6);

        if(!result6.cancelled) {
            this.setState({
                imagecommon1: result6.uri
             });


        }
    }

    _pickImageCamera6 = async () => {
        let result6 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result6);

        if(!result6.cancelled) {
            this.setState({
                imagecommon1: result6.uri
             });


        }
    }

    _pickImage7 = async () => {
        let result7 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7);

        if(!result7.cancelled) {
            this.setState({
                imagecommon2: result7.uri
             });


        }
    }

    _pickImageCamera7 = async () => {
        let result7 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result7);

        if(!result7.cancelled) {
            this.setState({
                imagecommon2: result7.uri
             });


        }
    }

    _pickImage8 = async () => {
        let result8 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8);

        if(!result8.cancelled) {
            this.setState({
                imagebath1: result8.uri
             });


        }
    }

    _pickImageCamera8 = async () => {
        let result8 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result8);

        if(!result8.cancelled) {
            this.setState({
                imagebath1: result8.uri
             });


        }

    }

    _pickImage9 = async () => {
        let result9 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result9);

        if(!result9.cancelled) {
            this.setState({
                imagebath2: result9.uri
             });


        }
    }

    _pickImageCamera9 = async () => {
        let result9 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result9);

        if(!result9.cancelled) {
            this.setState({
                imagebath2: result9.uri
             });


        }
    }

    _pickImage10 = async () => {
        let result10 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result10);

        if(!result10.cancelled) {
            this.setState({
                imagebath3: result10.uri
             });


        }
    }

    _pickImageCamera10 = async () => {
        let result10 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result10);

        if(!result10.cancelled) {
            this.setState({
                imagebath3: result10.uri
             });


        }
    }

    _pickImage11 = async () => {
        let result11 = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result11);

        if(!result11.cancelled) {
            this.setState({
                imagebath4: result11.uri
             });


        }
    }

    _pickImageCamera11 = async () => {
        let result11 = await ImagePicker.launchCameraAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result11);

        if(!result11.cancelled) {
            this.setState({
                imagebath4: result11.uri
             });


        }
    }

    //Function call to register the images to database 
    registerbasici = async () => {
         //Functions call to register the images to database
         let localUri = this.state.imagehome;
         if (localUri == require('../assets/vacios-homebor-casa.png')) {} 
         else { this.registerfile1() }
         let localUri2 = this.state.imageliving;
         if (localUri2 == require('../assets/vacios-homebor-sala.png')) {} 
         else { this.registerfile2() }
         let localUri3 = this.state.imagefamily;
         if (localUri3 == require('../assets/vacios-homebor-familia.png')) {} 
         else { this.registerfile3() }
         let localUri4 = this.state.imagekitchen;
         if (localUri4 == require('../assets/vacios-homebor-cocina.png')) {} 
         else { this.registerfile4() }
         let localUri5 = this.state.imagedining;
         if (localUri5 == require('../assets/vacios-homebor-comedor.png')) {} 
         else { this.registerfile5() }
         let localUri6 = this.state.imagecommon1;
         if (localUri6 == require('../assets/vacios-homebor-areas-recreativas.png')) {} 
         else { this.registerfile6() }
         let localUri7 = this.state.imagecommon2;
         if (localUri7 == require('../assets/vacios-homebor-areas-recreativas.png')) {} 
         else { this.registerfile7() }
         let localUri8 = this.state.imagebath1;
         if (localUri8 == require('../assets/vacios-homebor-bath.png')) {} 
         else { this.registerfile8() }
         let localUri9 = this.state.imagebath2;
         if (localUri9 == require('../assets/vacios-homebor-bath.png')) {} 
         else { this.registerfile9() }
         let localUri10 = this.state.imagebath3;
         if (localUri10 == require('../assets/vacios-homebor-bath.png')) {} 
         else { this.registerfile10() }
         let localUri11 = this.state.imagebath4;
         if (localUri11 == require('../assets/vacios-homebor-bath.png')) {} 
         else { this.registerfile11() }
          this.registerlog()
         
    }

    
    //Functions to register the images to database
    registerfile1 = async () => {
        //Variable of image
        let localUri = this.state.imagehome;

        //if user don't submit this images them go to the next function
        if (localUri == null) { this.registerfile2() } 
        else {  
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo', { uri: localUri, name: filename, type });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo1 = this.state.photo1;

          //call to the api to register the images
          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo1=${photo1}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with frontage photo upload')
              }
            });
        }
    };

    registerfile2 = async () => {
        let localUri2 = this.state.imageliving;

        if (localUri2 == null) { this.registerfile3() } 
        else {  
          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo2', { uri: localUri2, name: filename2, type : type2 });

          console.log('Comprobante de envio 2')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo2 = this.state.photo2;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo2=${photo2}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with living room photo upload')
              }
            });
        }
    };

    registerfile3 = async () => {
        let localUri3 = this.state.imagefamily;

        if (localUri3 == null) { this.registerfile4() } 
        else {  
          //Files
          let filename3 = localUri3.split('/').pop();
          let match3 = /\.(\w+)$/.exec(filename3);
          let type3 = match3 ? `image/${match3[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo3', { uri: localUri3, name: filename3, type : type3 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo3 = this.state.photo3;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo3=${photo3}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with family photo upload')
              }
            });
        }
    };

    registerfile4 = async () => {
        let localUri4 = this.state.imagekitchen;

        if (localUri4 == null) { this.registerfile5() } 
        else {  
          //Files
          let filename4 = localUri4.split('/').pop();
          let match4 = /\.(\w+)$/.exec(filename4);
          let type4 = match4 ? `image/${match4[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo4', { uri: localUri4, name: filename4, type : type4 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo4 = this.state.photo4;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo4=${photo4}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with kitchen photo upload')
              }
            });
        }
    };

    registerfile5 = async () => {
        let localUri5 = this.state.imagedining;

        if (localUri5 == null) { this.registerfile6() } 
        else {  
          //Files
          let filename5 = localUri5.split('/').pop();
          let match5 = /\.(\w+)$/.exec(filename5);
          let type5 = match5 ? `image/${match5[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo5', { uri: localUri5, name: filename5, type : type5 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo5 = this.state.photo5;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo5=${photo5}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with dining photo upload')
              }
            });
        }
    };

    registerfile6 = async () => {
        let localUri6 = this.state.imagecommon1;

        if (localUri6 == null) { this.registerfile7() } 
        else {  
          //Files
          let filename6 = localUri6.split('/').pop();
          let match6 = /\.(\w+)$/.exec(filename6);
          let type6 = match6 ? `image/${match6[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo6', { uri: localUri6, name: filename6, type : type6 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo6 = this.state.photo6;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo6=${photo6}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with house area 3 photo upload')
              }
            });
        }
    };

    registerfile7 = async () => {
        let localUri7 = this.state.imagecommon2;

        if (localUri7 == null) { this.registerfile8() } 
        else {  
          //Files
          let filename7 = localUri7.split('/').pop();
          let match7 = /\.(\w+)$/.exec(filename7);
          let type7 = match7 ? `image/${match7[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo7', { uri: localUri7, name: filename7, type : type7 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo7 = this.state.photo7;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo7=${photo7}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with house area 4 photo upload')
              }
            });
        }
    };

    registerfile8 = async () => {
        let localUri8 = this.state.imagebath1;

        if (localUri8 == null) { this.registerfile9() } 
        else {  
          //Files
          let filename8 = localUri8.split('/').pop();
          let match8 = /\.(\w+)$/.exec(filename8);
          let type8 = match8 ? `image/${match8[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo8', { uri: localUri8, name: filename8, type : type8 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo8 = this.state.photo8;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo8=${photo8}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 1 photo upload')
              }
            });
        }
    };

    registerfile9 = async () => {
        let localUri9 = this.state.imagebath2;

        if (localUri9 == null) { this.registerfile10() } 
        else {  
          //Files
          let filename9 = localUri9.split('/').pop();
          let match9 = /\.(\w+)$/.exec(filename9);
          let type9 = match9 ? `image/${match9[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo9', { uri: localUri9, name: filename9, type : type9 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo9 = this.state.photo9;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo9=${photo9}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 2 photo upload')
              }
            });
        }
    };


    registerfile10 = async () => {
        let localUri10 = this.state.imagebath3;

        if (localUri10 == null) { this.registerfile11() } 
        else {  
          //Files
          let filename10 = localUri10.split('/').pop();
          let match10 = /\.(\w+)$/.exec(filename10);
          let type10 = match10 ? `image/${match10[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo10', { uri: localUri10, name: filename10, type : type10 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo10 = this.state.photo10;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo10=${photo10}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 3 photo upload')
              }
            });
        }
    };

    registerfile11 = async () => {
        let localUri11 = this.state.imagebath4;

        if (localUri11 == null) { } 
        else {  
          //Files
          let filename11 = localUri11.split('/').pop();
          let match11 = /\.(\w+)$/.exec(filename11);
          let type11 = match11 ? `image/${match11[1]}` : `image`;

        

          let formData = new FormData();
          formData.append('photo11', { uri: localUri11, name: filename11, type : type11 });

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let eMail = this.state.email;
          let id = this.state.id;
          let photo11 = this.state.photo11;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo11=${photo11}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with bathroom 4 photo upload')
              }
            });
        }
    };

    registerlog = async () => {

          let eMail = this.state.email;
          let id = this.state.id;
          let photo0 = this.state.photo0;
          let idm = this.state.idm;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}&id=${id}&photo0=${photo0}&idm=${idm}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Data Uploaded Successfully')
              }
              else {
                Alert.alert('Error')
              }
            });
    };

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

	render(){

        //Variables to get default images
        let { imagehome } = this.state;
        let { imageliving } = this.state;
        let { imagefamily } = this.state;
        let { imagekitchen } = this.state;
        let { imagedining } = this.state;
        let { imagecommon1 } = this.state;
        let { imagecommon2 } = this.state;
        let { imagebath1 } = this.state;
        let { imagebath2 } = this.state;
        let { imagebath3 } = this.state;
        let { imagebath4 } = this.state;

  return (
    <NativeBaseProvider>
      {this.state.readyDisplay == false && (
        <View style={globalStyles.skeletonMarginTop}>
          <Center w="100%">
              <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
              borderColor: "coolGray.500"
              }} _light={{
              borderColor: "coolGray.200"
              }}>
                  <View style={globalStyles.skeletonMarginProfileText}>
                      <HStack space="2" alignItems="center">
                          <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                      </HStack>
                  </View>
                  <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                      borderColor: "coolGray.500"
                      }} _light={{
                      borderColor: "coolGray.200"
                      }}>
                      <HStack space="4">
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                      </HStack>
                  </VStack>
                  <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                      borderColor: "coolGray.500"
                      }} _light={{
                      borderColor: "coolGray.200"
                      }}>
                      <HStack space="4">
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                      </HStack>
                  </VStack>
                  <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                      borderColor: "coolGray.500"
                      }} _light={{
                      borderColor: "coolGray.200"
                      }}>
                      <HStack space="4">
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                          <Skeleton h="90" w="30%" />
                      </HStack>
                  </VStack>
                  <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
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

            <View style={globalStyles.WelcomeImageMargin}>

                <Image
                                                                                
                    resizeMode="cover"
                    source={require('../assets/vacios-homebor-antena.png')}
                    style={globalStyles.imageNotInternet}
                ></Image>

            </View>

            <View style={globalStyles.WelcomeTextandBoton}>
                <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
            </View>

            {this.state.connection_status ?
                <View>
                    <Text onPress={this.onRefresh} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                </View>
            : 
                <View>
                    <Text onPress={this.tryAgainNotConnection} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                </View>
            }

        </View>
        )}

        {this.state.connection_refreshStatus == false && (
          <View>
            <FlatList
                data={this.state.info}
                extraData={this.state.info}
                keyExtractor={item => `${item.info}`}
                ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                nestedScrollEnabled={true}
                bounces={false}
                renderItem={({item}) => (
                    <View>
                      <StatusBar style="light" translucent={true} />

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

                            <View style={globalStyles.marginTopRequiredFields}>
                                <Heading size='xl'style={ globalStyles.titulo }>House Gallery</Heading>
                            </View>
                        <ScrollView horizontal={true}>
                            {/*Frontage Photo*/}

                            <TouchableOpacity onPress={()=>this._Alerthome()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <Heading size='md' style={globalStyles.titlegalleryedit}> Frontage Photo </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                    {imagehome == require('../assets/vacios-homebor-casa.png') ?
                                                    item.phome == "NULL" ?
                                                    <Image source={imagehome}
                                                    style={globalStyles.ImageGalleryedit} />
                                                    :
                                                    <Image source={{uri: `http://homebor.com/${item.phome}`}}
                                                    style={globalStyles.ImageGalleryedit} />
                                                    :
                                                    <Image source={{uri: imagehome}}
                                                    style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Living Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertliving()}>
                                    <Card style={globalStyles.shadowbox}>
                                      <Heading size='md' style={globalStyles.titlegalleryedit}> Living Room Photo </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imageliving == require('../assets/vacios-homebor-sala.png') ?
                                                item.pliving == "NULL" ?
                                                <Image source={imageliving}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.pliving}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imageliving}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Family Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertfamily()}>
                                        <Card style={globalStyles.shadowbox}>
                                          <Heading size='md' style={globalStyles.titlegalleryedit}> Family Picture </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagefamily == require('../assets/vacios-homebor-familia.png') ?
                                                item.fp == "NULL" ?
                                                <Image source={imagefamily}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.fp}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagefamily}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                </ScrollView>

                                <ScrollView horizontal={true}>

                                    {/*Kitchen Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertkitchen()}>
                                    <Card style={globalStyles.shadowbox}>
                                        <Heading size='md' style={globalStyles.titlegalleryedit}> Kitchen </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagekitchen == require('../assets/vacios-homebor-cocina.png') ?
                                                item.parea1 == "NULL" ?
                                                <Image source={imagekitchen}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.parea1}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagekitchen}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Dining Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertdining()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <Heading size='md' style={globalStyles.titlegalleryedit}> Dining Room</Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagedining == require('../assets/vacios-homebor-comedor.png') ?
                                                item.parea2 == "NULL" ?
                                                <Image source={imagedining}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.parea2}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagedining}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*House Area 3 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertcommon1()}>
                                    <Card style={globalStyles.shadowbox}>
                                        <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 3 </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagecommon1 == require('../assets/vacios-homebor-areas-recreativas.png') ?
                                                item.parea3 == "NULL" ?
                                                <Image source={imagecommon1}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.parea3}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagecommon1}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*House Area 4 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertcommon2()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <Heading size='md' style={globalStyles.titlegalleryedit}> House Area 4 </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagecommon2 == require('../assets/vacios-homebor-areas-recreativas.png') ?
                                                item.parea4 == "NULL" ?
                                                <Image source={imagecommon2}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.parea4}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagecommon2}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                </ScrollView>

                                <ScrollView horizontal={true}>

                                    {/*Bathroom 1 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertbath1()}>
                                    <Card style={globalStyles.shadowbox}>
                                        <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 1</Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagebath1 == require('../assets/vacios-homebor-bath.png') ?
                                                item.pbath1 == "NULL" ?
                                                <Image source={imagebath1}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.pbath1}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagebath1}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Bathroom 2 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertbath2()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 2 </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagebath2 == require('../assets/vacios-homebor-bath.png') ?
                                                item.pbath2 == "NULL" ?
                                                <Image source={imagebath2}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.pbath2}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagebath2}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Bathroom 3 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertbath3()}>
                                    <Card style={globalStyles.shadowbox}>
                                        <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 3 </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagebath3 == require('../assets/vacios-homebor-bath.png') ?
                                                item.pbath3 == "NULL" ?
                                                <Image source={imagebath3}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.pbath3}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagebath3}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                    {/*Bathroom 4 Photo*/}

                                    <TouchableOpacity onPress={()=>this._Alertbath4()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <Heading size='md' style={globalStyles.titlegalleryedit}> Bathroom 4 </Heading>
                                                <View style={ globalStyles.underlinig }/>
                                                {imagebath4 == require('../assets/vacios-homebor-bath.png') ?
                                                item.pbath4 == "NULL" ?
                                                <Image source={imagebath4}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: `http://homebor.com/${item.pbath4}`}}
                                                style={globalStyles.ImageGalleryedit} />
                                                :
                                                <Image source={{uri: imagebath4}}
                                                style={globalStyles.ImageGalleryedit} />}
                                        </Card>
                                    </TouchableOpacity>

                                </ScrollView>
                                <View style={ globalStyles.contenido}>

                                {this.state.connection_status ?
                                      <View>

                                        <Button
                                        success
                                        bordered
                                        onPress={this.registerbasici}
                                        style={globalStyles.botonedit}
                                          >

                                        <Text style={globalStyles.botonTexto}> Update </Text>
                                        </Button>
                                        
                                      </View> 
                                        :
                                        <View>
                                          <Button
                                            success
                                            bordered
                                            onPress={() => this.noInternetConnection()}
                                            style={globalStyles.botonedit}
                                              >

                                            <Text style={globalStyles.botonTexto}> Update </Text>
                                          </Button>
                                      </View> 
                                  }
                                
                                        
                                </View>
                    
                    </View>
                )}> 
            </FlatList>
        </View>
        )}
      </View>)}
    </NativeBaseProvider>
  );
}

}

class AdditionalEdit extends Component {
  NetInfoSubscription = null;

  constructor(props){ 
		super(props); 
			this.state = {
                //User Variables 
                email : '',
                perm : false,
                info : [],

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

    //Get user variables
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})
    console.log(userLogin)
    

    if(this.state.connection_status == true) {
    //Get user profile data variables
    let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
    this.setState({ info : profile, connection_refreshStatus: false})

    //Get user profile data variables to determinate states for checkbox
    let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
    this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor, readyDisplay : true})
    } else {
      this.setState({connection_refreshStatus: true, readyDisplay : true})
    }

    this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.refresh()
		  });
  }

  //Function to register data to database
  registerbasici = async () => {
      //console.log(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.g_pre,this.state.ag_pre,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f, this.state.health_f2, this.state.health_f, this.state.num_mem, this.state.backg, this.state.backl, this.state.religion2, this.state.religion, this.state.condition_m2, this.state.condition_m, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background, this.state.idm)
      api.registeradditionalinfo(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.g_pre,this.state.ag_pre,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f, this.state.health_f2, this.state.health_f, this.state.num_mem, this.state.backg, this.state.backl, this.state.religion2, this.state.religion, this.state.condition_m2, this.state.condition_m, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background, this.state.idm)
  }

  refresh = async() => {
    if(this.state.connection_status == true) {
        this.setState({connection_refreshStatus: false, readyDisplay : true})
    } else {
        this.setState({connection_refreshStatus: true, readyDisplay : true})
    }
  }

  _handleConnectivityChange = (state) => {
    this.setState({ connection_status: state.isConnected, clockrun : true });
    this.Clock()
  }

  tryAgainNotConnection = () => {
    this.setState({clockrun : true})
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


  return (
      <NativeBaseProvider>
        {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }}>
                        <View style={globalStyles.skeletonMarginProfileText}>
                            <HStack space="2" alignItems="center">
                                <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                            </HStack>
                        </View>
                        <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }}>
                            <View style={globalStyles.skeletonMarginProfileText}>
                                <HStack space="2" alignItems="center">
                                    <Skeleton size="5" rounded="full" />
                                    <Skeleton h="3" flex="2" rounded="full" />
                                </HStack>
                            </View>
                            <Skeleton.Text px="5" />
                            <Skeleton.Text px="5" my="4" />
                            <Skeleton.Text px="5" my="4" />
                        </VStack>
                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
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

                  <View style={globalStyles.WelcomeImageMargin}>

                      <Image
                                                                                      
                          resizeMode="cover"
                          source={require('../assets/vacios-homebor-antena.png')}
                          style={globalStyles.imageNotInternet}
                      ></Image>

                  </View>

                  <View style={globalStyles.WelcomeTextandBoton}>
                      <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                      <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                  </View>

                  {this.state.connection_status ?
                      <View>
                          <Text onPress={this.onRefresh} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                      </View>
                  : 
                      <View>
                          <Text onPress={this.tryAgainNotConnection} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                      </View>
                  }

              </View>
              )}

              {this.state.connection_refreshStatus == false && (
                  <View>
                  <FlatList
                      data={this.state.info}
                      extraData={this.state.info}
                      keyExtractor={item => `${item.info}`}
                      ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                      nestedScrollEnabled={true}
                      bounces={false}
                      renderItem={({item}) => (
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

                            <StatusBar style="light" translucent={true} />
                            <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                              <ScrollView nestedScrollEnabled={true}>
                                  <View style={ globalStyles.contenido } >
                                    <View style={globalStyles.marginTopRequiredFields}>
                                      <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                                    </View>

                                      <FormControl>

                                        {/*Additional Information*/}

                                        <Card>
                                          <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Additional Information</Heading>
                                              
                                              <Image source={require("../assets/additional-info-16.png")}
                                                              resizeMode="contain"
                                                              style={globalStyles.editiconAdd}/>
                                          </View>

                                          <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Description</Text></FormControl.Label>
                                                <Input 
                                                    multiline={true}
                                                    numberOfLines={4} 
                                                    defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                                    onChangeText={ (des) => this.setState({des}) }
                                                    placeholder="Describe your house using few words, no special characters."
                                                    style={ globalStyles.inputedit}
                                                  />
                                            </Stack>

                                            <View inlineLabel last style={globalStyles.hideContents} >
                                              <Input 
                                                  defaultValue={item.data.mail_h}
                                                  onChangeText={ (email) => this.setState({email}) }
                                                  style={ globalStyles.inputedit}
                                              />
                                            </View>
                                      
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Academy Preference</Text></FormControl.Label>

                                              <Picker
                                                          style={globalStyles.pickereditAcademyPre} 
                                                          selectedValue={this.state.a_pre}
                                                          itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 14}}
                                                          onValueChange={(a_pre) => this.setState({a_pre})}>
                                                              {!item.academy ? null : item.academy.map(academy =>
                                                              <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                              )} 
                                              </Picker>

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender Preference</Text></FormControl.Label> 

                                                <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo}
                                                        selectedValue={this.state.g_pre}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(g_pre) => this.setState({g_pre})}>
                                                            <Picker.Item label="Male" value="Male" /> 
                                                            <Picker.Item label="Female" value="Female" />
                                                            <Picker.Item label="Any" value="Any" />
                                                    </Picker>
                                                </View>

                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Age Preference</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                    <Picker
                                                        style={globalStyles.pickerBasicinfo} 
                                                        selectedValue={this.state.ag_pre}
                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                        onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                                            <Picker.Item label="Teenager" value="Teenager" /> 
                                                            <Picker.Item label="Adult" value="Adult" />
                                                            <Picker.Item label="Any" value="Any" />
                                                    </Picker>
                                                  </View>
                                          </Stack>            

                                        </Card>

                                        {/*Any Member of your Family:*/}
                                        <Card>
                                          <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets2}>Any Member of your Family:</Heading> 
                                              
                                              <Image source={require("../assets/profile2-64.png")}
                                                              resizeMode="contain"
                                                              style={globalStyles.editiconAnyMemeber}/>
                                          </View>

                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have Allergies?</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                              {this.state.allergies2 === 'NULL' ?
                                                  //NULL
                                                  <Picker
                                                  style={globalStyles.pickerBasicinfo}
                                                  selectedValue={"NULL"}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  onValueChange={(allergies2) => this.setState({allergies2})}>
                                                      <Picker.Item label="Select" value="NULL" /> 
                                                      <Picker.Item label="Yes" value="Yes" /> 
                                                      <Picker.Item label="No" value="No" />
                                                  </Picker> : this.state.allergies2 === 'No' ?
                                                  
                                                  //NO 
                                                  <Picker
                                                  style={globalStyles.pickerBasicinfo}
                                                  selectedValue={"No"}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  onValueChange={(allergies2) => this.setState({allergies2})}>
                                                      <Picker.Item label="Select" value="NULL" /> 
                                                      <Picker.Item label="Yes" value="Yes" /> 
                                                      <Picker.Item label="No" value="No" />
                                                  </Picker> : 

                                                  //YES
                                                  <View>
                                                      <Picker
                                                      style={globalStyles.pickerBasicinfo}
                                                      selectedValue={"Yes"}
                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                      onValueChange={(allergies2) => this.setState({allergies2})}>
                                                          <Picker.Item label="Select" value="NULL" /> 
                                                          <Picker.Item label="Yes" value="Yes" /> 
                                                          <Picker.Item label="No" value="No" />
                                                      </Picker>

                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Allergy</Text></FormControl.Label>
                                                          <Input 
                                                                  defaultValue={item.data.allergies == 'NULL' ? '' : item.data.allergies}
                                                                  onChangeText={ (allergies) => this.setState({allergies}) }
                                                                  style={ globalStyles.inputedit}
                                                              />
                                                          </Stack>
                                                  </View>
                                              
                                          }
                                              
                                              </View>


                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Take any Medication?</Text></FormControl.Label>

                                                
                                                  <View style={globalStyles.editMargintop}>
                                                      {this.state.medic_f2 === 'NULL' ?
                                                          //NULL
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"NULL"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : this.state.medic_f2 === 'No' ?
                                                          
                                                          //NO 
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"No"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : 

                                                          //YES
                                                          <View>
                                                              <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              selectedValue={"Yes"}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                                  <Picker.Item label="Select" value="NULL" /> 
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                              </Picker>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Medication</Text></FormControl.Label>
                                                                  <Input 
                                                                          defaultValue={item.data.medic_f == 'NULL' ? '' : item.data.medic_f}
                                                                          onChangeText={ (medic_f) => this.setState({medic_f}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>
                                                          </View>
                                                      
                                                  }
                                              
                                              </View>

                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have health problems?</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      {this.state.health_f2 === 'NULL' ?
                                                          //NULL
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"NULL"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(health_f2) => this.setState({health_f2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : this.state.health_f2 === 'No' ?
                                                          
                                                          //NO 
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"No"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(health_f2) => this.setState({health_f2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : 

                                                          //YES
                                                          <View>
                                                              <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              selectedValue={"Yes"}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(health_f2) => this.setState({health_f2})}>
                                                                  <Picker.Item label="Select" value="NULL" /> 
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                              </Picker>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify the Problems</Text></FormControl.Label>
                                                                  <Input 
                                                                          defaultValue={item.data.health_f == 'NULL' ? '' : item.data.health_f}
                                                                          onChangeText={ (health_f) => this.setState({health_f}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>
                                                          </View>
                                                      
                                                  }
                                              
                                              </View>

                                        </Card>

                                        {/*Family Preference*/}
                                        <Card>
                                          <View style={globalStyles.editView}>
                                              <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Family Preference:</Heading> 
                                              
                                              <Image source={require("../assets/profile2-64.png")}
                                                              resizeMode="contain"
                                                              style={globalStyles.editiconFamilyPreference}/>
                                          </View>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Number of Family Members</Text></FormControl.Label>
                                                <View style={globalStyles.editMargintop}>
                                                  <Picker
                                                      style={globalStyles.pickerBasicinfo}
                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                      selectedValue={this.state.num_mem == 'NULL' ? "Select"  : this.state.num_mem}
                                                      onValueChange={ (num_mem) => this.setState({num_mem}) }>
                                                          <Picker.Item label="-- Select --" value="NULL" />
                                                          <Picker.Item label="1" value="1" /> 
                                                          <Picker.Item label="2" value="2" />
                                                          <Picker.Item label="3" value="3" />
                                                          <Picker.Item label="4" value="4" />
                                                          <Picker.Item label="5" value="5" />
                                                          <Picker.Item label="6" value="6" />
                                                          <Picker.Item label="7" value="7" />
                                                          <Picker.Item label="8" value="8" />
                                                  </Picker>
                                                </View>
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                                    onChangeText={ (backg) => this.setState({backg}) }
                                                    placeholder="e.g. Canadian"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Language</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                                    onChangeText={ (backl) => this.setState({backl}) }
                                                    placeholder="e.g. English"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Religion to which you belong?</Text></FormControl.Label>

                                            <View style={globalStyles.editMargintop}>
                                                      {this.state.religion2 === 'NULL' ?
                                                          //NULL
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"NULL"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(religion2) => this.setState({religion2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : this.state.religion2 === 'No' ?
                                                          
                                                          //NO 
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"No"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(religion2) => this.setState({religion2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : 

                                                          //YES
                                                          <View>
                                                              <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              selectedValue={"Yes"}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(religion2) => this.setState({religion2})}>
                                                                  <Picker.Item label="Select" value="NULL" /> 
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                              </Picker>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Which Religion?</Text></FormControl.Label>
                                                                  <Input 
                                                                          defaultValue={item.data.religion == 'NULL' ? '' : item.data.religion}
                                                                          onChangeText={ (religion) => this.setState({religion}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>
                                                          </View>
                                                      
                                                  }
                                              
                                              </View>

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Any Physical or Mental Condition?</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                                      {this.state.condition_m2 === 'NULL' ?
                                                          //NULL
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"NULL"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : this.state.condition_m2 === 'No' ?
                                                          
                                                          //NO 
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"No"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : 

                                                          //YES
                                                          <View>
                                                              <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              selectedValue={"Yes"}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                                  <Picker.Item label="Select" value="NULL" /> 
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                              </Picker>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Which Condition?</Text></FormControl.Label>
                                                                  <Input 
                                                                          defaultValue={item.data.condition_m == 'NULL' ? '' : item.data.condition_m}
                                                                          onChangeText={ (condition_m) => this.setState({condition_m}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>
                                                          </View>
                                                      
                                                  }
                                              
                                              </View>

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Have they committed misdemeanor?</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                                      {this.state.misdemeanor2 === 'NULL' ?
                                                          //NULL
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"NULL"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : this.state.misdemeanor2 === 'No' ?
                                                          
                                                          //NO 
                                                          <Picker
                                                          style={globalStyles.pickerBasicinfo}
                                                          selectedValue={"No"}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                              <Picker.Item label="Select" value="NULL" /> 
                                                              <Picker.Item label="Yes" value="Yes" /> 
                                                              <Picker.Item label="No" value="No" />
                                                          </Picker> : 

                                                          //YES
                                                          <View>
                                                              <Picker
                                                              style={globalStyles.pickerBasicinfo}
                                                              selectedValue={"Yes"}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                                  <Picker.Item label="Select" value="NULL" /> 
                                                                  <Picker.Item label="Yes" value="Yes" /> 
                                                                  <Picker.Item label="No" value="No" />
                                                              </Picker>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Specify</Text></FormControl.Label>
                                                                  <Input 
                                                                          defaultValue={item.data.misdemeanor == 'NULL' ? '' : item.data.misdemeanor}
                                                                          onChangeText={ (misdemeanor) => this.setState({misdemeanor}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>
                                                          </View>
                                                      
                                                  }
                                              
                                              </View>

                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Do you give us consent to go to the authorities and check your criminal background check?</Text></FormControl.Label>

                                              <View style={globalStyles.editMargintop}>
                                              <Picker
                                                  style={globalStyles.pickerBasicinfo}
                                                  selectedValue={this.state.c_background}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  onValueChange={(c_background) => this.setState({c_background})}>
                                                      <Picker.Item label="Select" value="NULL" /> 
                                                      <Picker.Item label="Yes" value="Yes" /> 
                                                      <Picker.Item label="No" value="No" />
                                              </Picker>
                                              </View>

                                        </Card>

                                      </FormControl>

                                  </View>

                                  {this.state.connection_status ?
                                            <View>

                                              <Button
                                                  success
                                                  bordered
                                                  onPress={this.registerbasici}
                                                  style={globalStyles.botonedit}
                                                  >

                                                  <Text style={globalStyles.botonTexto}> Update </Text>
                                              </Button>
                                              
                                            </View> 
                                              :
                                              <View>
                                                <Button
                                                    success
                                                    bordered
                                                    onPress={() => this.noInternetConnection()}
                                                    style={globalStyles.botonedit}
                                                    >

                                                    <Text style={globalStyles.botonTexto}> Update </Text>
                                                </Button>
                                            </View> 
                                        }
                              </ScrollView>
                              </KeyboardAwareScrollView>
                          
                          </View>
                      )}> 
                  </FlatList>
              </View>
              )}
            </View>)}
      </NativeBaseProvider>
  );
}
}

class FamilyEdit extends Component {
  NetInfoSubscription = null;

  constructor(props){ 
		super(props); 
			this.state = {      
          //Variables
          email : '',
          perm : false,
          info : [],
          addmember : 'No',

          //Calendars DATE PICKERS
          date: new Date(),
          mode: 'date',
          show: false,
          datep: new Date(),
          modep: 'datep',
          showp: false,
          date2: new Date(),
          mode2: 'date2',
          show2: false,
          datep2: new Date(),
          modep2: 'datep2',
          showp2: false,
          date3: new Date(),
          mode3: 'date3',
          show3: false,
          date4: new Date(),
          mode4: 'date4',
          show4: false,
          date5: new Date(),
          mode5: 'date5',
          show5: false,
          date6: new Date(),
          mode6: 'date6',
          show6: false,
          date7: new Date(),
          mode7: 'date7',
          show7: false,
          date8: new Date(),
          mode8: 'date8',
          show8: false,
          date9: new Date(),
          mode9: 'date9',
          show9: false,
          date10: new Date(),
          mode10: 'date10',
          show10: false,
          date11: new Date(),
          mode11: 'date11',
          show11: false,
          date12: new Date(),
          mode12: 'date12',
          show12: false,
          date13: new Date(),
          mode13: 'date13',
          show13: false,
          date14: new Date(),
          mode14: 'date14',
          show14: false,
          date15: new Date(),
          mode15: 'date15',
          show15: false,
          date16: new Date(),
          mode16: 'date16',
          show16: false,

          //Variables of collapsibles
          expanded: false,
          expanded2: false,
          expanded3: false,
          expanded4: false,
          expanded5: false,
          expanded6: false,
          expanded7: false,
          expanded8: false,

          //Internet Connection
          connection_status: false,
          connection_refreshStatus: false,
          clockrun : false,

          //LoadingFirstTime
          readyDisplay : false
			} 
	} 

    async componentDidMount(){
      this.NetInfoSubscription = NetInfo.addEventListener(
        this._handleConnectivityChange,
      )

       //Get user variables
      let userLogin = await AsyncStorage.getItem('userLogin')
      userLogin = JSON.parse(userLogin)
      this.setState({ email : userLogin.email, perm : userLogin.perm})
      console.log(userLogin)

      if(this.state.connection_status == true) {
        //Get user profile variables
        let profile = await api.getFamilyinfo(this.state.email,this.state.perm)
        this.setState({ info : profile.data, connection_refreshStatus: false, id: profile.data[0].id_home, idm: profile.data[0].id_m, f_name1 : profile.data[0].f_name1, f_lname1 : profile.data[0].f_lname1, db1 : profile.data[0].db1, gender1 : profile.data[0].gender1, re1 : profile.data[0].re1, db_lawf1 : profile.data[0].db_lawf1, f_name2 : profile.data[0].f_name2, f_lname2 : profile.data[0].f_lname2, db2 : profile.data[0].db2, gender2 : profile.data[0].gender2, re2 : profile.data[0].re2, db_lawf2 : profile.data[0].db_lawf2, f_name3 : profile.data[0].f_name3, f_lname3 : profile.data[0].f_lname3, db3 : profile.data[0].db3, gender3 : profile.data[0].gender3, re3 : profile.data[0].re3, db_lawf3 : profile.data[0].db_lawf3, f_name4 : profile.data[0].f_name4, f_lname4 : profile.data[0].f_lname4, db4 : profile.data[0].db4, gender4 : profile.data[0].gender4, re4 : profile.data[0].re4, db_lawf4 : profile.data[0].db_lawf4, f_name5 : profile.data[0].f_name5, f_lname5 : profile.data[0].f_lname5, db5 : profile.data[0].db5, gender5 : profile.data[0].gender5, re5 : profile.data[0].re5, db_lawf5 : profile.data[0].db_lawf5, f_name6 : profile.data[0].f_name6, f_lname6 : profile.data[0].f_lname6, db6 : profile.data[0].db6, gender6 : profile.data[0].gender6, re6 : profile.data[0].re6, db_lawf6 : profile.data[0].db_lawf6, f_name7 : profile.data[0].f_name7, f_lname7 : profile.data[0].f_lname7, db7 : profile.data[0].db7, gender7 : profile.data[0].gender7, re7 : profile.data[0].re7, db_lawf7 : profile.data[0].db_lawf7, f_name8 : profile.data[0].f_name8, f_lname8 : profile.data[0].f_lname8, db8 : profile.data[0].db8, gender8 : profile.data[0].gender8, re8 : profile.data[0].re8, db_lawf8 : profile.data[0].db_lawf8, occupation_f1 : profile.data[0].occupation_f1, occupation_f2 : profile.data[0].occupation_f2, occupation_f3 : profile.data[0].occupation_f3, occupation_f4 : profile.data[0].occupation_f4, occupation_f5 : profile.data[0].occupation_f5, occupation_f6 : profile.data[0].occupation_f6, occupation_f7 : profile.data[0].occupation_f7, occupation_f8 : profile.data[0].occupation_f8, law : 'Yes', lawf1 : 'Yes', lawf2 : 'Yes', lawf3 : 'Yes', lawf4 : 'Yes', lawf5 : 'Yes', lawf6 : 'Yes', lawf7 : 'Yes', lawf8 : 'Yes', nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law, occupation_m2: profile.data[0].occupation_m, cell: profile.data[0].cell})
        console.log(this.state.info)

        //Variables of collapsibles
        this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false", readyDisplay : true})

        if (this.state.f_name1 == 'NULL' && this.state.f_lname1 == 'NULL' && this.state.gender1 == 'NULL' && this.state.db1 == 'NULL' && this.state.re1 == 'NULL' && this.state.db_lawf1 == 'NULL') {
          this.setState({addmember : 'No'})
        } else {
          this.setState({addmember : 'Yes'})
        }
      } else {
        this.setState({connection_refreshStatus: true, readyDisplay : true})
      }

      //Permissions function call to access to the documents of phone
      this.getPermissionAsync();

      this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.refresh()
        });
        
    }

    //Permissions function to access to the documents of phone
    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert ('It seems that you have not granted permission to access the camera, to access all the functionalities of this screen go to the configuration of your cell phone and change this.');
                
            }
        }
    }

    refresh = async() => {
      if(this.state.connection_status == true) {
          this.setState({connection_refreshStatus: false, readyDisplay : true})
      } else {
          this.setState({connection_refreshStatus: true, readyDisplay : true})
      }
    }

    //Group of function to catch the documents from frontend
    _pickImagep = async () => {
      let resultp = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
      });

      console.log(resultp);
      console.log(this.state.email)

      if(!resultp.cancelled) {
          this.setState({
               backfile: resultp.uri,
               namei : resultp.name,
           });


      }
    }

    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 backfilef1: result.uri,
                 nameif1 : result.name,
             });


        }
    }

    _pickImage2 = async () => {
        let result2 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result2);

        if(!result2.cancelled) {
            this.setState({
                 backfilef2: result2.uri,
                 nameif2 : result2.name,
             });


        }
    }

    _pickImage3 = async () => {
        let result3 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result3);
        console.log(this.state.email)

        if(!result3.cancelled) {
            this.setState({
                 backfilef3: result3.uri,
                 nameif3 : result3.name,
             });


        }
    }

    _pickImage4 = async () => {
        let result4 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result4);
        console.log(this.state.email)

        if(!result4.cancelled) {
            this.setState({
                 backfilef4: result4.uri,
                 nameif4 : result4.name,
             });


        }
    }

    _pickImage5 = async () => {
        let result5 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
        });

        console.log(result5);
        console.log(this.state.email)

        if(!result5.cancelled) {
            this.setState({
                 backfilef5: result5.uri,
                 nameif5 : result5.name,
             });


        }
    }

    _pickImage6 = async () => {
        let result6 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result6);
        console.log(this.state.email)

        if(!result6.cancelled) {
            this.setState({
                 backfilef6: result6.uri,
                 nameif6 : result6.name,
             });


        }
    }

    _pickImage7 = async () => {
        let result7 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result7);
        console.log(this.state.email)

        if(!result7.cancelled) {
            this.setState({
                 backfilef7: result7.uri,
                 nameif7 : result7.name,
             });


        }
    }

    _pickImage8 = async () => {
        let result8 = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
          copyToCacheDirectory: Platform.OS === 'android' ? false : true,   
            
        });

        console.log(result8);
        console.log(this.state.email)

        if(!result8.cancelled) {
            this.setState({
                 backfilef8: result8.uri,
                 nameif8 : result8.name,
             });


        }
    }

    addmemberButtom = async () => { 
      this.setState({addmember : 'Yes'})
    }

    //Function to call when user submit data to database
    registerbasici = async () => {
        let localUrip = this.state.backfile;
        if (localUrip == null) {} 
        else { this.registerfilep() }
        let localUri = this.state.backfilef1;
        if (localUri == null) {} 
        else { this.registerfile1() }
        let localUri2 = this.state.backfilef2;
        if (localUri2 == null) {} 
        else { this.registerfile2() }
        let localUri3 = this.state.backfilef3;
        if (localUri3 == null) {} 
        else { this.registerfile3() }
        let localUri4 = this.state.backfilef4;
        if (localUri4 == null) {} 
        else { this.registerfile4() }
        let localUri5 = this.state.backfilef5;
        if (localUri5 == null) {} 
        else { this.registerfile5() }
        let localUri6 = this.state.backfilef6;
        if (localUri6 == null) {} 
        else { this.registerfile6() }
        let localUri7 = this.state.backfilef7;
        if (localUri7 == null) {} 
        else { this.registerfile7() }
        let localUri8 = this.state.backfilef8;
        if (localUri8 == null) {} 
        else { this.registerfile8() }
        let hname = `${this.state.lnameh}, ${this.state.nameh}`
        //console.log(this.state.id,this.state.email,this.state.idm,this.state.nameh,this.state.lnameh,this.state.db,this.state.gender,this.state.cell,this.state.occupation_m2,this.state.dblaw,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8, this.state.occupation_f1, this.state.occupation_f2, this.state.occupation_f3, this.state.occupation_f4, this.state.occupation_f5, this.state.occupation_f6, this.state.occupation_f7, this.state.occupation_f8, hname)
        api.registerFamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.nameh,this.state.lnameh,this.state.db,this.state.gender,this.state.cell,this.state.occupation_m2,this.state.dblaw,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8, this.state.occupation_f1, this.state.occupation_f2, this.state.occupation_f3, this.state.occupation_f4, this.state.occupation_f5, this.state.occupation_f6, this.state.occupation_f7, this.state.occupation_f8, hname)
    }

    
    //Group of function to catch files and send to server
    registerfilep = async () => {
      let localUrip = this.state.backfile;

      if (localUrip == null) { this.registerfile1() } 
      else {  
        //Files
        let filenamep = localUrip.split('/').pop();
        let matchp = /\.(\w+)$/.exec(filenamep);
        let typep = matchp ? `image/${matchp[1]}` : `image`;

      
        let dateDocp = new Date()
        let XDAYp= dateDocp.getMonth()<9 ? dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-0${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : dateDocp.getDate()<=9 ? `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-0${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}` : `${dateDocp.getFullYear()}-${dateDocp.getMonth() + 1}-${dateDocp.getDate()}-${dateDocp.getHours()}:${dateDocp.getMinutes()}:${dateDocp.getSeconds()}`

        let formData = new FormData();
        formData.append('backfilep', {uri: localUrip, name: Platform.OS === 'android' ? 'documentbackgroundlawf1'+XDAYp+".pdf" : filenamep, type: Platform.OS === 'android' ? "application/pdf" : typep});
        
        console.log('Comprobante de envio')
        console.log(formData);
        
        

        console.log(JSON.stringify({ email: this.state.email}));

        //Variables
        let email = this.state.email;
        let id = this.state.id;
        let law = this.state.law;

        return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&law=${law}`, {
          method: 'POST',
          body: formData,
          header: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
        }).then(res => res.json())
          .catch(error => console.error('Error', error))
          .then(response => {
            if (response.status == 1) {
            }
            else {
              Alert.alert('Error with background check file of Main Propietor upload')
            }
          });
      }
  };

    registerfile1 = async () => {
        let localUri = this.state.backfilef1;

        if (localUri == null) { this.registerfile2() } 
        else {  
          //Files
          let filename = localUri.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let dateDoc = new Date()
          let XDAY= dateDoc.getMonth()<9 ? dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-0${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : dateDoc.getDate()<=9 ? `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-0${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}` : `${dateDoc.getFullYear()}-${dateDoc.getMonth() + 1}-${dateDoc.getDate()}-${dateDoc.getHours()}:${dateDoc.getMinutes()}:${dateDoc.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef1', {uri: localUri, name: Platform.OS === 'android' ? 'documentbackgroundlawf1'+XDAY+".pdf" : filename, type: Platform.OS === 'android' ? "application/pdf" : type});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf1 = this.state.lawf1;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf1=${lawf1}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 1 upload')
              }
            });
        }
    };

    registerfile2 = async () => {
        let localUri2 = this.state.backfilef2;

        if (localUri2 == null) { this.registerfile3() }
        else { 
          //Files
          let filename2 = localUri2.split('/').pop();
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `image/${match2[1]}` : `image`;

          let dateDoc2 = new Date()
          let XDAY2= dateDoc2.getMonth()<9 ? dateDoc2.getDate()<=9 ? `${dateDoc2.getFullYear()}-0${dateDoc2.getMonth() + 1}-0${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : `${dateDoc2.getFullYear()}-0${dateDoc2.getMonth() + 1}-${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : dateDoc2.getDate()<=9 ? `${dateDoc2.getFullYear()}-${dateDoc2.getMonth() + 1}-0${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}` : `${dateDoc2.getFullYear()}-${dateDoc2.getMonth() + 1}-${dateDoc2.getDate()}-${dateDoc2.getHours()}:${dateDoc2.getMinutes()}:${dateDoc2.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef2', {uri: localUri2, name: Platform.OS === 'android' ? 'documentbackgroundlawf2'+XDAY2+".pdf" : filename2, type: Platform.OS === 'android' ? "application/pdf" : type2});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf2 = this.state.lawf2;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf2=${lawf2}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 2 upload')
              }
            });
        }
    };

    registerfile3 = async () => {
        let localUri3 = this.state.backfilef3;

        if (localUri3 == null) { this.registerfile4() }
        else { 
          //Files
          let filename3 = localUri3.split('/').pop();
          let match3 = /\.(\w+)$/.exec(filename3);
          let type3 = match3 ? `image/${match3[1]}` : `image`;

        
          let dateDoc3 = new Date()
          let XDAY3= dateDoc3.getMonth()<9 ? dateDoc3.getDate()<=9 ? `${dateDoc3.getFullYear()}-0${dateDoc3.getMonth() + 1}-0${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : `${dateDoc3.getFullYear()}-0${dateDoc3.getMonth() + 1}-${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : dateDoc3.getDate()<=9 ? `${dateDoc3.getFullYear()}-${dateDoc3.getMonth() + 1}-0${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}` : `${dateDoc3.getFullYear()}-${dateDoc3.getMonth() + 1}-${dateDoc3.getDate()}-${dateDoc3.getHours()}:${dateDoc3.getMinutes()}:${dateDoc3.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef3', {uri: localUri3, name: Platform.OS === 'android' ? 'documentbackgroundlawf3'+XDAY3+".pdf" : filename3, type: Platform.OS === 'android' ? "application/pdf" : type3});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf3 = this.state.lawf3;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf3=${lawf3}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 3 upload')
              }
            });
        }
    };

    registerfile4 = async () => {
        let localUri4 = this.state.backfilef4;

        if (localUri4 == null) { this.registerfile5() }
        else { 
          //Files
          let filename4 = localUri4.split('/').pop();
          let match4 = /\.(\w+)$/.exec(filename4);
          let type4 = match4 ? `image/${match4[1]}` : `image`;

          let dateDoc4 = new Date()
          let XDAY4= dateDoc4.getMonth()<9 ? dateDoc4.getDate()<=9 ? `${dateDoc4.getFullYear()}-0${dateDoc4.getMonth() + 1}-0${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : `${dateDoc4.getFullYear()}-0${dateDoc4.getMonth() + 1}-${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : dateDoc4.getDate()<=9 ? `${dateDoc4.getFullYear()}-${dateDoc4.getMonth() + 1}-0${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}` : `${dateDoc4.getFullYear()}-${dateDoc4.getMonth() + 1}-${dateDoc4.getDate()}-${dateDoc4.getHours()}:${dateDoc4.getMinutes()}:${dateDoc4.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef4', {uri: localUri4, name: Platform.OS === 'android' ? 'documentbackgroundlawf4'+XDAY4+".pdf" : filename4, type: Platform.OS === 'android' ? "application/pdf" : type4});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf4 = this.state.lawf4;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf4=${lawf4}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 4 upload')
              }
            });
        }
    };

    registerfile5 = async () => {
        let localUri5 = this.state.backfilef5;

        if (localUri5 == null) { this.registerfile6() }
        else { 
          //Files
          let filename5 = localUri5.split('/').pop();
          let match5 = /\.(\w+)$/.exec(filename5);
          let type5 = match5 ? `image/${match5[1]}` : `image`;

          let dateDoc5 = new Date()
          let XDAY5= dateDoc5.getMonth()<9 ? dateDoc5.getDate()<=9 ? `${dateDoc5.getFullYear()}-0${dateDoc5.getMonth() + 1}-0${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : `${dateDoc5.getFullYear()}-0${dateDoc5.getMonth() + 1}-${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : dateDoc5.getDate()<=9 ? `${dateDoc5.getFullYear()}-${dateDoc5.getMonth() + 1}-0${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}` : `${dateDoc5.getFullYear()}-${dateDoc5.getMonth() + 1}-${dateDoc5.getDate()}-${dateDoc5.getHours()}:${dateDoc5.getMinutes()}:${dateDoc5.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef5', {uri: localUri5, name: Platform.OS === 'android' ? 'documentbackgroundlawf5'+XDAY5+".pdf" : filename5, type: Platform.OS === 'android' ? "application/pdf" : type5});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf5 = this.state.lawf5;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf5=${lawf5}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 5 upload')
              }
            });
        }
    };

    registerfile6 = async () => {
        let localUri6 = this.state.backfilef6;

        if (localUri6 == null) { this.registerfile7() }
        else { 
          //Files
          let filename6 = localUri6.split('/').pop();
          let match6 = /\.(\w+)$/.exec(filename6);
          let type6 = match6 ? `image/${match6[1]}` : `image`;

          let dateDoc6 = new Date()
          let XDAY6= dateDoc6.getMonth()<9 ? dateDoc6.getDate()<=9 ? `${dateDoc6.getFullYear()}-0${dateDoc6.getMonth() + 1}-0${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : `${dateDoc6.getFullYear()}-0${dateDoc6.getMonth() + 1}-${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : dateDoc6.getDate()<=9 ? `${dateDoc6.getFullYear()}-${dateDoc6.getMonth() + 1}-0${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}` : `${dateDoc6.getFullYear()}-${dateDoc6.getMonth() + 1}-${dateDoc6.getDate()}-${dateDoc6.getHours()}:${dateDoc6.getMinutes()}:${dateDoc6.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef6', {uri: localUri6, name: Platform.OS === 'android' ? 'documentbackgroundlawf6'+XDAY6+".pdf" : filename6, type: Platform.OS === 'android' ? "application/pdf" : type6});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf6 = this.state.lawf6;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf6=${lawf6}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 6 upload')
              }
            });
        }
    };


    registerfile7 = async () => {
        let localUri7 = this.state.backfilef7;

        if (localUri7 == null) { this.registerfile8() }
        else { 
          //Files
          let filename7 = localUri7.split('/').pop();
          let match7 = /\.(\w+)$/.exec(filename7);
          let type7 = match7 ? `image/${match7[1]}` : `image`;

          let dateDoc7 = new Date()
          let XDAY7= dateDoc7.getMonth()<9 ? dateDoc7.getDate()<=9 ? `${dateDoc7.getFullYear()}-0${dateDoc7.getMonth() + 1}-0${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : `${dateDoc7.getFullYear()}-0${dateDoc7.getMonth() + 1}-${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : dateDoc7.getDate()<=9 ? `${dateDoc7.getFullYear()}-${dateDoc7.getMonth() + 1}-0${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}` : `${dateDoc7.getFullYear()}-${dateDoc7.getMonth() + 1}-${dateDoc7.getDate()}-${dateDoc7.getHours()}:${dateDoc7.getMinutes()}:${dateDoc7.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef7', {uri: localUri7, name: Platform.OS === 'android' ? 'documentbackgroundlawf7'+XDAY7+".pdf" : filename7, type: Platform.OS === 'android' ? "application/pdf" : type7});
          
          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf7 = this.state.lawf7;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf7=${lawf7}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
              }
              else {
                Alert.alert('Error with background check file 7 upload')
              }
            });
        }
    };

    registerfile8 = async () => {
        let localUri8 = this.state.backfilef8;

        if (localUri8 == null) { 
            console.log(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8)
            api.registerfamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1,this.state.db_lawf1,this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3,this.state.db_lawf3,this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4,this.state.db_lawf4,this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5,this.state.db_lawf5,this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6,this.state.db_lawf6,this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7,this.state.db_lawf7,this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8,this.state.db_lawf8) 
        }
        else { 
          //Files
          let filename8 = localUri8.split('/').pop();
          let match8 = /\.(\w+)$/.exec(filename8);
          let type8 = match8 ? `image/${match8[1]}` : `image`;

          let dateDoc8 = new Date()
          let XDAY8= dateDoc8.getMonth()<9 ? dateDoc8.getDate()<=9 ? `${dateDoc8.getFullYear()}-0${dateDoc8.getMonth() + 1}-0${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : `${dateDoc8.getFullYear()}-0${dateDoc8.getMonth() + 1}-${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : dateDoc8.getDate()<=9 ? `${dateDoc8.getFullYear()}-${dateDoc8.getMonth() + 1}-0${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}` : `${dateDoc8.getFullYear()}-${dateDoc8.getMonth() + 1}-${dateDoc8.getDate()}-${dateDoc8.getHours()}:${dateDoc8.getMinutes()}:${dateDoc8.getSeconds()}`

          let formData = new FormData();
          formData.append('backfilef8', {uri: localUri8, name: Platform.OS === 'android' ? 'documentbackgroundlawf8'+XDAY8+".pdf" : filename8, type: Platform.OS === 'android' ? "application/pdf" : type8});

          console.log('Comprobante de envio')
          console.log(formData);
          
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let lawf8 = this.state.lawf8;

          return await fetch(`https://homebor.com/familylawapp.php?id=${id}&email=${email}&lawf8=${lawf8}`, {
            method: 'POST',
            body: formData,
            header: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data"
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                }
              else {
                Alert.alert('Error with background check file 8 upload')
              }
            });
        }
    };

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

      setDatep = (event, datep) => {
        datep = datep || this.state.datep;
    
        this.setState({
          showp: Platform.OS === 'ios' ? true : false,
          datep,
        });
    
        const dateYp = new Date(datep.setDate(datep.getDate()));
        let YDAYp= dateYp.getMonth()<9 ? dateYp.getDate()<=9 ? `${dateYp.getFullYear()}-0${dateYp.getMonth() + 1}-0${dateYp.getDate()}` : `${dateYp.getFullYear()}-0${dateYp.getMonth() + 1}-${dateYp.getDate()}` : dateYp.getDate()<=9 ? `${dateYp.getFullYear()}-${dateYp.getMonth() + 1}-0${dateYp.getDate()}` : `${dateYp.getFullYear()}-${dateYp.getMonth() + 1}-${dateYp.getDate()}`
        this.setState({db : YDAYp})
        
      }
    
      closedatepickerIOSp = () => {
        this.setState({
          showp: Platform.OS === 'ios' ? false : false,
        });
    
      }
    
      showp = modep => {
        this.setState({
          showp: true,
          modep,
        });
      }
    
      datepickerp = () => {
        this.showp('date');
      }

      setDate2 = (event, date2) => {
        date2 = date2 || this.state.date2;
    
        this.setState({
          show2: Platform.OS === 'ios' ? true : false,
          date2,
        });

        const dateY2 = new Date(date2.setDate(date2.getDate()));
        let YDAY2= dateY2.getMonth()<9 ? dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-0${dateY2.getMonth() + 1}-${dateY2.getDate()}` : dateY2.getDate()<=9 ? `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-0${dateY2.getDate()}` : `${dateY2.getFullYear()}-${dateY2.getMonth() + 1}-${dateY2.getDate()}`
        this.setState({db_lawf1 : YDAY2})
        
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

      setDatep2 = (event, datep2) => {
        datep2 = datep2 || this.state.datep2;
    
        this.setState({
          showp2: Platform.OS === 'ios' ? true : false,
          datep2,
        });
    
        const dateYp2 = new Date(datep2.setDate(datep2.getDate()));
        let YDAYp2= dateYp2.getMonth()<9 ? dateYp2.getDate()<=9 ? `${dateYp2.getFullYear()}-0${dateYp2.getMonth() + 1}-0${dateYp2.getDate()}` : `${dateYp2.getFullYear()}-0${dateYp2.getMonth() + 1}-${dateYp2.getDate()}` : dateYp2.getDate()<=9 ? `${dateYp2.getFullYear()}-${dateYp2.getMonth() + 1}-0${dateYp2.getDate()}` : `${dateYp2.getFullYear()}-${dateYp2.getMonth() + 1}-${dateYp2.getDate()}`
        this.setState({dblaw : YDAYp2})
        
      }
    
      closedatepickerIOSp2 = () => {
        this.setState({
          showp2: Platform.OS === 'ios' ? false : false,
        });
    
      }
    
      showp2 = modep2 => {
        this.setState({
          showp2: true,
          modep2,
        });
      }
    
      datepickerp2 = () => {
        this.showp2('date');
      }

      setDate3 = (event, date3) => {
        date3 = date3 || this.state.date3;
    
        this.setState({
          show3: Platform.OS === 'ios' ? true : false,
          date3,
        });
    
        const dateY3 = new Date(date3.setDate(date3.getDate()));
        let YDAY3= dateY3.getMonth()<9 ? dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-0${dateY3.getMonth() + 1}-${dateY3.getDate()}` : dateY3.getDate()<=9 ? `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-0${dateY3.getDate()}` : `${dateY3.getFullYear()}-${dateY3.getMonth() + 1}-${dateY3.getDate()}`
        this.setState({db2 : YDAY3})
        
      }

      closedatepickerIOS3 = () => {
        this.setState({
          show3: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show3 = mode3 => {
        this.setState({
          show3: true,
          mode3,
        });
      }
    
      datepicker3 = () => {
        this.show3('date');
      }

      setDate4 = (event, date4) => {
        date4 = date4 || this.state.date4;
    
        this.setState({
          show4: Platform.OS === 'ios' ? true : false,
          date4,
        });
    
        const dateY4 = new Date(date4.setDate(date4.getDate()));
        let YDAY4= dateY4.getMonth()<9 ? dateY4.getDate()<=9 ? `${dateY4.getFullYear()}-0${dateY4.getMonth() + 1}-0${dateY4.getDate()}` : `${dateY4.getFullYear()}-0${dateY4.getMonth() + 1}-${dateY4.getDate()}` : dateY4.getDate()<=9 ? `${dateY4.getFullYear()}-${dateY4.getMonth() + 1}-0${dateY4.getDate()}` : `${dateY4.getFullYear()}-${dateY4.getMonth() + 1}-${dateY4.getDate()}`
        this.setState({db_lawf2 : YDAY4})
        
      }

      closedatepickerIOS4 = () => {
        this.setState({
          show4: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show4 = mode4 => {
        this.setState({
          show4: true,
          mode4,
        });
      }
    
      datepicker4 = () => {
        this.show4('date');
      }

      setDate5 = (event, date5) => {
        date5 = date5 || this.state.date5;
    
        this.setState({
          show5: Platform.OS === 'ios' ? true : false,
          date5,
        });
    
        const dateY5 = new Date(date5.setDate(date5.getDate()));
        let YDAY5= dateY5.getMonth()<9 ? dateY5.getDate()<=9 ? `${dateY5.getFullYear()}-0${dateY5.getMonth() + 1}-0${dateY5.getDate()}` : `${dateY5.getFullYear()}-0${dateY5.getMonth() + 1}-${dateY5.getDate()}` : dateY5.getDate()<=9 ? `${dateY5.getFullYear()}-${dateY5.getMonth() + 1}-0${dateY5.getDate()}` : `${dateY5.getFullYear()}-${dateY5.getMonth() + 1}-${dateY5.getDate()}`
        this.setState({db3 : YDAY5})
        
      }

      closedatepickerIOS5 = () => {
        this.setState({
          show5: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show5 = mode5 => {
        this.setState({
          show5: true,
          mode5,
        });
      }
    
      datepicker5 = () => {
        this.show5('date');
      }

      setDate6 = (event, date6) => {
        date6 = date6 || this.state.date6;
    
        this.setState({
          show6: Platform.OS === 'ios' ? true : false,
          date6,
        });
    
        const dateY6 = new Date(date6.setDate(date6.getDate()));
        let YDAY6= dateY6.getMonth()<9 ? dateY6.getDate()<=9 ? `${dateY6.getFullYear()}-0${dateY6.getMonth() + 1}-0${dateY6.getDate()}` : `${dateY6.getFullYear()}-0${dateY6.getMonth() + 1}-${dateY6.getDate()}` : dateY6.getDate()<=9 ? `${dateY6.getFullYear()}-${dateY6.getMonth() + 1}-0${dateY6.getDate()}` : `${dateY6.getFullYear()}-${dateY6.getMonth() + 1}-${dateY6.getDate()}`
        this.setState({db_lawf3 : YDAY6})
        
      }

      closedatepickerIOS6 = () => {
        this.setState({
          show6: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show6 = mode6 => {
        this.setState({
          show6: true,
          mode6,
        });
      }
    
      datepicker6 = () => {
        this.show6('date');
      }

      setDate7 = (event, date7) => {
        date7 = date7 || this.state.date7;
    
        this.setState({
          show7: Platform.OS === 'ios' ? true : false,
          date7,
        });
    
        const dateY7 = new Date(date7.setDate(date7.getDate()));
        let YDAY7= dateY7.getMonth()<9 ? dateY7.getDate()<=9 ? `${dateY7.getFullYear()}-0${dateY7.getMonth() + 1}-0${dateY7.getDate()}` : `${dateY7.getFullYear()}-0${dateY7.getMonth() + 1}-${dateY7.getDate()}` : dateY7.getDate()<=9 ? `${dateY7.getFullYear()}-${dateY7.getMonth() + 1}-0${dateY7.getDate()}` : `${dateY7.getFullYear()}-${dateY7.getMonth() + 1}-${dateY7.getDate()}`
        this.setState({db4 : YDAY7})
        
      }

      closedatepickerIOS7 = () => {
        this.setState({
          show7: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show7 = mode7 => {
        this.setState({
          show7: true,
          mode7,
        });
      }
    
      datepicker7 = () => {
        this.show7('date');
      }

      setDate8 = (event, date8) => {
        date8 = date8 || this.state.date8;
    
        this.setState({
          show8: Platform.OS === 'ios' ? true : false,
          date8,
        });
    
        const dateY8 = new Date(date8.setDate(date8.getDate()));
        let YDAY8= dateY8.getMonth()<9 ? dateY8.getDate()<=9 ? `${dateY8.getFullYear()}-0${dateY8.getMonth() + 1}-0${dateY8.getDate()}` : `${dateY8.getFullYear()}-0${dateY8.getMonth() + 1}-${dateY8.getDate()}` : dateY8.getDate()<=9 ? `${dateY8.getFullYear()}-${dateY8.getMonth() + 1}-0${dateY8.getDate()}` : `${dateY8.getFullYear()}-${dateY8.getMonth() + 1}-${dateY8.getDate()}`
        this.setState({db_lawf4 : YDAY8})
        
      }

      closedatepickerIOS8 = () => {
        this.setState({
          show8: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show8 = mode8 => {
        this.setState({
          show8: true,
          mode8,
        });
      }
    
      datepicker8 = () => {
        this.show8('date');
      }

      setDate9 = (event, date9) => {
        date9 = date9 || this.state.date9;
    
        this.setState({
          show9: Platform.OS === 'ios' ? true : false,
          date9,
        });
    
        const dateY9 = new Date(date9.setDate(date9.getDate()));
        let YDAY9= dateY9.getMonth()<9 ? dateY9.getDate()<=9 ? `${dateY9.getFullYear()}-0${dateY9.getMonth() + 1}-0${dateY9.getDate()}` : `${dateY9.getFullYear()}-0${dateY9.getMonth() + 1}-${dateY9.getDate()}` : dateY9.getDate()<=9 ? `${dateY9.getFullYear()}-${dateY9.getMonth() + 1}-0${dateY9.getDate()}` : `${dateY9.getFullYear()}-${dateY9.getMonth() + 1}-${dateY9.getDate()}`
        this.setState({db5 : YDAY9})
        
      }

      closedatepickerIOS9 = () => {
        this.setState({
          show9: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show9 = mode9 => {
        this.setState({
          show9: true,
          mode9,
        });
      }
    
      datepicker9 = () => {
        this.show9('date');
      }

      setDate10 = (event, date10) => {
        date10 = date10 || this.state.date10;
    
        this.setState({
          show10: Platform.OS === 'ios' ? true : false,
          date10,
        });
    
        const dateY10 = new Date(date10.setDate(date10.getDate()));
        let YDAY10= dateY10.getMonth()<9 ? dateY10.getDate()<=9 ? `${dateY10.getFullYear()}-0${dateY10.getMonth() + 1}-0${dateY10.getDate()}` : `${dateY10.getFullYear()}-0${dateY10.getMonth() + 1}-${dateY10.getDate()}` : dateY10.getDate()<=9 ? `${dateY10.getFullYear()}-${dateY10.getMonth() + 1}-0${dateY10.getDate()}` : `${dateY10.getFullYear()}-${dateY10.getMonth() + 1}-${dateY10.getDate()}`
        this.setState({db_lawf5 : YDAY10})
        
      }

      closedatepickerIOS10 = () => {
        this.setState({
          show10: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show10 = mode10 => {
        this.setState({
          show10: true,
          mode10,
        });
      }
    
      datepicker10 = () => {
        this.show10('date');
      }

      setDate11 = (event, date11) => {
        date11 = date11 || this.state.date11;
    
        this.setState({
          show11: Platform.OS === 'ios' ? true : false,
          date11,
        });
    
        const dateY11 = new Date(date11.setDate(date11.getDate()));
        let YDAY11= dateY11.getMonth()<9 ? dateY11.getDate()<=9 ? `${dateY11.getFullYear()}-0${dateY11.getMonth() + 1}-0${dateY11.getDate()}` : `${dateY11.getFullYear()}-0${dateY11.getMonth() + 1}-${dateY11.getDate()}` : dateY11.getDate()<=9 ? `${dateY11.getFullYear()}-${dateY11.getMonth() + 1}-0${dateY11.getDate()}` : `${dateY11.getFullYear()}-${dateY11.getMonth() + 1}-${dateY11.getDate()}`
        this.setState({db6 : YDAY11})
        
      }

      closedatepickerIOS11 = () => {
        this.setState({
          show11: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show11 = mode11 => {
        this.setState({
          show11: true,
          mode11,
        });
      }
    
      datepicker11 = () => {
        this.show11('date');
      }

      setDate12 = (event, date12) => {
        date12 = date12 || this.state.date12;
    
        this.setState({
          show12: Platform.OS === 'ios' ? true : false,
          date12,
        });
    
        const dateY12 = new Date(date12.setDate(date12.getDate()));
        let YDAY12= dateY12.getMonth()<9 ? dateY12.getDate()<=9 ? `${dateY12.getFullYear()}-0${dateY12.getMonth() + 1}-0${dateY12.getDate()}` : `${dateY12.getFullYear()}-0${dateY12.getMonth() + 1}-${dateY12.getDate()}` : dateY12.getDate()<=9 ? `${dateY12.getFullYear()}-${dateY12.getMonth() + 1}-0${dateY12.getDate()}` : `${dateY12.getFullYear()}-${dateY12.getMonth() + 1}-${dateY12.getDate()}`
        this.setState({db_lawf6 : YDAY12})
        
      }

      closedatepickerIOS12 = () => {
        this.setState({
          show12: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show12 = mode12 => {
        this.setState({
          show12: true,
          mode12,
        });
      }
    
      datepicker12 = () => {
        this.show12('date');
      }

      setDate13 = (event, date13) => {
        date13 = date13 || this.state.date13;
    
        this.setState({
          show13: Platform.OS === 'ios' ? true : false,
          date13,
        });
    
        const dateY13 = new Date(date13.setDate(date13.getDate()));
        let YDAY13= dateY13.getMonth()<9 ? dateY13.getDate()<=9 ? `${dateY13.getFullYear()}-0${dateY13.getMonth() + 1}-0${dateY13.getDate()}` : `${dateY13.getFullYear()}-0${dateY13.getMonth() + 1}-${dateY13.getDate()}` : dateY13.getDate()<=9 ? `${dateY13.getFullYear()}-${dateY13.getMonth() + 1}-0${dateY13.getDate()}` : `${dateY13.getFullYear()}-${dateY13.getMonth() + 1}-${dateY13.getDate()}`
        this.setState({db7 : YDAY13})
        
      }

      closedatepickerIOS13 = () => {
        this.setState({
          show13: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show13 = mode13 => {
        this.setState({
          show13: true,
          mode13,
        });
      }
    
      datepicker13 = () => {
        this.show13('date');
      }

      setDate14 = (event, date14) => {
        date14 = date14 || this.state.date14;
    
        this.setState({
          show14: Platform.OS === 'ios' ? true : false,
          date14,
        });
    
        const dateY14 = new Date(date14.setDate(date14.getDate()));
        let YDAY14= dateY14.getMonth()<9 ? dateY14.getDate()<=9 ? `${dateY14.getFullYear()}-0${dateY14.getMonth() + 1}-0${dateY14.getDate()}` : `${dateY14.getFullYear()}-0${dateY14.getMonth() + 1}-${dateY14.getDate()}` : dateY14.getDate()<=9 ? `${dateY14.getFullYear()}-${dateY14.getMonth() + 1}-0${dateY14.getDate()}` : `${dateY14.getFullYear()}-${dateY14.getMonth() + 1}-${dateY14.getDate()}`
        this.setState({db_lawf7 : YDAY14})
        
      }

      closedatepickerIOS14 = () => {
        this.setState({
          show14: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show14 = mode14 => {
        this.setState({
          show14: true,
          mode14,
        });
      }
    
      datepicker14 = () => {
        this.show14('date');
      }

      setDate15 = (event, date15) => {
        date15 = date15 || this.state.date15;
    
        this.setState({
          show15: Platform.OS === 'ios' ? true : false,
          date15,
        });
    
        const dateY15 = new Date(date15.setDate(date15.getDate()));
        let YDAY15= dateY15.getMonth()<9 ? dateY15.getDate()<=9 ? `${dateY15.getFullYear()}-0${dateY15.getMonth() + 1}-0${dateY15.getDate()}` : `${dateY15.getFullYear()}-0${dateY15.getMonth() + 1}-${dateY15.getDate()}` : dateY15.getDate()<=9 ? `${dateY15.getFullYear()}-${dateY15.getMonth() + 1}-0${dateY15.getDate()}` : `${dateY15.getFullYear()}-${dateY15.getMonth() + 1}-${dateY15.getDate()}`
        this.setState({db8 : YDAY15})
        
      }

      closedatepickerIOS15 = () => {
        this.setState({
          show15: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show15 = mode15 => {
        this.setState({
          show15: true,
          mode15,
        });
      }
    
      datepicker15 = () => {
        this.show15('date');
      }

      setDate16 = (event, date16) => {
        date16 = date16 || this.state.date16;
    
        this.setState({
          show16: Platform.OS === 'ios' ? true : false,
          date16,
        });
    
        const dateY16 = new Date(date16.setDate(date16.getDate()));
        let YDAY16= dateY16.getMonth()<9 ? dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-0${dateY16.getMonth() + 1}-${dateY16.getDate()}` : dateY16.getDate()<=9 ? `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-0${dateY16.getDate()}` : `${dateY16.getFullYear()}-${dateY16.getMonth() + 1}-${dateY16.getDate()}`
        this.setState({db_lawf8 : YDAY16})
        
      }

      closedatepickerIOS16 = () => {
        this.setState({
          show16: Platform.OS === 'ios' ? false : false,
        });
  
      }
    
      show16 = mode16 => {
        this.setState({
          show16: true,
          mode16,
        });
      }
    
      datepicker16 = () => {
        this.show16('date');
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

	render(){

        //Variables to get files from frontend
        let { backfile } = this.state;
        let { namei } = this.state;
        let { backfilef1 } = this.state;
        let { nameif1 } = this.state;
        let { backfilef2 } = this.state;
        let { nameif2 } = this.state;
        let { backfilef3 } = this.state;
        let { nameif3 } = this.state;
        let { backfilef4 } = this.state;
        let { nameif4 } = this.state;
        let { backfilef5 } = this.state;
        let { nameif5 } = this.state;
        let { backfilef6 } = this.state;
        let { nameif6 } = this.state;
        let { backfilef7 } = this.state;
        let { nameif7 } = this.state;
        let { backfilef8 } = this.state;
        let { nameif8 } = this.state;

        let { showp, datep, modep } = this.state;
        let { showp2, datep2, modep2 } = this.state;
        let { show, date, mode } = this.state;
        let { show2, date2, mode2 } = this.state;
        let { show3, date3, mode3 } = this.state;
        let { show4, date4, mode4 } = this.state;
        let { show5, date5, mode5 } = this.state;
        let { show6, date6, mode6} = this.state;
        let { show7, date7, mode7 } = this.state;
        let { show8, date8, mode8 } = this.state;
        let { show9, date9, mode9 } = this.state;
        let { show10, date10, mode10 } = this.state;
        let { show11, date11, mode11 } = this.state;
        let { show12, date12, mode12 } = this.state;
        let { show13, date13, mode13 } = this.state;
        let { show14, date14, mode14 } = this.state;
        let { show15, date15, mode15 } = this.state;
        let { show16, date16, mode16 } = this.state;

  return (
    <NativeBaseProvider>
      {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }}>
                        <View style={globalStyles.skeletonMarginProfileText}>
                            <HStack space="2" alignItems="center">
                                <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                            </HStack>
                        </View>
                        <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                            borderColor: "coolGray.500"
                            }} _light={{
                            borderColor: "coolGray.200"
                            }}>
                            <View style={globalStyles.skeletonMarginProfileText}>
                                <HStack space="2" alignItems="center">
                                    <Skeleton size="5" rounded="full" />
                                    <Skeleton h="3" flex="2" rounded="full" />
                                </HStack>
                            </View>
                            <Skeleton.Text px="5" />
                            <Skeleton.Text px="5" my="4" />
                            <Skeleton.Text px="5" my="4" />
                        </VStack>
                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
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

                    <View style={globalStyles.WelcomeImageMargin}>

                        <Image
                                                                                        
                            resizeMode="cover"
                            source={require('../assets/vacios-homebor-antena.png')}
                            style={globalStyles.imageNotInternet}
                        ></Image>

                    </View>

                    <View style={globalStyles.WelcomeTextandBoton}>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                        <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
                    </View>

                    {this.state.connection_status ?
                        <View>
                            <Text onPress={this.onRefresh} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                        </View>
                    : 
                        <View>
                            <Text onPress={this.tryAgainNotConnection} style={globalStyles.TryAgainCalendarYearnoInternet}> Try Again </Text>
                        </View>
                    }

                </View>
                )}
            
            {this.state.connection_refreshStatus == false && (
              <View>
                <FlatList
                data={this.state.info}
                keyExtractor={item => `${item.info}`}
                renderItem={({item}) => (
                    <View>
                      <StatusBar style="light" translucent={true} />

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

                      <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                        <ScrollView 
                            nestedScrollEnabled={true} 
                            alwaysBounceHorizontal={false}
                            alwaysBounceVertical={false}
                            bounces={false}>
                              <View style={ globalStyles.contenido } >
                                <View style={globalStyles.marginTopRequiredFields}>
                                  <Heading size='xl'style={ globalStyles.titulo }>Family Information</Heading>
                                </View>
                              

                              <FormControl>

                                {/*Propietor Information*/}
                                <Card>
                                        <View style={globalStyles.editView}>
                                            <Heading size='md' style={ globalStyles.infomaintitledit}>My Information</Heading>
                                            
                                            <Image source={require("../assets/profile2-64.png")}
                                                                resizeMode="contain"
                                                                style={globalStyles.editiconProFamilyInfo}/>
                                        </View>

                                        <Stack >
                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Name</FormControl.Label>
                                              <Input 
                                                  defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                                  onChangeText={ (nameh) => this.setState({nameh}) }
                                                  placeholder="e.g. Eva"
                                                  style={ globalStyles.inputedit}
                                              />
                                          </Stack>


                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Last Name</FormControl.Label>
                                              <Input 
                                                    defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                                    onChangeText={ (lnameh) => this.setState({lnameh}) }
                                                    placeholder="e.g. Smith"
                                                    style={ globalStyles.inputedit}
                                                />
                                          </Stack>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Date of Birth</FormControl.Label>
                                              <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.DatesinputRLelements}
                                                                    onPress={this.datepickerp}>
                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db == 'NULL' ? '' : this.state.db}
                                                                onChangeText={ (db) => this.setState({db}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                            { showp && Platform.OS != 'ios' && <DateTimePicker 
                                                                        value={datep}
                                                                        mode={modep}
                                                                        is24Hour={true}
                                                                        display="default"
                                                                        onChange={this.setDatep} />
                                                            }
                                                            { showp && Platform.OS === 'ios' && 
                                                                      <View>
                                                                        <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                        <DateTimePicker
                                                                          textColor="black"
                                                                          value={datep}
                                                                          mode={modep}
                                                                          is24Hour={true}
                                                                          display="spinner"
                                                                          onChange={this.setDatep} />

                                                                        <TouchableHighlight
                                                                        style={globalStyles.StudentopenButtonReply}
                                                                        onPress={() => this.closedatepickerIOSp()}>
                                                                          <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                        </TouchableHighlight>
                                                                      </View>
                                                            }
                                                </View>
                                          </Stack>

                                          <FormControl.Label style={ globalStyles.infotitle}>Gender</FormControl.Label>

                                                    
                                          <View style={globalStyles.editMargintop}>
                                              <Picker
                                                  style={globalStyles.pickerBasicinfo}
                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                  selectedValue={this.state.gender == 'NULL' ? "Select"  : this.state.gender}
                                                  onValueChange={(gender) => this.setState({gender})}>
                                                      <Picker.Item label="Select" value="NULL" />
                                                      <Picker.Item label="Male" value="Male" /> 
                                                      <Picker.Item label="Female" value="Female" />
                                                      <Picker.Item label="Private" value="Private" />
                                              </Picker>
                                          </View>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Phone Number</FormControl.Label>
                                              <Input 
                                                    defaultValue={item.cell == 'NULL' ? '' : item.cell}
                                                    onChangeText={ (cell) => this.setState({cell}) }
                                                    placeholder="e.g. 55578994"
                                                    style={ globalStyles.inputedit}
                                                />
                                          </Stack>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Occupation</FormControl.Label>
                                              <Input 
                                                    defaultValue={item.occupation_m == 'NULL' ? '' : item.occupation_m}
                                                    onChangeText={ (occupation_m2) => this.setState({occupation_m2}) }
                                                    placeholder="e.g. Lawyer"
                                                    style={ globalStyles.inputedit}
                                                />
                                          </Stack>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Date of Background Check</FormControl.Label>
                                              <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.DatesinputRLelements}
                                                                    onPress={this.datepickerp2}>
                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.dblaw == 'NULL' ? '' : this.state.dblaw}
                                                                onChangeText={ (dblaw) => this.setState({dblaw}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                            { showp2 && Platform.OS != 'ios' && <DateTimePicker 
                                                                        value={datep2}
                                                                        mode={modep2}
                                                                        display="default"
                                                                        onChange={this.setDatep2} />
                                                            }
                                                            { showp2 && Platform.OS === 'ios' && 
                                                                      <View>
                                                                        <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                        <DateTimePicker
                                                                          textColor="black"
                                                                          value={datep2}
                                                                          mode={modep2}
                                                                          is24Hour={true}
                                                                          display="spinner"
                                                                          onChange={this.setDatep2} />

                                                                        <TouchableHighlight
                                                                        style={globalStyles.StudentopenButtonReply}
                                                                        onPress={() => this.closedatepickerIOSp2()}>
                                                                          <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                        </TouchableHighlight>
                                                                      </View>
                                                            }
                                                </View>
                                          </Stack>
                                        </Stack>
                                          
                                      
                                        <Text style={ globalStyles.infotitle}>Background Check</Text>

                                          <TouchableOpacity onPress={()=>this._pickImagep()}>
                                              <Card style={globalStyles.shadowbox}>
                                                <Heading size='md' style={globalStyles.butonfiledit}> Touch to upload file </Heading>
                                                      <View style={ globalStyles.underlinig }/>
                                                          {backfile == undefined ?
                                                          <Text></Text>
                                                          :<Text style={globalStyles.uploadFile}>{namei}</Text>}
                                              </Card>
                                          </TouchableOpacity>
                

                                      </Card>


                                {/*Member 1 */}

                                { this.state.addmember == 'Yes' ?
                                        <View>
                                <Card>
                                <Collapse style={globalStyles.show} isExpanded={this.state.expanded} onToggle={(isExpanded)=>this.setState({expanded: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                      
                                        { this.state.expanded === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 1{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 1{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        } 
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                          <Stack >
                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                <Input 
                                                  defaultValue={item.f_name1 == 'NULL' ? '' : item.f_name1}
                                                  onChangeText={ (f_name1) => this.setState({f_name1}) }
                                                  placeholder="e.g. Melissa"
                                                  style={ globalStyles.inputedit}
                                                  />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                <Input 
                                                    defaultValue={item.f_lname1 == 'NULL' ? '' : item.f_lname1}
                                                    onChangeText={ (f_lname1) => this.setState({f_lname1}) }
                                                    placeholder="e.g. Smith"
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                              <View>
                                                        <View>
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                            <Input
                                                                isReadOnly={true}
                                                                InputRightElement={
                                                                    <TouchableOpacity
                                                                    style={globalStyles.DatesinputRLelements}
                                                                    onPress={this.datepicker}>
                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                    </TouchableOpacity>
                                                                }
                                                                style={ globalStyles.inputedit}
                                                                placeholder="Message"
                                                                value={this.state.db1 == 'NULL' ? '' : this.state.db1}
                                                                onChangeText={ (db1) => this.setState({db1}) }
                                                            />
                                                        </Stack> 
                                                
                                                        </View>
                                                        { show && Platform.OS != 'ios' && <DateTimePicker 
                                                                    value={date}
                                                                    mode={mode}
                                                                    is24Hour={true}
                                                                    display="default"
                                                                    onChange={this.setDate} />
                                                        }
                                                        { show && Platform.OS === 'ios' && 
                                                                  <View>
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
                                                                  </View>
                                                        }
                                                </View>
                                            </Stack>

                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                  <View style={globalStyles.editMargintop}>
                                                      <Picker
                                                          style={globalStyles.pickerBasicinfo} 
                                                          selectedValue={this.state.gender1 == 'NULL' ? "Select"  : this.state.gender1}
                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                          onValueChange={(gender1) => this.setState({gender1})}>
                                                              <Picker.Item label="Select" value="NULL" />
                                                              <Picker.Item label="Male" value="Male" /> 
                                                              <Picker.Item label="Female" value="Female" />
                                                              <Picker.Item label="Private" value="Private" />
                                                      </Picker>
                                                  </View>
                                            
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                      <View style={globalStyles.editMargintop}>
                                                          <Picker
                                                              style={globalStyles.pickerBasicinfo} 
                                                              selectedValue={this.state.re1 == 'NULL' ? "Select"  : this.state.re1}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(re1) => this.setState({re1})}>
                                                                  <Picker.Item label="Select" value="NULL" />
                                                                  <Picker.Item label="Dad" value="Dad" /> 
                                                                  <Picker.Item label="Mom" value="Mom" />
                                                                  <Picker.Item label="Son" value="Son" />
                                                                  <Picker.Item label="Daughter" value="Daughter" />
                                                                  <Picker.Item label="Grandparents" value="Grandparents" />
                                                                  <Picker.Item label="Others" value="Others" />
                                                          </Picker>
                                                      </View>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                          <Input
                                                              placeholder="e.g. Lawyer" 
                                                              defaultValue={item.occupation_f1 == 'NULL' ? '' : item.occupation_f1}
                                                              onChangeText={ (occupation_f1) => this.setState({occupation_f1}) }
                                                              style={ globalStyles.inputedit}
                                                          />
                                                      </Stack>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                          <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker2}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db_lawf1 == 'NULL' ? '' : this.state.db_lawf1}
                                                                        onChangeText={ (db_lawf1) => this.setState({db_lawf1}) }
                                                                    />
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
                                                                          <View>
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
                                                                          </View>
                                                                }
                                                        </View>
                                                        </Stack>

                                                        
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                    <TouchableOpacity onPress={()=>this._pickImage()}>
                                                        <Card style={globalStyles.shadowbox}>
                                                          <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                <View style={ globalStyles.underlinig }/>
                                                                    {backfilef1 == undefined ?
                                                                    <Text></Text>
                                                                    :<Text style={globalStyles.uploadFile}>{nameif1}</Text>}
                                                        </Card>
                                                    </TouchableOpacity>
                                                    
                                          </Stack>
                                </CollapseBody>
                                  
                                </Collapse>
                              
                                  </Card>
                                  </View> : <View></View>
                                        }

                                  {/*Member 2 */}

                                  {this.state.f_name1 != 'NULL' || this.state.f_lname1 != 'NULL' || this.state.db1 != 'NULL' || this.state.db_lawf1 != 'NULL' || this.state.gender1 != 'NULL' || this.state.re1 != 'NULL' ?
                                    <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded2} onToggle={(isExpanded)=>this.setState({expanded2: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded2 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 2{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 2{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                              <Stack >
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name2 == 'NULL' ? '' : item.f_name2}
                                                      onChangeText={ (f_name2) => this.setState({f_name2}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname2 == 'NULL' ? '' : item.f_lname2}
                                                        onChangeText={ (f_lname2) => this.setState({f_lname2}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                  <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker3}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db2 == 'NULL' ? '' : this.state.db2}
                                                                        onChangeText={ (db2) => this.setState({db2}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show3 && Platform.OS != 'ios' && <DateTimePicker 
                                                                    value={date3}
                                                                    mode={mode3}
                                                                    is24Hour={true}
                                                                    display="default"
                                                                    onChange={this.setDate3} />
                                                                }
                                                                { show3 && Platform.OS === 'ios' && 
                                                                          <View>
                                                                            <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                            <DateTimePicker
                                                                              textColor="black"
                                                                              value={date3}
                                                                              mode={mode3}
                                                                              is24Hour={true}
                                                                              display="spinner"
                                                                              onChange={this.setDate3} />

                                                                            <TouchableHighlight
                                                                            style={globalStyles.StudentopenButtonReply}
                                                                            onPress={() => this.closedatepickerIOS3()}>
                                                                              <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                            </TouchableHighlight>
                                                                          </View>
                                                                }
                                                        </View>
                                                </Stack>

                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                      <View style={globalStyles.editMargintop}>
                                                          <Picker
                                                              style={globalStyles.pickerBasicinfo} 
                                                              selectedValue={this.state.gender2 == 'NULL' ? "Select"  : this.state.gender2}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(gender2) => this.setState({gender2})}>
                                                                  <Picker.Item label="Select" value="NULL" />
                                                                  <Picker.Item label="Male" value="Male" /> 
                                                                  <Picker.Item label="Female" value="Female" />
                                                                  <Picker.Item label="Private" value="Private" />
                                                          </Picker>
                                                      </View>
                                                
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                          <View style={globalStyles.editMargintop}>
                                                              <Picker
                                                                  style={globalStyles.pickerBasicinfo} 
                                                                  selectedValue={this.state.re2 == 'NULL' ? "Select"  : this.state.re2}
                                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                  onValueChange={(re2) => this.setState({re2})}>
                                                                      <Picker.Item label="Select" value="NULL" />
                                                                      <Picker.Item label="Dad" value="Dad" /> 
                                                                      <Picker.Item label="Mom" value="Mom" />
                                                                      <Picker.Item label="Son" value="Son" />
                                                                      <Picker.Item label="Daughter" value="Daughter" />
                                                                      <Picker.Item label="Grandparents" value="Grandparents" />
                                                                      <Picker.Item label="Others" value="Others" />
                                                              </Picker>
                                                          </View>

                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                              <Input
                                                                  placeholder="e.g. Lawyer" 
                                                                  defaultValue={item.occupation_f2 == 'NULL' ? '' : item.occupation_f2}
                                                                  onChangeText={ (occupation_f2) => this.setState({occupation_f2}) }
                                                                  style={ globalStyles.inputedit}
                                                              />
                                                          </Stack>

                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                              <View>
                                                                        <View>
                                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                                            <Input
                                                                                isReadOnly={true}
                                                                                InputRightElement={
                                                                                    <TouchableOpacity
                                                                                    style={globalStyles.DatesinputRLelements}
                                                                                    onPress={this.datepicker4}>
                                                                                    <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                    </TouchableOpacity>
                                                                                }
                                                                                style={ globalStyles.inputedit}
                                                                                placeholder="Message"
                                                                                value={this.state.db_lawf2 == 'NULL' ? '' : this.state.db_lawf2}
                                                                                onChangeText={ (db_lawf2) => this.setState({db_lawf2}) }
                                                                            />
                                                                        </Stack> 
                                                                
                                                                        </View>
                                                                        { show4 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date4}
                                                                              mode={mode4}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate4} />
                                                                          }
                                                                          { show4 && Platform.OS === 'ios' && 
                                                                                    <View>
                                                                                      <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                      <DateTimePicker
                                                                                        textColor="black"
                                                                                        value={date4}
                                                                                        mode={mode4}
                                                                                        is24Hour={true}
                                                                                        display="spinner"
                                                                                        onChange={this.setDate4} />

                                                                                      <TouchableHighlight
                                                                                      style={globalStyles.StudentopenButtonReply}
                                                                                      onPress={() => this.closedatepickerIOS4()}>
                                                                                        <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                      </TouchableHighlight>
                                                                                    </View>
                                                                          }
                                                                </View>
                                                            </Stack>

                                                            
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                        <TouchableOpacity onPress={()=>this._pickImage2()}>
                                                            <Card style={globalStyles.shadowbox}>
                                                              <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                    <View style={ globalStyles.underlinig }/>
                                                                        {backfilef2 == undefined ?
                                                                        <Text></Text>
                                                                        :<Text style={globalStyles.uploadFile}>{nameif2}</Text>}
                                                            </Card>
                                                        </TouchableOpacity>
                                                        
                                              </Stack>
                                </CollapseBody>
                                  
                                </Collapse>
                                      </Card>:
                                      <View></View>
                                      
                                      }

                                      {/*Member 3 */}

                                      {this.state.f_name2 != 'NULL' || this.state.f_lname2 != 'NULL' || this.state.db2 != 'NULL' || this.state.db_lawf2 != 'NULL' || this.state.gender2 != 'NULL' || this.state.re2 != 'NULL' ?
                                        <Card>
                                          <Collapse style={globalStyles.show} isExpanded={this.state.expanded3} onToggle={(isExpanded)=>this.setState({expanded3: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded3 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 3{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 3{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                              <Stack >
                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                    <Input 
                                                      defaultValue={item.f_name3 == 'NULL' ? '' : item.f_name3}
                                                      onChangeText={ (f_name3) => this.setState({f_name3}) }
                                                      placeholder="e.g. Melissa"
                                                      style={ globalStyles.inputedit}
                                                      />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                    <Input 
                                                        defaultValue={item.f_lname3 == 'NULL' ? '' : item.f_lname3}
                                                        onChangeText={ (f_lname3) => this.setState({f_lname3}) }
                                                        placeholder="e.g. Smith"
                                                        style={ globalStyles.inputedit}
                                                    />
                                                </Stack>

                                                <Stack inlineLabel last style={globalStyles.input}>
                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                    <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker5}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db3 == 'NULL' ? '' : this.state.db3}
                                                                        onChangeText={ (db3) => this.setState({db3}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show5 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date5}
                                                                              mode={mode5}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate5} />
                                                                          }
                                                                          { show5 && Platform.OS === 'ios' && 
                                                                                    <View>
                                                                                      <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                      <DateTimePicker
                                                                                        textColor="black"
                                                                                        value={date5}
                                                                                        mode={mode5}
                                                                                        is24Hour={true}
                                                                                        display="spinner"
                                                                                        onChange={this.setDate5} />

                                                                                      <TouchableHighlight
                                                                                      style={globalStyles.StudentopenButtonReply}
                                                                                      onPress={() => this.closedatepickerIOS5()}>
                                                                                        <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                      </TouchableHighlight>
                                                                                    </View>
                                                                          }
                                                        </View>
                                                    </Stack>

                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                      <View style={globalStyles.editMargintop}>
                                                          <Picker
                                                              style={globalStyles.pickerBasicinfo} 
                                                              selectedValue={this.state.gender3 == 'NULL' ? "Select"  : this.state.gender3}
                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                              onValueChange={(gender3) => this.setState({gender3})}>
                                                                  <Picker.Item label="Select" value="NULL" />
                                                                  <Picker.Item label="Male" value="Male" /> 
                                                                  <Picker.Item label="Female" value="Female" />
                                                                  <Picker.Item label="Private" value="Private" />
                                                          </Picker>
                                                      </View>
                                                
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                          <View style={globalStyles.editMargintop}>
                                                              <Picker
                                                                  style={globalStyles.pickerBasicinfo} 
                                                                  selectedValue={this.state.re3 == 'NULL' ? "Select"  : this.state.re3}
                                                                  itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                  onValueChange={(re3) => this.setState({re3})}>
                                                                      <Picker.Item label="Select" value="NULL" />
                                                                      <Picker.Item label="Dad" value="Dad" /> 
                                                                      <Picker.Item label="Mom" value="Mom" />
                                                                      <Picker.Item label="Son" value="Son" />
                                                                      <Picker.Item label="Daughter" value="Daughter" />
                                                                      <Picker.Item label="Grandparents" value="Grandparents" />
                                                                      <Picker.Item label="Others" value="Others" />
                                                              </Picker>
                                                          </View>
                                                        
                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                              <Input
                                                                  placeholder="e.g. Lawyer" 
                                                                  defaultValue={item.occupation_f3 == 'NULL' ? '' : item.occupation_f3}
                                                                  onChangeText={ (occupation_f3) => this.setState({occupation_f3}) }
                                                                  style={ globalStyles.inputedit}
                                                              />
                                                          </Stack>

                                                          <Stack inlineLabel last style={globalStyles.input}>
                                                          <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                <View>
                                                                            <View>
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                                <Input
                                                                                    isReadOnly={true}
                                                                                    InputRightElement={
                                                                                        <TouchableOpacity
                                                                                        style={globalStyles.DatesinputRLelements}
                                                                                        onPress={this.datepicker6}>
                                                                                        <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                        </TouchableOpacity>
                                                                                    }
                                                                                    style={ globalStyles.inputedit}
                                                                                    placeholder="Message"
                                                                                    value={this.state.db_lawf3 == 'NULL' ? '' : this.state.db_lawf3}
                                                                                    onChangeText={ (db_lawf3) => this.setState({db_lawf3}) }
                                                                                />
                                                                            </Stack> 
                                                                    
                                                                            </View>
                                                                            { show6 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date6}
                                                                              mode={mode6}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate6} />
                                                                              }
                                                                              { show6 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date6}
                                                                                            mode={mode6}
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate6} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS6()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                    </View>
                                                                </Stack>

                                                              
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                        <TouchableOpacity onPress={()=>this._pickImage3()}>
                                                            <Card style={globalStyles.shadowbox}>
                                                              <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                    <View style={ globalStyles.underlinig }/>
                                                                        {backfilef3 == undefined ?
                                                                        <Text></Text>
                                                                        :<Text style={globalStyles.uploadFile}>{nameif3}</Text>}
                                                            </Card>
                                                        </TouchableOpacity>
                                                      
                                              </Stack>
                                </CollapseBody>
                                  
                                </Collapse>
                                      </Card>:<View></View>
                                        }

                                      {/*Member 4 */}

                                      {this.state.f_name3 != 'NULL' || this.state.f_lname3 != 'NULL' || this.state.db3 != 'NULL' || this.state.db_lawf3 != 'NULL' || this.state.gender3 != 'NULL' || this.state.re3 != 'NULL' ?
                                        <Card>
                                            <Collapse style={globalStyles.show} isExpanded={this.state.expanded4} onToggle={(isExpanded)=>this.setState({expanded4: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded4 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 4{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 4{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                                <Stack >
                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                      <Input 
                                                        defaultValue={item.f_name4 == 'NULL' ? '' : item.f_name4}
                                                        onChangeText={ (f_name4) => this.setState({f_name4}) }
                                                        placeholder="e.g. Melissa"
                                                        style={ globalStyles.inputedit}
                                                        />
                                                  </Stack>

                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                      <Input 
                                                          defaultValue={item.f_lname4 == 'NULL' ? '' : item.f_lname4}
                                                          onChangeText={ (f_lname4) => this.setState({f_lname4}) }
                                                          placeholder="e.g. Smith"
                                                          style={ globalStyles.inputedit}
                                                      />
                                                  </Stack>

                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                        <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker7}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db4 == 'NULL' ? '' : this.state.db4}
                                                                        onChangeText={ (db4) => this.setState({db4}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show7 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date7}
                                                                              mode={mode7}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate7} />
                                                                              }
                                                                              { show7 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date7}
                                                                                            mode={mode7}
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate7} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS7()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                        </View>
                                                    </Stack>

                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                        <View style={globalStyles.editMargintop}>
                                                            <Picker
                                                                style={globalStyles.pickerBasicinfo} 
                                                                selectedValue={this.state.gender4 == 'NULL' ? "Select"  : this.state.gender4}
                                                                itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                onValueChange={(gender4) => this.setState({gender4})}>
                                                                    <Picker.Item label="Select" value="NULL" />
                                                                    <Picker.Item label="Male" value="Male" /> 
                                                                    <Picker.Item label="Female" value="Female" />
                                                                    <Picker.Item label="Private" value="Private" />
                                                            </Picker>
                                                        </View>
                                                  
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                            <View style={globalStyles.editMargintop}>
                                                                <Picker
                                                                    style={globalStyles.pickerBasicinfo} 
                                                                    selectedValue={this.state.re4 == 'NULL' ? "Select"  : this.state.re4}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(re4) => this.setState({re4})}>
                                                                        <Picker.Item label="Select" value="NULL" />
                                                                        <Picker.Item label="Dad" value="Dad" /> 
                                                                        <Picker.Item label="Mom" value="Mom" />
                                                                        <Picker.Item label="Son" value="Son" />
                                                                        <Picker.Item label="Daughter" value="Daughter" />
                                                                        <Picker.Item label="Grandparents" value="Grandparents" />
                                                                        <Picker.Item label="Others" value="Others" />
                                                                </Picker>
                                                            </View>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                                <Input
                                                                    placeholder="e.g. Lawyer" 
                                                                    defaultValue={item.occupation_f4 == 'NULL' ? '' : item.occupation_f4}
                                                                    onChangeText={ (occupation_f4) => this.setState({occupation_f4}) }
                                                                    style={ globalStyles.inputedit}
                                                                />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                    <View>
                                                                            <View>
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                                <Input
                                                                                    isReadOnly={true}
                                                                                    InputRightElement={
                                                                                        <TouchableOpacity
                                                                                        style={globalStyles.DatesinputRLelements}
                                                                                        onPress={this.datepicker8}>
                                                                                        <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                        </TouchableOpacity>
                                                                                    }
                                                                                    style={ globalStyles.inputedit}
                                                                                    placeholder="Message"
                                                                                    value={this.state.db_lawf4 == 'NULL' ? '' : this.state.db_lawf4}
                                                                                    onChangeText={ (db_lawf4) => this.setState({db_lawf4}) }
                                                                                />
                                                                            </Stack> 
                                                                    
                                                                            </View>
                                                                            { show8 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date8}
                                                                              mode={mode8}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate8} />
                                                                              }
                                                                              { show8 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date8}
                                                                                            mode={mode8}
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate8} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS8()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                    </View>
                                                                </Stack>

                                                              
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                          <TouchableOpacity onPress={()=>this._pickImage4()}>
                                                              <Card style={globalStyles.shadowbox}>
                                                                <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                      <View style={ globalStyles.underlinig }/>
                                                                          {backfilef4 == undefined ?
                                                                          <Text></Text>
                                                                          :<Text style={globalStyles.uploadFile}>{nameif4}</Text>}
                                                              </Card>
                                                          </TouchableOpacity>
                                                          
                                                </Stack>
                                </CollapseBody>
                                  
                                </Collapse>
                                        </Card>:<View></View>
                                            }

                                        {/*Member 5 */}

                                        {this.state.f_name4 != 'NULL' || this.state.f_lname4 != 'NULL' || this.state.db4 != 'NULL' || this.state.db_lawf4 != 'NULL' || this.state.gender4 != 'NULL' || this.state.re4 != 'NULL' ?
                                          <Card>
                                                <Collapse style={globalStyles.show} isExpanded={this.state.expanded5} onToggle={(isExpanded)=>this.setState({expanded5: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded5 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 5{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 5{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                                    <Stack >
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                          <Input 
                                                            defaultValue={item.f_name5 == 'NULL' ? '' : item.f_name5}
                                                            onChangeText={ (f_name5) => this.setState({f_name5}) }
                                                            placeholder="e.g. Melissa"
                                                            style={ globalStyles.inputedit}
                                                            />
                                                      </Stack>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                          <Input 
                                                              defaultValue={item.f_lname5 == 'NULL' ? '' : item.f_lname5}
                                                              onChangeText={ (f_lname5) => this.setState({f_lname5}) }
                                                              placeholder="e.g. Smith"
                                                              style={ globalStyles.inputedit}
                                                          />
                                                      </Stack>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                        <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker9}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db5 == 'NULL' ? '' : this.state.db5}
                                                                        onChangeText={ (db5) => this.setState({db5}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show9 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date9}
                                                                              mode={mode9}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate9} />
                                                                              }
                                                                              { show9 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date9}
                                                                                            mode={mode9}
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate9} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS9()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                        </View>
                                                      </Stack>

                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                            <View style={globalStyles.editMargintop}>
                                                                <Picker
                                                                    style={globalStyles.pickerBasicinfo} 
                                                                    selectedValue={this.state.gender5 == 'NULL' ? "Select"  : this.state.gender5}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(gender5) => this.setState({gender5})}>
                                                                        <Picker.Item label="Select" value="NULL" />
                                                                        <Picker.Item label="Male" value="Male" /> 
                                                                        <Picker.Item label="Female" value="Female" />
                                                                        <Picker.Item label="Private" value="Private" />
                                                                </Picker>
                                                            </View>
                                                      
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                                <View style={globalStyles.editMargintop}>
                                                                    <Picker
                                                                        style={globalStyles.pickerBasicinfo} 
                                                                        selectedValue={this.state.re5 == 'NULL' ? "Select"  : this.state.re5}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(re5) => this.setState({re5})}>
                                                                            <Picker.Item label="Select" value="NULL" />
                                                                            <Picker.Item label="Dad" value="Dad" /> 
                                                                            <Picker.Item label="Mom" value="Mom" />
                                                                            <Picker.Item label="Son" value="Son" />
                                                                            <Picker.Item label="Daughter" value="Daughter" />
                                                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                                                            <Picker.Item label="Others" value="Others" />
                                                                    </Picker>
                                                                </View>

                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                                    <Input
                                                                        placeholder="e.g. Lawyer" 
                                                                        defaultValue={item.occupation_f5 == 'NULL' ? '' : item.occupation_f5}
                                                                        onChangeText={ (occupation_f5) => this.setState({occupation_f5}) }
                                                                        style={ globalStyles.inputedit}
                                                                    />
                                                                </Stack>

                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                    <View>
                                                                            <View>
                                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                                                <Input
                                                                                    isReadOnly={true}
                                                                                    InputRightElement={
                                                                                        <TouchableOpacity
                                                                                        style={globalStyles.DatesinputRLelements}
                                                                                        onPress={this.datepicker10}>
                                                                                        <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                        </TouchableOpacity>
                                                                                    }
                                                                                    style={ globalStyles.inputedit}
                                                                                    placeholder="Message"
                                                                                    value={this.state.db_lawf5 == 'NULL' ? '' : this.state.db_lawf5}
                                                                                    onChangeText={ (db_lawf5) => this.setState({db_lawf5}) }
                                                                                />
                                                                            </Stack> 
                                                                    
                                                                            </View>
                                                                            { show10 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date10}
                                                                              mode={mode10}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate10} />
                                                                              }
                                                                              { show10 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date10}
                                                                                            mode={mode10} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate10} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS10()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                    </View>
                                                                  </Stack>

                                                                  
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                              <TouchableOpacity onPress={()=>this._pickImage5()}>
                                                                  <Card style={globalStyles.shadowbox}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                          <View style={ globalStyles.underlinig }/>
                                                                              {backfilef5 == undefined ?
                                                                              <Text></Text>
                                                                              :<Text style={globalStyles.uploadFile}>{nameif5}</Text>}
                                                                  </Card>
                                                              </TouchableOpacity>
                                                              
                                                    </Stack>
                            
                                </CollapseBody>
                                  
                                </Collapse>
                                            </Card>:<View></View>
                                            }

                                            {/*Member 6 */}

                                            {this.state.f_name5 != 'NULL' || this.state.f_lname5 != 'NULL' || this.state.db5 != 'NULL' || this.state.db_lawf5 != 'NULL' || this.state.gender5 != 'NULL' || this.state.re5 != 'NULL' ?
                                            <Card>
                                                <Collapse style={globalStyles.show} isExpanded={this.state.expanded6} onToggle={(isExpanded)=>this.setState({expanded6: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded6 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 6{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 6{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                                    <Stack >
                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                          <Input 
                                                            defaultValue={item.f_name6 == 'NULL' ? '' : item.f_name6}
                                                            onChangeText={ (f_name6) => this.setState({f_name6}) }
                                                            placeholder="e.g. Melissa"
                                                            style={ globalStyles.inputedit}
                                                            />
                                                      </Stack>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                          <Input 
                                                              defaultValue={item.f_lname6 == 'NULL' ? '' : item.f_lname6}
                                                              onChangeText={ (f_lname6) => this.setState({f_lname6}) }
                                                              placeholder="e.g. Smith"
                                                              style={ globalStyles.inputedit}
                                                          />
                                                      </Stack>

                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                            <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker11}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db6 == 'NULL' ? '' : this.state.db6}
                                                                        onChangeText={ (db6) => this.setState({db6}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show11 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date11}
                                                                              mode={mode11}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate11} />
                                                                              }
                                                                              { show11 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date11}
                                                                                            mode={mode11} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate11} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS11()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                        </View>
                                                        </Stack>

                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                            <View style={globalStyles.editMargintop}>
                                                                <Picker
                                                                    style={globalStyles.pickerBasicinfo} 
                                                                    selectedValue={this.state.gender6 == 'NULL' ? "Select"  : this.state.gender6}
                                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                    onValueChange={(gender6) => this.setState({gender6})}>
                                                                        <Picker.Item label="Select" value="NULL" />
                                                                        <Picker.Item label="Male" value="Male" /> 
                                                                        <Picker.Item label="Female" value="Female" />
                                                                        <Picker.Item label="Private" value="Private" />
                                                                </Picker>
                                                            </View>
                                                      
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                                <View style={globalStyles.editMargintop}>
                                                                    <Picker
                                                                        style={globalStyles.pickerBasicinfo} 
                                                                        selectedValue={this.state.re6 == 'NULL' ? "Select"  : this.state.re6}
                                                                        itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                        onValueChange={(re6) => this.setState({re6})}>
                                                                            <Picker.Item label="Select" value="NULL" />
                                                                            <Picker.Item label="Dad" value="Dad" /> 
                                                                            <Picker.Item label="Mom" value="Mom" />
                                                                            <Picker.Item label="Son" value="Son" />
                                                                            <Picker.Item label="Daughter" value="Daughter" />
                                                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                                                            <Picker.Item label="Others" value="Others" />
                                                                    </Picker>
                                                                </View>

                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                                    <Input
                                                                        placeholder="e.g. Lawyer" 
                                                                        defaultValue={item.occupation_f6 == 'NULL' ? '' : item.occupation_f6}
                                                                        onChangeText={ (occupation_f6) => this.setState({occupation_f6}) }
                                                                        style={ globalStyles.inputedit}
                                                                    />
                                                                </Stack>

                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                        <View>
                                                                                <View>
                                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                                    <Input
                                                                                        isReadOnly={true}
                                                                                        InputRightElement={
                                                                                            <TouchableOpacity
                                                                                            style={globalStyles.DatesinputRLelements}
                                                                                            onPress={this.datepicker12}>
                                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                            </TouchableOpacity>
                                                                                        }
                                                                                        style={ globalStyles.inputedit}
                                                                                        placeholder="Message"
                                                                                        value={this.state.db_lawf6 == 'NULL' ? '' : this.state.db_lawf6}
                                                                                        onChangeText={ (db_lawf6) => this.setState({db_lawf6}) }
                                                                                    />
                                                                                </Stack> 
                                                                        
                                                                                </View>
                                                                                { show12 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date12}
                                                                              mode={mode12}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate12} />
                                                                              }
                                                                              { show12 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date12}
                                                                                            mode={mode12} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate12} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS12()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                        </View>
                                                                    </Stack>

                                                                  
                                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                              <TouchableOpacity onPress={()=>this._pickImage6()}>
                                                                  <Card style={globalStyles.shadowbox}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                          <View style={ globalStyles.underlinig }/>
                                                                              {backfilef6 == undefined ?
                                                                              <Text></Text>
                                                                              :<Text style={globalStyles.uploadFile}>{nameif6}</Text>}
                                                                  </Card>
                                                              </TouchableOpacity>
                                                              
                                                    </Stack>
                            
                                </CollapseBody>
                                  
                                </Collapse>
                                            </Card>:<View></View>}


                                            {/*Member 7 */}

                                            {this.state.f_name6 != 'NULL' || this.state.f_lname6 != 'NULL' || this.state.db6 != 'NULL' || this.state.db_lawf6 != 'NULL' || this.state.gender6 != 'NULL' || this.state.re6 != 'NULL' ?
                                            <Card>
                                                  <Collapse style={globalStyles.show} isExpanded={this.state.expanded7} onToggle={(isExpanded)=>this.setState({expanded7: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded7 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 7{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 7{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                                      <Stack >
                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                            <Input 
                                                              defaultValue={item.f_name7 == 'NULL' ? '' : item.f_name7}
                                                              onChangeText={ (f_name7) => this.setState({f_name7}) }
                                                              placeholder="e.g. Melissa"
                                                              style={ globalStyles.inputedit}
                                                              />
                                                        </Stack>

                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                            <Input 
                                                                defaultValue={item.f_lname7 == 'NULL' ? '' : item.f_lname7}
                                                                onChangeText={ (f_lname7) => this.setState({f_lname7}) }
                                                                placeholder="e.g. Smith"
                                                                style={ globalStyles.inputedit}
                                                            />
                                                        </Stack>

                                                        <Stack inlineLabel last style={globalStyles.input}>
                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                          <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker13}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db7 == 'NULL' ? '' : this.state.db7}
                                                                        onChangeText={ (db7) => this.setState({db7}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show13 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date13}
                                                                              mode={mode13}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate13} />
                                                                              }
                                                                              { show13 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date13}
                                                                                            mode={mode13} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate13} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS13()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                        </View>
                                                        </Stack>

                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                              <View style={globalStyles.editMargintop}>
                                                                  <Picker
                                                                      style={globalStyles.pickerBasicinfo} 
                                                                      selectedValue={this.state.gender7 == 'NULL' ? "Select"  : this.state.gender7}
                                                                      itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                      onValueChange={(gender7) => this.setState({gender7})}>
                                                                          <Picker.Item label="Select" value="NULL" />
                                                                          <Picker.Item label="Male" value="Male" /> 
                                                                          <Picker.Item label="Female" value="Female" />
                                                                          <Picker.Item label="Private" value="Private" />
                                                                  </Picker>
                                                              </View>
                                                        
                                                              <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                                  <View style={globalStyles.editMargintop}>
                                                                      <Picker
                                                                          style={globalStyles.pickerBasicinfo} 
                                                                          selectedValue={this.state.re7 == 'NULL' ? "Select"  : this.state.re7}
                                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                          onValueChange={(re7) => this.setState({re7})}>
                                                                              <Picker.Item label="Select" value="NULL" />
                                                                              <Picker.Item label="Dad" value="Dad" /> 
                                                                              <Picker.Item label="Mom" value="Mom" />
                                                                              <Picker.Item label="Son" value="Son" />
                                                                              <Picker.Item label="Daughter" value="Daughter" />
                                                                              <Picker.Item label="Grandparents" value="Grandparents" />
                                                                              <Picker.Item label="Others" value="Others" />
                                                                      </Picker>
                                                                  </View>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                                      <Input
                                                                          placeholder="e.g. Lawyer" 
                                                                          defaultValue={item.occupation_f7 == 'NULL' ? '' : item.occupation_f7}
                                                                          onChangeText={ (occupation_f7) => this.setState({occupation_f7}) }
                                                                          style={ globalStyles.inputedit}
                                                                      />
                                                                  </Stack>

                                                                  <Stack inlineLabel last style={globalStyles.input}>
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                      <View>
                                                                                <View>
                                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                                    <Input
                                                                                        isReadOnly={true}
                                                                                        InputRightElement={
                                                                                            <TouchableOpacity
                                                                                            style={globalStyles.DatesinputRLelements}
                                                                                            onPress={this.datepicker14}>
                                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                            </TouchableOpacity>
                                                                                        }
                                                                                        style={ globalStyles.inputedit}
                                                                                        placeholder="Message"
                                                                                        value={this.state.db_lawf7 == 'NULL' ? '' : this.state.db_lawf7}
                                                                                        onChangeText={ (db_lawf7) => this.setState({db_lawf7}) }
                                                                                    />
                                                                                </Stack> 
                                                                        
                                                                                </View>
                                                                                { show14 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date14}
                                                                              mode={mode14}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate14} />
                                                                              }
                                                                              { show14 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date14}
                                                                                            mode={mode14} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate14} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS14()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                                        </View>
                                                                    </Stack>

                                                                    
                                                                    <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                                <TouchableOpacity onPress={()=>this._pickImage7()}>
                                                                    <Card style={globalStyles.shadowbox}>
                                                                      <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                            <View style={ globalStyles.underlinig }/>
                                                                                {backfilef7 == undefined ?
                                                                                <Text></Text>
                                                                                :<Text style={globalStyles.uploadFile}>{nameif7}</Text>}
                                                                    </Card>
                                                                </TouchableOpacity>
                                                                
                                                      </Stack>
                            
                                </CollapseBody>
                                  
                                </Collapse>
                                              </Card>
                                              :<View></View>}


                                              {/*Member 8 */}

                                              {this.state.f_name7 != 'NULL' || this.state.f_lname7 != 'NULL' || this.state.db7 != 'NULL' || this.state.db_lawf7 != 'NULL' || this.state.gender7 != 'NULL' || this.state.re7 != 'NULL' ?
                                                <Card>
                                                      <Collapse style={globalStyles.show} isExpanded={this.state.expanded8} onToggle={(isExpanded)=>this.setState({expanded8: isExpanded})}>
                                <CollapseHeader>
                                    <View>
                                        { this.state.expanded8 === false ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                {'       '}Family Member 8{'       '}
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            {'       '}Family Member 8{'       '}
                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </TouchableOpacity>
                                        }
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                                          <Stack >
                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Name</Text></FormControl.Label>
                                                                <Input 
                                                                  defaultValue={item.f_name8 == 'NULL' ? '' : item.f_name8}
                                                                  onChangeText={ (f_name8) => this.setState({f_name8}) }
                                                                  placeholder="e.g. Melissa"
                                                                  style={ globalStyles.inputedit}
                                                                  />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Last Name</Text></FormControl.Label>
                                                                <Input 
                                                                    defaultValue={item.f_lname8 == 'NULL' ? '' : item.f_lname8}
                                                                    onChangeText={ (f_lname8) => this.setState({f_lname8}) }
                                                                    placeholder="e.g. Smith"
                                                                    style={ globalStyles.inputedit}
                                                                />
                                                            </Stack>

                                                            <Stack inlineLabel last style={globalStyles.input}>
                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Birth</Text></FormControl.Label>
                                                              <View>
                                                                <View>
                                                                <Stack inlineLabel last style={globalStyles.input}>
                                                                    <Input
                                                                        isReadOnly={true}
                                                                        InputRightElement={
                                                                            <TouchableOpacity
                                                                            style={globalStyles.DatesinputRLelements}
                                                                            onPress={this.datepicker15}>
                                                                            <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                            </TouchableOpacity>
                                                                        }
                                                                        style={ globalStyles.inputedit}
                                                                        placeholder="Message"
                                                                        value={this.state.db8 == 'NULL' ? '' : this.state.db8}
                                                                        onChangeText={ (db8) => this.setState({db8}) }
                                                                    />
                                                                </Stack> 
                                                        
                                                                </View>
                                                                { show15 && Platform.OS != 'ios' && <DateTimePicker 
                                                                              value={date15}
                                                                              mode={mode15}
                                                                              is24Hour={true}
                                                                              display="default"
                                                                              onChange={this.setDate15} />
                                                                              }
                                                                              { show15 && Platform.OS === 'ios' && 
                                                                                        <View>
                                                                                          <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                          <DateTimePicker
                                                                                            textColor="black"
                                                                                            value={date15}
                                                                                            mode={mode15} 
                                                                                            is24Hour={true}
                                                                                            display="spinner"
                                                                                            onChange={this.setDate15} />

                                                                                          <TouchableHighlight
                                                                                          style={globalStyles.StudentopenButtonReply}
                                                                                          onPress={() => this.closedatepickerIOS15()}>
                                                                                            <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                          </TouchableHighlight>
                                                                                        </View>
                                                                              }
                                                        </View>
                                                            </Stack>

                                                            <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Gender</Text></FormControl.Label>

                                                                  <View style={globalStyles.editMargintop}>
                                                                      <Picker
                                                                          style={globalStyles.pickerBasicinfo} 
                                                                          selectedValue={this.state.gender8 == 'NULL' ? "Select"  : this.state.gender8}
                                                                          itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                          onValueChange={(gender8) => this.setState({gender8})}>
                                                                              <Picker.Item label="Select" value="NULL" />
                                                                              <Picker.Item label="Male" value="Male" /> 
                                                                              <Picker.Item label="Female" value="Female" />
                                                                              <Picker.Item label="Private" value="Private" />
                                                                      </Picker>
                                                                  </View>
                                                            
                                                                  <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Relation</Text></FormControl.Label>

                                                                      <View style={globalStyles.editMargintop}>
                                                                          <Picker
                                                                              style={globalStyles.pickerBasicinfo} 
                                                                              selectedValue={this.state.re8 == 'NULL' ? "Select"  : this.state.re8}
                                                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                                              onValueChange={(re8) => this.setState({re8})}>
                                                                                  <Picker.Item label="Select" value="NULL" />
                                                                                  <Picker.Item label="Dad" value="Dad" /> 
                                                                                  <Picker.Item label="Mom" value="Mom" />
                                                                                  <Picker.Item label="Son" value="Son" />
                                                                                  <Picker.Item label="Daughter" value="Daughter" />
                                                                                  <Picker.Item label="Grandparents" value="Grandparents" />
                                                                                  <Picker.Item label="Others" value="Others" />
                                                                          </Picker>
                                                                      </View>

                                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Occupation</Text></FormControl.Label>
                                                                          <Input
                                                                              placeholder="e.g. Lawyer" 
                                                                              defaultValue={item.occupation_f8 == 'NULL' ? '' : item.occupation_f8}
                                                                              onChangeText={ (occupation_f8) => this.setState({occupation_f8}) }
                                                                              style={ globalStyles.inputedit}
                                                                          />
                                                                      </Stack>

                                                                      <Stack inlineLabel last style={globalStyles.input}>
                                                                      <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Date of Background Check</Text></FormControl.Label>
                                                                          <View>
                                                                                    <View>
                                                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                                                        <Input
                                                                                            isReadOnly={true}
                                                                                            InputRightElement={
                                                                                                <TouchableOpacity
                                                                                                style={globalStyles.DatesinputRLelements}
                                                                                                onPress={this.datepicker16}>
                                                                                                <Icon as={Ionicons} name="calendar" size="8" style={globalStyles.ReportFeedbackIcons} />
                                                                                                </TouchableOpacity>
                                                                                            }
                                                                                            style={ globalStyles.inputedit}
                                                                                            placeholder="Message"
                                                                                            value={this.state.db_lawf8 == 'NULL' ? '' : this.state.db_lawf8}
                                                                                            onChangeText={ (db_lawf8) => this.setState({db_lawf8}) }
                                                                                        />
                                                                                    </Stack> 
                                                                            
                                                                                    </View>
                                                                                    { show16 && Platform.OS != 'ios' && <DateTimePicker 
                                                                                      value={date16}
                                                                                      mode={mode16}
                                                                                      is24Hour={true}
                                                                                      display="default"
                                                                                      onChange={this.setDate16} />
                                                                                      }
                                                                                      { show16 && Platform.OS === 'ios' && 
                                                                                                <View>
                                                                                                  <Text style={globalStyles.titleModalR}>Pick a Date</Text>

                                                                                                  <DateTimePicker
                                                                                                    textColor="black"
                                                                                                    value={date16}
                                                                                                    mode={mode16} 
                                                                                                    is24Hour={true}
                                                                                                    display="spinner"
                                                                                                    onChange={this.setDate16} />

                                                                                                  <TouchableHighlight
                                                                                                  style={globalStyles.StudentopenButtonReply}
                                                                                                  onPress={() => this.closedatepickerIOS16()}>
                                                                                                    <Text style={globalStyles.textStyleReply}>Confirm Date</Text>
                                                                                                  </TouchableHighlight>
                                                                                                </View>
                                                                                      }
                                                                            </View>
                                                                        </Stack>

                                                                      
                                                                        <FormControl.Label><Text style={ globalStyles.infotitleLabels}>Background Check</Text></FormControl.Label>

                                                                    <TouchableOpacity onPress={()=>this._pickImage8()}>
                                                                        <Card style={globalStyles.shadowbox}>
                                                                          <Heading size='md' style={ globalStyles.infomaintitleditBackground}> Touch to upload file </Heading>
                                                                                <View style={ globalStyles.underlinig }/>
                                                                                    {backfilef8 == undefined ?
                                                                                    <Text></Text>
                                                                                    :<Text style={globalStyles.uploadFile}>{nameif8}</Text>}
                                                                        </Card>
                                                                    </TouchableOpacity>
                                                                  
                                                          </Stack>
                            
                                </CollapseBody>
                                  
                                </Collapse>
                                                  </Card>
                                                  :<View></View>}
                              </FormControl>

                              {this.state.f_name1 == 'NULL' && this.state.f_lname1 == 'NULL' && this.state.db1 == 'NULL' && this.state.db_lawf1 == 'NULL' && this.state.gender1 == 'NULL' && this.state.re1 == 'NULL' && this.state.addmember != 'Yes' ?
                                      <Button
                                            success
                                            bordered
                                            onPress={this.addmemberButtom}
                                            style={globalStyles.botonedit}
                                            >

                                                <Text style={globalStyles.botonTexto}> + Add a Member</Text>
                                            </Button>
                                            :
                                            this.state.connection_status ?
                                              <View>
                
                                                  <Button
                                                  success
                                                  bordered
                                                  onPress={this.registerbasici}
                                                  style={globalStyles.botonedit}
                                                  >

                                                      <Text style={globalStyles.botonTexto}> Submit </Text>
                                                  </Button>
                                                
                                              </View> 
                                                :
                                                <View >
                                                  <Button
                                                    success
                                                    bordered
                                                    onPress={() => this.noInternetConnection()}
                                                    style={globalStyles.botonedit}
                                                    >

                                                      <Text style={globalStyles.botonTexto}> Submit </Text>
                                                  </Button>
                                              </View> 
                                            }

                                    </View>
                        
                        </ScrollView>
                        </KeyboardAwareScrollView>
                    </View>
                )}> 
            </FlatList>
          </View>)}
        </View>)}
  </NativeBaseProvider>
  );
}
}

