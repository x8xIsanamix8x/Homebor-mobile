import React, {Component, useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, Platform, Alert} from 'react-native'
import { Container, Button, H1, H3, Input, Form, Item, CheckBox } from 'native-base'

import {Picker} from '@react-native-picker/picker';

import { FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

class Additionalregister extends Component {

    constructor(props){ 
		super(props); 
			this.state = { 
                email : '',
                perm : false,
                info : [],

                des : '',
                num_mem : '',
                backg : '',
                backl : '',
                g_pre : '',
                //state : '',
                //postalcode : '',
				
			} 
	} 

    async componentDidMount(){
    
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        let profile = await api.getAdditionaldata(this.state.email,this.state.perm)
		this.setState({ info : profile})
		console.log(this.state.info)

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
        console.log(this.state.des) 

    }


    registerbasici = async () => {
        console.log(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.email, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
        api.additionalinforegister(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
        this.props.navigation.navigate('Roomregister')
    }

	render(){
    
        return ( 
		
            <FlatList
                data={this.state.info}
                bounces={false}
                ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                keyExtractor={item => `${item.info}`}
                renderItem={({item}) => (

                <Container style={ globalStyles.contenedor }>

                <ScrollView nestedScrollEnabled={true}>

                    <View style={ globalStyles.contenido } >
                    
                        <H1 style={ globalStyles.titulobasic }>Additional Information</H1>

                        <Form>

                        <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/additional-info-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>Additional Information</H3>
                                </View>
                            
                            <Text style={ globalStyles.infotitle}>Description</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input
                                    multiline={true}
                                    numberOfLines={4} 
                                    defaultValue={item.data.des == 'NULL' ? '' : item.data.des}
                                    onChangeText={ (des) => this.setState({des}) }
                                />
                            </Item>
                            <Item inlineLabel last style={globalStyles.hideContents} >
                                <Input 
                                    defaultValue={item.data.mail_h}
                                    onChangeText={ (email) => this.setState({email}) }
                                />
                            </Item>
                            

                            <Text style={ globalStyles.infotitle}>Number of Family Members</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.num_mem == '0' ? '' : item.data.num_mem}
                                    onChangeText={ (num_mem) => this.setState({num_mem}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Background</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.backg == 'NULL' ? '' : item.data.backg}
                                    onChangeText={ (backg) => this.setState({backg}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Background Language</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.backl == 'NULL' ? '' : item.data.backl}
                                    onChangeText={ (backl) => this.setState({backl}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Academy Preference</Text>               
                             
                                <Picker
                                            style={{ height: 100, width: '95%', marginLeft: '5%', marginTop: (Platform.OS === 'ios') ? '-5%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                            selectedValue={this.state.a_pre}
                                            itemStyle={{fontSize: 14}}
                                            onValueChange={(a_pre) => this.setState({a_pre})}>
                                                {!item.academy ? null : item.academy.map(academy =>
                                                <Picker.Item label={academy.name_a} value={academy.id_ac} key={academy.id_ac}/>
                                                )} 
                                </Picker> 

                            <Text style={ globalStyles.infotitle}>Gender Preference</Text>

                            <View style={{marginTop: '-10%'}}>
                                <Picker
                                    style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.g_pre}
                                    onValueChange={(g_pre) => this.setState({g_pre})}>
                                        <Picker.Item label="Male" value="Male" /> 
                                        <Picker.Item label="Female" value="Female" />
                                        <Picker.Item label="Any" value="Any" />
                                </Picker>
                            </View>

                            <Text style={ globalStyles.infotitle}>Age Preference</Text>

                                <Picker
                                    style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.ag_pre}
                                    onValueChange={(ag_pre) => this.setState({ag_pre})}>
                                        <Picker.Item label="Teenager" value="Teenager" /> 
                                        <Picker.Item label="Adult" value="Adult" />
                                        <Picker.Item label="Any" value="Any" />
                                </Picker>

                            <Text style={ globalStyles.infotitle}>Status</Text>

                            <View style={{marginTop: '-10%'}}>
                                <Picker
                                    style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? '-10%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.status}
                                    onValueChange={(status) => this.setState({status})}>
                                        <Picker.Item label="Avalible" value="Avalible" /> 
                                        <Picker.Item label="Occupied" value="Occupied" />
                                </Picker>
                            </View>
                           

                            

                            <Text style={ globalStyles.infotitle}>Cellphone</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.cell == 'NULL' ? '' : item.data.cell}
                                    onChangeText={ (cell) => this.setState({cell}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Smoker Politics</Text>

                            <View style={{marginTop: '-10%'}}>
                                <Picker
                                    style={{ height: 100, width: '80%', marginLeft: '10%', marginTop: (Platform.OS === 'ios') ? '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.smoke}
                                    onValueChange={(smoke) => this.setState({smoke})}>
                                        <Picker.Item label="Outside-Ok" value="Outside-Ok" /> 
                                        <Picker.Item label="Inside-Ok" value="Inside-Ok" />
                                        <Picker.Item label="Strincly Non-Smooking" value="Strincly Non-Smooking" />
                                </Picker>
                            </View>

                            <Text style={ globalStyles.infotitle}>Special Diet</Text>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemVegetarian} onPress={() => this.setState({ itemVegetarian: !this.state.itemVegetarian })}/>
                                <Text style={{marginLeft : '5%', marginTop : '1%',}}>Vegetarian</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemHalal} onPress={() => this.setState({ itemHalal: !this.state.itemHalal })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>Halal (Muslims)</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemKosher} onPress={() => this.setState({ itemKosher: !this.state.itemKosher })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>Kosher (Jews)</Text>
                            </View> 

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemLactose} onPress={() => this.setState({ itemLactose: !this.state.itemLactose })}/>
                                <Text style={{marginLeft : '5%', marginTop : '1%',}}>Lactose Intolerant</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemGluten} onPress={() => this.setState({ itemGluten: !this.state.itemGluten })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>Gluten Free Diet</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemPork} onPress={() => this.setState({ itemPork: !this.state.itemPork })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>No Pork</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemNone} onPress={() => this.setState({ itemNone: !this.state.itemNone })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>None</Text>
                            </View>

                            </Card>

                            <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/pets-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>Additional Information</H3>
                                </View>

                            <Text style={ globalStyles.infotitle}>Pets</Text>

                                <Picker
                                    style={{ height: 100, width: '70%', marginLeft: '15%', marginTop: (Platform.OS === 'ios') ? '-20%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.pet}
                                    onValueChange={(pet) => this.setState({pet})}>
                                        <Picker.Item label="Yes" value="Yes" /> 
                                        <Picker.Item label="No" value="No" />
                                </Picker>

                            <Text style={ globalStyles.infotitle}>Number of Pets</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.pet_num == '0' ? '' : item.data.pet_num}
                                    onChangeText={ (pet_num) => this.setState({pet_num}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Type of Pets</Text>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemDog} onPress={() => this.setState({ itemDog: !this.state.itemDog })}/>
                                <Text style={{marginLeft : '5%', marginTop : '1%',}}>Dogs</Text>
                            </View>

                            <View style={{flexDirection: "row", marginBottom: '10%',}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemCat} onPress={() => this.setState({ itemCat: !this.state.itemCat })} />
                                <Text style={{ marginLeft : '5%', marginTop : '1%'}}>Cats</Text>
                            </View>

                            <View style={{flexDirection: "row"}}>
                                <CheckBox style={{borderColor: "black", size: "5%"}} color="#982A72" checked={this.state.itemOther} onPress={() => this.setState({ itemOther: !this.state.itemOther })} />
                                <Text style={{marginLeft : '5%', marginTop : '1%'}}>Others</Text>
                            </View>

                    

                            <Text style={ globalStyles.infotitle}>Type of Pets</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.type_pet == 'NULL' ? '' : item.data.type_pet}
                                    onChangeText={ (type_pet) => this.setState({type_pet}) }
                                />
                            </Item>
                            </Card>
                            
                        </Form>

                        <Button
                        success
                        bordered
                        onPress={this.registerbasici}
                        style={globalStyles.botonedit}
                    >

                        <Text
                                style={globalStyles.botonTexto}
                        > Submit </Text>
                        </Button>

                    </View>

                </ScrollView>

                </Container>

        )}

        > </FlatList>
  
	);
}
}

export default Additionalregister