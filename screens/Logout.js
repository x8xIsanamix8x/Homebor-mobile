import React, {Component} from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base'
import globalStyles from '../styles/global';

class Logout extends Component {

   componentDidMount(){
        setTimeout( async() => {
            let validationLogin = await AsyncStorage.removeItem('userLogin')
            if(validationLogin){
                validationLogin = JSON.parse(validationLogin)
                if(validationLogin.perm){
                    console.log(validationLogin)
                this.props.navigation.navigate('Calendar')
                }else{
                this.props.navigation.navigate('UserLogin')
            }
            }else{
                this.props.navigation.navigate('UserLogin')
            }
        },3000)
        
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