import React, {Component, useState} from 'react'; 
import { View, ScrollView, Image, Text, RefreshControl } from 'react-native';
import { NativeBaseProvider, Heading, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import CollapsibleList from "react-native-collapsible-list";
import { AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

export default class RoomsPreview extends Component {

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
		let profile = await api.getRoominfo(this.state.email,this.state.perm)
		this.setState({ info : profile, loading : false })

        //Variables of collapsibles
        this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false"})
	  }

      //Function call for refresh
      onRefresh = () => {
        this.setState({ refreshing: true });
        this.refresh().then(() => {
            this.setState({ refreshing: false });
        });
        }

        //Function refresh
        refresh = async() => {
            //Get user profile
            let userLogin = await AsyncStorage.getItem('userLogin')
            userLogin = JSON.parse(userLogin)
            this.setState({ email : userLogin.email, perm : userLogin.perm})

            //Reload profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false })

            //Variables of collapsibles
            this.setState({collapse1 : "false", collapse2 : "false", collapse3 : "false", collapse4 : "false", collapse5 : "false", collapse6 : "false", collapse7 : "false", collapse8 : "false"})
          }
        
        //Group of functions to changes the arrows of collapsibles
        collapse1 = async() => {
            this.setState({collapse1 : "true"})
        }

        collapsehide1 = async() => {
            this.setState({collapse1 : "false"})
        }

        collapse2 = async() => {
            this.setState({collapse2 : "true"})
        }

        collapsehide2 = async() => {
            this.setState({collapse2 : "false"})
        }

        collapse3 = async() => {
            this.setState({collapse3 : "true"})
        }

        collapsehide3 = async() => {
            this.setState({collapse3 : "false"})
        }

        collapse4 = async() => {
            this.setState({collapse4 : "true"})
        }

        collapsehide4 = async() => {
            this.setState({collapse4 : "false"})
        }

        collapse5 = async() => {
            this.setState({collapse5 : "true"})
        }

        collapsehide5 = async() => {
            this.setState({collapse5 : "false"})
        }

        collapse6 = async() => {
            this.setState({collapse6 : "true"})
        }

        collapsehide6 = async() => {
            this.setState({collapse6 : "false"})
        }

        collapse7 = async() => {
            this.setState({collapse7 : "true"})
        }

        collapsehide7 = async() => {
            this.setState({collapse7 : "false"})
        }

        collapse8 = async() => {
            this.setState({collapse8 : "true"})
        }

        collapsehide8 = async() => {
            this.setState({collapse8 : "false"})
        }


  render() {

        //Variables of collapsibles
        let collapse1 = this.state.collapse1
        let collapse2 = this.state.collapse2
        let collapse3 = this.state.collapse3
        let collapse4 = this.state.collapse4
        let collapse5 = this.state.collapse5
        let collapse6 = this.state.collapse6
        let collapse7 = this.state.collapse7
        let collapse8 = this.state.collapse8
    
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
				
                        <ScrollView nestedScrollEnabled={true}>

                            {/*ROOM 1*/}
                            <View style={item.data.proom1 == 'NULL' && item.data.date1 == 'NULL' && item.data.food1 == 'NULL' && item.data.type1 == 'NULL' && item.data.bed1 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                            <Card>
                            <Heading size='xl' style={ globalStyles.titleRooms}>Room 1</Heading>
                            <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox1}</Heading>
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
                                        this.state.collapse1 === "false" ?
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse1}>
                                            <Text style={globalStyles.buttonTextroom}>
                                                <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                    {'       '}Room Occupied{'       '}
                                                <AntDesign name="down" style={globalStyles.arrowLeft} />
                                            </Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide1}>
                                            <Text style={globalStyles.buttonTextroom}>
                                                <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                {'       '}Room Occupied{'       '}
                                                <AntDesign name="up" style={globalStyles.arrowLeft} />
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                    >
                                    <View style={globalStyles.collapsibleItem}>
                                        <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                    </View>
                                    {!item.room1 ? null : item.room1.map(room1 =>
                                                <View key={!room1.id_e ? null : room1.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room1.title ? null : room1.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room1.start ? null :room1.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room1.end ? null :room1.end}</Text>
                                                    </View>
                                                </View>                  
                                            )} 
                                </CollapsibleList>
                                <View style={item.data.date1 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                            </Card>
                            </View>

                            {/*ROOM 2*/}        
                            <View style={item.data.proom2 == 'NULL' && item.data.date2 == 'NULL' && item.data.food2 == 'NULL' && item.data.type2 == 'NULL' && item.data.bed2 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 2</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox2}</Heading>
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
                                                this.state.collapse2 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse2}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide2}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            
                                            
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room2 ? null : item.room2.map(room2 =>
                                                <View key={!room2.id_e ? null : room2.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room2.title ? null : room2.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room2.start ? null :room2.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room2.end ? null :room2.end}</Text>
                                                    </View>
                                                </View>                  
                                            )}                   
                                        </CollapsibleList>
                                    <View style={item.data.date2 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>

                            {/*ROOM 3*/}        
                            <View style={item.data.proom3 == 'NULL' && item.data.date3 == 'NULL' && item.data.food3 == 'NULL' && item.data.type3 == 'NULL' && item.data.bed3 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 3</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox3}</Heading>
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
                                                this.state.collapse3 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse3}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide3}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room3 ? null : item.room3.map(room3 =>
                                                <View key={!room3.id_e ? null : room3.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room3.title ? null : room3.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room3.start ? null :room3.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room3.end ? null :room3.end}</Text>
                                                    </View>
                                                </View>                  
                                            )} 
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date3 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>

                            {/*ROOM 4*/}        
                            <View style={item.data.proom4 == 'NULL' && item.data.date4 == 'NULL' && item.data.food4 == 'NULL' && item.data.type4 == 'NULL' && item.data.bed4 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 4</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox4}</Heading>
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
                                                this.state.collapse4 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse4}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide4}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room4 ? null : item.room4.map(room4 =>
                                                <View key={!room4.id_e ? null : room4.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room4.title ? null : room4.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room4.start ? null :room4.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room4.end ? null :room4.end}</Text>
                                                    </View>
                                                </View>                  
                                            )} 
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date4 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>

                            {/*ROOM 5*/}        
                            <View style={item.data.proom5 == 'NULL' && item.data.date5 == 'NULL' && item.data.food5 == 'NULL' && item.data.type5 == 'NULL' && item.data.bed5 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 5</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox5}</Heading>
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
                                                this.state.collapse5 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse5}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide5}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room5 ? null : item.room5.map(room5 =>
                                                <View key={!room5.id_e ? null : room5.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room5.title ? null : room5.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room5.start ? null :room5.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room5.end ? null :room5.end}</Text>
                                                    </View>
                                                </View>                  
                                            )}
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date5 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>

                            {/*ROOM 6*/}        
                            <View style={item.data.proom6 == 'NULL' && item.data.date6 == 'NULL' && item.data.food6 == 'NULL' && item.data.type6 == 'NULL' && item.data.bed6 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 6</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox6}</Heading>
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
                                                this.state.collapse6 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse6}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide6}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room6 ? null : item.room6.map(room6 =>
                                                <View key={!room6.id_e ? null : room6.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room6.title ? null : room6.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room6.start ? null :room6.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room6.end ? null :room6.end}</Text>
                                                    </View>
                                                </View>                  
                                            )}
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date6 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>

                            {/*ROOM 7*/}        
                            <View style={item.data.proom7 == 'NULL' && item.data.date7 == 'NULL' && item.data.food7 == 'NULL' && item.data.type7 == 'NULL' && item.data.bed7 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 7</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox7}</Heading>
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
                                                this.state.collapse7 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse7}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide7}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room7 ? null : item.room7.map(room7 =>
                                                <View key={!room7.id_e ? null : room7.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room7.title ? null : room7.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room7.start ? null :room7.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room7.end ? null :room7.end}</Text>
                                                    </View>
                                                </View>                  
                                            )}
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date7 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>


                            {/*ROOM 8*/}        
                            <View style={item.data.proom8 == 'NULL' && item.data.date8 == 'NULL' && item.data.food8 == 'NULL' && item.data.type8 == 'NULL' && item.data.bed8 == 'NULL' ? globalStyles.hideContents : globalStyles.show }>
                                <Card>
                                    <Heading size='xl' style={ globalStyles.titleRooms }>Room 8</Heading>
                                    <Heading size='xl' style={ globalStyles.priceRooms1}>CAD$ {item.data.aprox8}</Heading>
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
                                                this.state.collapse8 === "false" ?
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapse8}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="down" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity style={globalStyles.buttonroom} onPress={this.collapsehide8}>
                                                        <Text style={globalStyles.buttonTextroom}>
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                                {'       '}Room Occupied{'       '}
                                                            <AntDesign name="up" style={globalStyles.arrowLeft} />
                                                        </Text>
                                                    </TouchableOpacity>
                                            }
                                            >
                                            <View style={globalStyles.collapsibleItem}>
                                                <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                            </View>
                                            {!item.room8 ? null : item.room8.map(room8 =>
                                                <View key={!room8.id_e ? null : room8.id_e}> 
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{!room8.title ? null : room8.title}</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                                        <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                                    </View>
                                                    <View style={globalStyles.collapsibleItem}>
                                                        <Text style={globalStyles.roomocuppiedStart}>{!room8.start ? null :room8.start}</Text>
                                                        <Text style={globalStyles.roomocuppiedEnd}>{!room8.end ? null :room8.end}</Text>
                                                    </View>
                                                </View>                  
                                            )}
                                            
                                        </CollapsibleList>
                                    <View style={item.data.date8 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                                </Card>
                            </View>
                            <View style={globalStyles.marginBottonroom}></View>

                        </ScrollView>
				
                        
                          
                    </NativeBaseProvider>
                )}> 
            </FlatList>
       
  );
}
}