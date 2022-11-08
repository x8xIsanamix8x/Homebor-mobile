import React, {Component} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, Spinner } from 'native-base';
import globalStyles from '../styles/global';
import api from '../api/api';

import { AuthContext } from '../components/context';
import NetInfo from "@react-native-community/netinfo";

export default class Loading extends Component {
  static contextType = AuthContext 

  NetInfoSubscription = null;

  constructor(props){
    super(props);
    this.state={
        email : '',
        perm : false,
        userIsDisable: false,
        routeUser: '',
        connection_status: false,
    }
  }


    componentDidMount(){
      this.NetInfoSubscription = NetInfo.addEventListener(
        this._handleConnectivityChange,
      )

        setTimeout( async() => {
            let validationLogin = await AsyncStorage.getItem('userLogin')
            if(validationLogin){
              validationLogin = JSON.parse(validationLogin)
              this.setState({user: validationLogin.email, perm: validationLogin.perm, userIsDisable: validationLogin.disableUser, routeUser: validationLogin.userRoute})
              this.verifyInternet()
            } else {
              this.routeLogin()
            }
        },3000)
        
    }

    verifyInternet = () => {
      if(this.state.perm == true){
        if(this.state.connection_status == true) {
          this.verifyUserDB()
        } else {
          this.findYourRoute()
        }
      } else {
        this.routeLogin()
      }
    }

    verifyUserDB = async() => {
      let profile = await api.userExits(this.state.user)
      if(profile.status == 1) {
        this.findYourRoute()
      } else {
        await AsyncStorage.removeItem('userLogin')
        this.routeLogin()
      }
    }

    findYourRoute = () => {
      if(this.state.disableUser == true){
        this.context.signDisable()
      } else {
        if(this.state.routeUser != 'Register' || this.state.routeUser != 'Houseinformation' || this.state.routeUser != 'Roomregister'){
          this.context.signIn()
        } else {
          this.context.signUp()
          if(this.state.routeUser == 'Houseinformation'){
            this.props.navigation.navigate('YourLocation')
          }
          if(this.state.routeUser == 'Roomregister'){
            this.props.navigation.navigate('YourRoom')
          }
        }
      }
    }

    routeLogin = () => {
      this.props.navigation.navigate('Login')
    }

    _handleConnectivityChange = (state) => {
      this.setState({ connection_status: state.isConnected });
    }

    componentWillUnmount(){
      this.NetInfoSubscription && this.NetInfoSubscription()
    }
    
  render() {
  return (
    <NativeBaseProvider>
      <Spinner color="purple.500" style={ globalStyles.spinner} size="lg"/>
    </NativeBaseProvider>
  );
}
}