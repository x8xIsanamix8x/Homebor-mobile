import React, {Component, useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, Alert} from 'react-native'
import { Container, Button, H1, H3, Input, Form, Item} from 'native-base'

import {Picker} from '@react-native-picker/picker';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import {Spinner} from 'native-base';

import globalStyles from '../styles/global';
import Card from '../shared/card';

import api from '../api/api';

class Basicinfo extends Component {

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

        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios){
            const {status} = await Camera.requestPermissionsAsync();
            if (status !== 'granted') {
                alert ('Sorry we need camera roll permissions to make this Work!');
                
            }
        }
    }

    _pickImage = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            
        });

        console.log(result);
        console.log(this.state.email)

        if(!result.cancelled) {
            this.setState({
                 backfile: result.uri,
                 namei : result.name,
             });


        }
    }

    registerbasici = async () => {
        if (this.state.hname == 'NULL' || this.state.num == 'NULL' || this.state.dir == 'NULL' || this.state.cities == 'NULL' || this.state.states == 'NULL' || this.state.p_code == 'NULL' || this.state.nameh == 'NULL' || this.state.lnameh == 'NULL' || this.state.db == 'NULL' || this.state.gender == 'NULL'){
            Alert.alert('All fields with * are required')
        }else{
            this.registerbasici1()
        }
    }

    registerbasici1 = async () => {
        let localUri = this.state.backfile;
        
        if (localUri == null || localUri == '') {
            console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
            this.registerbasici2()
        }
        else {
          //File
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let formData = new FormData();
          formData.append('backfile', { uri: localUri, name: filename, type: type });

          console.log('Comprobante de envio')
          console.log(formData);
          

          console.log(JSON.stringify({ email: this.state.email}));

          //Variables
          let email = this.state.email;
          let id = this.state.id;
          let hname = this.state.hname;
          let num = this.state.num;
          let dir = this.state.dir;
          let cities = this.state.cities;
          let states = this.state.states;
          let p_code = this.state.p_code;
          let idm = this.state.idm; 
          let nameh = this.state.nameh; 
          let lnameh = this.state.lnameh;
          let db = this.state.db;
          let gender = this.state.gender; 
          let dblaw = this.state.dblaw;

          return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Submitted')
                this.props.navigation.navigate('Galleryhouse')
              }
              else {
                Alert.alert('Error')
    
              }
            });
        }  
    };

    registerbasici2 = async () => {
        //Variables
        let email = this.state.email;
        let id = this.state.id;
        let hname = this.state.hname;
        let num = this.state.num;
        let dir = this.state.dir;
        let cities = this.state.cities;
        let states = this.state.states;
        let p_code = this.state.p_code;
        let idm = this.state.idm; 
        let nameh = this.state.nameh; 
        let lnameh = this.state.lnameh;
        let db = this.state.db;
        let gender = this.state.gender; 
        let dblaw = this.state.dblaw;

        return await fetch(`https://homebor.com/basicinforegister.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Submitted')
                this.props.navigation.navigate('Galleryhouse')
              }
              else {
                Alert.alert('Error')
    
              }
            });
    }

	render(){

        let { backfile } = this.state;
        let { namei } = this.state;
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
                                        <Text style={ globalStyles.infotitle}>House Name *</Text>

                                        <Item inlineLabel last style={globalStyles.input} >
                                            <Input 
                                                defaultValue={item.h_name == 'NULL' ? '' : item.h_name}
                                                onChangeText={ (hname) => this.setState({hname}) }
                                            />
                                        </Item>
                                        

                                        <Text style={ globalStyles.infotitle}>Phone Number *</Text>

                                        <Item inlineLabel last style={globalStyles.input} >
                                            <Input 
                                                defaultValue={item.num == 'NULL' ? '' : item.num}
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
                                    <Text style={ globalStyles.infotitle}>Direction *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                            onChangeText={ (dir) => this.setState({dir}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>City *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.city == 'NULL' ? '' : item.city}
                                            onChangeText={ (cities) => this.setState({cities}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>State / Province *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.state == 'NULL' ? '' : item.state}
                                            onChangeText={ (states) => this.setState({states}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Postal Code *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.p_code == 'NULL' ? '' : item.p_code}
                                            onChangeText={ (p_code) => this.setState({p_code}) }
                                        />
                                    </Item>
                            </Card>

                            <Card>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={require("../assets/profile2-64.png")}
                                            resizeMode="contain"
                                            style={globalStyles.editicon}/>
                                    <H3 style={ globalStyles.infomaintitledit}>Propietor Information</H3>
                                </View>
                                    <Text style={ globalStyles.infotitle}>Name *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                            onChangeText={ (nameh) => this.setState({nameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Last Name *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                            onChangeText={ (lnameh) => this.setState({lnameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Date of Birth *</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.db == 'NULL' ? '' : item.db}
                                            onChangeText={ (db) => this.setState({db}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Gender *</Text>

                        
                                    <View style={{marginTop: '-10%'}}>
                                        <Picker
                                            style={globalStyles.pickerBasicinfo} 
                                            selectedValue={this.state.gender == 'NULL' ? "Male"  : this.state.gender}
                                            onValueChange={(gender) => this.setState({gender})}>
                                                <Picker.Item label="Male" value="Male" /> 
                                                <Picker.Item label="Female" value="Female" />
                                                <Picker.Item label="Private" value="Private" />
                                        </Picker>
                                    </View>
           

                                    <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.db_law == 'NULL' ? '' : item.db_law}
                                            onChangeText={ (dblaw) => this.setState({dblaw}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Background Check</Text>

                                    <TouchableOpacity onPress={()=>this._pickImage()}>
                                        <Card style={globalStyles.shadowbox}>
                                            <H3> Touch to upload file </H3>
                                                <View style={ globalStyles.underlinig }/>
                                                    {backfile == undefined ?
                                                     <Text></Text>
                                                    :<Text style={globalStyles.uploadFile}>{namei}</Text>}
                                        </Card>
                                    </TouchableOpacity>
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

export default Basicinfo;