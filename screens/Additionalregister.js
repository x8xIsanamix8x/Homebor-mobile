import React, {Component, useState, useEffect} from 'react';
import { View, Image, Platform} from 'react-native'
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Heading, Checkbox  } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';

import {Picker} from '@react-native-picker/picker';

import { FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

export default class Additionalregister extends Component {
  
  constructor(props){ 
		super(props); 
			this.state = {
                //Variables 
                email : '',
                perm : false,
                info : [],
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
	    	this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, status : profile2.data[0].status, cell : profile2.data[0].cell, smoke : profile2.data[0].smoke, pet : profile2.data[0].pet, pet_num : profile2.data[0].pet_num, type_pet : profile2.data[0].type_pet, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre, dog : profile2.data[0].dog, cat : profile2.data[0].cat, other : profile2.data[0].other, vegetarians : profile2.data[0].vegetarians, halal : profile2.data[0].halal, kosher : profile2.data[0].kosher, lactose : profile2.data[0].lactose, gluten : profile2.data[0].gluten, pork : profile2.data[0].pork, none : profile2.data[0].none})
		
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
        console.log(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.email, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
        api.additionalinforegister(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
        this.props.navigation.navigate('Roomregister')
    }

  render() {

  return (
    <FlatList
        data={this.state.info}
        extraData={this.state.info}
        keyExtractor={item => `${item.info}`}
        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
        nestedScrollEnabled={true}
        bounces={false}
        renderItem={({item}) => (
            <NativeBaseProvider>
                <ScrollView nestedScrollEnabled={true}>
                    <View style={ globalStyles.contenido } >
                        <Heading size='xl'style={ globalStyles.titulo }>Additional Information</Heading>
                        
                        <FormControl>

                          {/*Additional Information*/}

                          <Card>
                            <View style={{flexDirection: 'row'}}>
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


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Family Members</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.num_mem == '0' ? '' : item.data.num_mem}
                                      onChangeText={ (num_mem) => this.setState({num_mem}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                      onChangeText={ (backg) => this.setState({backg}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Background Language</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                      onChangeText={ (backl) => this.setState({backl}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Academy Preference</FormControl.Label>

                                <Picker
                                            style={{ height: 100, width: '95%', marginLeft: '5%', marginTop: (Platform.OS === 'ios') ? '-5%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                            selectedValue={this.state.a_pre}
                                            itemStyle={{fontSize: 14}}
                                            onValueChange={(a_pre) => this.setState({a_pre})}>
                                                {!item.academy ? null : item.academy.map(academy =>
                                                <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                )} 
                                </Picker>

                                <FormControl.Label style={ globalStyles.infotitle}>Gender Preference</FormControl.Label> 

                                  <View style={{marginTop: '-10%'}}>
                                      <Picker
                                          style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                          selectedValue={this.state.g_pre}
                                          itemStyle={{fontSize: 18}} 
                                          onValueChange={(g_pre) => this.setState({g_pre})}>
                                              <Picker.Item label="Male" value="Male" /> 
                                              <Picker.Item label="Female" value="Female" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                  </View>

                                  <FormControl.Label style={ globalStyles.infotitle}>Age Preference</FormControl.Label> 

                                    <View style={{marginTop: '-10%'}}>
                                      <Picker
                                          style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                          selectedValue={this.state.ag_pre}
                                          itemStyle={{fontSize: 18}} 
                                          onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                              <Picker.Item label="Teenager" value="Teenager" /> 
                                              <Picker.Item label="Adult" value="Adult" />
                                              <Picker.Item label="Any" value="Any" />
                                      </Picker>
                                    </View>

                                    <FormControl.Label style={ globalStyles.infotitle}>Status</FormControl.Label>

                                      <View style={{marginTop: '-10%'}}>
                                          <Picker
                                              style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                              selectedValue={this.state.status}
                                              itemStyle={{fontSize: 18}} 
                                              onValueChange={(status) => this.setState({status})}>
                                                  <Picker.Item label="Avalible" value="Avalible" /> 
                                                  <Picker.Item label="Occupied" value="Occupied" />
                                          </Picker>
                                      </View> 

                                      <FormControl.Label style={ globalStyles.infotitle}>Smoker Politics</FormControl.Label>

                                        <View style={{marginTop: '-10%'}}>
                                          <Picker
                                              style={{ height: 100, width: '80%', marginLeft: '10%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '5%' : '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                              selectedValue={this.state.smoke}
                                              itemStyle={{fontSize: 18}} 
                                              onValueChange={(smoke) => this.setState({smoke})}>
                                                  <Picker.Item label="Outside-Ok" value="Outside-Ok" /> 
                                                  <Picker.Item label="Inside-Ok" value="Inside-Ok" />
                                                  <Picker.Item label="Strincly Non-Smooking" value="Strincly Non-Smooking" />
                                          </Picker>
                                        </View> 

                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Cellphone</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.cell == 'NULL' ? '' : item.data.cell}
                                      onChangeText={ (cell) => this.setState({cell}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Special Diet</FormControl.Label>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                  <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemVegetarian} onPress={() => this.setState({ itemVegetarian: !this.state.itemVegetarian })} aria-label="Close"/>
                                  <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Vegetarian</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemHalal} onPress={() => this.setState({ itemHalal: !this.state.itemHalal })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Halal (Muslims)</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemKosher} onPress={() => this.setState({ itemKosher: !this.state.itemKosher })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Kosher (Jews)</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemLactose} onPress={() => this.setState({ itemLactose: !this.state.itemLactose })} aria-label="Close"/>
                                    <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Lactose Intolerant</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemGluten} onPress={() => this.setState({ itemGluten: !this.state.itemGluten })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Gluten Free Diet</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemPork} onPress={() => this.setState({ itemPork: !this.state.itemPork })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>No Pork</Text>
                                </View>

                                <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                    <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemNone} onPress={() => this.setState({ itemNone: !this.state.itemNone })} aria-label="Close"/>
                                    <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>None</Text>
                                </View>


                            </Stack>            

                          </Card>

                          {/*Pets Information*/}
                          <Card>
                            <View style={{flexDirection: 'row'}}>
                                <Heading size='md' style={ globalStyles.infomaintitledit}>Pets Information</Heading>
                                
                                <Image source={require("../assets/pets-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconPet}/>
                            </View>

                            <FormControl.Label style={ globalStyles.infotitle}>Pets</FormControl.Label>

                            <Picker
                                style={{ height: 100, width: '70%', marginLeft: '15%', marginTop: (Platform.OS === 'ios') ? (Platform.isPad === true) ? '-10%' : '-20%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                selectedValue={this.state.pet}
                                itemStyle={{fontSize: 18}} 
                                onValueChange={(pet) => this.setState({pet})}>
                                    <Picker.Item label="Yes" value="Yes" /> 
                                    <Picker.Item label="No" value="No" />
                            </Picker>

                            <Stack >
                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Number of Pets</FormControl.Label>
                                  <Input 
                                      defaultValue={item.data.pet_num == '0' ? '' : item.data.pet_num}
                                      onChangeText={ (pet_num) => this.setState({pet_num}) }
                                      style={ globalStyles.inputedit}
                                  />
                              </Stack>

                              <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>

                                  <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemDog} onPress={() => this.setState({ itemDog: !this.state.itemDog })} aria-label="Close"/>
                                      <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Dogs</Text>
                                  </View>

                                  <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemCat} onPress={() => this.setState({ itemCat: !this.state.itemCat })} aria-label="Close"/>
                                      <Text style={{ marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Cats</Text>
                                  </View>

                                  <View style={{flexDirection: "row"}}>
                                      <Checkbox style={{borderColor: "black", size: "5%"}} colorScheme='hsl(321, 72%, 38%)' checked={this.state.itemOther} onPress={() => this.setState({ itemOther: !this.state.itemOther })} aria-label="Close"/>
                                      <Text style={{marginLeft : '5%', marginTop : '1%', fontSize: 14}}>Others</Text>
                                  </View>


                              <Stack inlineLabel last style={globalStyles.input}>
                                <FormControl.Label style={ globalStyles.infotitle}>Type of Pets</FormControl.Label>
                                  <Input 
                                        defaultValue={item.data.type_pet == 'NULL' ? '' : item.data.type_pet}
                                        onChangeText={ (type_pet) => this.setState({type_pet}) }
                                        style={ globalStyles.inputedit}
                                    />
                              </Stack>

                            </Stack>

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
            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}