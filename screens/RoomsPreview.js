import React, {Component, useState} from 'react'; 
import { StyleSheet, View, ScrollView, Image, Text, RefreshControl } from 'react-native';
import { Container, Button, H1 } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import { Font, AppLoading } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import CollapsibleList from "react-native-collapsible-list";
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import {Spinner} from 'native-base';

class RoomsPreview extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
          loading : true,
          refreshing: false,
		}
	  }

    onRefresh = () => {
    this.setState({ refreshing: true });
    this.getData().then(() => {
        this.setState({ refreshing: false });
    });
    }
	
	  async componentDidMount(){
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})

        //console.log(userLogin)

		let profile = await api.getRoominfo(this.state.email,this.state.perm)
		this.setState({ info : profile, loading : false })
        console.log("nuevo")
        console.log(this.state.info)
	  }


	render() {

	return ( 
        
		
		<FlatList
		data={this.state.info}
        extraData={this.state}
        ListFooterComponent={() => this.state.loading ? <Spinner color="purple" style={ globalStyles.spinner2}/> : null}
        keyExtractor={item => `${item.info}`}
        refreshControl={
            <RefreshControl
               refreshing={this.state.refreshing}
               onRefresh={this.onRefresh}
               tintColor="red"
               colors={["red","green"]}
               size={RefreshControl.SIZE.LARGE}
           />
        }
		renderItem={({item}) => (
			<Container style={ globalStyles.contenedor} >
				
				<ScrollView nestedScrollEnabled={true}>
                    {/*ROOM 1*/}
                <View style={item.data.proom1 == 'NULL' && item.data.date1 == 'NULL' && item.data.food1 == 'NULL' && item.data.type1 == 'NULL' && item.data.bed1 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                <Card>
                  <H1 style={ globalStyles.titleRooms}>Room 1</H1>
                  <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox1}</H1>
                  <View style={ globalStyles.underlinig }/>
                    {/*If user only has one Image */}
                        <Image
                        source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                        resizeMode="contain"
                        style={item.data.proom1 != "NULL" && item.data.proom1_2 == "NULL" && item.data.proom1_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                        ></Image>
                    {/*If User only has two images*/}
                    <Swiper style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                        <View style={globalStyles.slideroomPreview}>
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                            resizeMode="contain"
                            style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>
                        </View>
                        <View style={globalStyles.slideroomPreview}>
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom1_2}` }}
                            resizeMode="contain"
                            style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>
                        </View>
                    </Swiper>
                    
                    {/*If User has the three images images*/}
                    <Swiper style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                        <View style={globalStyles.slideroomPreview}>
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                            resizeMode="contain"
                            style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>
                        </View>
                        <View style={globalStyles.slideroomPreview}>
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom1_2}` }}
                            resizeMode="contain"
                            style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>
                        </View>
                        <View style={globalStyles.slideroomPreview}>
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom1_3}` }}
                            resizeMode="contain"
                            style={item.data.proom1 != "NULL" && item.data.proom1_2 != "NULL" && item.data.proom1_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>
                        </View>
                    </Swiper>
                    <View style={globalStyles.infocol2right}>
                                            <Image
                                            source={require("../assets/acomodacion-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.imageroom4}
                                            ></Image>
                                            <View style={globalStyles.shareAcomodationStack}>  
                                                 <Text style={globalStyles.shareAcomodation}>{item.data.type1}</Text>   
                                            </View>
                                            <Image
                                            source={require("../assets/food-16.png")}
                                            resizeMode="contain"
                                            style={globalStyles.imageroom2}
                                            ></Image>
                                                <Text style={globalStyles.food}>{item.data.food1}</Text>
                                            <View style={globalStyles.image5Row}>
                                            <Image
                                                source={require("../assets/cama-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.imageroom5}
                                            ></Image>
                                            <View style={globalStyles.bedStack}>
                                                <Text style={globalStyles.bed}>{item.data.bed1}</Text>
                                                <Image
                                                source={require("../assets/disponibilidad-16.png")}
                                                resizeMode="contain"
                                                style={globalStyles.imageroom3}
                                                ></Image>
                                                <Text style={globalStyles.disponibility}>{item.data.date1}</Text>
                                            </View>
                                            </View>
                    </View>
                    <CollapsibleList
                        numberOfVisibleItems={0}
                        wrapperStyle={item.data.date1 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                        buttonContent={
                            <View style={globalStyles.buttonroom}>
                                <Text style={globalStyles.buttonTextroom}>
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        Room Occupied
                                    <AntDesign name="down" style={globalStyles.arrowLeft} />
                                </Text>
                            </View>
                        }
                        >
                        <View style={globalStyles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                        </View>
                        <View style={globalStyles.collapsibleItem}>                      
                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room1 && item.room1[0] && item.room1[0].title}</Text>
                        </View>
                        <View style={globalStyles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                            <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                        </View>
                        <View style={globalStyles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppiedStart}>{item.room1 && item.room1[0] && item.room1[0].start}</Text>
                            <Text style={globalStyles.roomocuppiedEnd}>{item.room1 && item.room1[0] && item.room1[0].end}</Text>
                        </View>
                        
                    </CollapsibleList>
                    <View style={item.data.date1 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
				</Card>
                </View>

                {/*ROOM 2*/}        
                <View style={item.data.proom2 == 'NULL' && item.data.date2 == 'NULL' && item.data.food2 == 'NULL' && item.data.type2 == 'NULL' && item.data.bed2 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 2</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox2}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                            resizeMode="contain"
                            style={item.data.proom2 != "NULL" && item.data.proom2_2 == "NULL" && item.data.proom2_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom2_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom2_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom2_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom2 != "NULL" && item.data.proom2_2 != "NULL" && item.data.proom2_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type2}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food2}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed2}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date2}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date2 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room2 && item.room2[0] && item.room2[0].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room2 && item.room2[0] && item.room2[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room2 && item.room2[0] && item.room2[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date2 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

                {/*ROOM 3*/}        
                <View style={item.data.proom3 == 'NULL' && item.data.date3 == 'NULL' && item.data.food3 == 'NULL' && item.data.type3 == 'NULL' && item.data.bed3 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 3</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox3}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                            resizeMode="contain"
                            style={item.data.proom3 != "NULL" && item.data.proom3_2 == "NULL" && item.data.proom3_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom3!= "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom3 != "NULL" && item.data.proom3_2 != "NULL" && item.data.proom3_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type3}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food3}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed3}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date3}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date3 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room3 && item.room3[0] && item.room3[0].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room3 && item.room3[0] && item.room3[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room3 && item.room3[0] && item.room3[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date3 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

                {/*ROOM 4*/}        
                <View style={item.data.proom4 == 'NULL' && item.data.date4 == 'NULL' && item.data.food4 == 'NULL' && item.data.type4 == 'NULL' && item.data.bed4 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 4</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox4}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                            resizeMode="contain"
                            style={item.data.proom4 != "NULL" && item.data.proom4_2 == "NULL" && item.data.proom4_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom4}` }}
                                    resizeMode="contain"
                                    style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom4_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom4}` }}
                                    resizeMode="contain"
                                    style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom4_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom4_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom4 != "NULL" && item.data.proom4_2 != "NULL" && item.data.proom4_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type4}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food4}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed4}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date4}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date4 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room4 && item.room4[1] && item.room4[1].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room4 && item.room4[1] && item.room4[1].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room4 && item.room4[1] && item.room4[1].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date4 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

                {/*ROOM 5*/}        
                <View style={item.data.proom5 == 'NULL' && item.data.date5 == 'NULL' && item.data.food5 == 'NULL' && item.data.type5 == 'NULL' && item.data.bed5 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 5</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox5}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom5}` }}
                            resizeMode="contain"
                            style={item.data.proom5 != "NULL" && item.data.proom5_2 == "NULL" && item.data.proom5_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom5}` }}
                                    resizeMode="contain"
                                    style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom5_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom5_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom5_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom5 != "NULL" && item.data.proom5_2 != "NULL" && item.data.proom5_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type5}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food5}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed5}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date5}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date5 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room5 && item.room5[0] && item.room5[0].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room5 && item.room5[0] && item.room5[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room5 && item.room5[0] && item.room5[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date5 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

                {/*ROOM 6*/}        
                <View style={item.data.proom6 == 'NULL' && item.data.date6 == 'NULL' && item.data.food6 == 'NULL' && item.data.type6 == 'NULL' && item.data.bed6 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 6</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox6}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                            resizeMode="contain"
                            style={item.data.proom6 != "NULL" && item.data.proom6_2 == "NULL" && item.data.proom6_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                                    resizeMode="contain"
                                    style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom6_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                                    resizeMode="contain"
                                    style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom6_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom6_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom6 != "NULL" && item.data.proom6_2 != "NULL" && item.data.proom6_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type6}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food6}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed6}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date6}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date6 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room6 && item.room6[3] && item.room6[3].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room6 && item.room6[3] && item.room6[3].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room6 && item.room6[3] && item.room6[3].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date6 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

                {/*ROOM 7*/}        
                <View style={item.data.proom7 == 'NULL' && item.data.date7 == 'NULL' && item.data.food7 == 'NULL' && item.data.type7 == 'NULL' && item.data.bed7 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 7</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox7}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                            resizeMode="contain"
                            style={item.data.proom7 != "NULL" && item.data.proom7_2 == "NULL" && item.data.proom7_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                                    resizeMode="contain"
                                    style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom7_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                                    resizeMode="contain"
                                    style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom7_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom7_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom7 != "NULL" && item.data.proom7_2 != "NULL" && item.data.proom7_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type7}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food7}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed7}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date7}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date7 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room7 && item.room7[0] && item.room7[0].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room7 && item.room7[0] && item.room7[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room7 && item.room7[0] && item.room7[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date7 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>


                {/*ROOM 8*/}        
                <View style={item.data.proom8 == 'NULL' && item.data.date8 == 'NULL' && item.data.food8 == 'NULL' && item.data.type8 == 'NULL' && item.data.bed8 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                    <Card>
                        <H1 style={ globalStyles.titleRooms }>Room 8</H1>
                        <H1 style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox8}</H1>
                        <View style={ globalStyles.underlinig }/>
                            {/*If user only has one Image */}
                            <Image
                            source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                            resizeMode="contain"
                            style={item.data.proom8 != "NULL" && item.data.proom8_2 == "NULL" && item.data.proom8_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                            ></Image>

                            {/*If User only has two images*/}
                            <Swiper style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 == "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                                    resizeMode="contain"
                                    style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom8_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 == "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            {/*If User has the three images images*/}
                            <Swiper style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 != "NULL" ? globalStyles.showsliderRoompreview : globalStyles.hideContents } showsButtons={false} showsPagination={false} autoplay={true}>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                                    resizeMode="contain"
                                    style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom8_2}` }}
                                    resizeMode="contain"
                                    style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                                <View style={globalStyles.slideroomPreview}>
                                    <Image
                                    source={{ uri: `http://homebor.com/${item.data.proom8_3}` }}
                                    resizeMode="contain"
                                    style={item.data.proom8 != "NULL" && item.data.proom8_2 != "NULL" && item.data.proom8_3 != "NULL" ? globalStyles.imageroom6 : globalStyles.hide }
                                    ></Image>
                                </View>
                            </Swiper>

                            <View style={globalStyles.infocol2right}>
                                <Image
                                source={require("../assets/acomodacion-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom4}
                                ></Image>
                                <View style={globalStyles.shareAcomodationStack}>  
                                        <Text style={globalStyles.shareAcomodation}>{item.data.type8}</Text>   
                                </View>
                                <Image
                                source={require("../assets/food-16.png")}
                                resizeMode="contain"
                                style={globalStyles.imageroom2}
                                ></Image>
                                    <Text style={globalStyles.food}>{item.data.food8}</Text>
                                <View style={globalStyles.image5Row}>
                                <Image
                                    source={require("../assets/cama-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom5}
                                ></Image>
                                <View style={globalStyles.bedStack}>
                                    <Text style={globalStyles.bed}>{item.data.bed8}</Text>
                                    <Image
                                    source={require("../assets/disponibilidad-16.png")}
                                    resizeMode="contain"
                                    style={globalStyles.imageroom3}
                                    ></Image>
                                    <Text style={globalStyles.disponibility}>{item.data.date8}</Text>
                                </View>
                                </View>
                            </View>

                            <CollapsibleList
                                numberOfVisibleItems={0}
                                wrapperStyle={item.data.date8 == 'Occupied' ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
                                buttonContent={
                                    <View style={globalStyles.buttonroom}>
                                        <Text style={globalStyles.buttonTextroom}>
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                Room Occupied
                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                        </Text>
                                    </View>
                                }
                                >
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room8 && item.room8[0] && item.room8[0].title}</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={globalStyles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room8 && item.room8[0] && item.room8[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room8 && item.room8[0] && item.room8[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date8 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>
                <View style={globalStyles.marginBottonroom}></View>

				</ScrollView>
				
			</Container>          
		)}
		>

		</FlatList>
	)
};


}

export default RoomsPreview;