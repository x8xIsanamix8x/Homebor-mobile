import React, {Component, useState} from 'react'; 
import { View, KeyboardAvoidingView, Image, RefreshControl, Alert, Dimensions } from 'react-native';
import { NativeBaseProvider, Text, Button, Input, Stack, FormControl, Icon, Heading, Slide, Alert as AlertNativeBase, VStack, HStack, Skeleton, Center, TextArea } from 'native-base';
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { FlatList } from 'react-native-gesture-handler';
import {Spinner} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetInfo from "@react-native-community/netinfo";

export default class Disable extends Component {
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

            id : '',
            reason : ''
        }
    }

    async componentDidMount(){
        this.NetInfoSubscription = NetInfo.addEventListener( this._handleConnectivityChange )

        //Get users data
		let userLogin = await AsyncStorage.getItem('userLogin')
		userLogin = JSON.parse(userLogin)
		this.setState({ email : userLogin.email, perm : userLogin.perm})
		
        if(this.state.connection_status == true) {
		//Get user profile data
		let profile = await api.getProfile(this.state.email,this.state.perm)
		this.setState({ info : profile.data, loading : false, connection_refreshStatus: false, idm: profile.data[0].id_m, readyDisplay : true })
        } else {
            this.setState({ connection_refreshStatus: true, loading : false, readyDisplay : true })
        }
        
		//Autorefresh when focus the screen
		this._onFocusListener = this.props.navigation.addListener('focus', () => {
			this.onRefresh()
		});
    }

    //Function to prepare the refresh on screen when pull up
	onRefresh = () => {
        this.setState({ refreshing: true });
            this.refresh().then(() => {
                this.setState({ refreshing: false });
            });
    }

    //Function to refresh the screen
    refresh = async() => {
        if(this.state.connection_status == true) {
            //Get user profile data
            let profile = await api.getProfile(this.state.email,this.state.perm)
            this.setState({ info : profile.data, loading : false, connection_refreshStatus: false, idm: profile.data[0].id_m, readyDisplay : true })
        } else {
            this.setState({ connection_refreshStatus: true, loading : false, readyDisplay : true })
        }
    }

    //Function to disable user account
    disable = async() => {
        Alert.alert(
            'Do you want to delete this account?',
            'Once the account has been deleted the user will not login on Homebor',
            [        
              {text: 'Yes', onPress: () => this.delete(),},
              {text: 'No'},
            ],
            { cancelable: false }
        )
    }

    delete = async () => {
        //If user don't submit the required files, this message will appear on screen
        if (!this.state.id || !this.state.reason) {
            Alert.alert("All fields are required to disable disable a user")
        }else{
            //Function to update the database to disable user account
            api.disableUser(this.state.id,this.state.email,this.state.idm,this.state.reason)
            this.props.navigation.navigate('Logout')
        }
    }

    //Function to catch the changes in internet state
    _handleConnectivityChange = (state) => {
        this.setState({ connection_status: state.isConnected, clockrun : true });
        this.Clock()
    }

    //Clock to show the message when internet changes
    Clock = () => {
        this.timerHandle = setTimeout (() => {
          this.setState({clockrun : false});
          this.timerHandle = 0;
        }, 5000)
    }

    //When the users try again to connect and they don't have internet them this message will show
    noInternetConnection = () => {
        Alert.alert('There is no internet connection, connect and try again.')
    }

    //Function to run the clock and show the message again
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
                            <View style={globalStyles.skeletonMarginTop}>
                                <Center w="100%">
                                    <VStack w="90%" borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{borderColor: "coolGray.500"}} _light={{borderColor: "coolGray.200"}}>
                                        <HStack space="2" alignItems="center" mr="5%" ml="5%" mt="5%">
                                            <Skeleton size="5" rounded="full" />
                                            <Skeleton h="3" flex="2" rounded="full" />
                                        </HStack>

                                        <Skeleton.Text px="5" my="4" />
                                        <Skeleton.Text px="5" my="4" />
                                        <Skeleton.Text px="5" my="4" />
                                        <Skeleton.Text px="5" my="4" />
                                        {Dimensions.get('window').width >= 414 && (
                                            <View>
                                                <Skeleton.Text px="5" my="4" />
                                                <Skeleton.Text px="5" my="4" />
                                            </View>
                                            
                                            
                                        )}
                                        <Skeleton px="4" my="4" rounded="md" startColor="purple.200" />
                                    </VStack>
                                </Center>
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
                                                <AlertNativeBase style={globalStyles.StacknoInternetConnection}  justifyContent="center" bg="emerald.100">
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
                                            resizeMode="cover"
                                            source={require('../assets/img/empty/vacios-homebor-antena.png')}
                                            style={globalStyles.imageNotInternet} />
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
                                    <View>
                                        <FlatList
                                            data={this.state.info}
                                            extraData={this.state.info}
                                            ListFooterComponent={() => this.state.loading && (<Spinner color="purple" style={ globalStyles.spinner2}/>)}
                                            keyExtractor={item => `${item.info}`}
                                            nestedScrollEnabled={true}
                                            refreshControl={
                                                <RefreshControl
                                                enabled={true}
                                                refreshing={this.state.refreshing}
                                                onRefresh={this.onRefresh}
                                                tintColor="purple"
                                                colors={["purple","purple"]} />
                                            }
                                            renderItem={({item}) => (
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

                                                    <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll extraScrollHeight={20}>
                                                        {/*Warning */}
                                                        <Center>
                                                            <Text style={globalStyles.disablebold2}>You are about to delete this account.</Text>
                                                        </Center>

                                                        <Center bg="error.400" h="5%" w="90%" mt="5%" ml="5%" rounded="full" >
                                                           <HStack>
                                                           <Icon as={FontAwesome} name='warning' style={globalStyles.botonTextoDisable}><Text style={globalStyles.disablebold3}> This is extremely important.</Text></Icon>
                                                           </HStack>
                                                        </Center>

                                                        <Center px="5" py="5">
                                                            <Text style={ globalStyles.disablewarning}>Once the account has been deleted the user will not login on Homebor and its files, information and events will be removing of the data.{"\n"}</Text>
                                                        </Center>

                                                        <Center>
                                                            <Text style={ globalStyles.disablebold}>All Fields Required{"\n"}</Text>
                                                        </Center>


                                                            <KeyboardAvoidingView>
                                                                {item.id_home != 'NULL' && (<Text style={ globalStyles.disablewarning} ml="5%">Please type the following to confirm: <Text style={ globalStyles.disablebold}>{item.id_home}</Text></Text>)}      
                                                                
                                                                <FormControl>
                                                                    <Stack inlineLabel last style={globalStyles.input} w="90%" ml="5%" mt="3%">
                                                                        <Input 
                                                                            onChangeText={(id) => this.setState({id})}
                                                                            placeholder='ID'
                                                                            style={ globalStyles.inputedit}
                                                                        />
                                                                    </Stack>

                                                                    <Stack inlineLabel last style={globalStyles.hideContents}>
                                                                        <Input 
                                                                            defaultValue={item.mail_h}
                                                                            onChangeText={ (email) => this.setState({email}) }
                                                                            style={ globalStyles.inputedit}
                                                                            />
                                                                    </Stack>

                                                                    <Stack inlineLabel last style={globalStyles.hideContents}>
                                                                        <Input
                                                                            defaultValue={item.id_m}
                                                                            onChangeText={ (idm) => this.setState({idm}) }
                                                                            style={ globalStyles.inputedit}
                                                                            />
                                                                    </Stack>

                                                                    <Text style={ globalStyles.disablewarning} ml="5%">Reason :</Text>

                                                                    <Stack inlineLabel last style={globalStyles.input} w="90%" ml="5%" mt="3%">
                                                                        <TextArea
                                                                            multiline={true}
                                                                            numberOfLines={4} 
                                                                            placeholder='Tell us why'
                                                                            onChangeText={(reason) => this.setState({reason})}
                                                                            style={ globalStyles.inputedit}
                                                                        />
                                                                    </Stack>
                                                                </FormControl>
                                                                
                                                                {(this.state.reason != '' && this.state.id != '') && (
                                                                    <View>
                                                                        {this.state.connection_status ? 
                                                                        <Center>
                                                                            <Button
                                                                                bordered
                                                                                success
                                                                                square
                                                                                block
                                                                                style={globalStyles.botonDeleteUser}
                                                                                onPress={this.disable}>
                                                                                <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='user' style={globalStyles.botonTextoDisable}> Delete</Icon></Text>
                                                                            </Button>
                                                                        </Center>
                                                                        :
                                                                        <Center>
                                                                            <Button
                                                                                bordered
                                                                                success
                                                                                square
                                                                                block
                                                                                style={globalStyles.botonDeleteUser}
                                                                                onPress={this.noInternetConnection}>
                                                                                <Text style={globalStyles.botonTexto}><Icon as={FontAwesome} name='user' style={globalStyles.botonTextoDisable}> Delete</Icon></Text>
                                                                            </Button>
                                                                        </Center>
                                                                    }
                                                                    </View>
                                                                )}
                                                                

                                                            </KeyboardAvoidingView>
                                                    </KeyboardAwareScrollView>
                                                </View>
                                            )}
                                        />
                                    </View>
                                )}                       
                            </View>
                        )}
                    </View>
            </NativeBaseProvider>
        )
    }
}