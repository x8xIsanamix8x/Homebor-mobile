import React, {Component, useState, useEffect} from 'react'; 
import { View, Text, ScrollView, Image, TextInput, Platform, CheckBox } from 'react-native'
import { Container, Button, H1, H3, Input, Form, Item, Toast, TouchableWithoutFeedback, Keyboard } from 'native-base'

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import globalStyles from '../styles/global';
import Card from '../shared/card';

import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import api from '../api/api';


class Basic extends Component {

    constructor(props){ 
		super(props); 
			this.state = { 
                email : '',
                perm : false,
                info : [],

                hname : '',
                num : '',
                dir : '',
                city : '',
                state : '',
                p_code : '',
                nameh : '',
                lnameh: '',
                db: '',
                gender : '',
                dblaw: '',
				
			} 
	} 

    async componentDidMount(){
    
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        let profile = await api.getBasicdata(this.state.email,this.state.perm)
		this.setState({ info : profile.data, hname : profile.data[0].h_name, num : profile.data[0].num, dir : profile.data[0].dir, cities : profile.data[0].city, states : profile.data[0].state, p_code : profile.data[0].p_code, id : profile.data[0].id_home, idm : profile.data[0].id_m, nameh : profile.data[0].name_h, lnameh : profile.data[0].l_name_h, db: profile.data[0].db, gender: profile.data[0].gender, dblaw: profile.data[0].db_law})
		console.log(this.state.info)

    }

    registerbasici = async () => {
        console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
        api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
        //this.props.navigation.navigate('Logout')
    }

	render(){
    
        return ( 
		
            <FlatList
                data={this.state.info}
                extraData={this.state.info}
                keyExtractor={item => `${item.info}`}
                ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                nestedScrollEnabled={true}
                bounces={false}
                renderItem={({item}) => (

                <Container style={ globalStyles.contenedor} >
				
                    <ScrollView 
                    nestedScrollEnabled={true} 
                    alwaysBounceHorizontal={false}
                    alwaysBounceVertical={false}
                    bounces={false}>

                    <View style={ globalStyles.contenido } >
                            <H1 style={ globalStyles.infomaintitle}>Basic Information</H1>
                        <View style={ globalStyles.hr} />
                        <Form>
                            
                            <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/disponibilidad-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>House Information</H3>
                                </View>
                                        <Text style={ globalStyles.infotitle}>House Name</Text>

                                        <Item inlineLabel last style={globalStyles.input} >
                                            <Input 
                                                defaultValue={item.h_name}
                                                onChangeText={ (hname) => this.setState({hname}) }
                                            />
                                        </Item>
                                        

                                        <Text style={ globalStyles.infotitle}>Phone Number</Text>

                                        <Item inlineLabel last style={globalStyles.input} >
                                            <Input 
                                                defaultValue={item.num}
                                                onChangeText={ (num) => this.setState({num}) }
                                            />
                                        </Item>
                            </Card>

                            <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/location-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>Location</H3>
                                </View>
                                    <Text style={ globalStyles.infotitle}>Direction</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.dir}
                                            onChangeText={ (dir) => this.setState({dir}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>City</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.city}
                                            onChangeText={ (cities) => this.setState({cities}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>State / Province </Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.state}
                                            onChangeText={ (states) => this.setState({states}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Postal Code</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.p_code}
                                            onChangeText={ (p_code) => this.setState({p_code}) }
                                        />
                                    </Item>
                            </Card>

                            <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/profile2-64.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>Proprietor Information</H3>
                                </View>
                                    <Text style={ globalStyles.infotitle}>Name</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.name_h}
                                            onChangeText={ (nameh) => this.setState({nameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Last Name</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.l_name_h}
                                            onChangeText={ (lnameh) => this.setState({lnameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.db}
                                            onChangeText={ (db) => this.setState({db}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Gender</Text>

                        
                                    <View style={{marginTop: '-10%'}}>
                                        <Picker
                                            style={{ height: 100, width: '50%', marginLeft: '25%', marginTop: (Platform.OS === 'ios') ? '-20%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                            selectedValue={this.state.gender}
                                            onValueChange={(gender) => this.setState({gender})}>
                                                <Picker.Item label="Male" value="Male" /> 
                                                <Picker.Item label="Female" value="Female" />
                                                <Picker.Item label="Private" value="Private" />
                                        </Picker>
                                    </View>
           

                                    <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.db_law}
                                            onChangeText={ (dblaw) => this.setState({dblaw}) }
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
                        > Update </Text>
                        </Button>

                    </View>

                </ScrollView>

                </Container>


            
        )}

        > </FlatList>
  
	);
}
}

class Gallery extends Component {

    constructor(props){ 
		super(props); 
			this.state = { 
                email : '',
                perm : false,
                info : [],

                image: 'null',
                lroomphoto: 'null',

                hname : '',
                num : '',
                room : '',
                //address : '',
                //city : '',
                //state : '',
                //postalcode : '',
				
			} 
	} 
    


    async componentDidMount(){
    
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data })
		console.log(this.state.info)

        this.getPermissionAsync();

    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            //aspect: [4,3],
            base64: true
        });

        console.log(result);

        if(!result.cancelled) {
            this.setState({
                 image: result.uri,
                 lroomphoto: result.uri,
             });


        }
    }

    registerbasici2 = () => api.registerbasicinformation(this.state.hname,this.state.num, this.state.email)

	render(){
    
        let { image } = this.state;
        let { lroomphoto } = this.state;

        return ( 
		
            <View style={globalStyles.contentcontainer}>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    {image &&
                    <Image source={{uri: image}}
                    style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    <Text> PHOTO 1 </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    {lroomphoto &&
                    <Image source={{uri: lroomphoto}}
                    style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    <Text> PHOTO 2 </Text>
                </TouchableOpacity>
                
                
                


            </View>
  
	);
}
}

class Additional extends Component {

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
		this.setState({ info2 : profile2, des : profile2.data[0].des, num_mem: profile2.data[0].num_mem, backg : profile2.data[0].backg, backl : profile2.data[0].backl, g_pre : profile2.data[0].g_pre, ag_pre : profile2.data[0].ag_pre, status : profile2.data[0].status, cell : profile2.data[0].cell, smoke : profile2.data[0].smoke, pet : profile2.data[0].pet, pet_num : profile2.data[0].pet_num, type_pet : profile2.data[0].type_pet, idm :profile2.data[0].id_m, id : profile2.data[0].id_home, a_pre : profile2.data[0].a_pre})
		console.log(this.state.des)

    }


    registerbasici = async () => {
        console.log(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.email, this.state.a_pre)
        //api.registerbasicinfo(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.email)
        //this.props.navigation.navigate('Logout')
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
                                    defaultValue={item.data.des}
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
                                    defaultValue={item.data.num_mem}
                                    onChangeText={ (num_mem) => this.setState({num_mem}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Background</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.backg}
                                    onChangeText={ (backg) => this.setState({backg}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Background Language</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.backl}
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
                                    defaultValue={item.data.cell}
                                    onChangeText={ (cell) => this.setState({cell}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Smoker Politics</Text>

                            <View style={{marginTop: '-10%'}}>
                                <Picker
                                    style={{ height: 100, width: '80%', marginLeft: '15%', marginTop: (Platform.OS === 'ios') ? '-3%' : 0, marginBottom: (Platform.OS === 'ios') ? 100 : 0}} 
                                    selectedValue={this.state.smoke}
                                    onValueChange={(smoke) => this.setState({smoke})}>
                                        <Picker.Item label="Outside-Ok" value="Outside-Ok" /> 
                                        <Picker.Item label="Inside-Ok" value="Inside-Ok" />
                                        <Picker.Item label="Strincly Non-Smooking" value="Strincly Non-Smooking" />
                                </Picker>
                            </View>

                            <Text style={ globalStyles.infotitle}>Special Diet</Text>
                            <Text>CheckBoxes here</Text>

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
                                    defaultValue={item.data.pet_num}
                                    onChangeText={ (pet_num) => this.setState({pet_num}) }
                                />
                            </Item>

                            <Text style={ globalStyles.infotitle}>Type of Pets</Text>
                            <Text>CheckBoxes here</Text>

                            <Text style={ globalStyles.infotitle}>Type of Pets</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.data.type_pet}
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
                        > Update </Text>
                        </Button>

                    </View>

                </ScrollView>

                </Container>

        )}

        > </FlatList>
  
	);
}
}

class Family extends Component {

    constructor(props){ 
		super(props); 
			this.state = { 
                email : '',
                perm : false,
                info : [],

                hname : '',
                num : '',
                room : '',
                //address : '',
                //city : '',
                //state : '',
                //postalcode : '',
				
			} 
	} 

    async componentDidMount(){
    
        let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		console.log(userLogin)
        
        let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data })
		console.log(this.state.info)

    }


    registerbasici = () => api.registerbasicinformation(this.state.hname,this.state.num, this.state.email)

	render(){
    
        return ( 
		
            <FlatList
		data={this.state.info}
		keyExtractor={item => `${item.info}`}
		renderItem={({item}) => (

            <Container style={ globalStyles.contenedor }>

                <ScrollView nestedScrollEnabled={true}>

                    <View style={ globalStyles.contenido } >
                    
                        <H1 style={ globalStyles.titulobasic }>Family Information</H1>

                        <Form>
                            
                            <Text style={ globalStyles.infotitle}>House Name</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.h_name}
                                    onChangeText={ (hname) => this.setState({hname}) }
                                />
                            </Item>
                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.mail_h}
                                    onChangeText={ (email) => this.setState({email}) }
                                />
                            </Item>
                            

                            <Text style={ globalStyles.infotitle}>Phone Number</Text>

                            <Item inlineLabel last style={globalStyles.input} >
                                <Input 
                                    defaultValue={item.num}
                                    onChangeText={ (num) => this.setState({num}) }
                                />
                            </Item>

                            {/* <View style={globalStyles.cardrooms}>

                                <Text style={ globalStyles.infotitle}>Rooms</Text>

                            <Picker
                                selectedValue={this.state.room}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({ room: itemValue })
                                }

                            itemStyle={{ fontSize:17,}}>

                                <Picker.Item label="Select the amount of room" value=""/>
                                <Picker.Item label="1" value="1"/>
                                <Picker.Item label="2" value="2"/>
                                <Picker.Item label="3" value="3"/>
                                <Picker.Item label="4" value="4"/>
                                <Picker.Item label="5" value="5"/>
                                <Picker.Item label="6" value="6"/>
                                <Picker.Item label="7" value="7"/>
                                <Picker.Item label="8" value="8"/>

                            </Picker>
                            </View> */}

                            
                        </Form>

                        <Button
                        success
                        bordered
                        onPress={this.registerbasici}
                        style={globalStyles.boton}
                    >

                        <Text
                                style={globalStyles.botonTexto}
                        > Continue... </Text>
                        </Button>

                    </View>

                </ScrollView>

                </Container>

        )}

        > </FlatList>
  
	);
}
}



const EditProperty = createBottomTabNavigator({
    Basic: {
        screen: Basic,
        navigationOptions: {
            tabBarLabel: 'Basic Information',
            tabBarIcon: ({tinColor}) => <Image source={require("../assets/disponibilidad-16.png")}
            resizeMode="contain"
            style={globalStyles.tabicon}
            color={tinColor}/>
        }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: {
            tabBarLabel: 'Gallery',
            tabBarIcon: ({tinColor}) => <Image source={require("../assets/gallery-16.png")}
            resizeMode="contain"
            style={globalStyles.tabicon}
            color={tinColor}/>
        }
    },
    Additional: {
        screen: Additional,
        navigationOptions: {
            tabBarLabel: 'Additional Info',
            tabBarIcon: ({tinColor}) => <Image source={require("../assets/additional-16.png")}
            resizeMode="contain"
            style={globalStyles.tabicon}
            color={tinColor}/>
        }
    },
    
    Family: {
        screen: Family,
        navigationOptions: {
            tabBarLabel: 'Family Info',
            tabBarIcon: ({tinColor}) => <Image source={require("../assets/family-16.png")}
            resizeMode="contain"
            style={globalStyles.tabicon}
            color={tinColor}/>
        }
    },
},{
    defaultNavigationOptions : {
        tabBarOptions: {
            style: {
                backgroundColor: '#232159',
            },
            activeTintColor: 'white',
            activeBarColor: 'white',
        }
    }
})

export default createAppContainer(EditProperty);

