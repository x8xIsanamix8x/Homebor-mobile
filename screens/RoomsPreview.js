import React, {Component, useState} from 'react'; 
import { StyleSheet, View, ScrollView, Image, Text } from 'react-native';
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


class RoomsPreview extends Component { 

	constructor(props){
		super(props);
		this.state = {
		  email : '',
		  perm : false,
		  info : [],
		}
	  }
	
	  async componentDidMount(){
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
        //console.log(userLogin)
		let profile = await api.getRoominfo(this.state.email,this.state.perm)
		this.setState({ info : profile  })
        console.log("nuevo")
        console.log(this.state.info)
    


	  }

	render() {

	return ( 
        
		
		<FlatList
		data={this.state.info}
		keyExtractor={item => `${item.info}`}
		renderItem={({item}) => (
			<Container style={ globalStyles.contenedor} >
				
				<ScrollView nestedScrollEnabled={true} >
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
                        wrapperStyle={item.room1 && item.room1[0] && item.room1[0].title ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
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
                        <View style={styles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                        </View>
                        <View style={styles.collapsibleItem}>
                        <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room1 && item.room1[0] && item.room1[0].title}</Text>
                        </View>
                        <View style={styles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                            <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                        </View>
                        <View style={styles.collapsibleItem}>
                            <Text style={globalStyles.roomocuppiedStart}>{item.room1 && item.room1[0] && item.room1[0].start}</Text>
                            <Text style={globalStyles.roomocuppiedEnd}>{item.room1 && item.room1[0] && item.room1[0].end}</Text>
                        </View>
                        
                    </CollapsibleList>
                    <View style={item.data.date1 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
				</Card>
                </View>

                {/*ROOM 2*/}        
                <View>
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
                                wrapperStyle={item.room2 && item.room2[0] && item.room2[0].title ? globalStyles.wrapperCollapsibleList : globalStyles.hide_collapsible }
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
                                <View style={styles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppied}>This Room is Occupied by:</Text>
                                </View>
                                <View style={styles.collapsibleItem}>
                                <Text style={globalStyles.roomocuppiedName}>{"\n"}{item.room2 && item.room2[0] && item.room2[0].title}</Text>
                                </View>
                                <View style={styles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedArrive}>Arrive</Text>
                                    <Text style={globalStyles.roomocuppiedLeave}>Leave</Text>
                                </View>
                                <View style={styles.collapsibleItem}>
                                    <Text style={globalStyles.roomocuppiedStart}>{item.room2 && item.room2[0] && item.room2[0].start}</Text>
                                    <Text style={globalStyles.roomocuppiedEnd}>{item.room2 && item.room2[0] && item.room2[0].end}</Text>
                                </View>
                                
                            </CollapsibleList>
                        <View style={item.data.date2 != "Occupied" ? globalStyles.bordercolorAvalible : globalStyles.bordercolorOccupied }/>
                    </Card>
                </View>

				</ScrollView>
				
			</Container>          
		)}
		>

		</FlatList>
	)
};


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.1)"
    },
    wrapperCollapsibleList: {
      flex: 1,
      marginTop: 20,
      overflow: "hidden",
      backgroundColor: "#FFF",
      borderRadius: 5
    },
    collapsibleItem: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "#CCC",
      padding: 10
    }
  });

export default RoomsPreview;