import React, {Component, useState, useEffect} from 'react';
import { View, Image, Platform, TouchableOpacity, TouchableHighlight} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Icon  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';

import {Picker} from '@react-native-picker/picker';

import { FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

import DateTimePicker from '@react-native-community/datetimepicker';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';

export default class Additionalregister extends Component {
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],

                //Calendars DATE PICKERS
                date: new Date(),
                mode: 'date',
                show: false,
			} 
	} 

    async componentDidMount(){
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
        console.log(userLogin)
        
        //Get user profile (In this file all must be NULL and with that we can put the fields empty in frontend)
        let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
        this.setState({ info : profile})
        console.log(this.state.info)

        //Permissions function call
        let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
	    	this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, status : profile2.data[0].status, smoke2 : profile2.data[0].smoke, pet : profile2.data[0].pet, pet_num : profile2.data[0].pet_num, type_pet : profile2.data[0].type_pet, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, dog : profile2.data[0].dog, cat : profile2.data[0].cat, other : profile2.data[0].other, vegetarians : profile2.data[0].vegetarians, halal : profile2.data[0].halal, kosher : profile2.data[0].kosher, lactose : profile2.data[0].lactose, gluten : profile2.data[0].gluten, pork : profile2.data[0].pork, none : profile2.data[0].none, m_service: profile2.data[0].m_service, y_service : profile2.data[0].y_service, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor})
		
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

    }

    //Function to register data to database
    registerbasici = async () => {
        console.log(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.g_pre,this.state.ag_pre,this.state.status,this.state.smoke2,this.state.m_service,this.state.y_service,this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone,this.state.pet,this.state.pet_num,this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.type_pet,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f, this.state.health_f2, this.state.health_f, this.state.num_mem, this.state.backg, this.state.backl, this.state.religion2, this.state.religion, this.state.condition_m2, this.state.condition_m, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background)
        api.additionalinforegister(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.g_pre,this.state.ag_pre,this.state.status,this.state.smoke2,this.state.m_service,this.state.y_service,this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone,this.state.pet,this.state.pet_num,this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.type_pet,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f, this.state.health_f2, this.state.health_f, this.state.num_mem, this.state.backg, this.state.backl, this.state.religion2, this.state.religion, this.state.condition_m2, this.state.condition_m, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background)
        this.props.navigation.navigate('Roomregister')
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

  render() {

    let { show, date, mode } = this.state;

  return (
    <View>
    <StatusBar style="light" />
    <FlatList
        data={this.state.info}
        extraData={this.state.info}
        keyExtractor={item => `${item.info}`}
        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
        nestedScrollEnabled={true}
        bounces={false}
        renderItem={({item}) => (
            <NativeBaseProvider>
                <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={ globalStyles.contenido } >
                        <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                        
                        <FormControl>

                          {/*Additional Information*/}

                          <Card>
                            <View style={globalStyles.editView}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Additional Information</Heading>
                                
                                <Image source={require("../assets/additional-info-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconAdd}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Description</FormControl.Label>
                                  <Input 
                                      multiline={true}
                                      numberOfLines={4} 
                                      defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                      onChangeText={ (des) => this.setState({des}) }
                                      placeholder="Describe your house using a few words, no special characters."
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

                              <FormControl.Label style={ globalStyles.infotitle}>Academy Preference</FormControl.Label>

                                <Picker
                                            style={globalStyles.pickereditAcademyPre} 
                                            selectedValue={this.state.a_pre}
                                            itemStyle={{fontSize: 14}}
                                            onValueChange={(a_pre) => this.setState({a_pre})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                {!item.academy ? null : item.academy.map(academy =>
                                                <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                )} 
                                </Picker>

                                <FormControl.Label style={ globalStyles.infotitle}>Gender Preference</FormControl.Label> 

                                  <View style={globalStyles.editMargintop}>
                                      <Picker
                                          style={globalStyles.pickereditGenderpre} 
                                          selectedValue={this.state.g_pre}
                                          itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                          onValueChange={(g_pre) => this.setState({g_pre})}>
                                              <Picker.Item label="Select" value="NULL" /> 
                                              <Picker.Item label="Male" value="Male" /> 
                                              <Picker.Item label="Female" value="Female" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                  </View>

                                  <FormControl.Label style={ globalStyles.infotitle}>Age Preference</FormControl.Label> 

                                    <View style={globalStyles.editMargintop}>
                                      <Picker
                                          style={globalStyles.pickereditAgeStatus}
                                          selectedValue={this.state.ag_pre}
                                          itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                          onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                              <Picker.Item label="Select" value="NULL" /> 
                                              <Picker.Item label="Teenager" value="Teenager" /> 
                                              <Picker.Item label="Adult" value="Adult" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                    </View>

                                    <FormControl.Label style={ globalStyles.infotitle}>House Status</FormControl.Label>

                                      <View style={globalStyles.editMargintop}>
                                          <Picker
                                              style={globalStyles.pickereditAgeStatus}
                                              selectedValue={this.state.status}
                                              itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                              onValueChange={(status) => this.setState({status})}>
                                                  <Picker.Item label="Select" value="NULL" /> 
                                                  <Picker.Item label="Avalible" value="Avalible" /> 
                                                  <Picker.Item label="Occupied" value="Occupied" />
                                          </Picker>
                                      </View> 

                                      <FormControl.Label style={ globalStyles.infotitle}>Smoker Politics</FormControl.Label>

                                        <View style={globalStyles.editMargintop}>
                                          <Picker
                                              style={globalStyles.pickerSimilarEdit} 
                                              selectedValue={this.state.smoke2}
                                              itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                              onValueChange={(smoke2) => this.setState({smoke2})}>
                                                  <Picker.Item label="Select" value="NULL" /> 
                                                  <Picker.Item label="Outside-Ok" value="Outside-Ok" /> 
                                                  <Picker.Item label="Inside-Ok" value="Inside-Ok" />
                                                  <Picker.Item label="Strincly Non-Smooking" value="Strincly Non-Smooking" />
                                          </Picker>
                                        </View> 

                                        <FormControl.Label style={ globalStyles.infotitle}>Meals Service</FormControl.Label>

                                            <View style={globalStyles.editMargintop}>
                                            <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={this.state.m_service}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(m_service) => this.setState({m_service})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                            </Picker>
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
                                                                    style={globalStyles.ReportFeedbackRLelements}
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


                            </Stack>            

                          </Card>

                          {/*Pets Information*/}
                          <Card>
                            <View style={globalStyles.editView}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Pets Information</Heading>
                                
                                <Image source={require("../assets/pets-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconPet}/>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Pets</FormControl.Label>

                            <Picker
                                style={globalStyles.editPetpicker} 
                                selectedValue={this.state.pet}
                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                onValueChange={(pet) => this.setState({pet})}>
                                    <Picker.Item label="Select" value="NULL" /> 
                                    <Picker.Item label="Yes" value="Yes" /> 
                                    <Picker.Item label="No" value="No" />
                            </Picker>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Pets</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.pet_num == '0' ? '' : item.data.pet_num}
                                      onChangeText={ (pet_num) => this.setState({pet_num}) }
                                      placeholder="e.g. 2"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>

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


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>
                                  <Input 
                                        defaultValue={item.data.type_pet == 'NULL' ? '' : item.data.type_pet}
                                        onChangeText={ (type_pet) => this.setState({type_pet}) }
                                        placeholder="'Other' Species of pets"
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                            </Stack>

                          </Card>

                          {/*Any Member of your Family:*/}
                          <Card>
                            <View style={globalStyles.editView}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Any Member of your Family:</Heading> 
                                
                                <Image source={require("../assets/profile2-64.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconAnyMemeber}/>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Have Allergies?</FormControl.Label>

                                <View style={globalStyles.editMargintop}>
                                {this.state.allergies2 === 'NULL' ?
                                    //NULL
                                    <Picker
                                    style={globalStyles.pickerSimilarEdit} 
                                    selectedValue={"NULL"}
                                    itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                    onValueChange={(allergies2) => this.setState({allergies2})}>
                                        <Picker.Item label="Select" value="NULL" /> 
                                        <Picker.Item label="Yes" value="Yes" /> 
                                        <Picker.Item label="No" value="No" />
                                    </Picker> : this.state.allergies2 === 'No' ?
                                    
                                    //NO 
                                    <Picker
                                    style={globalStyles.pickerSimilarEdit} 
                                    selectedValue={"No"}
                                    itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                    onValueChange={(allergies2) => this.setState({allergies2})}>
                                        <Picker.Item label="Select" value="NULL" /> 
                                        <Picker.Item label="Yes" value="Yes" /> 
                                        <Picker.Item label="No" value="No" />
                                    </Picker> : 

                                    //YES
                                    <View>
                                        <Picker
                                        style={globalStyles.pickerSimilarEdit} 
                                        selectedValue={"Yes"}
                                        itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                        onValueChange={(allergies2) => this.setState({allergies2})}>
                                            <Picker.Item label="Select" value="NULL" /> 
                                            <Picker.Item label="Yes" value="Yes" /> 
                                            <Picker.Item label="No" value="No" />
                                        </Picker>

                                            <Stack inlineLabel last style={globalStyles.input}>
                                            <FormControl.Label style={ globalStyles.infotitle}>Specify the Allergy</FormControl.Label>
                                            <Input 
                                                    defaultValue={item.data.allergies == 'NULL' ? '' : item.data.allergies}
                                                    onChangeText={ (allergies) => this.setState({allergies}) }
                                                    style={ globalStyles.inputedit}
                                                />
                                            </Stack>
                                    </View>
                                
                            }
                                
                                </View>

                                <FormControl.Label style={ globalStyles.infotitle}>Take any Medication?</FormControl.Label>

                                   
                                    <View style={globalStyles.editMargintop}>
                                        {this.state.medic_f2 === 'NULL' ?
                                            //NULL
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"NULL"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : this.state.medic_f2 === 'No' ?
                                            
                                            //NO 
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"No"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : 

                                            //YES
                                            <View>
                                                <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={"Yes"}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(medic_f2) => this.setState({medic_f2})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                                </Picker>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Specify the Medication</FormControl.Label>
                                                    <Input 
                                                            defaultValue={item.data.medic_f == 'NULL' ? '' : item.data.medic_f}
                                                            onChangeText={ (medic_f) => this.setState({medic_f}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                    </Stack>
                                            </View>
                                        
                                    }
                                
                                </View>

                                    <FormControl.Label style={ globalStyles.infotitle}>Have health problems?</FormControl.Label>

                                    <View style={globalStyles.editMargintop}>
                                        {this.state.health_f2 === 'NULL' ?
                                            //NULL
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"NULL"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(health_f2) => this.setState({health_f2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : this.state.health_f2 === 'No' ?
                                            
                                            //NO 
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"No"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(health_f2) => this.setState({health_f2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : 

                                            //YES
                                            <View>
                                                <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={"Yes"}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(health_f2) => this.setState({health_f2})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                                </Picker>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Specify the Problems</FormControl.Label>
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
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Family Preference:</Heading> 
                                
                                <Image source={require("../assets/profile2-64.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconFamilyPreference}/>
                            </View>

                            <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Family Members</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.num_mem == '0' ? '' : item.data.num_mem}
                                      onChangeText={ (num_mem) => this.setState({num_mem}) }
                                      placeholder="Only Numbers"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                      onChangeText={ (backg) => this.setState({backg}) }
                                      placeholder="e.g. Canadian"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background Language</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                      onChangeText={ (backl) => this.setState({backl}) }
                                      placeholder="e.g. English"
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Religion to which you belong?</FormControl.Label>

                              <View style={globalStyles.editMargintop}>
                                        {this.state.religion2 === 'NULL' ?
                                            //NULL
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"NULL"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(religion2) => this.setState({religion2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : this.state.religion2 === 'No' ?
                                            
                                            //NO 
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"No"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(religion2) => this.setState({religion2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : 

                                            //YES
                                            <View>
                                                <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={"Yes"}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(religion2) => this.setState({religion2})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                                </Picker>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Which Religion?</FormControl.Label>
                                                    <Input 
                                                            defaultValue={item.data.religion == 'NULL' ? '' : item.data.religion}
                                                            onChangeText={ (religion) => this.setState({religion}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                    </Stack>
                                            </View>
                                        
                                    }
                                
                                </View>

                                <FormControl.Label style={ globalStyles.infotitle}>Any Physical or Mental Condition?</FormControl.Label>

                                <View style={globalStyles.editMargintop}>
                                        {this.state.condition_m2 === 'NULL' ?
                                            //NULL
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"NULL"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : this.state.condition_m2 === 'No' ?
                                            
                                            //NO 
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"No"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : 

                                            //YES
                                            <View>
                                                <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={"Yes"}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(condition_m2) => this.setState({condition_m2})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                                </Picker>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Which Condition?</FormControl.Label>
                                                    <Input 
                                                            defaultValue={item.data.condition_m == 'NULL' ? '' : item.data.condition_m}
                                                            onChangeText={ (condition_m) => this.setState({condition_m}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                    </Stack>
                                            </View>
                                        
                                    }
                                
                                </View>

                                <FormControl.Label style={ globalStyles.infotitle}>Have they committed misdemeanor?</FormControl.Label>

                                <View style={globalStyles.editMargintop}>
                                        {this.state.misdemeanor2 === 'NULL' ?
                                            //NULL
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"NULL"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : this.state.misdemeanor2 === 'No' ?
                                            
                                            //NO 
                                            <Picker
                                            style={globalStyles.pickerSimilarEdit} 
                                            selectedValue={"No"}
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                <Picker.Item label="Select" value="NULL" /> 
                                                <Picker.Item label="Yes" value="Yes" /> 
                                                <Picker.Item label="No" value="No" />
                                            </Picker> : 

                                            //YES
                                            <View>
                                                <Picker
                                                style={globalStyles.pickerSimilarEdit} 
                                                selectedValue={"Yes"}
                                                itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                onValueChange={(misdemeanor2) => this.setState({misdemeanor2})}>
                                                    <Picker.Item label="Select" value="NULL" /> 
                                                    <Picker.Item label="Yes" value="Yes" /> 
                                                    <Picker.Item label="No" value="No" />
                                                </Picker>

                                                    <Stack inlineLabel last style={globalStyles.input}>
                                                    <FormControl.Label style={ globalStyles.infotitle}>Specify?</FormControl.Label>
                                                    <Input 
                                                            defaultValue={item.data.misdemeanor == 'NULL' ? '' : item.data.misdemeanor}
                                                            onChangeText={ (misdemeanor) => this.setState({misdemeanor}) }
                                                            style={ globalStyles.inputedit}
                                                        />
                                                    </Stack>
                                            </View>
                                        
                                    }
                                
                                </View>

                                <FormControl.Label style={ globalStyles.infotitle}>Do you give us consent to go to the authorities and check your criminal background check?</FormControl.Label>

                                <View style={globalStyles.editMargintop}>
                                <Picker
                                    style={globalStyles.pickerSimilarEdit} 
                                    selectedValue={this.state.c_background}
                                    itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                    onValueChange={(c_background) => this.setState({c_background})}>
                                        <Picker.Item label="Select" value="NULL" /> 
                                        <Picker.Item label="Yes" value="Yes" /> 
                                        <Picker.Item label="No" value="No" />
                                </Picker>
                                </View>

                          </Card>

                        </FormControl>

                        <Button
                            success
                            bordered
                            onPress={this.registerbasici}
                            style={globalStyles.botonedit}
                            >

                            <Text style={globalStyles.botonTexto}> Submit </Text>
                        </Button>
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