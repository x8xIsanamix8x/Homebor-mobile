import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl, Alert, Platform, Dimensions, Linking} from 'react-native';
import { NativeBaseProvider, Heading, Text, Spinner, Icon, Button, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, Divider } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import globalStyles from '../styles/global';
import NetInfo from "@react-native-community/netinfo";
import * as FileSystem from 'expo-file-system';

export default class Vouchers extends Component {
  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state = {
      //Variables 
      email : '',
      perm : false,
      info : [],
      refreshing: false,
      filterP : 'No',
      db1 : '',
      db2 : '',
      marked : [],

      //ComponentDidupdate function to stop
      voucher1 : -1,
      vouchers1 : 0,

      //Calendars DATE PICKERS
      date: new Date(),
      mode: 'date',
      show: false,
      date2: new Date(),
      mode2: 'date2',
      show2: false,

      //Internet Connection
      connection_status: false,
      connection_refreshStatus: false,
      clockrun : false,
      
      //LoadingFirstTime
      readyDisplay : false
    }
  }

  async componentDidMount(){
    this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange)

    //Get profile
    let userLogin = await AsyncStorage.getItem('userLogin')
    userLogin = JSON.parse(userLogin)
    this.setState({ email : userLogin.email, perm : userLogin.perm})

    if(this.state.connection_status == true) {
      //Get Reports list
      let voucherlist = await api.getVoucherlist(this.state.email, this.state.filterP)
      this.setState({ info : voucherlist, connection_refreshStatus: false, loading : false, vouchers : voucherlist[0].voucherlist})

      //Data for cache
      let cache = await AsyncStorage.getItem('voucherCache')
      cache = JSON.parse(cache)
      if(JSON.stringify(cache) !== JSON.stringify(voucherlist)) {
          await AsyncStorage.setItem('voucherCache',JSON.stringify(voucherlist))
      }

      this.ImagesCache()
      this.anotherFunc();

    } else {
      //Data for cache
      let cache = await AsyncStorage.getItem('voucherCache')
      cache = JSON.parse(cache)
      if(cache == null) {
          this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
      } else {
          let voucherlist = cache
          this.setState({ info : voucherlist, connection_refreshStatus: false, loading : false, vouchers : voucherlist[0].voucherlist})

          this.ImagesCache()
          this.anotherFunc();
      }
    }

    //Refresh function when open this screen
    this._onFocusListener = this.props.navigation.addListener('focus', () => {
      this.onActive()
      this.onRefresh()
    });

    this._onFocusListener = this.props.navigation.addListener('blur', () => {
      this.onRelease()
    });
  }

  ImagesCache = () => {
    this.state.vouchers != undefined && this.state.vouchers.map(async (item) => {
    
          const photoVoucher = `http://homebor.com/${item.photo}`;
          const pathVoucher = FileSystem.cacheDirectory + `${item.photo}`;
          this.setState ({ ruta : pathVoucher})
          const voucherImage = await FileSystem.getInfoAsync(pathVoucher);

          if (voucherImage.exists) {
            this.setState({
              [`${item.photo}`]: {uri: voucherImage.uri}
            })
    
          } else {

            const directoryInfo = await FileSystem.getInfoAsync(pathVoucher)
            if(!directoryInfo.exists) {

              await FileSystem.makeDirectoryAsync(pathVoucher, { intermediates: true }).then(async() => {
                const newPhomePhoto = await FileSystem.downloadAsync(photoVoucher, pathVoucher)
                this.setState({
                  [`${item.photo}`]: {uri: newPhomePhoto.uri}
                })

              });

            } else {

              const newPhomePhoto = await FileSystem.downloadAsync(photoVoucher, pathVoucher)
              this.setState({
                [`${item.photo}`]: {uri: newPhomePhoto.uri}
              })

            }
            
          }
      
      
    })
  }

  //Function to create an array to order the vouchers by dates
  anotherFunc = () => { 
    if(this.state.vouchers != undefined){
      let nextDay2 = this.state.vouchers
      let obj = nextDay2.reduce((acc, dt) => {
    
      const dateAcc = acc[dt.dates]
            


      if (!dateAcc) {
          acc[dt.dates] = {
              vouchersinfo: [{ 
                  dates: dt.dates, 
                  email : dt.email, 
                  id_v : dt.id_v,
                  link : dt.link,
                  photo : dt.photo,
                  sender : dt.sender,
                  title : dt.title,
                  user : dt.user,
                }]
            }
      } else {
          acc[dt.dates].vouchersinfo.push({ dates: dt.dates, email : dt.email, id_v : dt.id_v, link : dt.link, photo : dt.photo, sender : dt.sender, title : dt.title, user : dt.user,})
      }


      return acc }, {});
      
      this.setState({ marked : obj, readyDisplay : true});
    } else {
      this.setState({readyDisplay : true});
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if(this.state.voucher1 !== this.state.vouchers1){
      if(this.state.connection_status == true) {
        if (prevState.vouchers !== this.state.vouchers) {
          let voucherlist = await api.getVoucherlist(this.state.email, this.state.filterP)
          this.setState({ info : voucherlist, loading : false, vouchers : voucherlist[0].voucherlist})
          this.anotherFunc();
        }
      }
    }
  }

  //Function to run or stop the component did update
  onActive = () => { this.setState({ voucher1 : -1, vouchers1 : 0 }); }
        
  onRelease = () => { this.setState({ voucher1 : 0, vouchers1 : 0 }); }

  //Refresh call function
  onRefresh = () => {
    this.setState({ refreshing: true });
      this.refresh().then(() => {
          this.setState({ refreshing: false });
      });
  }

  //Refresh function
  refresh = async() => {
    if(this.state.connection_status == true) {
      this.setState({ filterP : 'No', db1 : '' , db2 : ''});
      
      //Get Reports list
      let voucherlist = await api.getVoucherlist(this.state.email, this.state.filterP)
      this.setState({ info : voucherlist, loading : false, vouchers : voucherlist[0].voucherlist})

      //Data for cache
      let cache = await AsyncStorage.getItem('voucherCache')
      cache = JSON.parse(cache)
      if(JSON.stringify(cache) !== JSON.stringify(voucherlist)) {
          await AsyncStorage.setItem('voucherCache',JSON.stringify(voucherlist))
      }

      this.ImagesCache()
      this.anotherFunc();
    } else {
      //Data for cache
      let cache = await AsyncStorage.getItem('voucherCache')
      cache = JSON.parse(cache)
      if(cache == null) {
          this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
      } else {
          let voucherlist = cache
          this.setState({ info : voucherlist, connection_refreshStatus: false, loading : false, vouchers : voucherlist[0].voucherlist})

          this.ImagesCache()
          this.anotherFunc();
      }
    }
  }

  //Internet function
  _handleConnectivityChange = (state) => {
    this.setState({ connection_status: state.isConnected, clockrun : true });
    this.Clock()
  }

  //Timer of internet when state changes
  Clock = () => {
    this.timerHandle = setTimeout (() => {
      this.setState({clockrun : false});
      this.timerHandle = 0;
    }, 5000)
  }

  //Function when user doesn't have internet
  noInternetConnection = () => {
    Alert.alert('There is no internet connection, connect and try again.')
  }

  //Function to run the timer again
  tryAgainNotConnection = () => {
    this.setState({clockrun : true})
    this.Clock()
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
                    <VStack flex="3" space="4">
                      <Skeleton startColor="indigo.300" />
                    </VStack>
                  </HStack>
                </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                  <VStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                      <HStack w="90%" space={8} rounded="md">
                          <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                          <VStack flex="3" space="4">
                              <Skeleton.Text />
                          </VStack>
                      </HStack>
                      <View style={globalStyles.skeletonMarginTopVoucher}>
                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                      </View>
                  </VStack>
                </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                      <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                          <VStack flex="3" space="4">
                          <Skeleton startColor="indigo.300" />
                          </VStack>
                      </HStack>
                  </Center>
              </View>

              <View style={globalStyles.skeletonMarginTop}>
                  <Center w="100%">
                    <VStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}} p="4">
                        <HStack w="90%" space={8} rounded="md">
                            <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                            <VStack flex="3" space="4">
                                <Skeleton.Text />
                            </VStack>
                        </HStack>
                        <View style={globalStyles.skeletonMarginTopVoucher}>
                          <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                        </View>
                      </VStack>
                  </Center>
              </View>

              {(Dimensions.get('window').width >= 414 && (Platform.isPad === true || Platform.OS === 'android')) && (
                <View style={globalStyles.skeletonMarginTop}>
                    <Center w="100%">
                      <VStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                        borderColor: "coolGray.500"
                        }} _light={{
                        borderColor: "coolGray.200"
                        }} p="4">
                          <HStack w="90%" space={8} rounded="md">
                              <Skeleton flex="1" h="70" mt="-1" rounded="full" borderColor="coolGray.200" endColor="warmGray.50" />
                              <VStack flex="3" space="4">
                                  <Skeleton.Text />
                              </VStack>
                          </HStack>
                          <View style={globalStyles.skeletonMarginTopVoucher}>
                            <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                          </View>
                        </VStack>
                    </Center>
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
                  <ImageBackground source={require('../assets/img/backgrounds/payments.jpg')} style={globalStyles.ImageBackgroundNoti}>
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
                        renderItem={({}) => (
                          <View>
                            {Object.keys(this.state.marked).length == 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any voucher</Text></Card><View style={globalStyles.WelcomeImageMargin}><Image resizeMode="contain" source={require('../assets/img/empty/vacios-homebor-sin-mensaje.png')} style={globalStyles.imageNotInternet}/></View></View> : Object.keys(this.state.marked).map(date => (
                              <View key={date} style={globalStyles.ReportFeedbackMargins}>
                                <Card>
                                  <View style={globalStyles.inlineData}>
                                    <Text style={globalStyles.infosubtitle}>{date}</Text>
                                  </View>
                                </Card>

                                <View>
                                  {this.state.marked[date].vouchersinfo.map(vouchersinfo => 
                                    <View key={vouchersinfo.id_v}>       
                                      <Card>
                                        <HStack>
                                          <VStack>
                                            <Avatar size="lg" bg="#232159" style={globalStyles.Avatarvouchers} source={ vouchersinfo.photo != "NULL" && this.state[vouchersinfo.photo]}>{vouchersinfo.sender.toUpperCase().charAt(0)}</Avatar>
                                          </VStack>
                                          <VStack ml="10%" w="70%" py="3">
                                            <Text style={globalStyles.ReportInitBoldText}>{vouchersinfo.title}</Text>
                                          </VStack>
                                        </HStack>
                                        <Divider my="2" bg="gray.500"/>
                                        <Center>
                                          <View style={globalStyles.inlineDataVoucherButton}>
                                            <Button style={globalStyles.ButtonViewVoucher} onPress={this.state.connection_status ? () => Linking.openURL(`https://homebor.com/homestay/voucher/${vouchersinfo.link}?art_id=${vouchersinfo.id_v}`) : () => this.noInternetConnection() }><Icon as={Ionicons} name="eye" size="5" style={globalStyles.VoucherviewIcons}> View</Icon></Button>
                                          </View>
                                        </Center>
                                      </Card>
                                    </View>
                                  )}
                                </View>
                              </View>
                            ))}
                          </View>
                        )}
                      />  
                    </View>
                  </ImageBackground>
                </View>
              )}
            </View>
          )}
        </View>
      </NativeBaseProvider>
    )
  }
}