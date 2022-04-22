import React, {Component, useState} from 'react'; 
import { View, Image, ScrollView, RefreshControl, ImageBackground } from 'react-native';
import { NativeBaseProvider, Text, Button, Heading, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';

export default class Profile extends Component {

    constructor(props){
		super(props);
		this.state = {
		  //Variables
		  email : '',
		  perm : false,
		  info : [],
		  refreshing: false,
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
		this.setState({ info : profile.data, loading : false, dates : profile.data[0].y_service })

        let d1 = new Date();
        let d2 = new Date(this.state.dates);
        let one_day = 1000*60*60*24
        let diff = Math.floor(d1.getTime()-d2.getTime())
        let range = Math.floor(diff/(one_day))
        let months = Math.floor(range/31)
        let years = Math.floor(months/12)

        this.setState({ year : years, month : months, ranges : range})
        
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
			this.setState({ info : profile.data, loading : false })
            console.log(this.state.info)
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
            size={RefreshControl.SIZE.LARGE}
        />
        }
        renderItem={({item}) => (
            <NativeBaseProvider>
                
                    <ScrollView nestedScrollEnabled={true} >
                        
                        <View>
                            <ImageBackground source={require('../assets/banner.png')} style={globalStyles.profileBanner}>
                                <Image
                                    source={{ uri: `http://homebor.com/${item.fp}` }}
                                    resizeMode="contain"
                                    style={item.fp == "NULL" ? globalStyles.hide : globalStyles.imageprofileBanner}>
                                </Image>
                                <Image
                                    source={{ uri: `http://homebor.com/${item.phome}` }}
                                    resizeMode="contain"
                                    style={item.phome != "NULL" &&  item.fp == "NULL" ? globalStyles.imageprofileBanner : globalStyles.hide}
                                ></Image>
                            </ImageBackground>
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
                                    <View style={{flexDirection: 'row'}}>
                                        <Heading size='md' style={ globalStyles.infomaintitledit}>Location</Heading>

                                        <Image source={require("../assets/location-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.editiconLocProfile}/>
                                    </View>

                                            <Text style={globalStyles.profiledirtitle}>
                                                <Text style={ globalStyles.infotitle}>Direction: </Text> 
                                                    {item.dir == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.dir}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitle}>
                                                <Text style={ globalStyles.infotitle}>City: </Text> 
                                                    {item.city == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.city}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitle}>
                                                <Text style={ globalStyles.infotitle}>State/Province: </Text> 
                                                    {item.state == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.state}</Text>
                                                    }	
                                            </Text>

                                            <Text style={globalStyles.profiledirtitle}>
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
                                            <View style={{flexDirection: 'row'}}>
                                                <Heading size='md' style={ globalStyles.infomaintitledit}>Gallery</Heading>

                                                <Image source={require("../assets/gallery-16.png")}
                                                        resizeMode="contain"
                                                        style={globalStyles.editiconLoc}/>
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
                                <View style={ item.des == "NULL" && item.num_mem == "NULL" && item.backg == "NULL" && item.backl == "NULL" && item.a_pre == "NULL" && item.g_pre == "NULL" && item.ag_pre == "NULL" && item.status == "NULL" && item.cell == "NULL" && item.smoke == "NULL" && item.y_service == "NULL" && item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.show}>
                                    <Card>
                                        <View style={{flexDirection: 'row'}}>
                                            <Heading size='md' style={ globalStyles.infomaintitledit}>Additional Information</Heading>

                                            <Image source={require("../assets/additional-info-16.png")}
                                                    resizeMode="contain"
                                                    style={globalStyles.editiconAddProfile}/>
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
                                        <View style={ item.ag_pre == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                <Text style={ globalStyles.infotitle}>Status: </Text>  
                                                    {item.status == "NULL"
                                                        ?
                                                            <Text></Text>
                                                        :
                                                            <Text style={globalStyles.varProfile}>{item.status}</Text>
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
                                        <View style={ item.m_service == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                <Text style={ globalStyles.infotitle}>Since when have you being homestay: </Text>  
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
                                        <View style={ globalStyles.infoadditionalChecked}>
                                            <Text style={ item.vegetarians == "no" && item.halal == "no" && item.kosher == "no" && item.lactose == "no" && item.gluten == "no" && item.pork == "no" && item.none == "no" ? globalStyles.hideContents : globalStyles.infotitle}>Special Diet</Text>
                                            <View style={ item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.vegetarians == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Vegetarians</Text></Text>
                                            <View style={item.halal == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.halal == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Halal (Muslims)</Text></Text>
                                            <View style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.kosher == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Kosher (Jews)</Text></Text>
                                            <View style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.lactose == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Lactose Intolerant</Text></Text>
                                            <View style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.gluten == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Gluten Free Diet</Text></Text>
                                            <View style={item.pork == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.pork == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>No Pork</Text></Text>
                                            <View style={item.none == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.none == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>None</Text></Text>
                                        </View>
                                    </Card>
                                </View>
                                    

                                    {/*Pet Info*/}
                                    <View style={ item.pet == "NULL" && item.pet_num == "0" && item.dog == "no" && item.cat == "no" && item.other == "no" && item.type_pet == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                        <Card>
                                            <View>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Pets Information</Heading>

                                                    <Image source={require("../assets/pets-16.png")}
                                                            resizeMode="contain"
                                                            style={globalStyles.editiconPetProfile}/>
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
                                                <View style={ item.pet_num == "0" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                    <Text style={ item.dog == "no" && item.cat == "no" && item.other == "no" ? globalStyles.hideContents : globalStyles.infotitle}>Type of Pets</Text>
                                                    <View style={item.dog == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.dog == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Dogs</Text></Text>
                                                    <View style={item.cat == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.cat == "no" ? globalStyles.hideContents : globalStyles.checked}><Text style={globalStyles.varProfile}>Cats</Text></Text>
                                                    <View style={item.other == "no" ? globalStyles.hideContents : globalStyles.CircleShape}></View><Text style={item.other == "no" ? globalStyles.hideContents : globalStyles.checked }><Text style={globalStyles.varProfile}>Others</Text></Text>
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
                                                <View style={{flexDirection: 'row'}}>
                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>My Information</Heading>

                                                    <Image source={require("../assets/profile2-64.png")}
                                                            resizeMode="contain"
                                                            style={globalStyles.editiconProProfile}/>
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
                                                <View style={ item.l_name_h == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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

                                                <View style={ item.gender == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                            </View>
                                        </Card>
                                    </View>


                                    <View style={ item.f_name1== "NULL" && item.f_lname1== "NULL" && item.db1== "NULL" && item.gender1== "NULL" && item.re1== "NULL" && item.db_lawf1== "NULL" && item.lawf1== "NULL" && item.f_name2== "NULL" && item.f_lname2== "NULL" && item.db2== "NULL" && item.gender2== "NULL" && item.re2== "NULL" && item.db_lawf2== "NULL" && item.lawf2== "NULL" && item.f_name3== "NULL" && item.f_lname3== "NULL" && item.db3== "NULL" && item.gender3== "NULL" && item.re3== "NULL" && item.db_lawf3== "NULL" && item.lawf3== "NULL" && item.f_name4== "NULL" && item.f_lname4== "NULL" && item.db4== "NULL" && item.gender4== "NULL" && item.re4== "NULL" && item.db_lawf4== "NULL" && item.lawf4== "NULL" && item.f_name5== "NULL" && item.f_lname5== "NULL" && item.db5== "NULL" && item.gender5== "NULL" && item.re5== "NULL" && item.db_lawf5== "NULL" && item.lawf5== "NULL" && item.f_name6== "NULL" && item.f_lname6== "NULL" && item.db6== "NULL" && item.gender6== "NULL" && item.re6== "NULL" && item.db_lawf6== "NULL" && item.lawf6== "NULL" && item.f_name7== "NULL" && item.f_lname7== "NULL" && item.db7== "NULL" && item.gender7== "NULL" && item.re7== "NULL" && item.db_lawf7== "NULL" && item.lawf7== "NULL" && item.f_name8== "NULL" && item.f_lname8== "NULL" && item.db8== "NULL" && item.gender8== "NULL" && item.re8== "NULL" && item.db_lawf8== "NULL" && item.lawf8== "NULL"  ? globalStyles.hideContents : globalStyles.show}>
                                        <Card>
                                            {/*Family Information*/}
                                    
                                                <View>
                                                    <View style={{flexDirection: 'row'}}>
                                                        <Heading size='md' style={ globalStyles.infomaintitledit}>Family Information</Heading>

                                                        <Image source={require("../assets/profile2-64.png")}
                                                                resizeMode="contain"
                                                                style={globalStyles.editiconPro2}/>
                                                    </View>
                                                        
                                                        {/*Member 1*/}
                                                        <View style={ item.f_name1== "NULL" && item.f_lname1== "NULL" && item.db1== "NULL" && item.gender1== "NULL" && item.re1== "NULL" && item.db_lawf1== "NULL" && item.lawf1== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                            <Card>
                                                                    <View style={{flexDirection: 'row'}}>
                                                                        <Heading size='md' style={ globalStyles.infomaintitledit}>Member 1</Heading>
                                                                        
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
                                                                    <View style={ item.f_lname1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                    <View style={ item.gender1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                    <View style={ item.db_lawf1 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                                {item.db_lawf1 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db_lawf1}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                            </Card>
                                                        </View>

                                                        {/*Member 2*/}
                                                        <View style={ item.f_name2== "NULL" && item.f_lname2== "NULL" && item.db2== "NULL" && item.gender2== "NULL" && item.re2== "NULL" && item.db_lawf2== "NULL" && item.lawf2== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                            <Card>
                                                                    <View style={{flexDirection: 'row'}}>
                                                                        <Heading size='md' style={ globalStyles.infomaintitledit}>Member 2</Heading>
                                                                        
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
                                                                    <View style={ item.f_lname2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                    <View style={ item.gender2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                    <View style={ item.db_lawf2 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                        <Text style={globalStyles.profiledirtitle2}>
                                                                            <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                                {item.db_lawf2 == "NULL" 
                                                                                    ?
                                                                                        <Text></Text>
                                                                                    :
                                                                                        <Text style={globalStyles.varProfile}>{item.db_lawf2}</Text>
                                                                                }	
                                                                        </Text>
                                                                    </View>
                                                            </Card>
                                                        </View>

                                                    {/*Member 3*/}
                                                    <View style={ item.f_name3 == "NULL" && item.f_lname3 == "NULL" && item.db3 == "NULL" && item.gender3 == "NULL" && item.re3 == "NULL" && item.db_lawf3 == "NULL" && item.lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 3</Heading>
                                                                    
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
                                                                <View style={ item.f_lname3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf3 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf3 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf3}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 4*/}
                                                    <View style={ item.f_name4== "NULL" && item.f_lname4== "NULL" && item.db4== "NULL" && item.gender4== "NULL" && item.re4== "NULL" && item.db_lawf4== "NULL" && item.lawf4== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 4</Heading>
                                                                    
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
                                                                <View style={ item.f_lname4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf4 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf4 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf4}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 5*/}
                                                    <View style={ item.f_name5== "NULL" && item.f_lname5== "NULL" && item.db5== "NULL" && item.gender5== "NULL" && item.re5== "NULL" && item.db_lawf5== "NULL" && item.lawf5== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 5</Heading>
                                                                    
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
                                                                <View style={ item.f_lname5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf5 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf5 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf5}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 6*/}
                                                    <View style={ item.f_name6== "NULL" && item.f_lname6== "NULL" && item.db6== "NULL" && item.gender6== "NULL" && item.re6== "NULL" && item.db_lawf6== "NULL" && item.lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 6</Heading>
                                                                    
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
                                                                <View style={ item.f_lname6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf6 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf6 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf6}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 7*/}
                                                    <View style={ item.f_name7== "NULL" && item.f_lname7== "NULL" && item.db7== "NULL" && item.gender7== "NULL" && item.re7== "NULL" && item.db_lawf7== "NULL" && item.lawf7== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 7</Heading>
                                                                    
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
                                                                <View style={ item.f_lname7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf7 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf7 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf7}</Text>
                                                                            }	
                                                                    </Text>
                                                                </View>
                                                        </Card>
                                                    </View>

                                                    {/*Member 8*/}
                                                    <View style={ item.f_name8== "NULL" && item.f_lname8== "NULL" && item.db8== "NULL" && item.gender8== "NULL" && item.re8== "NULL" && item.db_lawf8== "NULL" && item.lawf8== "NULL" ? globalStyles.hideContents : globalStyles.show}>
                                                        <Card>
                                                                <View style={{flexDirection: 'row'}}>
                                                                    <Heading size='md' style={ globalStyles.infomaintitledit}>Member 8</Heading>
                                                                    
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
                                                                <View style={ item.f_lname8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.gender8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
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
                                                                <View style={ item.db_lawf8 == "NULL" ? globalStyles.hideContents : globalStyles.infoadditional}>
                                                                    <Text style={globalStyles.profiledirtitle2}>
                                                                        <Text style={ globalStyles.infotitle}>Date of Background Law: </Text>  
                                                                            {item.db_lawf8 == "NULL" 
                                                                                ?
                                                                                    <Text></Text>
                                                                                :
                                                                                    <Text style={globalStyles.varProfile}>{item.db_lawf8}</Text>
                                                                            }	
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