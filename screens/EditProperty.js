import React, {Component, useState, useEffect} from 'react';
import { View, Text, ScrollView, Image, TextInput, Platform, Alert} from 'react-native'
import { Container, Button, H1, H3, Input, Form, Item, Toast, TouchableWithoutFeedback, Keyboard, CheckBox } from 'native-base'

import {Picker} from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';

import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Camera } from 'expo-camera';
import Constants from 'expo-constants'
import CollapsibleList from "react-native-collapsible-list";
import {Spinner} from 'native-base';

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
        console.log(this.state.ids)

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

    registerbasici2 = async () => {
        console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
        api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
    }

    registerbasici = async () => {
        let localUri = this.state.backfile;
        
        if (localUri == null || localUri == '') {
            console.log(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
            api.registerbasicinfo(this.state.id,this.state.email,this.state.hname,this.state.num,this.state.dir,this.state.cities,this.state.states,this.state.p_code, this.state.idm, this.state.nameh, this.state.lnameh, this.state.db, this.state.gender, this.state.dblaw)
        }
        else {
          //File
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;

          let formData = new FormData();
          formData.append('backfile', { uri: localUri, name: filename, type });

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

          return await fetch(`https://homebor.com/basiceditapp.php?id=${id}&email=${email}&hname=${hname}&num=${num}&dir=${dir}&cities=${cities}&states=${states}&p_code=${p_code}&idm=${idm}&nameh=${nameh}&lnameh=${lnameh}&db=${db}&gender=${gender}&dblaw=${dblaw}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Basic Information Update')
              }
              else {
                Alert.alert('Error')
    
              }
            });
        }  
    };

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
                                        <Text style={ globalStyles.infotitle}>House Name</Text>

                                        <Item inlineLabel last style={globalStyles.input} >
                                            <Input 
                                                defaultValue={item.h_name == 'NULL' ? '' : item.h_name}
                                                onChangeText={ (hname) => this.setState({hname}) }
                                            />
                                        </Item>
                                        

                                        <Text style={ globalStyles.infotitle}>Phone Number</Text>

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
                                    <Text style={ globalStyles.infotitle}>Direction</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.dir == 'NULL' ? '' : item.dir}
                                            onChangeText={ (dir) => this.setState({dir}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>City</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.city == 'NULL' ? '' : item.city}
                                            onChangeText={ (cities) => this.setState({cities}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>State / Province </Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.state == 'NULL' ? '' : item.state}
                                            onChangeText={ (states) => this.setState({states}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Postal Code</Text>

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
                                    <Text style={ globalStyles.infotitle}>Name</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.name_h == 'NULL' ? '' : item.name_h}
                                            onChangeText={ (nameh) => this.setState({nameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Last Name</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.l_name_h == 'NULL' ? '' : item.l_name_h}
                                            onChangeText={ (lnameh) => this.setState({lnameh}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                    <Item inlineLabel last style={globalStyles.input} >
                                        <Input 
                                            defaultValue={item.db == 'NULL' ? '' : item.db}
                                            onChangeText={ (db) => this.setState({db}) }
                                        />
                                    </Item>

                                    <Text style={ globalStyles.infotitle}>Gender</Text>

                        
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

                image: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png",
                lroomphoto: "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png",

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
        
        let profile = await api.getGalleryPhotos(this.state.email,this.state.perm)
		this.setState({ info : profile.data })
		console.log(this.state.info)

        this.getPermissionAsync();


    };

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
                 image: result.uri
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
                lroomphoto: result2.uri
             });


        }
    }

    uploadImage = async () => {
        let localUri = this.state.image;
        let localUri2 = this.state.lroomphoto;
        
        
        if (localUri == null || localUri == '') {
          Alert.alert('Debe seleccionar una imágen')
        }
        else {
          //image 1
          let filename = localUri.split('/').pop();
    
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          console.log('type')
          console.log(type)

          //image2
          let filename2 = localUri2.split('/').pop();
    
          let match2 = /\.(\w+)$/.exec(filename2);
          let type2 = match2 ? `lroomphoto/${match[1]}` : `lroomphoto`;
    
          let formData = new FormData();
          formData.append('photo', { uri: localUri, name: filename, type });
          formData.append('photo2', { uri: localUri2, name: filename2, type : type2 });

          console.log('Comprobante de envio')
          console.log(formData);
          

          console.log(JSON.stringify({ email: this.state.email}));

          let eMail = this.state.email;

          return await fetch(`https://homebor.com/galleryone.php?email=${eMail}`, {
            method: 'POST',
            body: formData,
            header: {
                'Content-Type': 'multipart/form-data'
            },
          }).then(res => res.json())
            .catch(error => console.error('Error', error))
            .then(response => {
              if (response.status == 1) {
                Alert.alert('Imágen guardada')
              }
              else {
                Alert.alert('No se ha podido guardar la imágen, intentelo de nuevo')
    
              }
            });
        }  };


    registerbasici2 = () => api.registerbasicinformation(this.state.hname,this.state.num, this.state.email)

	render(){
    
        let { image } = this.state;
        let { lroomphoto } = this.state;

        console.log(image)

        return (
            
            <FlatList
                data={this.state.info}
                extraData={this.state.info}
                keyExtractor={item => `${item.info}`}
                ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
                nestedScrollEnabled={true}
                bounces={false}
                renderItem={({item}) => (
		
            <View style={globalStyles.contentcontainer}>
                <ScrollView horizontal={true}>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> Frontage Photo </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.phome == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.phome}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage2()}>
                <Card style={globalStyles.shadowbox}>
                        <H3> Living Room Photo  </H3>
                            <View style={ globalStyles.underlinig }/>
                                {lroomphoto == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.pliving == "NULL" ?
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.pliving}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> Family Picture </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.fp == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.fp}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                </ScrollView>

                <ScrollView horizontal={true}>

                <TouchableOpacity onPress={()=>this._pickImage2()}>
                <Card style={globalStyles.shadowbox}>
                        <H3> Kitchen  </H3>
                            <View style={ globalStyles.underlinig }/>
                                {lroomphoto == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.parea1 == "NULL" ?
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.parea1}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> Dining Room </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.parea2 == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.parea2}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage2()}>
                <Card style={globalStyles.shadowbox}>
                        <H3> House Area 3 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {lroomphoto == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.parea3 == "NULL" ?
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.parea3}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> House Area 4 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.parea4 == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.parea4}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                </ScrollView>

                <ScrollView horizontal={true}>

                <TouchableOpacity onPress={()=>this._pickImage2()}>
                <Card style={globalStyles.shadowbox}>
                        <H3> Bathroom 1 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {lroomphoto == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.pbath1 == "NULL" ?
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.pbath1}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> Bathroom 2 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.pbath2 == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.pbath2}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage2()}>
                <Card style={globalStyles.shadowbox}>
                        <H3> Bathroom 3 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {lroomphoto == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.pbath3 == "NULL" ?
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.pbath3}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: lroomphoto}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>this._pickImage()}>
                    <Card style={globalStyles.shadowbox}>
                        <H3> Bathroom 4 </H3>
                            <View style={ globalStyles.underlinig }/>
                                {image == `https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png` ?
                                item.pbath4 == "NULL" ?
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: `http://homebor.com/${item.pbath4}`}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />
                                :
                                <Image source={{uri: image}}
                                style={{width: 200, height: 200, backgroundColor: "#DDDDDD"}} />}
                    </Card>
                </TouchableOpacity>

                </ScrollView>
                
                <Button
                    success
                    bordered
                    onPress={this.uploadImage}
                    style={globalStyles.botonedit}
                >

                <Text
                    style={globalStyles.botonTexto}
                    > Update </Text>
                </Button>
                


            </View>
                )}>
                    
                </FlatList>
  
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
        api.registeradditionalinfo(this.state.id,this.state.email,this.state.des,this.state.num_mem,this.state.backg,this.state.backl,this.state.g_pre,this.state.ag_pre, this.state.status, this.state.cell, this.state.smoke, this.state.pet, this.state.pet_num, this.state.type_pet, this.state.idm, this.state.a_pre, this.state.itemDog, this.state.itemCat, this.state.itemOther, this.state.itemVegetarian, this.state.itemHalal, this.state.itemKosher, this.state.itemLactose, this.state.itemGluten, this.state.itemPork, this.state.itemNone)
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
                                    defaultValue={item.data.pet_num}
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
        
        let profile = await api.getFamilyinfo(this.state.email,this.state.perm)
		this.setState({ info : profile.data, id: profile.data[0].id_home, idm: profile.data[0].id_m, f_name1 : profile.data[0].f_name1, f_lname1 : profile.data[0].f_lname1, db1 : profile.data[0].db1, gender1 : profile.data[0].gender1, re1 : profile.data[0].re1, db_lawf1 : profile.data[0].db_lawf1, f_name2 : profile.data[0].f_name2, f_lname2 : profile.data[0].f_lname2, db2 : profile.data[0].db2, gender2 : profile.data[0].gender2, re2 : profile.data[0].re2, db_lawf2 : profile.data[0].db_lawf2, f_name3 : profile.data[0].f_name3, f_lname3 : profile.data[0].f_lname3, db3 : profile.data[0].db3, gender3 : profile.data[0].gender3, re3 : profile.data[0].re3, db_lawf3 : profile.data[0].db_lawf3, f_name4 : profile.data[0].f_name4, f_lname4 : profile.data[0].f_lname4, db4 : profile.data[0].db4, gender4 : profile.data[0].gender4, re4 : profile.data[0].re4, db_lawf4 : profile.data[0].db_lawf4, f_name5 : profile.data[0].f_name5, f_lname5 : profile.data[0].f_lname5, db5 : profile.data[0].db5, gender5 : profile.data[0].gender5, re5 : profile.data[0].re5, db_lawf5 : profile.data[0].db_lawf5, f_name6 : profile.data[0].f_name6, f_lname6 : profile.data[0].f_lname6, db6 : profile.data[0].db6, gender6 : profile.data[0].gender6, re6 : profile.data[0].re6, db_lawf6 : profile.data[0].db_lawf6, f_name7 : profile.data[0].f_name7, f_lname7 : profile.data[0].f_lname7, db7 : profile.data[0].db7, gender7 : profile.data[0].gender7, re7 : profile.data[0].re7, db_lawf7 : profile.data[0].db_lawf7, f_name8 : profile.data[0].f_name8, f_lname8 : profile.data[0].f_lname8, db8 : profile.data[0].db8, gender8 : profile.data[0].gender8, re8 : profile.data[0].re8, db_lawf8 : profile.data[0].db_lawf8})
		console.log(this.state.info)

    }


    registerbasici = async () => {
        console.log(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1, this.state.db_lawf1, this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3, this.state.db_lawf3, this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4, this.state.db_lawf4, this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5, this.state.db_lawf5, this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6, this.state.db_lawf6, this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7, this.state.db_lawf7, this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8, this.state.db_lawf8)
        api.registerfamilyinfo(this.state.id,this.state.email,this.state.idm,this.state.f_name1,this.state.f_lname1,this.state.db1,this.state.gender1,this.state.re1,this.state.db_lawf1,this.state.f_name2,this.state.f_lname2,this.state.db2,this.state.gender2,this.state.re2, this.state.db_lawf2, this.state.f_name3,this.state.f_lname3,this.state.db3,this.state.gender3,this.state.re3,this.state.db_lawf3,this.state.f_name4,this.state.f_lname4,this.state.db4,this.state.gender4,this.state.re4,this.state.db_lawf4,this.state.f_name5,this.state.f_lname5,this.state.db5,this.state.gender5,this.state.re5,this.state.db_lawf5,this.state.f_name6,this.state.f_lname6,this.state.db6,this.state.gender6,this.state.re6,this.state.db_lawf6,this.state.f_name7,this.state.f_lname7,this.state.db7,this.state.gender7,this.state.re7,this.state.db_lawf7,this.state.f_name8,this.state.f_lname8,this.state.db8,this.state.gender8,this.state.re8,this.state.db_lawf8)
    }

	render(){
    
        return ( 
		
            <FlatList
		data={this.state.info}
		keyExtractor={item => `${item.info}`}
		renderItem={({item}) => (

            
            <Container style={ globalStyles.contenedor} >
				
            <ScrollView 
            nestedScrollEnabled={true} 
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}>

            <View style={ globalStyles.contenido } >
                    <H1 style={ globalStyles.infomaintitle}>Family Information</H1>
                <View style={ globalStyles.hr} />
                <Form>

                    {/*Member 1 */}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 1
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 1</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name1 == 'NULL' ? '' : item.f_name1}
                                        onChangeText={ (f_name1) => this.setState({f_name1}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname1 == 'NULL' ? '' : item.f_lname1}
                                        onChangeText={ (f_lname1) => this.setState({f_lname1}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db1 == 'NULL' ? '' : item.db1}
                                        onChangeText={ (db1) => this.setState({db1}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender1 == 'NULL' ? "Male"  : this.state.gender1}
                                        onValueChange={(gender1) => this.setState({gender1})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re1 == 'NULL' ? "Dad"  : this.state.re1}
                                        onValueChange={(re1) => this.setState({re1})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf1 == 'NULL' ? '' : item.db_lawf1}
                                        onChangeText={ (db_lawf1) => this.setState({db_lawf1}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 2 */}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 2
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 2</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name2 == 'NULL' ? '' : item.f_name2}
                                        onChangeText={ (f_name2) => this.setState({f_name2}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname2 == 'NULL' ? '' : item.f_lname2}
                                        onChangeText={ (f_lname2) => this.setState({f_lname2}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db2 == 'NULL' ? '' : item.db2}
                                        onChangeText={ (db2) => this.setState({db2}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender2 == 'NULL' ? "Male"  : this.state.gender2}
                                        onValueChange={(gender2) => this.setState({gender2})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re2 == 'NULL' ? "Dad"  : this.state.re2}
                                        onValueChange={(re2) => this.setState({re2})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf2 == 'NULL' ? '' : item.db_lawf2}
                                        onChangeText={ (db_lawf2) => this.setState({db_lawf2}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 3*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 3
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 3</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name3 == 'NULL' ? '' : item.f_name3}
                                        onChangeText={ (f_name3) => this.setState({f_name3}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname3 == 'NULL' ? '' : item.f_lname3}
                                        onChangeText={ (f_lname3) => this.setState({f_lname3}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db3 == 'NULL' ? '' : item.db3}
                                        onChangeText={ (db3) => this.setState({db3}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender3 == 'NULL' ? "Male"  : this.state.gender3}
                                        onValueChange={(gender3) => this.setState({gender3})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re3 == 'NULL' ? "Dad"  : this.state.re3}
                                        onValueChange={(re3) => this.setState({re3})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf3 == 'NULL' ? '' : item.db_lawf3}
                                        onChangeText={ (db_lawf3) => this.setState({db_lawf3}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 4*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 4
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 4</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name4 == 'NULL' ? '' : item.f_name4}
                                        onChangeText={ (f_name4) => this.setState({f_name4}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname4 == 'NULL' ? '' : item.f_lname4}
                                        onChangeText={ (f_lname4) => this.setState({f_lname4}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db4 == 'NULL' ? '' : item.db4}
                                        onChangeText={ (db4) => this.setState({db4}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender4 == 'NULL' ? "Male"  : this.state.gender4}
                                        onValueChange={(gender4) => this.setState({gender4})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re4 == 'NULL' ? "Dad"  : this.state.re4}
                                        onValueChange={(re4) => this.setState({re4})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf4 == 'NULL' ? '' : item.db_lawf4}
                                        onChangeText={ (db_lawf4) => this.setState({db_lawf4}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 5*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 5
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 5</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name5 == 'NULL' ? '' : item.f_name5}
                                        onChangeText={ (f_name5) => this.setState({f_name5}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname5 == 'NULL' ? '' : item.f_lname5}
                                        onChangeText={ (f_lname5) => this.setState({f_lname5}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db5 == 'NULL' ? '' : item.db5}
                                        onChangeText={ (db5) => this.setState({db5}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender5 == 'NULL' ? "Male"  : this.state.gender5}
                                        onValueChange={(gender5) => this.setState({gender5})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re5 == 'NULL' ? "Dad"  : this.state.re5}
                                        onValueChange={(re5) => this.setState({re5})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf5 == 'NULL' ? '' : item.db_lawf5}
                                        onChangeText={ (db_lawf5) => this.setState({db_lawf5}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 6*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 6
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 6</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name6 == 'NULL' ? '' : item.f_name6}
                                        onChangeText={ (f_name6) => this.setState({f_name6}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname6 == 'NULL' ? '' : item.f_lname6}
                                        onChangeText={ (f_lname6) => this.setState({f_lname6}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db6 == 'NULL' ? '' : item.db6}
                                        onChangeText={ (db6) => this.setState({db6}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender6 == 'NULL' ? "Male"  : this.state.gender6}
                                        onValueChange={(gender6) => this.setState({gender6})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re6 == 'NULL' ? "Dad"  : this.state.re6}
                                        onValueChange={(re6) => this.setState({re6})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf6 == 'NULL' ? '' : item.db_lawf6}
                                        onChangeText={ (db_lawf6) => this.setState({db_lawf6}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 7*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 7
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 7</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name7 == 'NULL' ? '' : item.f_name7}
                                        onChangeText={ (f_name7) => this.setState({f_name7}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname7 == 'NULL' ? '' : item.f_lname7}
                                        onChangeText={ (f_lname7) => this.setState({f_lname7}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db7 == 'NULL' ? '' : item.db7}
                                        onChangeText={ (db7) => this.setState({db7}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender7 == 'NULL' ? "Male"  : this.state.gender7}
                                        onValueChange={(gender7) => this.setState({gender7})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re7 == 'NULL' ? "Dad"  : this.state.re7}
                                        onValueChange={(re7) => this.setState({re7})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf7 == 'NULL' ? '' : item.db_lawf7}
                                        onChangeText={ (db_lawf7) => this.setState({db_lawf7}) }
                                    />
                                </Item>
                            </CollapsibleList>
                    </Card>

                    {/*Member 8*/}
                    <Card>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={globalStyles.show}
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Family Member 8
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require("../assets/profile2-64.png")}
                                        resizeMode="contain"
                                        style={globalStyles.editiconFamily}/>
                                <H3 style={ globalStyles.infomaintitledit}>Family Member 8</H3>
                            </View>
                                <Text style={ globalStyles.infotitle}>Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_name8 == 'NULL' ? '' : item.f_name8}
                                        onChangeText={ (f_name8) => this.setState({f_name8}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Last Name</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.f_lname8 == 'NULL' ? '' : item.f_lname8}
                                        onChangeText={ (f_lname8) => this.setState({f_lname8}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Date of Birth</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db8 == 'NULL' ? '' : item.db8}
                                        onChangeText={ (db8) => this.setState({db8}) }
                                    />
                                </Item>

                                <Text style={ globalStyles.infotitle}>Gender</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.gender8 == 'NULL' ? "Male"  : this.state.gender8}
                                        onValueChange={(gender8) => this.setState({gender8})}>
                                            <Picker.Item label="Male" value="Male" /> 
                                            <Picker.Item label="Female" value="Female" />
                                            <Picker.Item label="Private" value="Private" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Relation</Text>

                    
                                <View style={{marginTop: '-10%'}}>
                                    <Picker
                                        style={globalStyles.pickerBasicinfo} 
                                        selectedValue={this.state.re8 == 'NULL' ? "Dad"  : this.state.re8}
                                        onValueChange={(re8) => this.setState({re8})}>
                                            <Picker.Item label="Dad" value="Dad" /> 
                                            <Picker.Item label="Mom" value="Mom" />
                                            <Picker.Item label="Son" value="Son" />
                                            <Picker.Item label="Daughter" value="Daughter" />
                                            <Picker.Item label="Grandparents" value="Grandparents" />
                                            <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>

                                <Text style={ globalStyles.infotitle}>Date of Background Check</Text>

                                <Item inlineLabel last style={globalStyles.input} >
                                    <Input 
                                        defaultValue={item.db_lawf8 == 'NULL' ? '' : item.db_lawf8}
                                        onChangeText={ (db_lawf8) => this.setState({db_lawf8}) }
                                    />
                                </Item>
                            </CollapsibleList>
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

