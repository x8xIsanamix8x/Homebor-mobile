import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, RefreshControl, ImageBackground, Linking } from 'react-native';
import { NativeBaseProvider, Text, Button, Heading, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

import Checkbox from 'expo-checkbox';


export default class Profile extends Component {

    constructor(props){
		super(props);
		this.state = {
		  //Variables
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
		}
	  }
	
	  async componentDidMount(){
		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		});

		//Get user profile
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

		//Get user profile data
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false, dates : profile.data[0].y_service, vegetarians : profile.data[0].vegetarians, halal : profile.data[0].halal, kosher : profile.data[0].kosher, lactose : profile.data[0].lactose, gluten : profile.data[0].gluten, pork : profile.data[0].pork, none : profile.data[0].none, dog : profile.data[0].dog, cat : profile.data[0].cat, other : profile.data[0].other })

        let d1 = new Date();
        let d2 = new Date(this.state.dates);
        let one_day = 1000*60*60*24
        let diff = Math.floor(d1.getTime()-d2.getTime())
        let range = Math.floor(diff/(one_day))
        let months = Math.floor(range/31)
        let years = Math.floor(months/12)

        this.setState({ year : years, month : months, ranges : range})

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


	  //Refresh function call
	  onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

		//Refresh function
        refresh = async() => {
			//Get user profile
			let userLogin = await AsyncStorage.getItem('userLogin')
			userLogin = JSON.parse(userLogin)
			this.setState({ email : userLogin.email, perm : userLogin.perm})

			//Get user profile data
			let profile = await api.getProfile(this.state.email,this.state.perm)
			this.setState({ info : profile.data, loading : false, vegetarians : profile.data[0].vegetarians, halal : profile.data[0].halal, kosher : profile.data[0].kosher, lactose : profile.data[0].lactose, gluten : profile.data[0].gluten, pork : profile.data[0].pork, none : profile.data[0].none, dog : profile.data[0].dog, cat : profile.data[0].cat, other : profile.data[0].other })
            console.log(this.state.info)

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

		  //Function to go to editproperty screen
		  edit = async () => {
			this.props.navigation.navigate('EditProperty')
		}

  render() {
    
  return (
    <FlatList
        data={this.state.info}
        extraData={this.state.info}
        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
        keyExtractor={item => `${item.info}`}
        nestedScrollEnabled={true}
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
            <NativeBaseProvider>
                
                    <ScrollView nestedScrollEnabled={true} >
                        
                        <View>
                            {item.fp != 'NULL' ? 
                                    <ImageBackground source={{ uri: `http://homebor.com/${item.fp}` }} style={globalStyles.profileBanner}>
                                        <Image
                                            //source={{ uri: `http://homebor.com/${item.fp}` }}
                                            resizeMode="contain"
                                            style={item.fp == "NULL" ? globalStyles.hide : globalStyles.imageprofileBanner}>
                                        </Image>
                                    </ImageBackground>
                            :
                               item.phome != 'NULL' ? 
                                    <ImageBackground source={{ uri: `http://homebor.com/${item.phome}` }} style={globalStyles.profileBanner}>
                                        <Image
                                            //source={{ uri: `http://homebor.com/${item.fp}` }}
                                            resizeMode="contain"
                                            style={item.fp == "NULL" ? globalStyles.hide : globalStyles.imageprofileBanner}>
                                        </Image>
                                    </ImageBackground>

                                    :

                                    <ImageBackground source={require('../assets/promocional.jpg')} style={globalStyles.profileBanner}>
                                        <Image
                                            //source={{ uri: `http://homebor.com/${item.fp}` }}
                                            resizeMode="contain"
                                            style={item.fp == "NULL" ? globalStyles.hide : globalStyles.imageprofileBanner}>
                                        </Image>
                                    </ImageBackground>

                            }
                        </View>

                        {/* Basic Information*/}
                        <View>
                            <View>
                                {item.h_name == "NULL"
                                        ?
                                            <Text></Text>
                                        :
                                            <Text style={globalStyles.h_name}>{item.h_name}</Text>
                                }
                            </View>

                            <View>
                                <Text style={ globalStyles.room }>Rooms</Text>
                            </View>

                            <View>
                                {item.room == "NULL"
                                    ?
                                        <Text></Text>
                                    :
                                        <Text style={globalStyles.roomvar}>{item.room}</Text>
                                }
                            </View>

                            <View>
                                <Text style={ globalStyles.num }>Phone Number</Text>
                            </View>

                            <View>
                                {item.num == "NULL"
                                    ?
                                        <Text></Text>
                                    :
                                        <Text style={globalStyles.numvar}>{item.num}</Text>
                                }
                            </View>

                            
                        </View>

					
                        <View style={globalStyles.profileMargins}>
                            {/*Location*/}
                            <View style={ item.dir== "NULL" && item.state == "NULL" && item.city == "NULL" && item.p_code == "NULL"  ? globalStyles.hideContents : globalStyles.show}>
                                <Card>
                                    <View style={globalStyles.Viewprofiletitles}>
                                        <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Location</Heading>

                                        <Image source={require("../assets/location-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.titleiconLocProfile}/>
                                    </View>

                                            <Text style={globalStyles.profiledirtitleMainCity}>
                                                <Text style={ globalStyles.infotitle}>Main City: </Text> 
                                                    {item.m_city == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.m_city}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitleDirection}>
                                                <Text style={ globalStyles.infotitle}>Direction: </Text> 
                                                    {item.dir == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.dir}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitleCity}>
                                                <Text style={ globalStyles.infotitle}>City: </Text> 
                                                    {item.city == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.city}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitleState}>
                                                <Text style={ globalStyles.infotitle}>State/Province: </Text> 
                                                    {item.state == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.state}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitleP_code}>
                                                <Text style={ globalStyles.infotitle}>Postal Code: </Text> 
                                                    {item.p_code == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.p_code}</Text>
                                                    }	
                                            </Text>
                                        </Card>
                            </View>
                        
                            <View style={ item.phome== "NULL" && item.pliving == "NULL" && item.parea1 == "NULL" && item.parea2 == "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" && item.pbath1 == "NULL" && item.pbath2 == "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                <Card>
                                        {/*Gallery*/}
                                        <View>
                                            <View style={globalStyles.Viewprofiletitles}>
                                                <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Gallery</Heading>

                                                <Image source={require("../assets/gallery-16.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconLocGallery}/>
                                            </View>

                                            {/*PHOTO HOME */}
                                            <View style={item.phome == "NULL" ? globalStyles.hideContents : globalStyles.showphoto}>
                                                <Card style={item.phome == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
                                                    <Heading size='lg' style={ item.phome == "NULL" ? globalStyles.hide : globalStyles.infotitle2 }>Frontage</Heading>
                                                    <View style={ item.phome == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
                                                    <Image
                                                        source={{ uri: `http://homebor.com/${item.phome}` }}
                                                        resizeMode="contain"
                                                        style={item.phome == "NULL" ? globalStyles.hide : globalStyles.imageprofile}
                                                    ></Image>
                                                </Card>
                                            </View>

                                            {/*PHOTO LIVING ROOM */}
                                            <View style={item.pliving == "NULL" ? globalStyles.hideContents : globalStyles.showphoto}>
                                                <Card style={item.pliving == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
                                                <Heading size='lg' style={ item.pliving == "NULL" ? globalStyles.hide : globalStyles.infotitle2 }>Living Room</Heading>
                                                    <View style={ item.pliving == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
                                                    <Image
                                                        source={{ uri: `http://homebor.com/${item.pliving}` }}
                                                        resizeMode="contain"
                                                        style={item.pliving == "NULL" ? globalStyles.hide : globalStyles.imageprofile}
                                                    ></Image>
                                                </Card>
                                            </View>	

                                            {/*HOUSE AREAS PHOTOS */}
                                            <View style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hideContents : globalStyles.showphoto}>
                                                <Card style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
                                                    <Heading size='lg' style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.infotitle2 }>House Common Areas</Heading>
                                                    <View style={ item.parea1 == "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
                                                    {/*If user only has area 1 */}
                                                    <Image
                                                        source={{ uri: `http://homebor.com/${item.parea1}` }}
                                                        resizeMode="contain"
                                                        style={ item.parea1 != "NULL" && item.parea2 == "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                    ></Image>

                                                    {/*If user only has area 1 and 2*/}
                                                    <Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea1}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea2}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 == "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>

                                                    {/*If user only has area 1, 2 and 3*/}
                                                    <Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea1}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea2}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea3}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>

                                                    {/*If user has all areas*/}
                                                    <Swiper style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea1}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea2}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea3}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.parea4}` }}
                                                            resizeMode="contain"
                                                            style={item.parea1 != "NULL" && item.parea2 != "NULL" && item.parea3 != "NULL" && item.parea4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>
                                                </Card>
                                            </View>

                                            {/*BATHROOM PHOTOS */}
                                            <View style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                <Card style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.shadowbox}>
                                                    <Heading size='lg' style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.infotitle2 }>Bathrooms</Heading>
                                                    <View style={ item.pbath1 == "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.hide : globalStyles.underlinig }/>
                                                    {/*If user only has area 1 */}
                                                    <Image
                                                        source={{ uri: `http://homebor.com/${item.pbath1}` }}
                                                        resizeMode="contain"
                                                        style={ item.pbath1 != "NULL" && item.pbath2 == "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                    ></Image>

                                                    {/*If user only has area 1 and 2*/}
                                                    <Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath1}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath2}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 == "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>
                        

                                                    {/*If user only has area 1, 2 and 3*/}
                                                    <Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath1}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath2}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath3}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 == "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>

                                                    {/*If user has all areas*/}
                                                    <Swiper style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.showsliderProfile : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath1}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents }
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath2}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath3}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                        <View style={globalStyles.slideroomPreview}>
                                                            <Image
                                                            source={{ uri: `http://homebor.com/${item.pbath4}` }}
                                                            resizeMode="contain"
                                                            style={item.pbath1 != "NULL" && item.pbath2 != "NULL" && item.pbath3 != "NULL" && item.pbath4 != "NULL" ? globalStyles.imageprofile : globalStyles.hideContents}
                                                            ></Image>
                                                        </View>
                                                    </Swiper>
                                                </Card>
                                            </View>							
                                        </View>
                                </Card>
                            </View>

                            {/*Additional Information */}
                                <View style={ item.des == "NULL" && item.h_type == "NULL" && item.a_pre == "NULL" && item.g_pre == "NULL" && item.ag_pre == "NULL" && item.status == "NULL" && item.cell == "NULL" && item.smoke == "NULL" && item.y_service == "NULL" && item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.show}>
                                    <Card>
                                        <View style={globalStyles.Viewprofiletitles}>
                                            <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Additional Information</Heading>

                                            <Image source={require("../assets/additional-info-16.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconLocAdditional}/>
                                        </View>
                                        <View style={ item.des == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Description: </Text> 
                                                    {item.des == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.des}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.h_type == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Type of Residence: </Text> 
                                                    {item.h_type == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.h_type}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.a_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Academy Preference: </Text> 
                                                    {item.a_pre == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.name_a}, {item.dir_a}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.g_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Gender Preference: </Text>  
                                                    {item.g_pre == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.g_pre}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.ag_pre == "NULL" ? globalStyles.hideContents : item.g_pre == "NULL" ? globalStyles.infoadditional :  globalStyles.infoadditionalAgepre}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Age Preference: </Text>  
                                                    {item.ag_pre == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.ag_pre}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.status == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>House Status: </Text>  
                                                    {item.status == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.status}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.smoke == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Smokers Politics: </Text>  
                                                    {item.smoke == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.smoke}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.m_service == "NULL" ? globalStyles.hideContents : item.status == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalMealsS}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Meals Service: </Text>  
                                                    {item.m_service == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.m_service}</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        <View style={ item.y_service == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                            <Text style={globalStyles.profiledirtitle2}>
                                                <Text style={ globalStyles.infotitle}>Since when have you being homestay?: </Text>  
                                                    {item.y_service == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            this.state.year == 0 ? 
                                                            this.state.year == 0 && this.state.month == 0 ?
                                                            this.state.year == 0 && this.state.month == 0 && this.state.ranges == 0 ?
                                                            <Text style={globalStyles.varProfile}>{this.state.ranges} day</Text> 
                                                            :
                                                            <Text style={globalStyles.varProfile}>{this.state.ranges} days</Text> 
                                                            :
                                                            <Text style={globalStyles.varProfile}>{this.state.month} months</Text>
                                                            :   
                                                            <Text style={globalStyles.varProfile}>{this.state.year} years</Text>
                                                    }	
                                            </Text>
                                        </View>
                                        
                                        
                                        
                                        <Card>
                                            <View style={ globalStyles.infoadditionalChecked}>
                                                <Text style={ item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.infotitleSpecialDiet}>Special Diet</Text>
                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemVegetarian} color={this.state.itemVegetarian ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Vegetarian</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}> 
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemHalal} color={this.state.itemHalal ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Halal (Muslims)</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemKosher} color={this.state.itemKosher ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Kosher (Jews)</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemLactose} color={this.state.itemLactose ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Lactose Intolerant</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemGluten} color={this.state.itemGluten ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Gluten Free Diet</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemPork} color={this.state.itemPork ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>No Pork</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemNone} color={this.state.itemNone ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>None</Text>
                                                    </View>

                                            </View>
                                        </Card>
                                    </Card>
                                </View>
                                    

                                    {/*Pet Info*/}
                                    <View style={ item.pet == "NULL" && item.pet_num == "0" && item.dog == "no" && item.cat == "no" && item.other == "no" && item.type_pet == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                        <Card>
                                            <View>
                                                <View style={globalStyles.Viewprofiletitles}>
                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Pets Information</Heading>

                                                    <Image source={require("../assets/pets-16.png")}
                                                            resizeMode="contain"
                                                            style={globalStyles.editiconLocPet}/>
                                                </View>
                                                <View style={ item.pet == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Pets: </Text>  
                                                            {item.pet== "NULL"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.pet}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.pet_num == "0" ? globalStyles.hideContents : item.pet == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalNumpets}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Number of pets: </Text>  
                                                            {item.pet_num== "0"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.pet_num}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.dog == "no" && item.cat == "no" && item.other == "no" ? globalStyles.hideContents : globalStyles.infoadditionalChecked}>
                                                    <View style={globalStyles.editSelectsSquareLeftSide2}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemDog} color={this.state.itemDog ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Dogs</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareRightSide}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemCat} color={this.state.itemCat ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Cats</Text>
                                                    </View>

                                                    <View style={globalStyles.editSelectsSquareLeftSide2}>
                                                        <Checkbox style={{borderColor: "black", borderWidth: 2, size: "5%"}} value={this.state.itemOther} color={this.state.itemOther ? '#B70B7B' : undefined}/>
                                                        <Text style={globalStyles.labelSelectEdit}>Others</Text>
                                                    </View>

                                                </View>
                                                <View style={ item.type_pet  == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Type of Pets: </Text>  
                                                            {item.type_pet == "NULL"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.type_pet}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>
                                    

                                    {/*Main Contact Info*/}
                                    <View style={ item.name_h == "NULL" && item.l_name_h == "NULL" && item.db == "NULL" && item.gender == "NULL" && item.db_law == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                        <Card>
                                            <View>
                                                <View style={globalStyles.Viewprofiletitles}>
                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>My Information</Heading>

                                                    <Image source={require("../assets/profile2-64.png")}
                                                            resizeMode="contain"
                                                            style={globalStyles.editiconLocMyInfo}/>
                                                </View>

                                                <View style={ item.name_h == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                            {item.name_h == "NULL" 
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.name_h}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.l_name_h == "NULL" ? globalStyles.hideContents : item.name_h == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastNameMain}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                            {item.l_name_h == "NULL" 
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.l_name_h}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.db == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                            {item.db == "NULL" 
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.db}</Text>
                                                            }	
                                                    </Text>
                                                </View>

                                                <View style={ item.gender == "NULL" ? globalStyles.hideContents : item.db == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderMainInfo}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                            {item.gender == "NULL" 
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.gender}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.cell == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Cellphone: </Text>  
                                                            {item.cell == "NULL"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.cell}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.occupation_m == "NULL" ? globalStyles.hideContents : item.cell == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationMainInfo}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                            {item.occupation_m == "NULL"
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.occupation_m}</Text>
                                                            }	
                                                    </Text>
                                                </View>
                                                <View style={ item.db_law == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.profiledirtitle2}>
                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                            {item.db_law == "NULL" 
                                                                ?
                                                                    <Text></Text>
                                                                :
                                                                    <Text style={globalStyles.varProfile}>{item.db_law}</Text>
                                                            }	
                                                    </Text>
                                                </View>

                                                <View style={ item.law == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                    <Text style={globalStyles.infotitleLaw}
                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.law}`)}>
                                                            Background Check Document
                                                    </Text>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>


                                    <View style={ item.f_name1== "NULL" && item.f_lname1== "NULL" && item.db1== "NULL" && item.gender1== "NULL" && item.re1== "NULL" && item.db_lawf1== "NULL" && item.lawf1== "NULL" && item.f_name2== "NULL" && item.f_lname2== "NULL" && item.db2== "NULL" && item.gender2== "NULL" && item.re2== "NULL" && item.db_lawf2== "NULL" && item.lawf2== "NULL" && item.f_name3== "NULL" && item.f_lname3== "NULL" && item.db3== "NULL" && item.gender3== "NULL" && item.re3== "NULL" && item.db_lawf3== "NULL" && item.lawf3== "NULL" && item.f_name4== "NULL" && item.f_lname4== "NULL" && item.db4== "NULL" && item.gender4== "NULL" && item.re4== "NULL" && item.db_lawf4== "NULL" && item.lawf4== "NULL" && item.f_name5== "NULL" && item.f_lname5== "NULL" && item.db5== "NULL" && item.gender5== "NULL" && item.re5== "NULL" && item.db_lawf5== "NULL" && item.lawf5== "NULL" && item.f_name6== "NULL" && item.f_lname6== "NULL" && item.db6== "NULL" && item.gender6== "NULL" && item.re6== "NULL" && item.db_lawf6== "NULL" && item.lawf6== "NULL" && item.f_name7== "NULL" && item.f_lname7== "NULL" && item.db7== "NULL" && item.gender7== "NULL" && item.re7== "NULL" && item.db_lawf7== "NULL" && item.lawf7== "NULL" && item.f_name8== "NULL" && item.f_lname8== "NULL" && item.db8== "NULL" && item.gender8== "NULL" && item.re8== "NULL" && item.db_lawf8== "NULL" && item.lawf8== "NULL"  ? globalStyles.hideContents : globalStyles.show}>
                                        <Card>
                                            {/*Family Information*/}
                                    
                                                <View>
                                                    <View style={globalStyles.Viewprofiletitles}>
                                                        <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Family Information</Heading>

                                                        <Image source={require("../assets/profile2-64.png")}
                                                                resizeMode="contain"
                                                                style={globalStyles.editiconLocFamilyInfo}/>
                                                    </View>
                                                            
                                                        {/*Any Member of your Family:*/}
                                                        <View style={ item.allergies== "NULL" && item.medic_f== "NULL" && item.health_f== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                            <View style={globalStyles.Viewprofiletitles}>
                                                                <Heading size='md' style={ globalStyles.infomaintitleditTablets2}>Any Member of your Family:</Heading>
                                                            </View>

                                                            <View style={ item.allergies == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Have Allergies?: </Text> 
                                                                            {item.allergies == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.allergies}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.medic_f == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Take any Medication?: </Text> 
                                                                            {item.medic_f == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.medic_f}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.health_f == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Have Health Problems?: </Text>  
                                                                            {item.health_f == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.health_f}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                        </Card>
                                                        </View>
                                                        
                                                        {/*Preferences*/}
                                                        <View style={ item.num_mem == "NULL" && item.backg == "NULL" && item.backl == "NULL" && item.religion == "NULL" && item.condition_m == "NULL" && item.misdemeanor == "NULL" && item.c_background == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                            <View style={globalStyles.Viewprofiletitles}>
                                                                <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Preferences</Heading>
                                                            </View>

                                                            <View style={ item.num_mem == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Number of Family Members: </Text> 
                                                                            {item.num_mem == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.num_mem}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.backg == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Background: </Text> 
                                                                            {item.backg == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.backg}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.backl == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Background Language: </Text>  
                                                                            {item.backl == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.backl}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.religion == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Religion to which you belong: </Text> 
                                                                            {item.religion == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.religion}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.condition_m == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Any Phisycal or Mental Condition: </Text> 
                                                                            {item.condition_m == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.condition_m}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.misdemeanor == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Have they committed a misdemeanor: </Text>  
                                                                            {item.misdemeanor == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.misdemeanor}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.c_background == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Do you give us your consent to go to the authorities and check your criminal background check?: </Text>  
                                                                            {item.c_background == "NULL"
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.c_background}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                        </Card>
                                                        </View>

                                                        {/*Member 1 */}
                                                        <View style={ item.f_name1== "NULL" && item.f_lname1== "NULL" && item.db1== "NULL" && item.gender1== "NULL" && item.re1== "NULL" && item.occupation_f1 == "NULL" && item.db_lawf1== "NULL" && item.lawf1== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                            <Card>
                                                                    <View style={globalStyles.Viewprofiletitles}>
                                                                        <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 1</Heading>
                                                                        
                                                                    </View>
                                                                    <View style={ item.f_name1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                                {item.f_name1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.f_name1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.f_lname1 == "NULL" ? globalStyles.hideContents : item.f_name1 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                                {item.f_lname1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.f_lname1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.db1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                                {item.db1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.gender1 == "NULL" ? globalStyles.hideContents : item.db1 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                                {item.gender1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.gender1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.re1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                                {item.re1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.re1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.occupation_f1 == "NULL" ? globalStyles.hideContents : item.re1 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.db_lawf1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                                {item.db_lawf1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db_lawf1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>

                                                                    <View style={ item.lawf1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.infotitleLaw}
                                                                            onPress={() => Linking.openURL(`http://homebor.com/${item.lawf1}`)}>
                                                                                Background Check Document
                                                                        </Text>
                                                                    </View>
                                                            </Card>
                                                        </View>

                                                        {/*Member 2*/}
                                                        <View style={ item.f_name2== "NULL" && item.f_lname2== "NULL" && item.db2== "NULL" && item.gender2== "NULL" && item.re2== "NULL" && item.occupation_f2 == "NULL" && item.db_lawf2== "NULL" && item.lawf2== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                            <Card>
                                                                    <View style={globalStyles.Viewprofiletitles}>
                                                                        <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 2</Heading>
                                                                        
                                                                    </View>
                                                                    <View style={ item.f_name2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                                {item.f_name2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.f_name2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.f_lname2 == "NULL" ? globalStyles.hideContents : item.f_name2 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                                {item.f_lname2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.f_lname2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.db2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                                {item.db2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.gender2 == "NULL" ? globalStyles.hideContents : item.db2 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                                {item.gender2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.gender2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.re2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                                {item.re2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.re2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.occupation_f2 == "NULL" ? globalStyles.hideContents : item.re2 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                    <View style={ item.db_lawf2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                                {item.db_lawf2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db_lawf2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>

                                                                    <View style={ item.lawf2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.infotitleLaw}
                                                                            onPress={() => Linking.openURL(`http://homebor.com/${item.lawf2}`)}>
                                                                                Background Check Document
                                                                        </Text>
                                                                    </View>
                                                            </Card>
                                                        </View>

                                                    {/*Member 3*/}
                                                    <View style={ item.f_name3 == "NULL" && item.f_lname3 == "NULL" && item.db3 == "NULL" && item.gender3 == "NULL" && item.re3 == "NULL" && item.occupation_f3 == "NULL" && item.db_lawf3 == "NULL" && item.lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 3</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname3 == "NULL" ? globalStyles.hideContents : item.f_name3 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender3 == "NULL" ? globalStyles.hideContents : item.db3 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f3 == "NULL" ? globalStyles.hideContents : item.re3 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f3 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f3}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf3}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 4*/}
                                                    <View style={ item.f_name4== "NULL" && item.f_lname4== "NULL" && item.db4== "NULL" && item.gender4== "NULL" && item.re4== "NULL" && item.occupation_f4 == "NULL" && item.db_lawf4== "NULL" && item.lawf4== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 4</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname4 == "NULL" ? globalStyles.hideContents : item.f_name4 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender8 == "NULL" ? globalStyles.hideContents : item.db8 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f4 == "NULL" ? globalStyles.hideContents : item.re4 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f4 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f4}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf4}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 5*/}
                                                    <View style={ item.f_name5== "NULL" && item.f_lname5== "NULL" && item.db5== "NULL" && item.gender5== "NULL" && item.re5== "NULL" && item.occupation_f5 == "NULL" && item.db_lawf5== "NULL" && item.lawf5== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 5</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname5 == "NULL" ? globalStyles.hideContents : item.f_name5 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender5 == "NULL" ? globalStyles.hideContents : item.db5 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f5 == "NULL" ? globalStyles.hideContents : item.re5 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f5 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f5}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf5}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 6*/}
                                                    <View style={ item.f_name6== "NULL" && item.f_lname6== "NULL" && item.db6== "NULL" && item.gender6== "NULL" && item.re6== "NULL" && item.occupation_f6 == "NULL" &&  item.db_lawf6== "NULL" && item.lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 6</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname6 == "NULL" ? globalStyles.hideContents : item.f_name6 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender6 == "NULL" ? globalStyles.hideContents : item.db6 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f6 == "NULL" ? globalStyles.hideContents : item.re6 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f6 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f6}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf6}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 7*/}
                                                    <View style={ item.f_name7== "NULL" && item.f_lname7== "NULL" && item.db7== "NULL" && item.gender7== "NULL" && item.re7== "NULL" && item.occupation_f7 == "NULL" && item.db_lawf7== "NULL" && item.lawf7== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 7</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname7 == "NULL" ? globalStyles.hideContents : item.f_name7 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender7 == "NULL" ? globalStyles.hideContents : item.db7 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f7 == "NULL" ? globalStyles.hideContents : item.re7 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f7 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f7}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf7}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 8*/}
                                                    <View style={ item.f_name8== "NULL" && item.f_lname8== "NULL" && item.db8== "NULL" && item.gender8== "NULL" && item.re8== "NULL" && item.occupation_f8== "NULL" && item.db_lawf8== "NULL" && item.lawf8== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={globalStyles.Viewprofiletitles}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitleditTablets}>Member 8</Heading>
                                                                    
                                                                </View>
                                                                <View style={ item.f_name8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Name: </Text>  
                                                                            {item.f_name8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_name8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.f_lname8 == "NULL" ? globalStyles.hideContents : item.f_name8 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalLastnamefamilyprofile}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Last Name: </Text>  
                                                                            {item.f_lname8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.f_lname8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.db8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Birth: </Text>  
                                                                            {item.db8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.gender8 == "NULL" ? globalStyles.hideContents : item.db8 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalGenderFamily}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Gender: </Text>  
                                                                            {item.gender8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.gender8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.re8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Relation: </Text>  
                                                                            {item.re8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.re8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                                <View style={ item.occupation_f8 == "NULL" ? globalStyles.hideContents : item.re8 == "NULL" ? globalStyles.infoadditional : globalStyles.infoadditionalOccupationFamily}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Occupation: </Text>  
                                                                                {item.occupation_f8 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.occupation_f8}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                                <View style={ item.db_lawf8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Check: </Text>  
                                                                            {item.db_lawf8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf8}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>

                                                                <View style={ item.lawf8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.infotitleLaw}
                                                                        onPress={() => Linking.openURL(`http://homebor.com/${item.lawf8}`)}>
                                                                            Background Check Document
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>





                                                </View>
                                        </Card>
                                    </View>


                        </View>


                        <Button
                            success
                            bordered
                            onPress={this.edit}
                            style={globalStyles.botoneditProfile}
                            >
                            <Text style={globalStyles.botonTexto}> Edit Property </Text>
                        </Button>  

                    </ScrollView>

            
            </NativeBaseProvider>
        )}> 
    </FlatList>
  );
}
}