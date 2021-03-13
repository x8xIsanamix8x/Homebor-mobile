import React, {Component} from 'react'
import {View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base'
import globalStyles from '../styles/global';

class Loading extends Component {

    async componentDidMount(){
        setTimeout( async() => {
            let validationLogin = await AsyncStorage.getItem('userLogin')
            if(validationLogin){
                validationLogin = JSON.parse(validationLogin)
                if(validationLogin.perm){
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
                <Spinner color="red" style={{ width:200, height:150}}/>
            </View>
        )


    }

}

export default Loading