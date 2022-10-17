import React, {Component, useState} from 'react'; 
import { View, Image, Text, RefreshControl, Dimensions, Platform } from 'react-native';
import { NativeBaseProvider, Heading, Spinner, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Box, AspectRatio, Stack, Fab, Icon  } from 'native-base';
import globalStyles from '../styles/global';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import NetInfo from "@react-native-community/netinfo";

export default class RoomsPreview extends Component {
    NetInfoSubscription = null;

    constructor(props){
        super(props);
        this.state = {
            //Variables 
            email : '',
            perm : false,
            info : [],
            refreshing: false,

            //Internet Connection
            connection_status: false,
            connection_refreshStatus: false,
            clockrun : false,

            //LoadingFirstTime
            readyDisplay : false, 
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener(this._handleConnectivityChange,)
    
        //Get user profile
        let userLogin = await AsyncStorage.getItem('userLogin')
        userLogin = JSON.parse(userLogin)
        this.setState({ email : userLogin.email, perm : userLogin.perm})
    
        if(this.state.connection_status == true) {
    
            //Get user profile data
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, loading : false, connection_refreshStatus: false, room1: profile[0].room1, room2: profile[0].room2, room3: profile[0].room3, room4: profile[0].room4, room5: profile[0].room5, room6: profile[0].room6, room7: profile[0].room7, room8: profile[0].room8})

            this.setState({readyDisplay : true})

        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Refresh function when open this screen
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
            this.onRefresh()
        });
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
        if(this.state.connection_status == true) {
            let profile = await api.getRoominfo(this.state.email,this.state.perm)
            this.setState({ info : profile, connection_refreshStatus: false})

            this.setState({readyDisplay : true, loading : false,})
            
        }else{
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

    }

    //Navigation
    navigateRoomsReserves = async () => {
        let idnoti2 = await AsyncStorage.getItem('idnoti2')
        idnoti2 = JSON.parse(idnoti2)
        this.setState({ idnoti2 : idnoti2})

        if (this.state.connection_status) {
            this.props.navigation.navigate('RoomsReserves')
        } else {
            Alert.alert('There is no internet connection, connect and try again.')
        }
    }

    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    tryAgainNotConnection = () => {
        this.setState({clockrun : true})
        this.Clock()
    }
    
    Clock = () => {
        this.timerHandle = setTimeout (() => {
          this.setState({clockrun : false});
          this.timerHandle = 0;
        }, 5000)
    }
    
    componentWillUnmount(){
        this.NetInfoSubscription && this.NetInfoSubscription()
        clearTimeout(this.timerHandle)
        this.timerHandle = 0;  
    }

    render() {
        return (
            <NativeBaseProvider>
				<StatusBar style="light" translucent={true} />
				<View>
				{this.state.readyDisplay == false && (
					<View>
                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
                                    <VStack flex="3" space="4">
                                    <Skeleton startColor="indigo.300" />
                                        <Skeleton.Text />
                                        <HStack space="2" alignItems="center">
                                            <Skeleton size="5" rounded="full" />
                                            <Skeleton h="3" flex="2" rounded="full" />
                                            <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>

                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
                                    <VStack flex="3" space="4">
                                    <Skeleton startColor="indigo.300" />
                                        <Skeleton.Text />
                                        <HStack space="2" alignItems="center">
                                            <Skeleton size="5" rounded="full" />
                                            <Skeleton h="3" flex="2" rounded="full" />
                                            <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>

                        <View style={globalStyles.skeletonMarginTop}>
                            <Center w="100%">
                                <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                    <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
                                    <VStack flex="3" space="4">
                                    <Skeleton startColor="indigo.300" />
                                        <Skeleton.Text />
                                        <HStack space="2" alignItems="center">
                                            <Skeleton size="5" rounded="full" />
                                            <Skeleton h="3" flex="2" rounded="full" />
                                            <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Center>
                        </View>

                        {Dimensions.get('window').width >= 414 &&(
                            <View>
                                <View style={globalStyles.skeletonMarginTop}>
                                    <Center w="100%">
                                        <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                                            <Skeleton flex="1" h="150" rounded="md" startColor="blue.300" />
                                            <VStack flex="3" space="4">
                                            <Skeleton startColor="indigo.300" />
                                                <Skeleton.Text />
                                                <HStack space="2" alignItems="center">
                                                    <Skeleton size="5" rounded="full" />
                                                    <Skeleton h="3" flex="2" rounded="full" />
                                                    <Skeleton h="3" flex="1" rounded="full" startColor="purple.300" />
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </Center>
                                </View>

                            </View>
                        )}
                    </View>
				)}

				{this.state.readyDisplay == true && (
					<View>
					{this.state.connection_refreshStatus != false && (
						<View>
                            {this.state.refreshing == true && (
                                <View style={globalStyles.spinnerRefreshInternet}>
                                    <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
                                </View>
						    )}

						<Slide in={!this.state.clockrun ? false : true} placement="top">
							{this.state.connection_status ?
							<AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100" >
								<VStack space={2} flexShrink={1} w="100%">
								<HStack flexShrink={1} space={2}  justifyContent="center">
									<Text color="emerald.600" fontWeight="medium">You are connected</Text>
								</HStack>
								</VStack>
							</AlertNativeBase>
							:
							<AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
								<VStack space={2} flexShrink={1} w="100%">
								<HStack flexShrink={1} space={2}  justifyContent="center">
									<Text color="error.600" fontWeight="medium">
									<AlertNativeBase.Icon />
									<Text> No Internet Connection</Text>
									</Text>
								</HStack>
								</VStack>
							</AlertNativeBase> 
							}
						</Slide>

						<View style={globalStyles.WelcomeImageMargin}>
							<Image 
							resizeMode="contain"
							source={require('../assets/img/empty/vacios-homebor-antena.png')}
							style={globalStyles.imageNotInternet} />
						</View>

						<View style={globalStyles.WelcomeTextandBoton}>
							<Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
							<Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
						</View>

						
                        <View>
                            <Text onPress={this.state.connection_status ? this.onRefresh : this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                        </View>
						
						</View>
					)}

					{this.state.connection_refreshStatus == false && (
						<View style={globalStyles.container}>
							<View>
								<Slide in={this.state.connection_status ? false : this.state.clockrun == false ? false : true} placement="top">
									<AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" status="error">
									<VStack space={2} flexShrink={1} w="100%">
										<HStack flexShrink={1} space={2}  justifyContent="center">
											<Text color="error.600" fontWeight="medium">
											<AlertNativeBase.Icon />
											<Text> No Internet Connection</Text>
											</Text>
										</HStack>
									</VStack>
									</AlertNativeBase>
								</Slide>

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
                                            <Stack py="5">

                                                {/*ROOM 1*/}
                                                <Stack mb="3%" style={item.data.proom1 == 'NULL' && item.data.food1 == 'NULL' && item.data.type1 == 'NULL' && item.data.aprox1 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom1 == "NULL" && item.data.proom1_2 == "NULL" && item.data.proom1_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom1_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom1_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#232159" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 1</Heading>
                                                                        </Center>
                                                                        {(item.data.date1 == 'Disable' || item.data.date1_2 == 'Disable' || item.data.date1_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 1}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(1))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox1 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox1}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type1 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type1}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food1 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food1}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 2*/}
                                                <Stack mb="3%" style={item.data.proom2 == 'NULL' && item.data.food2 == 'NULL' && item.data.type2 == 'NULL' && item.data.aprox2 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom2 == "NULL" && item.data.proom2_2 == "NULL" && item.data.proom2_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom2_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom2_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#982A72" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 2</Heading>
                                                                        </Center>
                                                                        {(item.data.date2 == 'Disable' || item.data.date2_2 == 'Disable' || item.data.date2_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 2}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(2))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox2 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox2}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type2 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type2}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food2 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food2}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 3*/}
                                                <Stack mb="3%" style={item.data.proom3 == 'NULL' && item.data.food3 == 'NULL' && item.data.type3 == 'NULL' && item.data.aprox3 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom3 == "NULL" && item.data.proom3_2 == "NULL" && item.data.proom3_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom3_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom3_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#394893" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 3</Heading>
                                                                        </Center>
                                                                        {(item.data.date3 == 'Disable' || item.data.date3_2 == 'Disable' || item.data.date3_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 3}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(3))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox3 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox3}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type3 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type3}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food3 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food3}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 4*/}
                                                <Stack mb="3%" style={item.data.proom4 == 'NULL' && item.data.food4 == 'NULL' && item.data.type4 == 'NULL' && item.data.aprox4 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom4 == "NULL" && item.data.proom4_2 == "NULL" && item.data.proom4_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom4_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom4_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#A54483" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 4</Heading>
                                                                        </Center>
                                                                        {(item.data.date4 == 'Disable' || item.data.date4_2 == 'Disable' || item.data.date4_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 4}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(4))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox4 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox4}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type4 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type4}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food4 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food4}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 5*/}
                                                <Stack mb="3%" style={item.data.proom5 == 'NULL' && item.data.food5 == 'NULL' && item.data.type5 == 'NULL' && item.data.aprox5 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom5 == "NULL" && item.data.proom5_2 == "NULL" && item.data.proom5_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom5_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom5_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#5D418D" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 5</Heading>
                                                                        </Center>
                                                                        {(item.data.date5 == 'Disable' || item.data.date5_2 == 'Disable' || item.data.date5_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 5}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(5))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox5 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox5}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type5 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type5}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food5 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food5}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 6*/}
                                                <Stack mb="3%" style={item.data.proom6 == 'NULL' && item.data.food6 == 'NULL' && item.data.type6 == 'NULL' && item.data.aprox6 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom6 == "NULL" && item.data.proom6_2 == "NULL" && item.data.proom6_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom6_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom6_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#392B84" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 6</Heading>
                                                                        </Center>
                                                                        {(item.data.date6 == 'Disable' || item.data.date6_2 == 'Disable' || item.data.date6_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 6}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(6))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox6 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox6}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type6 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type6}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food6 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food6}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 7*/}
                                                <Stack mb="3%" style={item.data.proom7 == 'NULL' && item.data.food7 == 'NULL' && item.data.type7 == 'NULL' && item.data.aprox7 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom7 == "NULL" && item.data.proom7_2 == "NULL" && item.data.proom7_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom7_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom7_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#B15391" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 7</Heading>
                                                                        </Center>
                                                                        {(item.data.date7 == 'Disable' || item.data.date7_2 == 'Disable' || item.data.date7_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 7}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(7))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox7 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox7}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type7 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type7}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food7 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food7}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>

                                                {/*ROOM 8*/}
                                                <Stack mb="3%" style={item.data.proom8 == 'NULL' && item.data.food8 == 'NULL' && item.data.type8 == 'NULL' && item.data.aprox8 == '0' ? globalStyles.hideContents : globalStyles.show }>
                                                    <Stack px="3">
                                                        <Card>
                                                            <Center mt="3%" w="100%">
                                                                <Box maxW="95%" overflow="hidden" borderRadius="md">
                                                                    <View>
                                                                        <AspectRatio w="100%" ratio={4 / 3}>
                                                                            <View>
                                                                                <Swiper showsButtons={false} showsPagination={false} autoplay={true} autoplayTimeout={3}>
                                                                                    {item.data.proom8 == "NULL" && item.data.proom8_2 == "NULL" && item.data.proom8_3 == "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={require("../assets/img/empty/vacios-homebor-habitacion.png")}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8_2 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8_2}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                    {item.data.proom8_3 != "NULL" && (
                                                                                        <Image
                                                                                        style={globalStyles.ProfileBannerImages}
                                                                                        source={{ uri: `http://homebor.com/${item.data.proom8_3}` }}
                                                                                        resizeMode="stretch"
                                                                                        />
                                                                                    )}
                                                                                </Swiper>
                                                                            </View>
                                                                        </AspectRatio>
                                                                        <Center bg="#B15391" position="absolute" bottom="0" px="1" py="0.5" borderRadius="md" mb="3%" ml="3%">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>Room 8</Heading>
                                                                        </Center>
                                                                        {(item.data.date8 == 'Disable' || item.data.date8_2 == 'Disable' || item.data.date8_3 == 'Disable') && (
                                                                             <Center bg="danger.600" ml="40%" position="absolute" borderRadius="md" bottom="80%" px="3" py="1.5">
                                                                                <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'md' : 'xs' : (Dimensions.get('window').width >= 414) ? 'md' : 'xs'} color='white'>This room is disable</Heading>
                                                                            </Center>
                                                                        )}
                                                                    </View>
                                                                </Box>
                                                            </Center>
                                                            <Stack mt={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "5%" : "15%" : (Dimensions.get('window').width >= 414) ? "5%" : "15%"} mb={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "0%" : "-10%" : (Dimensions.get('window').width >= 414) ? "0%" : "-10%"}>
                                                                <Center mr={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "-2%" : "-8%" : (Dimensions.get('window').width >= 414) ? "-3%" : "-8%"}>
                                                                    <Fab renderInPortal={false} onPress={ () =>this.navigateRoomsReserves( this.setState({idnoti2 : 8}, () => AsyncStorage.setItem('idnoti2',JSON.stringify(8))))} shadow={3} style={globalStyles.backgroundCircleInitReport} size="lg" icon={<Icon color="white" as={FontAwesome} name="sign-in" size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "4xl" : "lg" : (Dimensions.get('window').width >= 414) ? "4xl" : "lg"} />} />
                                                                </Center>
                                                            </Stack>
                                                            {item.data.aprox8 != 0 && (
                                                                <Center>
                                                                    <Heading size={(Platform.OS === 'ios') ? (Platform.isPad === true) ? 'lg' : 'md' : (Dimensions.get('window').width >= 414) ? 'lg' : 'md'}>CAD$ {item.data.aprox8}</Heading>
                                                                </Center>
                                                            )}
                                                            <Stack space="2" alignItems="center" w="95%">
                                                                <HStack space="2" alignItems="center" w="100%">
                                                                    <Center size="16" w="10%"></Center>
                                                                    <Center size="16" w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "15%" : "10%" : (Dimensions.get('window').width >= 414) ? "15%" : "10%"}>
                                                                     <Image
                                                                        source={require("../assets/img/roomIcon/acomodacion-16.png")}
                                                                        resizeMode="contain"
                                                                        style={globalStyles.roomPreviewicon}
                                                                     ></Image>
                                                                    </Center>
                                                                    <Stack w={(Platform.OS === 'ios') ? (Platform.isPad === true) ? "25%" : "30%" : (Dimensions.get('window').width >= 414) ? "25%" : "30%"}>
                                                                        {item.data.type8 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>Select</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.type8}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Tablets*/}
                                                                    {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                    <Center size="16" w="10%">
                                                                        <Image
                                                                            source={require("../assets/img/roomIcon/food-16.png")}
                                                                            resizeMode="contain"
                                                                            style={globalStyles.roomPreviewicon}
                                                                        ></Image>
                                                                    </Center>
                                                                    <Stack w="30%">
                                                                        {item.data.food8 == "NULL" ? 
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>No</Text>
                                                                        :
                                                                            <Text style={globalStyles.TypeAcomodationNativeBase}>{item.data.food8}</Text>
                                                                        }
                                                                    </Stack>

                                                                    {/*Phones*/}
                                                                    {(Dimensions.get('window').width < 414 || (Platform.isPad != true && Platform.OS != 'android')) && (
                                                                        <Center size="16" w="10%"></Center>
                                                                    )}
                                                                </HStack>
                                                            </Stack>
                                                        </Card>
                                                    </Stack>
                                                </Stack>
                                                
                                            </Stack>
                                        )}/>
								</View>
							</View>
					)}
					</View>
				)}
				</View>
			</NativeBaseProvider>
        )
    }

}