import React, { Component, useState} from 'react';
import { View, Image, ScrollView, ImageBackground, RefreshControl, Alert, Platform, Dimensions, Linking} from 'react-native'
import { NativeBaseProvider, Heading, Text, Spinner, Icon, Button, Avatar, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center } from 'native-base';
import Card from '../shared/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { StatusBar } from 'expo-status-bar';

import globalStyles from '../styles/global';

import NetInfo from "@react-native-community/netinfo";

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

          report1 : -1,
          reports1 : 0,

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

          this.anotherFunc();

        } else {
          this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
        }

        //Refresh function when open this screen
        this._onFocusListener = this.props.navigation.addListener('focus', () => {
          this.onActive()
          this.onRefresh()
        });

	  }

    anotherFunc = () => { 
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


      return acc
      }, {});
      this.setState({ marked : obj, readyDisplay : true});
      
  }

      async componentDidUpdate(prevProps, prevState) {
        if(this.state.report1 !== this.state.reports1){
          if(this.state.connection_status == true) {
            if (prevState.vouchers !== this.state.vouchers) {
              let voucherlist = await api.getVoucherlist(this.state.email, this.state.filterP)
              this.setState({ info : voucherlist, loading : false, vouchers : voucherlist[0].voucherlist})
      
              this.anotherFunc();
            }
          }
        }
      }

      onActive = () => { this.setState({ report1 : -1, reports1 : 0 }); }
        
      onRelease = () => { this.setState({ report1 : 0, reports1 : 0 }); }

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

            this.anotherFunc();
          } else {
            this.setState({connection_refreshStatus: true, loading : false, readyDisplay : true})
          }
        }

          _handleConnectivityChange = (state) => {
            this.setState({ connection_status: state.isConnected, clockrun : true });
            this.Clock()
          }
        
          Clock = () => {
            this.timerHandle = setTimeout (() => {
              this.setState({clockrun : false});
              this.timerHandle = 0;
            }, 5000)
          }

          noInternetConnection = () => {
            Alert.alert('There is no internet connection, connect and try again.')
          }

          tryAgainNotConnection = () => {
            this.setState({clockrun : true})
            this.Clock()
          }
        
          componentWillUnmount(){
            this.NetInfoSubscription && this.NetInfoSubscription()
            clearTimeout(this.timerHandle)
            this.timerHandle = 0;
            this._onFocusListener = this.props.navigation.addListener('blur', () => {
              this.onRelease()
            });
          }

  render() {

        
  return (
    <NativeBaseProvider>
      <View>
      {this.state.readyDisplay == false && (
          <View>

            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }} p="4">
                        <VStack flex="3" space="4">
                        <Skeleton startColor="indigo.300" />
                        </VStack>
                    </HStack>
                </Center>
            </View>

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

            <View style={globalStyles.skeletonMarginTop}>
                <Center w="100%">
                    <HStack w="90%" borderWidth="1" space={8} rounded="md" _dark={{
                    borderColor: "coolGray.500"
                    }} _light={{
                    borderColor: "coolGray.200"
                    }} p="4">
                        <VStack flex="3" space="4">
                        <Skeleton startColor="indigo.300" />
                        </VStack>
                    </HStack>
                </Center>
            </View>

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

            {Dimensions.get('window').width >= 414 && (
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
                    <Text color="emerald.600" fontWeight="medium">
                    <Text>You are connected</Text>
                    </Text>
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
                                                                                
                    resizeMode="cover"
                    source={require('../assets/vacios-homebor-antena.png')}
                    style={globalStyles.imageNotInternet}
                ></Image>

            </View>

            <View style={globalStyles.WelcomeTextandBoton}>
                <Heading size='sm'style={ globalStyles.tituloWelcome }>There is not internet connection.</Heading>
                <Heading size='sm'style={ globalStyles.tituloWelcome }>Connect to the internet and try again.</Heading>   
            </View>

            {this.state.connection_status ?
                <View>
                    <Text onPress={this.onRefresh} style={globalStyles.createaccount}> Try Again </Text>
                </View>
            : 
                <View>
                    <Text onPress={this.tryAgainNotConnection} style={globalStyles.createaccount}> Try Again </Text>
                </View>
            }

        </View>
        )}

        {this.state.connection_refreshStatus == false && (
          <View style={globalStyles.container}>
            <StatusBar style="light" translucent={true} />
              <ImageBackground source={require('../assets/payments.jpg')} style={globalStyles.ImageBackgroundNoti}>
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

                            
                                  <ScrollView nestedScrollEnabled={true}>

                                  <View>
                                    {Object.keys(this.state.marked).length == 0 ? <View><Card><Text style={globalStyles.NotiDont}>You don't have any voucher on this dates</Text></Card></View> : Object.keys(this.state.marked).map(date => (
                                        <View key={date} style={globalStyles.ReportFeedbackMargins}>
                                          <Card>
                                            <View style={globalStyles.inlineData}>
                                                <Text style={globalStyles.infosubtitle}>{date}</Text>
                                            </View>
                                          </Card>

                                          <View>
                                            {this.state.marked[date].vouchersinfo.map(vouchersinfo => 

                                              <Card key={vouchersinfo.id_v}>
                                                <View style={globalStyles.VouchernotiDate}>
                                                        <Avatar size="lg" bg="#232159" style={globalStyles.Voucherimage} source={ vouchersinfo.photo != "NULL" && { uri: `http://homebor.com/${vouchersinfo.photo}` }}>{vouchersinfo.sender.toUpperCase().charAt(0)}
                                                        </Avatar>

                                                        <View style={globalStyles.inlineDataReportInitVoucherTitle}>
                                                            <Text style={globalStyles.ReportInitBoldText}>{vouchersinfo.title}</Text>
                                                        </View>
                                                        



                                                        <View style={ vouchersinfo.title.length > 20 ? { marginTop: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '5%', marginLeft: '-35%',} : { marginTop: (Platform.isPad === true) ? '10%' : (Dimensions.get('window').width >= 414) ? '10%' : '15%', marginLeft: '-35%',}}>
                                                          <View style={globalStyles.hrVoucher}/>

                                                          {this.state.connection_status ?
                                                              <View style={globalStyles.inlineDataReportInitVoucherButton}>
                                                                <Button style={globalStyles.ButtonViewVoucher} onPress={() => Linking.openURL(`https://homebor.com/homestay/voucher/${vouchersinfo.link}?art_id=${vouchersinfo.id_v}`)}><Icon as={Ionicons} name="eye" size="5" style={globalStyles.VoucherviewIcons}> View</Icon></Button>
                                                              </View> 
                                                              :
                                                              <View style={globalStyles.inlineDataReportInitVoucherButton}>
                                                                <Button style={globalStyles.ButtonViewVoucher} onPress={() => this.noInternetConnection()}><Icon as={Ionicons} name="eye" size="5" style={globalStyles.VoucherviewIcons}> View</Icon></Button>
                                                              </View> 
                                                          }
                                                        </View>
                                                </View>
                                              </Card>
                                              
                                              
                                              )}
                                          </View>
                                        </View>
                                        ))}
                                  </View>
                                      
                  </ScrollView>
                                
                          
                      )}> 
                      </FlatList>
                  <View>
                  </View>
                  </View>
              </ImageBackground>
          </View>
        )}
        </View>)}
      </View>
    </NativeBaseProvider>
  );
}
}