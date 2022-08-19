import React, {Component, useState} from 'react';
import { View, Image, Platform, Alert, TouchableHighlight, RefreshControl, Dimensions} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Spinner, Icon, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';

import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';

import api from '../api/api';

import NetInfo from "@react-native-community/netinfo";

export default class BasicEdit extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
      //Profile Variables 
      email : '',
      perm : false,
      info : [],
      refreshing: false,

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
      readyDisplay : false,
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
        this.setState({readyDisplay : true, loading : false})
      } else {
        this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
      }

      this._onFocusListener = this.props.navigation.addListener('focus', () => {
        this.onRefresh()
      });
  }

  //Register to database Function asyncronus
  registerbasici = async () => {
    api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.h_type,this.state.m_city,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.smoke2, this.state.y_service, this.state.m_service,this.state.itemVegetarian,this.state.itemHalal,this.state.itemKosher,this.state.itemLactose,this.state.itemGluten,this.state.itemPork,this.state.itemNone,this.state.pet, this.state.pet_num, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.type_pet, this.state.idm)
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.refresh().then(() => {
        this.setState({ refreshing: false });
    });
  }

  refresh = async() => {
    if(this.state.connection_status == true) {
      //Get user 
      let userLogin = await AsyncStorage.getItem('userLogin')
      userLogin = JSON.parse(userLogin)
      this.setState({ email : userLogin.email, perm : userLogin.perm})
      
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
        this.setState({readyDisplay : true, loading : false})
    } else {
        this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true, loading : false})
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

  render() {
    //Variables to get file from frontend
    let { show, date, mode } = this.state;

    return (
      <NativeBaseProvider>
        <StatusBar style="light" translucent={true} />
        <View>
          {this.state.readyDisplay == false && (
            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <VStack w="90%" borderWidth="1" space={6} rounded="md" alignItems="center" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                        <View style={globalStyles.skeletonMarginProfileText}>
                            <HStack space="2" alignItems="center">
                                <Skeleton px="4" my="4" rounded="md" startColor="indigo.200" />
                            </HStack>
                        </View>
                        <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                            <View style={globalStyles.skeletonMarginProfileText}>
                                <HStack space="2" alignItems="center">
                                    <Skeleton size="5" rounded="full" />
                                    <Skeleton h="3" flex="2" rounded="full" />
                                </HStack>
                            </View>
                            <Skeleton.Text px="5" my="4" />
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

                    <FlatList 
                      data={this.state.info}
                      extraData={this.state.info}
                      keyExtractor={item => `${item.info}`}
                      ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                      nestedScrollEnabled={true}
                      bounces={false}
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
                        <View style={ globalStyles.contenido }>
                          <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={10}>
                            
                          <View style={globalStyles.marginTopRequiredFields}>
                            <Heading size='xl'style={ globalStyles.titulo }>Basic Information</Heading>
                          </View>

                          <FormControl>
                            {/*House Information*/}
                            <Card>
                              {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                  <Stack alignItems="center" width="100%">
                                    <HStack alignItems="center">
                                        <VStack width="90%">
                                            <View>
                                              <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>House Information</Heading>
                                            </View>  
                                        </VStack>
                                        <Center size="12" width="10%">
                                            <Image
                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconsNativeBase}
                                            />
                                        </Center>
                                    </HStack>
                                  </Stack>
                                )}
                                {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                    <Stack alignItems="center">
                                      <HStack alignItems="center">
                                        <Center width="30%">
                                          <View>
                                            <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>House Information</Heading>
                                          </View> 
                                        </Center>
                                        <Center size="12">
                                          <Image
                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconsNativeBase}
                                          />
                                        </Center>
                                      </HStack>
                                    </Stack>
                                )}
                              
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
                              {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                <Stack alignItems="center" width="100%">
                                  <HStack alignItems="center">
                                      <VStack width="90%">
                                          <View>
                                            <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Location</Heading>
                                          </View>  
                                      </VStack>
                                      <Center size="12" width="10%">
                                          <Image
                                              source={require("../assets/img/editIcons/location-16.png")}
                                              resizeMode="contain"
                                              style={globalStyles.editiconsNativeBase}
                                          />
                                      </Center>
                                  </HStack>
                                </Stack>
                              )}
                              {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                  <Stack alignItems="center">
                                    <HStack alignItems="center">
                                      <Center width="15%">
                                        <View>
                                          <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Location</Heading>
                                        </View> 
                                      </Center>
                                      <Center size="12">
                                        <Image
                                              source={require("../assets/img/editIcons/location-16.png")}
                                              resizeMode="contain"
                                              style={globalStyles.editiconsNativeBase}
                                        />
                                      </Center>
                                    </HStack>
                                  </Stack>
                              )}

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
                            </Card>

                            {/*Preference */}
                            <Card>
                                {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                  <Stack alignItems="center" width="100%">
                                    <HStack alignItems="center">
                                        <VStack width="90%">
                                            <View>
                                              <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Your Preference</Heading>
                                            </View>  
                                        </VStack>
                                        <Center size="12" width="10%">
                                            <Image
                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconsNativeBase}
                                            />
                                        </Center>
                                    </HStack>
                                  </Stack>
                                )}
                                {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                    <Stack alignItems="center">
                                      <HStack alignItems="center">
                                        <Center width="25%">
                                          <View>
                                            <Heading size='md' style={ globalStyles.infomaintitleditNativeBase}>Your Preference</Heading>
                                          </View> 
                                        </Center>
                                        <Center size="12">
                                          <Image
                                                source={require("../assets/img/editIcons/disponibilidad-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconsNativeBase}
                                          />
                                        </Center>
                                      </HStack>
                                    </Stack>
                                )}

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
                                        <Checkbox  value={this.state.itemVegetarian} onValueChange={(itemVegetarian) => this.setState({itemVegetarian})} color={this.state.itemVegetarian ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                        <Text style={globalStyles.labelSelectEdit}>Vegetarian</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemHalal} onValueChange={(itemHalal) => this.setState({itemHalal})} color={this.state.itemHalal ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                          <Text style={globalStyles.labelSelectEdit}>Halal (Muslims)</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemKosher} onValueChange={(itemKosher) => this.setState({itemKosher})} color={this.state.itemKosher ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                          <Text style={globalStyles.labelSelectEdit}>Kosher (Jews)</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemLactose} onValueChange={(itemLactose) => this.setState({itemLactose})} color={this.state.itemLactose ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                          <Text style={globalStyles.labelSelectEdit}>Lactose Intolerant</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemGluten} onValueChange={(itemGluten) => this.setState({itemGluten})} color={this.state.itemGluten ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                          <Text style={globalStyles.labelSelectEdit}>Gluten Free Diet</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemPork} onValueChange={(itemPork) => this.setState({itemPork})} color={this.state.itemPork ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                          <Text style={globalStyles.labelSelectEdit}>No Pork</Text>
                                      </View>

                                      <View style={globalStyles.editSelectsSquare}>
                                          <Checkbox  value={this.state.itemNone} onValueChange={(itemNone) => this.setState({itemNone})} color={this.state.itemNone ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
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
                                            <Checkbox  value={this.state.itemDog} onValueChange={(itemDog) => this.setState({itemDog})} color={this.state.itemDog ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                            <Text style={globalStyles.labelSelectEdit}>Dogs</Text>
                                        </View>

                                        <View style={globalStyles.editSelectsSquare}>
                                            <Checkbox  value={this.state.itemCat} onValueChange={(itemCat) => this.setState({itemCat})} color={this.state.itemCat ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
                                            <Text style={globalStyles.labelSelectEdit}>Cats</Text>
                                        </View>

                                        <View style={globalStyles.editSelectsSquare}>
                                            <Checkbox  value={this.state.itemOther} onValueChange={(itemOther) => this.setState({itemOther})} color={this.state.itemOther ? '#B70B7B' : undefined} style={globalStyles.BorderSquare} aria-label="Close"/>
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
                            
                          <View>
                            <Button
                              success
                              bordered
                              onPress={this.state.connection_status ? this.registerbasici : this.noInternetConnection}
                              style={globalStyles.botonedit}
                              >
                              <Text style={globalStyles.botonTexto}> Update </Text>
                            </Button>

                          </View>
                          </KeyboardAwareScrollView>
                        </View>
                      )}
                    />
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