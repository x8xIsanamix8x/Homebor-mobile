import React, {Component, useState} from 'react';
import { View, Image, Platform} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Icon, TextArea, Slide, Alert as AlertNativeBase, VStack, HStack } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import { FontAwesome } from '@expo/vector-icons';

import {Picker} from '@react-native-picker/picker';

import { FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { StatusBar } from 'expo-status-bar';

import NetInfo from "@react-native-community/netinfo";

export default class Additionalregister extends Component {
  NetInfoSubscription = null;

  constructor(props){
		super(props);
			this.state = {
                //Variables
                email : '',
                perm : false,
                info : [],

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

        //Get user profile (In this file all must be NULL and with that we can put the fields empty in frontend)
        let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
        this.setState({ info : profile})

        //Permissions function call
        let profile2 = await api.getAdditionalstate(this.state.email,this.state.perm)
	    	this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, smoke2 : profile2.data[0].smoke, pet : profile2.data[0].pet, pet_num : profile2.data[0].pet_num, type_pet : profile2.data[0].type_pet, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, dog : profile2.data[0].dog, cat : profile2.data[0].cat, other : profile2.data[0].other, vegetarians : profile2.data[0].vegetarians, halal : profile2.data[0].halal, kosher : profile2.data[0].kosher, lactose : profile2.data[0].lactose, gluten : profile2.data[0].gluten, pork : profile2.data[0].pork, none : profile2.data[0].none, m_service: profile2.data[0].m_service, y_service : profile2.data[0].y_service, allergies2 : profile2.data[0].allergies, medic_f2 : profile2.data[0].medic_f, health_f2 : profile2.data[0].health_f, religion2 : profile2.data[0].religion, condition_m2 : profile2.data[0].condition_m, misdemeanor2 : profile2.data[0].misdemeanor, c_background : profile2.data[0].c_background, allergies : profile2.data[0].allergies, medic_f : profile2.data[0].medic_f, health_f : profile2.data[0].health_f, religion : profile2.data[0].religion, condition_m : profile2.data[0].condition_m, misdemeanor : profile2.data[0].misdemeanor})

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
        api.additionalinfoRegister(this.state.id,this.state.email,this.state.des,this.state.a_pre, this.state.backg, this.state.religion2, this.state.religion, this.state.misdemeanor2, this.state.misdemeanor, this.state.c_background,this.state.smoke2,this.state.allergies2, this.state.allergies, this.state.medic_f2, this.state.medic_f,this.state.condition_m2, this.state.condition_m, this.state.health_f2, this.state.health_f, this.state.idm)
        this.props.navigation.navigate('EndRegister')
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

  return (
    <View>
    <StatusBar style="light" translucent={true} />
    <FlatList
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
                <ScrollView nestedScrollEnabled={true}>
                    <View style={ globalStyles.contenido } >
                        
                        <View style={globalStyles.marginTopRequiredFields}>
                            <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                        </View>

                        <FormControl>

                          {/*Additional Information*/}

                          <Card>
                            <View style={globalStyles.editView}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Additional Information</Heading>

                                <Image source={require("../assets/img/editIcons/additional-info-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconAdd}/>
                            </View>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Let the students know about your homestay</FormControl.Label>
                                  <TextArea
                                      multiline={true}
                                      numberOfLines={8}
                                      defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                      onChangeText={ (des) => this.setState({des}) }
                                      h={40}
                                      maxLength={300}
                                      placeholder="Your students will see this information after being accepted. e.g. I speak english and i have a few hobbies cook, movie watcher and love spend time with international students."
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
                                            itemStyle={{fontSize: (Platform.isPad === true) ? 22 : 18}}
                                            onValueChange={(a_pre) => this.setState({a_pre})}>
                                                <Picker.Item label="Select" value="NULL" />
                                                {!item.academy ? null : item.academy.map(academy =>
                                                <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                )}
                                </Picker>

                                <Stack inlineLabel last style={globalStyles.input}>
                                    <FormControl.Label style={ globalStyles.infotitle}>Background</FormControl.Label>
                                    <Input
                                        defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                        onChangeText={ (backg) => this.setState({backg}) }
                                        placeholder="e.g. Canadian"
                                        style={ globalStyles.inputedit}
                                    />
                                </Stack>


                                <FormControl.Label style={ globalStyles.infotitle}>Religion to which you belong?</FormControl.Label>

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

                                        <FormControl.Label style={ globalStyles.infotitle}>Have they committed misdemeanor?</FormControl.Label>

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
                                                    style={globalStyles.pickerBasicinfo}
                                                    selectedValue={this.state.c_background}
                                                    itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                                    onValueChange={(c_background) => this.setState({c_background})}>
                                                        <Picker.Item label="Select" value="NULL" />
                                                        <Picker.Item label="Yes" value="Yes" />
                                                        <Picker.Item label="No" value="No" />
                                                </Picker>
                                            </View>
                            </Stack>

                          </Card>

                          {/*Any Member of your Family:*/}
                          <Card>
                            <View style={globalStyles.editView}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Health Information:</Heading>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Smoker Politics</FormControl.Label>

                                        <View style={globalStyles.editMargintop}>
                                          <Picker
                                              style={globalStyles.pickerSmokerEdit}
                                              selectedValue={this.state.smoke2}
                                              itemStyle={{height: (Platform.isPad === true) ? 150 : 100, fontSize: (Platform.isPad === true) ? 22 : 18}}
                                              onValueChange={(smoke2) => this.setState({smoke2})}>
                                                  <Picker.Item label="Select" value="NULL" />
                                                  <Picker.Item label="Outside-Ok" value="Outside-OK" />
                                                  <Picker.Item label="Inside-Ok" value="Inside-OK" />
                                                  <Picker.Item label="Strictly Non-Smoking" value="Strictly Non-Smoking"/>
                                          </Picker>
                                        </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Have Allergies?</FormControl.Label>

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

                                <FormControl.Label style={ globalStyles.infotitle}>Any Physical or Mental Condition?</FormControl.Label>

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


                                    <FormControl.Label style={ globalStyles.infotitle}>Have health problems?</FormControl.Label>

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


                        </FormControl>

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
                                    onPress={this.noInternetConnection}
                                    style={globalStyles.botoneditRequiredFields}
                                    >

                                    <Text
                                                style={globalStyles.botonTexto}
                                                
                                    > Next <Icon as={FontAwesome} name='arrow-right' style={globalStyles.botonTextoDisable}></Icon></Text>
                                </Button>

                                </View>

                            }
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
