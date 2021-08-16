import React, {Component} from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base'
import globalStyles from '../styles/global';

class Logout extends Component {

   async componentDidMount(){
    this.componentWillUnmount()   
    }

    async componentWillUnmount(){
        await AsyncStorage.removeItem('userLogin')
        await AsyncStorage.removeItem('idnoti')
        this.props.navigation.navigate('Login')
    }

    render(){

        return(
            <View style={globalStyles.contenido}>
                <Spinner color="purple" style={ globalStyles.spinner}/>
            </View>
        )


    }

}

export default Logout