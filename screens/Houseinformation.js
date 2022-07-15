import React, {Component, useState, useEffect} from 'react';
import { View, Image, Platform, Alert, TouchableOpacity, TouchableHighlight } from 'react-native'
import { NativeBaseProvider, Text, Input, Stack, FormControl, Heading, Icon, Button, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Spinner} from 'native-base';
import {Picker} from '@react-native-picker/picker';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';
import { StatusBar } from 'expo-status-bar';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Checkbox from 'expo-checkbox';

import DateTimePicker from '@react-native-community/datetimepicker';

import NetInfo from "@react-native-community/netinfo";

export default class Houseinformation extends Component {
  NetInfoSubscription = null;
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],
                requiredFields : false,

                //Calendars DATE PICKERS
                date: new Date(),
                mode: 'date',
                show: false,

                //Internet Connection
                connection_status: false,
                clockrun : false,
			} 
	} 
    async componentDidMount(){

        this.NetInfoSubscription = NetInfo.addEventListener(
          this._handleConnectivityChange,
        )
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
        console.log(userLogin)
        
        //Get user profile (In this file all must be NULL and with that we can put the fields empty in frontend)
        let profile = await api.getBasicdata(this.state.email,this.state.perm)
        this.setState({ info : profile.data, id : profile.data[0].id_home, idm : profile.data[0].id_m, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, h_type : profile.data[0].h_type, y_service : profile.data[0].y_service, num_mem : profile.data[0].num_mem, backl : profile.data[0].backl, vegetarians : profile.data[0].vegetarians, halal : profile.data[0].halal, kosher : profile.data[0].kosher, lactose : profile.data[0].lactose, gluten : profile.data[0].gluten, pork : profile.data[0].pork, none : profile.data[0].none, m_service: profile.data[0].m_service})
        console.log(this.state.info)

        //Checkboxes conditions
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

    }

    //Register to database function
    registerbasici = async () => {
      if(this.state.dir == 'NULL' || this.state.cities == 'NULL' || this.state.states == 'NULL' || this.state.p_code == 'NULL'){
        this.setState({requiredFields : true})
        this.state.verifyFlatlistRef.scrollToIndex({ animated: true, index: 0})
        Alert.alert("There are some required fields empty!, please check your information");  
      }else {
        //console.log(this.state.id,this.state.email,this.state.dir,this.state.cities,this.state.states,this.state.p_code,this.state.h_type,this.state.y_service,this.state.m_service,this.state.num_mem,this.state.backl,this.state.itemVegetarian,this.state.itemHalal,this.state.itemKosher,this.state.itemLactose,this.state.itemGluten,this.state.itemPork,this.state.itemNone,this.state.idm)
        api.houseInformation(this.state.id,this.state.email,this.state.dir,this.state.cities,this.state.states,this.state.p_code,this.state.h_type,this.state.y_service,this.state.m_service,this.state.num_mem,this.state.backl,this.state.itemVegetarian,this.state.itemHalal,this.state.itemKosher,this.state.itemLactose,this.state.itemGluten,this.state.itemPork,this.state.itemNone,this.state.idm)
        this.props.navigation.navigate('YourRoom')
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
  
    componentWillUnmount(){
      this.NetInfoSubscription && this.NetInfoSubscription()
      clearTimeout(this.timerHandle)
      this.timerHandle = 0;
    }

  render() {

    let { show, date, mode } = this.state;

  return (
    <View>
      <StatusBar style="light" translucent={true} />
        <FlatList
            ref={ref => (this.state.verifyFlatlistRef = ref)}
            data={this.state.info}
            extraData={this.state.info}
            keyExtractor={item => `${item.info}`}
            ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
            nestedScrollEnabled={true}
            bounces={false}
            renderItem={({item}) => (
                <NativeBaseProvider>

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
                  <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
                    <ScrollView 
                      nestedScrollEnabled={true} 
                      alwaysBounceHorizontal={false}
                      alwaysBounceVertical={false}
                      bounces={false}>
                        <View style={ globalStyles.contenido } >

                          <View style={globalStyles.marginTopRequiredFields}>
                              <Heading size='xl'style={ globalStyles.titulo }>House Information</Heading>
                          </View>

                            <FormControl>
                              {/*House Information*/}
                              <Card>
                                <View style={globalStyles.editView}>
                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Location</Heading>
                                    
                                    <Image source={require("../assets/location-16.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconLoc}/>
                                </View>

                                <Stack >
                                  <Stack inlineLabel last style={globalStyles.input}>
                                    <FormControl isInvalid={this.state.requiredFields == true && this.state.dir == 'NULL' && true}>
                                      <FormControl.Label style={ globalStyles.infotitle}>Address *</FormControl.Label>
                                        <Input 
                                            defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                            onChangeText={ (dir) => this.setState({dir}) }
                                            placeholderTextColor={this.state.requiredFields == true && "#D81606"}
                                            placeholder="e.g. Av, Street, etc."
                                            style={ globalStyles.inputedit}
                                        />
                                        <FormControl.ErrorMessage>
                                                  This field is required and is empty.
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                  </Stack>


                                  <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl isInvalid={this.state.requiredFields == true && this.state.cities == 'NULL' && true}>
                                        <FormControl.Label style={ globalStyles.infotitle}>City *</FormControl.Label>
                                          <Input 
                                                defaultValue={item.city == 'NULL' ? '' : item.city}
                                                onChangeText={ (cities) => this.setState({cities}) }
                                                placeholderTextColor={this.state.requiredFields == true && "#D81606"}
                                                placeholder="e.g. Davenport"
                                                style={ globalStyles.inputedit}
                                            />
                                             <FormControl.ErrorMessage>
                                                  This field is required and is empty.
                                              </FormControl.ErrorMessage>
                                      </FormControl>
                                  </Stack>

                                  <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl isInvalid={this.state.requiredFields == true && this.state.states == 'NULL' && true}>
                                        <FormControl.Label style={ globalStyles.infotitle}>State / Province *</FormControl.Label>
                                          <Input 
                                              defaultValue={item.state == 'NULL' ? '' : item.state}
                                              onChangeText={ (states) => this.setState({states}) }
                                              placeholderTextColor={this.state.requiredFields == true && "#D81606"}
                                              placeholder="e.g. Ontario"
                                              style={ globalStyles.inputedit}
                                          />
                                          <FormControl.ErrorMessage>
                                                This field is required and is empty.
                                            </FormControl.ErrorMessage>
                                      </FormControl>
                                  </Stack>

                                  <Stack inlineLabel last style={globalStyles.input}>
                                      <FormControl isInvalid={this.state.requiredFields == true && this.state.p_code == 'NULL' && true}>
                                        <FormControl.Label style={ globalStyles.infotitle}>Postal Code *</FormControl.Label>
                                          <Input 
                                              defaultValue={item.p_code == 'NULL' ? '' : item.p_code}
                                              onChangeText={ (p_code) => this.setState({p_code}) }
                                              placeholder="No Special Characters"
                                              placeholderTextColor={this.state.requiredFields == true && "#D81606"}
                                              style={ globalStyles.inputedit}
                                          />
                                          <FormControl.ErrorMessage>
                                                This field is required and is empty.
                                            </FormControl.ErrorMessage>
                                      </FormControl>
                                  </Stack>
                                </Stack>

                                <FormControl.Label style={ globalStyles.infotitle}>Type of Residence</FormControl.Label>

                                            
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

                              <Card>
                                <View style={globalStyles.editView}>
                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Information for your Students</Heading>
                                </View>

                                <Stack inlineLabel last style={globalStyles.input}>
                                    <FormControl.Label style={ globalStyles.infotitle}>Since when have you been Homestay?</FormControl.Label>
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

                                          <Stack inlineLabel last style={globalStyles.input}>
                                              <FormControl.Label style={ globalStyles.infotitle}>Number Members incluring you</FormControl.Label>
                                                <Input 
                                                    defaultValue={item.num_mem == 'NULL' ? '' : item.num_mem}
                                                    onChangeText={ (num_mem) => this.setState({num_mem}) }
                                                    keyboardType = 'numeric'
                                                    placeholder="Only Numbers"
                                                    style={ globalStyles.inputedit}
                                                />
                                          </Stack>

                                          <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Background Language</FormControl.Label>
                                              <Input 
                                                  defaultValue={item.backl == 'NULL' ? '' : item.backl}
                                                  onChangeText={ (backl) => this.setState({backl}) }
                                                  placeholder="e.g English"
                                                  style={ globalStyles.inputedit}
                                              />
                                          </Stack>
                                </Stack>
                                

                              </Card>

                              {this.state.connection_status ? <View>
            
                                  <Button
                                    success
                                    bordered
                                    onPress={this.registerbasici}
                                    style={globalStyles.botoneditRequiredFields}
                                    >

                                          <Text
                                                  style={globalStyles.botonTexto}
                                                  
                                          > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
                                  </Button>

                                  </View> : <View>

                                    <Button
                                      success
                                      bordered
                                      onPress={() => this.noInternetConnection()}
                                      style={globalStyles.botoneditRequiredFields}
                                      >

                                            <Text
                                                    style={globalStyles.botonTexto}
                                                    
                                            > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
                                    </Button>

                                  </View>

                              }  
                            </FormControl>
                        </View>
                        
                    </ScrollView>
                    </KeyboardAwareScrollView>
                
                </NativeBaseProvider>
            )}> 
        </FlatList>
    </View>
  );
}
}